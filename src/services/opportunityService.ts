import { Problem } from '../components/features/discovery/ProblemOpportunityEngine/types';

export const loadDynamicOpportunities = async (): Promise<Problem[]> => {
  try {
    const res = await fetch('/data/opportunities_index.json');
    if (!res.ok) {
      throw new Error(`Failed to fetch opportunities: ${res.status}`);
    }
    const opportunities: Problem[] = await res.json();
    return opportunities;
  } catch (error) {
    console.error("Failed to load opportunities:", error);
    return [];
  }
};
