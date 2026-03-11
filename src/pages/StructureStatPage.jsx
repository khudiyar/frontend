import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, RadialBarChart, RadialBar,
} from "recharts";

const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", orangeLight:"#FFF4ED",
  green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  teal:"#0D9488",   tealLight:"#F0FDFA",
  pink:"#DB2777",
  dark:"#0F172A", mid:"#475569", light:"#94A3B8",
  gray:"#E2E8F0", lightGray:"#F8FAFC", white:"#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.lightGray}}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  button,input,select{font-family:'DM Sans',sans-serif}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico = ({ d, size = 16, color = "currentColor", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const I = {
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  building:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  door:    "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7",
  hat:     "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  bar:     "M18 20V10M12 20V4M6 20v-6",
  pie:     "M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z",
  trend:   "M22 7l-8.5 8.5-5-5L1 18M16 7h6v6",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  award:   "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  chevD:   "M6 9l6 6 6-6",
  filter:  "M22 3H2l8 9.46V19l4 2V12.46z",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  info:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M12 12v4",
};

/* ══ DATA ══ */
const DATA = {
  groups: {
    "Bakalavr": {"1-kurs":99,"2-kurs":95,"3-kurs":82,"4-kurs":62,"5-kurs":5,"6-kurs":0},
    "Magistr":  {"1-kurs":14,"2-kurs":13,"3-kurs":0, "4-kurs":0, "5-kurs":0,"6-kurs":0},
  },
  auditoriums: [
    {name:"Ma'ruza",     count:54},
    {name:"Laboratoriya",count:26},
    {name:"Amaliyot",    count:38},
    {name:"Boshqa",      count:36},
  ],
  specialities: [
    {name:"Bakalavr",count:75},
    {name:"Magistr", count:17},
  ],
  departments: [
    {name:"Rektorat",  count:1},
    {name:"Boshqarma", count:1},
    {name:"Fakultet",  count:5},
    {name:"Kafedra",   count:20},
    {name:"Bo'lim",    count:6},
  ],
};

/* ── derived ── */
const COURSES = ["1-kurs","2-kurs","3-kurs","4-kurs","5-kurs","6-kurs"];
const courseData = COURSES.map(k => ({
  name: k,
  Bakalavr: DATA.groups.Bakalavr[k],
  Magistr:  DATA.groups.Magistr[k],
  total:    DATA.groups.Bakalavr[k] + DATA.groups.Magistr[k],
})).filter(d => d.total > 0);

const totalBak    = Object.values(DATA.groups.Bakalavr).reduce((s,v)=>s+v,0);
const totalMag    = Object.values(DATA.groups.Magistr).reduce((s,v)=>s+v,0);
const totalGroups = totalBak + totalMag;
const totalAud    = DATA.auditoriums.reduce((s,d)=>s+d.count,0);
const totalSpec   = DATA.specialities.reduce((s,d)=>s+d.count,0);
const totalDept   = DATA.departments.reduce((s,d)=>s+d.count,0);

const AUD_COLORS  = [C.bright, C.green, C.purple, C.light];
const DEPT_COLORS = [C.navy, C.orange, C.teal, C.purple, C.green];
const SPEC_COLORS = [C.bright, C.purple];

const audRadial = DATA.auditoriums.map((d,i) => ({
  ...d, fill: AUD_COLORS[i % AUD_COLORS.length],
}));

const TABS = [
  {id:"overview",    label:"Umumiy",      icon:I.grid},
  {id:"groups",      label:"Guruhlar",    icon:I.users},
  {id:"auditoriums", label:"Auditoriyalar",icon:I.building},
  {id:"departments", label:"Bo'limlar",   icon:I.layers},
  {id:"specialities",label:"Mutaxassislik",icon:I.hat},
];

/* ══ Shared UI ══ */
const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:C.white,border:`1px solid ${C.gray}`,borderRadius:10,
      padding:"10px 14px",fontSize:12,boxShadow:"0 4px 16px rgba(13,26,99,.1)"}}>
      {label && <div style={{color:C.mid,marginBottom:5,fontWeight:600}}>{label}</div>}
      {payload.map((p,i) => (
        <div key={i} style={{display:"flex",justifyContent:"space-between",gap:14,
          color:C.dark,fontWeight:700,marginTop:i?3:0}}>
          <span style={{color:p.color||C.mid}}>{p.name}</span>
          <span>{typeof p.value==="number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Card = ({title,sub,icon,children,span=1,delay=0,accent=C.bright}) => (
  <div style={{gridColumn:`span ${span}`,background:C.white,borderRadius:16,
    border:`1.5px solid ${C.gray}`,padding:"18px 20px",
    animation:`fadeUp .4s ${delay}ms ease both`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,
      background:`linear-gradient(90deg,${accent},${accent}30)`}}/>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
      <div>
        <div style={{fontSize:14,fontWeight:700,color:C.dark}}>{title}</div>
        {sub && <div style={{fontSize:11,color:C.light,marginTop:2}}>{sub}</div>}
      </div>
      <div style={{width:32,height:32,borderRadius:9,flexShrink:0,
        background:`${accent}15`,border:`1px solid ${accent}25`,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Ico d={icon} size={14} color={accent}/>
      </div>
    </div>
    {children}
  </div>
);

const StatCard = ({label,value,sub,color,icon,delay,pct=70,badge}) => (
  <div style={{background:C.white,borderRadius:14,padding:"16px 18px",
    border:`1.5px solid ${C.gray}`,animation:`fadeUp .35s ${delay}ms ease both`,
    position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,
      background:`linear-gradient(90deg,${color},${color}30)`}}/>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:10,color:C.light,fontWeight:600,textTransform:"uppercase",
          letterSpacing:"0.7px",marginBottom:6}}>{label}</div>
        <div style={{fontSize:32,fontWeight:800,color:C.dark,
          fontFamily:"'Syne',sans-serif",lineHeight:1}}>{value}</div>
        {sub && <div style={{fontSize:11,color:C.light,marginTop:4}}>{sub}</div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
        <div style={{width:44,height:44,borderRadius:12,background:`${color}15`,
          border:`1px solid ${color}25`,flexShrink:0,
          display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ico d={icon} size={20} color={color}/>
        </div>
        {badge && (
          <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
            background:`${color}15`,color:color,border:`1px solid ${color}25`,whiteSpace:"nowrap"}}>
            {badge}
          </span>
        )}
      </div>
    </div>
    <div style={{marginTop:12,height:4,borderRadius:2,background:C.gray}}>
      <div style={{height:"100%",borderRadius:2,width:`${pct}%`,
        background:`linear-gradient(90deg,${color},${color}50)`}}/>
    </div>
  </div>
);

const HBar = ({data,vk="count",nk="name",colors}) => (
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {data.map((d,i) => {
      const max = Math.max(...data.map(x=>x[vk]));
      const pct = max > 0 ? (d[vk]/max)*100 : 0;
      const col = colors ? colors[i%colors.length] : [C.bright,C.teal,C.purple,C.orange,C.green][i%5];
      return (
        <div key={i}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}>
            <span style={{color:C.dark,fontWeight:600}}>{d[nk]}</span>
            <span style={{color:col,fontWeight:800,fontFamily:"'Syne',sans-serif"}}>{d[vk]}</span>
          </div>
          <div style={{height:8,borderRadius:4,background:C.lightGray,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,width:`${pct}%`,
              background:`linear-gradient(90deg,${col},${col}65)`,transition:"width .8s ease"}}/>
          </div>
        </div>
      );
    })}
  </div>
);

/* ── filter select ── */
const Sel = ({value,onChange,children}) => (
  <div style={{position:"relative"}}>
    <select value={value} onChange={onChange}
      style={{padding:"8px 28px 8px 11px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:12,
        color:value?C.dark:C.light,background:C.white,cursor:"pointer",width:"100%"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={12} color={C.light}/>
    </div>
  </div>
);

function Chip({label,onRemove}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,
      padding:"3px 8px 3px 10px",borderRadius:20,
      background:C.lightBlue,border:`1px solid ${C.bright}25`}}>
      <span style={{fontSize:11,fontWeight:600,color:C.bright}}>{label}</span>
      <button onClick={onRemove}
        style={{width:15,height:15,borderRadius:"50%",border:"none",cursor:"pointer",
          background:`${C.bright}20`,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
        <Ico d={I.x} size={8} color={C.bright}/>
      </button>
    </span>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function StructureStatPage() {
  const [tab,        setTab]       = useState("overview");
  const [fEduType,   setFEduType]  = useState(""); // Bakalavr | Magistr
  const [fCourse,    setFCourse]   = useState(""); // 1-kurs ... 6-kurs
  const [fAudType,   setFAudType]  = useState(""); // auditorium type
  const [fDeptType,  setFDeptType] = useState(""); // dept type
  const [toast,      setToast]     = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null), 3000); };
  const hasFilter = fEduType||fCourse||fAudType||fDeptType;
  const clearAll  = () => { setFEduType(""); setFCourse(""); setFAudType(""); setFDeptType(""); };

  /* ── filtered data ── */
  const filtCourseData = courseData.filter(d => {
    if (fCourse && d.name !== fCourse) return false;
    return true;
  }).map(d => ({
    ...d,
    Bakalavr: (!fEduType||fEduType==="Bakalavr") ? d.Bakalavr : 0,
    Magistr:  (!fEduType||fEduType==="Magistr")  ? d.Magistr  : 0,
  })).map(d=>({...d, total: d.Bakalavr+d.Magistr }));

  const filtAud  = fAudType  ? DATA.auditoriums.filter(d=>d.name===fAudType)  : DATA.auditoriums;
  const filtDept = fDeptType ? DATA.departments.filter(d=>d.name===fDeptType) : DATA.departments;
  const filtSpec = fEduType  ? DATA.specialities.filter(d=>d.name===fEduType) : DATA.specialities;

  const filtTotalGroups = filtCourseData.reduce((s,d)=>s+d.total,0);
  const filtTotalAud    = filtAud.reduce((s,d)=>s+d.count,0);
  const filtTotalDept   = filtDept.reduce((s,d)=>s+d.count,0);
  const filtTotalSpec   = filtSpec.reduce((s,d)=>s+d.count,0);

  /* pie for groups */
  const groupPie = [
    {name:"Bakalavr", value: filtCourseData.reduce((s,d)=>s+d.Bakalavr,0)},
    {name:"Magistr",  value: filtCourseData.reduce((s,d)=>s+d.Magistr,0)},
  ].filter(d=>d.value>0);

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background:C.white,borderLeft:`4px solid ${C.green}`,borderRadius:10,
          padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark,
          animation:"fadeUp .3s ease"}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast}
        </div>
      )}

      <div style={{padding:"24px 28px",maxWidth:1400,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,
              fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Tuzilma Statistikasi
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Guruhlar:{" "}<b style={{color:C.dark}}>{totalGroups}</b> •
              Auditoriyalar:{" "}<b style={{color:C.dark}}>{totalAud}</b> •
              Kafedralar:{" "}<b style={{color:C.dark}}>{totalDept}</b> •
              Mutaxassisliklar:{" "}<b style={{color:C.dark}}>{totalSpec}</b>
              {hasFilter && (
                <span style={{marginLeft:8,fontSize:11,fontWeight:700,padding:"2px 9px",
                  borderRadius:20,background:C.orangeLight,color:C.orange}}>● Filter faol</span>
              )}
            </p>
          </div>
          <button onClick={()=>showToast("Excel eksport so'rovi yuborildi")}
            style={{padding:"10px 22px",borderRadius:10,border:"none",cursor:"pointer",
              fontFamily:"inherit",fontSize:13,fontWeight:700,
              background:`linear-gradient(135deg,${C.green},#15803d)`,color:C.white,
              display:"flex",alignItems:"center",gap:8,boxShadow:`0 4px 14px ${C.green}35`}}>
            <Ico d={I.download} size={15} color={C.white}/>Excel eksport
          </button>
        </div>

        {/* ── FILTER PANEL ── */}
        <div style={{background:C.white,borderRadius:14,border:`1.5px solid ${C.gray}`,
          padding:"14px 18px",marginBottom:20,animation:"fadeUp .3s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <Ico d={I.filter} size={13} color={C.mid}/>
            <span style={{fontSize:11,fontWeight:700,color:C.mid,
              textTransform:"uppercase",letterSpacing:"0.7px"}}>Filtrlar</span>
            {hasFilter && (
              <button onClick={clearAll}
                style={{marginLeft:"auto",padding:"4px 10px",borderRadius:7,
                  border:`1.5px solid ${C.red}25`,cursor:"pointer",
                  fontFamily:"inherit",fontSize:11,fontWeight:600,
                  background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:4}}>
                <Ico d={I.x} size={10} color={C.red}/>Tozalash
              </button>
            )}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            <Sel value={fEduType} onChange={e=>setFEduType(e.target.value)}>
              <option value="">Ta'lim turi (barchasi)</option>
              <option value="Bakalavr">🎓 Bakalavr</option>
              <option value="Magistr">🏅 Magistr</option>
            </Sel>
            <Sel value={fCourse} onChange={e=>setFCourse(e.target.value)}>
              <option value="">Kurs (barchasi)</option>
              {COURSES.filter(k=>courseData.find(d=>d.name===k)).map(k=>(
                <option key={k} value={k}>{k}</option>
              ))}
            </Sel>
            <Sel value={fAudType} onChange={e=>setFAudType(e.target.value)}>
              <option value="">Auditoriya turi (barchasi)</option>
              {DATA.auditoriums.map(d=><option key={d.name} value={d.name}>{d.name}</option>)}
            </Sel>
            <Sel value={fDeptType} onChange={e=>setFDeptType(e.target.value)}>
              <option value="">Bo'lim turi (barchasi)</option>
              {DATA.departments.map(d=><option key={d.name} value={d.name}>{d.name}</option>)}
            </Sel>
          </div>
          {hasFilter && (
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>
              {fEduType  && <Chip label={`Ta'lim: ${fEduType}`}      onRemove={()=>setFEduType("")}/>}
              {fCourse   && <Chip label={`Kurs: ${fCourse}`}         onRemove={()=>setFCourse("")}/>}
              {fAudType  && <Chip label={`Auditoriya: ${fAudType}`}  onRemove={()=>setFAudType("")}/>}
              {fDeptType && <Chip label={`Bo'lim: ${fDeptType}`}     onRemove={()=>setFDeptType("")}/>}
            </div>
          )}
        </div>

        {/* ── TABS ── */}
        <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{padding:"8px 18px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,transition:"all .15s",
                display:"flex",alignItems:"center",gap:6,
                background:tab===t.id?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                color:tab===t.id?C.white:C.mid,
                outline:`1.5px solid ${tab===t.id?C.bright:C.gray}`,
                boxShadow:tab===t.id?`0 4px 12px ${C.bright}30`:"none"}}>
              <Ico d={t.icon} size={13} color={tab===t.id?C.white:C.light}/>
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════ OVERVIEW ════════════════ */}
        {tab==="overview" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>

            <StatCard label="Jami guruhlar"      value={filtTotalGroups}
              sub={`Bak: ${filtCourseData.reduce((s,d)=>s+d.Bakalavr,0)} + Mag: ${filtCourseData.reduce((s,d)=>s+d.Magistr,0)}`}
              color={C.bright}  icon={I.users}   delay={0}
              pct={Math.round(filtTotalGroups/Math.max(1,totalGroups)*100)}
              badge={`${Math.round(filtTotalGroups/Math.max(1,totalGroups)*100)}%`}/>

            <StatCard label="Auditoriyalar"       value={filtTotalAud}
              sub={`${filtAud.length} ta tur`}
              color={C.teal}    icon={I.building} delay={60}
              pct={Math.round(filtTotalAud/Math.max(1,totalAud)*100)}
              badge={`${filtTotalAud} xona`}/>

            <StatCard label="Tuzilma bo'limlari"  value={filtTotalDept}
              sub={`${filtDept.length} ta tur`}
              color={C.purple}  icon={I.layers}   delay={120}
              pct={Math.round(filtTotalDept/Math.max(1,totalDept)*100)}
              badge={`${filtDept.length} tur`}/>

            <StatCard label="Mutaxassisliklar"    value={filtTotalSpec}
              sub={`${filtSpec.length} ta daraja`}
              color={C.orange}  icon={I.hat}      delay={180}
              pct={Math.round(filtTotalSpec/Math.max(1,totalSpec)*100)}
              badge={`${filtTotalSpec} yo'nalish`}/>

            {/* Guruhlar stacked */}
            <Card title="Kurslar bo'yicha guruhlar" icon={I.bar}
              sub="Bakalavr va Magistr" span={3} delay={100} accent={C.bright}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={filtCourseData} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="22%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:11}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Bakalavr" name="Bakalavr" fill={C.bright} radius={[0,0,0,0]} stackId="a"/>
                  <Bar dataKey="Magistr"  name="Magistr"  fill={C.purple} radius={[5,5,0,0]} stackId="a"/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Guruh nisbat pie */}
            <Card title="Ta'lim darajasi ulushi" icon={I.pie}
              sub="Bak vs Mag nisbati" span={1} delay={120} accent={C.purple}>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={groupPie} cx="50%" cy="44%" innerRadius={46} outerRadius={72}
                    paddingAngle={4} dataKey="value">
                    <Cell fill={C.bright} stroke="none"/>
                    <Cell fill={C.purple} stroke="none"/>
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:4}}>
                {groupPie.map((d,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:800,fontFamily:"'Syne',sans-serif",
                      color:i===0?C.bright:C.purple}}>{d.value}</div>
                    <div style={{fontSize:10,color:C.light}}>{d.name}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Auditoriyalar mini */}
            <Card title="Auditoriyalar taqsimoti" icon={I.building}
              sub="Tur bo'yicha xonalar" span={2} delay={160} accent={C.teal}>
              <HBar data={filtAud} vk="count" nk="name" colors={AUD_COLORS}/>
            </Card>

            {/* Bo'limlar mini */}
            <Card title="Tuzilma bo'limlari" icon={I.layers}
              sub="Tur bo'yicha bo'limlar" span={2} delay={180} accent={C.purple}>
              <HBar data={filtDept} vk="count" nk="name" colors={DEPT_COLORS}/>
            </Card>
          </div>
        )}

        {/* ════════════════ GURUHLAR ════════════════ */}
        {tab==="groups" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            {/* Stacked bar */}
            <Card title="Kurslar bo'yicha guruhlar (stacked)" icon={I.bar}
              sub="Bakalavr + Magistr" span={3} delay={0} accent={C.bright}>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={filtCourseData} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="22%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Bakalavr" name="Bakalavr" fill={C.bright} stackId="a" radius={[0,0,0,0]}/>
                  <Bar dataKey="Magistr"  name="Magistr"  fill={C.purple} stackId="a" radius={[5,5,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Grouped bar */}
            <Card title="Kurslar — yonma-yon" icon={I.trend}
              sub="Qiyosiy ko'rinish" span={2} delay={80} accent={C.teal}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={filtCourseData} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:11}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Bakalavr" name="Bakalavr" fill={C.bright} radius={[4,4,0,0]}/>
                  <Bar dataKey="Magistr"  name="Magistr"  fill={C.purple} radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie */}
            <Card title="Ta'lim darajasi ulushi" icon={I.pie}
              sub="Jami taqsimot" span={1} delay={100} accent={C.purple}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={groupPie} cx="50%" cy="44%" innerRadius={50} outerRadius={78}
                    paddingAngle={4} dataKey="value">
                    <Cell fill={C.bright} stroke="none"/>
                    <Cell fill={C.purple} stroke="none"/>
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Kurs detail cards */}
            {filtCourseData.map((d,i) => {
              const col = [C.bright,C.teal,C.purple,C.orange,C.green,C.red][i%6];
              const maxT = Math.max(...filtCourseData.map(x=>x.total));
              const pct  = maxT > 0 ? Math.round(d.total/maxT*100) : 0;
              return (
                <div key={i} style={{background:C.white,borderRadius:14,
                  border:`1.5px solid ${C.gray}`,padding:"14px 18px",
                  animation:`fadeUp .3s ${i*40}ms ease both`,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,
                    background:`linear-gradient(90deg,${col},${col}30)`}}/>
                  <div style={{display:"flex",alignItems:"flex-start",
                    justifyContent:"space-between",gap:10,marginBottom:12}}>
                    <div>
                      <div style={{fontSize:11,color:C.light,fontWeight:600,
                        textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:4}}>
                        {d.name}
                      </div>
                      <div style={{fontSize:32,fontWeight:800,color:col,
                        fontFamily:"'Syne',sans-serif",lineHeight:1}}>{d.total}</div>
                      <div style={{fontSize:11,color:C.light,marginTop:3}}>guruh</div>
                    </div>
                    <div style={{width:40,height:40,borderRadius:11,background:`${col}15`,
                      border:`1px solid ${col}25`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.users} size={18} color={col}/>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    {d.Bakalavr>0 && (
                      <span style={{fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:20,
                        background:C.lightBlue,color:C.bright,border:`1px solid ${C.bright}25`}}>
                        🎓 Bak: {d.Bakalavr}
                      </span>
                    )}
                    {d.Magistr>0 && (
                      <span style={{fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:20,
                        background:C.purpleLight,color:C.purple,border:`1px solid ${C.purple}25`}}>
                        🏅 Mag: {d.Magistr}
                      </span>
                    )}
                  </div>
                  <div style={{height:6,borderRadius:3,background:C.gray}}>
                    <div style={{height:"100%",borderRadius:3,width:`${pct}%`,
                      background:`linear-gradient(90deg,${col},${col}55)`,transition:"width .8s ease"}}/>
                  </div>
                </div>
              );
            })}

            {/* Area trend */}
            <Card title="Kursdan kursa o'sish trendi" icon={I.trend}
              sub="Bakalavr yo'nalishi bo'yicha" span={3} delay={240} accent={C.green}>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={filtCourseData} margin={{top:4,right:8,left:-12,bottom:0}}>
                  <defs>
                    <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.bright} stopOpacity={0.15}/>
                      <stop offset="95%" stopColor={C.bright} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.purple} stopOpacity={0.15}/>
                      <stop offset="95%" stopColor={C.purple} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:11}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Area type="monotone" dataKey="Bakalavr" stroke={C.bright} fill="url(#gB)" strokeWidth={2.5}/>
                  <Area type="monotone" dataKey="Magistr"  stroke={C.purple} fill="url(#gM)" strokeWidth={2.5}/>
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ════════════════ AUDITORIYALAR ════════════════ */}
        {tab==="auditoriums" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            {/* Summary stat cards */}
            {filtAud.map((d,i) => {
              const col = AUD_COLORS[i % AUD_COLORS.length];
              const icons = [I.building, I.door, I.building, I.grid];
              const pct = Math.round(d.count/filtTotalAud*100);
              return (
                <StatCard key={i} label={d.name} value={d.count}
                  sub={`Jami ${filtTotalAud} dan ${pct}%`}
                  color={col} icon={icons[i%icons.length]} delay={i*60}
                  pct={pct} badge={`${pct}%`}/>
              );
            })}

            {/* Bar chart */}
            <Card title="Auditoriyalar soni" icon={I.bar}
              sub="Tur bo'yicha" span={2} delay={100} accent={C.teal}>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={filtAud} margin={{top:4,right:8,left:-12,bottom:4}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Bar dataKey="count" name="Xonalar soni" radius={[7,7,0,0]}>
                    {filtAud.map((_,i)=><Cell key={i} fill={AUD_COLORS[i%AUD_COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie */}
            <Card title="Auditoriya ulushi" icon={I.pie}
              sub="Nisbiy taqsimot" span={1} delay={120} accent={C.green}>
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie data={filtAud.map(d=>({name:d.name,value:d.count}))}
                    cx="50%" cy="44%" outerRadius={82} paddingAngle={3} dataKey="value">
                    {filtAud.map((_,i)=><Cell key={i} fill={AUD_COLORS[i%AUD_COLORS.length]} stroke="none"/>)}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Radial bar */}
            <Card title="Radial ko'rinish" icon={I.award}
              sub="Har bir tur ulushi" span={2} delay={160} accent={C.purple}>
              <ResponsiveContainer width="100%" height={230}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%"
                  data={audRadial.map(d=>({...d,count:d.count}))}>
                  <RadialBar minAngle={15} dataKey="count" cornerRadius={8} label={{position:"insideStart",fill:C.white,fontSize:10,fontWeight:700}}>
                    {audRadial.map((d,i)=><Cell key={i} fill={d.fill}/>)}
                  </RadialBar>
                  <Legend iconSize={10} wrapperStyle={{fontSize:11,color:C.mid}}
                    formatter={(value,entry)=>entry.payload.name}/>
                  <Tooltip content={<CT/>}/>
                </RadialBarChart>
              </ResponsiveContainer>
            </Card>

            {/* Progress bars */}
            <Card title="Progress ko'rinishi" icon={I.layers}
              sub="Nisbiy ulush" span={1} delay={180} accent={C.orange}>
              <HBar data={filtAud} vk="count" nk="name" colors={AUD_COLORS}/>
              <div style={{marginTop:16,padding:"10px 12px",borderRadius:10,
                background:C.lightGray,border:`1px solid ${C.gray}`}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                  <span style={{color:C.mid,fontWeight:600}}>Jami xonalar</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,
                    color:C.dark,fontSize:18}}>{filtTotalAud}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════ BO'LIMLAR ════════════════ */}
        {tab==="departments" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            {/* Detail cards */}
            {filtDept.map((d,i) => {
              const col = DEPT_COLORS[i % DEPT_COLORS.length];
              const icons = [I.award, I.building, I.building, I.layers, I.grid];
              const pct = Math.round(d.count/filtTotalDept*100);
              return (
                <StatCard key={i} label={d.name} value={d.count}
                  sub={`${pct}% ulush`}
                  color={col} icon={icons[i%icons.length]} delay={i*50}
                  pct={pct} badge={`${pct}%`}/>
              );
            })}

            {/* Horizontal bar */}
            <Card title="Bo'limlar soni — gorizontal" icon={I.bar}
              sub="Tur bo'yicha" span={2} delay={100} accent={C.purple}>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={filtDept} layout="vertical"
                  margin={{top:4,right:50,left:8,bottom:4}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} horizontal={false}/>
                  <XAxis type="number" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" width={100}
                    tick={{fill:C.mid,fontSize:12}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Bar dataKey="count" name="Soni" radius={[0,7,7,0]}>
                    {filtDept.map((_,i)=><Cell key={i} fill={DEPT_COLORS[i%DEPT_COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie */}
            <Card title="Bo'lim ulushi" icon={I.pie}
              sub="Nisbiy taqsimot" span={1} delay={120} accent={C.teal}>
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie data={filtDept.map(d=>({name:d.name,value:d.count}))}
                    cx="50%" cy="44%" outerRadius={80} paddingAngle={3} dataKey="value">
                    {filtDept.map((_,i)=><Cell key={i} fill={DEPT_COLORS[i%DEPT_COLORS.length]} stroke="none"/>)}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Tree-style visualization */}
            <Card title="Tuzilma iearxiyasi" icon={I.layers}
              sub="Universitetning to'liq tuzilmasi" span={3} delay={180} accent={C.navy}>
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {/* University root */}
                <div style={{display:"flex",alignItems:"center",gap:12,
                  padding:"14px 16px",borderRadius:12,
                  background:`linear-gradient(135deg,${C.navy},${C.blue})`,marginBottom:12}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.15)",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={I.award} size={18} color={C.white}/>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>
                      Nukus Davlat Texnika Universiteti
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>
                      Asosiy tashkilot
                    </div>
                  </div>
                  <div style={{marginLeft:"auto",fontFamily:"'Syne',sans-serif",
                    fontSize:20,fontWeight:800,color:"rgba(255,255,255,.9)"}}>
                    {filtTotalDept}
                  </div>
                </div>

                {/* Children */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
                  {filtDept.map((d,i)=>{
                    const col = DEPT_COLORS[i%DEPT_COLORS.length];
                    return(
                      <div key={i} style={{padding:"12px 14px",borderRadius:11,
                        background:`${col}0C`,border:`1.5px solid ${col}25`,
                        textAlign:"center",position:"relative"}}>
                        <div style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",
                          width:2,height:8,background:C.gray}}/>
                        <div style={{width:32,height:32,borderRadius:9,
                          background:`${col}18`,border:`1px solid ${col}30`,
                          margin:"0 auto 8px",
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <Ico d={I.building} size={14} color={col}/>
                        </div>
                        <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,
                          fontWeight:800,color:col,lineHeight:1}}>{d.count}</div>
                        <div style={{fontSize:11,fontWeight:600,color:C.mid,marginTop:3}}>{d.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════ MUTAXASSISLIKLAR ════════════════ */}
        {tab==="specialities" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            {/* Big stat cards */}
            {filtSpec.map((d,i) => {
              const col = SPEC_COLORS[i%SPEC_COLORS.length];
              const icons = [I.hat, I.award];
              const pct = Math.round(d.count/filtTotalSpec*100);
              return (
                <StatCard key={i} label={`${d.name} yo'nalishlari`} value={d.count}
                  sub={`Jami ${filtTotalSpec} ta yo'nalishdan`}
                  color={col} icon={icons[i%2]} delay={i*80}
                  pct={pct} badge={`${pct}%`}/>
              );
            })}

            {/* Total */}
            <StatCard label="Jami yo'nalishlar" value={filtTotalSpec}
              sub="Bakalavr va Magistr" color={C.teal} icon={I.layers} delay={160}
              pct={100} badge={`${filtSpec.length} daraja`}/>

            {/* Bar */}
            <Card title="Mutaxassisliklar soni" icon={I.bar}
              sub="Daraja bo'yicha" span={2} delay={100} accent={C.bright}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={filtSpec} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:13}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Bar dataKey="count" name="Yo'nalishlar" radius={[8,8,0,0]}>
                    {filtSpec.map((_,i)=><Cell key={i} fill={SPEC_COLORS[i%SPEC_COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie */}
            <Card title="Mutaxassislik ulushi" icon={I.pie}
              sub="Nisbiy taqsimot" span={1} delay={120} accent={C.purple}>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={filtSpec.map(d=>({name:d.name,value:d.count}))}
                    cx="50%" cy="44%" innerRadius={52} outerRadius={84}
                    paddingAngle={6} dataKey="value">
                    {filtSpec.map((_,i)=><Cell key={i} fill={SPEC_COLORS[i%SPEC_COLORS.length]} stroke="none"/>)}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:12,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Info cards */}
            {filtSpec.map((d,i)=>{
              const col = SPEC_COLORS[i%SPEC_COLORS.length];
              const icons = [I.hat, I.award];
              const desc = i===0
                ? "Bakalavr dasturi odatda 4 yil davom etadi. Asosiy ta'lim pog'onasi."
                : "Magistratura dasturi 2 yil. Ilmiy-tadqiqot va ixtisoslashgan ta'lim.";
              const label = i===0 ? "4 yillik dastur" : "2 yillik dastur";
              return (
                <div key={i} style={{gridColumn:"span 1",background:C.white,borderRadius:16,
                  border:`1.5px solid ${col}30`,padding:"20px",
                  animation:`fadeUp .4s ${i*80}ms ease both`,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,
                    background:`linear-gradient(90deg,${col},${col}30)`}}/>
                  <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:14}}>
                    <div style={{width:52,height:52,borderRadius:14,
                      background:`linear-gradient(135deg,${col},${col}80)`,
                      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Ico d={icons[i%2]} size={24} color={C.white}/>
                    </div>
                    <div>
                      <div style={{fontSize:16,fontWeight:800,color:C.dark,
                        fontFamily:"'Syne',sans-serif"}}>{d.name}</div>
                      <div style={{fontSize:11,color:col,fontWeight:600,marginTop:2}}>{label}</div>
                    </div>
                    <div style={{marginLeft:"auto",textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:40,fontWeight:800,color:col,
                        fontFamily:"'Syne',sans-serif",lineHeight:1}}>{d.count}</div>
                      <div style={{fontSize:10,color:C.light}}>yo'nalish</div>
                    </div>
                  </div>
                  <p style={{fontSize:12,color:C.mid,lineHeight:1.6,marginBottom:12}}>{desc}</p>
                  <div style={{height:6,borderRadius:3,background:C.gray}}>
                    <div style={{height:"100%",borderRadius:3,
                      width:`${Math.round(d.count/filtTotalSpec*100)}%`,
                      background:`linear-gradient(90deg,${col},${col}55)`,transition:"width .8s ease"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"flex-end",marginTop:4}}>
                    <span style={{fontSize:10,color:col,fontWeight:700}}>
                      {Math.round(d.count/filtTotalSpec*100)}% ulush
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Progress */}
            <Card title="Qiyosiy progress" icon={I.layers}
              sub="Daraja bo'yicha ulush" span={1} delay={220} accent={C.teal}>
              <HBar data={filtSpec} vk="count" nk="name" colors={SPEC_COLORS}/>
              <div style={{marginTop:14,padding:"10px 12px",borderRadius:10,
                background:C.lightGray,border:`1px solid ${C.gray}`,
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:11,color:C.mid,fontWeight:600}}>Jami yo'nalishlar</span>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,
                  color:C.dark,fontSize:20}}>{filtTotalSpec}</span>
              </div>
            </Card>
          </div>
        )}

      </div>
    </>
  );
}
