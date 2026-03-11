import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
} from "recharts";

const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", orangeLight:"#FFF4ED",
  green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  teal:"#0D9488",   tealLight:"#F0FDFA",
  pink:"#DB2777",   pinkLight:"#FDF2F8",
  dark:"#0F172A", mid:"#475569", light:"#94A3B8",
  gray:"#E2E8F0", lightGray:"#F8FAFC", white:"#FFFFFF",
};
const MAN   = C.bright;
const WOMAN = C.pink;

const css=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.lightGray}}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes countUp{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico=({d,size=16,color="currentColor",sw=2})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I={
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  hat:     "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  award:   "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  bar:     "M18 20V10M12 20V4M6 20v-6",
  pie:     "M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z",
  globe:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  trend:   "M22 7l-8.5 8.5-5-5L1 18M16 7h6v6",
  briefc:  "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  chevD:   "M6 9l6 6 6-6",
  x:       "M18 6L6 18M6 6l12 12",
  filter:  "M22 3H2l8 9.46V19l4 2V12.46z",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  check:   "M20 6L9 17l-5-5",
  radar:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  age:     "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 6v6l4 2",
};

/* ══ RAW DATA ══ */
const DATA = {
  position:{
    "Stajer-o'qituvchi":32,"Assistent":101,"Katta o'qituvchi":35,
    "Dotsent":19,"Professor":1,"Kafedra mudiri":20,
  },
  gender:{"Erkak":115,"Ayol":93,"Jami":208},
  citizenship:{
    "O'zbekiston Respublikasi fuqarosi":207,
    "Xorijiy davlat fuqarosi":1,
    "Fuqaroligi yo'q shaxslar":0,
  },
  academic_degree:{
    "Darajasiz":{"Erkak":92,"Ayol":80},
    "Fan nomzodi, PhD":{"Erkak":20,"Ayol":10},
    "Fan doktori, DSc":{"Erkak":3,"Ayol":3},
  },
  academic_rank:{
    "Unvonsiz":{"Erkak":104,"Ayol":91},
    "Dotsent":{"Erkak":9,"Ayol":2},
    "Katta ilmiy xodim":{"Erkak":0,"Ayol":0},
    "Professor":{"Erkak":2,"Ayol":0},
  },
  direction:{"Prorektor":0,"Dekan":0,"Kafedra mudiri":20},
  academic:{"Darajali":36,"Darajasiz":172},
  age:{
    "30 yoshgacha":{"Erkak":39,"Ayol":19},
    "30–35 yosh":{"Erkak":27,"Ayol":11},
    "35–40 yosh":{"Erkak":15,"Ayol":17},
    "40–45 yosh":{"Erkak":11,"Ayol":19},
    "45–50 yosh":{"Erkak":7,"Ayol":7},
    "50–55 yosh":{"Erkak":7,"Ayol":10},
    "55–60 yosh":{"Erkak":3,"Ayol":5},
    "60+ yosh":{"Erkak":6,"Ayol":5},
  },
  employment_form:{
    "Asosiy ish joy":208,
    "O'rindoshlik (tashqi)":174,
    "Soatbay":16,
    "O'rindoshlik (ichki-qo'shimcha)":116,
    "O'rindoshlik (ichki-asosiy)":3,
  },
};

/* ══ Derived datasets ══ */
const posData   = Object.entries(DATA.position).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);
const degData   = Object.entries(DATA.academic_degree).map(([k,v])=>({name:k,...v,total:v.Erkak+v.Ayol}));
const rankData  = Object.entries(DATA.academic_rank).map(([k,v])=>({name:k,...v,total:v.Erkak+v.Ayol}));
const ageData   = Object.entries(DATA.age).map(([k,v])=>({name:k,...v,total:v.Erkak+v.Ayol}));
const empData   = Object.entries(DATA.employment_form).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);
const genderPie = [{name:"Erkak",value:DATA.gender.Erkak},{name:"Ayol",value:DATA.gender.Ayol}];
const acadPie   = Object.entries(DATA.academic).map(([k,v])=>({name:k,value:v}));
const citizPie  = Object.entries(DATA.citizenship).filter(([,v])=>v>0).map(([k,v])=>({name:k,value:v}));
const radarData = Object.entries(DATA.academic_degree).map(([name,v])=>({
  name, Erkak:v.Erkak, Ayol:v.Ayol,
}));

/* ══ TABS ══ */
const TABS=[
  {id:"overview",   label:"Umumiy",        icon:I.users},
  {id:"position",   label:"Lavozim",        icon:I.briefc},
  {id:"academic",   label:"Ilmiy daraja",   icon:I.hat},
  {id:"age",        label:"Yosh tarkibi",   icon:I.age},
  {id:"employment", label:"Bandlik shakli", icon:I.layers},
];

/* ══ FILTER OPTIONS ══ */
const GENDER_OPTS=[
  {v:"",    l:"Jinsi (barchasi)"},
  {v:"Erkak",l:"👨 Erkak"},
  {v:"Ayol", l:"👩 Ayol"},
];
const DEGREE_OPTS=[
  {v:"",                  l:"Daraja (barchasi)"},
  {v:"Darajasiz",         l:"Darajasiz"},
  {v:"Fan nomzodi, PhD",  l:"Fan nomzodi / PhD"},
  {v:"Fan doktori, DSc",  l:"Fan doktori / DSc"},
];
const RANK_OPTS=[
  {v:"",l:"Unvon (barchasi)"},
  {v:"Unvonsiz",l:"Unvonsiz"},
  {v:"Dotsent", l:"Dotsent"},
  {v:"Professor",l:"Professor"},
];
const EMP_OPTS=[
  {v:"",l:"Bandlik (barchasi)"},
  ...Object.keys(DATA.employment_form).map(k=>({v:k,l:k})),
];
const AGE_OPTS=[
  {v:"",l:"Yosh (barchasi)"},
  ...Object.keys(DATA.age).map(k=>({v:k,l:k})),
];

/* ══ filter logic ══
   For this API the data is already aggregated, so filters just highlight/scope charts.
   We'll show filtered subsets where applicable.                                        */
function applyFilters(fGender, fDegree, fRank, fEmp, fAge) {
  // Gender-split datasets re-scoped
  const gScope = (obj) => {
    if (!fGender) return obj;
    return { Erkak: fGender==="Erkak"?obj.Erkak:0, Ayol: fGender==="Ayol"?obj.Ayol:0 };
  };

  const deg = Object.entries(DATA.academic_degree)
    .filter(([k])=>!fDegree||k===fDegree)
    .map(([k,v])=>{ const g=gScope(v); return{name:k,...g,total:g.Erkak+g.Ayol}; });

  const rank = Object.entries(DATA.academic_rank)
    .filter(([k])=>!fRank||k===fRank)
    .map(([k,v])=>{ const g=gScope(v); return{name:k,...g,total:g.Erkak+g.Ayol}; });

  const age = Object.entries(DATA.age)
    .filter(([k])=>!fAge||k===fAge)
    .map(([k,v])=>{ const g=gScope(v); return{name:k,...g,total:g.Erkak+g.Ayol}; });

  const emp = Object.entries(DATA.employment_form)
    .filter(([k])=>!fEmp||k===fEmp)
    .map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);

  const pos = posData; // position has no gender split in source

  // summary totals
  const totalMale   = !fGender||fGender==="Erkak" ? DATA.gender.Erkak : 0;
  const totalFemale = !fGender||fGender==="Ayol"  ? DATA.gender.Ayol  : 0;
  const total       = totalMale + totalFemale;

  const gPie = [
    {name:"Erkak",value:totalMale},
    {name:"Ayol", value:totalFemale},
  ].filter(d=>d.value>0);

  return {deg, rank, age, emp, pos, total, totalMale, totalFemale, gPie};
}

/* ══ UI HELPERS ══ */
const CT=({active,payload,label})=>{
  if(!active||!payload?.length) return null;
  return(
    <div style={{background:C.white,border:`1px solid ${C.gray}`,borderRadius:10,
      padding:"10px 14px",fontSize:12,boxShadow:"0 4px 16px rgba(13,26,99,.1)"}}>
      {label&&<div style={{color:C.mid,marginBottom:5,fontWeight:600}}>{label}</div>}
      {payload.map((p,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",gap:14,
          color:C.dark,fontWeight:700,marginTop:i?3:0}}>
          <span style={{color:p.color||C.mid}}>{p.name}</span>
          <span>{typeof p.value==="number"?p.value.toLocaleString():p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Card=({title,sub,icon,children,span=1,delay=0,accent=C.bright})=>(
  <div style={{gridColumn:`span ${span}`,background:C.white,borderRadius:16,
    border:`1.5px solid ${C.gray}`,padding:"18px 20px",
    animation:`fadeUp .4s ${delay}ms ease both`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,
      background:`linear-gradient(90deg,${accent},${accent}30)`}}/>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
      <div>
        <div style={{fontSize:14,fontWeight:700,color:C.dark}}>{title}</div>
        {sub&&<div style={{fontSize:11,color:C.light,marginTop:2}}>{sub}</div>}
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

const StatCard=({label,value,sub,color,icon,delay,pct})=>(
  <div style={{background:C.white,borderRadius:14,padding:"16px 18px",
    border:`1.5px solid ${C.gray}`,animation:`fadeUp .35s ${delay}ms ease both`}}>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:10,color:C.light,fontWeight:600,textTransform:"uppercase",
          letterSpacing:"0.7px",marginBottom:6}}>{label}</div>
        <div style={{fontSize:30,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",
          lineHeight:1,animation:"countUp .5s ease both"}}>{value}</div>
        {sub&&<div style={{fontSize:11,color:C.light,marginTop:4}}>{sub}</div>}
      </div>
      <div style={{width:44,height:44,borderRadius:12,background:`${color}15`,
        border:`1px solid ${color}25`,flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Ico d={icon} size={20} color={color}/>
      </div>
    </div>
    <div style={{marginTop:12,height:4,borderRadius:2,background:C.gray}}>
      <div style={{height:"100%",borderRadius:2,
        background:`linear-gradient(90deg,${color},${color}55)`,width:`${pct||70}%`}}/>
    </div>
  </div>
);

const Sel=({value,onChange,children,style={}})=>(
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 28px 8px 11px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:12,
        color:value?C.dark:C.light,background:C.white,cursor:"pointer"}}>
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

/* horizontal progress bar */
const HBar=({data,vk="value",nk="name",colors,maxVal})=>(
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {data.map((d,i)=>{
      const max=maxVal||Math.max(...data.map(x=>x[vk]));
      const pct=max>0?(d[vk]/max)*100:0;
      const col=colors?colors[i%colors.length]:[C.bright,C.teal,C.purple,C.orange,C.green,C.red][i%6];
      return(
        <div key={i}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:11}}>
            <span style={{color:C.dark,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",
              whiteSpace:"nowrap",maxWidth:"78%"}}>{d[nk]}</span>
            <span style={{color:col,fontWeight:800,fontFamily:"'Syne',sans-serif",flexShrink:0}}>
              {d[vk]}
            </span>
          </div>
          <div style={{height:8,borderRadius:4,background:C.lightGray,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,width:`${pct}%`,
              background:`linear-gradient(90deg,${col},${col}70)`,transition:"width .8s ease"}}/>
          </div>
        </div>
      );
    })}
  </div>
);

/* gender split bar row */
const GenderRow=({label,male,female,maxVal})=>{
  const total=male+female;
  const mPct=maxVal>0?(male/maxVal)*100:0;
  const fPct=maxVal>0?(female/maxVal)*100:0;
  return(
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:11}}>
        <span style={{color:C.dark,fontWeight:600}}>{label}</span>
        <span style={{color:C.mid,fontWeight:700}}>
          <span style={{color:MAN}}>👨 {male}</span>
          {" + "}
          <span style={{color:WOMAN}}>👩 {female}</span>
          {" = "}
          <b style={{color:C.dark}}>{total}</b>
        </span>
      </div>
      <div style={{height:10,borderRadius:5,background:C.lightGray,overflow:"hidden",
        display:"flex",gap:1}}>
        <div style={{height:"100%",width:`${mPct}%`,
          background:`linear-gradient(90deg,${MAN},${MAN}80)`,transition:"width .8s ease"}}/>
        <div style={{height:"100%",width:`${fPct}%`,
          background:`linear-gradient(90deg,${WOMAN},${WOMAN}80)`,transition:"width .8s ease"}}/>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function EmployeeStatPage(){
  const [tab,    setTab]    = useState("overview");
  const [fGender,setFGender]= useState("");
  const [fDegree,setFDegree]= useState("");
  const [fRank,  setFRank]  = useState("");
  const [fEmp,   setFEmp]   = useState("");
  const [fAge,   setFAge]   = useState("");
  const [toast,  setToast]  = useState(null);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),3000);};
  const hasFilter=fGender||fDegree||fRank||fEmp||fAge;
  const clearAll=()=>{setFGender("");setFDegree("");setFRank("");setFEmp("");setFAge("");};

  const F=useMemo(()=>applyFilters(fGender,fDegree,fRank,fEmp,fAge),[fGender,fDegree,fRank,fEmp,fAge]);

  const totalDeg = F.deg.reduce((s,d)=>s+d.total,0);
  const maxAge   = Math.max(...F.age.map(d=>d.total));
  const maxPos   = Math.max(...F.pos.map(d=>d.value));

  return(
    <>
      <style>{css}</style>

      {toast&&(
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
              Xodimlar Statistikasi
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami:{" "}<b style={{color:C.dark}}>{DATA.gender.Jami}</b> ta xodim •
              Filtrlangan:{" "}<b style={{color:C.bright}}>{F.total}</b> ta
              {hasFilter&&(
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
            {hasFilter&&(
              <button onClick={clearAll}
                style={{marginLeft:"auto",padding:"4px 10px",borderRadius:7,
                  border:`1.5px solid ${C.red}25`,cursor:"pointer",
                  fontFamily:"inherit",fontSize:11,fontWeight:600,
                  background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:4}}>
                <Ico d={I.x} size={10} color={C.red}/>Tozalash
              </button>
            )}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
            <Sel value={fGender} onChange={e=>setFGender(e.target.value)}>
              {GENDER_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </Sel>
            <Sel value={fDegree} onChange={e=>setFDegree(e.target.value)}>
              {DEGREE_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </Sel>
            <Sel value={fRank} onChange={e=>setFRank(e.target.value)}>
              {RANK_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </Sel>
            <Sel value={fEmp} onChange={e=>setFEmp(e.target.value)}>
              {EMP_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </Sel>
            <Sel value={fAge} onChange={e=>setFAge(e.target.value)}>
              {AGE_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </Sel>
          </div>
          {hasFilter&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>
              {fGender&&<Chip label={`Jins: ${fGender}`}      onRemove={()=>setFGender("")}/>}
              {fDegree&&<Chip label={`Daraja: ${fDegree}`}    onRemove={()=>setFDegree("")}/>}
              {fRank  &&<Chip label={`Unvon: ${fRank}`}       onRemove={()=>setFRank("")}/>}
              {fEmp   &&<Chip label={`Bandlik: ${fEmp}`}      onRemove={()=>setFEmp("")}/>}
              {fAge   &&<Chip label={`Yosh: ${fAge}`}         onRemove={()=>setFAge("")}/>}
            </div>
          )}
        </div>

        {/* ── TABS ── */}
        <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          {TABS.map(t=>(
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
        {tab==="overview"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>

            {/* stat cards */}
            <StatCard label="Jami xodimlar"  value={F.total}        sub="Jami ro'yxatda"        color={C.bright}  icon={I.users}  delay={0}   pct={100}/>
            <StatCard label="Erkaklar"        value={F.totalMale}    sub={`${Math.round(F.totalMale/Math.max(1,F.total)*100)}% ulush`}  color={MAN}     icon={I.user}   delay={60}  pct={Math.round(F.totalMale/Math.max(1,F.total)*100)}/>
            <StatCard label="Ayollar"         value={F.totalFemale}  sub={`${Math.round(F.totalFemale/Math.max(1,F.total)*100)}% ulush`} color={WOMAN}   icon={I.user}   delay={120} pct={Math.round(F.totalFemale/Math.max(1,F.total)*100)}/>
            <StatCard label="Ilmiy darajali"  value={DATA.academic.Darajali} sub="Fan nomzodi / doktori"  color={C.purple}  icon={I.award}  delay={180} pct={Math.round(DATA.academic.Darajali/DATA.gender.Jami*100)}/>

            {/* Gender pie */}
            <Card title="Jins tarkibi" icon={I.pie}
              sub="Erkak va ayollar nisbati" span={1} delay={100} accent={C.bright}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={F.gPie} cx="50%" cy="44%" innerRadius={50} outerRadius={76}
                    paddingAngle={4} dataKey="value">
                    <Cell fill={MAN}   stroke="none"/>
                    <Cell fill={WOMAN} stroke="none"/>
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:12,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:4}}>
                {F.gPie.map((d,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div style={{fontSize:22,fontWeight:800,fontFamily:"'Syne',sans-serif",
                      color:i===0?MAN:WOMAN}}>{d.value}</div>
                    <div style={{fontSize:10,color:C.light}}>{d.name}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Academic degree pie */}
            <Card title="Ilmiy daraja" icon={I.hat}
              sub="Darajali vs darajasiz" span={1} delay={120} accent={C.purple}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={acadPie} cx="50%" cy="44%" innerRadius={50} outerRadius={76}
                    paddingAngle={4} dataKey="value">
                    <Cell fill={C.purple} stroke="none"/>
                    <Cell fill={C.gray}   stroke="none"/>
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:12,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:4}}>
                {acadPie.map((d,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div style={{fontSize:22,fontWeight:800,fontFamily:"'Syne',sans-serif",
                      color:i===0?C.purple:C.light}}>{d.value}</div>
                    <div style={{fontSize:10,color:C.light}}>{d.name}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Fuqarolik */}
            <Card title="Fuqarolik" icon={I.globe}
              sub="Fuqarolik holati" span={1} delay={140} accent={C.teal}>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:4}}>
                {citizPie.map((d,i)=>{
                  const colors=[C.teal,C.orange,C.red];
                  const total=citizPie.reduce((s,x)=>s+x.value,0);
                  const pct=total>0?(d.value/total)*100:0;
                  return(
                    <div key={i}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:11}}>
                        <span style={{color:C.dark,fontWeight:600,overflow:"hidden",
                          textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"78%"}}>{d.name}</span>
                        <span style={{color:colors[i],fontWeight:800,fontFamily:"'Syne',sans-serif",flexShrink:0}}>
                          {d.value}
                        </span>
                      </div>
                      <div style={{height:8,borderRadius:4,background:C.lightGray,overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:4,width:`${pct}%`,
                          background:`linear-gradient(90deg,${colors[i]},${colors[i]}70)`,transition:"width .8s ease"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Yo'nalish */}
            <Card title="Rahbariyat" icon={I.briefc}
              sub="Kafedra mudirlari va boshqalar" span={1} delay={160} accent={C.orange}>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:4}}>
                {Object.entries(DATA.direction).map(([k,v],i)=>{
                  const colors=[C.orange,C.red,C.teal];
                  return(
                    <div key={k} style={{display:"flex",alignItems:"center",gap:10,
                      padding:"9px 12px",borderRadius:10,
                      background:v>0?`${colors[i]}10`:C.lightGray,
                      border:`1px solid ${v>0?colors[i]+"25":C.gray}`}}>
                      <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,
                        background:v>0?colors[i]:C.light}}/>
                      <span style={{fontSize:12,fontWeight:600,color:C.dark,flex:1}}>{k}</span>
                      <span style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,
                        color:v>0?colors[i]:C.light}}>{v}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Yosh piramida teaser */}
            <Card title="Yosh tarkibi — umumiy" icon={I.age}
              sub="Barcha yosh guruhlar" span={4} delay={200} accent={C.teal}>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={F.age} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Erkak" name="Erkak" fill={MAN}   radius={[4,4,0,0]} stackId="a"/>
                  <Bar dataKey="Ayol"  name="Ayol"  fill={WOMAN} radius={[4,4,0,0]} stackId="a"/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ════════════════ LAVOZIM ════════════════ */}
        {tab==="position"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            <Card title="Lavozim bo'yicha xodimlar" icon={I.bar}
              sub="Har bir lavozimdan nechta xodim" span={2} delay={0} accent={C.bright}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={F.pos} layout="vertical"
                  margin={{top:4,right:50,left:8,bottom:4}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} horizontal={false}/>
                  <XAxis type="number" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" width={145}
                    tick={{fill:C.mid,fontSize:11}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Bar dataKey="value" name="Xodimlar" radius={[0,6,6,0]}>
                    {F.pos.map((_,i)=>(<Cell key={i} fill={[C.bright,C.teal,C.purple,C.orange,C.green,C.red][i%6]}/>))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Lavozim ulushi" icon={I.pie}
              sub="Nisbiy taqsimot" span={1} delay={60} accent={C.teal}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={F.pos} cx="50%" cy="44%" outerRadius={88} paddingAngle={2} dataKey="value">
                    {F.pos.map((_,i)=>(<Cell key={i} fill={[C.bright,C.teal,C.purple,C.orange,C.green,C.red][i%6]} stroke="none"/>))}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:10,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Lavozim progress" icon={I.layers}
              sub="Nisbiy ulush vizualizatsiyasi" span={3} delay={120} accent={C.purple}>
              <HBar data={F.pos} vk="value" nk="name"
                colors={[C.bright,C.teal,C.purple,C.orange,C.green,C.red]}/>
            </Card>

            {/* Summary cards */}
            {F.pos.map((p,i)=>{
              const colors=[C.bright,C.teal,C.purple,C.orange,C.green,C.red];
              const col=colors[i%colors.length];
              const total=F.pos.reduce((s,x)=>s+x.value,0);
              const pct=total>0?Math.round(p.value/total*100):0;
              return(
                <div key={i} style={{gridColumn:"span 1",background:C.white,borderRadius:14,
                  border:`1.5px solid ${C.gray}`,padding:"14px 16px",
                  animation:`fadeUp .3s ${i*40}ms ease both`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:col,flexShrink:0}}/>
                    <div style={{flex:1,fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.3}}>{p.name}</div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:24,fontWeight:800,color:col,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                        {p.value}
                      </div>
                      <div style={{fontSize:10,color:C.light}}>{pct}%</div>
                    </div>
                  </div>
                  <div style={{marginTop:10,height:4,borderRadius:2,background:C.gray}}>
                    <div style={{height:"100%",borderRadius:2,width:`${pct}%`,
                      background:`linear-gradient(90deg,${col},${col}55)`}}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════════════ ACADEMIC ════════════════ */}
        {tab==="academic"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            {/* Degree gender split bar */}
            <Card title="Ilmiy daraja — jins bo'yicha" icon={I.hat}
              sub="Erkak va ayollar qiyosida" span={2} delay={0} accent={C.purple}>
              <div style={{marginTop:4}}>
                {F.deg.map((d,i)=>(
                  <GenderRow key={i} label={d.name} male={d.Erkak} female={d.Ayol}
                    maxVal={Math.max(...F.deg.map(x=>x.Erkak+x.Ayol))}/>
                ))}
              </div>
            </Card>

            {/* Degree total pie */}
            <Card title="Daraja taqsimoti" icon={I.pie}
              sub="Jami ulushlar" span={1} delay={60} accent={C.purple}>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={F.deg.map(d=>({name:d.name,value:d.total}))}
                    cx="50%" cy="44%" innerRadius={48} outerRadius={80} paddingAngle={4} dataKey="value">
                    {F.deg.map((_,i)=><Cell key={i} fill={[C.purple,C.bright,C.teal][i%3]} stroke="none"/>)}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:10,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Grouped bar */}
            <Card title="Ilmiy daraja: Erkak vs Ayol" icon={I.bar}
              sub="Grouped bar chart" span={2} delay={120} accent={C.bright}>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={F.deg} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="28%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Erkak" name="Erkak" fill={MAN}   radius={[4,4,0,0]}/>
                  <Bar dataKey="Ayol"  name="Ayol"  fill={WOMAN} radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Rank summary */}
            <Card title="Ilmiy unvon" icon={I.award}
              sub="Unvon turlari" span={1} delay={140} accent={C.orange}>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:4}}>
                {F.rank.map((r,i)=>{
                  const colors=[C.light,C.orange,C.teal,C.purple];
                  const col=r.total>0?colors[i%colors.length]:C.gray;
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,
                      padding:"9px 12px",borderRadius:10,
                      background:r.total>0?`${col}10`:C.lightGray,
                      border:`1px solid ${r.total>0?col+"25":C.gray}`}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:2}}>{r.name}</div>
                        <div style={{fontSize:10,color:C.light}}>
                          👨 {r.Erkak}  👩 {r.Ayol}
                        </div>
                      </div>
                      <span style={{fontFamily:"'Syne',sans-serif",fontSize:22,
                        fontWeight:800,color:r.total>0?col:C.light}}>{r.total}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Radar */}
            <Card title="Radar: daraja × jins" icon={I.radar}
              sub="Ko'p o'lchovli qiyos" span={3} delay={180} accent={C.teal}>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={100}>
                  <PolarGrid stroke={C.gray}/>
                  <PolarAngleAxis dataKey="name" tick={{fill:C.mid,fontSize:11}}/>
                  <PolarRadiusAxis stroke={C.gray} tick={{fill:C.light,fontSize:9}}/>
                  <Radar name="Erkak" dataKey="Erkak" stroke={MAN}   fill={MAN}   fillOpacity={0.15}/>
                  <Radar name="Ayol"  dataKey="Ayol"  stroke={WOMAN} fill={WOMAN} fillOpacity={0.15}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Tooltip content={<CT/>}/>
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ════════════════ AGE ════════════════ */}
        {tab==="age"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            {/* Stacked bar */}
            <Card title="Yosh guruhlari — Erkak + Ayol" icon={I.bar}
              sub="Stacked bar chart" span={3} delay={0} accent={C.teal}>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={F.age} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="22%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Erkak" name="Erkak" fill={MAN}   radius={[0,0,0,0]} stackId="a"/>
                  <Bar dataKey="Ayol"  name="Ayol"  fill={WOMAN} radius={[4,4,0,0]} stackId="a"/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Grouped bar */}
            <Card title="Yosh × Jins qiyosi" icon={I.trend}
              sub="Yonma-yon grouped" span={2} delay={80} accent={C.bright}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={F.age} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                  <XAxis dataKey="name" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                  <Bar dataKey="Erkak" name="Erkak" fill={MAN}   radius={[4,4,0,0]}/>
                  <Bar dataKey="Ayol"  name="Ayol"  fill={WOMAN} radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Age total pie */}
            <Card title="Yosh guruhlari ulushi" icon={I.pie}
              sub="Jami nisbat" span={1} delay={100} accent={C.purple}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={F.age.map(d=>({name:d.name,value:d.total}))}
                    cx="50%" cy="44%" outerRadius={78} paddingAngle={2} dataKey="value">
                    {F.age.map((_,i)=><Cell key={i} fill={[C.bright,C.teal,C.purple,C.orange,C.green,C.red,C.pink,C.yellow][i%8]} stroke="none"/>)}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:9,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Detailed rows */}
            <Card title="Yosh guruhlari — batafsil" icon={I.layers}
              sub="Har bir guruh erkak + ayol" span={3} delay={160} accent={C.orange}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {F.age.map((d,i)=>{
                  const colorList=[C.bright,C.teal,C.purple,C.orange,C.green,C.red,C.pink,C.yellow];
                  const col=colorList[i%colorList.length];
                  const pct=maxAge>0?Math.round(d.total/maxAge*100):0;
                  return(
                    <div key={i} style={{padding:"10px 14px",borderRadius:12,
                      background:`${col}08`,border:`1px solid ${col}20`}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <span style={{fontSize:12,fontWeight:700,color:C.dark}}>{d.name}</span>
                        <span style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:col}}>
                          {d.total}
                        </span>
                      </div>
                      <div style={{display:"flex",gap:12,marginBottom:7,fontSize:11}}>
                        <span style={{color:MAN}}>👨 {d.Erkak}</span>
                        <span style={{color:WOMAN}}>👩 {d.Ayol}</span>
                      </div>
                      <div style={{height:5,borderRadius:3,background:C.lightGray}}>
                        <div style={{height:"100%",borderRadius:3,width:`${pct}%`,
                          background:`linear-gradient(90deg,${col},${col}60)`,transition:"width .8s ease"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════ EMPLOYMENT ════════════════ */}
        {tab==="employment"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>

            <Card title="Bandlik shakli bo'yicha" icon={I.bar}
              sub="Har bir bandlik turidan nechta xodim" span={2} delay={0} accent={C.orange}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={F.emp} layout="vertical"
                  margin={{top:4,right:50,left:8,bottom:4}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gray} horizontal={false}/>
                  <XAxis type="number" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" width={190}
                    tick={{fill:C.mid,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Bar dataKey="value" name="Xodimlar" radius={[0,6,6,0]}>
                    {F.emp.map((_,i)=><Cell key={i} fill={[C.bright,C.orange,C.teal,C.purple,C.green][i%5]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Bandlik ulushi" icon={I.pie}
              sub="Nisbiy taqsimot" span={1} delay={60} accent={C.yellow}>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={F.emp} cx="50%" cy="44%" outerRadius={82} paddingAngle={3} dataKey="value">
                    {F.emp.map((_,i)=><Cell key={i} fill={[C.bright,C.orange,C.teal,C.purple,C.green][i%5]} stroke="none"/>)}
                  </Pie>
                  <Tooltip content={<CT/>}/>
                  <Legend wrapperStyle={{fontSize:10,color:C.mid}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Bandlik progress" icon={I.layers}
              sub="Ulush ko'rinishida" span={3} delay={120} accent={C.bright}>
              <HBar data={F.emp} vk="value" nk="name"
                colors={[C.bright,C.orange,C.teal,C.purple,C.green]}/>
            </Card>

            {/* Bandlik detail cards */}
            {F.emp.map((e,i)=>{
              const colors=[C.bright,C.orange,C.teal,C.purple,C.green];
              const col=colors[i%colors.length];
              const total=F.emp.reduce((s,x)=>s+x.value,0);
              const pct=total>0?Math.round(e.value/total*100):0;
              return(
                <div key={i} style={{background:C.white,borderRadius:14,
                  border:`1.5px solid ${C.gray}`,padding:"14px 16px",
                  animation:`fadeUp .3s ${i*50}ms ease both`}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:10,justifyContent:"space-between"}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,fontWeight:600,color:C.mid,lineHeight:1.4,
                        marginBottom:4}}>{e.name}</div>
                      <div style={{fontSize:28,fontWeight:800,color:col,
                        fontFamily:"'Syne',sans-serif",lineHeight:1}}>{e.value}</div>
                      <div style={{fontSize:10,color:C.light,marginTop:3}}>{pct}% ulush</div>
                    </div>
                    <div style={{width:44,height:44,borderRadius:12,background:`${col}15`,
                      border:`1px solid ${col}25`,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.briefc} size={18} color={col}/>
                    </div>
                  </div>
                  <div style={{marginTop:10,height:4,borderRadius:2,background:C.gray}}>
                    <div style={{height:"100%",borderRadius:2,width:`${pct}%`,
                      background:`linear-gradient(90deg,${col},${col}55)`}}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
