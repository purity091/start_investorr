import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dkdoxpzihhdvdykmsxir.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_7Xs22yGHCGPtySeF101FVw_g375ThdT';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function migrateProjects() {
  const dataDir = path.join(process.cwd(), 'public/data/proven-projects');
  
  // Read index.json to get the list of slugs
  const indexPath = path.join(dataDir, 'index.json');
  if (!fs.existsSync(indexPath)) {
    console.error('index.json not found!');
    return;
  }

  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const slugs = indexData.map((d: any) => d.slug);

  console.log(`Found ${slugs.length} projects to migrate...`);

  for (const slug of slugs) {
    const filePath = path.join(dataDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) continue;

    const projectData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // 1. Prepare project record
    const projectRecord = {
      slug: projectData.slug,
      title: projectData.name,
      description: projectData.description,
      category: projectData.category,
      location: projectData.location,
      business_model: projectData.businessModel,
      
      target_audience: projectData.market_data?.target_audience,
      market_size: projectData.market_data?.market_size,
      growth_rate: projectData.market_data?.growth_rate,
      
      initial_investment: projectData.financials?.initial_investment,
      valuation: projectData.financials?.valuation,
      
      problem_text: projectData.overview?.problem?.text,
      problem_impact: projectData.overview?.problem?.impact,
      solution_text: projectData.overview?.solution?.text,
      
      revenue_streams: projectData.financials?.revenue_streams || [],
      tools: projectData.tools || []
    };

    // Check if project exists
    const { data: existingProject } = await supabase
      .from('proven_projects')
      .select('id')
      .eq('slug', projectData.slug)
      .single();

    let projectId;

    if (existingProject) {
      console.log(`⚠️ Project ${projectData.name} already exists, skipping insert.`);
      projectId = existingProject.id;
    } else {
      // Insert project
      const { data: insertedProject, error: projectError } = await supabase
        .from('proven_projects')
        .insert(projectRecord)
        .select('id')
        .single();

      if (projectError) {
        console.error(`Failed to insert project ${slug}:`, projectError.message);
        continue;
      }
      projectId = insertedProject.id;
      console.log(`✅ Inserted Project: ${projectData.name}`);
    }

    // 2. Prepare lessons (only for new projects since we don't have UPDATE/DELETE rights)
    if (!existingProject && projectData.lessons && projectData.lessons.length > 0) {
      const lessonsRecords = projectData.lessons.map((lesson: any) => {
        if (typeof lesson === 'string') {
          return {
            project_id: projectId,
            title: 'درس استراتيجي',
            description: lesson
          };
        } else {
          return {
            project_id: projectId,
            title: lesson.title || 'درس استراتيجي',
            description: lesson.description || ''
          };
        }
      });

      const { error: lessonsError } = await supabase
        .from('lessons')
        .insert(lessonsRecords);

      if (lessonsError) {
        console.error(`  ❌ Failed to insert lessons for ${slug}:`, lessonsError.message);
      } else {
        console.log(`  ✅ Inserted ${lessonsRecords.length} lessons`);
      }
    }
  }
  
  console.log('Migration Completed!');
}

migrateProjects();
