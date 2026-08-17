# Company Data Engine

## الهدف

إنشاء نظام مستقل لإدارة بيانات الشركات الناجحة، منفصل عن بيانات المستخدمين والمشاريع الموجودة في Supabase، مع إبقاء واجهة الموقع الحالية قادرة على عرض الشركات من خلال نفس عقد JSON الحالي.

المبدأ الأساسي:

```text
Data Engine + MySQL
        ↓
مراجعة واعتماد وإصدارات
        ↓
Public API أو JSON Export
        ↓
الموقع الحالي
```

لا يتصل المتصفح بقاعدة MySQL مباشرة، ولا تحتوي قاعدة بيانات الشركات على مفاتيح خارجية أو اعتماد على جداول Supabase.

## حدود النظام

### 1. قاعدة بيانات الشركات

تحتوي على:

- الشركة والهوية والـ slug.
- القطاع والأسواق ونموذج العمل.
- التمويل والمؤسسين والمنافسين.
- المحتوى التحليلي والدروس المستفادة.
- المصادر والأدلة وتاريخ الوصول إليها.
- الإصدارات وحالة النشر وسجل عمليات الاستيراد.

لا تحتوي على بيانات المستخدمين أو المشاريع الخاصة أو صلاحيات Supabase.

### 2. Data Engine

يفضل وضعه كتطبيق مستقل داخل الـ monorepo:

```text
apps/
  web/                         # الموقع الحالي وSupabase
  company-data-engine/         # الإدارة، الاستيراد، المراجعة، التصدير

packages/
  company-data-contracts/      # TypeScript types + JSON Schema
  company-data-client/         # عميل API server-only للموقع
  company-data-exporter/       # تحويل MySQL إلى JSON منشور
```

في المرحلة الأولى يمكن تشغيل Data Engine كخدمة API مستقلة، ثم إضافة لوحة إدارة داخله. لا نضع عميل MySQL داخل مكونات React أو داخل الكود الذي يعمل في المتصفح.

### 3. طبقة التكامل مع الموقع

يحافظ الموقع على واجهته الحالية ويستبدل مصدر البيانات خلفيًا فقط:

```text
GET /api/public-data/proven-projects
  ├─ المصدر الحالي: public/data/proven-projects/index.json
  └─ المصدر الجديد: Company Data API أو ملف index منشور
```

يجب أن يبقى مسار الموقع ثابتًا، مع اختيار المصدر بواسطة متغير بيئة:

```text
COMPANY_DATA_SOURCE=static-json | api
COMPANY_DATA_API_URL=https://data.example.com
COMPANY_DATA_API_TOKEN=server-only-token
```

بهذا يمكن تشغيل النظام الجديد تدريجيًا مع وجود fallback إلى ملفات JSON الحالية.

## هيكل Data Engine المقترح

```text
apps/company-data-engine/
  src/
    config/
      env.ts
    db/
      mysql.ts
      migrations/
    modules/companies/
      company.types.ts
      company.repository.ts
      company.service.ts
      company.validator.ts
      company.mapper.ts
    modules/sources/
    modules/versions/
    modules/imports/
    modules/exports/
      json-exporter.ts
      index-builder.ts
    api/
      public-companies.routes.ts
      admin-companies.routes.ts
    workers/
      publish-worker.ts
      import-worker.ts
  tests/
    company-contract.test.ts
    exporter.test.ts
  package.json

packages/company-data-contracts/
  src/
    company-public.ts
    company-schema.json
    index.ts
```

## دورة حياة الشركة

```text
draft → in_review → approved → published → archived
```

كل تعديل ينشئ نسخة جديدة في `company_versions`. لا يتم الكتابة فوق النسخة المنشورة مباشرة، حتى يمكن التراجع وإعادة بناء ملفات JSON السابقة.

## عقد القراءة المقترح

```text
GET /v1/public/companies?sector=saas&country=SA&cursor=...
GET /v1/public/companies/:slug
GET /v1/public/companies/:slug.json
GET /v1/public/companies/meta
```

القائمة تعيد ملخصات فقط، أما التفاصيل فتُحمّل عند فتح الشركة. لا يجوز إعادة مليون سجل كامل إلى المتصفح في طلب واحد.

## التوسع

- MySQL هو المصدر الأساسي للبيانات.
- الفهارس تكون على `status`, `slug`, `sector`, `country`, `published_at`.
- التصفح يستخدم cursor pagination وليس offset العميق.
- البحث المتقدم يمكن نقله لاحقًا إلى OpenSearch أو Meilisearch دون تغيير عقد الموقع.
- JSON المنشور يستخدم للتفاصيل المطلوبة والـ CDN، وليس كقاعدة البيانات الأساسية.
- الفهرس العام يمكن تقسيمه حسب القطاع أو الدولة عند نمو الحجم.
- الصور والمرفقات تحفظ في Object Storage، ويخزن JSON الروابط فقط.

## قواعد التكامل والأمان

- لا يوجد أي اتصال بين MySQL وSupabase.
- لا يتم تمرير بيانات اعتماد MySQL إلى العميل.
- مسارات الإدارة منفصلة عن مسارات القراءة العامة.
- التصدير العام يخرج الحقول المنشورة فقط، وليس ملاحظات الإدارة أو البيانات الداخلية.
- كل معلومة حساسة أو قابلة للتغير يجب أن تحتوي على مصدر وتاريخ تحقق.
- يتم التحقق من JSON قبل النشر، وتُرفض الملفات غير المطابقة للعقد.

## خطة التنفيذ

1. إنشاء MySQL schema والمستخدم والصلاحيات الخاصة بـ Data Engine.
2. إنشاء `company-data-contracts` وJSON Schema ثابت.
3. بناء Repository وService للشركات والإصدارات والمصادر.
4. بناء مستورد JSON يبدأ من ملف شركة سلة.
5. بناء Validator وWorkflow للمراجعة والنشر.
6. بناء Exporter ينتج `index.json` و`{slug}.json`.
7. تعديل endpoint الحالي ليقرأ من API الجديد مع fallback للملفات الحالية.
8. إضافة اختبارات contract وexport قبل إدخال عدد كبير من الشركات.

