# تقرير الملفات غير المستخدمة

تاريخ الفحص: 2026-08-02

## ملخص تنفيذي

المشروع حالياً يعمل كـ monorepo عبر `turbo`. سكربت الجذر `npm run build` يستدعي `turbo build`، والتطبيق الفعلي الموجود داخل workspace هو `apps/web` ويستخدم Next.js. لذلك يبدو أن تطبيق Vite الجذري القديم، وخصوصاً `src/` و`public/` في الجذر، أصبح نسخة legacy أو نسخة مكررة من التطبيق المنقول إلى `apps/web`.

أهم نتيجة: لا تتعامل مع كل الملفات غير المستوردة بنفس الدرجة. هناك ملفات يمكن حذفها بثقة عالية مثل مخرجات البناء والكاش، وهناك ملفات بيانات JSON يتم تحميلها ديناميكياً من `fetch()` ولا تظهر في import graph، لذلك لا يجب حذفها بمجرد أنها غير مستوردة.

## منهجية التحليل

- فحصت `package.json`, `turbo.json`, `vite.config.ts`, و`apps/web/package.json`.
- اعتبرت `src/index.tsx` نقطة دخول تطبيق Vite الجذري.
- اعتبرت ملفات `apps/web/src/app/**/page.tsx`, `route.ts`, `layout.tsx`, `robots.ts`, `sitemap.ts` و`apps/web/src/middleware.ts` نقاط دخول Next.js.
- بنيت خريطة استخدام تقريبية من `import`, `export from`, `import()`, و`require()`.
- راجعت مراجع `fetch('/data/...')` لأن ملفات `public/data` تعتمد على التحميل الديناميكي.
- بحثت عن أسماء الأصول والصور الافتراضية داخل الكود.

## نتائج بالأرقام

| النطاق | ملفات المصدر المفحوصة | ملفات وصلت لها خريطة الاستيراد | ملفات مرشحة كغير مستخدمة |
|---|---:|---:|---:|
| `src` الجذري | 417 | 323 | 96 |
| `apps/web/src` | 445 | 345 | 100 |

ملاحظة: أرقام `src` الجذري أقل أهمية إذا كان التطبيق الحالي هو `apps/web` فقط، لأن الجذر لا يدخل في build الحالي عبر Turbo إلا إذا تم تشغيل Vite يدوياً.

## عالية الثقة للحذف أو النقل خارج المستودع

هذه ليست جزءاً من source runtime الحالي، وغالباً يجب ألا تبقى داخل git:

- `.turbo/`
- `apps/web/.turbo/`
- `apps/web/.next/` بحجم تقريبي 2.7 GB
- `dist/` بحجم تقريبي 12.3 MB
- `apps/web/tsconfig.tsbuildinfo`
- `apps/web/build-errors.txt`
- `scratch_json.json` لأنه ملف فارغ
- `vercel.json.backup` إذا لم تكن تحتاجه كنسخة احتياطية يدوية

## ملفات غير منظمة وغير مستخدمة ظاهرياً

المجلد `New folder/` يحتوي ملفات JSON غير مرتبطة بأي استيراد أو مسار معروف، وبعضها غير متتبع في git:

- `New folder/cado-gifting_verified_professional_v2.json`
- `New folder/dajin_verified_professional_v2.json`
- `New folder/house-of-pops_verified_professional_v2.json`
- `New folder/jojos-ranch_verified_professional_v2.json`
- `New folder/mailchimp_verified_professional_v2.json`
- `New folder/netflix_verified_professional_v2 (1).json`
- `New folder/patreon_verified_professional_v2.json`
- `New folder/revolut_verified_professional_v2.json`
- `New folder/robinhood_verified_professional_v2.json`
- `New folder/serket_verified_professional_v2.json`
- `New folder/slack_verified_professional_v2.json`
- `New folder/substack_verified_professional_v2.json`
- `New folder/superhuman_verified_professional_v2.json`
- `New folder/tinder_verified_professional_v2.json`
- `New folder/twitch_verified_professional_v2.json`

التوصية: لا تحذفها مباشرة إذا كانت مخرجات عمل حديث، لكن يجب نقلها إلى مسار واضح مثل `data-raw/` أو دمجها داخل `apps/web/public/data/proven-projects` إن كانت بيانات إنتاجية.

## أصول public غير مستخدمة ظاهرياً

لم أجد مراجع داخل الكود لهذه الملفات:

- `apps/web/public/file.svg`
- `apps/web/public/globe.svg`
- `apps/web/public/next.svg`
- `apps/web/public/vercel.svg`
- `apps/web/public/window.svg`
- `public/annual_report_mockup_1775307267245.png`
- `public/bank_template_mockup_1775307234164.png`
- `public/investor_template_mockup_1775307219319.png`
- `public/pitch_deck_mockup_1775307247127.png`
- `apps/web/public/annual_report_mockup_1775307267245.png`
- `apps/web/public/bank_template_mockup_1775307234164.png`
- `apps/web/public/investor_template_mockup_1775307219319.png`
- `apps/web/public/pitch_deck_mockup_1775307247127.png`

التوصية: صور mockup مكررة بين `public/` و`apps/web/public/`. إذا كان التطبيق الحالي Next فقط، احتفظ بالنسخة داخل `apps/web/public` فقط إن كانت ستستخدم لاحقاً، واحذف نسخة الجذر. أما SVGs الافتراضية الخاصة بـ Next فيمكن حذفها إن لم تظهر في التصميم.

## ملفات مصدر مرشحة كغير مستخدمة داخل التطبيق الحالي

هذه الملفات لم تصل إليها خريطة الاستيراد من نقاط دخول Next الحالية داخل `apps/web`. بعضها قد يكون بقايا من نسخة Vite أو مكونات مستقبلية غير موصولة بالمسارات:

### `apps/web/src/components/features`

- `apps/web/src/components/features/ai/AiIdentityGenerator.tsx`
- `apps/web/src/components/features/ai/AiSidekick.tsx`
- `apps/web/src/components/features/ai/LeftAiSidebar.tsx`
- `apps/web/src/components/features/branding/BrandsDashboard.tsx`
- `apps/web/src/components/features/business/BusinessCanvas.tsx`
- `apps/web/src/components/features/business/PlanComparison.tsx`
- `apps/web/src/components/features/business/SectionEditor.tsx`
- `apps/web/src/components/features/dashboard/Analytics.tsx`
- `apps/web/src/components/features/dashboard/PlansDashboard.tsx`
- `apps/web/src/components/features/discovery/discoveryInsights.ts`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/CommandCenter.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/MinimalistCard.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/OpportunityDetail.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/SubComponents.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/Views/B2XView.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/Views/BudgetView.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/Views/MarketsView.tsx`
- `apps/web/src/components/features/discovery/ProblemOpportunityEngine/Views/SectorsView.tsx`
- `apps/web/src/components/features/hackathon/components/HackathonPledge.tsx`
- `apps/web/src/components/features/hackathon/components/HackathonSidebar.tsx`
- `apps/web/src/components/features/hackathon/components/LeadershipOnboarding.tsx`
- `apps/web/src/components/features/social/Comments.tsx`
- `apps/web/src/components/features/social/NotificationsHub.tsx`

### `apps/web/src/components/layout` و `ui`

- `apps/web/src/components/layout/MobileMenu.tsx`
- `apps/web/src/components/layout/ModernSidebarSkeleton.tsx`
- `apps/web/src/components/layout/PlanHeader.tsx`
- `apps/web/src/components/layout/PlatformRecommendationFloat.tsx`
- `apps/web/src/components/ui/CollapsibleContainer.tsx`
- `apps/web/src/components/ui/FileUpload.tsx`
- `apps/web/src/components/ui/FloatingActions.tsx`
- `apps/web/src/components/ui/PageHeader.tsx`
- `apps/web/src/components/ui/toggle-group.tsx`

### `apps/web/src/components/views`

- `apps/web/src/components/views/CustomerPortal.tsx`
- `apps/web/src/components/views/HomeViews/CommandCenter.tsx`
- `apps/web/src/components/views/HomeViews/DecisionLayer.tsx`
- `apps/web/src/components/views/HomeViews/HeroBanner.tsx`
- `apps/web/src/components/views/HomeViews/IntelligenceStories.tsx`
- `apps/web/src/components/views/HomeViews/IntelligenceStream.tsx`
- `apps/web/src/components/views/HomeViews/StrategicLaunchpad.tsx`
- `apps/web/src/components/views/HomeViews/StrategicPathFinder.tsx`
- `apps/web/src/components/views/HomeViews/StrategicUpgrade.tsx`
- `apps/web/src/components/views/HomeViews/UnicornAnatomy.tsx`
- `apps/web/src/components/views/PrivacyTerms.tsx`

### `apps/web/src/features/easy-mode`

- `apps/web/src/features/easy-mode/result_components/CriticalBottleneckCard.tsx`
- `apps/web/src/features/easy-mode/result_components/DecisionMemoCard.tsx`
- `apps/web/src/features/easy-mode/result_components/ExecutionPathCard.tsx`
- `apps/web/src/features/easy-mode/result_components/GrowthChecklistSection.tsx`
- `apps/web/src/features/easy-mode/result_components/IncomeProjectionSection.tsx`
- `apps/web/src/features/easy-mode/result_components/KpiOverview.tsx`
- `apps/web/src/features/easy-mode/result_components/NextActionCard.tsx`
- `apps/web/src/features/easy-mode/result_components/RevenueAccelerationCard.tsx`
- `apps/web/src/features/easy-mode/result_components/ScenarioSimulatorSection.tsx`
- `apps/web/src/features/easy-mode/result_components/UvpMapSection.tsx`
- `apps/web/src/features/easy-mode/services/aiService.ts`
- `apps/web/src/features/easy-mode/tabs/StrategicPulseForm.tsx`

### خدمات ومرافق داخل `apps/web/src`

- `apps/web/src/index.tsx`
- `apps/web/src/lib/cn.ts`
- `apps/web/src/services/advertisingService.ts`
- `apps/web/src/services/brandsService.ts`
- `apps/web/src/services/farmingService.ts`
- `apps/web/src/services/fisheriesService.ts`
- `apps/web/src/services/forestryService.ts`
- `apps/web/src/services/geminiService.ts`
- `apps/web/src/services/marketingService.ts`
- `apps/web/src/utils/formatters.ts`
- `apps/web/src/utils/supabase/client.ts`
- `apps/web/src/utils/supabase/server.ts`

تنبيه: `apps/web/src/utils/supabase/client.ts` و`server.ts` غير مستخدمين لأن المشروع يستخدم حالياً `apps/web/src/lib/supabase.ts` وmiddleware فيه إنشاء مباشر للعميل. لا تحذفهما إذا كان هناك قرار قريب لتوحيد Supabase client عليهما.

## ملفات sectors مرشحة كغير موصولة

هذه dashboards موجودة داخل `apps/web/src/components/sectors` لكن لم تظهر كمسارات موصولة من `DashboardRouter` أو نقاط دخول Next:

- `apps/web/src/components/sectors/AdvertisingMarketing/index.ts`
- `apps/web/src/components/sectors/Agriculture/FisheriesDashboard.tsx`
- `apps/web/src/components/sectors/ChemicalsResources/MiningMetalsMineralsDashboard.tsx`
- `apps/web/src/components/sectors/ConsumerGoodsFMCG/FoodBeverageDashboard.tsx`
- `apps/web/src/components/sectors/ConsumerGoodsFMCG/FurnitureFurnishingsHouseholdItemsDashboard.tsx`
- `apps/web/src/components/sectors/ConsumerGoodsFMCG/PetsAnimalSuppliesDashboard.tsx`
- `apps/web/src/components/sectors/Ecommerce/KeyFiguresOfECommerceDashboard.tsx`
- `apps/web/src/components/sectors/EconomyPolitics/InternationalDashboard.tsx`
- `apps/web/src/components/sectors/EconomyPolitics/InternationalTradeRetailDashboard.tsx`
- `apps/web/src/components/sectors/EconomyPolitics/PoliticsGovernmentDashboard.tsx`
- `apps/web/src/components/sectors/EnergyEnvironment/EnvironmentalTechnologyGreentechDashboard.tsx`
- `apps/web/src/components/sectors/EnergyEnvironment/WasteManagementDashboard.tsx`
- `apps/web/src/components/sectors/EnergyEnvironment/WaterWastewaterDashboard.tsx`
- `apps/web/src/components/sectors/HealthPharma/HealthProfessionalsHospitalsDashboard.tsx`
- `apps/web/src/components/sectors/HealthPharma/PharmaceuticalMarketDashboard.tsx`
- `apps/web/src/components/sectors/HealthPharma/PharmaceuticalProductsMarketDashboard.tsx`
- `apps/web/src/components/sectors/Internet/AppsMobileInternetDashboard.tsx`
- `apps/web/src/components/sectors/Internet/CyberSecurityDashboard.tsx`
- `apps/web/src/components/sectors/Internet/DemographicsUseDashboard.tsx`
- `apps/web/src/components/sectors/Internet/OnlineEntertainmentDashboard.tsx`
- `apps/web/src/components/sectors/Internet/SocialMediaUserGeneratedContentDashboard.tsx`
- `apps/web/src/components/sectors/Internet/TrafficReachDashboard.tsx`
- `apps/web/src/components/sectors/Life/PublicAndReligiousHolidaysDashboard.tsx`
- `apps/web/src/components/sectors/Life/PublicReligiousHolidaysDashboard.tsx`
- `apps/web/src/components/sectors/Media/TVFilmDashboard.tsx`
- `apps/web/src/components/sectors/Media/VideoGamingDashboard.tsx`
- `apps/web/src/components/sectors/MetalsElectronics/AerospaceDefenseManufacturingDashboard.tsx`
- `apps/web/src/components/sectors/MetalsElectronics/IndustrialMachineryManufacturingDashboard.tsx`
- `apps/web/src/components/sectors/MetalsElectronics/RollingStockManufacturingDashboard.tsx`
- `apps/web/src/components/sectors/Services/fisheriesService.ts`
- `apps/web/src/components/sectors/SportsRecreation/FitnessWellnessDashboard.tsx`
- `apps/web/src/components/sectors/SportsRecreation/SportsLeisureDashboard.tsx`

هذه الفئة تحتاج مراجعة يدوية قبل الحذف، لأن بعض الملفات قد تكون نسخاً قديمة بأسماء قريبة من ملفات مستخدمة فعلاً مثل `FisheriesAquacultureDashboard.tsx` أو `FoodBeverageRetailDashboard.tsx`.

## الجذر `src/` و `public/`

بما أن build الحالي من الجذر يذهب إلى Turbo/workspaces، فإن `src/` الجذري و`public/` الجذري يبدوان legacy. إذا تم اعتماد `apps/web` كتطبيق وحيد، فالخطوة الأنظف هي:

1. تأكيد عدم تشغيل `vite.config.ts` الجذري في الإنتاج.
2. نقل أي بيانات ناقصة من `public/data` إلى `apps/web/public/data` إن كانت غير موجودة هناك.
3. حذف أو أرشفة `src/`, `public/`, `index.html`, و`vite.config.ts` من الجذر في فرع منفصل.
4. تحديث الوثائق حتى لا تذكر Vite كتطبيق التشغيل الحالي إن كان Next هو المسار المعتمد.

## ملفات لا أنصح بحذفها بالجملة

- `apps/web/public/data/**`: مستخدمة ديناميكياً عبر `fetch('/data/...')`.
- `apps/web/public/data/opportunities_index.json`: مستخدم عبر `apps/web/src/services/opportunityService.ts`.
- `apps/web/public/data/proven-projects/**`: مستخدم في `ProvenProjectsGallery`, `SaaSIdeasGallery`, و`MicroSaaSIdeasGallery`.
- `apps/web/public/data/failed-projects/**`: مستخدم في `FailedProjectsGallery`, `SaaSIdeasGallery`, و`MicroSaaSIdeasGallery`.
- `apps/web/public/data/swot/**`: مستخدم ديناميكياً من `SectorDashboardTemplate`.
- `node_modules/`: غير مستخدم كمصدر، لكنه dependency install محلي وليس مرشحاً لتعديل source.

## توصية عملية

ابدأ بتنظيف غير الخطر: `.next`, `.turbo`, `dist`, `tsconfig.tsbuildinfo`, `build-errors.txt`, وملفات SVG الافتراضية غير المستخدمة. بعد ذلك قرر هل الجذر Vite ما زال مطلوباً. إذا لم يعد مطلوباً، فالأفضل حذف تطبيق الجذر كاملاً بدل حذف ملفات مفردة منه، لأن وجود نسختين `src` و`apps/web/src` يسبب التباساً مستمراً في التطوير.
