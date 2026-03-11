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
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
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
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:    "M6 9l6 6 6-6",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  plus:     "M12 5v14M5 12h14",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  building: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  globe:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  hash:     "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
};

/* ── LANG CONFIG ── */
const LANG = {
  "11":{ label:"O'zbek",      flag:"🇺🇿", color:C.green,  bg:C.greenLight  },
  "12":{ label:"Rus",         flag:"🇷🇺", color:C.blue,   bg:C.lightBlue   },
  "13":{ label:"Qoraqalpoq",  flag:"🌐", color:C.purple, bg:C.purpleLight },
};
const getLang = c => LANG[c] || { label:"Boshqa", flag:"🌐", color:C.mid, bg:C.lightGray };

/* ── DEPT COLORS ── */
const DEPT_COLORS = [C.bright,C.purple,C.green,C.teal,C.orange,C.red,C.pink];
const DEPT_BG     = [C.lightBlue,C.purpleLight,C.greenLight,C.tealLight,C.orangeLight,C.redLight,C.pinkLight];
const deptColor   = id => DEPT_COLORS[id % DEPT_COLORS.length];
const deptBg      = id => DEPT_BG[id % DEPT_BG.length];

/* ── DETECT EDUCATION LEVEL from name ── */
const getLevel = name => {
  const n = name.toUpperCase();
  if(n.includes("MAGISTR") || n.includes("MAS")) return {label:"Magistr", color:C.purple, bg:C.purpleLight};
  if(n.includes("KECHKI"))                        return {label:"Kechki",  color:C.orange, bg:C.orangeLight};
  return                                                  {label:"Kunduzgi",color:C.bright, bg:C.lightBlue};
};

/* ── REAL DATA (page 1, 40 items, totalCount:432) ── */
const RAW = [
  {id:448,name:"M-KI-B-25",    department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:23, code:"70720801",name:"Foydali qazilma konlarini qazish"},               educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:186,active:true},
  {id:447,name:"M-KI-A-25",    department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:23, code:"70720801",name:"Foydali qazilma konlarini qazish"},               educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:186,active:true},
  {id:446,name:"BH-UZB/1-25",  department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:94, code:"60410200",name:"Buxgalteriya hisobi"},                        educationLang:{code:"11",name:"O'zbek"},   _curriculum:164,active:true},
  {id:445,name:"MMT-UZB/1-25", department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:95, code:"60410500",name:"Moliya va moliyaviy texnologiyalar"},          educationLang:{code:"11",name:"O'zbek"},   _curriculum:169,active:true},
  {id:443,name:"113/1-25 Mn uzb",department:{id:1,name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:96, code:"60410800",name:"Menejment"},                                  educationLang:{code:"11",name:"O'zbek"},   _curriculum:167,active:true},
  {id:442,name:"IQT-UZB/1-25", department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:93, code:"60410100",name:"Iqtisodiyot"},                                 educationLang:{code:"11",name:"O'zbek"},   _curriculum:165,active:true},
  {id:441,name:"MET-QQ-25",    department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:17, code:"60711200",name:"Metallurgiya muhandisligi"},                      educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:184,active:true},
  {id:438,name:"KI-KECHKI-RUS-25",department:{id:3,name:"Konchilik ishi va energetika",           code:"540-103"},specialty:{id:11, code:"60720800",name:"Konchilik ishi"},                                 educationLang:{code:"12",name:"Rus"},      _curriculum:183,active:true},
  {id:437,name:"KI-KECHKI-UZB-25",department:{id:3,name:"Konchilik ishi va energetika",           code:"540-103"},specialty:{id:11, code:"60720800",name:"Konchilik ishi"},                                 educationLang:{code:"11",name:"O'zbek"},   _curriculum:183,active:true},
  {id:436,name:"KI-KECHKI-QQ-25", department:{id:3,name:"Konchilik ishi va energetika",           code:"540-103"},specialty:{id:11, code:"60720800",name:"Konchilik ishi"},                                 educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:183,active:true},
  {id:435,name:"EM-KECHKI-RUS-25",department:{id:3,name:"Konchilik ishi va energetika",           code:"540-103"},specialty:{id:18, code:"60710400",name:"Energetika muhandisligi"},                        educationLang:{code:"12",name:"Rus"},      _curriculum:175,active:true},
  {id:434,name:"YHT-UZB-25",   department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:81, code:"61040200",name:"Yo'l harakatini tashkil etish"},                 educationLang:{code:"11",name:"O'zbek"},   _curriculum:182,active:true},
  {id:433,name:"YHT-QQ-25",    department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:81, code:"61040200",name:"Yo'l harakatini tashkil etish"},                 educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:182,active:true},
  {id:432,name:"NNGI-UZB-25",  department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:80, code:"60720600",name:"Neft va neft-gazni qayta ishlash texnologiyasi"},educationLang:{code:"11",name:"O'zbek"},   _curriculum:181,active:true},
  {id:431,name:"NNGI-QQ-25",   department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:80, code:"60720600",name:"Neft va neft-gazni qayta ishlash texnologiyasi"},educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:181,active:true},
  {id:430,name:"KEM-UZB-25",   department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:15, code:"60721200",name:"Konchilik elektr mexanikasi"},                   educationLang:{code:"11",name:"O'zbek"},   _curriculum:180,active:true},
  {id:429,name:"ATMM-UZB-25",  department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:89, code:"60711800",name:"Atrof-muhit muhandisligi"},                      educationLang:{code:"11",name:"O'zbek"},   _curriculum:179,active:true},
  {id:428,name:"ATMM-QQ-25",   department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:89, code:"60711800",name:"Atrof-muhit muhandisligi"},                      educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:179,active:true},
  {id:427,name:"M-TJ-UZB-25",  department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:21, code:"70710901",name:"Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish"},educationLang:{code:"11",name:"O'zbek"},_curriculum:163,active:true},
  {id:426,name:"M-TJ-QQ-25",   department:{id:3, name:"Konchilik ishi va energetika",              code:"540-103"},specialty:{id:21, code:"70710901",name:"Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish"},educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:163,active:true},
  {id:425,name:"M-KT-UZB-25",  department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:86, code:"70710101",name:"Kimyoviy texnologiya"},                          educationLang:{code:"11",name:"O'zbek"},   _curriculum:177,active:true},
  {id:424,name:"M-KT-QQ-25",   department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:86, code:"70710101",name:"Kimyoviy texnologiya"},                          educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:177,active:true},
  {id:423,name:"MT-MAGISTR-UZB-25",department:{id:4,name:"Muhandislik texnologiyalari",            code:"540-104"},specialty:{id:78, code:"70712301",name:"Mashinasozlik texnologiyasi"},                   educationLang:{code:"11",name:"O'zbek"},   _curriculum:176,active:true},
  {id:422,name:"MT-MAGISTR-QQ-25", department:{id:4,name:"Muhandislik texnologiyalari",            code:"540-104"},specialty:{id:78, code:"70712301",name:"Mashinasozlik texnologiyasi"},                   educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:176,active:true},
  {id:421,name:"EM-KECHKI-UZB-25", department:{id:3,name:"Konchilik ishi va energetika",           code:"540-103"},specialty:{id:18, code:"60710400",name:"Energetika muhandisligi"},                       educationLang:{code:"11",name:"O'zbek"},   _curriculum:175,active:true},
  {id:420,name:"EM-KECHKI-QQ-25",  department:{id:3,name:"Konchilik ishi va energetika",           code:"540-103"},specialty:{id:18, code:"60710400",name:"Energetika muhandisligi"},                       educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:175,active:true},
  {id:419,name:"MTX-KECHKI-UZB-25",department:{id:4,name:"Muhandislik texnologiyalari",            code:"540-104"},specialty:{id:20, code:"61020200",name:"Mehnat muhofazasi va texnika xavfsizligi"},      educationLang:{code:"11",name:"O'zbek"},   _curriculum:174,active:true},
  {id:418,name:"MTX-KECHKI-QQ-25", department:{id:4,name:"Muhandislik texnologiyalari",            code:"540-104"},specialty:{id:20, code:"61020200",name:"Mehnat muhofazasi va texnika xavfsizligi"},      educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:174,active:true},
  {id:417,name:"MN-MAS-RUS-25",department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:96, code:"60410800",name:"Menejment"},                                  educationLang:{code:"12",name:"Rus"},      _curriculum:173,active:true},
  {id:416,name:"MN-MAS-UZB-25",department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:96, code:"60410800",name:"Menejment"},                                  educationLang:{code:"11",name:"O'zbek"},   _curriculum:173,active:true},
  {id:415,name:"MN-MAS-QQ-25", department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:96, code:"60410800",name:"Menejment"},                                  educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:173,active:true},
  {id:414,name:"IQT-MAS-RUS-25",department:{id:1,name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:93, code:"60410100",name:"Iqtisodiyot"},                                educationLang:{code:"12",name:"Rus"},      _curriculum:172,active:true},
  {id:413,name:"IQT-MAS-UZB-25",department:{id:1,name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:93, code:"60410100",name:"Iqtisodiyot"},                                educationLang:{code:"11",name:"O'zbek"},   _curriculum:172,active:true},
  {id:412,name:"IQT-MAS-QQ-25", department:{id:1,name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:93, code:"60410100",name:"Iqtisodiyot"},                                educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:172,active:true},
  {id:411,name:"TVM-UZB-25",   department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:77, code:"60711400",name:"Transport vositalari muhandisligi"},             educationLang:{code:"11",name:"O'zbek"},   _curriculum:171,active:true},
  {id:410,name:"TVM-QQ-25",    department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:77, code:"60711400",name:"Transport vositalari muhandisligi"},             educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:171,active:true},
  {id:409,name:"TMJ-UZB-25",   department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:76, code:"60720400",name:"Texnologik mashinalar va jihozlar"},             educationLang:{code:"11",name:"O'zbek"},   _curriculum:170,active:true},
  {id:408,name:"TMJ-QQ-25",    department:{id:4, name:"Muhandislik texnologiyalari",               code:"540-104"},specialty:{id:76, code:"60720400",name:"Texnologik mashinalar va jihozlar"},             educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:170,active:true},
  {id:407,name:"MMT-QQ-25",    department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:95, code:"60410500",name:"Moliya va moliyaviy texnologiyalar"},         educationLang:{code:"13",name:"Qoraqalpoq"},_curriculum:169,active:true},
  {id:406,name:"MMT-UZB-25",   department:{id:1, name:"Iqtisodiyot va telekommunikatsiya injiniringi",code:"540-102"},specialty:{id:95, code:"60410500",name:"Moliya va moliyaviy texnologiyalar"},         educationLang:{code:"11",name:"O'zbek"},   _curriculum:169,active:true},
];
const TOTAL_COUNT = 432;

/* ── SELECT ── */
const Sel = ({value,onChange,children,style})=>(
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

/* ─────────────────────── MAIN ─────────────────────── */
export default function GroupListPage() {
  const [search,      setSearch]      = useState("");
  const [filterDept,  setFilterDept]  = useState("");
  const [filterLang,  setFilterLang]  = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [viewMode,    setViewMode]    = useState("faculty"); // "faculty"|"card"|"table"
  const [expanded,    setExpanded]    = useState({});
  const [detailItem,  setDetailItem]  = useState(null);
  const [toast,       setToast]       = useState(null);
  const [page,        setPage]        = useState(1);
  const PAGE = viewMode==="card"?12:15;

  const showToast = msg=>{ setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* unique depts */
  const depts = useMemo(()=>{
    const m={};
    RAW.forEach(r=>{ if(!m[r.department.id]) m[r.department.id]=r.department.name; });
    return Object.entries(m).map(([id,name])=>({id:Number(id),name}));
  },[]);

  /* filter */
  const filtered = useMemo(()=>RAW.filter(r=>{
    const ms = !search || r.name.toLowerCase().includes(search.toLowerCase())
                       || r.specialty.name.toLowerCase().includes(search.toLowerCase())
                       || r.specialty.code.includes(search);
    const md = !filterDept  || r.department.id===Number(filterDept);
    const ml = !filterLang  || r.educationLang.code===filterLang;
    const mv = !filterLevel || getLevel(r.name).label===filterLevel;
    return ms&&md&&ml&&mv;
  }),[search,filterDept,filterLang,filterLevel]);

  /* group by faculty */
  const byFaculty = useMemo(()=>{
    const m={};
    filtered.forEach(r=>{
      const k=r.department.id;
      if(!m[k]) m[k]={dept:r.department, items:[]};
      m[k].items.push(r);
    });
    return Object.values(m);
  },[filtered]);

  /* group by specialty within faculty */
  const groupBySpecialty = items => {
    const m={};
    items.forEach(r=>{
      const k=r.specialty.id;
      if(!m[k]) m[k]={spec:r.specialty, groups:[]};
      m[k].groups.push(r);
    });
    return Object.values(m);
  };

  /* table */
  const paginated  = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount  = Math.ceil(filtered.length/PAGE);
  const pageNums   = ()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  const isExp = id => expanded[id]!==false;
  const toggleExp = id => setExpanded(p=>({...p,[id]:!p[id]===true?false:true,...(p[id]===undefined?{[id]:false}:{})}));
  const isExpanded = id => expanded[id]===undefined ? true : expanded[id];

  /* stats */
  const stats = useMemo(()=>({
    total:   RAW.length,
    uzb:     RAW.filter(r=>r.educationLang.code==="11").length,
    rus:     RAW.filter(r=>r.educationLang.code==="12").length,
    qq:      RAW.filter(r=>r.educationLang.code==="13").length,
    magistr: RAW.filter(r=>getLevel(r.name).label==="Magistr").length,
    kechki:  RAW.filter(r=>getLevel(r.name).label==="Kechki").length,
  }),[]);

  /* ── DETAIL MODAL ── */
  const DetailModal = ()=>{
    const g = detailItem;
    if(!g) return null;
    const lang  = getLang(g.educationLang.code);
    const level = getLevel(g.name);
    const dc    = deptColor(g.department.id);
    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:20,width:"min(480px,95vw)",
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${dc})`,padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:20,
                    background:"rgba(255,255,255,0.2)",color:C.white}}>{lang.flag} {lang.label}</span>
                  <span style={{fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:20,
                    background:`${level.color}40`,color:C.white}}>{level.label}</span>
                </div>
                <div style={{fontSize:22,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                  letterSpacing:"0.5px",marginBottom:4}}>{g.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.65)"}}>{g.department.name}</div>
              </div>
              <button onClick={()=>setDetailItem(null)}
                style={{width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",
                  background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ico d={I.x} size={14} color={C.white}/>
              </button>
            </div>
          </div>

          {/* mini stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
            borderBottom:`1px solid ${C.lightGray}`}}>
            {[
              {l:"Guruh ID",   v:`#${g.id}`,       c:C.bright},
              {l:"Curriculum", v:`#${g._curriculum}`,c:C.purple},
              {l:"Holat",      v:g.active?"Faol":"Nofaol",c:g.active?C.green:C.red},
            ].map((s,i)=>(
              <div key={i} style={{padding:"12px",textAlign:"center",
                borderRight:i<2?`1px solid ${C.lightGray}`:"none"}}>
                <div style={{fontSize:17,fontWeight:800,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
                <div style={{fontSize:10,color:C.light,fontWeight:600,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* details */}
          <div style={{padding:"16px 22px"}}>
            {[
              ["Mutaxassislik",     g.specialty.name],
              ["Mutaxassislik kodi",g.specialty.code],
              ["Fakultet",         `${g.department.name} (${g.department.code})`],
              ["Ta'lim tili",      `${lang.flag} ${lang.label}`],
              ["Ta'lim shakli",    getLevel(g.name).label],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
                padding:"7px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600,flexShrink:0}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:700,textAlign:"right",maxWidth:"62%",lineHeight:1.4}}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{padding:"12px 22px 18px",display:"flex",gap:8}}>
            <button onClick={()=>{showToast("Tahrirlash ochildi");setDetailItem(null);}}
              style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
              Tahrirlash
            </button>
            <button onClick={()=>setDetailItem(null)}
              style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
              Yopish
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ── GROUP CARD (small, inside faculty view) ── */
  const SmallGroupCard = ({g})=>{
    const lang  = getLang(g.educationLang.code);
    const level = getLevel(g.name);
    return (
      <div onClick={()=>setDetailItem(g)}
        style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray}`,
          padding:"10px 12px",cursor:"pointer",transition:"all 0.15s",
          display:"flex",alignItems:"center",gap:10}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=lang.color+"55";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 6px 16px ${lang.color}12`;}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>

        {/* lang dot */}
        <div style={{width:8,height:8,borderRadius:"50%",background:lang.color,flexShrink:0}}/>

        {/* name */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12,fontWeight:800,color:C.dark,letterSpacing:"0.3px",fontFamily:"'Syne',sans-serif",
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.name}</div>
          <div style={{fontSize:10,color:C.light,marginTop:1}}>{lang.label}</div>
        </div>

        {/* level badge */}
        {level.label!=="Kunduzgi"&&(
          <span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20,
            background:level.bg,color:level.color,flexShrink:0}}>{level.label}</span>
        )}

        {/* eye */}
        <div style={{width:22,height:22,borderRadius:6,background:C.lightGray,flexShrink:0,
          display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ico d={I.eye} size={10} color={C.light}/>
        </div>
      </div>
    );
  };

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

      <div style={{padding:"24px 28px",maxWidth:1280,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Guruhlar ro'yxati
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{TOTAL_COUNT}</b> ta guruh •{" "}
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{RAW.length}</b> ta (1-sahifa)
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* View toggle */}
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"faculty",i:I.building, title:"Fakultet bo'yicha"},
                {m:"card",   i:I.grid,     title:"Karta"},
                {m:"table",  i:I.list,     title:"Jadval"},
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
            <button onClick={()=>showToast("Yangi guruh qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Qo'shish
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:20}}>
          {[
            {l:"Jami guruh",   v:stats.total,   c:C.bright,  bg:C.lightBlue,   i:I.users},
            {l:"O'zbekcha",    v:stats.uzb,     c:C.green,   bg:C.greenLight,  i:I.globe},
            {l:"Qoraqalpoqcha",v:stats.qq,      c:C.purple,  bg:C.purpleLight, i:I.globe},
            {l:"Ruscha",       v:stats.rus,     c:C.blue,    bg:"#EFF6FF",     i:I.globe},
            {l:"Magistratura", v:stats.magistr, c:C.purple,  bg:C.purpleLight, i:I.layers},
            {l:"Kechki",       v:stats.kechki,  c:C.orange,  bg:C.orangeLight, i:I.layers},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"12px 14px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:10,
              animation:`fadeUp 0.3s ${i*40}ms ease both`}}>
              <div style={{width:36,height:36,borderRadius:10,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.i} size={16} color={s.c}/>
              </div>
              <div>
                <div style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:10,color:C.light,fontWeight:500,marginTop:2}}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Guruh nomi, mutaxassislik, kod..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterDept} onChange={e=>{setFilterDept(e.target.value);setPage(1);}} style={{minWidth:230}}>
            <option value="">Barcha fakultetlar</option>
            {depts.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
          </Sel>
          <Sel value={filterLang} onChange={e=>{setFilterLang(e.target.value);setPage(1);}} style={{minWidth:150}}>
            <option value="">Barcha tillar</option>
            <option value="11">🇺🇿 O'zbek</option>
            <option value="12">🇷🇺 Rus</option>
            <option value="13">🌐 Qoraqalpoq</option>
          </Sel>
          <Sel value={filterLevel} onChange={e=>{setFilterLevel(e.target.value);setPage(1);}} style={{minWidth:140}}>
            <option value="">Barcha shakllar</option>
            <option value="Kunduzgi">Kunduzgi</option>
            <option value="Kechki">Kechki</option>
            <option value="Magistr">Magistr</option>
          </Sel>
          {(search||filterDept||filterLang||filterLevel)&&(
            <button onClick={()=>{setSearch("");setFilterDept("");setFilterLang("");setFilterLevel("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {filtered.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"64px",textAlign:"center"}}>
            <Ico d={I.users} size={48} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Guruh topilmadi</div>
          </div>
        )}

        {/* ═══ FAKULTET BO'YICHA KO'RINISH ═══ */}
        {viewMode==="faculty"&&filtered.length>0&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {byFaculty.map((fac,fi)=>{
              const dc   = deptColor(fac.dept.id);
              const db   = deptBg(fac.dept.id);
              const open = isExpanded(fac.dept.id);
              const bySpec = groupBySpecialty(fac.items);

              return (
                <div key={fac.dept.id} style={{animation:`fadeUp 0.3s ${fi*60}ms ease both`}}>
                  {/* Faculty header */}
                  <div onClick={()=>setExpanded(p=>({...p,[fac.dept.id]:!open}))}
                    style={{display:"flex",alignItems:"center",gap:14,
                      padding:"14px 18px",cursor:"pointer",userSelect:"none",
                      background:open?`linear-gradient(135deg,${dc}15,${dc}06)`:C.white,
                      borderRadius:open?"14px 14px 0 0":14,
                      border:`1.5px solid ${open?dc+"35":C.gray}`,
                      transition:"all 0.2s"}}
                    onMouseEnter={e=>!open&&(e.currentTarget.style.background=C.lightGray)}
                    onMouseLeave={e=>!open&&(e.currentTarget.style.background=C.white)}>

                    <div style={{width:44,height:44,borderRadius:13,background:db,flexShrink:0,
                      border:`2px solid ${dc}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.building} size={20} color={dc}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>
                        {fac.dept.name}
                      </div>
                      <div style={{fontSize:11,color:C.light,marginTop:1,fontFamily:"monospace"}}>
                        {fac.dept.code} • {fac.items.length} ta guruh • {bySpec.length} ta mutaxassislik
                      </div>
                    </div>

                    {/* lang breakdown */}
                    <div style={{display:"flex",gap:5}}>
                      {["11","12","13"].map(lc=>{
                        const cnt = fac.items.filter(g=>g.educationLang.code===lc).length;
                        if(!cnt) return null;
                        const l = getLang(lc);
                        return (
                          <span key={lc} style={{fontSize:11,fontWeight:700,padding:"3px 9px",
                            borderRadius:20,background:l.bg,color:l.color}}>
                            {l.flag} {cnt}
                          </span>
                        );
                      })}
                    </div>

                    <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"transform 0.2s",transform:open?"rotate(90deg)":"rotate(0)"}}>
                      <Ico d={I.chevR} size={14} color={C.mid}/>
                    </div>
                  </div>

                  {/* Specialty groups inside */}
                  {open&&(
                    <div style={{border:`1.5px solid ${dc}35`,borderTop:"none",
                      borderRadius:"0 0 14px 14px",overflow:"hidden",background:C.white}}>
                      {bySpec.map((sp,si)=>(
                        <div key={sp.spec.id}
                          style={{borderBottom:si<bySpec.length-1?`1px solid ${C.lightGray}`:"none"}}>
                          {/* specialty header */}
                          <div style={{display:"flex",alignItems:"center",gap:8,
                            padding:"10px 18px 8px",background:`${dc}05`}}>
                            <div style={{width:22,height:22,borderRadius:6,background:db,
                              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                              <Ico d={I.book} size={10} color={dc}/>
                            </div>
                            <div style={{fontSize:12,fontWeight:700,color:C.dark}}>{sp.spec.name}</div>
                            <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{sp.spec.code}</div>
                            <div style={{marginLeft:"auto",fontSize:10,fontWeight:700,
                              padding:"2px 8px",borderRadius:20,background:db,color:dc}}>
                              {sp.groups.length} guruh
                            </div>
                          </div>
                          {/* group cards grid */}
                          <div style={{display:"grid",
                            gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
                            gap:8,padding:"8px 18px 12px"}}>
                            {sp.groups.map(g=><SmallGroupCard key={g.id} g={g}/>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ CARD VIEW ═══ */}
        {viewMode==="card"&&filtered.length>0&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
              {paginated.map((g,idx)=>{
                const lang  = getLang(g.educationLang.code);
                const level = getLevel(g.name);
                const dc    = deptColor(g.department.id);
                const db    = deptBg(g.department.id);
                return (
                  <div key={g.id}
                    style={{background:C.white,borderRadius:14,border:`1px solid ${C.gray}`,
                      overflow:"hidden",cursor:"pointer",transition:"all 0.18s",
                      animation:`fadeUp 0.28s ${(idx%12)*30}ms ease both`}}
                    onClick={()=>setDetailItem(g)}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 10px 28px ${dc}18`;e.currentTarget.style.borderColor=`${dc}40`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor=C.gray;}}>

                    {/* top stripe */}
                    <div style={{height:3,background:`linear-gradient(90deg,${dc},${lang.color})`}}/>

                    <div style={{padding:"14px 15px"}}>
                      {/* group name */}
                      <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",
                        letterSpacing:"0.5px",marginBottom:8}}>{g.name}</div>

                      {/* specialty */}
                      <div style={{fontSize:11,color:C.mid,marginBottom:10,lineHeight:1.4,
                        overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",
                        padding:"5px 8px",borderRadius:7,background:db}}>
                        <span style={{color:dc,fontWeight:600}}>{g.specialty.code}</span> {g.specialty.name}
                      </div>

                      {/* dept */}
                      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:10}}>
                        <Ico d={I.building} size={11} color={C.light}/>
                        <span style={{fontSize:11,color:C.light,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {g.department.name}
                        </span>
                      </div>

                      {/* badges */}
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                          background:lang.bg,color:lang.color}}>{lang.flag} {lang.label}</span>
                        {level.label!=="Kunduzgi"&&(
                          <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                            background:level.bg,color:level.color}}>{level.label}</span>
                        )}
                        <span style={{marginLeft:"auto",fontSize:10,fontWeight:600,padding:"3px 8px",
                          borderRadius:20,background:C.lightGray,color:C.mid}}>#{g._curriculum}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* pagination */}
            {pageCount>1&&(
              <div style={{marginTop:14,display:"flex",alignItems:"center",
                justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div style={{fontSize:12,color:C.light}}>
                  <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
                  <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>
                  {" "}/ <b style={{color:C.dark}}>{filtered.length}</b>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===1?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
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
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===pageCount?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",opacity:page===pageCount?0.4:1}}>
                    <Ico d={I.chevR} size={14} color={C.mid}/>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ═══ TABLE VIEW ═══ */}
        {viewMode==="table"&&filtered.length>0&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",
                gridTemplateColumns:"44px 120px 1fr 180px 110px 100px 90px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["ID","Guruh nomi","Mutaxassislik","Fakultet","Til","Shakl","Amallar"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>

              {paginated.map((g,idx)=>{
                const lang  = getLang(g.educationLang.code);
                const level = getLevel(g.name);
                const dc    = deptColor(g.department.id);
                return (
                  <div key={g.id}
                    style={{display:"grid",
                      gridTemplateColumns:"44px 120px 1fr 180px 110px 100px 90px",
                      padding:"10px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,transition:"background 0.15s",
                      animation:`fadeUp 0.22s ${idx*20}ms ease both`}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{g.id}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:13,fontWeight:800,color:dc,fontFamily:"'Syne',sans-serif",
                        letterSpacing:"0.3px"}}>{g.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:C.dark,lineHeight:1.3,
                          overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical"}}>
                          {g.specialty.name}
                        </div>
                        <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{g.specialty.code}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,color:C.mid,fontWeight:500,lineHeight:1.3,
                        overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                        {g.department.name}
                      </span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,
                        background:lang.bg,color:lang.color}}>{lang.flag} {lang.label}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,
                        background:level.bg,color:level.color}}>{level.label}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <button onClick={()=>setDetailItem(g)}
                        style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                          background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.eye} size={12} color={C.bright}/>
                      </button>
                      <button onClick={()=>showToast("Tahrirlash ochildi")}
                        style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                          background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.edit} size={12} color={C.green}/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* pagination */}
            {pageCount>1&&(
              <div style={{marginTop:14,display:"flex",alignItems:"center",
                justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div style={{fontSize:12,color:C.light}}>
                  <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
                  <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>
                  {" "}/ <b style={{color:C.dark}}>{filtered.length}</b>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===1?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
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
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===pageCount?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",opacity:page===pageCount?0.4:1}}>
                    <Ico d={I.chevR} size={14} color={C.mid}/>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
