import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { PROVEN_PROJECTS } from '@/data/provenProjects';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';

export const ProvenProjectsGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (selectedProject) {
    return <ProvenProjectProfile project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-3 mb-2">
        <Badge variant="secondary" className="w-fit bg-primary/10 text-primary hover:bg-primary/10 border-0 font-bold px-3 py-1">
          إلهام واقعي وقاعدة بيانات
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">مشاريع ناجحة مثبتة</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
          قاعدة بيانات تفاعلية لشركات ناشئة ومشاريع SaaS أثبتت نجاحها. استكشف الإيرادات، الزيارات، نماذج العمل، والتقنيات المستخدمة لاستلهام أفكار قابلة للتطبيق في مشروعك القادم.
        </p>
      </div>

      <div className="w-full">
        <ProvenProjectsTable data={PROVEN_PROJECTS} onRowClick={setSelectedProject} />
      </div>
    </div>
  );
};
