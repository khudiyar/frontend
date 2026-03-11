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
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  chevD:   "M6 9l6 6 6-6",
  chevL:   "M15 18l-6-6 6-6",
  chevR:   "M9 18l6-6-6-6",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  hash:    "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  sort:    "M3 6h18M7 12h10M11 18h2",
  calendar:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
};

/* ── parse subjects string → array ── */
const parseSubjects = str =>
  str.split(",")
    .map(s => s.replace(/\t+/g,"").trim())
    .filter(Boolean);

/* ── avatar color by employee id ── */
const AV_COLORS = [C.bright,C.purple,C.green,C.teal,C.orange,C.red,C.pink,C.navy,C.yellow];
const avColor   = id => AV_COLORS[id % AV_COLORS.length];
const initials  = name => name.trim().split(" ").slice(0,2).map(p=>p[0]).join("");

/* ── subject tag color (cycle by index) ── */
const TAG_PALETTE = [
  {bg:C.lightBlue,   color:C.bright},
  {bg:C.purpleLight, color:C.purple},
  {bg:C.tealLight,   color:C.teal},
  {bg:C.greenLight,  color:C.green},
  {bg:C.orangeLight, color:C.orange},
  {bg:C.yellowLight, color:C.yellow},
  {bg:C.pinkLight,   color:C.pink},
  {bg:C.redLight,    color:C.red},
];
const tagStyle = (i) => TAG_PALETTE[i % TAG_PALETTE.length];

/* ── REAL DATA ── */
const RAW = [
  {employee:{id:414,full_name:"ABATOVA GULNAZ POLATOVNA",employee_id_number:"5402512133"},subjects:"Aloqa tarmoqlari, Elektromagnit maydonlar va toʻlqinlar , Elektronika, robototexnikaning elektron elementlari va kuch elektronikasi, Infokommunikatsiya tizimlari va tarmoqlari, Mexatron modullarning va robotlarning yuritmalari, Simsiz tarmoqlar , Tarmoqlarni modellashtirish va simulyatsiyalash",educationYear:"2025"},
  {employee:{id:312,full_name:"ABDIMURATOVA ALTINGUL KALBAEVNA",employee_id_number:"3912112048"},subjects:"Iqtisodiyot nazariyasi 1,2, Sifat menejmenti, Tashkiliy hulq, Yashil iqtisodiyot\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",educationYear:"2025"},
  {employee:{id:274,full_name:"ABDINASIROVA NARGIZA ABDRASULIYEVNA",employee_id_number:"3912112005"},subjects:"Kompyuter ko'rish, Parallel kompyuter arxitekturasi va dasturlash",educationYear:"2025"},
  {employee:{id:35,full_name:"ABDIRAMANOVA ZAMIRA UZAKBAEVNA",employee_id_number:"3172212003"},subjects:"Energotexnologiya , Kimyoviy ishlab chiqarishni loyihalash (tanlov), Sanoat chiqindilarini tozalash texnologiyalari\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t, Sintetik yuvish vositalari texnologiyasi, Texnologik jarayonlar va qurilmallar (tarmoqlar buyicha)",educationYear:"2025"},
  {employee:{id:416,full_name:"ABDIRAZAKOV ISLAM AYNIYAZ ULI",employee_id_number:"5402511248"},subjects:"Asosiy texnologik jarayon va qurilmalar, Asosiy texnologik jarayon va qurilmalar\t, Noorganik moddalar kimyoviy texnologiyasi, Umumiy kimyoviy texnologiya",educationYear:"2025"},
  {employee:{id:31,full_name:"ABDIYEV JENISBAY GENJEBAYEVICH",employee_id_number:"3462111197"},subjects:"Dinshunoslik, Dinshunoslik\t",educationYear:"2025"},
  {employee:{id:498,full_name:"ABDULLAEV RUSLAN MAXSETBAY ULI",employee_id_number:"3982611004"},subjects:"Amaliy matematika1,2, Amallar tadqiqi asoslari, Dasturlash 1,2, Intellektual va ekspert tizimlari",educationYear:"2025"},
  {employee:{id:57,full_name:"ABDULLAEVA JAMILYA KENESBAEVNA",employee_id_number:"3172512003"},subjects:"Atrof-muhit muhandisligiga kirish, Biofizika, Chiqindilarni boshqarish, Ekologik menejment asoslari\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t, Ekologiya, Ekologiya asoslari, Hozirgi zamonning ekologik muammolari",educationYear:"2025"},
  {employee:{id:18,full_name:"ABDULLAYEV SULTANBEK BAXTIYAROVICH",employee_id_number:"3912311027"},subjects:"Da'sturiy ta'minot sifatini ta'minlash, Dasturlash 1,2, Dasturlash asoslari, Ma'lumotlarga dastlabki ishlov berish",educationYear:"2025"},
  {employee:{id:366,full_name:"ABDULLAYEVA DILNOZA INAVATULLA QIZI",employee_id_number:"5402512120"},subjects:"Elektr energiyasini uzatish, taqsimlash va istemoli, Elektr mashinalar va elektr yuritma asoslari , Elektr mexanik tizimlarni loyihalashni avtomatlashtirish, Elektrotexnika va elektronika asoslari, Elektr ta'minoti (Shaharlar va sanoat korxonalari),  Elektr yuritma va elektr mashinalar,  Energiya tejamkorligi  asoslari, Konchilik mashinasozligi asoslari, Nazariy elektrotexnika, O'ta kuchlanish va izolyatsiya, O'tkinchi jarayonlar, o'ta kuchlanish va izolyatsiya, O'tkinchi jarayonlar va o'ta kuchlanish",educationYear:"2025"},
  {employee:{id:251,full_name:"ABIBULLAEV SALAMAT ONGARBAEVICH",employee_id_number:"3912511005"},subjects:"Multiagent tizimlar, Signal va tasvirlarni qayta ishlash, Taqsimlangan tizimlari, Telekommunikatsiya tarmoqlaridagi IoT, Telekommunikatsiya tarmoqlari ekspluatatsiyasi va xizmat ko'rsatish",educationYear:"2025"},
  {employee:{id:303,full_name:"ABÍLOVA GULBAXAR JALGASBAEVNA",employee_id_number:"3912112045"},subjects:"Ilmiy ta'lim, Kreativ pedagogika, Masofaviy ta'lim texnologiyalari, Maxsus fanlarni o'qitish metodikasi, Neyro ta'lim asoslari, Operatsion tizimlar, Ta'limda elektron resurlarni yaratish texnologiyasi, Ta'limda raqamli texnologiyalar, Ta'limga kirish, Ta'lim nazariyasi",educationYear:"2025"},
  {employee:{id:92,full_name:"ABUBAKIROV AZIZJAN BAZARBAEVICH",employee_id_number:"3461611010"},subjects:"Ishlab chiqarishni tashkil qilish va avtomatlashtirishni rejalashtirish",educationYear:"2025"},
  {employee:{id:144,full_name:"ADILOVA NADIRA NURJANOVNA",employee_id_number:"4812312009"},subjects:"Xorijiy til, Xorijiy til , Xorijiy til 1,2, Xorijiy til1 (ingliz, fransuz, nemis, koreys, yapon, xitoy), Xorijiy til 2 (ingliz, fransuz, nemis, koreys, yapon, xitoy)",educationYear:"2025"},
  {employee:{id:229,full_name:"AGJANOV TIMUR-MUXAMMET SEYTNAZAROVICH",employee_id_number:"3172311014"},subjects:"Kompyuter tizimlari va tarmoqlari, Texnik tizimlarda axborot texnologiyalari, Texnik tizimlarda axborot texnologiyalari ",educationYear:"2025"},
  {employee:{id:24,full_name:"AIMBETOVA GULARA NURÍMBETOVNA",employee_id_number:"3912112009"},subjects:"Bioinformatika va biomexanika, Kompyuter ko'rish, Parallel kompyuter arxitekturasi va dasturlash",educationYear:"2025"},
  {employee:{id:430,full_name:"AITBAYEVA NURSULIU TAIRBEKOVNA",employee_id_number:"5402512139"},subjects:"Xorijiy til, Xorijiy til , Xorijiy til 1,2, Xorijiy til1 (ingliz, fransuz, nemis, koreys, yapon, xitoy), Xorijiy til 2 (ingliz, fransuz, nemis, koreys, yapon, xitoy)",educationYear:"2025"},
  {employee:{id:390,full_name:"AITIMBETOV KOYSHIBEK ORAZBEKOVICH",employee_id_number:"5402511233"},subjects:"Buxgalteriya hisobi va tamoyillari\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t, Moliya bozorlari\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t, Raqamli valyta\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",educationYear:"2025"},
  {employee:{id:351,full_name:"AITMURATOV MARAT TAJIMURATOVICH",employee_id_number:"5402511222"},subjects:"Elektrotexnika va elektronika",educationYear:"2025"},
  {employee:{id:44,full_name:"AKIMOVA AZIMA PERDEBAEVNA",employee_id_number:"3172112003"},subjects:"Barqaror rivojlanish asoslari , Ekologik monitoring, Ekologiya, Ekologiya , Ekologiya asoslari, Hozirgi zamonning ekologik muammolari, Ixtisoslikka kirish, Ixtisoslikka kirishish, Muhandislik ekologiyasi , Shahar va sanaot ekologiyasi \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",educationYear:"2025"},
];

/* ── enrich with parsed subjects & dedup ── */
const DATA = RAW.map(r => {
  const all  = parseSubjects(r.subjects);
  // deduplicate by lower-cased name
  const seen = new Set();
  const uniq = all.filter(s => {
    const k = s.toLowerCase();
    if(seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return {...r, subjectList: uniq};
});

const TOTAL = 396;

/* ── Avatar ── */
const Avatar = ({emp, size=44}) => {
  const col = avColor(emp.id);
  const ini = initials(emp.full_name);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:`linear-gradient(135deg,${col},${col}bb)`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.3,fontWeight:800,color:C.white,letterSpacing:"-0.5px",
      border:`2.5px solid ${col}30`}}>
      {ini}
    </div>
  );
};

/* ── Subject Tag ── */
const SubjTag = ({name, idx, small=false}) => {
  const {bg,color} = tagStyle(idx);
  return (
    <span style={{display:"inline-block",fontSize:small?9:10,fontWeight:600,
      padding:small?"2px 7px":"3px 9px",borderRadius:20,
      background:bg,color,lineHeight:1.4,whiteSpace:"nowrap"}}>
      {name}
    </span>
  );
};

/* ── Sel ── */
const Sel = ({value,onChange,children,style={}}) => (
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 28px 8px 12px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:13,
        color:value?C.dark:C.light,background:C.white,cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={13} color={C.light}/>
    </div>
  </div>
);

/* ── DETAIL MODAL ── */
function DetailModal({item, onClose}) {
  if(!item) return null;
  const col = avColor(item.employee.id);
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.44)",
        backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,animation:"fadeIn 0.18s ease"}}>
      <div style={{background:C.white,borderRadius:22,width:"min(520px,96vw)",
        maxHeight:"90vh",overflowY:"auto",
        boxShadow:"0 28px 70px rgba(13,26,99,0.22)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

        {/* header */}
        <div style={{background:`linear-gradient(135deg,${C.navy},${col})`,padding:"22px 24px",position:"sticky",top:0,zIndex:1}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <Avatar emp={item.employee} size={52}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:15,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                lineHeight:1.2,marginBottom:4}}>{item.employee.full_name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontFamily:"monospace"}}>
                {item.employee.employee_id_number}
              </div>
              <div style={{display:"flex",gap:8,marginTop:6}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:"rgba(255,255,255,0.2)",color:C.white}}>
                  {item.subjectList.length} ta fan
                </span>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:"rgba(255,255,255,0.15)",color:C.white}}>
                  {item.educationYear}-{Number(item.educationYear)+1}
                </span>
              </div>
            </div>
            <button onClick={onClose}
              style={{width:30,height:30,flexShrink:0,borderRadius:8,border:"none",cursor:"pointer",
                background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",
                alignSelf:"flex-start"}}>
              <Ico d={I.x} size={14} color={C.white}/>
            </button>
          </div>
        </div>

        {/* subjects */}
        <div style={{padding:"20px 24px",overflowY:"auto",maxHeight:"calc(90vh - 130px)"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
            letterSpacing:"0.8px",marginBottom:12}}>
            O'qitiladigan fanlar
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {item.subjectList.map((subj,idx)=>{
              const {bg,color} = tagStyle(idx);
              return (
                <div key={idx} style={{display:"flex",alignItems:"center",gap:10,
                  padding:"10px 12px",borderRadius:11,background:bg,
                  border:`1px solid ${color}20`}}>
                  <div style={{width:28,height:28,borderRadius:8,background:`${color}20`,flexShrink:0,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={I.book} size={12} color={color}/>
                  </div>
                  <span style={{fontSize:13,fontWeight:600,color:C.dark,lineHeight:1.3}}>{subj}</span>
                  <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,color,opacity:0.7,flexShrink:0}}>
                    #{idx+1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* info row */}
          <div style={{marginTop:16,padding:"12px",borderRadius:11,
            background:C.lightGray,border:`1px solid ${C.gray}`}}>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              {[
                ["ID", `#${item.employee.id}`],
                ["O'quv yili", `${item.educationYear}-${Number(item.educationYear)+1}`],
                ["Fanlar soni", `${item.subjectList.length} ta`],
              ].map(([k,v])=>(
                <div key={k}>
                  <div style={{fontSize:10,color:C.light,fontWeight:600}}>{k}</div>
                  <div style={{fontSize:13,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{padding:"12px 24px 20px",display:"flex",gap:8,borderTop:`1px solid ${C.lightGray}`}}>
          <button onClick={onClose}
            style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
              fontFamily:"inherit",fontSize:13,fontWeight:700,
              background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
            Tahrirlash
          </button>
          <button onClick={onClose}
            style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
              cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function ScheduleTeachersPage() {
  const [search,    setSearch]    = useState("");
  const [sortBy,    setSortBy]    = useState("name"); // name | count_asc | count_desc
  const [viewMode,  setViewMode]  = useState("card"); // card | table
  const [detail,    setDetail]    = useState(null);
  const [toast,     setToast]     = useState(null);
  const [page,      setPage]      = useState(1);
  const [expanded,  setExpanded]  = useState({}); // for table row expand
  const PAGE_CARD  = 12;
  const PAGE_TABLE = 15;

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };
  const PAGE = viewMode==="card" ? PAGE_CARD : PAGE_TABLE;

  /* filter + sort */
  const filtered = useMemo(()=>{
    let res = DATA.filter(r => {
      if(!search) return true;
      const q = search.toLowerCase();
      return r.employee.full_name.toLowerCase().includes(q)
          || r.employee.employee_id_number.includes(q)
          || r.subjectList.some(s=>s.toLowerCase().includes(q));
    });
    if(sortBy==="count_desc") res = [...res].sort((a,b)=>b.subjectList.length-a.subjectList.length);
    else if(sortBy==="count_asc") res = [...res].sort((a,b)=>a.subjectList.length-b.subjectList.length);
    else res = [...res].sort((a,b)=>a.employee.full_name.localeCompare(b.employee.full_name));
    return res;
  },[search,sortBy]);

  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);
  const pageNums  = ()=>{
    const pc=pageCount, p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  /* stats */
  const totalSubjectAssignments = DATA.reduce((s,r)=>s+r.subjectList.length,0);
  const avgSubjects = (totalSubjectAssignments/DATA.length).toFixed(1);
  const maxItem = DATA.reduce((m,r)=>r.subjectList.length>m.subjectList.length?r:m,DATA[0]);

  /* Pagination component */
  const Pagination = () => pageCount>1 ? (
    <div style={{marginTop:16,display:"flex",alignItems:"center",
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
  ) : null;

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
      <DetailModal item={detail} onClose={()=>setDetail(null)}/>

      <div style={{padding:"24px 28px",maxWidth:1300,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              O'qituvchilar jadvali
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{DATA.length}</b> •{" "}
              Jami: <b style={{color:C.dark}}>{TOTAL}</b> ta o'qituvchi •{" "}
              O'quv yili: <b style={{color:C.bright}}>2025-2026</b>
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[{m:"card",i:I.grid},{m:"table",i:I.list}].map(({m,i})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Export boshlandi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.layers} size={14} color={C.white}/> Export
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Jami o'qituvchi", v:TOTAL,                        c:C.bright, bg:C.lightBlue,   i:I.users},
            {l:"Ushbu sahifada",  v:DATA.length,                   c:C.teal,   bg:C.tealLight,   i:I.user},
            {l:"O'rtacha fan yuki",v:`${avgSubjects} ta`,          c:C.purple, bg:C.purpleLight, i:I.book},
            {l:"Eng ko'p fan",    v:`${maxItem.subjectList.length} ta`,c:C.orange,bg:C.orangeLight,i:I.tag},
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
          border:`1px solid ${C.gray}`,marginBottom:18,
          display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          {/* search */}
          <div style={{flex:1,minWidth:240,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="O'qituvchi ismi, ID yoki fan nomi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          {/* sort */}
          <Sel value={sortBy} onChange={e=>{setSortBy(e.target.value);setPage(1);}} style={{minWidth:190}}>
            <option value="name">Alifbo bo'yicha</option>
            <option value="count_desc">Ko'p fandan boshlab</option>
            <option value="count_asc">Kam fandan boshlab</option>
          </Sel>
          {search&&(
            <button onClick={()=>{setSearch("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
          <div style={{marginLeft:"auto",fontSize:12,color:C.light,flexShrink:0}}>
            {filtered.length} natija
          </div>
        </div>

        {/* ════════ CARD VIEW ════════ */}
        {viewMode==="card"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
              {paginated.map((item,idx)=>{
                const col   = avColor(item.employee.id);
                const count = item.subjectList.length;
                const shown = 4; // tags shown inline
                const extra = count - shown;

                return (
                  <div key={item.employee.id}
                    style={{background:C.white,borderRadius:18,overflow:"hidden",
                      border:`1.5px solid ${C.gray}`,transition:"all 0.18s",cursor:"pointer",
                      animation:`fadeUp 0.28s ${idx*35}ms ease both`}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=col;e.currentTarget.style.boxShadow=`0 10px 28px ${col}18`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="";}}>

                    {/* color stripe */}
                    <div style={{height:4,background:`linear-gradient(90deg,${col},${col}60)`}}/>

                    {/* employee info */}
                    <div style={{padding:"14px 16px 10px",display:"flex",alignItems:"center",gap:12}}>
                      <Avatar emp={item.employee} size={46}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:800,color:C.dark,
                          fontFamily:"'Syne',sans-serif",lineHeight:1.25,
                          overflow:"hidden",textOverflow:"ellipsis",
                          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                          {item.employee.full_name}
                        </div>
                        <div style={{fontSize:10,color:C.light,fontFamily:"monospace",marginTop:2}}>
                          {item.employee.employee_id_number}
                        </div>
                      </div>
                      {/* fan count badge */}
                      <div style={{width:40,height:40,borderRadius:11,background:`${col}15`,
                        border:`2px solid ${col}25`,flexShrink:0,
                        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                        <span style={{fontSize:16,fontWeight:800,color:col,
                          fontFamily:"'Syne',sans-serif",lineHeight:1}}>{count}</span>
                        <span style={{fontSize:7,color:col,fontWeight:700,textTransform:"uppercase"}}>fan</span>
                      </div>
                    </div>

                    {/* subject tags */}
                    <div style={{padding:"0 14px 14px",display:"flex",flexWrap:"wrap",gap:5}}>
                      {item.subjectList.slice(0,shown).map((subj,si)=>(
                        <SubjTag key={si} name={subj} idx={si} small/>
                      ))}
                      {extra>0&&(
                        <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,
                          background:C.lightGray,color:C.mid,cursor:"pointer"}}
                          onClick={e=>{e.stopPropagation();setDetail(item);}}>
                          +{extra} ta
                        </span>
                      )}
                    </div>

                    {/* footer */}
                    <div style={{padding:"10px 16px",borderTop:`1px solid ${C.lightGray}`,
                      display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                        background:C.greenLight,color:C.green}}>
                        2025-2026
                      </span>
                      <button
                        onClick={()=>setDetail(item)}
                        style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",
                          borderRadius:8,border:`1px solid ${C.gray}`,cursor:"pointer",
                          fontFamily:"inherit",fontSize:11,fontWeight:600,
                          background:C.white,color:C.mid,transition:"all 0.15s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background=`${col}10`;e.currentTarget.style.borderColor=col;e.currentTarget.style.color=col;}}
                        onMouseLeave={e=>{e.currentTarget.style.background=C.white;e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.color=C.mid;}}>
                        <Ico d={I.eye} size={11} color="currentColor"/>
                        Barchasi
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination/>
          </>
        )}

        {/* ════════ TABLE VIEW ════════ */}
        {viewMode==="table"&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              {/* thead */}
              <div style={{display:"grid",gridTemplateColumns:"52px 56px 1fr 80px 1fr 100px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["#","Foto","Ism-familya","ID","Fanlar","Yil"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>

              {paginated.map((item,idx)=>{
                const col   = avColor(item.employee.id);
                const open  = expanded[item.employee.id];
                const shown = 3;
                const extra = item.subjectList.length - shown;

                return (
                  <div key={item.employee.id}
                    style={{borderBottom:`1px solid ${C.lightGray}`,
                      animation:`fadeUp 0.22s ${idx*25}ms ease both`}}>
                    {/* main row */}
                    <div
                      style={{display:"grid",gridTemplateColumns:"52px 56px 1fr 80px 1fr 100px",
                        padding:"11px 16px",background:C.white,cursor:"pointer",transition:"background 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                      onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                      <div style={{display:"flex",alignItems:"center"}}>
                        <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{item.employee.id}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center"}}>
                        <Avatar emp={item.employee} size={34}/>
                      </div>
                      <div style={{display:"flex",alignItems:"center",paddingRight:8}}>
                        <div>
                          <div style={{fontSize:12,fontWeight:800,color:C.dark,lineHeight:1.2}}>
                            {item.employee.full_name}
                          </div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center"}}>
                        <span style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>
                          {item.employee.employee_id_number}
                        </span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",paddingRight:8}}>
                        {item.subjectList.slice(0,shown).map((s,si)=>(
                          <SubjTag key={si} name={s} idx={si} small/>
                        ))}
                        {extra>0&&(
                          <button
                            onClick={()=>setExpanded(p=>({...p,[item.employee.id]:!open}))}
                            style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,
                              background:open?`${col}15`:C.lightGray,color:open?col:C.mid,
                              border:`1px solid ${open?col+"30":C.gray}`,cursor:"pointer",fontFamily:"inherit"}}>
                            {open?"Yig'":"+"}{extra} ta
                          </button>
                        )}
                      </div>
                      <div style={{display:"flex",alignItems:"center"}}>
                        <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                          background:C.greenLight,color:C.green}}>2025-2026</span>
                      </div>
                    </div>

                    {/* expanded subjects */}
                    {open&&(
                      <div style={{padding:"10px 16px 14px 124px",background:`${col}05`,
                        borderTop:`1px dashed ${col}20`,display:"flex",flexWrap:"wrap",gap:6,
                        animation:"fadeUp 0.18s ease"}}>
                        {item.subjectList.slice(shown).map((s,si)=>(
                          <SubjTag key={si} name={s} idx={shown+si} small/>
                        ))}
                        <button onClick={()=>setDetail(item)}
                          style={{fontSize:9,fontWeight:700,padding:"2px 10px",borderRadius:20,
                            background:`${col}15`,color:col,border:`1px solid ${col}30`,
                            cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>
                          <Ico d={I.eye} size={9} color={col}/>Barchasini ko'rish
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Pagination/>
          </>
        )}

        {/* empty */}
        {filtered.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.users} size={48} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>
              Natija topilmadi
            </div>
            <div style={{fontSize:12,color:C.light,marginTop:4}}>
              Qidiruv so'zini o'zgartiring
            </div>
          </div>
        )}
      </div>
    </>
  );
}
