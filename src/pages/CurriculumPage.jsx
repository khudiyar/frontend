import { useState, useEffect, useCallback, useRef } from "react";

const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", orangeLight:"#FFF4ED",
  green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  teal:"#0D9488",   tealLight:"#F0FDFA",
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
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
  button,input,select,textarea{font-family:'DM Sans',sans-serif}
  input:focus,select:focus,textarea:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

/* ── ICONS ── */
const Ico = ({ d, size=16, color="currentColor", sw=2, fill="none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  dept:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  award:    "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  chevD:    "M6 9l6 6 6-6",
  chevL:    "M15 18l-6-6 6-6",
  chevR:    "M9 18l6-6-6-6",
  plus:     "M12 5v14M5 12h14",
  refresh:  "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  percent:  "M19 5L5 19M6.5 3.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM17.5 14.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
};

/* ── REAL API DATA (curriculum-list) ── */
const MS = {code:"13",name:"Kredit baholash tizimi",minimum_limit:60,count_final_exams:3,gpa_limit:2.6,updated_at:1752126804};
const D3 = {id:3,name:"Konchilik ishi va energetika",code:"540-103",structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Mahalliy"},parent:null,active:true};
const D4 = {id:4,name:"Muhandislik texnologiyalari",code:"540-104",structureType:{code:"11",name:"Fakultet"},localityType:{code:"11",name:"Mahalliy"},parent:null,active:true};
const ET = {code:"11",name:"Bakalavr"};
const EF = {code:"11",name:"Kunduzgi"};
const Y21= {code:"2021",name:"2021-2022",current:false};
const Y22= {code:"2022",name:"2022-2023",current:false};
const Y23= {code:"2023",name:"2023-2024",current:false};
const RAW = [
  {id:1, name:"KI-21",  specialty:{id:6, code:"60721500",name:"Konchilik ishi (ochiq konchilik ishlari)"},                                                                              department:D3,educationYear:Y21,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:2, name:"TJ-21",  specialty:{id:3, code:"60711400",name:"Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish (tarmoqlar bo'yicha)"},                       department:D3,educationYear:Y21,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:3, name:"MT-21",  specialty:{id:4, code:"60720800",name:"Mashinasozlik texnologiyasi, mashinasozlik ishlab chiqarishini jihozlash va avtomatlashtirish"},                          department:D3,educationYear:Y21,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:4, name:"TJ-22",  specialty:{id:3, code:"60711400",name:"Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish (tarmoqlar bo'yicha)"},                       department:D3,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:5, name:"KT-21",  specialty:{id:5, code:"60710100",name:"Kimyoviy texnologiya (ishlab chiqarish turlari bo'yicha)"},                                                               department:D4,educationYear:Y21,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:6, name:"KI-22",  specialty:{id:6, code:"60721500",name:"Konchilik ishi (ochiq konchilik ishlari)"},                                                                              department:D3,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:7, name:"KT-22",  specialty:{id:84,code:"60710100",name:"Kimyo muhandisligi"},                                                                                                    department:D4,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:8, name:"MT-22",  specialty:{id:4, code:"60720800",name:"Mashinasozlik texnologiyasi, mashinasozlik ishlab chiqarishini jihozlash va avtomatlashtirish"},                          department:D4,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:9, name:"KEM-22", specialty:{id:7, code:"60721900",name:"Konchilik elektr mexanikasi"},                                                                                           department:D3,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:10,name:"EKO-22", specialty:{id:88,code:"60520200",name:"Ekologiya va atrof-muhit muhofazasi"},                                                                                   department:D4,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:11,name:"MET-22", specialty:{id:9, code:"60712100",name:"Metallurgiya"},                                                                                                          department:D3,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:12,name:"EE-22",  specialty:{id:10,code:"60710600",name:"Elektr energetikasi (tarmoqlar va yo'nalishlar bo'yicha)"},                                                               department:D3,educationYear:Y22,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:13,name:"TJ-23",  specialty:{id:3, code:"60711400",name:"Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish (tarmoqlar bo'yicha)"},                       department:D3,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:14,name:"KI-23",  specialty:{id:6, code:"60721500",name:"Konchilik ishi (ochiq konchilik ishlari)"},                                                                              department:D3,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:15,name:"KT-23",  specialty:{id:84,code:"60710100",name:"Kimyo muhandisligi"},                                                                                                    department:D4,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:16,name:"MT-23",  specialty:{id:4, code:"60720800",name:"Mashinasozlik texnologiyasi, mashinasozlik ishlab chiqarishini jihozlash va avtomatlashtirish"},                          department:D4,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:17,name:"KEM-23", specialty:{id:7, code:"60721900",name:"Konchilik elektr mexanikasi"},                                                                                           department:D3,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:18,name:"EKO-23", specialty:{id:88,code:"60520200",name:"Ekologiya va atrof-muhit muhofazasi"},                                                                                   department:D4,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
  {id:19,name:"MET-23", specialty:{id:9, code:"60712100",name:"Metallurgiya"},                                                                                                          department:D3,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:true, active:true},
  {id:20,name:"EE-23",  specialty:{id:10,code:"60710600",name:"Elektr energetikasi (tarmoqlar va yo'nalishlar bo'yicha)"},                                                               department:D3,educationYear:Y23,educationType:ET,educationForm:EF,markingSystem:MS,semester_count:8,education_period:4,accepted:false,active:true},
];

/* ── UNIQUE FILTER VALUES ── */
const YEARS  = ["", ...new Set(RAW.map(r => r.educationYear.code))].map(c => c ? {code:c, name:RAW.find(r=>r.educationYear.code===c)?.educationYear.name||c} : {code:"",name:"Barcha yillar"});
const DEPTS  = [{id:"",name:"Barcha fakultetlar"}, ...Object.values(Object.fromEntries(RAW.map(r=>[r.department.id, r.department])))];

/* ── YEAR COLOR ── */
const yearColor = code => ({
  "2021":{bg:"#EDE9FE",color:C.purple},
  "2022":{bg:C.lightBlue,color:C.bright},
  "2023":{bg:C.greenLight,color:C.green},
  "2024":{bg:C.yellowLight,color:C.yellow},
}[code] || {bg:C.lightGray,color:C.mid});

/* ── AVATAR INITIALS ── */
const avatar = name => {
  const colors = [C.bright,C.purple,C.green,C.orange,C.teal,C.red];
  const idx    = name.charCodeAt(0) % colors.length;
  return { bg: colors[idx]+"18", color: colors[idx], initials: name.slice(0,2).toUpperCase() };
};

/* ── SELECT DROPDOWN ── */
const Sel = ({value,onChange,children,style}) => (
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 30px 8px 12px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:13,
        color:value?C.dark:C.light,background:C.white,cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={13} color={C.light}/>
    </div>
  </div>
);

/* ─────────────────────────────── MAIN ─────────────────────────────── */
export default function CurriculumPage() {
  const [items,      setItems]      = useState([]);
  const [pagination, setPagination] = useState({totalCount:179,pageSize:20,pageCount:9,page:1});
  const [loading,    setLoading]    = useState(false);
  const [search,     setSearch]     = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterAcc,  setFilterAcc]  = useState("");
  const [page,       setPage]       = useState(1);
  const [viewMode,   setViewMode]   = useState("table"); // "table" | "card"
  const [selected,   setSelected]   = useState([]);
  const [detailItem, setDetailItem] = useState(null);
  const [toast,      setToast]      = useState(null);
  const [sortField,  setSortField]  = useState("name");
  const [sortDir,    setSortDir]    = useState("asc");

  /* simulated fetch */
  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let data = [...RAW];
      if(search)     data = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.name.toLowerCase().includes(search.toLowerCase()));
      if(filterYear) data = data.filter(d => d.educationYear.code === filterYear);
      if(filterDept) data = data.filter(d => d.department.id === Number(filterDept));
      if(filterAcc === "true")  data = data.filter(d => d.accepted);
      if(filterAcc === "false") data = data.filter(d => !d.accepted);
      data.sort((a,b)=>{
        let va=a[sortField]||"", vb=b[sortField]||"";
        if(typeof va==="string") va=va.toLowerCase(), vb=vb.toLowerCase();
        return sortDir==="asc"?(va<vb?-1:va>vb?1:0):(va>vb?-1:va<vb?1:0);
      });
      const ps=15, total=data.length, start=(page-1)*ps;
      setItems(data.slice(start,start+ps));
      setPagination({totalCount:total,pageSize:ps,pageCount:Math.ceil(total/ps),page});
      setLoading(false);
      setSelected([]);
    }, 350);
  }, [search,filterYear,filterDept,filterAcc,page,sortField,sortDir]);

  useEffect(()=>{fetchData();},[fetchData]);

  const showToast = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const handleSort = f => { if(sortField===f) setSortDir(d=>d==="asc"?"desc":"asc"); else{setSortField(f);setSortDir("asc");} };
  const toggleSel  = id => setSelected(s => s.includes(id)?s.filter(c=>c!==id):[...s,id]);
  const selAll     = () => setSelected(s=>s.length===items.length?[]:items.map(i=>i.id));

  const SortIco = ({f}) => <span style={{marginLeft:3,fontSize:9,opacity:sortField===f?1:0.3,color:sortField===f?C.bright:C.light}}>{sortField===f&&sortDir==="desc"?"↓":"↑"}</span>;

  /* pagination */
  const pageNums = () => {
    const pc=pagination.pageCount, p=pagination.page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  /* stats */
  const stats = [
    {label:"Jami o'quv reja",  value:179,                          icon:I.book,   color:C.bright,  bg:C.lightBlue},
    {label:"Tasdiqlangan",      value:RAW.filter(r=>r.accepted).length, icon:I.check, color:C.green, bg:C.greenLight},
    {label:"Tasdiqlanmagan",    value:RAW.filter(r=>!r.accepted).length,icon:I.x,    color:C.red,   bg:C.redLight},
    {label:"Fakultetlar",       value:DEPTS.length-1,              icon:I.dept,   color:C.purple, bg:C.purpleLight},
  ];

  /* ── DETAIL MODAL ── */
  const DetailModal = () => {
    const d = detailItem;
    if(!d) return null;
    const av = avatar(d.name);
    const yc = yearColor(d.educationYear.code);
    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:22,width:"min(560px,95vw)",
          maxHeight:"88vh",overflow:"hidden",display:"flex",flexDirection:"column",
          boxShadow:"0 28px 64px rgba(13,26,99,0.22)",animation:"fadeUp 0.25s ease"}}>

          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:"20px 24px",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
              <div style={{display:"flex",gap:14,alignItems:"center"}}>
                <div style={{width:52,height:52,borderRadius:14,
                  background:"rgba(255,255,255,0.15)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:18,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",flexShrink:0}}>
                  {d.name.slice(0,2)}
                </div>
                <div>
                  <div style={{fontSize:20,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
                    {d.name}
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:20,
                      background:"rgba(255,255,255,0.18)",color:"rgba(255,255,255,0.9)"}}>
                      {d.educationType.name}
                    </span>
                    <span style={{fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:20,
                      background:"rgba(255,255,255,0.18)",color:"rgba(255,255,255,0.9)"}}>
                      {d.educationForm.name}
                    </span>
                    <span style={{fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:20,
                      background:d.accepted?"rgba(22,163,74,0.35)":"rgba(220,38,38,0.35)",
                      color:C.white}}>
                      {d.accepted?"✓ Tasdiqlangan":"✗ Tasdiqlanmagan"}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={()=>setDetailItem(null)}
                style={{width:32,height:32,borderRadius:9,border:"none",flexShrink:0,
                  background:"rgba(255,255,255,0.15)",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.x} size={15} color={C.white}/>
              </button>
            </div>
          </div>

          {/* body */}
          <div style={{overflowY:"auto",flex:1,padding:"20px 24px"}}>

            {/* Mutaxassislik */}
            <div style={{background:C.lightGray,borderRadius:14,padding:"14px 16px",marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>Mutaxassislik</div>
              <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:4}}>{d.specialty.name}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:C.white,
                  border:`1px solid ${C.gray}`,color:C.mid,fontWeight:600}}>
                  Kod: {d.specialty.code}
                </span>
                <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:C.white,
                  border:`1px solid ${C.gray}`,color:C.mid,fontWeight:600}}>
                  ID: {d.specialty.id}
                </span>
              </div>
            </div>

            {/* Asosiy ma'lumotlar grid */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[
                {icon:I.dept,    label:"Fakultet",          val:d.department.name,         color:C.bright},
                {icon:I.calendar,label:"O'quv yili",        val:d.educationYear.name,       color:C.purple},
                {icon:I.layers,  label:"Semestrlar soni",   val:`${d.semester_count} ta`,   color:C.green},
                {icon:I.clock,   label:"O'qish muddati",    val:`${d.education_period} yil`,color:C.orange},
                {icon:I.percent, label:"Min. ball chegarasi",val:`${d.markingSystem.minimum_limit} ball`,color:C.teal},
                {icon:I.award,   label:"GPA chegarasi",     val:d.markingSystem.gpa_limit,  color:C.yellow},
              ].map((r,i)=>(
                <div key={i} style={{background:C.lightGray,borderRadius:11,padding:"12px 14px",
                  display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,borderRadius:9,background:`${r.color}15`,flexShrink:0,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={r.icon} size={15} color={r.color}/>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:C.light,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{r.label}</div>
                    <div style={{fontSize:13,fontWeight:700,color:C.dark}}>{r.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Baholash tizimi */}
            <div style={{background:`linear-gradient(135deg,${C.lightBlue},${C.purpleLight})`,
              borderRadius:14,padding:"14px 16px",border:`1px solid ${C.bright}18`}}>
              <div style={{fontSize:10,fontWeight:700,color:C.bright,textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>
                Baholash tizimi
              </div>
              <div style={{fontSize:13,fontWeight:700,color:C.dark,marginBottom:8}}>
                {d.markingSystem.name}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {[
                  {l:"Min. ball",    v:`${d.markingSystem.minimum_limit}%`},
                  {l:"Yakuniy imtihon",v:`${d.markingSystem.count_final_exams ?? 3} ta`},
                  {l:"GPA limiti",  v:d.markingSystem.gpa_limit},
                ].map((x,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.7)",borderRadius:9,
                    padding:"6px 12px",textAlign:"center",flex:1,minWidth:80}}>
                    <div style={{fontSize:16,fontWeight:800,color:C.bright,fontFamily:"'Syne',sans-serif"}}>{x.v}</div>
                    <div style={{fontSize:10,color:C.mid,fontWeight:600}}>{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* footer */}
          <div style={{padding:"14px 24px",borderTop:`1px solid ${C.lightGray}`,
            display:"flex",gap:8,flexShrink:0}}>
            <button onClick={()=>{showToast("Tahrirlash ochildi","success");setDetailItem(null);}}
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

      {/* TOAST */}
      {toast && (
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,animation:"fadeUp 0.3s ease",
          background:C.white,borderLeft:`4px solid ${toast.type==="success"?C.green:C.red}`,
          borderRadius:10,padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark}}>
          <Ico d={toast.type==="success"?I.check:I.x} size={15} color={toast.type==="success"?C.green:C.red}/>
          {toast.msg}
        </div>
      )}

      <DetailModal/>

      <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              O'quv rejalari
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{pagination.totalCount}</b> ta reja •{" "}
              <span style={{color:C.green}}>{RAW.filter(r=>r.accepted).length} tasdiqlangan</span>{" "}•{" "}
              <span style={{color:C.red}}>{RAW.filter(r=>!r.accepted).length} kutilmoqda</span>
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* View toggle */}
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[{m:"table",i:I.list},{m:"card",i:I.grid}].map(({m,i})=>(
                <button key={m} onClick={()=>setViewMode(m)}
                  style={{width:30,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={fetchData}
              style={{padding:"8px 14px",borderRadius:10,border:`1.5px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                background:C.white,color:C.mid,display:"flex",alignItems:"center",gap:6}}>
              <Ico d={I.refresh} size={14} color={C.mid}/> Yangilash
            </button>
            <button onClick={()=>showToast("Yangi o'quv reja yaratish","success")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Yangi reja
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.icon} size={18} color={s.color}/>
              </div>
              <div>
                <div style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {s.value}
                </div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── YEAR TABS ── */}
        <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
          {YEARS.map(y=>{
            const active = filterYear === y.code;
            const yc     = y.code ? yearColor(y.code) : null;
            return (
              <button key={y.code} onClick={()=>{setFilterYear(y.code);setPage(1);}}
                style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:700,transition:"all 0.15s",
                  background: active ? (yc?yc.color:C.dark) : (yc?yc.bg:C.lightGray),
                  color: active ? C.white : (yc?yc.color:C.mid),
                  boxShadow: active ? `0 3px 10px ${yc?yc.color:C.dark}30` : "none"}}>
                {y.name}
              </button>
            );
          })}
        </div>

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,
          display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:180,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search}
              onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Guruh yoki mutaxassislik..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark,transition:"border-color 0.2s"}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterDept} onChange={e=>{setFilterDept(e.target.value);setPage(1);}} style={{minWidth:200}}>
            {DEPTS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
          </Sel>
          <Sel value={filterAcc} onChange={e=>{setFilterAcc(e.target.value);setPage(1);}} style={{minWidth:160}}>
            <option value="">Barcha holatlar</option>
            <option value="true">✓ Tasdiqlangan</option>
            <option value="false">⏳ Kutilmoqda</option>
          </Sel>
          {(search||filterDept||filterAcc) && (
            <button onClick={()=>{setSearch("");setFilterDept("");setFilterAcc("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* ── BULK ── */}
        {selected.length > 0 && (
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,borderRadius:12,
            padding:"10px 16px",marginBottom:12,display:"flex",alignItems:"center",
            justifyContent:"space-between",animation:"fadeUp 0.2s ease"}}>
            <span style={{fontSize:13,fontWeight:600,color:C.white}}>{selected.length} ta tanlandi</span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{showToast(`${selected.length} ta tasdiqlandi`,"success");setSelected([]);}}
                style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:600,background:C.greenLight,color:C.green}}>
                Tasdiqlash
              </button>
              <button onClick={()=>{showToast("O'chirildi","warning");setSelected([]);}}
                style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:600,background:C.redLight,color:C.red}}>
                O'chirish
              </button>
              <button onClick={()=>setSelected([])}
                style={{padding:"6px 10px",borderRadius:8,border:"none",cursor:"pointer",
                  background:"rgba(255,255,255,0.15)",color:C.white,fontSize:12}}>
                Bekor
              </button>
            </div>
          </div>
        )}

        {/* loading */}
        {loading && (
          <div style={{padding:"60px",textAlign:"center"}}>
            <div style={{width:36,height:36,borderRadius:"50%",margin:"0 auto 12px",
              border:`3px solid ${C.lightBlue}`,borderTopColor:C.bright,
              animation:"spin 0.8s linear infinite"}}/>
            <div style={{fontSize:13,color:C.light}}>Yuklanmoqda...</div>
          </div>
        )}

        {/* ═══════════ TABLE VIEW ═══════════ */}
        {!loading && viewMode==="table" && (
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
            {/* thead */}
            <div style={{display:"grid",
              gridTemplateColumns:"36px 60px 1fr 180px 120px 100px 90px 90px",
              padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
              <div style={{display:"flex",alignItems:"center"}}>
                <div onClick={selAll}
                  style={{width:16,height:16,borderRadius:4,cursor:"pointer",
                    border:`2px solid ${selected.length===items.length&&items.length>0?C.bright:C.gray}`,
                    background:selected.length===items.length&&items.length>0?C.bright:"transparent",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {selected.length===items.length&&items.length>0&&<Ico d={I.check} size={10} color={C.white} sw={3}/>}
                </div>
              </div>
              {[["#",""],["Guruh nomi","name"],["Mutaxassislik",""],["Fakultet",""],["O'quv yili",""],["Holat","accepted"],["Amallar",""]].map(([h,f],i)=>(
                <div key={i} onClick={()=>f&&handleSort(f)}
                  style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
                    letterSpacing:"0.8px",userSelect:"none",cursor:f?"pointer":"default",
                    display:"flex",alignItems:"center"}}>
                  {h}{f&&<SortIco f={f}/>}
                </div>
              ))}
            </div>

            {items.length===0 && (
              <div style={{padding:"48px",textAlign:"center"}}>
                <Ico d={I.book} size={40} color={C.gray}/>
                <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Natija topilmadi</div>
              </div>
            )}

            {items.map((item,idx)=>{
              const sel = selected.includes(item.id);
              const av  = avatar(item.name);
              const yc  = yearColor(item.educationYear.code);
              return (
                <div key={item.id}
                  style={{display:"grid",
                    gridTemplateColumns:"36px 60px 1fr 180px 120px 100px 90px 90px",
                    padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                    background:sel?`${C.lightBlue}55`:C.white,
                    transition:"background 0.15s",
                    animation:`fadeUp 0.25s ${idx*25}ms ease both`}}
                  onMouseEnter={e=>!sel&&(e.currentTarget.style.background=C.lightGray)}
                  onMouseLeave={e=>!sel&&(e.currentTarget.style.background=C.white)}>

                  {/* checkbox */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <div onClick={()=>toggleSel(item.id)}
                      style={{width:16,height:16,borderRadius:4,cursor:"pointer",
                        border:`2px solid ${sel?C.bright:C.gray}`,
                        background:sel?C.bright:"transparent",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {sel&&<Ico d={I.check} size={10} color={C.white} sw={3}/>}
                    </div>
                  </div>

                  {/* id */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:12,fontWeight:700,color:C.light}}>#{item.id}</span>
                  </div>

                  {/* name */}
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:32,height:32,borderRadius:9,background:av.bg,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:12,fontWeight:800,color:av.color}}>
                      {av.initials}
                    </div>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:C.dark}}>{item.name}</div>
                      <div style={{fontSize:11,color:C.light}}>{item.educationForm.name} • {item.educationType.name}</div>
                    </div>
                  </div>

                  {/* specialty */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.mid,lineHeight:1.4,
                      overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                      {item.specialty.name}
                    </span>
                  </div>

                  {/* dept */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.mid,lineHeight:1.4}}>{item.department.name}</span>
                  </div>

                  {/* year badge */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                      background:yc.bg,color:yc.color}}>
                      {item.educationYear.name}
                    </span>
                  </div>

                  {/* accepted */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                      background:item.accepted?C.greenLight:C.yellowLight,
                      color:item.accepted?C.green:C.yellow}}>
                      {item.accepted?"Tasdiqlangan":"Kutilmoqda"}
                    </span>
                  </div>

                  {/* actions */}
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <button onClick={()=>setDetailItem(item)}
                      style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                        background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center"}}
                      title="Ko'rish">
                      <Ico d={I.eye} size={13} color={C.bright}/>
                    </button>
                    <button onClick={()=>showToast("Tahrirlash ochildi","success")}
                      style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                        background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center"}}
                      title="Tahrirlash">
                      <Ico d={I.edit} size={13} color={C.green}/>
                    </button>
                    <button onClick={()=>showToast("O'chirildi","warning")}
                      style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                        background:C.redLight,display:"flex",alignItems:"center",justifyContent:"center"}}
                      title="O'chirish">
                      <Ico d={I.trash} size={13} color={C.red}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════ CARD VIEW ═══════════ */}
        {!loading && viewMode==="card" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {items.length===0 && (
              <div style={{gridColumn:"1/-1",padding:"48px",textAlign:"center",
                background:C.white,borderRadius:16,border:`1px solid ${C.gray}`}}>
                <div style={{fontSize:14,fontWeight:600,color:C.mid}}>Natija topilmadi</div>
              </div>
            )}
            {items.map((item,idx)=>{
              const av = avatar(item.name);
              const yc = yearColor(item.educationYear.code);
              return (
                <div key={item.id}
                  style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
                    overflow:"hidden",transition:"transform 0.2s, box-shadow 0.2s",
                    animation:`fadeUp 0.3s ${idx*40}ms ease both`}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(13,26,99,0.1)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>

                  {/* Card top stripe */}
                  <div style={{height:4,background:`linear-gradient(90deg,${av.color},${av.color}60)`}}/>

                  <div style={{padding:"16px"}}>
                    {/* name + badges */}
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{width:44,height:44,borderRadius:12,background:av.bg,flexShrink:0,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:15,fontWeight:800,color:av.color,fontFamily:"'Syne',sans-serif"}}>
                          {av.initials}
                        </div>
                        <div>
                          <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{item.name}</div>
                          <div style={{fontSize:11,color:C.light}}>{item.educationForm.name}</div>
                        </div>
                      </div>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:item.accepted?C.greenLight:C.yellowLight,
                        color:item.accepted?C.green:C.yellow,flexShrink:0}}>
                        {item.accepted?"✓ Tasdiqlangan":"⏳"}
                      </span>
                    </div>

                    {/* specialty */}
                    <div style={{fontSize:11,color:C.mid,lineHeight:1.5,marginBottom:12,
                      padding:"8px 10px",background:C.lightGray,borderRadius:8}}>
                      {item.specialty.name}
                    </div>

                    {/* info chips */}
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:yc.bg,color:yc.color}}>{item.educationYear.name}</span>
                      <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,
                        background:C.lightGray,color:C.mid}}>{item.semester_count} semestr</span>
                      <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,
                        background:C.lightGray,color:C.mid}}>{item.education_period} yil</span>
                      <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,
                        background:C.tealLight,color:C.teal}}>Min: {item.markingSystem.minimum_limit}%</span>
                    </div>

                    {/* dept */}
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14,
                      paddingTop:10,borderTop:`1px solid ${C.lightGray}`}}>
                      <Ico d={I.dept} size={12} color={C.light}/>
                      <span style={{fontSize:11,color:C.mid,fontWeight:500}}>{item.department.name}</span>
                    </div>

                    {/* actions */}
                    <div style={{display:"flex",gap:7}}>
                      <button onClick={()=>setDetailItem(item)}
                        style={{flex:1,padding:"7px",borderRadius:9,border:`1px solid ${C.gray}`,
                          cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                          background:C.white,color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                        <Ico d={I.eye} size={12} color={C.mid}/> Ko'rish
                      </button>
                      <button onClick={()=>showToast("Tahrirlash ochildi","success")}
                        style={{flex:1,padding:"7px",borderRadius:9,border:"none",
                          cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,
                          background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                          display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                        <Ico d={I.edit} size={12} color={C.white}/> Tahrirlash
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {!loading && pagination.pageCount > 1 && (
          <div style={{marginTop:16,display:"flex",alignItems:"center",
            justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{fontSize:12,color:C.light}}>
              Jami <b style={{color:C.dark}}>{pagination.totalCount}</b> ta •{" "}
              <b style={{color:C.dark}}>{(pagination.page-1)*pagination.pageSize+1}</b>–
              <b style={{color:C.dark}}>{Math.min(pagination.page*pagination.pageSize,pagination.totalCount)}</b> ko'rsatilmoqda
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
                    color:n===page?C.white:n==="..."?C.light:C.mid,transition:"all 0.15s"}}>
                  {n}
                </button>
              ))}
              <button disabled={page===pagination.pageCount} onClick={()=>setPage(p=>p+1)}
                style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:page===pagination.pageCount?"not-allowed":"pointer",background:C.white,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  opacity:page===pagination.pageCount?0.4:1}}>
                <Ico d={I.chevR} size={14} color={C.mid}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
