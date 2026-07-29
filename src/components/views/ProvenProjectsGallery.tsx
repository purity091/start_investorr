import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, BarChart3, Users, Globe } from 'lucide-react';
import { dashpProject } from '@/data/provenProjects/dashp';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';

const PROVEN_PROJECTS = [dashpProject];

export const ProvenProjectsGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (selectedProject) {
    return <ProvenProjectProfile project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col gap-2 mb-4">
        <Badge variant="secondary" className="w-fit bg-primary/10 text-primary hover:bg-primary/10 border-0">
          إلهام واقعي
        </Badge>
        <h1 className="text-3xl font-black text-foreground tracking-tight">مشاريع ناجحة مثبتة</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          دراسات حالة واقعية ومفصلة لشركات ناشئة ومشاريع SaaS أثبتت نجاحها. استلهم منها الأفكار، طرق التسعير، واستراتيجيات الاستحواذ لتطبيقها في مشروعك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROVEN_PROJECTS.map((project) => (
          <Card 
            key={project.id} 
            className="group cursor-pointer shadow-sm border-border/60 hover:border-primary/40 hover:shadow-md transition-all overflow-hidden flex flex-col"
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-32 bg-primary/5 border-b border-border/50 relative p-6 flex flex-col justify-end">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background border-border/50 text-xs">
                  {project.category.split('/')[0].trim()}
                </Badge>
              </div>
              <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </h3>
            </div>
            <CardContent className="p-5 flex flex-col flex-1 gap-4">
              <p className="text-sm font-semibold text-foreground line-clamp-2">
                {project.headline}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-border/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">الإيرادات</span>
                  <span className="text-xs font-black text-primary flex items-center gap-1">
                    <BarChart3 className="size-3" />
                    {project.directory_snapshot.monthly_revenue.split(' ')[0]}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">العملاء</span>
                  <span className="text-xs font-black text-foreground flex items-center gap-1">
                    <Users className="size-3 text-muted-foreground" />
                    B2B
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
