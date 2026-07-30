export interface SectorMapping {
  label: string;
  id: string; // The ID used in DiscoveryCenter and App routing
  filename: string; // The actual Dashboard.tsx filename
}

export interface CategoryMapping {
  category: string;
  sectors: SectorMapping[];
}

export const DISCOVERY_MAPPING: CategoryMapping[] = [
  {
    category: "Advertising & Marketing",
    sectors: [
      { label: "Advertising", id: "advertising-dashboard", filename: "AdvertisingDashboard" },
      { label: "Brands & Leaders", id: "brands-leaders-dashboard", filename: "BrandsLeadersDashboard" },
      { label: "Marketing", id: "marketing-dashboard", filename: "MarketingDashboard" },
      { label: "Influencer Marketing", id: "influencer-marketing-dashboard", filename: "InfluencerMarketingDashboard" },
      { label: "SEO & Content Marketing", id: "seo-content-marketing", filename: "SearchEngineOptimizationContentMarketingDashboard" }
    ]
  },
  {
    category: "Agriculture",
    sectors: [
      { label: "Farming", id: "farming-dashboard", filename: "FarmingDashboard" },
      { label: "Fisheries & Aquaculture", id: "fisheries-aquaculture-dashboard", filename: "FisheriesAquacultureDashboard" },
      { label: "Forestry", id: "forestry-dashboard", filename: "ForestryDashboard" },
      { label: "Agricultural Technology (Agritech)", id: "agritech-dashboard", filename: "AgriculturalTechnologyAgritechDashboard" },
      { label: "Seeds & Crop Protection", id: "seeds-crop-protection-dashboard", filename: "SeedsCropProtectionDashboard" }
    ]
  },
  {
    category: "Chemicals & Resources",
    sectors: [
      { label: "Chemical Industry", id: "chemical-industry-dashboard", filename: "ChemicalIndustryDashboard" },
      { label: "Fossil Fuels", id: "fossil-fuels-dashboard", filename: "FossilFuelsDashboard" },
      { label: "Mining, Metals & Minerals", id: "mining-dashboard", filename: "MiningDashboard" },
      { label: "Petroleum & Refinery", id: "petroleum-refinery-dashboard", filename: "PetroleumRefineryDashboard" },
      { label: "Plastic & Rubber", id: "plastic-rubber-dashboard", filename: "PlasticRubberDashboard" },
      { label: "Pulp & Paper", id: "pulp-paper-dashboard", filename: "PulpPaperDashboard" }
    ]
  },
  {
    category: "Construction",
    sectors: [
      { label: "Building Construction", id: "building-construction-dashboard", filename: "BuildingConstructionDashboard" },
      { label: "Heavy Construction", id: "heavy-construction-dashboard", filename: "HeavyConstructionDashboard" },
      { label: "Smart Construction & BIM", id: "smart-construction-bim-dashboard", filename: "SmartConstructionBIMDashboard" },
      { label: "Modular & Prefabricated Construction", id: "modular-prefab-construction-dashboard", filename: "ModularPrefabConstructionDashboard" }
    ]
  },
  {
    category: "Consumer Goods & FMCG",
    sectors: [
      { label: "Apparel, Shoes & Fashion", id: "apparel-shoes-dashboard", filename: "ApparelShoesDashboard" },
      { label: "Cleaning Products", id: "cleaning-products-dashboard", filename: "CleaningProductsDashboard" },
      { label: "Cosmetics & Personal Care", id: "cosmetics-personal-care-dashboard", filename: "CosmeticsPersonalCareDashboard" },
      { label: "Food & Nutrition", id: "food-nutrition-dashboard", filename: "FoodNutritionDashboard" },
      { label: "Furniture, Furnishings & Household Items", id: "furniture-household-dashboard", filename: "FurnitureHouseholdDashboard" },
      { label: "Garden & Patio", id: "garden-patio-dashboard", filename: "GardenPatioDashboard" },
      { label: "Home Improvement", id: "home-improvement-dashboard", filename: "HomeImprovementDashboard" },
      { label: "Non-alcoholic Beverages", id: "non-alcoholic-beverages-dashboard", filename: "NonAlcoholicBeveragesDashboard" },
      { label: "Pets & Animal Supplies", id: "pet-supplies-dashboard", filename: "PetSuppliesDashboard" },
      { label: "Toys", id: "toys-dashboard", filename: "ToysDashboard" },
      { label: "Packaged Foods", id: "packaged-foods-dashboard", filename: "PackagedFoodsDashboard" }
    ]
  },
  {
    category: "E-Commerce",
    sectors: [
      { label: "B2B E-Commerce", id: "b2b-ecommerce-dashboard", filename: "B2BEcommerceDashboard" },
      { label: "B2C E-Commerce", id: "b2c-ecommerce-dashboard", filename: "B2CEcommerceDashboard" },
      { label: "C2C E-Commerce", id: "c2c-ecommerce-dashboard", filename: "C2CEcommerceDashboard" },
      { label: "Digital Shopping Behaviour", id: "digital-shopping-behaviour-dashboard", filename: "DigitalShoppingBehaviourDashboard" },
      { label: "Key Figures of E-Commerce", id: "ecommerce-key-figures-dashboard", filename: "EcommerceKeyFiguresDashboard" },
      { label: "Paid Content", id: "paid-content-dashboard", filename: "PaidContentDashboard" }
    ]
  },
  {
    category: "Economy & Politics",
    sectors: [
      { label: "Economy", id: "economy-dashboard", filename: "EconomyDashboard" },
      { label: "International", id: "international-trade-dashboard", filename: "InternationalTradeDashboard" },
      { label: "Politics & Government", id: "politics-dashboard", filename: "PoliticsDashboard" },
      { label: "Public Policy & Economic Strategy", id: "public-policy-economic-strategy-dashboard", filename: "PublicPolicyEconomicStrategyDashboard" },
      { label: "Geopolitical Risk & Global Trade Analysis", id: "geopolitical-risk-global-trade-analysis-dashboard", filename: "GeopoliticalRiskTradeAnalysisDashboard" }
    ]
  },
  {
    category: "Energy & Environment",
    sectors: [
      { label: "Climate and Weather", id: "climate-dashboard", filename: "ClimateDashboard" },
      { label: "Emissions", id: "emissions-dashboard", filename: "EmissionsDashboard" },
      { label: "Energy", id: "energy-dashboard", filename: "EnergyDashboard" },
      { label: "Environmental Technology & Greentech", id: "greentech-dashboard", filename: "GreentechDashboard" },
      { label: "Waste Management", id: "waste-dashboard", filename: "WasteDashboard" },
      { label: "Water & Wastewater", id: "water-dashboard", filename: "WaterDashboard" },
      { label: "Renewable Energy Infrastructure", id: "renewable-energy-infrastructure-dashboard", filename: "RenewableEnergyInfrastructureDashboard" },
      { label: "Carbon Capture & Climate Tech", id: "carbon-capture-climate-tech-dashboard", filename: "CarbonCaptureClimateTechDashboard" }
    ]
  },
  {
    category: "Finance & Insurance",
    sectors: [
      { label: "Financial Institutions", id: "financial-institutions-dashboard", filename: "FinancialInstitutionsDashboard" },
      { label: "Financial Instruments & Investments", id: "investments-dashboard", filename: "InvestmentsDashboard" },
      { label: "Financial Services", id: "financial-services-dashboard", filename: "FinancialServicesDashboard" },
      { label: "Insurance", id: "insurance-dashboard", filename: "InsuranceDashboard" }
    ]
  },
  {
    category: "Health, Pharma & Medtech",
    sectors: [
      { label: "Care & Support", id: "care-support-dashboard", filename: "CareSupportDashboard" },
      { label: "Health Professionals & Hospitals", id: "hospitals-health-professionals-dashboard", filename: "HospitalsHealthProfessionalsDashboard" },
      { label: "Health System", id: "health-system-dashboard", filename: "HealthSystemDashboard" },
      { label: "Medical Technology", id: "medical-technology-dashboard", filename: "MedicalTechnologyDashboard" },
      { label: "Pharmaceutical Products & Market", id: "pharma-market-dashboard", filename: "PharmaMarketDashboard" },
      { label: "State of Health", id: "state-of-health-dashboard", filename: "StateOfHealthDashboard" }
    ]
  },
  {
    category: "Internet",
    sectors: [
      { label: "Communications", id: "communications-dashboard", filename: "CommunicationsDashboard" },
      { label: "Cyber Crime & Security", id: "cyber-crime-security-dashboard", filename: "CyberCrimeSecurityDashboard" },
      { label: "Demographics & Use", id: "internet-demographics-dashboard", filename: "InternetDemographicsDashboard" },
      { label: "Mobile Internet & Apps", id: "mobile-internet-apps-dashboard", filename: "MobileInternetAppsDashboard" },
      { label: "Online Search", id: "online-search-dashboard", filename: "OnlineSearchDashboard" },
      { label: "Online Video & Entertainment", id: "online-video-entertainment-dashboard", filename: "OnlineVideoEntertainmentDashboard" },
      { label: "Reach & Traffic", id: "reach-traffic-dashboard", filename: "ReachTrafficDashboard" },
      { label: "Social Media & User-Generated Content", id: "social-media-dashboard", filename: "SocialMediaDashboard" }
    ]
  },
  {
    category: "Life",
    sectors: [
      { label: "Celebrities", id: "celebrities-dashboard", filename: "CelebritiesDashboard" },
      { label: "Family & Friends", id: "family-friends-dashboard", filename: "FamilyFriendsDashboard" },
      { label: "Personality & Behavior", id: "personality-behavior-dashboard", filename: "PersonalityBehaviorDashboard" },
      { label: "Public and religious holidays", id: "holidays-dashboard", filename: "HolidaysDashboard" },
      { label: "Mental Health & Wellbeing Economy", id: "mental-health-wellbeing-economy-dashboard", filename: "MentalHealthWellbeingDashboard" },
      { label: "Longevity & Human Performance Industry", id: "longevity-human-performance-dashboard", filename: "LongevityHumanPerformanceDashboard" }
    ]
  },
  {
    category: "Media",
    sectors: [
      { label: "Audio", id: "audio-dashboard", filename: "AudioDashboard" },
      { label: "Books & Publishing", id: "books-publishing-dashboard", filename: "BooksPublishingDashboard" },
      { label: "News", id: "news-dashboard", filename: "NewsDashboard" },
      { label: "TV, Video & Film", id: "tv-video-film-dashboard", filename: "TVVideoFilmDashboard" },
      { label: "Video Gaming & eSports", id: "video-gaming-esports-dashboard", filename: "VideoGamingESportsDashboard" }
    ]
  },
  {
    category: "Metals & Electronics",
    sectors: [
      { label: "Aerospace & Defense Manufacturing", id: "aerospace-defense-dashboard", filename: "AerospaceDefenseDashboard" },
      { label: "Electronics", id: "electronics-dashboard", filename: "ElectronicsDashboard" },
      { label: "Industrial Machinery Manufacturing", id: "industrial-machinery-dashboard", filename: "IndustrialMachineryDashboard" },
      { label: "Metals", id: "metals-dashboard", filename: "MetalsDashboard" },
      { label: "Rolling Stock Manufacturing", id: "rolling-stock-dashboard", filename: "RollingStockDashboard" },
      { label: "Shipbuilding", id: "shipbuilding-dashboard", filename: "ShipbuildingDashboard" },
      { label: "Vehicle Manufacturing", id: "vehicle-manufacturing-dashboard", filename: "VehicleManufacturingDashboard" },
      { label: "Semiconductors", id: "semiconductors-dashboard", filename: "SemiconductorsDashboard" },
      { label: "Advanced Robotics Manufacturing", id: "advanced-robotics-manufacturing-dashboard", filename: "AdvancedRoboticsManufacturingDashboard" }
    ]
  },
  {
    category: "Real Estate",
    sectors: [
      { label: "Commercial Real Estate", id: "commercial-real-estate-dashboard", filename: "CommercialRealEstateDashboard" },
      { label: "Industrial Real Estate", id: "industrial-real-estate-dashboard", filename: "IndustrialRealEstateDashboard" },
      { label: "Mortgages & Financing", id: "mortgages-financing-dashboard", filename: "MortgagesFinancingDashboard" },
      { label: "Property Services", id: "property-services-dashboard", filename: "PropertyServicesDashboard" },
      { label: "Residential Real Estate", id: "residential-real-estate-dashboard", filename: "ResidentialRealEstateDashboard" },
      { label: "PropTech", id: "proptech-dashboard", filename: "PropTechDashboard" },
      { label: "Smart Cities Development", id: "smart-cities-development-dashboard", filename: "SmartCitiesDevelopmentDashboard" }
    ]
  },
  {
    category: "Retail & Trade",
    sectors: [
      { label: "DIY Retail", id: "diy-retail-dashboard", filename: "DIYRetailDashboard" },
      { label: "Fashion & Accessories", id: "fashion-accessories-dashboard", filename: "FashionAccessoriesDashboard" },
      { label: "Food & Beverage", id: "food-beverage-retail-dashboard", filename: "FoodBeverageRetailDashboard" },
      { label: "Furniture Retail", id: "furniture-retail-dashboard", filename: "FurnitureRetailDashboard" },
      { label: "General Merchandise", id: "general-merchandise-dashboard", filename: "GeneralMerchandiseDashboard" },
      { label: "Health & Hygiene", id: "health-hygiene-dashboard", filename: "HealthHygieneDashboard" },
      { label: "International Trade", id: "international-trade-dashboard", filename: "InternationalTradeDashboard" },
      { label: "Office Supplies", id: "office-supplies-dashboard", filename: "OfficeSuppliesDashboard" },
      { label: "Private Label", id: "private-label-dashboard", filename: "PrivateLabelDashboard" },
      { label: "Retail Technology", id: "retail-technology-dashboard", filename: "RetailTechnologyDashboard" },
      { label: "Shopping Behavior", id: "shopping-behavior-dashboard", filename: "ShoppingBehaviorDashboard" },
      { label: "Sports & Leisure", id: "sports-leisure-retail-dashboard", filename: "SportsLeisureRetailDashboard" },
      { label: "Subscriptions & Direct Selling", id: "subscriptions-direct-selling-dashboard", filename: "SubscriptionsDirectSellingDashboard" },
      { label: "Supply Chain", id: "supply-chain-dashboard", filename: "SupplyChainDashboard" },
      { label: "Wholesale", id: "wholesale-dashboard", filename: "WholesaleDashboard" },
      { label: "E-commerce Logistics & Fulfillment", id: "ecommerce-logistics-fulfillment-dashboard", filename: "EcommerceLogisticsFulfillmentDashboard" },
      { label: "Omnichannel Retail Systems", id: "omnichannel-retail-systems-dashboard", filename: "OmnichannelRetailSystemsDashboard" }
    ]
  },
  {
    category: "Services",
    sectors: [
      { label: "Business Services", id: "business-services-dashboard", filename: "BusinessServicesDashboard" },
      { label: "Skilled Labor", id: "skilled-labor-dashboard", filename: "SkilledLaborDashboard" },
      { label: "Digital Transformation Consulting", id: "digital-transformation-consulting-dashboard", filename: "DigitalTransformationConsultingDashboard" },
      { label: "BPO", id: "bpo-dashboard", filename: "BPODashboard" }
    ]
  },
  {
    category: "Society",
    sectors: [
      { label: "Crime & Law Enforcement", id: "crime-law-enforcement-dashboard", filename: "CrimeLawEnforcementDashboard" },
      { label: "Demographics", id: "demographics-dashboard", filename: "DemographicsDashboard" },
      { label: "Education & Science", id: "education-science-dashboard", filename: "EducationScienceDashboard" },
      { label: "Geography & Nature", id: "geography-nature-dashboard", filename: "GeographyNatureDashboard" },
      { label: "Historical Data", id: "historical-data-dashboard", filename: "HistoricalDataDashboard" },
      { label: "Religion", id: "religion-dashboard", filename: "ReligionDashboard" },
      { label: "Urban Development & Smart Cities Policy", id: "urban-development-smart-cities-policy-dashboard", filename: "UrbanDevelopmentPolicyDashboard" },
      { label: "Population Analytics & Demographic Intelligence", id: "population-analytics-demographic-intelligence-dashboard", filename: "PopulationAnalyticsDashboard" }
    ]
  },
  {
    category: "Sports & Recreation",
    sectors: [
      { label: "Art & Culture", id: "art-culture-dashboard", filename: "ArtCultureDashboard" },
      { label: "Gambling", id: "gambling-dashboard", filename: "GamblingDashboard" },
      { label: "Hobbies", id: "hobbies-dashboard", filename: "HobbiesDashboard" },
      { label: "Parks & Outdoors", id: "parks-outdoors-dashboard", filename: "ParksOutdoorsDashboard" },
      { label: "Professional Sports", id: "professional-sports-dashboard", filename: "ProfessionalSportsDashboard" },
      { label: "Sports & Fitness", id: "sports-fitness-dashboard", filename: "SportsFitnessDashboard" },
      { label: "Wellness & Spas", id: "wellness-spas-dashboard", filename: "WellnessSpasDashboard" },
      { label: "Sports Analytics & Performance Tech", id: "sports-analytics-performance-tech-dashboard", filename: "SportsAnalyticsPerformanceDashboard" },
      { label: "Esports & Competitive Gaming Industry", id: "esports-gaming-industry-dashboard", filename: "EsportsGamingIndustryDashboard" }
    ]
  },
  {
    category: "Technology & Telecommunications",
    sectors: [
      { label: "Consumer Electronics", id: "consumer-electronics-dashboard", filename: "ConsumerElectronicsDashboard" },
      { label: "Hardware", id: "hardware-dashboard", filename: "HardwareDashboard" },
      { label: "Household Appliances", id: "household-appliances-dashboard", filename: "HouseholdAppliancesDashboard" },
      { label: "IT Services", id: "it-services-dashboard", filename: "ITServicesDashboard" },
      { label: "Software", id: "software-dashboard", filename: "SoftwareDashboard" },
      { label: "Telecommunications", id: "telecommunications-dashboard", filename: "TelecommunicationsDashboard" },
      { label: "Artificial Intelligence", id: "artificial-intelligence-dashboard", filename: "ArtificialIntelligenceDashboard" },
      { label: "Cloud Services", id: "cloud-services-dashboard", filename: "CloudServicesDashboard" }
    ]
  },
  {
    category: "Transportation & Logistics",
    sectors: [
      { label: "Aviation", id: "aviation-dashboard", filename: "AviationDashboard" },
      { label: "Logistics", id: "logistics-dashboard", filename: "LogisticsDashboard" },
      { label: "Public Transportation & Mobility Services", id: "public-transport-dashboard", filename: "PublicTransportDashboard" },
      { label: "Rail Transport", id: "rail-transport-dashboard", filename: "RailTransportDashboard" },
      { label: "Vehicles & Road Traffic", id: "vehicles-road-traffic-dashboard", filename: "VehiclesRoadTrafficDashboard" },
      { label: "Water Transport", id: "water-transport-dashboard", filename: "WaterTransportDashboard" },
      { label: "Autonomous Vehicles", id: "autonomous-vehicles-dashboard", filename: "AutonomousVehiclesDashboard" },
      { label: "EV Infrastructure", id: "ev-infrastructure-dashboard", filename: "ElectricVehicleEvInfrastructureDashboard" }
    ]
  },
  {
    category: "Travel, Tourism & Hospitality",
    sectors: [
      { label: "Accommodation", id: "accommodation-dashboard", filename: "AccommodationDashboard" },
      { label: "Business Travel", id: "business-travel-dashboard", filename: "BusinessTravelDashboard" },
      { label: "Food & Drink Services", id: "food-drink-services-dashboard", filename: "FoodDrinkServicesDashboard" },
      { label: "Leisure Travel", id: "leisure-travel-dashboard", filename: "LeisureTravelDashboard" },
      { label: "Medical Tourism", id: "medical-tourism-dashboard", filename: "MedicalTourismDashboard" },
      { label: "Travel Technology", id: "travel-technology-dashboard", filename: "TravelTechnologyDashboard" }
    ]
  }
];
