'use client';

import React, { useState, useEffect, memo, useMemo, useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { cn } from '@/lib/utils';
import { MapPin, Users, Globe2, TrendingUp, Info, ZoomIn, ZoomOut, RotateCcw, Coins, Search, Award, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface CountryData {
  nameAr: string;
  nameEn: string;
  capital: string;
  capitalAr: string;
  population: number; // in millions
  area: number; // in sq km
  gdp: number; // in billions USD
  gdpPerCapita: number; // in USD
  region: string;
  regionAr: string;
  flag: string;
}

const ARAB_COUNTRIES: Record<string, CountryData> = {
  SAU: { nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', capital: 'Riyadh', capitalAr: 'الرياض', population: 36.9, area: 2149690, gdp: 1108, gdpPerCapita: 30027, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇸🇦' },
  EGY: { nameAr: 'مصر', nameEn: 'Egypt', capital: 'Cairo', capitalAr: 'القاهرة', population: 104.2, area: 1001450, gdp: 476, gdpPerCapita: 4568, region: 'North Africa', regionAr: 'شمال أفريقيا', flag: '🇪🇬' },
  ARE: { nameAr: 'الإمارات العربية المتحدة', nameEn: 'United Arab Emirates', capital: 'Abu Dhabi', capitalAr: 'أبوظبي', population: 9.9, area: 83600, gdp: 509, gdpPerCapita: 51414, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇦🇪' },
  IRQ: { nameAr: 'العراق', nameEn: 'Iraq', capital: 'Baghdad', capitalAr: 'بغداد', population: 41.2, area: 438317, gdp: 264, gdpPerCapita: 6407, region: 'Levant', regionAr: 'المشرق العربي', flag: '🇮🇶' },
  DZA: { nameAr: 'الجزائر', nameEn: 'Algeria', capital: 'Algiers', capitalAr: 'الجزائر', population: 44.7, area: 2381741, gdp: 239, gdpPerCapita: 5346, region: 'North Africa', regionAr: 'شمال أفريقيا', flag: '🇩🇿' },
  SDN: { nameAr: 'السودان', nameEn: 'Sudan', capital: 'Khartoum', capitalAr: 'الخرطوم', population: 45.7, area: 1861484, gdp: 34, gdpPerCapita: 744, region: 'East Africa', regionAr: 'أفريقيا الشرقية', flag: '🇸🇩' },
  MAR: { nameAr: 'المغرب', nameEn: 'Morocco', capital: 'Rabat', capitalAr: 'الرباط', population: 37.5, area: 446550, gdp: 142, gdpPerCapita: 3786, region: 'North Africa', regionAr: 'شمال أفريقيا', flag: '🇲🇦' },
  YEM: { nameAr: 'اليمن', nameEn: 'Yemen', capital: "Sana'a", capitalAr: 'صنعاء', population: 33.7, area: 527968, gdp: 21, gdpPerCapita: 623, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇾🇪' },
  SYR: { nameAr: 'سوريا', nameEn: 'Syria', capital: 'Damascus', capitalAr: 'دمشق', population: 21.3, area: 185180, gdp: 60, gdpPerCapita: 2816, region: 'Levant', regionAr: 'المشرق العربي', flag: '🇸🇾' },
  TUN: { nameAr: 'تونس', nameEn: 'Tunisia', capital: 'Tunis', capitalAr: 'تونس', population: 12.0, area: 163610, gdp: 47, gdpPerCapita: 3916, region: 'North Africa', regionAr: 'شمال أفريقيا', flag: '🇹🇳' },
  LBY: { nameAr: 'ليبيا', nameEn: 'Libya', capital: 'Tripoli', capitalAr: 'طرابلس', population: 7.0, area: 1759540, gdp: 72, gdpPerCapita: 10285, region: 'North Africa', regionAr: 'شمال أفريقيا', flag: '🇱🇾' },
  JOR: { nameAr: 'الأردن', nameEn: 'Jordan', capital: 'Amman', capitalAr: 'عمان', population: 10.3, area: 89342, gdp: 46, gdpPerCapita: 4466, region: 'Levant', regionAr: 'المشرق العربي', flag: '🇯🇴' },
  PSE: { nameAr: 'فلسطين', nameEn: 'Palestine', capital: 'Ramallah', capitalAr: 'رام الله', population: 5.3, area: 6020, gdp: 20, gdpPerCapita: 3773, region: 'Levant', regionAr: 'المشرق العربي', flag: '🇵🇸' },
  LBN: { nameAr: 'لبنان', nameEn: 'Lebanon', capital: 'Beirut', capitalAr: 'بيروت', population: 6.8, area: 10452, gdp: 23, gdpPerCapita: 3382, region: 'Levant', regionAr: 'المشرق العربي', flag: '🇱🇧' },
  OMN: { nameAr: 'عُمان', nameEn: 'Oman', capital: 'Muscat', capitalAr: 'مسقط', population: 4.6, area: 309500, gdp: 104, gdpPerCapita: 22608, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇴🇲' },
  KWT: { nameAr: 'الكويت', nameEn: 'Kuwait', capital: 'Kuwait City', capitalAr: 'مدينة الكويت', population: 4.3, area: 17818, gdp: 162, gdpPerCapita: 37674, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇰🇼' },
  MRT: { nameAr: 'موريتانيا', nameEn: 'Mauritania', capital: 'Nouakchott', capitalAr: 'نواكشوط', population: 4.7, area: 1030700, gdp: 10, gdpPerCapita: 2127, region: 'West Africa', regionAr: 'غرب أفريقيا', flag: '🇲🇷' },
  QAT: { nameAr: 'قطر', nameEn: 'Qatar', capital: 'Doha', capitalAr: 'الدوحة', population: 2.9, area: 11586, gdp: 237, gdpPerCapita: 81724, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇶🇦' },
  BHR: { nameAr: 'البحرين', nameEn: 'Bahrain', capital: 'Manama', capitalAr: 'المنامة', population: 1.5, area: 765, gdp: 44, gdpPerCapita: 29333, region: 'Gulf', regionAr: 'الخليج العربي', flag: '🇧🇭' },
  DJI: { nameAr: 'جيبوتي', nameEn: 'Djibouti', capital: 'Djibouti', capitalAr: 'جيبوتي', population: 1.0, area: 23200, gdp: 4, gdpPerCapita: 4000, region: 'East Africa', regionAr: 'أفريقيا الشرقية', flag: '🇩🇯' },
  SOM: { nameAr: 'الصومال', nameEn: 'Somalia', capital: 'Mogadishu', capitalAr: 'مقديشو', population: 17.1, area: 637657, gdp: 9, gdpPerCapita: 526, region: 'East Africa', regionAr: 'أفريقيا الشرقية', flag: '🇸🇴' },
  COM: { nameAr: 'جزر القمر', nameEn: 'Comoros', capital: 'Moroni', capitalAr: 'موروني', population: 0.9, area: 2235, gdp: 1, gdpPerCapita: 1111, region: 'East Africa', regionAr: 'أفريقيا الشرقية', flag: '🇰🇲' },
};

const REGION_COLORS: Record<string, string> = {
  Gulf: '#0ea5e9',
  'North Africa': '#8b5cf6',
  Levant: '#f59e0b',
  'East Africa': '#10b981',
  'West Africa': '#f97316',
};

const NUM_TO_A3: Record<string, string> = {
  '682': 'SAU', '818': 'EGY', '784': 'ARE', '368': 'IRQ', '012': 'DZA',
  '729': 'SDN', '504': 'MAR', '887': 'YEM', '760': 'SYR', '788': 'TUN',
  '434': 'LBY', '400': 'JOR', '275': 'PSE', '422': 'LBN', '512': 'OMN',
  '414': 'KWT', '478': 'MRT', '634': 'QAT', '048': 'BHR', '262': 'DJI',
  '706': 'SOM', '174': 'COM',
};

const GEO_URL = '/countries-110m.json';

type MetricKey = 'population' | 'gdp' | 'gdpPerCapita' | 'area';

const METRICS = [
  { key: 'population' as MetricKey, labelAr: 'التوزيع السكاني', icon: Users, color: '#6366f1' },
  { key: 'gdp' as MetricKey, labelAr: 'الناتج المحلي الإجمالي', icon: TrendingUp, color: '#10b981' },
  { key: 'gdpPerCapita' as MetricKey, labelAr: 'متوسط دخل الفرد', icon: Coins, color: '#ec4899' },
  { key: 'area' as MetricKey, labelAr: 'المساحة الجغرافية', icon: Globe2, color: '#f59e0b' },
];

function fmt(value: number, metric: MetricKey) {
  if (metric === 'area') return value.toLocaleString('en-US') + ' كم²';
  if (metric === 'population') return value.toFixed(1) + ' مليون نسمة';
  if (metric === 'gdpPerCapita') return '$' + value.toLocaleString('en-US') + ' / للفرد';
  return '$' + value.toLocaleString('en-US') + ' مليار دولار';
}

const StatCard = memo(({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/40 min-w-0">
    <div className="size-6.5 sm:size-7.5 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + '20' }}>
      <Icon className="size-3 sm:size-3.5" style={{ color }} />
    </div>
    <div className="min-w-0">
      <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium truncate">{label}</p>
      <p className="text-xs sm:text-sm font-bold text-foreground tabular-nums truncate">{value}</p>
    </div>
  </div>
));
StatCard.displayName = 'StatCard';

// Default map center focused on Arab World region
const ARAB_WORLD_CENTER: [number, number] = [26, 20];
const ARAB_WORLD_SCALE = 460;

export function ArabWorldMapsView() {
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricKey>('population');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>(ARAB_WORLD_CENTER);
  const [geoData, setGeoData] = useState<object | null>(null);
  
  // Dynamic Mouse Cursor Position for Floating Tooltip
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    fetch(GEO_URL).then(r => r.json()).then(setGeoData).catch(() => null);
  }, []);

  const arabIsos = Object.keys(ARAB_COUNTRIES);

  // Compute overall stats
  const totalPopulation = useMemo(() => Object.values(ARAB_COUNTRIES).reduce((s, c) => s + c.population, 0), []);
  const totalGdp = useMemo(() => Object.values(ARAB_COUNTRIES).reduce((s, c) => s + c.gdp, 0), []);
  const totalArea = useMemo(() => Object.values(ARAB_COUNTRIES).reduce((s, c) => s + c.area, 0), []);
  const avgGdpPerCapita = useMemo(() => Math.round((totalGdp * 1_000_000_000) / (totalPopulation * 1_000_000)), [totalGdp, totalPopulation]);

  // Ranked countries list based on current metric
  const rankedCountries = useMemo(() => {
    return Object.entries(ARAB_COUNTRIES)
      .map(([iso, data]) => ({ iso, ...data }))
      .sort((a, b) => b[metric] - a[metric]);
  }, [metric]);

  // Map metric min/max
  const values = arabIsos.map(iso => ARAB_COUNTRIES[iso][metric]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  // Filtered countries for sidebar list
  const filteredCountries = useMemo(() => {
    return rankedCountries.filter(country => {
      const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
      const matchesSearch = searchQuery.trim() === '' || 
        country.nameAr.includes(searchQuery.trim()) || 
        country.nameEn.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        country.capitalAr.includes(searchQuery.trim());
      return matchesRegion && matchesSearch;
    });
  }, [rankedCountries, selectedRegion, searchQuery]);

  const selectedCountry = selectedIso ? ARAB_COUNTRIES[selectedIso] : null;
  const hoveredCountry = hoveredIso ? ARAB_COUNTRIES[hoveredIso] : null;

  // Selected country rankings
  const countryRankings = useMemo(() => {
    if (!selectedIso) return null;
    const popRank = Object.entries(ARAB_COUNTRIES).sort((a, b) => b[1].population - a[1].population).findIndex(([iso]) => iso === selectedIso) + 1;
    const gdpRank = Object.entries(ARAB_COUNTRIES).sort((a, b) => b[1].gdp - a[1].gdp).findIndex(([iso]) => iso === selectedIso) + 1;
    const gdpPerCapitaRank = Object.entries(ARAB_COUNTRIES).sort((a, b) => b[1].gdpPerCapita - a[1].gdpPerCapita).findIndex(([iso]) => iso === selectedIso) + 1;
    const popShare = ((ARAB_COUNTRIES[selectedIso].population / totalPopulation) * 100).toFixed(1);
    const gdpShare = ((ARAB_COUNTRIES[selectedIso].gdp / totalGdp) * 100).toFixed(1);
    return { popRank, gdpRank, gdpPerCapitaRank, popShare, gdpShare };
  }, [selectedIso, totalPopulation, totalGdp]);

  function getFill(iso: string): string {
    const country = ARAB_COUNTRIES[iso];
    const base = REGION_COLORS[country.region] ?? '#6366f1';
    if (iso === selectedIso) return base;
    if (iso === hoveredIso) return base + 'cc';
    const val = country[metric];
    const ratio = maxVal === minVal ? 0.5 : (val - minVal) / (maxVal - minVal);
    const alpha = Math.round((0.15 + ratio * 0.55) * 255).toString(16).padStart(2, '0');
    return base + alpha;
  }

  const fillMap = Object.fromEntries(arabIsos.map(iso => [iso, getFill(iso)]));

  return (
    <div dir="rtl" className="w-full flex-1 flex flex-col min-h-screen bg-background p-2 sm:p-5 gap-3 sm:gap-4">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="size-8 sm:size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-2xs">
            <BarChart3 className="size-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-lg font-extrabold text-foreground tracking-tight">
                التوزيعات السكانية والاقتصادية بالوطن العربي
              </h1>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">
              مرصد تفاعلي شامل لديموغرافيا واقتصاد الدول العربية
            </p>
          </div>
        </div>

        {/* Metric Selector Tabs - Compact Mobile Horizontal Scroll */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 overflow-x-auto max-w-full touch-pan-x scrollbar-none">
          {METRICS.map((m) => {
            const Icon = m.icon;
            const isSelected = metric === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMetric(m.key)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 h-7 sm:h-8',
                  isSelected ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="size-3" style={{ color: isSelected ? m.color : undefined }} />
                <span>{m.labelAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Map & Details Sidebar */}
      <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 flex-1">
        {/* Interactive Map Column */}
        <div className="flex-1 flex flex-col gap-2">
          <div
            ref={mapContainerRef}
            onMouseMove={handleMouseMove}
            className="relative rounded-2xl bg-card overflow-hidden flex-1 min-h-[300px] sm:min-h-[420px] lg:min-h-[480px] shadow-2xs"
          >
            {/* Sleek Compact Map Zoom Controls */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              <Button size="icon" variant="outline" className="size-6 sm:size-7 bg-background/90 shadow-2xs border-0 rounded-md" onClick={() => setZoom(z => Math.min(z * 1.4, 8))}>
                <ZoomIn className="size-3" />
              </Button>
              <Button size="icon" variant="outline" className="size-6 sm:size-7 bg-background/90 shadow-2xs border-0 rounded-md" onClick={() => setZoom(z => Math.max(z / 1.4, 1))}>
                <ZoomOut className="size-3" />
              </Button>
              <Button size="icon" variant="outline" className="size-6 sm:size-7 bg-background/90 shadow-2xs border-0 rounded-md" onClick={() => { setZoom(1); setCenter(ARAB_WORLD_CENTER); setSelectedIso(null); }}>
                <RotateCcw className="size-3" />
              </Button>
            </div>

            {/* Dynamic Cursor-following Floating Tooltip (Desktop) */}
            {hoveredCountry && (
              <div
                style={{
                  left: mapContainerRef.current 
                    ? Math.min(Math.max(mousePos.x, 105), mapContainerRef.current.clientWidth - 105) 
                    : mousePos.x,
                  top: mousePos.y < 140 ? mousePos.y + 15 : mousePos.y - 15,
                  transform: mousePos.y < 140 ? 'translate(-50%, 0%)' : 'translate(-50%, -100%)',
                }}
                className="hidden sm:flex absolute z-30 pointer-events-none bg-background/95 backdrop-blur-md rounded-xl p-3 shadow-lg border-0 min-w-[190px] flex-col gap-1.5 transition-all duration-75 animate-in fade-in"
              >
                <div className="flex items-center justify-between pb-1 border-b border-muted/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{hoveredCountry.flag}</span>
                    <div>
                      <h4 className="font-extrabold text-[11px] text-foreground">{hoveredCountry.nameAr}</h4>
                      <p className="text-[9px] text-muted-foreground">{hoveredCountry.capitalAr}</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0 text-[8px] font-bold px-1 py-0">
                    {hoveredCountry.regionAr}
                  </Badge>
                </div>

                <div className="flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="size-3 text-indigo-500" />
                      <span>السكان:</span>
                    </span>
                    <span className="font-bold text-foreground tabular-nums">{hoveredCountry.population.toFixed(1)} مليون</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="size-3 text-emerald-500" />
                      <span>الناتج:</span>
                    </span>
                    <span className="font-bold text-foreground tabular-nums">${hoveredCountry.gdp.toLocaleString('en-US')} مليار</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Coins className="size-3 text-pink-500" />
                      <span>دخل الفرد:</span>
                    </span>
                    <span className="font-bold text-foreground tabular-nums">${hoveredCountry.gdpPerCapita.toLocaleString('en-US')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Touch Quick Tooltip Overlay */}
            {hoveredCountry && (
              <div className="sm:hidden absolute bottom-2 left-2 right-2 z-30 bg-background/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border-0 flex flex-col gap-1 animate-in slide-in-from-bottom-2 duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{hoveredCountry.flag}</span>
                    <span className="font-extrabold text-xs text-foreground">{hoveredCountry.nameAr}</span>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0 text-[8px] font-bold px-1.5 py-0">
                    {hoveredCountry.regionAr}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1 border-t border-muted/50 text-center">
                  <div>
                    <p className="text-[8px] text-muted-foreground">السكان</p>
                    <p className="text-[9px] font-bold text-foreground">{hoveredCountry.population.toFixed(1)}م</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-foreground">الناتج</p>
                    <p className="text-[9px] font-bold text-foreground">${hoveredCountry.gdp}م</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-foreground">دخل الفرد</p>
                    <p className="text-[9px] font-bold text-foreground">${hoveredCountry.gdpPerCapita.toLocaleString('en-US')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Render GeoJSON World Map Focused directly on Arab World */}
            {!geoData ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="size-7 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-[11px] text-muted-foreground font-medium">جاري تحميل الخريطة...</p>
                </div>
              </div>
            ) : (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: ARAB_WORLD_SCALE, center: ARAB_WORLD_CENTER }}
                style={{ width: '100%', height: '100%' }}
              >
                <ZoomableGroup zoom={zoom} center={center} onMoveEnd={({ zoom: z, coordinates }) => { setZoom(z); setCenter(coordinates); }}>
                  <Geographies geography={geoData}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const numId = String(geo.id).padStart(3, '0');
                        const iso = NUM_TO_A3[numId] ?? null;
                        const isArab = iso !== null;
                        const fill = iso ? fillMap[iso] : '#f1f5f9';
                        return (
                          <Geography
                            key={`${geo.rsmKey}-${fill}`}
                            geography={geo}
                            fill={fill}
                            stroke={isArab ? '#ffffff' : '#e2e8f0'}
                            strokeWidth={isArab ? 0.6 : 0.2}
                            style={{
                              default: { fill, outline: 'none', cursor: isArab ? 'pointer' : 'default' },
                              hover:   { fill, outline: 'none', cursor: isArab ? 'pointer' : 'default' },
                              pressed: { fill, outline: 'none' },
                            }}
                            onClick={() => { if (iso) setSelectedIso(prev => prev === iso ? null : iso); }}
                            onMouseEnter={() => { if (iso) setHoveredIso(iso); }}
                            onMouseLeave={() => setHoveredIso(null)}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            )}

            {/* Region Legend */}
            <div className="absolute bottom-2 left-2 z-10 bg-background/90 backdrop-blur-sm rounded-lg p-1.5 shadow-2xs">
              <p className="text-[8px] font-bold text-muted-foreground mb-1">الأقاليم</p>
              <div className="flex flex-col gap-0.5">
                {Object.entries(REGION_COLORS).map(([region, color]) => {
                  const ar: Record<string, string> = { Gulf: 'الخليج', 'North Africa': 'شمال أفريقيا', Levant: 'المشرق', 'East Africa': 'شرق أفريقيا', 'West Africa': 'غرب أفريقيا' };
                  return (
                    <div key={region} className="flex items-center gap-1">
                      <div className="size-1.5 rounded-xs shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-[8px] text-foreground font-medium">{ar[region]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Country Details & Filtered Ranking */}
        <div className="w-full xl:w-80 flex flex-col gap-3">
          {/* Selected Country Spotlight */}
          {selectedCountry && countryRankings ? (
            <Card className="shadow-2xs border-0 bg-card">
              <CardHeader className="pb-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">{selectedCountry.flag}</span>
                    <div>
                      <CardTitle className="text-xs sm:text-sm font-extrabold">{selectedCountry.nameAr}</CardTitle>
                      <p className="text-[10px] text-muted-foreground">{selectedCountry.nameEn}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[9px] shrink-0 py-0.5 px-1.5"
                    style={{ backgroundColor: REGION_COLORS[selectedCountry.region] + '20', color: REGION_COLORS[selectedCountry.region] }}>
                    {selectedCountry.regionAr}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 p-3 pt-0">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pb-1 border-b border-muted/50">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 shrink-0 text-primary" />
                    <span>العاصمة: <span className="font-bold text-foreground">{selectedCountry.capitalAr}</span></span>
                  </div>
                  <Badge variant="outline" className="text-[8px] border-0 bg-muted/60 font-bold px-1 py-0">
                    الترتيب السكاني: #{countryRankings.popRank}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <StatCard icon={Users} label="السكان" value={`${selectedCountry.population.toFixed(1)} م`} color="#6366f1" />
                  <StatCard icon={TrendingUp} label="الناتج" value={`$${selectedCountry.gdp.toLocaleString('en-US')} مليار`} color="#10b981" />
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <StatCard icon={Coins} label="دخل الفرد" value={`$${selectedCountry.gdpPerCapita.toLocaleString('en-US')}`} color="#ec4899" />
                  <StatCard icon={Globe2} label="المساحة" value={`${(selectedCountry.area / 1000).toLocaleString('en-US')} ألف كم²`} color="#f59e0b" />
                </div>

                <div className="p-1.5 rounded-lg bg-muted/30 flex items-center justify-between text-[9px] text-muted-foreground">
                  <span>حصة السكان: <strong className="text-foreground">{countryRankings.popShare}%</strong></span>
                  <span>حصة الناتج: <strong className="text-foreground">{countryRankings.gdpShare}%</strong></span>
                </div>

                <Button variant="outline" size="sm" className="w-full text-[11px] font-bold h-6.5 border-0 bg-muted/60" onClick={() => setSelectedIso(null)}>
                  إغلاق البطاقة
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-xl bg-card p-3 flex flex-col items-center justify-center gap-0.5 text-center border-0 shadow-2xs min-h-[90px]">
              <Info className="size-3.5 text-muted-foreground" />
              <p className="text-xs font-bold text-foreground">بطاقة تفاصيل الدولة</p>
              <p className="text-[10px] text-muted-foreground">حرك المؤشر فوق أي دولة أو انقر عليها لتثبيت بطاقتها</p>
            </div>
          )}

          {/* Ranking & Search List */}
          <Card className="shadow-2xs border-0 bg-card flex-1 flex flex-col">
            <CardHeader className="pb-1.5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold flex items-center gap-1.5">
                  <Award className="size-3 text-primary" />
                  <span>ترتيب الدول حسب {METRICS.find(m => m.key === metric)?.labelAr}</span>
                </CardTitle>
                <span className="text-[9px] text-muted-foreground font-semibold">({filteredCountries.length} دولة)</span>
              </div>

              {/* Search & Region Filter Bar */}
              <div className="flex gap-1.5">
                <div className="relative flex-1">
                  <Search className="absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                  <Input
                    placeholder="ابحث باسم الدولة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pe-6 ps-1.5 text-[10px] h-6.5 border-0 bg-muted/50 focus:bg-background"
                  />
                </div>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-6.5 rounded-lg text-[9px] font-semibold px-1.5 border-0 bg-muted/50 text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="all">كل الأقاليم</option>
                  <option value="Gulf">الخليج</option>
                  <option value="North Africa">شمال أفريقيا</option>
                  <option value="Levant">المشرق</option>
                  <option value="East Africa">شرق أفريقيا</option>
                  <option value="West Africa">غرب أفريقيا</option>
                </select>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-border/30 max-h-[260px] sm:max-h-[300px] overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <div className="p-4 text-center text-[10px] text-muted-foreground">لا توجد نتائج تطابق بحثك</div>
                ) : (
                  filteredCountries.map((country, idx) => {
                    const val = country[metric];
                    const ratio = maxVal === minVal ? 1 : (val - minVal) / (maxVal - minVal);
                    const regionColor = REGION_COLORS[country.region] ?? '#6366f1';
                    const isSelected = country.iso === selectedIso;
                    return (
                      <button
                        key={country.iso}
                        onClick={() => setSelectedIso(prev => prev === country.iso ? null : country.iso)}
                        className={cn(
                          'w-full flex items-center gap-2 px-2.5 py-1.5 text-right transition-colors hover:bg-muted/60',
                          isSelected && 'bg-primary/10 font-bold'
                        )}
                      >
                        <span className="text-xs shrink-0">{country.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-foreground truncate">{country.nameAr}</span>
                            <span className="text-[9px] font-bold tabular-nums text-muted-foreground shrink-0">{fmt(val, metric)}</span>
                          </div>
                          <div className="h-1 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(4, ratio * 100)}%`, backgroundColor: regionColor }} />
                          </div>
                        </div>
                        <span className="text-[8px] font-black text-muted-foreground shrink-0 tabular-nums w-3.5 text-center">#{idx + 1}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3">
        {[
          { label: 'إجمالي سكان الوطن العربي', value: `${totalPopulation.toFixed(1)} مليون نسمة`, icon: Users, color: '#6366f1' },
          { label: 'إجمالي الناتج المحلي', value: `$${totalGdp.toLocaleString('en-US')} مليار دولار`, icon: TrendingUp, color: '#10b981' },
          { label: 'متوسط دخل الفرد العربي', value: `$${avgGdpPerCapita.toLocaleString('en-US')} / سنوياً`, icon: Coins, color: '#ec4899' },
          { label: 'إجمالي المساحة الجغرافية', value: `${(totalArea / 1_000_000).toFixed(1)} مليون كم²`, icon: MapPin, color: '#f97316' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl bg-card p-2 sm:p-2.5 shadow-2xs border-0 flex items-center gap-2">
              <div className="size-7 sm:size-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '15' }}>
                <Icon className="size-3.5" style={{ color: item.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-muted-foreground font-medium truncate">{item.label}</p>
                <p className="text-[11px] sm:text-xs font-bold text-foreground tabular-nums truncate">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
