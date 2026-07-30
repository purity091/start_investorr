import React from "react";
import { TrendingUp, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, ReferenceLine, Line } from "recharts";
import { BaseCard, CardHeader, CardBody, TOKENS } from "./CardDesignSystem";

interface IncomeProjectionSectionProps {
  incomeProjection: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        background: TOKENS.colors.text.title, 
        border: `1px solid ${TOKENS.colors.border}`, 
        borderRadius: "14px", 
        padding: "14px 18px", 
        boxShadow: TOKENS.shadows.premium,
        color: "#fff"
      }}>
        <p style={{ color: TOKENS.colors.text.muted, fontSize: 11, margin: "0 0 10px", fontWeight: 800, textTransform: "uppercase" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, margin: "6px 0" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
            <p style={{ fontSize: 13, fontWeight: 900, margin: 0 }}>
              {p.name === "realistic" ? "المسار الواقعي" : "المستهدف"}: 
              <span style={{ marginRight: 8 }}>${p.value.toLocaleString()}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const IncomeProjectionSection = ({ incomeProjection }: IncomeProjectionSectionProps) => {
  return (
    <BaseCard variant="highlight">
       <CardHeader 
          title="تحليل الفجوة المالية وتوقع الدخل (Projection)" 
          subtitle="مقارنة المسار التشغيلي الواقعي مقابل الطموح المالي المستهدف لعام 2024"
          icon={<TrendingUp size={22} strokeWidth={2.5} />}
          badge="Market Analysis"
       />

       <CardBody>
          <div style={{ display: "flex", gap: 20, justifyContent: "flex-end", marginBottom: 28 }}>
             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 14, height: 4, borderRadius: 2, background: TOKENS.colors.primary }} />
                <span style={{ fontSize: "11.5px", fontWeight: 800, color: TOKENS.colors.text.body }}>المسار الواقعي</span>
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 14, height: 2, borderRadius: 1, background: TOKENS.colors.danger, border: `1px dashed ${TOKENS.colors.danger}` }} />
                <span style={{ fontSize: "11.5px", fontWeight: 800, color: TOKENS.colors.text.body }}>هدفك ($6K)</span>
             </div>
          </div>

          <div style={{ position: "relative", marginLeft: -15, marginBottom: 10 }}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={incomeProjection} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 11, fontWeight: 700, fill: TOKENS.colors.text.muted }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10}
                />
                <YAxis 
                  tick={{ fontSize: 11, fontWeight: 700, fill: TOKENS.colors.text.muted }} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={v => `$${v/1000}k`}
                  width={40}
                  domain={[0, 7500]}
                />
                <Tooltip 
                  content={<CustomTooltip active={false} payload={[]} label={undefined} />}
                  cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                />
                <ReferenceLine 
                  y={6000} 
                  stroke={TOKENS.colors.danger} 
                  strokeDasharray="6 4" 
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="target"
                  stroke={TOKENS.colors.danger}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="monotone"
                  dataKey="realistic"
                  name="realistic"
                  stroke={TOKENS.colors.primary}
                  strokeWidth={4}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: TOKENS.colors.primary }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ 
            marginTop: 32, 
            padding: "20px 24px", 
            background: "linear-gradient(to right, #f8fafc, #fff)", 
            borderRadius: TOKENS.radius.inner, 
            border: `1px solid ${TOKENS.colors.border}`,
            borderRight: `4px solid ${TOKENS.colors.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)"
          }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: TOKENS.colors.text.body, display: "flex", alignItems: "center", gap: 10 }}>
              <Zap size={16} color={TOKENS.colors.primary} fill={TOKENS.colors.primary} style={{ opacity: 0.8 }} />
              تحليل الفجوة: تحتاج لزيادة المبيعات بنسبة <span style={{ color: TOKENS.colors.danger, fontWeight: 900, fontSize: "16px" }}>48%</span> إضافية للوصول لخط الهدف.
            </p>
            <div style={{ background: "#fff", padding: "8px 14px", borderRadius: "10px", border: `1px solid ${TOKENS.colors.border}`, fontSize: TOKENS.typography.label.size, fontWeight: 900, color: TOKENS.colors.text.muted, textTransform: "uppercase" }}>
              توقع دقة 92%
            </div>
          </div>
       </CardBody>
    </BaseCard>
  );
};
