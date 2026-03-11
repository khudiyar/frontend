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
  ::-webkit-scrollbar{width:5px}
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
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  x:      "M18 6L6 18M6 6l12 12",
  chevD:  "M6 9l6 6 6-6",
  chevL:  "M15 18l-6-6 6-6",
  chevR:  "M9 18l6-6-6-6",
  check:  "M20 6L9 17l-5-5",
  plus:   "M12 5v14M5 12h14",
  book:   "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  grid:   "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  list:   "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  tag:    "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  hash:   "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:  "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  copy:   "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-4-4H8zM14 2v6h6",
};

/* ── SUBJECT GROUP config ── */
const SG = {
  "01": {name:"Majburiy fanlar",           color:C.bright, bg:C.lightBlue,   short:"Majburiy"},
  "04": {name:"Ixtisoslik fanlar",          color:C.purple, bg:C.purpleLight, short:"Ixtisoslik"},
  "13": {name:"Ilmiy faoliyat",             color:C.teal,   bg:C.tealLight,   short:"Ilmiy"},
  "14": {name:"IT/Mutaxassislik tanlov",    color:C.orange, bg:C.orangeLight, short:"IT Tanlov"},
  "15": {name:"Ochiq tanlov fan",           color:C.green,  bg:C.greenLight,  short:"Ochiq tanlov"},
  "16": {name:"Majburiy",                   color:C.navy,   bg:C.lightBlue,   short:"Majburiy*"},
};
const getSG = code => SG[code] || {name:code,color:C.mid,bg:C.lightGray,short:code};

/* ── EDUCATION TYPE config ── */
const ET = {
  "11": {name:"Bakalavr",    color:C.bright, bg:C.lightBlue,   icon:"🎓"},
  "12": {name:"Magistr",     color:C.purple, bg:C.purpleLight, icon:"🏅"},
  "13": {name:"Doktorantura",color:C.teal,   bg:C.tealLight,   icon:"📜"},
};
const getET = code => ET[code] || {name:code,color:C.mid,bg:C.lightGray,icon:"📚"};

/* ── REAL DATA ── */
const RAW = [
  {id:1447,code:"MATT1206",name:"Mashinasozlikda aniqlik va uni texnologik ta'minoti",active:true,subjectGroup:{code:"01",name:"Majburiy fanlar"},educationType:{code:"12",name:"Magistr"}},
  {id:1446,code:"EENHAT271",name:"Elektr energiyasi nazorati va hisobning avtomatlashtirilgan tizimlari",active:true,subjectGroup:{code:"15",name:"Ochiq tanlov fan"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1445,code:"EEA1404",name:"Elektrotexnika va elektronika asoslari",active:true,subjectGroup:{code:"01",name:"Majburiy fanlar"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1444,code:"SPEE16TBK-DI",name:"Muammo tahlili va yechim",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1443,code:"SOQA14MBK*",name:"Dasturiy ta'minot sifatini ta'minlash",active:true,subjectGroup:{code:"01",name:"Majburiy fanlar"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1442,code:"SPEE16TBK-AX-24",name:"Hujum insidentlari va unga reaktsiya",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1441,code:"AIMLT",name:"Sun'iy intellekt va mashinali o'qitish texnologiyalari",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1440,code:"OPNE14TBK3",name:"Ekologiya",active:true,subjectGroup:{code:"15",name:"Ochiq tanlov fan"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1439,code:"INDP12MBK-AX",name:"Individual loyiha",active:true,subjectGroup:{code:"13",name:"Ilmiy faoliyat"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1438,code:"OGM2606",name:"Obyektlarni geometrik modellashtirish va renderlash",active:true,subjectGroup:{code:"16",name:"Majburiy"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1437,code:"UXD2606",name:"UX dizayn",active:true,subjectGroup:{code:"16",name:"Majburiy"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1436,code:"SPEYe16TBK*",name:"3D texnologiyalari",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1435,code:"SPEYe16TBK",name:"Tasvirlarni qayta ishlash",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1434,code:"SPEE16TBK-AX-25",name:"Hujum insidentlari va unga reaktsiya",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1433,code:"SWAR16MBK*",name:"Dasturiy ta'minot arxitekturasi",active:true,subjectGroup:{code:"16",name:"Majburiy"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1432,code:"SOQA14MBK",name:"Da'sturiy ta'minot sifatini ta'minlash",active:true,subjectGroup:{code:"14",name:"IT/Mutaxassislik tanlov fanlari"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1431,code:"MADE16MBK",name:"Mobil ilovalarini ishlab chiqish",active:true,subjectGroup:{code:"04",name:"Ixtisoslik fanlar"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1430,code:"NSEC14MBK",name:"Tarmoq xavfsizligi",active:true,subjectGroup:{code:"01",name:"Majburiy fanlar"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1429,code:"INDP14MBK",name:"Individual loyiha",active:true,subjectGroup:{code:"04",name:"Ixtisoslik fanlar"},educationType:{code:"11",name:"Bakalavr"}},
  {id:1428,code:"DOKABAT2204",name:"Dastgohlar va dastgohli komplekslarni avtomatik boshqarish va adaptiv tizimlar",active:true,subjectGroup:{code:"15",name:"Ochiq tanlov fan"},educationType:{code:"12",name:"Magistr"}},
];

const TOTAL = 1439;

/* ── Sel ── */
const Sel = ({value,onChange,children,style={}})=>(
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

/* ── active toggle ── */
const Toggle = ({value,onChange})=>(
  <div onClick={()=>onChange(!value)}
    style={{width:36,height:20,borderRadius:10,cursor:"pointer",transition:"background .2s",
      background:value?C.green:C.gray,position:"relative",flexShrink:0}}>
    <div style={{position:"absolute",top:2,left:value?18:2,width:16,height:16,
      borderRadius:"50%",background:C.white,transition:"left .2s",
      boxShadow:"0 1px 4px rgba(0,0,0,.15)"}}/>
  </div>
);

/* ── DETAIL MODAL ── */
function DetailModal({item,onClose}){
  if(!item) return null;
  const sg = getSG(item.subjectGroup.code);
  const et = getET(item.educationType.code);
  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,.44)",
        backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,animation:"fadeIn .18s ease"}}>
      <div style={{background:C.white,borderRadius:22,width:"min(480px,96vw)",
        boxShadow:"0 28px 70px rgba(13,26,99,.22)",animation:"fadeUp .22s ease",overflow:"hidden"}}>

        {/* header */}
        <div style={{background:`linear-gradient(135deg,${C.navy},${sg.color})`,padding:"22px 24px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:"rgba(255,255,255,.2)",color:C.white}}>{et.icon} {et.name}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:"rgba(255,255,255,.15)",color:C.white}}>{sg.short}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:item.active?"rgba(22,163,74,.4)":"rgba(220,38,38,.4)",color:C.white}}>
                  {item.active?"Faol":"Nofaol"}
                </span>
              </div>
              <div style={{fontSize:16,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                lineHeight:1.3,marginBottom:6}}>{item.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.55)",fontFamily:"monospace"}}>
                {item.code}
              </div>
            </div>
            <button onClick={onClose}
              style={{width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",flexShrink:0,
                background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.x} size={14} color={C.white}/>
            </button>
          </div>
        </div>

        {/* body */}
        <div style={{padding:"20px 24px"}}>
          {[
            ["Fan ID",        `#${item.id}`],
            ["Kod",           item.code],
            ["Ta'lim turi",   `${et.icon} ${et.name}`],
            ["Fan guruhi",    item.subjectGroup.name],
            ["Guruh kodi",    item.subjectGroup.code],
            ["Holat",         item.active?"✅ Faol":"❌ Nofaol"],
          ].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"9px 0",borderBottom:`1px solid ${C.lightGray}`}}>
              <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
              <span style={{fontSize:13,fontWeight:700,color:C.dark,textAlign:"right",maxWidth:280,
                fontFamily:k==="Kod"?"monospace":"inherit"}}>{v}</span>
            </div>
          ))}

          {/* badges block */}
          <div style={{marginTop:16,display:"flex",gap:8,flexWrap:"wrap"}}>
            <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20,
              background:sg.bg,color:sg.color}}>{sg.name}</span>
            <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20,
              background:et.bg,color:et.color}}>{et.name}</span>
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
export default function SubjectMetaPage(){
  const [search,      setSearch]      = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [filterEdu,   setFilterEdu]   = useState("");
  const [filterActive,setFilterActive]= useState("");
  const [viewMode,    setViewMode]    = useState("card"); // card | table | group
  const [detail,      setDetail]      = useState(null);
  const [toast,       setToast]       = useState(null);
  const [page,        setPage]        = useState(1);
  const [openGroups,  setOpenGroups]  = useState({});
  const PAGE = viewMode==="card" ? 12 : 15;

  const showToast = msg=>{ setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* filter */
  const filtered = useMemo(()=>RAW.filter(r=>{
    if(search){
      const q=search.toLowerCase();
      if(!r.name.toLowerCase().includes(q)&&!r.code.toLowerCase().includes(q)) return false;
    }
    if(filterGroup  && r.subjectGroup.code!==filterGroup) return false;
    if(filterEdu    && r.educationType.code!==filterEdu)  return false;
    if(filterActive==="1" && !r.active)  return false;
    if(filterActive==="0" && r.active)   return false;
    return true;
  }),[search,filterGroup,filterEdu,filterActive]);

  const paginated  = filtered.slice((page-1)*PAGE,page*PAGE);
  const pageCount  = Math.ceil(filtered.length/PAGE);
  const hasFilter  = search||filterGroup||filterEdu||filterActive;
  const clearAll   = ()=>{ setSearch("");setFilterGroup("");setFilterEdu("");setFilterActive("");setPage(1); };

  /* group by subjectGroup */
  const byGroup = useMemo(()=>{
    const m={};
    filtered.forEach(r=>{
      const k=r.subjectGroup.code;
      if(!m[k]) m[k]={...getSG(k),code:k,items:[]};
      m[k].items.push(r);
    });
    return Object.values(m).sort((a,b)=>b.items.length-a.items.length);
  },[filtered]);

  /* stats */
  const bak   = RAW.filter(r=>r.educationType.code==="11").length;
  const mag   = RAW.filter(r=>r.educationType.code==="12").length;
  const grps  = new Set(RAW.map(r=>r.subjectGroup.code)).size;
  const activeCount = RAW.filter(r=>r.active).length;

  const pageNums=()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  const Pagination=()=>pageCount>1?(
    <div style={{marginTop:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div style={{fontSize:12,color:C.light}}>
        <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
        <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>
        {" "}/ <b style={{color:C.dark}}>{filtered.length}</b>
      </div>
      <div style={{display:"flex",gap:4}}>
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
          style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
            cursor:page===1?"not-allowed":"pointer",background:C.white,opacity:page===1?.4:1,
            display:"flex",alignItems:"center",justifyContent:"center"}}>
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
            cursor:page===pageCount?"not-allowed":"pointer",background:C.white,opacity:page===pageCount?.4:1,
            display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ico d={I.chevR} size={14} color={C.mid}/>
        </button>
      </div>
    </div>
  ):null;

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
      <DetailModal item={detail} onClose={()=>setDetail(null)}/>

      <div style={{padding:"24px 28px",maxWidth:1300,margin:"0 auto"}}>

        {/* HEADER */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Fanlar meta ro'yxati
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{RAW.length}</b> •{" "}
              Jami: <b style={{color:C.dark}}>{TOTAL.toLocaleString()}</b> ta fan
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* view toggle */}
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"card",  i:I.grid,   t:"Karta"},
                {m:"group", i:I.layers, t:"Guruh"},
                {m:"table", i:I.list,   t:"Jadval"},
              ].map(({m,i,t})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}} title={t}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi fan qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/>Qo'shish
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Jami fanlar",  v:TOTAL,         c:C.bright, bg:C.lightBlue,   i:I.book},
            {l:"Bakalavr",     v:bak,            c:C.teal,   bg:C.tealLight,   i:I.tag},
            {l:"Magistr",      v:mag,            c:C.purple, bg:C.purpleLight, i:I.tag},
            {l:"Fan guruhlari",v:grps,           c:C.orange, bg:C.orangeLight, i:I.layers},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp .3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.i} size={18} color={s.c}/>
              </div>
              <div>
                <div style={{fontSize:24,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {typeof s.v==="number"?s.v.toLocaleString():s.v}
                </div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:18,
          display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:240,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Fan nomi yoki kodi bo'yicha qidirish..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterEdu} onChange={e=>{setFilterEdu(e.target.value);setPage(1);}} style={{minWidth:160}}>
            <option value="">Barcha ta'lim</option>
            {Object.entries(ET).map(([k,v])=>(
              <option key={k} value={k}>{v.icon} {v.name}</option>
            ))}
          </Sel>
          <Sel value={filterGroup} onChange={e=>{setFilterGroup(e.target.value);setPage(1);}} style={{minWidth:200}}>
            <option value="">Barcha guruhlar</option>
            {Object.entries(SG).map(([k,v])=>(
              <option key={k} value={k}>{v.name}</option>
            ))}
          </Sel>
          <Sel value={filterActive} onChange={e=>{setFilterActive(e.target.value);setPage(1);}} style={{minWidth:130}}>
            <option value="">Holat (barchasi)</option>
            <option value="1">✅ Faol</option>
            <option value="0">❌ Nofaol</option>
          </Sel>
          {hasFilter&&(
            <button onClick={clearAll}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/>Tozalash
            </button>
          )}
          <div style={{marginLeft:"auto",fontSize:12,color:C.light,flexShrink:0,fontWeight:600}}>
            {filtered.length} natija
          </div>
        </div>

        {/* ════════ CARD VIEW ════════ */}
        {viewMode==="card"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
              {paginated.map((item,idx)=>{
                const sg=getSG(item.subjectGroup.code);
                const et=getET(item.educationType.code);
                return(
                  <div key={item.id}
                    style={{background:C.white,borderRadius:18,overflow:"hidden",
                      border:`1.5px solid ${C.gray}`,transition:"all .18s",cursor:"pointer",
                      animation:`fadeUp .28s ${idx*30}ms ease both`,display:"flex",flexDirection:"column"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=sg.color;e.currentTarget.style.boxShadow=`0 10px 28px ${sg.color}18`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="";}}
                    onClick={()=>setDetail(item)}>

                    {/* stripe */}
                    <div style={{height:3,background:`linear-gradient(90deg,${sg.color},${sg.color}40)`}}/>

                    {/* badges */}
                    <div style={{display:"flex",justifyContent:"space-between",
                      alignItems:"center",padding:"10px 14px 0",gap:6}}>
                      <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,
                        background:sg.bg,color:sg.color}}>{sg.short}</span>
                      <div style={{display:"flex",gap:5,alignItems:"center"}}>
                        <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,
                          background:et.bg,color:et.color}}>{et.icon} {et.name}</span>
                        <div style={{width:7,height:7,borderRadius:"50%",
                          background:item.active?C.green:C.red,flexShrink:0}}/>
                      </div>
                    </div>

                    {/* name */}
                    <div style={{padding:"8px 14px 6px",flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.dark,lineHeight:1.4,
                        display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",
                        overflow:"hidden",marginBottom:8}}>{item.name}</div>
                    </div>

                    {/* footer */}
                    <div style={{padding:"9px 14px",borderTop:`1px solid ${C.lightGray}`,
                      display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <code style={{fontSize:10,fontWeight:700,color:C.mid,
                        background:C.lightGray,padding:"2px 7px",borderRadius:6,
                        letterSpacing:"-0.3px"}}>{item.code}</code>
                      <span style={{fontSize:10,color:C.light}}>#{item.id}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination/>
          </>
        )}

        {/* ════════ GROUP ACCORDION VIEW ════════ */}
        {viewMode==="group"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {/* expand/collapse all */}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginBottom:2}}>
              <button onClick={()=>{ const o={}; byGroup.forEach(g=>{o[g.code]=true;}); setOpenGroups(o); }}
                style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                  background:C.white,color:C.mid}}>
                Barchasini yoy
              </button>
              <button onClick={()=>setOpenGroups({})}
                style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                  background:C.white,color:C.mid}}>
                Barchasini yig'
              </button>
            </div>

            {byGroup.map((grp,gi)=>{
              const isOp=openGroups[grp.code]!==false&&openGroups[grp.code]!==undefined
                ?true:openGroups[grp.code]===false?false:true; // default open
              return(
                <div key={grp.code}
                  style={{background:C.white,borderRadius:18,border:`1.5px solid ${C.gray}`,
                    overflow:"hidden",animation:`fadeUp .3s ${gi*60}ms ease both`}}>
                  {/* header */}
                  <div
                    style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",
                      background:isOp?`${grp.color}08`:C.white,cursor:"pointer",userSelect:"none",
                      borderBottom:isOp?`1px solid ${grp.color}20`:"none"}}
                    onClick={()=>setOpenGroups(p=>({...p,[grp.code]:!isOp}))}>
                    <div style={{width:44,height:44,borderRadius:12,
                      background:`linear-gradient(135deg,${grp.color},${grp.color}99)`,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.layers} size={20} color={C.white}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:800,color:C.dark,
                        fontFamily:"'Syne',sans-serif"}}>{grp.name}</div>
                      <div style={{fontSize:11,color:C.light,marginTop:2}}>
                        Kod: <b style={{fontFamily:"monospace"}}>{grp.code}</b>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:22,fontWeight:800,color:grp.color,
                          fontFamily:"'Syne',sans-serif"}}>{grp.items.length}</div>
                        <div style={{fontSize:9,color:C.light,fontWeight:700}}>fan</div>
                      </div>
                      <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"transform .2s",transform:isOp?"rotate(90deg)":"rotate(0)"}}>
                        <Ico d={I.chevR} size={14} color={C.mid}/>
                      </div>
                    </div>
                  </div>

                  {/* items grid */}
                  {isOp&&(
                    <div style={{display:"grid",
                      gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
                      gap:10,padding:"14px 16px 16px"}}>
                      {grp.items.map((item,idx)=>{
                        const et=getET(item.educationType.code);
                        return(
                          <div key={item.id}
                            style={{borderRadius:12,border:`1px solid ${grp.color}20`,
                              background:`${grp.color}06`,padding:"10px 12px",
                              cursor:"pointer",transition:"all .15s",
                              animation:`fadeUp .2s ${idx*20}ms ease both`}}
                            onClick={()=>setDetail(item)}
                            onMouseEnter={e=>{e.currentTarget.style.background=`${grp.color}12`;e.currentTarget.style.borderColor=`${grp.color}40`;}}
                            onMouseLeave={e=>{e.currentTarget.style.background=`${grp.color}06`;e.currentTarget.style.borderColor=`${grp.color}20`;}}>
                            <div style={{display:"flex",justifyContent:"space-between",
                              alignItems:"flex-start",gap:6,marginBottom:6}}>
                              <code style={{fontSize:9,fontWeight:700,color:grp.color,
                                background:`${grp.color}15`,padding:"2px 6px",borderRadius:5}}>
                                {item.code}
                              </code>
                              <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
                                <span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20,
                                  background:et.bg,color:et.color}}>{et.icon} {et.name}</span>
                                <div style={{width:6,height:6,borderRadius:"50%",
                                  background:item.active?C.green:C.red}}/>
                              </div>
                            </div>
                            <div style={{fontSize:12,fontWeight:600,color:C.dark,lineHeight:1.4,
                              display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",
                              overflow:"hidden"}}>{item.name}</div>
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

        {/* ════════ TABLE VIEW ════════ */}
        {viewMode==="table"&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"52px 120px 1fr 180px 130px 80px 80px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["#","Kod","Fan nomi","Guruh","Ta'lim","Holat",""].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>
              {paginated.map((item,idx)=>{
                const sg=getSG(item.subjectGroup.code);
                const et=getET(item.educationType.code);
                return(
                  <div key={item.id}
                    style={{display:"grid",
                      gridTemplateColumns:"52px 120px 1fr 180px 130px 80px 80px",
                      padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,cursor:"pointer",transition:"background .12s",
                      animation:`fadeUp .2s ${idx*20}ms ease both`}}
                    onClick={()=>setDetail(item)}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,color:C.light}}>#{item.id}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",paddingRight:8}}>
                      <code style={{fontSize:10,fontWeight:700,color:C.mid,
                        background:C.lightGray,padding:"2px 6px",borderRadius:5,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:110}}>
                        {item.code}
                      </code>
                    </div>
                    <div style={{display:"flex",alignItems:"center",paddingRight:8}}>
                      <span style={{fontSize:12,fontWeight:600,color:C.dark,lineHeight:1.3,
                        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",
                        overflow:"hidden"}}>{item.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:sg.bg,color:sg.color,overflow:"hidden",textOverflow:"ellipsis",
                        whiteSpace:"nowrap",maxWidth:170}}>{sg.short}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:et.bg,color:et.color}}>{et.icon} {et.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <div style={{width:7,height:7,borderRadius:"50%",
                          background:item.active?C.green:C.red}}/>
                        <span style={{fontSize:10,fontWeight:600,
                          color:item.active?C.green:C.red}}>
                          {item.active?"Faol":"Nofaol"}
                        </span>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <button onClick={e=>{e.stopPropagation();setDetail(item);}}
                        style={{width:26,height:26,borderRadius:7,border:`1px solid ${C.gray}`,
                          cursor:"pointer",background:C.white,
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.eye} size={11} color={C.light}/>
                      </button>
                      <button onClick={e=>{e.stopPropagation();showToast(`${item.code} nusxalandi`);}}
                        style={{width:26,height:26,borderRadius:7,border:`1px solid ${C.gray}`,
                          cursor:"pointer",background:C.white,
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.copy} size={11} color={C.light}/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination/>
          </>
        )}

        {filtered.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.book} size={48} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>
              Natija topilmadi
            </div>
          </div>
        )}
      </div>
    </>
  );
}
