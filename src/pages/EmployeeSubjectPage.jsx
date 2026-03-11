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
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevL:   "M15 18l-6-6 6-6",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  calendar:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  hash:    "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  link:    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  expand:  "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
  collapse:"M4 14h6v6M14 4h6v6M10 20l-6-6M20 10l-6-6",
};

/* ── AVATAR COLORS ── */
const AV_COLORS = [C.bright,C.purple,C.green,C.teal,C.orange,C.red,C.pink,C.navy,C.yellow];
const avColor   = (id) => AV_COLORS[id % AV_COLORS.length];
const initials  = name => {
  const parts = name.trim().split(" ");
  return parts.slice(0,2).map(p=>p[0]).join("");
};

/* ── REAL DATA (50 items, totalCount:1908) ── */
const RAW = [
  {subject:{id:82,  name:"Elektron hukumat",                              code:"SPEE16TBK1"},          employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:237, name:"Kompyuter tarmoqlari",                          code:"KOT1306"},              employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:251, name:"Ma'lumotlarning intellektual tahlili",          code:"SPEYe16TBK-101-7.1"},   employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:362, name:"Kompyuter tizimlari va tarmoqlari",             code:"KTT1506"},              employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:541, name:"Kompyuter tarmoqlari",                          code:"CMNT16MBK"},            employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:542, name:"Kompyuter tarmoqlari",                          code:"CMNT16MBK*"},           employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:948, name:"Windows server boshqaruvi",                     code:"WSAD16MBK"},            employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1224,name:"Cloud computing",                               code:"SPEE16TBK-KI-3"},       employee:{id:2,  full_name:"KENJAYEV XAMDAM BAZARBAYEVICH",         employee_id_number:"3911111001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:133, name:"Intellektual va ekspert tizimlari",             code:"SPEE16TBK-DI-25.8.1"},  employee:{id:5,  full_name:"YADGAROV SHERZOD ABDULLAYEVICH",        employee_id_number:"3911611001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1042,name:"Dasturiy ta'minot qurilmasi va evolyutsiyasi",  code:"SWDE16MBK"},            employee:{id:5,  full_name:"YADGAROV SHERZOD ABDULLAYEVICH",        employee_id_number:"3911611001"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:323, name:"Dasturlash 1,2",                                code:"DAS1110"},              employee:{id:7,  full_name:"ARTIKBAYEV MAHKAM ARTIKBAYEVICH",       employee_id_number:"3912211020"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1162,name:"VR texnologiyalari",                            code:"SPEYe16TBK08.02"},      employee:{id:7,  full_name:"ARTIKBAYEV MAHKAM ARTIKBAYEVICH",       employee_id_number:"3912211020"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1164,name:"Social media marketing",                        code:"SPEYe16TBK08.04"},      employee:{id:7,  full_name:"ARTIKBAYEV MAHKAM ARTIKBAYEVICH",       employee_id_number:"3912211020"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:84,  name:"Elektronika va sxemalar 1",                     code:"EVS1306"},              employee:{id:8,  full_name:"BABAJANOVA TAZAXAN MIRZABAYEVNA",       employee_id_number:"3912112027"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:874, name:"Elektronika va sxemalar1,2",                    code:"EVS1310"},              employee:{id:8,  full_name:"BABAJANOVA TAZAXAN MIRZABAYEVNA",       employee_id_number:"3912112027"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:965, name:"Telekommunikatsiya tarmoqlarini boshqarish",    code:"SPEE16TBK-103-7.5"},    employee:{id:8,  full_name:"BABAJANOVA TAZAXAN MIRZABAYEVNA",       employee_id_number:"3912112027"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:323, name:"Dasturlash 1,2",                                code:"DAS1110"},              employee:{id:9,  full_name:"KALMURATOV BEKBOSI'N KUSHKINBAEVICH",   employee_id_number:"3912111030"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:27,  name:"Dasturiy ta'minot arxitekturasi",               code:"SWAR16MBK"},            employee:{id:11, full_name:"PRIMBETOV AZIZ MURATBAYEVICH",         employee_id_number:"3912111049"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:28,  name:"Dasturiy taminotni testlash",                   code:"SOTE18MBK"},            employee:{id:11, full_name:"PRIMBETOV AZIZ MURATBAYEVICH",         employee_id_number:"3912111049"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:323, name:"Dasturlash 1,2",                                code:"DAS1110"},              employee:{id:11, full_name:"PRIMBETOV AZIZ MURATBAYEVICH",         employee_id_number:"3912111049"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:510, name:"Tasvirlarga raqamli ishlov berish",             code:"DIIP26TBK"},            employee:{id:11, full_name:"PRIMBETOV AZIZ MURATBAYEVICH",         employee_id_number:"3912111049"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:961, name:"Tizimli dasturlash",                            code:"SPEE16TBK-104-7.1"},    employee:{id:11, full_name:"PRIMBETOV AZIZ MURATBAYEVICH",         employee_id_number:"3912111049"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:27,  name:"Dasturiy ta'minot arxitekturasi",               code:"SWAR16MBK"},            employee:{id:12, full_name:"MAMUTOVA AYGUL KALMURZAEVNA",          employee_id_number:"3912112026"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:272, name:"Matlabta dasturlash",                           code:"SPEE16TBK-104-7.4"},    employee:{id:12, full_name:"MAMUTOVA AYGUL KALMURZAEVNA",          employee_id_number:"3912112026"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:399, name:"Real vaqt tizimlari",                           code:"SPEE16TBK-104-7.5"},    employee:{id:12, full_name:"MAMUTOVA AYGUL KALMURZAEVNA",          employee_id_number:"3912112026"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:533, name:"Dasturlash uslublari va paradigmalar",          code:"PRSP16MBK"},            employee:{id:12, full_name:"MAMUTOVA AYGUL KALMURZAEVNA",          employee_id_number:"3912112026"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1042,name:"Dasturiy ta'minot qurilmasi va evolyutsiyasi",  code:"SWDE16MBK"},            employee:{id:12, full_name:"MAMUTOVA AYGUL KALMURZAEVNA",          employee_id_number:"3912112026"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1361,name:"Dasturiy taminot tizimlarini loyihalash",       code:"DOSS16MBK"},            employee:{id:12, full_name:"MAMUTOVA AYGUL KALMURZAEVNA",          employee_id_number:"3912112026"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:28,  name:"Dasturiy taminotni testlash",                   code:"SOTE18MBK"},            employee:{id:13, full_name:"DJIYEMURATOVA ZUXRA KUVANICHBAYEVNA",  employee_id_number:"3912312002"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:399, name:"Real vaqt tizimlari",                           code:"SPEE16TBK-104-7.5"},    employee:{id:13, full_name:"DJIYEMURATOVA ZUXRA KUVANICHBAYEVNA",  employee_id_number:"3912312002"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1432,name:"Dasturiy ta'minot sifatini ta'minlash",         code:"SOQA14MBK"},            employee:{id:13, full_name:"DJIYEMURATOVA ZUXRA KUVANICHBAYEVNA",  employee_id_number:"3912312002"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:133, name:"Intellektual va ekspert tizimlari",             code:"SPEE16TBK-DI-25.8.1"},  employee:{id:14, full_name:"SHAGÍMBAEV DAURANBEK MAKSETOVICH",      employee_id_number:"3912411003"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:323, name:"Dasturlash 1,2",                                code:"DAS1110"},              employee:{id:14, full_name:"SHAGÍMBAEV DAURANBEK MAKSETOVICH",      employee_id_number:"3912411003"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:360, name:"Dasturlash asoslari",                           code:"DA1406"},               employee:{id:14, full_name:"SHAGÍMBAEV DAURANBEK MAKSETOVICH",      employee_id_number:"3912411003"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:858, name:"Amaliy matematika1,2",                          code:"AMAT"},                 employee:{id:14, full_name:"SHAGÍMBAEV DAURANBEK MAKSETOVICH",      employee_id_number:"3912411003"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1209,name:"Amaliy matematika 1.2",                         code:"AMATII210"},            employee:{id:14, full_name:"SHAGÍMBAEV DAURANBEK MAKSETOVICH",      employee_id_number:"3912411003"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:38,  name:"Amallar tadqiqi asoslari",                      code:"SPEE16TBK-DI-25.8.3"},  employee:{id:16, full_name:"PIRIMBETOV AZAMAT OSERBAEVICH",         employee_id_number:"3912111050"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:107, name:"Ilmiy tadqiqot metodologiyasi",                 code:"ITM1104"},              employee:{id:16, full_name:"PIRIMBETOV AZAMAT OSERBAEVICH",         employee_id_number:"3912111050"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:272, name:"Matlabta dasturlash",                           code:"SPEE16TBK-104-7.4"},    employee:{id:16, full_name:"PIRIMBETOV AZAMAT OSERBAEVICH",         employee_id_number:"3912111050"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:323, name:"Dasturlash 1,2",                                code:"DAS1110"},              employee:{id:16, full_name:"PIRIMBETOV AZAMAT OSERBAEVICH",         employee_id_number:"3912111050"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:384, name:"Dasturiy ta'minotdan qayta foydalanish",        code:"DTQ1306"},              employee:{id:16, full_name:"PIRIMBETOV AZAMAT OSERBAEVICH",         employee_id_number:"3912111050"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1072,name:"Deklarativ dasturlash",                         code:"DED1206*"},             employee:{id:16, full_name:"PIRIMBETOV AZAMAT OSERBAEVICH",         employee_id_number:"3912111050"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:38,  name:"Amallar tadqiqi asoslari",                      code:"SPEE16TBK-DI-25.8.3"},  employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:250, name:"Ma'lumotlarni intellektual tahlil qilish texnologiyasi",code:"MIT2104"},      employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:323, name:"Dasturlash 1,2",                                code:"DAS1110"},              employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:858, name:"Amaliy matematika1,2",                          code:"AMAT"},                 employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:933, name:"Maxsus fanlarni o'qitish metodikasi",           code:"MFO1304*"},             employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1209,name:"Amaliy matematika 1.2",                         code:"AMATII210"},            employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:1305,name:"Nokorrekt masalalarni modellashtirish",          code:"NMM2306"},              employee:{id:17, full_name:"DJAYKOV GAFUR MURATBAEVICH",            employee_id_number:"3461911019"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
  {subject:{id:253, name:"Ma'lumotlarga dastlabki ishlov berish",          code:"SPEE16TBK-104-7.7"},   employee:{id:18, full_name:"ABDULLAYEV SULTANBEK BAXTIYAROVICH",    employee_id_number:"3912311027"}, educationYear:{code:"2025",name:"2025-2026",current:true}},
];
const TOTAL_COUNT = 1908;

/* ── GROUP BY EMPLOYEE ── */
function groupByEmployee(data) {
  const map = {};
  data.forEach(r => {
    const eid = r.employee.id;
    if (!map[eid]) map[eid] = { employee: r.employee, subjects: [], year: r.educationYear };
    // avoid exact duplicate subject ids
    if (!map[eid].subjects.find(s => s.id === r.subject.id && s.code === r.subject.code)) {
      map[eid].subjects.push(r.subject);
    }
  });
  return Object.values(map).sort((a,b) => b.subjects.length - a.subjects.length);
}

/* ── SUBJECT COLOR by code prefix ── */
const SUBJ_COLORS = [C.bright,C.purple,C.teal,C.green,C.orange,C.red,C.pink,C.yellow,C.navy];
const subjColor = id => SUBJ_COLORS[id % SUBJ_COLORS.length];

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

/* ── AVATAR ── */
const Avatar = ({emp,size=40})=>{
  const col = avColor(emp.id);
  const ini = initials(emp.full_name);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:`linear-gradient(135deg,${col},${col}bb)`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.3,fontWeight:800,color:C.white,letterSpacing:"-0.5px",
      border:`2px solid ${col}30`}}>
      {ini}
    </div>
  );
};

/* ─────────────────────── MAIN ─────────────────────── */
export default function EmployeeSubjectPage() {
  const [search,     setSearch]     = useState("");
  const [filterEmp,  setFilterEmp]  = useState("");
  const [viewMode,   setViewMode]   = useState("accordion"); // "accordion"|"table"|"matrix"
  const [expanded,   setExpanded]   = useState({});
  const [detailItem, setDetailItem] = useState(null); // {employee, subject}
  const [toast,      setToast]      = useState(null);
  const [page,       setPage]       = useState(1);
  const PAGE = 15;

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* filter RAW */
  const filtered = useMemo(()=>RAW.filter(r=>{
    const ms = !search || r.subject.name.toLowerCase().includes(search.toLowerCase())
                       || r.subject.code.toLowerCase().includes(search.toLowerCase())
                       || r.employee.full_name.toLowerCase().includes(search.toLowerCase());
    const me = !filterEmp || r.employee.id===Number(filterEmp);
    return ms && me;
  }),[search,filterEmp]);

  /* grouped by employee */
  const grouped = useMemo(()=>groupByEmployee(filtered),[filtered]);

  /* unique employees for select */
  const employees = useMemo(()=>{
    const m={};
    RAW.forEach(r=>{ if(!m[r.employee.id]) m[r.employee.id]=r.employee.full_name; });
    return Object.entries(m).map(([id,name])=>({id:Number(id),name}));
  },[]);

  /* table paginated */
  const paginated = filtered.slice((page-1)*PAGE,page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);
  const pageNums  = ()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  const isExp = id => expanded[id] !== false;
  const toggleExp = id => setExpanded(p=>({...p,[id]:!isExp(id)}));

  /* stats */
  const uniqSubjects = new Set(RAW.map(r=>r.subject.id)).size;
  const uniqEmployees = new Set(RAW.map(r=>r.employee.id)).size;
  const maxLoad = Math.max(...groupByEmployee(RAW).map(g=>g.subjects.length));

  /* matrix: unique subjects & employees */
  const matrixData = useMemo(()=>{
    const emps    = groupByEmployee(RAW);
    const subjMap = {};
    RAW.forEach(r=>{ if(!subjMap[r.subject.id]) subjMap[r.subject.id]=r.subject; });
    const subjs = Object.values(subjMap).sort((a,b)=>a.id-b.id);
    // presence set per employee
    const presence = {};
    RAW.forEach(r=>{
      if(!presence[r.employee.id]) presence[r.employee.id]=new Set();
      presence[r.employee.id].add(r.subject.id);
    });
    return {emps,subjs,presence};
  },[]);

  /* ── DETAIL MODAL ── */
  const DetailModal = ()=>{
    const d = detailItem;
    if(!d) return null;
    const col = avColor(d.employee.id);
    const sc  = subjColor(d.subject.id);
    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:20,width:"min(440px,95vw)",
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>
          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.6)",
                  textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>O'qituvchi — Fan bog'liqligi</div>
                <div style={{fontSize:16,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",marginBottom:3}}>
                  {d.subject.name}
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",fontFamily:"monospace"}}>{d.subject.code}</div>
              </div>
              <button onClick={()=>setDetailItem(null)}
                style={{width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",
                  background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ico d={I.x} size={14} color={C.white}/>
              </button>
            </div>
          </div>
          {/* body */}
          <div style={{padding:"18px 22px"}}>
            {/* employee block */}
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px",
              borderRadius:12,background:`${col}10`,border:`1.5px solid ${col}20`,marginBottom:14}}>
              <Avatar emp={d.employee} size={44}/>
              <div>
                <div style={{fontSize:13,fontWeight:800,color:C.dark}}>{d.employee.full_name}</div>
                <div style={{fontSize:11,color:C.light,fontFamily:"monospace",marginTop:2}}>
                  {d.employee.employee_id_number}
                </div>
              </div>
            </div>
            {[
              ["Fan ID",      `#${d.subject.id}`],
              ["Fan kodi",    d.subject.code],
              ["O'quv yili",  d.year?.name || "2025-2026"],
              ["Joriy yil",   d.year?.current ? "Ha" : "Yo'q"],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"7px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:700}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{padding:"12px 22px 18px",display:"flex",gap:8}}>
            <button onClick={()=>{showToast("Tahrirlash ochildi");setDetailItem(null);}}
              style={{flex:1,padding:"9px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
              Tahrirlash
            </button>
            <button onClick={()=>setDetailItem(null)}
              style={{padding:"9px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
              Yopish
            </button>
          </div>
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
              O'qituvchi — Fan bog'liqliqlari
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{TOTAL_COUNT}</b> ta yozuv •{" "}
              <b style={{color:C.dark}}>{uniqEmployees}</b> o'qituvchi •{" "}
              <b style={{color:C.dark}}>{uniqSubjects}</b> fan • O'quv yili: <b style={{color:C.bright}}>2025-2026</b>
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"accordion",i:I.users,    title:"O'qituvchi bo'yicha"},
                {m:"table",    i:I.list,     title:"Jadval"},
                {m:"matrix",   i:I.grid,     title:"Matritsa"},
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
            <button onClick={()=>showToast("Yangi bog'liqlik qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Qo'shish
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Jami yozuvlar",   v:TOTAL_COUNT,   c:C.bright,  bg:C.lightBlue,  i:I.link},
            {l:"O'qituvchilar",   v:uniqEmployees, c:C.purple,  bg:C.purpleLight,i:I.users},
            {l:"Fanlar",          v:uniqSubjects,  c:C.teal,    bg:C.tealLight,  i:I.book},
            {l:"Maks fan yuki",   v:`${maxLoad} fan`, c:C.orange,bg:C.orangeLight,i:I.layers},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.i} size={18} color={s.c}/>
              </div>
              <div>
                <div style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {s.v}
                </div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:220,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Fan nomi, kodi, o'qituvchi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterEmp} onChange={e=>{setFilterEmp(e.target.value);setPage(1);}} style={{minWidth:260}}>
            <option value="">Barcha o'qituvchilar</option>
            {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </Sel>
          {(search||filterEmp)&&(
            <button onClick={()=>{setSearch("");setFilterEmp("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
          {/* expand/collapse all (accordion only) */}
          {viewMode==="accordion"&&(
            <div style={{display:"flex",gap:6,marginLeft:"auto"}}>
              <button onClick={()=>{const m={}; grouped.forEach(g=>m[g.employee.id]=true); setExpanded(m);}}
                style={{padding:"7px 12px",borderRadius:8,border:`1px solid ${C.gray}`,cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:600,background:C.white,color:C.mid,
                  display:"flex",alignItems:"center",gap:5}}>
                <Ico d={I.expand} size={12} color={C.mid}/> Barchasini yoy
              </button>
              <button onClick={()=>setExpanded({})}
                style={{padding:"7px 12px",borderRadius:8,border:`1px solid ${C.gray}`,cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:600,background:C.white,color:C.mid,
                  display:"flex",alignItems:"center",gap:5}}>
                <Ico d={I.collapse} size={12} color={C.mid}/> Yig'
              </button>
            </div>
          )}
        </div>

        {grouped.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.users} size={48} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Natija topilmadi</div>
          </div>
        )}

        {/* ═══ ACCORDION VIEW ═══ */}
        {viewMode==="accordion"&&grouped.length>0&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {grouped.map((grp,gi)=>{
              const col  = avColor(grp.employee.id);
              const open = isExp(grp.employee.id);
              const cnt  = grp.subjects.length;
              // load bar width
              const pct  = Math.round((cnt / maxLoad) * 100);
              return (
                <div key={grp.employee.id} style={{animation:`fadeUp 0.28s ${gi*40}ms ease both`}}>
                  {/* Employee header */}
                  <div
                    style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",
                      background:open?`${col}08`:C.white,
                      borderRadius:open?"14px 14px 0 0":14,
                      border:`1.5px solid ${open?col+"35":C.gray}`,
                      cursor:"pointer",userSelect:"none",transition:"all 0.18s"}}
                    onClick={()=>toggleExp(grp.employee.id)}
                    onMouseEnter={e=>!open&&(e.currentTarget.style.background=C.lightGray)}
                    onMouseLeave={e=>!open&&(e.currentTarget.style.background=C.white)}>

                    <Avatar emp={grp.employee} size={46}/>

                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {grp.employee.full_name}
                      </div>
                      <div style={{fontSize:11,color:C.light,fontFamily:"monospace",marginTop:1}}>
                        {grp.employee.employee_id_number}
                      </div>
                      {/* load bar */}
                      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}>
                        <div style={{flex:1,height:4,borderRadius:99,background:C.gray,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,borderRadius:99,
                            background:`linear-gradient(90deg,${col},${col}99)`,transition:"width 0.4s ease"}}/>
                        </div>
                        <span style={{fontSize:10,color:col,fontWeight:700,flexShrink:0}}>
                          {cnt} fan
                        </span>
                      </div>
                    </div>

                    {/* subject count badge */}
                    <div style={{width:44,height:44,borderRadius:12,background:`${col}15`,
                      border:`2px solid ${col}25`,flexShrink:0,
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:18,fontWeight:800,color:col,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{cnt}</span>
                      <span style={{fontSize:8,color:col,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>fan</span>
                    </div>

                    <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"transform 0.2s",transform:open?"rotate(90deg)":"rotate(0)"}}>
                      <Ico d={I.chevR} size={14} color={C.mid}/>
                    </div>
                  </div>

                  {/* Subjects inside */}
                  {open&&(
                    <div style={{border:`1.5px solid ${col}35`,borderTop:"none",
                      borderRadius:"0 0 14px 14px",overflow:"hidden",
                      display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))"}}>
                      {grp.subjects.map((subj,si)=>{
                        const sc = subjColor(subj.id);
                        return (
                          <div key={subj.id+subj.code}
                            onClick={()=>setDetailItem({employee:grp.employee,subject:subj,year:grp.year})}
                            style={{display:"flex",alignItems:"center",gap:10,
                              padding:"10px 16px",cursor:"pointer",
                              background:C.white,transition:"background 0.12s",
                              borderRight:(si%2===0)?`1px solid ${C.lightGray}`:"none",
                              borderBottom:`1px solid ${C.lightGray}`,
                              animation:`fadeUp 0.2s ${si*15}ms ease both`}}
                            onMouseEnter={e=>e.currentTarget.style.background=`${sc}06`}
                            onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                            {/* color dot */}
                            <div style={{width:32,height:32,borderRadius:9,background:`${sc}15`,
                              flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
                              border:`1px solid ${sc}20`}}>
                              <Ico d={I.book} size={14} color={sc}/>
                            </div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.3,
                                overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                                {subj.name}
                              </div>
                              <div style={{fontSize:10,color:C.light,fontFamily:"monospace",marginTop:1}}>
                                {subj.code}
                              </div>
                            </div>
                            <div style={{width:22,height:22,borderRadius:6,background:C.lightGray,
                              flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                              <Ico d={I.eye} size={10} color={C.light}/>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ TABLE VIEW ═══ */}
        {viewMode==="table"&&filtered.length>0&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"44px 52px 1fr 1fr 120px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["#","Foto","O'qituvchi","Fan","O'quv yili"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>
              {paginated.map((r,idx)=>{
                const col = avColor(r.employee.id);
                const sc  = subjColor(r.subject.id);
                return (
                  <div key={r.employee.id+"-"+r.subject.id+"-"+r.subject.code}
                    style={{display:"grid",gridTemplateColumns:"44px 52px 1fr 1fr 120px",
                      padding:"10px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,transition:"background 0.15s",cursor:"pointer",
                      animation:`fadeUp 0.22s ${idx*15}ms ease both`}}
                    onClick={()=>setDetailItem({employee:r.employee,subject:r.subject,year:r.educationYear})}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{r.subject.id}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <Avatar emp={r.employee} size={34}/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.2,
                          overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical"}}>
                          {r.employee.full_name}
                        </div>
                        <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{r.employee.employee_id_number}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:28,height:28,borderRadius:8,background:`${sc}15`,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.book} size={12} color={sc}/>
                      </div>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:C.dark,lineHeight:1.2,
                          overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical"}}>
                          {r.subject.name}
                        </div>
                        <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{r.subject.code}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,
                        background:r.educationYear.current?C.greenLight:C.lightGray,
                        color:r.educationYear.current?C.green:C.mid}}>
                        {r.educationYear.name}
                      </span>
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

        {/* ═══ MATRIX VIEW ═══ */}
        {viewMode==="matrix"&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"auto"}}>
            <div style={{minWidth:"max-content"}}>
              {/* header row */}
              <div style={{display:"flex",borderBottom:`2px solid ${C.gray}`,position:"sticky",top:0,background:C.white,zIndex:10}}>
                {/* corner */}
                <div style={{width:200,flexShrink:0,padding:"10px 14px",
                  borderRight:`1px solid ${C.gray}`,
                  fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",
                  display:"flex",alignItems:"flex-end"}}>
                  O'qituvchi / Fan
                </div>
                {matrixData.subjs.map(s=>{
                  const sc=subjColor(s.id);
                  return (
                    <div key={s.id+s.code} style={{width:40,flexShrink:0,padding:"8px 4px",
                      borderRight:`1px solid ${C.lightGray}`,
                      display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <div style={{width:28,height:28,borderRadius:8,background:`${sc}15`,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.book} size={11} color={sc}/>
                      </div>
                      {/* rotated code */}
                      <div style={{fontSize:8,color:C.light,fontFamily:"monospace",
                        writingMode:"vertical-rl",transform:"rotate(180deg)",
                        height:60,overflow:"hidden",lineHeight:1.2,textAlign:"center"}}>
                        {s.code}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* employee rows */}
              {matrixData.emps.map((grp,gi)=>{
                const col = avColor(grp.employee.id);
                return (
                  <div key={grp.employee.id}
                    style={{display:"flex",borderBottom:`1px solid ${C.lightGray}`,
                      animation:`fadeUp 0.25s ${gi*30}ms ease both`}}>
                    <div style={{width:200,flexShrink:0,padding:"10px 14px",
                      borderRight:`1px solid ${C.gray}`,
                      display:"flex",alignItems:"center",gap:8}}>
                      <Avatar emp={grp.employee} size={28}/>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:11,fontWeight:700,color:C.dark,
                          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {grp.employee.full_name.split(" ").slice(0,2).join(" ")}
                        </div>
                        <div style={{fontSize:9,color:C.light,marginTop:1}}>
                          {grp.subjects.length} fan
                        </div>
                      </div>
                    </div>
                    {matrixData.subjs.map(s=>{
                      const has = matrixData.presence[grp.employee.id]?.has(s.id);
                      const sc  = subjColor(s.id);
                      return (
                        <div key={s.id+s.code}
                          style={{width:40,flexShrink:0,display:"flex",alignItems:"center",
                            justifyContent:"center",padding:"8px 4px",
                            borderRight:`1px solid ${C.lightGray}`,cursor:has?"pointer":"default",
                            background:has?`${sc}08`:C.white,transition:"background 0.15s"}}
                          onMouseEnter={e=>has&&(e.currentTarget.style.background=`${sc}18`)}
                          onMouseLeave={e=>has&&(e.currentTarget.style.background=`${sc}08`)}
                          onClick={()=>has&&setDetailItem({employee:grp.employee,subject:s,year:grp.year})}>
                          {has
                            ? <div style={{width:18,height:18,borderRadius:5,background:`${sc}25`,
                                display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <Ico d={I.check} size={10} color={sc} sw={2.5}/>
                              </div>
                            : <div style={{width:8,height:1,background:C.gray,borderRadius:1}}/>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
