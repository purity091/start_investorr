import { Problem } from '../components/features/discovery/ProblemOpportunityEngine/types';
import { fetchPublicJson } from '@/lib/publicData';

export const loadDynamicOpportunities = async (): Promise<Problem[]> => {
  try {
    return await fetchPublicJson<Problem[]>('/data/opportunities/index.json');
  } catch (error) {
    console.error("Failed to load opportunities:", error);
    return [];
  }
};

export const loadDynamicOpportunitiesBySector = async (sectorId: string): Promise<Problem[]> => {
  try {
    return await fetchPublicJson<Problem[]>(`/data/opportunities/by-sector/${sectorId}.json`);
  } catch (error) {
    console.error("Failed to load sector opportunities:", error);
    return [];
  }
};
