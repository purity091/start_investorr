import React, { Suspense } from 'react';
import { Home } from './Home';
import { DiscoveryCenter } from '../features/discovery/DiscoveryCenter';
import { MyProjects } from './MyProjects';
import { ProvenProjectsGallery } from './ProvenProjectsGallery';
import { FailedProjectsGallery } from './FailedProjectsGallery';
import { SaaSIdeasGallery } from './SaaSIdeasGallery';
import { MicroSaaSIdeasGallery } from './MicroSaaSIdeasGallery';
import { ProjectIdeasHub } from './ProjectIdeasHub';
import { NewPlan } from '../features/business/NewPlan';
import { UnicornBenchmarking } from '../features/discovery/UnicornBenchmarking';
import { BusinessPlanEditor } from '../features/business/BusinessPlanEditor';
import { PricingPlans } from './PricingPlans';
import { Settings } from './Settings';
import { Tasks } from './Tasks';
import { Changelog } from './Changelog';
import { ContactUs } from './ContactUs';
import { MarketInsightPlaceholder } from './MarketInsightPlaceholder';
import { Notifications } from '../features/social/Notifications';
import { Profile } from './Profile';
import { MobileSiteMap } from './MobileSiteMap';
import { useProjectWorkspace } from '../../features/workspace/ProjectWorkspaceContext';
import { FeatureErrorBoundary } from '@/components/common/FeatureErrorBoundary';
import { getProjectIdFromEditPath } from '@/utils/routes';

import { User, PlanSection } from '../../types';

type LazyPageProps = Record<string, unknown>;

const lazyPage = <TProps extends LazyPageProps = LazyPageProps>(
  loader: () => Promise<{ default: React.ComponentType<TProps> }>
) => React.lazy(() => loadWithChunkRecovery(loader));

const lazyNamedPage = <TProps extends LazyPageProps = LazyPageProps>(
  loader: () => Promise<Record<string, unknown>>,
  exportName: string
) =>
  React.lazy(async () => {
    const loadedPage = await loadWithChunkRecovery(loader);
    const Component = loadedPage[exportName];

    if (!Component) {
      throw new Error(`Lazy page export "${exportName}" was not found.`);
    }

    return { default: Component as React.ComponentType<TProps> };
  });

const CHUNK_RELOAD_KEY = 'khotta_chunk_reload_attempted';

const toRuntimeError = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) return error;
  if (typeof error === 'string' && error.trim()) return new Error(error);

  try {
    return new Error(JSON.stringify(error) || fallbackMessage);
  } catch {
    return new Error(fallbackMessage);
  }
};

async function loadWithChunkRecovery<T>(loader: () => Promise<T>): Promise<T> {
  try {
    const loadedPage = await loader();

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    }

    return loadedPage;
  } catch (error) {
    const runtimeError = toRuntimeError(error, 'Failed to load application section.');
    const message = runtimeError.message;
    const isChunkLoadError =
      runtimeError.name === 'ChunkLoadError'
      || /failed to load chunk|loading chunk|chunkloaderror/i.test(message);

    if (
      isChunkLoadError &&
      typeof window !== 'undefined' &&
      sessionStorage.getItem(CHUNK_RELOAD_KEY) !== 'true'
    ) {
      sessionStorage.setItem(CHUNK_RELOAD_KEY, 'true');
      window.location.reload();
    }

    throw runtimeError;
  }
}

const BrandIdentityStudio = lazyNamedPage(() => import('../features/branding/BrandIdentityStudio'), 'BrandIdentityStudio');
const ProblemOpportunityEngine = lazyNamedPage(() => import('../features/discovery/ProblemOpportunityEngine'), 'ProblemOpportunityEngine');
const UsersManagement = lazyNamedPage(() => import('./UsersManagement'), 'UsersManagement');
const AdminProjectsManagement = lazyNamedPage(() => import('../sectors/Admin/AdminProjectsManagement'), 'AdminProjectsManagement');
const AdminAnalyticsDashboard = lazyNamedPage(() => import('../sectors/Admin/AdminAnalyticsDashboard'), 'AdminAnalyticsDashboard');
const AdminSecurityDashboard = lazyNamedPage(() => import('../sectors/Admin/AdminSecurityDashboard'), 'AdminSecurityDashboard');
const HackathonView = lazyPage(() => import('../features/hackathon/HackathonView'));
const ResultPage = lazyPage(() => import('../../features/easy-mode/ResultPage'));
const BusinessModelCanvas = lazyNamedPage(() => import('../features/business/BusinessModelCanvas'), 'BusinessModelCanvas');
const UnifiedWorkspace = lazyNamedPage(() => import('../../features/workspace/UnifiedWorkspace'), 'UnifiedWorkspace');
const CompanyDeepDive = lazyNamedPage(() => import('../features/discovery/CompanyDeepDive'), 'CompanyDeepDive');
const ProblemDeepDive = lazyNamedPage(() => import('../features/discovery/ProblemDeepDive'), 'ProblemDeepDive');
const SavedMarketItems = lazyNamedPage(() => import('../features/discovery/SavedMarketItems'), 'SavedMarketItems');
const First90DaysView = lazyNamedPage(() => import('./First90DaysView'), 'First90DaysView');
const PlatformAcademyView = lazyNamedPage(() => import('./PlatformAcademyView'), 'PlatformAcademyView');
const RevenueCalculatorView = lazyNamedPage(() => import('./RevenueCalculatorView'), 'RevenueCalculatorView');

const AdvertisingDashboard = lazyPage(() => import('../sectors/AdvertisingMarketing/AdvertisingDashboard'));
const MarketingDashboard = lazyPage(() => import('../sectors/AdvertisingMarketing/MarketingDashboard'));
const InfluencerMarketingDashboard = lazyPage(() => import('../sectors/AdvertisingMarketing/InfluencerMarketingDashboard'));
const BrandsLeadersDashboard = lazyPage(() => import('../sectors/AdvertisingMarketing/BrandsLeadersDashboard'));
const SearchEngineOptimizationContentMarketingDashboard = lazyPage(() => import('../sectors/AdvertisingMarketing/SearchEngineOptimizationContentMarketingDashboard'));
const FarmingDashboard = lazyPage(() => import('../sectors/Agriculture/FarmingDashboard'));
const FisheriesAquacultureDashboard = lazyPage(() => import('../sectors/Agriculture/FisheriesAquacultureDashboard'));
const ForestryDashboard = lazyPage(() => import('../sectors/Agriculture/ForestryDashboard'));
const AgriculturalTechnologyAgritechDashboard = lazyPage(() => import('../sectors/Agriculture/AgriculturalTechnologyAgritechDashboard'));
const SmartFarmingDashboard = lazyPage(() => import('../sectors/Agriculture/SmartFarmingDashboard'));
const SeedsCropProtectionDashboard = lazyPage(() => import('../sectors/Agriculture/SeedsCropProtectionDashboard'));
const ChemicalIndustryDashboard = lazyPage(() => import('../sectors/ChemicalsResources/ChemicalIndustryDashboard'));
const FossilFuelsDashboard = lazyPage(() => import('../sectors/ChemicalsResources/FossilFuelsDashboard'));
const MiningDashboard = lazyPage(() => import('../sectors/ChemicalsResources/MiningDashboard'));
const PulpPaperDashboard = lazyPage(() => import('../sectors/ChemicalsResources/PulpPaperDashboard'));
const PlasticRubberDashboard = lazyPage(() => import('../sectors/ChemicalsResources/PlasticRubberDashboard'));
const PetroleumRefineryDashboard = lazyPage(() => import('../sectors/ChemicalsResources/PetroleumRefineryDashboard'));
const RecycledMaterialsDashboard = lazyPage(() => import('../sectors/ChemicalsResources/RecycledMaterialsDashboard'));
const BatteryMaterialsDashboard = lazyPage(() => import('../sectors/ChemicalsResources/BatteryMaterialsDashboard'));
const ApparelShoesDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/ApparelShoesDashboard'));
const NonAlcoholicBeveragesDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/NonAlcoholicBeveragesDashboard'));
const CleaningProductsDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/CleaningProductsDashboard'));
const CosmeticsPersonalCareDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/CosmeticsPersonalCareDashboard'));
const FoodNutritionDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/FoodNutritionDashboard'));
const FurnitureHouseholdDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/FurnitureHouseholdDashboard'));
const GardenPatioDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/GardenPatioDashboard'));
const HomeImprovementDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/HomeImprovementDashboard'));
const PetSuppliesDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/PetSuppliesDashboard'));
const ToysDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/ToysDashboard'));
const SustainableConsumerGoodsDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/SustainableConsumerGoodsDashboard'));
const PackagedFoodsDashboard = lazyPage(() => import('../sectors/ConsumerGoodsFMCG/PackagedFoodsDashboard'));
const EconomyDashboard = lazyPage(() => import('../sectors/EconomyPolitics/EconomyDashboard'));
const InternationalTradeDashboard = lazyPage(() => import('../sectors/EconomyPolitics/InternationalTradeDashboard'));
const PoliticsDashboard = lazyPage(() => import('../sectors/EconomyPolitics/PoliticsDashboard'));
const PublicPolicyEconomicStrategyDashboard = lazyPage(() => import('../sectors/EconomyPolitics/PublicPolicyEconomicStrategyDashboard'));
const GeopoliticalRiskTradeAnalysisDashboard = lazyPage(() => import('../sectors/EconomyPolitics/GeopoliticalRiskTradeAnalysisDashboard'));
const ClimateDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/ClimateDashboard'));
const EmissionsDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/EmissionsDashboard'));
const EnergyDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/EnergyDashboard'));
const GreentechDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/GreentechDashboard'));
const WasteDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/WasteDashboard'));
const WaterDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/WaterDashboard'));
const RenewableEnergyInfrastructureDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/RenewableEnergyInfrastructureDashboard'));
const CarbonCaptureClimateTechDashboard = lazyPage(() => import('../sectors/EnergyEnvironment/CarbonCaptureClimateTechDashboard'));
const FinancialInstitutionsDashboard = lazyPage(() => import('../sectors/FinanceInsurance/FinancialInstitutionsDashboard'));
const InvestmentsDashboard = lazyPage(() => import('../sectors/FinanceInsurance/InvestmentsDashboard'));
const FinancialServicesDashboard = lazyPage(() => import('../sectors/FinanceInsurance/FinancialServicesDashboard'));
const InsuranceDashboard = lazyPage(() => import('../sectors/FinanceInsurance/InsuranceDashboard'));
const FinancialTechnologyFintechDashboard = lazyPage(() => import('../sectors/FinanceInsurance/FinancialTechnologyFintechDashboard'));
const DigitalPaymentsDashboard = lazyPage(() => import('../sectors/FinanceInsurance/DigitalPaymentsDashboard'));
const WealthManagementDashboard = lazyPage(() => import('../sectors/FinanceInsurance/WealthManagementDashboard'));
const CareSupportDashboard = lazyPage(() => import('../sectors/HealthPharma/CareSupportDashboard'));
const HospitalsHealthProfessionalsDashboard = lazyPage(() => import('../sectors/HealthPharma/HospitalsHealthProfessionalsDashboard'));
const HealthSystemDashboard = lazyPage(() => import('../sectors/HealthPharma/HealthSystemDashboard'));
const MedicalTechnologyDashboard = lazyPage(() => import('../sectors/HealthPharma/MedicalTechnologyDashboard'));
const PharmaceuticalProductsDashboard = lazyPage(() => import('../sectors/HealthPharma/PharmaceuticalProductsDashboard'));
const StateOfHealthDashboard = lazyPage(() => import('../sectors/HealthPharma/StateOfHealthDashboard'));
const BiotechnologyDashboard = lazyPage(() => import('../sectors/HealthPharma/BiotechnologyDashboard'));
const DigitalHealthDashboard = lazyPage(() => import('../sectors/HealthPharma/DigitalHealthDashboard'));
const MentalHealthServicesDashboard = lazyPage(() => import('../sectors/HealthPharma/MentalHealthServicesDashboard'));
const PharmaDashboard = lazyPage(() => import('../sectors/HealthPharma/PharmaDashboard'));
const HealthCareDashboard = lazyPage(() => import('../sectors/HealthPharma/HealthCareDashboard'));
const CyberCrimeSecurityDashboard = lazyPage(() => import('../sectors/Internet/CyberCrimeSecurityDashboard'));
const CommunicationsDashboard = lazyPage(() => import('../sectors/Internet/CommunicationsDashboard'));
const InternetDemographicsDashboard = lazyPage(() => import('../sectors/Internet/InternetDemographicsDashboard'));
const MobileInternetAppsDashboard = lazyPage(() => import('../sectors/Internet/MobileInternetAppsDashboard'));
const OnlineSearchDashboard = lazyPage(() => import('../sectors/Internet/OnlineSearchDashboard'));
const OnlineVideoEntertainmentDashboard = lazyPage(() => import('../sectors/Internet/OnlineVideoEntertainmentDashboard'));
const ReachTrafficDashboard = lazyPage(() => import('../sectors/Internet/ReachTrafficDashboard'));
const SocialMediaDashboard = lazyPage(() => import('../sectors/Internet/SocialMediaDashboard'));
const AiPlatformsDashboard = lazyPage(() => import('../sectors/Internet/AiPlatformsDashboard'));
const CelebritiesDashboard = lazyPage(() => import('../sectors/Life/CelebritiesDashboard'));
const FamilyFriendsDashboard = lazyPage(() => import('../sectors/Life/FamilyFriendsDashboard'));
const PersonalityBehaviorDashboard = lazyPage(() => import('../sectors/Life/PersonalityBehaviorDashboard'));
const HolidaysDashboard = lazyPage(() => import('../sectors/Life/HolidaysDashboard'));
const MentalHealthWellbeingDashboard = lazyPage(() => import('../sectors/Life/MentalHealthWellbeingDashboard'));
const LongevityHumanPerformanceDashboard = lazyPage(() => import('../sectors/Life/LongevityHumanPerformanceDashboard'));
const AudioDashboard = lazyPage(() => import('../sectors/Media/AudioDashboard'));
const BooksPublishingDashboard = lazyPage(() => import('../sectors/Media/BooksPublishingDashboard'));
const NewsDashboard = lazyPage(() => import('../sectors/Media/NewsDashboard'));
const TVVideoFilmDashboard = lazyPage(() => import('../sectors/Media/TVVideoFilmDashboard'));
const VideoGamingESportsDashboard = lazyPage(() => import('../sectors/Media/VideoGamingESportsDashboard'));
const StreamingPlatformsDashboard = lazyPage(() => import('../sectors/Media/StreamingPlatformsDashboard'));
const PodcastIndustryDashboard = lazyPage(() => import('../sectors/Media/PodcastIndustryDashboard'));
const DigitalPublishingDashboard = lazyPage(() => import('../sectors/Media/DigitalPublishingDashboard'));
const AerospaceDefenseDashboard = lazyPage(() => import('../sectors/MetalsElectronics/AerospaceDefenseDashboard'));
const ElectronicsDashboard = lazyPage(() => import('../sectors/MetalsElectronics/ElectronicsDashboard'));
const IndustrialMachineryDashboard = lazyPage(() => import('../sectors/MetalsElectronics/IndustrialMachineryDashboard'));
const MetalsDashboard = lazyPage(() => import('../sectors/MetalsElectronics/MetalsDashboard'));
const RollingStockDashboard = lazyPage(() => import('../sectors/MetalsElectronics/RollingStockDashboard'));
const ShipbuildingDashboard = lazyPage(() => import('../sectors/MetalsElectronics/ShipbuildingDashboard'));
const VehicleManufacturingDashboard = lazyPage(() => import('../sectors/MetalsElectronics/VehicleManufacturingDashboard'));
const SemiconductorsDashboard = lazyPage(() => import('../sectors/MetalsElectronics/SemiconductorsDashboard'));
const AdvancedRoboticsManufacturingDashboard = lazyPage(() => import('../sectors/MetalsElectronics/AdvancedRoboticsManufacturingDashboard'));
const CommercialRealEstateDashboard = lazyPage(() => import('../sectors/RealEstate/CommercialRealEstateDashboard'));
const IndustrialRealEstateDashboard = lazyPage(() => import('../sectors/RealEstate/IndustrialRealEstateDashboard'));
const MortgagesFinancingDashboard = lazyPage(() => import('../sectors/RealEstate/MortgagesFinancingDashboard'));
const PropertyServicesDashboard = lazyPage(() => import('../sectors/RealEstate/PropertyServicesDashboard'));
const ResidentialRealEstateDashboard = lazyPage(() => import('../sectors/RealEstate/ResidentialRealEstateDashboard'));
const PropTechDashboard = lazyPage(() => import('../sectors/RealEstate/PropTechDashboard'));
const SmartCitiesDevelopmentDashboard = lazyPage(() => import('../sectors/RealEstate/SmartCitiesDevelopmentDashboard'));
const DIYRetailDashboard = lazyPage(() => import('../sectors/RetailTrade/DIYRetailDashboard'));
const FashionAccessoriesDashboard = lazyPage(() => import('../sectors/RetailTrade/FashionAccessoriesDashboard'));
const FoodBeverageRetailDashboard = lazyPage(() => import('../sectors/RetailTrade/FoodBeverageRetailDashboard'));
const FurnitureRetailDashboard = lazyPage(() => import('../sectors/RetailTrade/FurnitureRetailDashboard'));
const GeneralMerchandiseDashboard = lazyPage(() => import('../sectors/RetailTrade/GeneralMerchandiseDashboard'));
const HealthHygieneDashboard = lazyPage(() => import('../sectors/RetailTrade/HealthHygieneDashboard'));
const OfficeSuppliesDashboard = lazyPage(() => import('../sectors/RetailTrade/OfficeSuppliesDashboard'));
const PrivateLabelDashboard = lazyPage(() => import('../sectors/RetailTrade/PrivateLabelDashboard'));
const RetailTechnologyDashboard = lazyPage(() => import('../sectors/RetailTrade/RetailTechnologyDashboard'));
const ShoppingBehaviorDashboard = lazyPage(() => import('../sectors/RetailTrade/ShoppingBehaviorDashboard'));
const SportsLeisureRetailDashboard = lazyPage(() => import('../sectors/RetailTrade/SportsLeisureRetailDashboard'));
const SubscriptionsDirectSellingDashboard = lazyPage(() => import('../sectors/RetailTrade/SubscriptionsDirectSellingDashboard'));
const SupplyChainDashboard = lazyPage(() => import('../sectors/RetailTrade/SupplyChainDashboard'));
const WholesaleDashboard = lazyPage(() => import('../sectors/RetailTrade/WholesaleDashboard'));
const EcommerceLogisticsFulfillmentDashboard = lazyPage(() => import('../sectors/RetailTrade/EcommerceLogisticsFulfillmentDashboard'));
const OmnichannelRetailSystemsDashboard = lazyPage(() => import('../sectors/RetailTrade/OmnichannelRetailSystemsDashboard'));
const BusinessServicesDashboard = lazyPage(() => import('../sectors/Services/BusinessServicesDashboard'));
const SkilledLaborDashboard = lazyPage(() => import('../sectors/Services/SkilledLaborDashboard'));
const DigitalTransformationConsultingDashboard = lazyPage(() => import('../sectors/Services/DigitalTransformationConsultingDashboard'));
const BPODashboard = lazyPage(() => import('../sectors/Services/BPODashboard'));
const CrimeLawEnforcementDashboard = lazyPage(() => import('../sectors/Society/CrimeLawEnforcementDashboard'));
const DemographicsDashboard = lazyPage(() => import('../sectors/Society/DemographicsDashboard'));
const EducationScienceDashboard = lazyPage(() => import('../sectors/Society/EducationScienceDashboard'));
const GeographyNatureDashboard = lazyPage(() => import('../sectors/Society/GeographyNatureDashboard'));
const HistoricalDataDashboard = lazyPage(() => import('../sectors/Society/HistoricalDataDashboard'));
const ReligionDashboard = lazyPage(() => import('../sectors/Society/ReligionDashboard'));
const UrbanDevelopmentPolicyDashboard = lazyPage(() => import('../sectors/Society/UrbanDevelopmentPolicyDashboard'));
const PopulationAnalyticsDashboard = lazyPage(() => import('../sectors/Society/PopulationAnalyticsDashboard'));
const ArtCultureDashboard = lazyPage(() => import('../sectors/SportsRecreation/ArtCultureDashboard'));
const GamblingDashboard = lazyPage(() => import('../sectors/SportsRecreation/GamblingDashboard'));
const HobbiesDashboard = lazyPage(() => import('../sectors/SportsRecreation/HobbiesDashboard'));
const ParksOutdoorsDashboard = lazyPage(() => import('../sectors/SportsRecreation/ParksOutdoorsDashboard'));
const ProfessionalSportsDashboard = lazyPage(() => import('../sectors/SportsRecreation/ProfessionalSportsDashboard'));
const SportsFitnessDashboard = lazyPage(() => import('../sectors/SportsRecreation/SportsFitnessDashboard'));
const WellnessSpasDashboard = lazyPage(() => import('../sectors/SportsRecreation/WellnessSpasDashboard'));
const SportsAnalyticsPerformanceDashboard = lazyPage(() => import('../sectors/SportsRecreation/SportsAnalyticsPerformanceDashboard'));
const EsportsGamingIndustryDashboard = lazyPage(() => import('../sectors/SportsRecreation/EsportsGamingIndustryDashboard'));
const ConsumerElectronicsDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/ConsumerElectronicsDashboard'));
const HardwareDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/HardwareDashboard'));
const HouseholdAppliancesDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/HouseholdAppliancesDashboard'));
const ITServicesDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/ITServicesDashboard'));
const SoftwareDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/SoftwareDashboard'));
const TelecommunicationsDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/TelecommunicationsDashboard'));
const CloudServicesDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/CloudServicesDashboard'));
const ArtificialIntelligenceDashboard = lazyPage(() => import('../sectors/TechnologyTelecommunications/ArtificialIntelligenceDashboard'));
const AviationDashboard = lazyPage(() => import('../sectors/TransportationLogistics/AviationDashboard'));
const LogisticsDashboard = lazyPage(() => import('../sectors/TransportationLogistics/LogisticsDashboard'));
const PublicTransportDashboard = lazyPage(() => import('../sectors/TransportationLogistics/PublicTransportDashboard'));
const RailTransportDashboard = lazyPage(() => import('../sectors/TransportationLogistics/RailTransportDashboard'));
const VehiclesRoadTrafficDashboard = lazyPage(() => import('../sectors/TransportationLogistics/VehiclesRoadTrafficDashboard'));
const WaterTransportDashboard = lazyPage(() => import('../sectors/TransportationLogistics/WaterTransportDashboard'));
const ElectricVehicleEvInfrastructureDashboard = lazyPage(() => import('../sectors/TransportationLogistics/ElectricVehicleEvInfrastructureDashboard'));
const AutonomousVehiclesDashboard = lazyPage(() => import('../sectors/TransportationLogistics/AutonomousVehiclesDashboard'));
const AccommodationDashboard = lazyPage(() => import('../sectors/TravelTourism/AccommodationDashboard'));
const BusinessTravelDashboard = lazyPage(() => import('../sectors/TravelTourism/BusinessTravelDashboard'));
const FoodDrinkServicesDashboard = lazyPage(() => import('../sectors/TravelTourism/FoodDrinkServicesDashboard'));
const LeisureTravelDashboard = lazyPage(() => import('../sectors/TravelTourism/LeisureTravelDashboard'));
const MedicalTourismDashboard = lazyPage(() => import('../sectors/TravelTourism/MedicalTourismDashboard'));
const TravelTechnologyDashboard = lazyPage(() => import('../sectors/TravelTourism/TravelTechnologyDashboard'));
const BuildingConstructionDashboard = lazyPage(() => import('../sectors/Construction/BuildingConstructionDashboard'));
const HeavyConstructionDashboard = lazyPage(() => import('../sectors/Construction/HeavyConstructionDashboard'));
const SmartConstructionBIMDashboard = lazyPage(() => import('../sectors/Construction/SmartConstructionBIMDashboard'));
const ModularPrefabConstructionDashboard = lazyPage(() => import('../sectors/Construction/ModularPrefabConstructionDashboard'));
const B2BEcommerceDashboard = lazyPage(() => import('../sectors/Ecommerce/B2BEcommerceDashboard'));
const B2CEcommerceDashboard = lazyPage(() => import('../sectors/Ecommerce/B2CEcommerceDashboard'));
const C2CEcommerceDashboard = lazyPage(() => import('../sectors/Ecommerce/C2CEcommerceDashboard'));
const DigitalShoppingBehaviourDashboard = lazyPage(() => import('../sectors/Ecommerce/DigitalShoppingBehaviourDashboard'));
const ECommerceKeyFiguresDashboard = lazyPage(() => import('../sectors/Ecommerce/EcommerceKeyFiguresDashboard'));
const PaidContentDashboard = lazyPage(() => import('../sectors/Ecommerce/PaidContentDashboard'));
const OnlineMarketplacesDashboard = lazyPage(() => import('../sectors/Ecommerce/OnlineMarketplacesDashboard'));
const CrossBorderEcommerceDashboard = lazyPage(() => import('../sectors/Ecommerce/CrossBorderECommerceDashboard'));
const SocialCommerceDashboard = lazyPage(() => import('../sectors/Ecommerce/SocialCommerceDashboard'));

const RouteLoadingState: React.FC = () => (
  <div className="app-page-shell-wide py-10">
    <div className="flex min-h-[280px] items-center justify-center rounded-xl bg-card shadow-sm ring-1 ring-border/60">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-foreground" />
        <p className="text-sm font-medium text-muted-foreground">جاري تحميل الصفحة...</p>
      </div>
    </div>
  </div>
);

interface DashboardRouterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  sections: PlanSection[];
  handleSectionUpdate: (id: string, updates: Partial<PlanSection>) => void;
  expandedSectionId: string | null;
  onSectionExpand: (id: string | null) => void;
  setSubTabLabel: (label: string | null) => void;
  subTabLabel?: string | null;
  selectedCompanyId?: string;
  setSelectedCompanyId?: (id: string) => void;
}

export const DashboardRouter: React.FC<DashboardRouterProps> = ({
  activeTab,
  setActiveTab,
  user,
  sections,
  handleSectionUpdate,
  expandedSectionId,
  onSectionExpand,
  setSubTabLabel,
  subTabLabel,
  selectedCompanyId,
  setSelectedCompanyId
}) => {
  const { updateProfile, updateBrand, setPlanSections } = useProjectWorkspace();
  
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  const containerClass = ['home', 'editor', 'strategic-dashboard', 'contact-us', 'market-discovery', 'problem-engine', 'problem-detail', 'saved-market-items', 'hackathon', 'workspace', 'first-90-days', 'platform-academy', 'financial-calculator', 'company-deep-dive', 'site-map', 'discovery-center', 'subscriber-hub', 'customer-dashboard', 'customer-projects', 'customer-subscription', 'customer-usage', 'customer-activity', 'customer-account', 'customer-support', 'proven-projects', 'failed-projects', 'saas-ideas', 'micro-saas-ideas', 'project-ideas'].includes(activeTab) || activeTab.endsWith('-dashboard') 
    ? 'w-full' 
    : 'app-page-shell-wide py-6 sm:py-8 lg:py-10 pb-20 lg:pb-10';

  const handleBuildPlan = (projectName?: string) => {
    if (projectName) {
      updateProfile({ name: projectName });
    }
    setActiveTab('workspace');
  };

  const handleCompanyClick = (companyId: string) => {
    if (setSelectedCompanyId) {
      setSelectedCompanyId(companyId);
      setActiveTab('company-deep-dive');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'financial-calculator':
        return <RevenueCalculatorView setActiveTab={setActiveTab} />;
      case 'platform-academy':
        return <PlatformAcademyView setActiveTab={setActiveTab} />;
      case 'first-90-days':
        return <First90DaysView setActiveTab={setActiveTab} />;
      case 'saved-market-items':
        return <SavedMarketItems setActiveTab={setActiveTab} />;
      case 'problem-detail':
        return <ProblemDeepDive onBack={() => setActiveTab('problem-engine')} />;
      case 'company-deep-dive':
        return <CompanyDeepDive companyId={selectedCompanyId} onBack={() => setActiveTab('home')} />;
      case 'home':
      case 'admin-dashboard':
        return <Home setActiveTab={setActiveTab} onCompanyClick={handleCompanyClick} />;
      case 'profile':
      case 'settings':
      case 'customer-account':
        return <Settings user={user} />;
      case 'subscriber-hub':
      case 'customer-dashboard':
      case 'customer-projects':
      case 'customer-activity':
      case 'customer-support':
        return <Profile user={user} setActiveTab={setActiveTab} />;
      case 'customer-subscription':
      case 'customer-usage':
      case 'pricing':
        return <PricingPlans setActiveTab={setActiveTab} />;
      case 'workspace':
        return <UnifiedWorkspace setActiveTab={setActiveTab} />;
      case 'users-management':
        return <UsersManagement />;
      case 'admin-plans':
        return <AdminProjectsManagement />;
      case 'admin-analytics':
        return <AdminAnalyticsDashboard />;
      case 'admin-security':
        return <AdminSecurityDashboard />;
      case 'my-plans':
        return <MyProjects setActiveTab={setActiveTab} />;
      case 'project-edit': {
        const projectId = getProjectIdFromEditPath(window.location.pathname);
        return (
          <NewPlan
            key={`project-edit-${projectId || 'missing'}`}
            editProjectId={projectId}
            onStart={(id) => id === 'easy' ? setActiveTab('strategic-dashboard') : setActiveTab('editor')}
            onBuildPlan={() => setActiveTab('workspace')}
            setSubTabLabel={typeof setSubTabLabel === 'function' ? setSubTabLabel : (() => {})}
            fallbackEditor={(
              <BusinessPlanEditor
                sections={sections}
                onSectionUpdate={handleSectionUpdate}
                expandedSectionId={expandedSectionId}
                onSectionExpand={onSectionExpand}
                setActiveTab={setActiveTab}
                onWorkspaceSync={setPlanSections}
              />
            )}
          />
        );
      }
      case 'proven-projects':
        return <ProvenProjectsGallery setSubTabLabel={setSubTabLabel} />;
      case 'failed-projects':
        return <FailedProjectsGallery setSubTabLabel={setSubTabLabel} />;
      case 'saas-ideas':
        return <SaaSIdeasGallery setSubTabLabel={setSubTabLabel} />;
      case 'micro-saas-ideas':
        return <MicroSaaSIdeasGallery setSubTabLabel={setSubTabLabel} />;
      case 'project-ideas':
        return <ProjectIdeasHub setActiveTab={setActiveTab} />;
      case 'new-plan':
      // Guard optional props to avoid runtime ReferenceError if not provided by the caller
          const subTabLabelSafe = typeof subTabLabel === 'string' ? subTabLabel : undefined;
          const setSubTabLabelSafe = typeof setSubTabLabel === 'function' ? setSubTabLabel : undefined;
          return (
          <NewPlan 
            key={`${activeTab}-${subTabLabel ? 'sub' : 'root'}`}
            onStart={(id) => id === 'easy' ? setActiveTab('strategic-dashboard') : setActiveTab('editor')} 
            onBuildPlan={() => setActiveTab('workspace')}
              setSubTabLabel={setSubTabLabelSafe} 
              subTabLabel={subTabLabelSafe}
            />
          );
        case 'new-plan-family':
          return (
            <NewPlan
              key="new-plan-family"
              initialMode="family"
              onStart={(id) => id === 'easy' ? setActiveTab('strategic-dashboard') : setActiveTab('editor')}
              onBuildPlan={() => setActiveTab('workspace')}
              setSubTabLabel={typeof setSubTabLabel === 'function' ? setSubTabLabel : (() => {})}
              subTabLabel="النموذج السهل"
            />
          );
        case 'new-plan-pro':
          return (
            <NewPlan
              key="new-plan-pro"
              initialMode="easy"
              onStart={() => setActiveTab('strategic-dashboard')}
              onBuildPlan={() => setActiveTab('workspace')}
              setSubTabLabel={typeof setSubTabLabel === 'function' ? setSubTabLabel : (() => {})}
              subTabLabel="النموذج الاحترافي"
            />
          );
        case 'strategic-dashboard':
          return <ResultPage />;
        case 'new-plan-mit24':
          return (
            <NewPlan
              key="new-plan-mit24"
              initialMode="mit24"
              onStart={(id) => id === 'easy' ? setActiveTab('strategic-dashboard') : setActiveTab('editor')}
              onBuildPlan={() => setActiveTab('workspace')}
              setSubTabLabel={typeof setSubTabLabel === 'function' ? setSubTabLabel : (() => {})}
              subTabLabel="MIT 24 Steps"
            />
          );
        case 'new-plan-bmc':
          return (
            <NewPlan
              key="new-plan-bmc"
              initialMode="bmc"
              onStart={(id) => id === 'easy' ? setActiveTab('strategic-dashboard') : setActiveTab('editor')}
              onBuildPlan={() => setActiveTab('workspace')}
              setSubTabLabel={typeof setSubTabLabel === 'function' ? setSubTabLabel : (() => {})}
              subTabLabel="بناء نموذج العمل BMC"
            />
          );
        case 'new-plan-lean':
          return (
            <NewPlan
              key="new-plan-lean"
              initialMode="lean"
              onStart={(id) => id === 'easy' ? setActiveTab('strategic-dashboard') : setActiveTab('editor')}
              onBuildPlan={() => setActiveTab('workspace')}
              setSubTabLabel={typeof setSubTabLabel === 'function' ? setSubTabLabel : (() => {})}
              subTabLabel="منهجية Lean Startup"
            />
          );
      case 'bmc':
        return <BusinessModelCanvas onComplete={() => setActiveTab('workspace')} />;
      case 'brand-identity':
        return (
          <BrandIdentityStudio
            setActiveTab={setActiveTab}
            onBrandDraftChange={(draft) =>
              updateBrand({
                prompt: draft.prompt,
                personality: draft.personality,
                palette: draft.palette,
              })
            }
          />
        );
      case 'unicorn-benchmark':
        return <UnicornBenchmarking />;
      case 'discovery-center':
      case 'market-discovery':
        return (
          <DiscoveryCenter
            setActiveTab={setActiveTab}
            onSelectSector={(sector) =>
              updateProfile({
                sectorId: sector.id,
                sectorLabel: sector.label,
                sectorGroup: sector.groupTitle,
                opportunityTitle: sector.label,
              })
            }
          />
        );
      case 'hackathon':
        return <HackathonView />;
      case 'contact-us':
        return <ContactUs />;
      case 'tasks':
        return <Tasks />;
      case 'changelog':
        return <Changelog />;
      case 'notifications':
        return <Notifications setActiveTab={setActiveTab} />;
      case 'site-map':
        return <MobileSiteMap setActiveTab={setActiveTab} />;
      case 'editor':
        return (
          <BusinessPlanEditor 
            sections={sections} 
            onSectionUpdate={handleSectionUpdate}
            expandedSectionId={expandedSectionId}
            onSectionExpand={onSectionExpand}
            setActiveTab={setActiveTab}
            onWorkspaceSync={setPlanSections}
          />
        );
      case 'advertising-dashboard':
        return <AdvertisingDashboard sectorId="advertising-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلانات والتسويق" />;
      case 'marketing-dashboard':
        return <MarketingDashboard sectorId="marketing-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلانات والتسويق" />;
      case 'brands-leaders-dashboard':
        return <BrandsLeadersDashboard sectorId="brands-leaders-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلانات والتسويق" />;
      case 'influencer-marketing-dashboard':
        return <InfluencerMarketingDashboard sectorId="influencer-marketing-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلانات والتسويق" />;
      case 'farming-dashboard':
        return <FarmingDashboard sectorId="farming-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الزراعة والموارد الطبيعية" />;
      case 'fisheries-aquaculture-dashboard':
        return <FisheriesAquacultureDashboard sectorId="fisheries-aquaculture-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الزراعة والموارد الطبيعية" />;
      case 'forestry-dashboard':
        return <ForestryDashboard sectorId="forestry-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الزراعة والموارد الطبيعية" />;
      case 'chemical-industry-dashboard':
        return <ChemicalIndustryDashboard sectorId="chemical-industry-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
      case 'fossil-fuels-dashboard':
        return <FossilFuelsDashboard sectorId="fossil-fuels-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
      case 'mining-dashboard':
        return <MiningDashboard sectorId="mining-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
      case 'alcoholic-beverages-dashboard':
        return <MarketInsightPlaceholder title="المشروبات الكحولية" category="السلع الاستهلاكية" summary="تم إنشاء هذه الصفحة كواجهة انتقالية مرتبطة لأن بطاقة القطاع كانت تظهر في اكتشاف السوق دون شاشة فعلية. يمكنك العودة للمكتبة أو متابعة بناء المشروع من المساحة التنفيذية." setActiveTab={setActiveTab} />;
      case 'cannabis-dashboard':
        return <MarketInsightPlaceholder title="القنب القانوني" category="السلع الاستهلاكية" summary="كانت هذه البطاقة قابلة للنقر داخل اكتشاف السوق من دون صفحة عرض مقابلة. أصبحت الآن مرتبطة بواجهة انتقالية واضحة بدلاً من شاشة فارغة." setActiveTab={setActiveTab} />;
      case 'tobacco-dashboard':
        return <MarketInsightPlaceholder title="التبغ" category="السلع الاستهلاكية" summary="هذه الصفحة أضيفت كمسار واجهة صالح حتى لا يبقى قطاع التبغ رابطاً مكسوراً داخل رادار السوق." setActiveTab={setActiveTab} />;
      case 'love-sex-dashboard':
        return <MarketInsightPlaceholder title="الحب والعلاقات الحميمة" category="الحياة والمجتمع" summary="أصبح القطاع متصلاً بواجهة عرض انتقالية تحافظ على استمرارية التنقل، إلى أن تتم إضافة لوحة بيانات متخصصة له لاحقاً." setActiveTab={setActiveTab} />;
      case 'petroleum-refinery-dashboard': 
        return <PetroleumRefineryDashboard sectorId="petroleum-refinery-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
      case 'plastic-rubber-dashboard': 
        return <PlasticRubberDashboard sectorId="plastic-rubber-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
      case 'pulp-paper-dashboard': 
        return <PulpPaperDashboard sectorId="pulp-paper-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
      case 'building-construction-dashboard': 
        return <BuildingConstructionDashboard sectorId="building-construction-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="البناء والإنشاءات" />;
      case 'heavy-construction-dashboard': 
        return <HeavyConstructionDashboard sectorId="heavy-construction-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="البناء والإنشاءات" />;
      case 'smart-construction-bim-dashboard': 
        return <SmartConstructionBIMDashboard sectorId="smart-construction-bim-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="البناء والإنشاءات" />;
      case 'modular-prefab-construction-dashboard': 
        return <ModularPrefabConstructionDashboard sectorId="modular-prefab-construction-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="البناء والإنشاءات" />;
      // FMCG - Consumer Goods & FMCG
      case 'apparel-shoes-dashboard': 
        return <ApparelShoesDashboard sectorId="apparel-shoes-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'cleaning-products-dashboard': 
        return <CleaningProductsDashboard sectorId="cleaning-products-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'cosmetics-personal-care-dashboard': 
        return <CosmeticsPersonalCareDashboard sectorId="cosmetics-personal-care-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'food-nutrition-dashboard': 
        return <FoodNutritionDashboard sectorId="food-nutrition-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'furniture-household-dashboard': 
        return <FurnitureHouseholdDashboard sectorId="furniture-household-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'garden-patio-dashboard': 
        return <GardenPatioDashboard sectorId="garden-patio-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'home-improvement-dashboard': 
        return <HomeImprovementDashboard sectorId="home-improvement-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'non-alcoholic-beverages-dashboard': 
        return <NonAlcoholicBeveragesDashboard sectorId="non-alcoholic-beverages-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'pet-supplies-dashboard': 
        return <PetSuppliesDashboard sectorId="pet-supplies-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'toys-dashboard': 
        return <ToysDashboard sectorId="toys-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;
      case 'packaged-foods-dashboard': 
        return <PackagedFoodsDashboard sectorId="packaged-foods-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السلع الاستهلاكية (FMCG)" />;

      // Finance & Insurance
      case 'financial-institutions-dashboard': 
        return <FinancialInstitutionsDashboard sectorId="financial-institutions-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المال والتأمين" />;
      case 'investments-dashboard': 
        return <InvestmentsDashboard sectorId="investments-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المال والتأمين" />;
      case 'financial-services-dashboard': 
        return <FinancialServicesDashboard sectorId="financial-services-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المال والتأمين" />;
      case 'insurance-dashboard': 
        return <InsuranceDashboard sectorId="insurance-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المال والتأمين" />;
      // Health, Pharma & Medtech
      case 'care-support-dashboard': 
        return <CareSupportDashboard sectorId="care-support-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الصحة والأدوية" />;
      case 'hospitals-health-professionals-dashboard': 
        return <HospitalsHealthProfessionalsDashboard sectorId="hospitals-health-professionals-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الصحة والأدوية" />;
      case 'health-system-dashboard': 
        return <HealthSystemDashboard sectorId="health-system-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الصحة والأدوية" />;
      case 'medical-technology-dashboard': 
        return <MedicalTechnologyDashboard sectorId="medical-technology-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الصحة والأدوية" />;
      case 'pharma-market-dashboard': 
        return <PharmaceuticalProductsDashboard sectorId="pharma-market-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الصحة والأدوية" />;
      case 'state-of-health-dashboard': 
        return <StateOfHealthDashboard sectorId="state-of-health-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الصحة والأدوية" />;
      // Internet
      case 'communications-dashboard': 
        return <CommunicationsDashboard sectorId="communications-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'cyber-crime-security-dashboard': 
        return <CyberCrimeSecurityDashboard sectorId="cyber-crime-security-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'internet-demographics-dashboard': 
        return <InternetDemographicsDashboard sectorId="internet-demographics-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'mobile-internet-apps-dashboard': 
        return <MobileInternetAppsDashboard sectorId="mobile-internet-apps-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'online-search-dashboard': 
        return <OnlineSearchDashboard sectorId="online-search-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'online-video-entertainment-dashboard': 
        return <OnlineVideoEntertainmentDashboard sectorId="online-video-entertainment-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'reach-traffic-dashboard': 
        return <ReachTrafficDashboard sectorId="reach-traffic-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      case 'social-media-dashboard': 
        return <SocialMediaDashboard sectorId="social-media-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإنترنت والاتصالات" />;
      // Life
      case 'celebrities-dashboard': 
        return <CelebritiesDashboard sectorId="celebrities-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'family-friends-dashboard': 
        return <FamilyFriendsDashboard sectorId="family-friends-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'personality-behavior-dashboard': 
        return <PersonalityBehaviorDashboard sectorId="personality-behavior-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'holidays-dashboard': 
        return <HolidaysDashboard sectorId="holidays-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'mental-health-wellbeing-economy-dashboard': 
        return <MentalHealthWellbeingDashboard sectorId="mental-health-wellbeing-economy-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'longevity-human-performance-dashboard': 
        return <LongevityHumanPerformanceDashboard sectorId="longevity-human-performance-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      // Media
      case 'audio-dashboard': 
        return <AudioDashboard sectorId="audio-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلام والترفيه" />;
      case 'books-publishing-dashboard': 
        return <BooksPublishingDashboard sectorId="books-publishing-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلام والترفيه" />;
      case 'news-dashboard': 
        return <NewsDashboard sectorId="news-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلام والترفيه" />;
      case 'tv-video-film-dashboard': 
        return <TVVideoFilmDashboard sectorId="tv-video-film-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلام والترفيه" />;
      case 'video-gaming-esports-dashboard': 
        return <VideoGamingESportsDashboard sectorId="video-gaming-esports-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الإعلام والترفيه" />;
      // Metals & Electronics
      case 'aerospace-defense-dashboard': 
        return <AerospaceDefenseDashboard sectorId="aerospace-defense-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'electronics-dashboard': 
        return <ElectronicsDashboard sectorId="electronics-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'industrial-machinery-dashboard': 
        return <IndustrialMachineryDashboard sectorId="industrial-machinery-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'metals-dashboard': 
        return <MetalsDashboard sectorId="metals-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'rolling-stock-dashboard': 
        return <RollingStockDashboard sectorId="rolling-stock-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'shipbuilding-dashboard': 
        return <ShipbuildingDashboard sectorId="shipbuilding-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'vehicle-manufacturing-dashboard': 
        return <VehicleManufacturingDashboard sectorId="vehicle-manufacturing-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'semiconductors-dashboard': 
        return <SemiconductorsDashboard sectorId="semiconductors-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'advanced-robotics-manufacturing-dashboard': 
        return <AdvancedRoboticsManufacturingDashboard sectorId="advanced-robotics-manufacturing-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      // Real Estate
      case 'commercial-real-estate-dashboard': 
        return <CommercialRealEstateDashboard sectorId="commercial-real-estate-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      case 'industrial-real-estate-dashboard': 
        return <IndustrialRealEstateDashboard sectorId="industrial-real-estate-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      case 'mortgages-financing-dashboard': 
        return <MortgagesFinancingDashboard sectorId="mortgages-financing-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      case 'property-services-dashboard': 
        return <PropertyServicesDashboard sectorId="property-services-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      case 'residential-real-estate-dashboard': 
        return <ResidentialRealEstateDashboard sectorId="residential-real-estate-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      case 'proptech-dashboard': 
        return <PropTechDashboard sectorId="proptech-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      case 'smart-cities-development-dashboard': 
        return <SmartCitiesDevelopmentDashboard sectorId="smart-cities-development-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="العقارات" />;
      // Retail & Trade
      case 'diy-retail-dashboard': 
        return <DIYRetailDashboard sectorId="diy-retail-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'fashion-accessories-dashboard': 
        return <FashionAccessoriesDashboard sectorId="fashion-accessories-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'food-beverage-retail-dashboard': 
        return <FoodBeverageRetailDashboard sectorId="food-beverage-retail-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'furniture-retail-dashboard': 
        return <FurnitureRetailDashboard sectorId="furniture-retail-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'general-merchandise-dashboard': 
        return <GeneralMerchandiseDashboard sectorId="general-merchandise-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'health-hygiene-dashboard': 
        return <HealthHygieneDashboard sectorId="health-hygiene-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'international-trade-dashboard-retail-legacy': 
        return <InternationalTradeDashboard sectorId="international-trade-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'office-supplies-dashboard': 
        return <OfficeSuppliesDashboard sectorId="office-supplies-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'private-label-dashboard': 
        return <PrivateLabelDashboard sectorId="private-label-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'retail-technology-dashboard': 
        return <RetailTechnologyDashboard sectorId="retail-technology-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'shopping-behavior-dashboard': 
        return <ShoppingBehaviorDashboard sectorId="shopping-behavior-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'sports-leisure-retail-dashboard': 
        return <SportsLeisureRetailDashboard sectorId="sports-leisure-retail-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'subscriptions-direct-selling-dashboard': 
        return <SubscriptionsDirectSellingDashboard sectorId="subscriptions-direct-selling-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'supply-chain-dashboard': 
        return <SupplyChainDashboard sectorId="supply-chain-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'wholesale-dashboard': 
        return <WholesaleDashboard sectorId="wholesale-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'ecommerce-logistics-fulfillment-dashboard': 
        return <EcommerceLogisticsFulfillmentDashboard sectorId="ecommerce-logistics-fulfillment-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      case 'omnichannel-retail-systems-dashboard': 
        return <OmnichannelRetailSystemsDashboard sectorId="omnichannel-retail-systems-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجزئة والتجارة" />;
      // Services
      case 'business-services-dashboard': 
        return <BusinessServicesDashboard sectorId="business-services-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'skilled-labor-dashboard': 
        return <SkilledLaborDashboard sectorId="skilled-labor-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'digital-transformation-consulting-dashboard': 
        return <DigitalTransformationConsultingDashboard sectorId="digital-transformation-consulting-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'bpo-dashboard': 
        return <BPODashboard sectorId="bpo-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      // Society
      case 'crime-law-enforcement-dashboard': 
        return <CrimeLawEnforcementDashboard sectorId="crime-law-enforcement-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'demographics-dashboard': 
        return <DemographicsDashboard sectorId="demographics-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'education-science-dashboard': 
        return <EducationScienceDashboard sectorId="education-science-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'geography-nature-dashboard': 
        return <GeographyNatureDashboard sectorId="geography-nature-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'historical-data-dashboard': 
        return <HistoricalDataDashboard sectorId="historical-data-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'religion-dashboard': 
        return <ReligionDashboard sectorId="religion-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'urban-development-smart-cities-policy-dashboard': 
        return <UrbanDevelopmentPolicyDashboard sectorId="urban-development-smart-cities-policy-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'population-analytics-demographic-intelligence-dashboard': 
        return <PopulationAnalyticsDashboard sectorId="population-analytics-demographic-intelligence-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الخدمات والمجتمع" />;
      case 'art-culture-dashboard': 
        return <ArtCultureDashboard sectorId="art-culture-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'gambling-dashboard': 
        return <GamblingDashboard sectorId="gambling-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'hobbies-dashboard': 
        return <HobbiesDashboard sectorId="hobbies-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'parks-outdoors-dashboard': 
        return <ParksOutdoorsDashboard sectorId="parks-outdoors-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'professional-sports-dashboard': 
        return <ProfessionalSportsDashboard sectorId="professional-sports-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'sports-fitness-dashboard': 
        return <SportsFitnessDashboard sectorId="sports-fitness-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'wellness-spas-dashboard': 
        return <WellnessSpasDashboard sectorId="wellness-spas-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'sports-analytics-performance-tech-dashboard': 
        return <SportsAnalyticsPerformanceDashboard sectorId="sports-analytics-performance-tech-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      case 'esports-gaming-industry-dashboard': 
        return <EsportsGamingIndustryDashboard sectorId="esports-gaming-industry-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الرياضة والاستجمام" />;
      // Technology & Telecommunications
      case 'consumer-electronics-dashboard': 
        return <ConsumerElectronicsDashboard sectorId="consumer-electronics-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'hardware-dashboard': 
        return <HardwareDashboard sectorId="hardware-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'household-appliances-dashboard': 
        return <HouseholdAppliancesDashboard sectorId="household-appliances-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'it-services-dashboard': 
        return <ITServicesDashboard sectorId="it-services-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'software-dashboard': 
        return <SoftwareDashboard sectorId="software-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'telecommunications-dashboard': 
        return <TelecommunicationsDashboard sectorId="telecommunications-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'artificial-intelligence-dashboard': 
        return <ArtificialIntelligenceDashboard sectorId="artificial-intelligence-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'cloud-services-dashboard': 
        return <CloudServicesDashboard sectorId="cloud-services-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التكنولوجيا والاتصالات" />;
      case 'api-governance-infrastructure-dashboard': return <PublicPolicyEconomicStrategyDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;
      case 'geopolitical-risk-analysis-dashboard': return <GeopoliticalRiskTradeAnalysisDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;
      case 'renewable-energy-integration-dashboard': return <RenewableEnergyInfrastructureDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'carbon-neutrality-tech-dashboard': return <CarbonCaptureClimateTechDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'mental-wellness-wellbeing-dashboard': return <MentalHealthWellbeingDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'longevity-biotech-performance-dashboard': return <LongevityHumanPerformanceDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="الحياة والمجتمع" />;
      case 'semiconductor-foundary-dashboard': return <SemiconductorsDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      case 'industrial-iot-automation-dashboard': return <AdvancedRoboticsManufacturingDashboard onBack={() => setActiveTab('market-discovery')} parentCategory="المعادن والإلكترونيات" />;
      
      // Additional dashboards from late imports
      // E-Commerce
      case 'b2b-ecommerce-dashboard': 
        return <B2BEcommerceDashboard sectorId="b2b-ecommerce-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجارة الإلكترونية" />;
      case 'b2c-ecommerce-dashboard': 
        return <B2CEcommerceDashboard sectorId="b2c-ecommerce-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجارة الإلكترونية" />;
      case 'c2c-ecommerce-dashboard': 
        return <C2CEcommerceDashboard sectorId="c2c-ecommerce-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجارة الإلكترونية" />;
      case 'digital-shopping-behaviour-dashboard': 
        return <DigitalShoppingBehaviourDashboard sectorId="digital-shopping-behaviour-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجارة الإلكترونية" />;
      case 'ecommerce-key-figures-dashboard': 
        return <ECommerceKeyFiguresDashboard sectorId="ecommerce-key-figures-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجارة الإلكترونية" />;
      case 'paid-content-dashboard': 
        return <PaidContentDashboard sectorId="paid-content-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="التجارة الإلكترونية" />;
      case 'seo-content-marketing': return <SearchEngineOptimizationContentMarketingDashboard />;
      case 'agritech-dashboard': return <AgriculturalTechnologyAgritechDashboard />;
      case 'smart-farming': return <SmartFarmingDashboard />;
      case 'seeds-crop-protection-dashboard':
      case 'seeds-crop-protection': 
        return <SeedsCropProtectionDashboard sectorId="seeds-crop-protection-dashboard" onBack={() => setActiveTab('market-discovery')} onBuildPlan={handleBuildPlan} parentCategory="الزراعة والموارد الطبيعية" />;
      case 'recycled-materials': return <RecycledMaterialsDashboard />;
      case 'battery-materials': return <BatteryMaterialsDashboard />;
      case 'sustainable-consumer-goods': return <SustainableConsumerGoodsDashboard />;
      case 'packaged-foods': return <PackagedFoodsDashboard />;
      case 'online-marketplaces': return <OnlineMarketplacesDashboard />;
      case 'cross-border-ecommerce': return <CrossBorderEcommerceDashboard />;
      case 'social-commerce': return <SocialCommerceDashboard />;
      case 'fintech': return <FinancialTechnologyFintechDashboard />;
      case 'digital-payments': return <DigitalPaymentsDashboard />;
      case 'wealth-management': return <WealthManagementDashboard />;
      case 'biotechnology': return <BiotechnologyDashboard />;
      case 'digital-health': return <DigitalHealthDashboard />;
      case 'mental-health-services': return <MentalHealthServicesDashboard />;
      case 'ai-platforms': return <AiPlatformsDashboard />;
      case 'problem-engine': return <ProblemOpportunityEngine setActiveTab={setActiveTab} />;
      case 'cloud-services-internet': return <CloudServicesDashboard />;
      case 'streaming-platforms': return <StreamingPlatformsDashboard />;
      case 'podcast-industry': return <PodcastIndustryDashboard />;
      case 'digital-publishing': return <DigitalPublishingDashboard />;
      case 'artificial-intelligence-new': return <ArtificialIntelligenceDashboard />;
      // Transportation & Logistics
      case 'aviation-dashboard': 
        return <AviationDashboard sectorId="aviation-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'logistics-dashboard': 
        return <LogisticsDashboard sectorId="logistics-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'public-transport-dashboard': 
        return <PublicTransportDashboard sectorId="public-transport-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'rail-transport-dashboard': 
        return <RailTransportDashboard sectorId="rail-transport-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'vehicles-road-traffic-dashboard': 
        return <VehiclesRoadTrafficDashboard sectorId="vehicles-road-traffic-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'water-transport-dashboard': 
        return <WaterTransportDashboard sectorId="water-transport-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'autonomous-vehicles-dashboard': 
        return <AutonomousVehiclesDashboard sectorId="autonomous-vehicles-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      case 'ev-infrastructure-dashboard': 
        return <ElectricVehicleEvInfrastructureDashboard sectorId="ev-infrastructure-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="النقل واللوجستيات" />;
      // Travel, Tourism & Hospitality
      case 'accommodation-dashboard': 
        return <AccommodationDashboard sectorId="accommodation-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السياحة والضيافة" />;
      case 'business-travel-dashboard': 
        return <BusinessTravelDashboard sectorId="business-travel-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السياحة والضيافة" />;
      case 'food-drink-services-dashboard': 
        return <FoodDrinkServicesDashboard sectorId="food-drink-services-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السياحة والضيافة" />;
      case 'leisure-travel-dashboard': 
        return <LeisureTravelDashboard sectorId="leisure-travel-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السياحة والضيافة" />;
      case 'medical-tourism-dashboard': 
        return <MedicalTourismDashboard sectorId="medical-tourism-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السياحة والضيافة" />;
      case 'travel-technology-dashboard': 
        return <TravelTechnologyDashboard sectorId="travel-technology-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="السياحة والضيافة" />;
      // Economy & Politics
      case 'economy-dashboard': 
        return <EconomyDashboard sectorId="economy-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;
      case 'international-trade-dashboard':
        return <InternationalTradeDashboard sectorId="international-trade-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;
      case 'politics-dashboard': 
        return <PoliticsDashboard sectorId="politics-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;
      // Energy & Environment
      case 'climate-dashboard': 
        return <ClimateDashboard sectorId="climate-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'emissions-dashboard': 
        return <EmissionsDashboard sectorId="emissions-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'energy-dashboard': 
        return <EnergyDashboard sectorId="energy-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'greentech-dashboard': 
        return <GreentechDashboard sectorId="greentech-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'waste-dashboard': 
        return <WasteDashboard sectorId="waste-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'water-dashboard': 
        return <WaterDashboard sectorId="water-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'pharma-dashboard': return <PharmaDashboard />;
      case 'healthcare-dashboard': return <HealthCareDashboard />;

      // New ones added by scripts

      case 'renewable-energy-infrastructure-dashboard': 
        return <RenewableEnergyInfrastructureDashboard sectorId="renewable-energy-infrastructure-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'carbon-capture-climate-tech-dashboard': 
        return <CarbonCaptureClimateTechDashboard sectorId="carbon-capture-climate-tech-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الطاقة والبيئة" />;
      case 'public-policy-economic-strategy-dashboard': 
        return <PublicPolicyEconomicStrategyDashboard sectorId="public-policy-economic-strategy-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;
      case 'geopolitical-risk-global-trade-analysis-dashboard': 
        return <GeopoliticalRiskTradeAnalysisDashboard sectorId="geopolitical-risk-global-trade-analysis-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الاقتصاد والسياسة" />;

      default:
        return null;
    }
  };

  return (
    <div className={containerClass}>
      <FeatureErrorBoundary boundaryKey={activeTab}>
        <Suspense fallback={<RouteLoadingState />}>
          <div>
            {renderContent()}
          </div>
        </Suspense>
      </FeatureErrorBoundary>
    </div>
  );
};
