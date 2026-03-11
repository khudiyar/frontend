import { useState, useMemo } from "react";

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
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{to{transform:rotate(360deg)}}
  button,input,select,textarea{font-family:'DM Sans',sans-serif}
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
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  topic:   "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  lecture: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  lab:     "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 0-2-2v-4m0 0h18",
  practice:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 1 2 2",
  self:    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevL:   "M15 18l-6-6 6-6",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  drag:    "M8 6h.01M8 12h.01M8 18h.01M12 6h.01M12 12h.01M12 18h.01",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  info:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  hash:    "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
};

/* ── TRAINING TYPE ── */
const TRAIN = {
  11:{label:"Ma'ruza",    icon:I.lecture, color:C.bright, bg:C.lightBlue},
  12:{label:"Laboratoriya",icon:I.lab,   color:C.green,  bg:C.greenLight},
  13:{label:"Amaliy",     icon:I.practice,color:C.purple, bg:C.purpleLight},
  17:{label:"Mustaqil",   icon:I.self,   color:C.orange, bg:C.orangeLight},
};
const getTrain = c => TRAIN[c] || {label:"Boshqa",icon:I.book,color:C.mid,bg:C.lightGray};

/* ─────────────── FAKE DATA ─────────────── */
const SUBJECTS = [
  {id:168, code:"OM1203",    name:"Oliy matematika"},
  {id:169, code:"FIZ1306",   name:"Fizika"},
  {id:172, code:"MKG1204",   name:"Muhandislik va kompyuter grafikasi"},
  {id:175, code:"KSK113",    name:"Kon korxonalarini loyihalash"},
  {id:184, code:"KM1104",    name:"Kimyo"},
  {id:186, code:"GEOD1106",  name:"Geodeziya"},
];

const TOPIC_TEMPLATES = {
  168: [
    {n:"Haqiqiy sonlar. Ketma-ketliklar va ularning limiti",    t:11, load:2},
    {n:"Funksiyaning limiti. Uzluksizlik",                      t:11, load:2},
    {n:"Hosila va differensial. Differensialash qoidalari",     t:11, load:2},
    {n:"Hosila va differensialning tatbiqlari",                 t:11, load:2},
    {n:"Noaniq integral. Integrallash usullari",                t:11, load:2},
    {n:"Aniq integral va uning tatbiqlari",                     t:11, load:2},
    {n:"Amaliy mashg'ulot — limit hisoblash",                   t:13, load:2},
    {n:"Amaliy mashg'ulot — hosilalar",                        t:13, load:2},
    {n:"Amaliy mashg'ulot — integrallar",                      t:13, load:2},
    {n:"Mustaqil ish — Differensial tenglamalar",               t:17, load:4},
    {n:"Mustaqil ish — Ko'p o'zgaruvchili funksiyalar",         t:17, load:4},
  ],
  169: [
    {n:"Mexanikaning asosiy tushunchalari. Kinematika",         t:11, load:2},
    {n:"Dinamika. Nyuton qonunlari",                            t:11, load:2},
    {n:"Ish va energiya. Saqlanish qonunlari",                  t:11, load:2},
    {n:"Termodinamika asoslari",                                t:11, load:2},
    {n:"Elektr maydoni. Kulonning qonuni",                      t:11, load:2},
    {n:"Magnit maydon. Elektromagnit induksiya",                t:11, load:2},
    {n:"Laboratoriya: Og'irlik kuchini o'lchash",               t:12, load:2},
    {n:"Laboratoriya: Elektr qarshiligini o'lchash",            t:12, load:2},
    {n:"Amaliy: Mexanik masalalar",                             t:13, load:2},
    {n:"Mustaqil ish — Kvant fizikasi asoslari",                t:17, load:6},
  ],
  172: [
    {n:"AutoCAD muhiti. Asosiy buyruqlar",                      t:11, load:2},
    {n:"2D chizma va o'lchov qo'yish",                          t:11, load:2},
    {n:"3D modellash asoslari",                                 t:11, load:2},
    {n:"Loyiha hujjatlarini rasmiylash",                        t:11, load:2},
    {n:"Amaliy: Geometrik shakllar",                            t:13, load:2},
    {n:"Amaliy: Texnik chizma",                                 t:13, load:2},
    {n:"Mustaqil ish — Murakkab 3D model",                     t:17, load:4},
  ],
  175: [
    {n:"Kon korxonasini loyihalash bosqichlari",               t:11, load:2},
    {n:"Yer osti ishlari texnologiyasi",                        t:11, load:2},
    {n:"Portlatish ishlari va havfsizlik",                      t:11, load:2},
    {n:"Qazib olish uskunalari",                               t:11, load:2},
    {n:"Amaliy: Loyiha hisob-kitoblari",                       t:13, load:2},
    {n:"Mustaqil ish — Texnik-iqtisodiy tahlil",               t:17, load:4},
  ],
  184: [
    {n:"Kimyoning asosiy qonunlari",                           t:11, load:2},
    {n:"Davriy jadval va atom tuzilishi",                       t:11, load:2},
    {n:"Kimyoviy bog'lanish turlari",                           t:11, load:2},
    {n:"Eritmalar nazariyasi",                                  t:11, load:2},
    {n:"Laboratoriya: Kislota-ishqor reaksiyalari",            t:12, load:2},
    {n:"Laboratoriya: Oksidlanish-qaytarilish",                t:12, load:2},
    {n:"Amaliy: Mollyar konsentratsiya hisoblash",             t:13, load:2},
    {n:"Mustaqil ish — Organik kimyo asoslari",                t:17, load:4},
  ],
  186: [
    {n:"Geodeziya predmeti va tarixi",                         t:11, load:2},
    {n:"O'lchov asboblari. Teodolitlar",                       t:11, load:2},
    {n:"Nivelirování. Gorizont aniqlash",                      t:11, load:2},
    {n:"Topografik suratga olish",                             t:11, load:2},
    {n:"Laboratoriya: Teodolitni moslash",                     t:12, load:2},
    {n:"Laboratoriya: Nivelirlash ishlari",                    t:12, load:2},
    {n:"Amaliy: Maydon o'lchov hisob-kitoblari",               t:13, load:2},
    {n:"Mustaqil ish — Kartografiya asoslari",                 t:17, load:4},
  ],
};

/* ── Generate fake RAW data ── */
let _id = 1;
const RAW = [];
SUBJECTS.forEach((subj, si) => {
  const sem = 11 + si % 3; // 11,12,13
  const cur = 1 + si % 5;
  const dept= 13 + si % 3;
  const templates = TOPIC_TEMPLATES[subj.id] || [];
  templates.forEach((tpl, pos) => {
    RAW.push({
      id: _id++,
      _semester: sem,
      _curriculum: cur,
      _department: dept,
      _training_type: tpl.t,
      subject: subj,
      name: tpl.n,
      active: true,
      topic_load: tpl.load,
      position: pos + 1,
      created_at: 1739540000 + pos * 3600,
      updated_at: 1739540000 + pos * 3600,
    });
  });
});

const SEM_COLORS = [
  {bg:"#EDE9FE",color:C.purple},
  {bg:"#EEF2FF",color:C.bright},
  {bg:"#F0FDF4",color:C.green},
  {bg:"#FFFBEB",color:C.yellow},
];
const semColor = c => SEM_COLORS[(c-11)%SEM_COLORS.length] || SEM_COLORS[0];

const SUBJECT_COLORS = [C.bright,C.purple,C.green,C.teal,C.orange,C.red];
const subjColor = idx => SUBJECT_COLORS[idx % SUBJECT_COLORS.length];

/* ── SELECT ── */
const Sel = ({value,onChange,children,style})=>(
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

/* ─────────────────────── MAIN ─────────────────────── */
export default function TopicListPage() {
  const [search,      setSearch]      = useState("");
  const [filterTrain, setFilterTrain] = useState("");
  const [filterSubj,  setFilterSubj]  = useState("");
  const [filterSem,   setFilterSem]   = useState("");
  const [expanded,    setExpanded]    = useState({});
  const [detailItem,  setDetailItem]  = useState(null);
  const [toast,       setToast]       = useState(null);
  const [viewMode,    setViewMode]    = useState("subject"); // "subject"|"table"
  const [page,        setPage]        = useState(1);
  const PAGE = 15;

  const showToast = (msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  /* ── FILTER ── */
  const filtered = useMemo(()=>RAW.filter(r=>{
    const ms = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.subject.name.toLowerCase().includes(search.toLowerCase()) || r.subject.code.toLowerCase().includes(search.toLowerCase());
    const mt = !filterTrain || r._training_type === Number(filterTrain);
    const ms2= !filterSubj  || r.subject.id === Number(filterSubj);
    const msm= !filterSem   || r._semester === Number(filterSem);
    return ms&&mt&&ms2&&msm;
  }),[search,filterTrain,filterSubj,filterSem]);

  /* ── GROUP BY SUBJECT ── */
  const bySubject = useMemo(()=>{
    const map = {};
    filtered.forEach(r=>{
      if(!map[r.subject.id]) map[r.subject.id]={subject:r.subject, items:[]};
      map[r.subject.id].items.push(r);
    });
    const arr = Object.values(map);
    arr.forEach(g=>g.items.sort((a,b)=>a.position-b.position));
    return arr;
  },[filtered]);

  /* ── TABLE ── */
  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);
  const pageNums  = ()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  const toggleExp = id => setExpanded(p=>({...p,[id]:p[id]===false}));
  const isExp = id => expanded[id] !== false;

  /* ── STATS ── */
  const totalLoad   = RAW.reduce((s,r)=>s+r.topic_load,0);
  const uniqSubj    = new Set(RAW.map(r=>r.subject.id)).size;
  const uniqSems    = new Set(RAW.map(r=>r._semester)).size;

  /* ── DETAIL MODAL ── */
  const DetailModal = () => {
    const d = detailItem;
    if(!d) return null;
    const tc = getTrain(d._training_type);
    const sc = semColor(d._semester);
    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:20,width:"min(480px,95vw)",
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:"18px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:"rgba(255,255,255,0.2)",color:C.white}}>{tc.label}</span>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:sc.bg+"33",color:C.white}}>
                    {d._semester}-semestr kodi
                  </span>
                </div>
                <div style={{fontSize:16,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",lineHeight:1.4,marginBottom:4}}>
                  {d.name}
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>
                  {d.subject.name} • {d.subject.code}
                </div>
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
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
              {[
                {l:"Tartib raqam", v:`#${d.position}`,    c:C.bright},
                {l:"Soat",         v:`${d.topic_load}s`,  c:C.purple},
                {l:"Holat",        v:d.active?"Faol":"Nofaol", c:d.active?C.green:C.red},
              ].map((s,i)=>(
                <div key={i} style={{background:C.lightGray,borderRadius:10,padding:"12px",textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:800,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
                  <div style={{fontSize:9,color:C.light,fontWeight:600,marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>

            {[
              ["Fan",           d.subject.name],
              ["Fan kodi",      d.subject.code],
              ["Dars turi",     tc.label],
              ["Semestr",       `${d._semester}-semestr kodi`],
              ["Curriculum ID", `#${d._curriculum}`],
              ["Kafedra ID",    `#${d._department}`],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"7px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:700,textAlign:"right",maxWidth:"60%"}}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{padding:"12px 22px",borderTop:`1px solid ${C.lightGray}`,display:"flex",gap:8}}>
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
          background:C.white,borderLeft:`4px solid ${C.green}`,
          borderRadius:10,padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark,
          animation:"fadeUp 0.3s ease"}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast.msg}
        </div>
      )}

      <DetailModal/>

      <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Mavzular ro'yxati
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{RAW.length}</b> ta mavzu •{" "}
              {uniqSubj} ta fan • {uniqSems} ta semestr
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* View toggle */}
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[{m:"subject",i:I.layers},{m:"table",i:I.topic}].map(({m,i})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi mavzu qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Mavzu qo'shish
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {label:"Jami mavzular", value:RAW.length,        icon:I.topic,  color:C.bright, bg:C.lightBlue},
            {label:"Fanlar",        value:uniqSubj,           icon:I.book,   color:C.purple, bg:C.purpleLight},
            {label:"Jami soatlar",  value:`${totalLoad}s`,    icon:I.clock,  color:C.green,  bg:C.greenLight},
            {label:"Semestrlar",    value:uniqSems,           icon:I.layers, color:C.orange, bg:C.orangeLight},
          ].map((s,i)=>(
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

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Mavzu yoki fan nomi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterSubj} onChange={e=>{setFilterSubj(e.target.value);setPage(1);}} style={{minWidth:200}}>
            <option value="">Barcha fanlar</option>
            {SUBJECTS.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </Sel>
          <Sel value={filterTrain} onChange={e=>{setFilterTrain(e.target.value);setPage(1);}} style={{minWidth:150}}>
            <option value="">Barcha turlar</option>
            <option value="11">Ma'ruza</option>
            <option value="12">Laboratoriya</option>
            <option value="13">Amaliy</option>
            <option value="17">Mustaqil</option>
          </Sel>
          <Sel value={filterSem} onChange={e=>{setFilterSem(e.target.value);setPage(1);}} style={{minWidth:140}}>
            <option value="">Barcha semestr</option>
            <option value="11">1-semestr</option>
            <option value="12">2-semestr</option>
            <option value="13">3-semestr</option>
          </Sel>
          {(search||filterTrain||filterSubj||filterSem)&&(
            <button onClick={()=>{setSearch("");setFilterTrain("");setFilterSubj("");setFilterSem("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* ═══ FAN BO'YICHA KO'RINISH ═══ */}
        {viewMode==="subject" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {bySubject.length===0&&(
              <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
                padding:"60px",textAlign:"center"}}>
                <Ico d={I.topic} size={48} color={C.gray}/>
                <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Mavzu topilmadi</div>
              </div>
            )}
            {bySubject.map((grp, gi)=>{
              const sc   = subjColor(gi);
              const open = isExp(grp.subject.id);
              const byType = {};
              grp.items.forEach(i=>{ if(!byType[i._training_type]) byType[i._training_type]=[]; byType[i._training_type].push(i); });
              const totalLoad = grp.items.reduce((s,r)=>s+r.topic_load,0);

              return (
                <div key={grp.subject.id} style={{animation:`fadeUp 0.3s ${gi*50}ms ease both`}}>

                  {/* Subject header */}
                  <div onClick={()=>toggleExp(grp.subject.id)}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      background:C.white,borderRadius:open?"14px 14px 0 0":14,
                      border:`1px solid ${C.gray}`,
                      borderBottom:open?`1px solid ${C.lightGray}`:`1px solid ${C.gray}`,
                      padding:"14px 18px",cursor:"pointer",userSelect:"none",transition:"background 0.15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:40,height:40,borderRadius:12,
                        background:`${sc}15`,border:`2px solid ${sc}25`,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.book} size={18} color={sc}/>
                      </div>
                      <div>
                        <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>
                          {grp.subject.name}
                        </div>
                        <div style={{fontSize:11,color:C.light,marginTop:1,fontFamily:"monospace"}}>
                          {grp.subject.code} • {grp.items.length} ta mavzu
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      {/* type pills */}
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {Object.entries(byType).map(([tt,items])=>{
                          const tc=getTrain(Number(tt));
                          return (
                            <span key={tt} style={{fontSize:10,fontWeight:700,padding:"2px 8px",
                              borderRadius:20,background:tc.bg,color:tc.color}}>
                              {tc.label} {items.length}
                            </span>
                          );
                        })}
                      </div>
                      <div style={{textAlign:"center",minWidth:40}}>
                        <div style={{fontSize:15,fontWeight:800,color:sc,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{totalLoad}s</div>
                        <div style={{fontSize:9,color:C.light,fontWeight:600}}>soat</div>
                      </div>
                      <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"transform 0.2s",transform:open?"rotate(90deg)":"rotate(0deg)"}}>
                        <Ico d={I.chevR} size={14} color={C.mid}/>
                      </div>
                    </div>
                  </div>

                  {/* Topics inside */}
                  {open && (
                    <div style={{border:`1px solid ${C.gray}`,borderTop:"none",
                      borderRadius:"0 0 14px 14px",background:`${sc}05`}}>
                      {Object.entries(byType).map(([tt, items])=>{
                        const tc = getTrain(Number(tt));
                        return (
                          <div key={tt}>
                            {/* Training type subheader */}
                            <div style={{display:"flex",alignItems:"center",gap:8,
                              padding:"10px 18px 6px",
                              borderBottom:`1px solid ${C.lightGray}`}}>
                              <div style={{width:24,height:24,borderRadius:7,background:tc.bg,
                                display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <Ico d={tc.icon} size={12} color={tc.color}/>
                              </div>
                              <span style={{fontSize:11,fontWeight:700,color:tc.color,textTransform:"uppercase",letterSpacing:"0.8px"}}>
                                {tc.label}
                              </span>
                              <span style={{fontSize:10,color:C.light}}>{items.length} mavzu</span>
                            </div>

                            {/* Topic rows */}
                            {items.map((item, idx)=>(
                              <div key={item.id}
                                style={{display:"flex",alignItems:"center",gap:12,
                                  padding:"10px 18px",
                                  borderBottom:`1px solid ${C.lightGray}`,
                                  background:C.white,transition:"background 0.12s",
                                  animation:`fadeUp 0.2s ${idx*20}ms ease both`}}
                                onMouseEnter={e=>e.currentTarget.style.background=`${sc}06`}
                                onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                                {/* Position */}
                                <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,flexShrink:0,
                                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                                  <span style={{fontSize:11,fontWeight:800,color:C.mid}}>{item.position}</span>
                                </div>

                                {/* Name */}
                                <div style={{flex:1}}>
                                  <span style={{fontSize:13,fontWeight:600,color:C.dark}}>{item.name}</span>
                                </div>

                                {/* Load */}
                                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                                  <div style={{display:"flex",alignItems:"center",gap:4,
                                    padding:"3px 10px",borderRadius:20,background:C.lightGray}}>
                                    <Ico d={I.clock} size={11} color={C.light}/>
                                    <span style={{fontSize:12,fontWeight:700,color:C.dark}}>{item.topic_load}s</span>
                                  </div>

                                  {/* Active badge */}
                                  <span style={{width:7,height:7,borderRadius:"50%",
                                    background:item.active?C.green:C.red,flexShrink:0,display:"inline-block"}}/>

                                  {/* Actions */}
                                  <button onClick={()=>setDetailItem(item)}
                                    style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                                      background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center"}}
                                    title="Ko'rish">
                                    <Ico d={I.eye} size={12} color={C.bright}/>
                                  </button>
                                  <button onClick={()=>showToast("Tahrirlash ochildi")}
                                    style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                                      background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center"}}
                                    title="Tahrirlash">
                                    <Ico d={I.edit} size={12} color={C.green}/>
                                  </button>
                                  <button onClick={()=>showToast("O'chirildi","warning")}
                                    style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                                      background:C.redLight,display:"flex",alignItems:"center",justifyContent:"center"}}
                                    title="O'chirish">
                                    <Ico d={I.trash} size={12} color={C.red}/>
                                  </button>
                                </div>
                              </div>
                            ))}
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

        {/* ═══ TABLE KO'RINISH ═══ */}
        {viewMode==="table" && (
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",
                gridTemplateColumns:"44px 36px 1fr 160px 120px 70px 60px 90px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["#","№","Mavzu nomi","Fan","Dars turi","Soat","Holat","Amallar"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>
                    {h}
                  </div>
                ))}
              </div>

              {paginated.length===0&&(
                <div style={{padding:"48px",textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:600,color:C.mid}}>Mavzu topilmadi</div>
                </div>
              )}

              {paginated.map((item, idx)=>{
                const tc  = getTrain(item._training_type);
                const sc2 = SUBJECT_COLORS[SUBJECTS.findIndex(s=>s.id===item.subject.id)%SUBJECT_COLORS.length];
                return (
                  <div key={item.id}
                    style={{display:"grid",
                      gridTemplateColumns:"44px 36px 1fr 160px 120px 70px 60px 90px",
                      padding:"10px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,transition:"background 0.15s",
                      animation:`fadeUp 0.22s ${idx*20}ms ease both`}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,color:C.light,fontWeight:700}}>#{item.id}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{width:24,height:24,borderRadius:7,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:11,fontWeight:800,color:C.mid}}>{item.position}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:12,fontWeight:600,color:C.dark,lineHeight:1.4}}>{item.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,color:sc2,fontWeight:700,
                        overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                        {item.subject.name}
                      </span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:tc.bg,color:tc.color,display:"inline-flex",alignItems:"center",gap:4}}>
                        <Ico d={tc.icon} size={9} color={tc.color}/>{tc.label}
                      </span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:13,fontWeight:700,color:C.dark}}>
                        {item.topic_load}<span style={{fontSize:10,color:C.light}}>s</span>
                      </span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{width:7,height:7,borderRadius:"50%",background:item.active?C.green:C.red}}/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <button onClick={()=>setDetailItem(item)}
                        style={{width:26,height:26,borderRadius:7,border:"none",cursor:"pointer",
                          background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.eye} size={12} color={C.bright}/>
                      </button>
                      <button onClick={()=>showToast("Tahrirlash ochildi")}
                        style={{width:26,height:26,borderRadius:7,border:"none",cursor:"pointer",
                          background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.edit} size={12} color={C.green}/>
                      </button>
                      <button onClick={()=>showToast("O'chirildi","warning")}
                        style={{width:26,height:26,borderRadius:7,border:"none",cursor:"pointer",
                          background:C.redLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.trash} size={12} color={C.red}/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            {pageCount>1&&(
              <div style={{marginTop:14,display:"flex",alignItems:"center",
                justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div style={{fontSize:12,color:C.light}}>
                  <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
                  <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>{" "}
                  / <b style={{color:C.dark}}>{filtered.length}</b>
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
                  <button disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===pageCount?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      opacity:page===pageCount?0.4:1}}>
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
