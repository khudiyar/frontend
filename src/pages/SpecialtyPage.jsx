import { useState, useMemo } from "react";

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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.lightGray}}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico = ({d,size=16,color="currentColor",sw=2})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  plus:     "M12 5v14M5 12h14",
  chevD:    "M6 9l6 6 6-6",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  building: "M3 21h18M3 7l9-4 9 4M4 11h16v10H4zM9 21V11M15 21V11",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  hash:     "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  award:    "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  toggle:   "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18",
  map:      "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3zM13 13l6 6",
  school:   "M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5",
};

/* ── LOCALITY TYPE ── */
const LOC = {
  "11": {name:"Kunduzgi",  color:C.bright,  bg:C.lightBlue},
  "12": {name:"Kechki",    color:C.purple,  bg:C.purpleLight},
  "13": {name:"Sirtqi",    color:C.teal,    bg:C.tealLight},
  "14": {name:"Maxsus sirtqi", color:C.orange, bg:C.orangeLight},
};

/* ── EDUCATION TYPE ── */
const EDU = {
  "11": {name:"Bakalavr",  color:C.bright,  bg:C.lightBlue},
  "12": {name:"Magistr",   color:C.purple,  bg:C.purpleLight},
  "13": {name:"Doktorantura",color:C.teal,  bg:C.tealLight},
  "14": {name:"Ordinatura",color:C.orange,  bg:C.orangeLight},
};

/* ── STRUCTURE TYPE (department) ── */
const ST = {
  "11": {name:"Fakultet",  color:C.bright},
  "12": {name:"Kafedra",   color:C.purple},
};

/* ── FAKE DATA ── */
const now = Math.floor(Date.now()/1000);
const RAW = [
  /* ─ AXBOROT TEXNOLOGIYALARI FAKULTETI ─ */
  {id:1, name:"Axborot texnologiyalari", code:"5330100",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330100",name:"Axborot texnologiyalari"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000000,updated_at:now},

  {id:2, name:"Dasturiy injiniring", code:"5330200",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330200",name:"Dasturiy injiniring"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000000,updated_at:now},

  {id:3, name:"Kompyuter injiniringi", code:"5330300",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330300",name:"Kompyuter injiniringi"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000100,updated_at:now},

  {id:4, name:"Sun'iy intellekt va ma'lumotlar tahlili", code:"5330400",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330400",name:"Sun'iy intellekt va ma'lumotlar tahlili"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1690000000,updated_at:now},

  {id:5, name:"Axborot xavfsizligi", code:"5330500",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330500",name:"Axborot xavfsizligi"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1685000000,updated_at:now},

  /* ─ ATF MAGISTRATURA ─ */
  {id:6, name:"Axborot texnologiyalari (magistr)", code:"5A330100",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"12",name:"Magistr"},
    bachelorSpecialty:null,
    masterSpecialty:{code:"5A330100",name:"Axborot texnologiyalari (magistr)"},
    doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1682000000,updated_at:now},

  {id:7, name:"Dasturiy injiniring (magistr)", code:"5A330200",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"12",name:"Magistr"},
    bachelorSpecialty:null,
    masterSpecialty:{code:"5A330200",name:"Dasturiy injiniring (magistr)"},
    doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1682000000,updated_at:now},

  /* ─ TELEKOMMUNIKATSIYALAR FAKULTETI ─ */
  {id:8, name:"Telekommunikatsiya texnologiyalari", code:"5310100",active:true,
    department:{id:2,name:"Telekommunikatsiyalar fakulteti",code:"TKF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5310100",name:"Telekommunikatsiya texnologiyalari"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000200,updated_at:now},

  {id:9, name:"Mobil tizimlar va tarmoqlar", code:"5310200",active:true,
    department:{id:2,name:"Telekommunikatsiyalar fakulteti",code:"TKF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5310200",name:"Mobil tizimlar va tarmoqlar"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000300,updated_at:now},

  {id:10, name:"Raqamli elektronika va mikroprotsessor tizimlari", code:"5310300",active:true,
    department:{id:2,name:"Telekommunikatsiyalar fakulteti",code:"TKF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5310300",name:"Raqamli elektronika va mikroprotsessor tizimlari"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000400,updated_at:now},

  {id:11, name:"Axborot-kommunikatsiya tarmoqlari", code:"5310400",active:true,
    department:{id:2,name:"Telekommunikatsiyalar fakulteti",code:"TKF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5310400",name:"Axborot-kommunikatsiya tarmoqlari"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000500,updated_at:now},

  /* ─ IQTISODIYOT FAKULTETI ─ */
  {id:12, name:"Iqtisodiyot (tarmoqlar va sohalar bo'yicha)", code:"5230100",active:true,
    department:{id:3,name:"Iqtisodiyot fakulteti",code:"IQF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5230100",name:"Iqtisodiyot"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680100000,updated_at:now},

  {id:13, name:"Menejment", code:"5230200",active:true,
    department:{id:3,name:"Iqtisodiyot fakulteti",code:"IQF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5230200",name:"Menejment"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680100100,updated_at:now},

  {id:14, name:"Buxgalteriya hisobi va audit", code:"5230300",active:true,
    department:{id:3,name:"Iqtisodiyot fakulteti",code:"IQF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5230300",name:"Buxgalteriya hisobi va audit"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680100200,updated_at:now},

  /* ─ SIRTQI (KECHKI) ─ */
  {id:15, name:"Axborot texnologiyalari (sirtqi)", code:"5330100S",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"13",name:"Sirtqi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330100S",name:"Axborot texnologiyalari (sirtqi)"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000600,updated_at:now},

  {id:16, name:"Kompyuter injiniringi (sirtqi)", code:"5330300S",active:false,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"13",name:"Sirtqi"},educationType:{code:"11",name:"Bakalavr"},
    bachelorSpecialty:{code:"5330300S",name:"Kompyuter injiniringi (sirtqi)"},
    masterSpecialty:null,doctorateSpecialty:null,ordinatureSpecialty:null,
    created_at:1680000700,updated_at:now},

  /* ─ DOKTORANTURA ─ */
  {id:17, name:"Axborot texnologiyalari (doktorantura)", code:"DSc.03/30.12.2019.T.01.02",active:true,
    department:{id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF",parent:null,active:true,
      structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Kunduzgi"}},
    localityType:{code:"11",name:"Kunduzgi"},educationType:{code:"13",name:"Doktorantura"},
    bachelorSpecialty:null,masterSpecialty:null,
    doctorateSpecialty:{code:"DSc.03/30.12.2019.T.01.02",name:"Axborot texnologiyalari (doktorantura)"},
    ordinatureSpecialty:null,
    created_at:1688000000,updated_at:now},
];

const TOTAL = 89; // totalCount from API

/* ── HELPERS ── */
const fmtDate = ts => {
  if(!ts) return "—";
  const d = new Date(ts*1000);
  return `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}.${d.getFullYear()}`;
};

const Sel = ({value,onChange,children,style={}})=>(
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 28px 8px 12px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:13,color:value?C.dark:C.light,
        background:C.white,cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={13} color={C.light}/>
    </div>
  </div>
);

/* ── SPECIALTY LEVEL BADGE ── */
const LevelBadge = ({item})=>{
  if(item.doctorateSpecialty?.code)  return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.tealLight,color:C.teal}}>DSc</span>;
  if(item.masterSpecialty?.code)     return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.purpleLight,color:C.purple}}>Magistr</span>;
  if(item.bachelorSpecialty?.code)   return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.lightBlue,color:C.bright}}>Bakalavr</span>;
  if(item.ordinatureSpecialty?.code) return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.orangeLight,color:C.orange}}>Ordinatura</span>;
  return null;
};

/* ── DEPT COLOR ── */
const DEPT_COLORS = [C.bright,C.purple,C.teal,C.orange,C.red,C.pink];
const deptColor = id => DEPT_COLORS[id % DEPT_COLORS.length];

/* ─────────────────── MAIN ─────────────────── */
export default function SpecialtyPage() {
  const [search,      setSearch]      = useState("");
  const [filterDept,  setFilterDept]  = useState("");
  const [filterEduT,  setFilterEduT]  = useState("");
  const [filterLoc,   setFilterLoc]   = useState("");
  const [filterActive,setFilterActive]= useState("");
  const [viewMode,    setViewMode]    = useState("card"); // card | table | dept
  const [detail,      setDetail]      = useState(null);
  const [toast,       setToast]       = useState(null);
  const [page,        setPage]        = useState(1);
  const PAGE = 12;

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* unique depts */
  const depts = useMemo(()=>{
    const m={};
    RAW.forEach(r=>{ if(!m[r.department.id]) m[r.department.id]=r.department; });
    return Object.values(m);
  },[]);

  /* filter */
  const filtered = useMemo(()=>RAW.filter(r=>{
    if(search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.code.toLowerCase().includes(search.toLowerCase())) return false;
    if(filterDept  && r.department.id !== Number(filterDept)) return false;
    if(filterEduT  && r.educationType.code !== filterEduT)    return false;
    if(filterLoc   && r.localityType.code  !== filterLoc)     return false;
    if(filterActive==="1" && !r.active)  return false;
    if(filterActive==="0" && r.active)   return false;
    return true;
  }),[search,filterDept,filterEduT,filterLoc,filterActive]);

  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);

  /* grouped by dept for dept view */
  const byDept = useMemo(()=>{
    const m={};
    filtered.forEach(r=>{
      const k=r.department.id;
      if(!m[k]) m[k]={dept:r.department, items:[]};
      m[k].items.push(r);
    });
    return Object.values(m);
  },[filtered]);

  const clearFilters = ()=>{ setSearch(""); setFilterDept(""); setFilterEduT(""); setFilterLoc(""); setFilterActive(""); setPage(1); };
  const hasFilter = search||filterDept||filterEduT||filterLoc||filterActive;

  /* pagination numbers */
  const pageNums = ()=>{
    const pc=pageCount, p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  /* ── DETAIL MODAL ── */
  const DetailModal = ()=>{
    const d = detail;
    if(!d) return null;
    const dc  = deptColor(d.department.id);
    const loc = LOC[d.localityType?.code] || {name:d.localityType?.name,color:C.mid,bg:C.lightGray};
    const edu = EDU[d.educationType?.code]|| {name:d.educationType?.name,color:C.mid,bg:C.lightGray};

    const activeSpec = d.bachelorSpecialty || d.masterSpecialty || d.doctorateSpecialty || d.ordinatureSpecialty;

    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetail(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.44)",
          backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:22,width:"min(500px,96vw)",
          boxShadow:"0 28px 70px rgba(13,26,99,0.22)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${dc})`,padding:"22px 24px"}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                  <LevelBadge item={d}/>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:"rgba(255,255,255,0.18)",color:C.white}}>
                    {loc.name}
                  </span>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:d.active?"rgba(22,163,74,0.3)":"rgba(255,255,255,0.1)",
                    color:d.active?"#86EFAC":C.light}}>
                    {d.active?"Faol":"Nofaol"}
                  </span>
                </div>
                <div style={{fontSize:17,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                  lineHeight:1.3,marginBottom:5}}>{d.name}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontFamily:"monospace"}}>{d.code}</div>
              </div>
              <button onClick={()=>setDetail(null)}
                style={{width:30,height:30,flexShrink:0,borderRadius:8,border:"none",cursor:"pointer",
                  background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.x} size={14} color={C.white}/>
              </button>
            </div>
          </div>

          {/* body */}
          <div style={{padding:"18px 24px"}}>
            {/* department block */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",
              borderRadius:12,background:`${dc}0D`,border:`1.5px solid ${dc}22`,marginBottom:14}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${dc}20`,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.building} size={16} color={dc}/>
              </div>
              <div>
                <div style={{fontSize:11,color:C.light,fontWeight:600}}>Fakultet / Kafedra</div>
                <div style={{fontSize:13,fontWeight:800,color:C.dark}}>{d.department.name}</div>
                <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{d.department.code}</div>
              </div>
            </div>

            {/* fields */}
            {[
              ["Specialty ID",   `#${d.id}`],
              ["Ta'lim turi",    d.educationType?.name||"—"],
              ["O'qish shakli",  d.localityType?.name||"—"],
              ["Tuzilma turi",   d.department.structureType?.name||"—"],
              ["Yaratilgan",     fmtDate(d.created_at)],
              ["Yangilangan",    fmtDate(d.updated_at)],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"7px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:700}}>{v}</span>
              </div>
            ))}

            {/* specialty codes */}
            {activeSpec&&(
              <div style={{marginTop:12,padding:"10px 12px",borderRadius:10,
                background:C.lightGray,border:`1px solid ${C.gray}`}}>
                <div style={{fontSize:10,color:C.light,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.8px"}}>
                  Mutaxassislik kodi
                </div>
                <div style={{fontSize:13,fontWeight:800,color:C.dark,fontFamily:"monospace"}}>
                  {activeSpec.code}
                </div>
                <div style={{fontSize:11,color:C.mid,marginTop:2}}>{activeSpec.name}</div>
              </div>
            )}
          </div>

          <div style={{padding:"12px 24px 20px",display:"flex",gap:8}}>
            <button onClick={()=>{showToast("Tahrirlash ochildi");setDetail(null);}}
              style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
              Tahrirlash
            </button>
            <button onClick={()=>{showToast("O'chirildi");setDetail(null);}}
              style={{padding:"10px 14px",borderRadius:10,border:`1px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.redLight,color:C.red}}>
              <Ico d={I.trash} size={14} color={C.red}/>
            </button>
            <button onClick={()=>setDetail(null)}
              style={{padding:"10px 16px",borderRadius:10,border:`1px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
              Yopish
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ─── CARD VIEW ─── */
  const CardView = ()=>(
    <>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {paginated.map((item,idx)=>{
          const dc  = deptColor(item.department.id);
          const loc = LOC[item.localityType?.code];
          const edu = EDU[item.educationType?.code];
          return (
            <div key={item.id}
              onClick={()=>setDetail(item)}
              style={{background:C.white,borderRadius:16,overflow:"hidden",cursor:"pointer",
                border:`1.5px solid ${C.gray}`,transition:"all 0.18s",
                opacity:item.active?1:0.65,
                animation:`fadeUp 0.28s ${idx*35}ms ease both`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=dc;e.currentTarget.style.boxShadow=`0 10px 28px ${dc}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="";}}>

              {/* top stripe + dept label */}
              <div style={{height:3,background:`linear-gradient(90deg,${dc},${dc}60)`}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"10px 14px 0"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                  background:`${dc}15`,color:dc,overflow:"hidden",textOverflow:"ellipsis",
                  whiteSpace:"nowrap",maxWidth:"60%"}}>
                  {item.department.code}
                </span>
                <div style={{display:"flex",gap:5}}>
                  <LevelBadge item={item}/>
                  {!item.active&&<span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:20,background:C.redLight,color:C.red}}>Nofaol</span>}
                </div>
              </div>

              <div style={{padding:"10px 14px 14px"}}>
                <div style={{fontSize:14,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",
                  lineHeight:1.35,marginBottom:5,
                  display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                  {item.name}
                </div>
                <div style={{fontSize:11,color:C.light,fontFamily:"monospace",marginBottom:10}}>{item.code}</div>

                {/* meta row */}
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {loc&&<span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:20,
                    background:loc.bg,color:loc.color}}>{loc.name}</span>}
                  {edu&&<span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:20,
                    background:edu.bg,color:edu.color}}>{edu.name}</span>}
                </div>

                {/* dept footer */}
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:10,
                  paddingTop:10,borderTop:`1px solid ${C.lightGray}`}}>
                  <div style={{width:20,height:20,borderRadius:6,background:`${dc}15`,flexShrink:0,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={I.building} size={10} color={dc}/>
                  </div>
                  <span style={{fontSize:11,color:C.mid,fontWeight:600,overflow:"hidden",
                    textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.department.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {pageCount>1&&<Pagination/>}
    </>
  );

  /* ─── TABLE VIEW ─── */
  const TableView = ()=>(
    <>
      <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"48px 1fr 130px 120px 110px 80px 80px",
          padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
          {["ID","Nomi","Kod","Fakultet","Ta'lim","Shakli","Holat"].map((h,i)=>(
            <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
              textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
          ))}
        </div>
        {paginated.map((item,idx)=>{
          const dc  = deptColor(item.department.id);
          const loc = LOC[item.localityType?.code];
          const edu = EDU[item.educationType?.code];
          return (
            <div key={item.id}
              onClick={()=>setDetail(item)}
              style={{display:"grid",gridTemplateColumns:"48px 1fr 130px 120px 110px 80px 80px",
                padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                background:C.white,cursor:"pointer",transition:"background 0.15s",
                opacity:item.active?1:0.65,animation:`fadeUp 0.22s ${idx*30}ms ease both`}}
              onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
              onMouseLeave={e=>e.currentTarget.style.background=C.white}>

              <div style={{display:"flex",alignItems:"center"}}>
                <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{item.id}</span>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.2,
                    overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical"}}>{item.name}</div>
                  <div style={{marginTop:2}}><LevelBadge item={item}/></div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <span style={{fontSize:10,color:C.mid,fontFamily:"monospace",fontWeight:600}}>{item.code}</span>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                  background:`${dc}15`,color:dc}}>{item.department.code}</span>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                {edu&&<span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                  background:edu.bg,color:edu.color}}>{edu.name}</span>}
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                {loc&&<span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                  background:loc.bg,color:loc.color}}>{loc.name}</span>}
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                  background:item.active?C.greenLight:C.redLight,
                  color:item.active?C.green:C.red}}>
                  {item.active?"Faol":"Nofaol"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {pageCount>1&&<Pagination/>}
    </>
  );

  /* ─── DEPT VIEW ─── */
  const DeptView = ()=>(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {byDept.map((group,gi)=>{
        const dc = deptColor(group.dept.id);
        return (
          <div key={group.dept.id} style={{background:C.white,borderRadius:18,
            border:`1.5px solid ${C.gray}`,overflow:"hidden",
            animation:`fadeUp 0.3s ${gi*60}ms ease both`}}>
            {/* dept header */}
            <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",
              background:`linear-gradient(135deg,${dc}0A,${dc}05)`,
              borderBottom:`1px solid ${dc}20`}}>
              <div style={{width:46,height:46,borderRadius:13,background:`${dc}20`,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.building} size={20} color={dc}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>
                  {group.dept.name}
                </div>
                <div style={{fontSize:11,color:C.light,marginTop:2}}>
                  Kod: <b style={{color:dc,fontFamily:"monospace"}}>{group.dept.code}</b> •{" "}
                  {group.dept.structureType?.name}
                </div>
              </div>
              <div style={{width:44,height:44,borderRadius:12,background:`${dc}15`,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:18,fontWeight:800,color:dc,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {group.items.length}
                </span>
                <span style={{fontSize:8,color:dc,fontWeight:700,textTransform:"uppercase"}}>ta</span>
              </div>
            </div>

            {/* specialties grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",
              gap:0}}>
              {group.items.map((item,idx)=>{
                const loc = LOC[item.localityType?.code];
                const edu = EDU[item.educationType?.code];
                return (
                  <div key={item.id}
                    onClick={()=>setDetail(item)}
                    style={{padding:"12px 18px",cursor:"pointer",transition:"background 0.15s",
                      borderRight:(idx%2===0)?`1px solid ${C.lightGray}`:"none",
                      borderBottom:`1px solid ${C.lightGray}`,
                      opacity:item.active?1:0.6,background:C.white}}
                    onMouseEnter={e=>e.currentTarget.style.background=`${dc}06`}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:5}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.dark,lineHeight:1.3,flex:1,
                        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                        {item.name}
                      </div>
                      <LevelBadge item={item}/>
                    </div>
                    <div style={{fontSize:10,color:C.light,fontFamily:"monospace",marginBottom:6}}>{item.code}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {loc&&<span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20,background:loc.bg,color:loc.color}}>{loc.name}</span>}
                      {edu&&<span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20,background:edu.bg,color:edu.color}}>{edu.name}</span>}
                      {!item.active&&<span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20,background:C.redLight,color:C.red}}>Nofaol</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ─── PAGINATION ─── */
  const Pagination = ()=>(
    <div style={{marginTop:14,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div style={{fontSize:12,color:C.light}}>
        <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
        <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>
        {" "}/ <b style={{color:C.dark}}>{filtered.length}</b>
      </div>
      <div style={{display:"flex",gap:4}}>
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
          style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,cursor:page===1?"not-allowed":"pointer",
            background:C.white,display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
          <Ico d={I.chevL} size={14} color={C.mid}/>
        </button>
        {pageNums().map((n,i)=>(
          <button key={i} onClick={()=>n!=="..."&&setPage(n)}
            style={{width:32,height:32,borderRadius:8,fontFamily:"inherit",fontSize:13,fontWeight:600,
              border:`1px solid ${n===page?C.bright:C.gray}`,cursor:n==="..."?"default":"pointer",
              background:n===page?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
              color:n===page?C.white:n==="..."?C.light:C.mid}}>
            {n}
          </button>
        ))}
        <button disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}
          style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,cursor:page===pageCount?"not-allowed":"pointer",
            background:C.white,display:"flex",alignItems:"center",justifyContent:"center",opacity:page===pageCount?0.4:1}}>
          <Ico d={I.chevR} size={14} color={C.mid}/>
        </button>
      </div>
    </div>
  );

  /* ── STATS ── */
  const bakCount = RAW.filter(r=>r.bachelorSpecialty?.code).length;
  const masCount = RAW.filter(r=>r.masterSpecialty?.code).length;
  const docCount = RAW.filter(r=>r.doctorateSpecialty?.code).length;
  const actCount = RAW.filter(r=>r.active).length;

  return (
    <>
      <style>{css}</style>

      {toast&&(
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background:C.white,borderLeft:`4px solid ${C.green}`,borderRadius:10,
          padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark,
          animation:"fadeUp 0.3s ease"}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast}
        </div>
      )}
      <DetailModal/>

      <div style={{padding:"24px 28px",maxWidth:1300,margin:"0 auto"}}>

        {/* HEADER */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Mutaxassisliklar
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{RAW.length}</b> •{" "}
              Jami: <b style={{color:C.dark}}>{TOTAL}</b> ta yozuv
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"card",  i:I.grid,     title:"Karta"},
                {m:"table", i:I.list,     title:"Jadval"},
                {m:"dept",  i:I.building, title:"Fakultet bo'yicha"},
              ].map(({m,i,title})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}} title={title}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi mutaxassislik qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Qo'shish
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Bakalavr",    v:bakCount, c:C.bright, bg:C.lightBlue,   i:I.school},
            {l:"Magistr",     v:masCount, c:C.purple, bg:C.purpleLight, i:I.award},
            {l:"Doktorantura",v:docCount, c:C.teal,   bg:C.tealLight,   i:I.layers},
            {l:"Faol",        v:actCount, c:C.green,  bg:C.greenLight,  i:I.toggle},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.i} size={18} color={s.c}/>
              </div>
              <div>
                <div style={{fontSize:24,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,
          display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:220,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Nom yoki kod bo'yicha qidirish..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterDept} onChange={e=>{setFilterDept(e.target.value);setPage(1);}} style={{minWidth:220}}>
            <option value="">Barcha fakultetlar</option>
            {depts.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
          </Sel>
          <Sel value={filterEduT} onChange={e=>{setFilterEduT(e.target.value);setPage(1);}} style={{minWidth:140}}>
            <option value="">Ta'lim turi</option>
            {Object.entries(EDU).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </Sel>
          <Sel value={filterLoc} onChange={e=>{setFilterLoc(e.target.value);setPage(1);}} style={{minWidth:130}}>
            <option value="">O'qish shakli</option>
            {Object.entries(LOC).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </Sel>
          <Sel value={filterActive} onChange={e=>{setFilterActive(e.target.value);setPage(1);}} style={{minWidth:110}}>
            <option value="">Holat</option>
            <option value="1">Faol</option>
            <option value="0">Nofaol</option>
          </Sel>
          {hasFilter&&(
            <button onClick={clearFilters}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* results info */}
        {hasFilter&&(
          <div style={{fontSize:12,color:C.light,marginBottom:12}}>
            Filtr natijasi: <b style={{color:C.dark}}>{filtered.length}</b> ta mutaxassislik
          </div>
        )}

        {filtered.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.school} size={48} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Natija topilmadi</div>
          </div>
        )}

        {/* VIEWS */}
        {viewMode==="card"  && filtered.length>0 && <CardView/>}
        {viewMode==="table" && filtered.length>0 && <TableView/>}
        {viewMode==="dept"  && filtered.length>0 && <DeptView/>}
      </div>
    </>
  );
}
