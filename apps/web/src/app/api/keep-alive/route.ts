import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // A very lightweight query to keep Supabase awake (costs almost 0 resources)
    const { count, error } = await supabase
      .from('proven_projects')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      status: 'active', 
      message: 'Supabase is awake!', 
      projectsCount: count 
    });
  } catch (err: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: err.message 
    }, { status: 500 });
  }
}
