import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar, ComposedChart
} from "recharts";

const C = {
  navy:"#0D1A63",blue:"#1E3A9E",bright:"#2845D6",lightBlue:"#EEF2FF",
  orange:"#F68048",orangeLight:"#FFF4ED",green:"#16A34A",greenLight:"#F0FDF4",
  red:"#DC2626",redLight:"#FEF2F2",yellow:"#D97706",yellowLight:"#FFFBEB",
  purple:"#7C3AED",purpleLight:"#F5F3FF",cyan:"#0891B2",cyanLight:"#ECFEFF",
  dark:"#0F172A",mid:"#475569",light:"#94A3B8",gray:"#E2E8F0",
  lightGray:"#F8FAFC",white:"#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:${C.lightGray}; }
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes countUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
`;

// ── DATA ──
const MONTHS = ["Yan","Fev","Mar","Apr","May","Iyn","Iyl","Avg","Sen","Okt","Noy","Dek"];

const enrollData = MONTHS.map((m,i)=>({
  month:m, talabalar:180+Math.round(Math.sin(i*0.5)*40+Math.random()*20),
  o_qituvchilar:20+Math.round(Math.sin(i*0.4)*5+Math.random()*3),
  xodimlar:35+Math.round(Math.cos(i*0.3)*8+Math.random()*4),
}));

const gradeData = MONTHS.slice(0,8).map((m,i)=>({
  month:m,
  matematika: 65+Math.round(Math.random()*25),
  ingliz: 58+Math.round(Math.random()*30),
  dasturlash: 72+Math.round(Math.random()*20),
  fizika: 60+Math.round(Math.random()*28),
}));

const attendData = MONTHS.map((m,i)=>({
  month:m,
  davomat: 85+Math.round(Math.sin(i)*8+Math.random()*5),
  target: 90,
}));

const pieData = [
  {name:"Axborot texn.", value:342, color:C.bright},
  {name:"Iqtisodiyot",   value:287, color:C.orange},
  {name:"Huquq",         value:198, color:C.green},
  {name:"Matematika",    value:156, color:C.purple},
  {name:"Fizika",        value:112, color:C.cyan},
];

const radarData = [
  {subject:"Matematika",  A:85,B:70},
  {subject:"Dasturlash",  A:92,B:65},
  {subject:"Fizika",      A:68,B:80},
  {subject:"Ingliz",      A:78,B:85},
  {subject:"Kimyo",       A:72,B:68},
  {subject:"Tarix",       A:65,B:75},
];

const radialData = [
  {name:"Bitiruvchilar", value:94, fill:C.green},
  {name:"Faol talabalar",value:87, fill:C.bright},
  {name:"A'lo baholilar",value:73, fill:C.orange},
  {name:"Grant egalar",  value:41, fill:C.purple},
];

const paymentData = MONTHS.slice(0,8).map((m,i)=>({
  month:m,
  tolov: 45+Math.round(Math.random()*30),
  qarz:  5+Math.round(Math.random()*15),
  grant: 20+Math.round(Math.random()*10),
}));

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:C.white,border:`1px solid ${C.gray}`,borderRadius:10,padding:"10px 14px",boxShadow:"0 8px 24px rgba(13,26,99,0.1)"}}>
      <div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:6}}>{label}</div>
      {payload.map(p=>(
        <div key={p.name} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.mid,marginBottom:3}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:p.color||p.fill||C.bright}}/>
          <span>{p.name}:</span>
          <span style={{fontWeight:700,color:C.dark}}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Card = ({children,title,subtitle,action,style,chart=false})=>(
  <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
    overflow:"hidden",animation:"fadeUp 0.4s ease",...style}}>
    {(title||subtitle||action)&&(
      <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.lightGray}`,display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:15,fontWeight:700,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{title}</div>
          {subtitle&&<div style={{fontSize:11,color:C.light,marginTop:2}}>{subtitle}</div>}
        </div>
        {action}
      </div>
    )}
    <div style={{padding:chart?"16px 16px 12px":"20px"}}>{children}</div>
  </div>
);

const StatCard = ({label,value,delta,color,bg,icon,suffix=""})=>(
  <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.gray}`,padding:"18px",
    animation:"countUp 0.4s ease",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",right:-10,top:-10,width:80,height:80,borderRadius:"50%",background:`${color}08`}}/>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
      <div style={{width:40,height:40,borderRadius:11,background:`${color}14`,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:20}}>{icon}</span>
      </div>
      {delta&&<span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20,
        background:delta>0?C.greenLight:C.redLight,color:delta>0?C.green:C.red}}>
        {delta>0?"+":""}{delta}%
      </span>}
    </div>
    <div style={{fontSize:28,fontWeight:800,color,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
      {value}<span style={{fontSize:16,fontWeight:600}}>{suffix}</span>
    </div>
    <div style={{fontSize:12,color:C.light,marginTop:5,fontWeight:500}}>{label}</div>
  </div>
);

const PeriodBtn = ({label,active,onClick})=>(
  <button onClick={onClick} style={{padding:"5px 12px",borderRadius:7,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,
    background:active?C.bright:C.lightGray,color:active?C.white:C.light,transition:"all 0.15s",fontFamily:"inherit"}}>
    {label}
  </button>
);

export default function ChartsPage() {
  const [period,setPeriod]=useState("yil");
  const [activeIndex,setActiveIndex]=useState(null);

  const PIESTYLE = {
    fontSize:11,fontFamily:"'DM Sans',sans-serif"
  };

  const renderCustomLabel = ({cx,cy,midAngle,innerRadius,outerRadius,percent,index})=>{
    const r = innerRadius+(outerRadius-innerRadius)*0.5;
    const x = cx+r*Math.cos(-midAngle*Math.PI/180);
    const y = cy+r*Math.sin(-midAngle*Math.PI/180);
    if(percent<0.06) return null;
    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>{`${(percent*100).toFixed(0)}%`}</text>;
  };

  return (
    <>
      <style>{css}</style>
      <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>Statistika va Tahlillar</h1>
            <p style={{fontSize:13,color:C.light}}>2024–2025 o'quv yili ko'rsatkichlari</p>
          </div>
          <div style={{display:"flex",gap:6}}>
            {["hafta","oy","yil"].map(p=><PeriodBtn key={p} label={p} active={period===p} onClick={()=>setPeriod(p)}/>)}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
          <StatCard label="Jami talabalar" value="1,095" delta={8} color={C.bright} icon="🎓"/>
          <StatCard label="O'qituvchilar" value="87" delta={3} color={C.green} icon="👨‍🏫"/>
          <StatCard label="O'rtacha GPA" value="3.42" delta={5} color={C.orange} icon="📊"/>
          <StatCard label="Davomat" value="91" suffix="%" delta={-2} color={C.purple} icon="📅"/>
        </div>

        {/* Row 1: Area + Pie */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
          <Card title="Talabalar dinamikasi" subtitle="Oylar bo'yicha o'zgarish" chart
            action={<div style={{display:"flex",gap:4}}>{["3 oy","6 oy","1 yil"].map(p=><PeriodBtn key={p} label={p} active={false} onClick={()=>{}}/>)}</div>}>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={enrollData} margin={{top:5,right:10,bottom:0,left:-20}}>
                <defs>
                  <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.bright} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={C.bright} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.orange} stopOpacity={0.12}/>
                    <stop offset="95%" stopColor={C.orange} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
                <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11,paddingTop:8}}/>
                <Area type="monotone" dataKey="talabalar" name="Talabalar" stroke={C.bright} strokeWidth={2.5} fill="url(#gBlue)" dot={false} activeDot={{r:5,fill:C.bright}}/>
                <Area type="monotone" dataKey="o_qituvchilar" name="O'qituvchilar" stroke={C.orange} strokeWidth={2} fill="url(#gOrange)" dot={false} activeDot={{r:4,fill:C.orange}}/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Fakultetlar ulushi" subtitle="Talabalar soni bo'yicha" chart>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95}
                  dataKey="value" paddingAngle={3}
                  labelLine={false} label={renderCustomLabel}
                  onMouseEnter={(_,i)=>setActiveIndex(i)} onMouseLeave={()=>setActiveIndex(null)}>
                  {pieData.map((entry,i)=>(
                    <Cell key={i} fill={entry.color} opacity={activeIndex===null||activeIndex===i?1:0.65}
                      stroke="none"/>
                  ))}
                </Pie>
                <Tooltip formatter={(v,n)=>[v+" talaba",n]}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:-8}}>
              {pieData.map((d,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",padding:"3px 6px",borderRadius:6,
                  background:activeIndex===i?`${d.color}10`:"transparent"}}
                  onMouseEnter={()=>setActiveIndex(i)} onMouseLeave={()=>setActiveIndex(null)}>
                  <div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/>
                  <span style={{fontSize:11,color:C.mid,flex:1}}>{d.name}</span>
                  <span style={{fontSize:11,fontWeight:700,color:C.dark}}>{d.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2: Bar + Line */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <Card title="Fanlar bo'yicha o'rtacha ball" subtitle="Oxirgi 8 oy" chart>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={gradeData} margin={{top:5,right:5,bottom:0,left:-25}} barSize={8} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
                <YAxis domain={[40,100]} tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
                <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11,paddingTop:8}}/>
                <Bar dataKey="matematika" name="Matematika" fill={C.bright} radius={[4,4,0,0]}/>
                <Bar dataKey="ingliz" name="Ingliz" fill={C.orange} radius={[4,4,0,0]}/>
                <Bar dataKey="dasturlash" name="Dasturlash" fill={C.green} radius={[4,4,0,0]}/>
                <Bar dataKey="fizika" name="Fizika" fill={C.purple} radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Davomat ko'rsatkichi" subtitle="Maqsad: 90% vs haqiqiy" chart>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={attendData} margin={{top:5,right:5,bottom:0,left:-25}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
                <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11,paddingTop:8}}/>
                <defs>
                  <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.green} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="davomat" name="Davomat %" fill="url(#gGreen)" stroke={C.green} strokeWidth={2.5} dot={{r:3,fill:C.green}} activeDot={{r:5}}/>
                <Line type="monotone" dataKey="target" name="Maqsad" stroke={C.red} strokeWidth={1.5} strokeDasharray="6 3" dot={false}/>
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Row 3: Radar + Radial + Stacked Bar */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>
          <Card title="Fanlar tahlili" subtitle="MT-203 vs O'rtacha" chart>
            <ResponsiveContainer width="100%" height={230}>
              <RadarChart cx="50%" cy="50%" outerRadius={80} data={radarData}>
                <PolarGrid stroke={C.gray}/>
                <PolarAngleAxis dataKey="subject" tick={{fontSize:10,fill:C.light}}/>
                <Radar name="MT-203" dataKey="A" stroke={C.bright} fill={C.bright} fillOpacity={0.25} strokeWidth={2}/>
                <Radar name="O'rtacha" dataKey="B" stroke={C.orange} fill={C.orange} fillOpacity={0.15} strokeWidth={2}/>
                <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11}}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Ko'rsatkichlar" subtitle="Foiz hisobida" chart>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={90} data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar minAngle={15} background={{ fill:C.lightGray }} clockWise dataKey="value" cornerRadius={5}/>
                <Tooltip formatter={(v)=>[`${v}%`]}/>
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:4}}>
              {radialData.map(d=>(
                <div key={d.name} style={{display:"flex",alignItems:"center",gap:7}}>
                  <div style={{width:8,height:8,borderRadius:2,background:d.fill,flexShrink:0}}/>
                  <span style={{fontSize:11,color:C.mid,flex:1}}>{d.name}</span>
                  <span style={{fontSize:12,fontWeight:700,color:d.fill}}>{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="To'lov holati" subtitle="Million so'mda" chart>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={paymentData} margin={{top:5,right:5,bottom:0,left:-25}} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:10,fill:C.light}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:10,fill:C.light}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
                <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:10,paddingTop:4}}/>
                <Bar dataKey="grant" name="Grant" stackId="a" fill={C.purple} radius={[0,0,0,0]}/>
                <Bar dataKey="tolov" name="To'lov" stackId="a" fill={C.bright} radius={[0,0,0,0]}/>
                <Bar dataKey="qarz" name="Qarz" stackId="a" fill={C.red} radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Row 4: Multi-line chart */}
        <Card title="Yillik tendensiya — barcha ko'rsatkichlar" subtitle="Talabalar, davomat va GPA ning yillik dinamikasi" chart>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={enrollData} margin={{top:5,right:10,bottom:0,left:-10}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.lightGray} vertical={false}/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="left" tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="right" orientation="right" tick={{fontSize:11,fill:C.light}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CUSTOM_TOOLTIP/>}/>
              <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11,paddingTop:8}}/>
              <Line yAxisId="left" type="monotone" dataKey="talabalar" name="Talabalar" stroke={C.bright} strokeWidth={2.5} dot={false} activeDot={{r:5}}/>
              <Line yAxisId="right" type="monotone" dataKey="o_qituvchilar" name="O'qituvchilar" stroke={C.orange} strokeWidth={2} dot={false} strokeDasharray="0" activeDot={{r:4}}/>
              <Line yAxisId="right" type="monotone" dataKey="xodimlar" name="Xodimlar" stroke={C.green} strokeWidth={2} dot={false} strokeDasharray="5 3" activeDot={{r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
