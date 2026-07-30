import { 
  Heart, 
  Tv, 
  BarChart3, 
  Megaphone, 
  FlaskConical, 
  Construction, 
  Trophy 
} from 'lucide-react';
import { Sector } from '../../types';

export const lifeData: Sector = {
  id: 'life',
  icon: Heart,
  name: 'السلع الاستهلاكية ونمط الحياة',
  count: 1550,
  color: 'rose',
  subs: []
};

export const mediaData: Sector = {
  id: 'media',
  icon: Tv,
  name: 'الإعلام والترفيه',
  count: 890,
  color: 'purple',
  subs: []
};

export const economyData: Sector = {
  id: 'economy',
  icon: BarChart3,
  name: 'الاقتصاد والسياسة',
  count: 450,
  color: 'blue',
  subs: []
};

export const advertisingData: Sector = {
  id: 'advertising',
  icon: Megaphone,
  name: 'الإعلانات والتسويق',
  count: 1200,
  color: 'orange',
  subs: []
};

export const chemicalsData: Sector = {
  id: 'chemicals',
  icon: FlaskConical,
  name: 'الكيمياء والموارد',
  count: 670,
  color: 'emerald',
  subs: []
};

export const reconstructionData: Sector = {
  id: 'reconstruction',
  icon: Construction,
  name: 'إعادة إعمار سوريا',
  count: 2400,
  color: 'amber',
  subs: []
};

export const sportsData: Sector = {
  id: 'sports',
  icon: Trophy,
  name: 'الرياضة والترفيه',
  count: 980,
  color: 'indigo',
  subs: []
};
