
import React from 'react';
import { Home } from './Home';
import { DiscoveryCenter } from '../features/discovery/DiscoveryCenter';
import { MyProjects } from './MyProjects';
import { NewPlan } from '../features/business/NewPlan';
import { PlanComparison } from '../features/business/PlanComparison';
import { UnicornBenchmarking } from '../features/discovery/UnicornBenchmarking';
import { BrandIdentityStudio } from '../features/branding/BrandIdentityStudio';
import { ProblemOpportunityEngine } from '../features/discovery/ProblemOpportunityEngine';
import { BusinessPlanEditor } from '../features/business/BusinessPlanEditor';
import { UsersManagement } from './UsersManagement';
import { AdminProjectsManagement } from '../sectors/Admin/AdminProjectsManagement';
import { AdminAnalyticsDashboard } from '../sectors/Admin/AdminAnalyticsDashboard';
import { AdminSecurityDashboard } from '../sectors/Admin/AdminSecurityDashboard';
import { PricingPlans } from './PricingPlans';
import { Settings } from './Settings';
import { Tasks } from './Tasks';
import { Changelog } from './Changelog';
import { ContactUs } from './ContactUs';
import { MarketInsightPlaceholder } from './MarketInsightPlaceholder';
import { ExportTemplates } from '../ui/ExportTemplates';
import { Notifications } from '../features/social/Notifications';
import { SmartAnalyzer } from '../features/ai/SmartAnalyzer';
import { Profile } from './Profile';
import { MobileSiteMap } from './MobileSiteMap';
import HackathonView from '../features/hackathon/HackathonView';
import ResultPage from '../../features/easy-mode/ResultPage';
import { BusinessModelCanvas } from '../features/business/BusinessModelCanvas';
import { UnifiedWorkspace } from '../../features/workspace/UnifiedWorkspace';
import { useProjectWorkspace } from '../../features/workspace/ProjectWorkspaceContext';
import { CompanyDeepDive } from '../features/discovery/CompanyDeepDive';

// Dashboards
import AdvertisingDashboard from '../sectors/AdvertisingMarketing/AdvertisingDashboard';
import MarketingDashboard from '../sectors/AdvertisingMarketing/MarketingDashboard';
import InfluencerMarketingDashboard from '../sectors/AdvertisingMarketing/InfluencerMarketingDashboard';
import BrandsLeadersDashboard from '../sectors/AdvertisingMarketing/BrandsLeadersDashboard';
import SearchEngineOptimizationContentMarketingDashboard from '../sectors/AdvertisingMarketing/SearchEngineOptimizationContentMarketingDashboard';

import FarmingDashboard from '../sectors/Agriculture/FarmingDashboard';
import FisheriesAquacultureDashboard from '../sectors/Agriculture/FisheriesAquacultureDashboard';
import ForestryDashboard from '../sectors/Agriculture/ForestryDashboard';
import AgriculturalTechnologyAgritechDashboard from '../sectors/Agriculture/AgriculturalTechnologyAgritechDashboard';
import SmartFarmingDashboard from '../sectors/Agriculture/SmartFarmingDashboard';
import SeedsCropProtectionDashboard from '../sectors/Agriculture/SeedsCropProtectionDashboard';

import ChemicalIndustryDashboard from '../sectors/ChemicalsResources/ChemicalIndustryDashboard';
import FossilFuelsDashboard from '../sectors/ChemicalsResources/FossilFuelsDashboard';
import MiningDashboard from '../sectors/ChemicalsResources/MiningDashboard';
import PulpPaperDashboard from '../sectors/ChemicalsResources/PulpPaperDashboard';
import PlasticRubberDashboard from '../sectors/ChemicalsResources/PlasticRubberDashboard';
import PetroleumRefineryDashboard from '../sectors/ChemicalsResources/PetroleumRefineryDashboard';
import RecycledMaterialsDashboard from '../sectors/ChemicalsResources/RecycledMaterialsDashboard';
import BatteryMaterialsDashboard from '../sectors/ChemicalsResources/BatteryMaterialsDashboard';

import ApparelShoesDashboard from '../sectors/ConsumerGoodsFMCG/ApparelShoesDashboard';
import NonAlcoholicBeveragesDashboard from '../sectors/ConsumerGoodsFMCG/NonAlcoholicBeveragesDashboard';
import CleaningProductsDashboard from '../sectors/ConsumerGoodsFMCG/CleaningProductsDashboard';
import CosmeticsPersonalCareDashboard from '../sectors/ConsumerGoodsFMCG/CosmeticsPersonalCareDashboard';
import FoodNutritionDashboard from '../sectors/ConsumerGoodsFMCG/FoodNutritionDashboard';
import FurnitureHouseholdDashboard from '../sectors/ConsumerGoodsFMCG/FurnitureHouseholdDashboard';
import GardenPatioDashboard from '../sectors/ConsumerGoodsFMCG/GardenPatioDashboard';
import HomeImprovementDashboard from '../sectors/ConsumerGoodsFMCG/HomeImprovementDashboard';
import PetSuppliesDashboard from '../sectors/ConsumerGoodsFMCG/PetSuppliesDashboard';
import ToysDashboard from '../sectors/ConsumerGoodsFMCG/ToysDashboard';
import SustainableConsumerGoodsDashboard from '../sectors/ConsumerGoodsFMCG/SustainableConsumerGoodsDashboard';
import PackagedFoodsDashboard from '../sectors/ConsumerGoodsFMCG/PackagedFoodsDashboard';

import EconomyDashboard from '../sectors/EconomyPolitics/EconomyDashboard';
import InternationalTradeDashboard from '../sectors/EconomyPolitics/InternationalTradeDashboard';
import PoliticsDashboard from '../sectors/EconomyPolitics/PoliticsDashboard';
import PublicPolicyEconomicStrategyDashboard from '../sectors/EconomyPolitics/PublicPolicyEconomicStrategyDashboard';
import GeopoliticalRiskTradeAnalysisDashboard from '../sectors/EconomyPolitics/GeopoliticalRiskTradeAnalysisDashboard';

import ClimateDashboard from '../sectors/EnergyEnvironment/ClimateDashboard';
import EmissionsDashboard from '../sectors/EnergyEnvironment/EmissionsDashboard';
import EnergyDashboard from '../sectors/EnergyEnvironment/EnergyDashboard';
import GreentechDashboard from '../sectors/EnergyEnvironment/GreentechDashboard';
import WasteDashboard from '../sectors/EnergyEnvironment/WasteDashboard';
import WaterDashboard from '../sectors/EnergyEnvironment/WaterDashboard';
import RenewableEnergyInfrastructureDashboard from '../sectors/EnergyEnvironment/RenewableEnergyInfrastructureDashboard';
import CarbonCaptureClimateTechDashboard from '../sectors/EnergyEnvironment/CarbonCaptureClimateTechDashboard';

import FinancialInstitutionsDashboard from '../sectors/FinanceInsurance/FinancialInstitutionsDashboard';
import InvestmentsDashboard from '../sectors/FinanceInsurance/InvestmentsDashboard';
import FinancialServicesDashboard from '../sectors/FinanceInsurance/FinancialServicesDashboard';
import InsuranceDashboard from '../sectors/FinanceInsurance/InsuranceDashboard';
import FinancialTechnologyFintechDashboard from '../sectors/FinanceInsurance/FinancialTechnologyFintechDashboard';
import DigitalPaymentsDashboard from '../sectors/FinanceInsurance/DigitalPaymentsDashboard';
import WealthManagementDashboard from '../sectors/FinanceInsurance/WealthManagementDashboard';

import CareSupportDashboard from '../sectors/HealthPharma/CareSupportDashboard';
import HospitalsHealthProfessionalsDashboard from '../sectors/HealthPharma/HospitalsHealthProfessionalsDashboard';
import HealthSystemDashboard from '../sectors/HealthPharma/HealthSystemDashboard';
import MedicalTechnologyDashboard from '../sectors/HealthPharma/MedicalTechnologyDashboard';
import PharmaceuticalProductsDashboard from '../sectors/HealthPharma/PharmaceuticalProductsDashboard';
import StateOfHealthDashboard from '../sectors/HealthPharma/StateOfHealthDashboard';
import BiotechnologyDashboard from '../sectors/HealthPharma/BiotechnologyDashboard';
import DigitalHealthDashboard from '../sectors/HealthPharma/DigitalHealthDashboard';
import MentalHealthServicesDashboard from '../sectors/HealthPharma/MentalHealthServicesDashboard';
import PharmaDashboard from '../sectors/HealthPharma/PharmaDashboard';
import HealthCareDashboard from '../sectors/HealthPharma/HealthCareDashboard';

import CyberCrimeSecurityDashboard from '../sectors/Internet/CyberCrimeSecurityDashboard';
import CommunicationsDashboard from '../sectors/Internet/CommunicationsDashboard';
import InternetDemographicsDashboard from '../sectors/Internet/InternetDemographicsDashboard';
import MobileInternetAppsDashboard from '../sectors/Internet/MobileInternetAppsDashboard';
import OnlineSearchDashboard from '../sectors/Internet/OnlineSearchDashboard';
import OnlineVideoEntertainmentDashboard from '../sectors/Internet/OnlineVideoEntertainmentDashboard';
import ReachTrafficDashboard from '../sectors/Internet/ReachTrafficDashboard';
import SocialMediaDashboard from '../sectors/Internet/SocialMediaDashboard';
import AiPlatformsDashboard from '../sectors/Internet/AiPlatformsDashboard';

import CelebritiesDashboard from '../sectors/Life/CelebritiesDashboard';
import FamilyFriendsDashboard from '../sectors/Life/FamilyFriendsDashboard';
import PersonalityBehaviorDashboard from '../sectors/Life/PersonalityBehaviorDashboard';
import HolidaysDashboard from '../sectors/Life/HolidaysDashboard';
import MentalHealthWellbeingDashboard from '../sectors/Life/MentalHealthWellbeingDashboard';
import LongevityHumanPerformanceDashboard from '../sectors/Life/LongevityHumanPerformanceDashboard';

import AudioDashboard from '../sectors/Media/AudioDashboard';
import BooksPublishingDashboard from '../sectors/Media/BooksPublishingDashboard';
import NewsDashboard from '../sectors/Media/NewsDashboard';
import TVVideoFilmDashboard from '../sectors/Media/TVVideoFilmDashboard';
import VideoGamingESportsDashboard from '../sectors/Media/VideoGamingESportsDashboard';
import StreamingPlatformsDashboard from '../sectors/Media/StreamingPlatformsDashboard';
import PodcastIndustryDashboard from '../sectors/Media/PodcastIndustryDashboard';
import DigitalPublishingDashboard from '../sectors/Media/DigitalPublishingDashboard';

import AerospaceDefenseDashboard from '../sectors/MetalsElectronics/AerospaceDefenseDashboard';
import ElectronicsDashboard from '../sectors/MetalsElectronics/ElectronicsDashboard';
import IndustrialMachineryDashboard from '../sectors/MetalsElectronics/IndustrialMachineryDashboard';
import MetalsDashboard from '../sectors/MetalsElectronics/MetalsDashboard';
import RollingStockDashboard from '../sectors/MetalsElectronics/RollingStockDashboard';
import ShipbuildingDashboard from '../sectors/MetalsElectronics/ShipbuildingDashboard';
import VehicleManufacturingDashboard from '../sectors/MetalsElectronics/VehicleManufacturingDashboard';
import SemiconductorsDashboard from '../sectors/MetalsElectronics/SemiconductorsDashboard';
import AdvancedRoboticsManufacturingDashboard from '../sectors/MetalsElectronics/AdvancedRoboticsManufacturingDashboard';

import CommercialRealEstateDashboard from '../sectors/RealEstate/CommercialRealEstateDashboard';
import IndustrialRealEstateDashboard from '../sectors/RealEstate/IndustrialRealEstateDashboard';
import MortgagesFinancingDashboard from '../sectors/RealEstate/MortgagesFinancingDashboard';
import PropertyServicesDashboard from '../sectors/RealEstate/PropertyServicesDashboard';
import ResidentialRealEstateDashboard from '../sectors/RealEstate/ResidentialRealEstateDashboard';
import PropTechDashboard from '../sectors/RealEstate/PropTechDashboard';
import SmartCitiesDevelopmentDashboard from '../sectors/RealEstate/SmartCitiesDevelopmentDashboard';

import DIYRetailDashboard from '../sectors/RetailTrade/DIYRetailDashboard';
import FashionAccessoriesDashboard from '../sectors/RetailTrade/FashionAccessoriesDashboard';
import FoodBeverageRetailDashboard from '../sectors/RetailTrade/FoodBeverageRetailDashboard';
import FurnitureRetailDashboard from '../sectors/RetailTrade/FurnitureRetailDashboard';
import GeneralMerchandiseDashboard from '../sectors/RetailTrade/GeneralMerchandiseDashboard';
import HealthHygieneDashboard from '../sectors/RetailTrade/HealthHygieneDashboard';
import OfficeSuppliesDashboard from '../sectors/RetailTrade/OfficeSuppliesDashboard';
import PrivateLabelDashboard from '../sectors/RetailTrade/PrivateLabelDashboard';
import RetailTechnologyDashboard from '../sectors/RetailTrade/RetailTechnologyDashboard';
import ShoppingBehaviorDashboard from '../sectors/RetailTrade/ShoppingBehaviorDashboard';
import SportsLeisureRetailDashboard from '../sectors/RetailTrade/SportsLeisureRetailDashboard';
import SubscriptionsDirectSellingDashboard from '../sectors/RetailTrade/SubscriptionsDirectSellingDashboard';
import SupplyChainDashboard from '../sectors/RetailTrade/SupplyChainDashboard';
import WholesaleDashboard from '../sectors/RetailTrade/WholesaleDashboard';
import EcommerceLogisticsFulfillmentDashboard from '../sectors/RetailTrade/EcommerceLogisticsFulfillmentDashboard';
import OmnichannelRetailSystemsDashboard from '../sectors/RetailTrade/OmnichannelRetailSystemsDashboard';

import BusinessServicesDashboard from '../sectors/Services/BusinessServicesDashboard';
import SkilledLaborDashboard from '../sectors/Services/SkilledLaborDashboard';
import DigitalTransformationConsultingDashboard from '../sectors/Services/DigitalTransformationConsultingDashboard';
import BPODashboard from '../sectors/Services/BPODashboard';

import CrimeLawEnforcementDashboard from '../sectors/Society/CrimeLawEnforcementDashboard';
import DemographicsDashboard from '../sectors/Society/DemographicsDashboard';
import EducationScienceDashboard from '../sectors/Society/EducationScienceDashboard';
import GeographyNatureDashboard from '../sectors/Society/GeographyNatureDashboard';
import HistoricalDataDashboard from '../sectors/Society/HistoricalDataDashboard';
import ReligionDashboard from '../sectors/Society/ReligionDashboard';
import UrbanDevelopmentPolicyDashboard from '../sectors/Society/UrbanDevelopmentPolicyDashboard';
import PopulationAnalyticsDashboard from '../sectors/Society/PopulationAnalyticsDashboard';

import ArtCultureDashboard from '../sectors/SportsRecreation/ArtCultureDashboard';
import GamblingDashboard from '../sectors/SportsRecreation/GamblingDashboard';
import HobbiesDashboard from '../sectors/SportsRecreation/HobbiesDashboard';
import ParksOutdoorsDashboard from '../sectors/SportsRecreation/ParksOutdoorsDashboard';
import ProfessionalSportsDashboard from '../sectors/SportsRecreation/ProfessionalSportsDashboard';
import SportsFitnessDashboard from '../sectors/SportsRecreation/SportsFitnessDashboard';
import WellnessSpasDashboard from '../sectors/SportsRecreation/WellnessSpasDashboard';
import SportsAnalyticsPerformanceDashboard from '../sectors/SportsRecreation/SportsAnalyticsPerformanceDashboard';
import EsportsGamingIndustryDashboard from '../sectors/SportsRecreation/EsportsGamingIndustryDashboard';

import ConsumerElectronicsDashboard from '../sectors/TechnologyTelecommunications/ConsumerElectronicsDashboard';
import HardwareDashboard from '../sectors/TechnologyTelecommunications/HardwareDashboard';
import HouseholdAppliancesDashboard from '../sectors/TechnologyTelecommunications/HouseholdAppliancesDashboard';
import ITServicesDashboard from '../sectors/TechnologyTelecommunications/ITServicesDashboard';
import SoftwareDashboard from '../sectors/TechnologyTelecommunications/SoftwareDashboard';
import TelecommunicationsDashboard from '../sectors/TechnologyTelecommunications/TelecommunicationsDashboard';
import CloudServicesDashboard from '../sectors/TechnologyTelecommunications/CloudServicesDashboard';
import ArtificialIntelligenceDashboard from '../sectors/TechnologyTelecommunications/ArtificialIntelligenceDashboard';

import AviationDashboard from '../sectors/TransportationLogistics/AviationDashboard';
import LogisticsDashboard from '../sectors/TransportationLogistics/LogisticsDashboard';
import PublicTransportDashboard from '../sectors/TransportationLogistics/PublicTransportDashboard';
import RailTransportDashboard from '../sectors/TransportationLogistics/RailTransportDashboard';
import VehiclesRoadTrafficDashboard from '../sectors/TransportationLogistics/VehiclesRoadTrafficDashboard';
import WaterTransportDashboard from '../sectors/TransportationLogistics/WaterTransportDashboard';
import ElectricVehicleEvInfrastructureDashboard from '../sectors/TransportationLogistics/ElectricVehicleEvInfrastructureDashboard';
import AutonomousVehiclesDashboard from '../sectors/TransportationLogistics/AutonomousVehiclesDashboard';

import AccommodationDashboard from '../sectors/TravelTourism/AccommodationDashboard';
import BusinessTravelDashboard from '../sectors/TravelTourism/BusinessTravelDashboard';
import FoodDrinkServicesDashboard from '../sectors/TravelTourism/FoodDrinkServicesDashboard';
import LeisureTravelDashboard from '../sectors/TravelTourism/LeisureTravelDashboard';
import MedicalTourismDashboard from '../sectors/TravelTourism/MedicalTourismDashboard';
import TravelTechnologyDashboard from '../sectors/TravelTourism/TravelTechnologyDashboard';

import BuildingConstructionDashboard from '../sectors/Construction/BuildingConstructionDashboard';
import HeavyConstructionDashboard from '../sectors/Construction/HeavyConstructionDashboard';
import SmartConstructionBIMDashboard from '../sectors/Construction/SmartConstructionBIMDashboard';
import ModularPrefabConstructionDashboard from '../sectors/Construction/ModularPrefabConstructionDashboard';

import B2BEcommerceDashboard from '../sectors/Ecommerce/B2BEcommerceDashboard';
import B2CEcommerceDashboard from '../sectors/Ecommerce/B2CEcommerceDashboard';
import C2CEcommerceDashboard from '../sectors/Ecommerce/C2CEcommerceDashboard';
import DigitalShoppingBehaviourDashboard from '../sectors/Ecommerce/DigitalShoppingBehaviourDashboard';
import ECommerceKeyFiguresDashboard from '../sectors/Ecommerce/EcommerceKeyFiguresDashboard';
import PaidContentDashboard from '../sectors/Ecommerce/PaidContentDashboard';
import OnlineMarketplacesDashboard from '../sectors/Ecommerce/OnlineMarketplacesDashboard';
import CrossBorderEcommerceDashboard from '../sectors/Ecommerce/CrossBorderECommerceDashboard';
import SocialCommerceDashboard from '../sectors/Ecommerce/SocialCommerceDashboard';

import { User, PlanSection } from '../../types';

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
  const containerClass = ['home', 'editor', 'strategic-dashboard', 'contact-us', 'market-discovery', 'problem-engine', 'hackathon', 'workspace', 'company-deep-dive', 'site-map', 'discovery-center'].includes(activeTab) || activeTab.endsWith('-dashboard') 
    ? 'w-full' 
    : 'max-w-6xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 pb-20 lg:pb-10';

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
      case 'company-deep-dive':
        return <CompanyDeepDive companyId={selectedCompanyId} onBack={() => setActiveTab('home')} />;
      case 'home':
      case 'admin-dashboard':
        return <Home setActiveTab={setActiveTab} onCompanyClick={handleCompanyClick} />;
      case 'profile':
        return <Profile user={user} />;
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
      case 'strategic-dashboard':
        return <ResultPage />;
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
      case 'comparison':
        return <PlanComparison />;
      case 'pricing':
        return <PricingPlans />;
      case 'hackathon':
        return <HackathonView />;
      case 'contact-us':
        return <ContactUs />;
      case 'settings':
        return <Settings user={user} />;
      case 'tasks':
        return <Tasks />;
      case 'changelog':
        return <Changelog />;
      case 'notifications':
        return <Notifications />;
      case 'site-map':
        return <MobileSiteMap setActiveTab={setActiveTab} />;
      case 'export-templates':
        return <ExportTemplates />;
      case 'smart-analyzer':
        return <SmartAnalyzer />;
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
        return <MiningDashboard sectorId="mining-dashboard" onBack={() => setActiveTab('market-discovery')} parentCategory="الكيمياء والموارد" />;
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
      case 'seeds-crop-protection': return <SeedsCropProtectionDashboard onBuildPlan={handleBuildPlan} />;
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
      case 'problem-engine': return <ProblemOpportunityEngine />;
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
      <div className="animate-in slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </div>
  );
};
