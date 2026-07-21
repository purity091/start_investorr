import { HeroBanner } from "./HomeViews/HeroBanner";
import { DecisionLayer } from "./HomeViews/DecisionLayer";
import { IntelligenceStream } from "./HomeViews/IntelligenceStream";
import { UnicornAnatomy } from "./HomeViews/UnicornAnatomy";
import { IntelligenceStories } from "./HomeViews/IntelligenceStories";
import { StrategicUpgrade } from "./HomeViews/StrategicUpgrade";
import { StrategicLaunchpad } from "./HomeViews/StrategicLaunchpad";
import { StrategicPathFinder } from "./HomeViews/StrategicPathFinder";

export const Home = ({ setActiveTab, onCompanyClick }: any) => {
  return (
    <div 
      className="min-h-screen bg-white pb-24 lg:pb-0 w-full max-w-full overflow-x-hidden" 
      dir="rtl" 
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      {/* ── Layer 0: Strategic Hero Banner ── */}
      <HeroBanner />

      <div className="space-y-0">
        {/* ── Layer 1: Decision Layer ── */}
        <DecisionLayer setActiveTab={setActiveTab} />

        {/* ── Layer 2: Live Intelligence Stream (Feed) ── */}
        <IntelligenceStream setActiveTab={setActiveTab} />

        {/* ── Layer 2.5: Unicorn Anatomy (Case Studies) ── */}
        <UnicornAnatomy onCompanyClick={onCompanyClick} />

        {/* ── Layer 2.5.5: Intelligence Stories (Carousel) ── */}
        <IntelligenceStories />

        {/* ── Layer 2.6: Strategic Upgrade (Pro Banner) ── */}
        <StrategicUpgrade setActiveTab={setActiveTab} />

        {/* ── Layer 3: Strategic Launchpad (Quick Tools) ── */}
        <StrategicLaunchpad setActiveTab={setActiveTab} />

        {/* ── Layer 4: Strategic Finder Stepper (Advisor) ── */}
        <StrategicPathFinder setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
