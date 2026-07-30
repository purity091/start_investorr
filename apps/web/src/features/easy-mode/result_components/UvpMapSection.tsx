import React from "react";
import { Target, Lightbulb } from "lucide-react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

interface UvpMapSectionProps {
  uvpData: any[];
}

export const UvpMapSection = ({ uvpData }: UvpMapSectionProps) => {
  return (
    <BaseCard variant="highlight">
       <CardHeader 
          title="خريطة القيمة المضافة (UVP Map)" 
          subtitle="تحليل ميزتك التنافسية: أين تبرز قوتك الحقيقية مقارنة بمعدلات السوق لعام 2024؟"
          icon={<Target size={22} strokeWidth={2.5} />}
          badge="Product Positioning"
       />

       <CardBody>
          <div style={{ position: "relative", paddingRight: 10, marginBottom: 10 }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={uvpData} layout="vertical" margin={{ left: -10, right: 30 }} barGap={-14}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                   dataKey="name" 
                   type="category" 
                   tick={{ fontSize: 13, fontWeight: 900, fill: TOKENS.colors.text.title }} 
                   width={70} 
                   axisLine={false} 
                   tickLine={false} 
                />
                <Tooltip 
                   cursor={{ fill: 'transparent' }} 
                   content={({ active, payload }: any) => {
                     if (active && payload && payload.length) {
                       const data = payload[0].payload;
                       return (
                         <div style={{ 
                            background: TOKENS.colors.text.title, 
                            padding: "14px 18px", 
                            borderRadius: "14px", 
                            color: "#fff", 
                            border: `1px solid ${TOKENS.colors.border}`, 
                            boxShadow: TOKENS.shadows.premium 
                         }}>
                           <p style={{ fontWeight: 900, fontSize: 13, marginBottom: 8, borderBottom: "1px solid #334155", paddingBottom: 6 }}>{data.name}</p>
                           <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                             <p style={{ color: TOKENS.colors.primaryLight, fontSize: 11, fontWeight: 800 }}>مشروعك: <span style={{ fontSize: 15 }}>{data.you}%</span></p>
                             <p style={{ color: TOKENS.colors.text.muted, fontSize: 11, fontWeight: 600 }}>معدل السوق: {data.market}%</p>
                           </div>
                         </div>
                       );
                     }
                     return null;
                   }}
                />
                <Bar dataKey="market" name="معدل السوق" fill="#f1f5f9" radius={[0, 8, 8, 0]} barSize={10} />
                <Bar dataKey="you" name="مشروعك" radius={[0, 8, 8, 0]} barSize={20}>
                  {uvpData.map((entry: any, index: number) => (
                     <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ marginTop: 24, display: "flex", gap: 32, justifyContent: "center", borderTop: `1px solid ${TOKENS.colors.border}`, paddingTop: 24, marginBottom: 32 }}>
             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
               <div style={{ width: 14, height: 14, borderRadius: 5, background: `linear-gradient(to right, ${TOKENS.colors.primary}, ${TOKENS.colors.primaryLight})` }} />
               <span style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.body }}>تميزك الخاص</span>
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
               <div style={{ width: 14, height: 14, borderRadius: 5, background: "#f1f5f9" }} />
               <span style={{ fontSize: "12px", fontWeight: 800, color: TOKENS.colors.text.muted }}>متوسط المنافسين</span>
             </div>
          </div>
          
          <div style={{ 
             marginTop: 10, 
             padding: "24px", 
             background: "linear-gradient(to right, #f8fafc, #fff)", 
             borderRadius: TOKENS.radius.inner, 
             border: `1px solid ${TOKENS.colors.border}`,
             borderRight: `4px solid ${TOKENS.colors.warning}`,
             display: "flex",
             gap: 20,
             alignItems: "flex-start",
             boxShadow: "0 4px 10px rgba(0,0,0,0.02)"
          }}>
             <div style={{ background: "#fefce8", padding: 12, borderRadius: 14 }}>
                <Lightbulb size={24} color={TOKENS.colors.warning} strokeWidth={2.5} />
             </div>
             <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", color: TOKENS.colors.text.title, fontWeight: 900, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.03em" }}>الاستنتاج التنافسي (Strategic Insight)</p>
                <p style={{ fontSize: "13.5px", color: TOKENS.colors.text.muted, lineHeight: 1.7, fontWeight: 600 }}>
                  أنت تتفوق بوضوح في <span style={{ color: TOKENS.colors.secondary, fontWeight: 900 }}>الجودة وتجربة العميل</span>. هذه هي "المخرجات المتطرفة" التي يجب أن تركز عليها في إعلاناتك. لا تحاول منافسة السوق في السرعة حالياً، بل ركز على العملاء الذين يقدرون "الجودة العالية".
                </p>
             </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
