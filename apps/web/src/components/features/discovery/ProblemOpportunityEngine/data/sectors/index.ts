import { Sector } from '../../types';
import { healthData } from './health';
import { eduData } from './edu';
import { fintechData } from './fintech';
import { agriData } from './agri';
import { techData } from './tech';
import { retailData } from './retail';
import { energyData } from './energy';
import { industryData } from './industry';
import { logisticsData } from './logistics';
import { realEstateData } from './realestate';
import { 
  lifeData, 
  mediaData, 
  economyData, 
  advertisingData, 
  chemicalsData, 
  reconstructionData, 
  sportsData 
} from './extraSectors';

export const DATA: Sector[] = [
  healthData,
  eduData,
  fintechData,
  agriData,
  techData,
  retailData,
  energyData,
  industryData,
  logisticsData,
  realEstateData,
  lifeData,
  mediaData,
  economyData,
  advertisingData,
  chemicalsData,
  reconstructionData,
  sportsData,
];
