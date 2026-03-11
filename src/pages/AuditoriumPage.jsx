import { useState, useEffect, useCallback } from "react";

/* ── COLOR PALETTE (EduAdmin bilan bir xil) ── */
const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  dark:"#0F172A",  mid:"#475569", light:"#94A3B8",
  gray:"#E2E8F0",  lightGray:"#F8FAFC", white:"#FFFFFF",
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
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

/* ── ICONS ── */
const Ico = ({ d, size=16, color="currentColor", sw=2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  building:  "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  door:      "M3 21h18M9 21V3h12v18M9 3H5v18h4",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  filter:    "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  search:    "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevL:     "M15 18l-6-6 6-6",
  chevR:     "M9 18l6-6-6-6",
  chevD:     "M6 9l6 6 6-6",
  check:     "M20 6L9 17l-5-5",
  x:         "M18 6L6 18M6 6l12 12",
  refresh:   "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15",
  plus:      "M12 5v14M5 12h14",
  edit:      "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:     "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  sort:      "M3 6h18M7 12h10M11 18h2",
  lecture:   "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  lab:       "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 0-2-2v-4m0 0h18",
  other:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
};

/* ── MOCK DATA (API response formatiga mos) ── */
const MOCK_ITEMS = [
  {code:1,   name:"101",       auditoriumType:{code:"11",name:"Ma'ruza"},      building:{id:32,name:"4-Bino"},                volume:20, active:true},
  {code:114, name:"101-xona",  auditoriumType:{code:"11",name:"Ma'ruza"},      building:{id:38,name:"5-Bino (Texnikum)"},     volume:24, active:true},
  {code:2,   name:"102",       auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:32,name:"4-Bino"},                volume:20, active:true},
  {code:32,  name:"102-xona",  auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:35,name:"1-Bino (bosh bino)"},   volume:30, active:true},
  {code:145, name:"103",       auditoriumType:{code:"10",name:"Boshqa"},       building:{id:32,name:"4-Bino"},                volume:3,  active:false},
  {code:113, name:"103-xona",  auditoriumType:{code:"11",name:"Ma'ruza"},      building:{id:38,name:"5-Bino (Texnikum)"},     volume:65, active:true},
  {code:33,  name:"103-xona",  auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:35,name:"1-Bino (bosh bino)"},   volume:12, active:true},
  {code:3,   name:"104",       auditoriumType:{code:"10",name:"Boshqa"},       building:{id:32,name:"4-Bino"},                volume:1,  active:false},
  {code:34,  name:"104-xona",  auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:35,name:"1-Bino (bosh bino)"},   volume:12, active:true},
  {code:115, name:"104-xona",  auditoriumType:{code:"11",name:"Ma'ruza"},      building:{id:38,name:"5-Bino (Texnikum)"},     volume:65, active:true},
  {code:4,   name:"105",       auditoriumType:{code:"10",name:"Boshqa"},       building:{id:32,name:"4-Bino"},                volume:5,  active:false},
  {code:165, name:"106",       auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:32,name:"4-Bino"},                volume:20, active:true},
  {code:5,   name:"106",       auditoriumType:{code:"10",name:"Boshqa"},       building:{id:32,name:"4-Bino"},                volume:8,  active:true},
  {code:6,   name:"107",       auditoriumType:{code:"10",name:"Boshqa"},       building:{id:32,name:"4-Bino"},                volume:2,  active:false},
  {code:148, name:"108",       auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:32,name:"4-Bino"},                volume:20, active:true},
  {code:40,  name:"10-xona",   auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:36,name:"2-Bino (KIF)"},          volume:20, active:true},
  {code:152, name:"110",       auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:32,name:"4-Bino"},                volume:20, active:true},
  {code:112, name:"113",       auditoriumType:{code:"11",name:"Ma'ruza"},      building:{id:32,name:"4-Bino"},                volume:70, active:true},
  {code:168, name:"114",       auditoriumType:{code:"11",name:"Ma'ruza"},      building:{id:32,name:"4-Bino"},                volume:20, active:true},
  {code:153, name:"115",       auditoriumType:{code:"12",name:"Laboratoriya"}, building:{id:32,name:"4-Bino"},                volume:20, active:true},
];
const MOCK_PAGINATION = { totalCount:162, pageSize:20, pageCount:9, page:1 };

/* ── TYPE CONFIG ── */
const TYPE_CFG = {
  "11": { label:"Ma'ruza",      icon:I.lecture, bg:C.lightBlue,    color:C.bright,  border:`${C.bright}30` },
  "12": { label:"Laboratoriya", icon:I.lab,     bg:C.greenLight,   color:C.green,   border:`${C.green}30`  },
  "10": { label:"Boshqa",       icon:I.other,   bg:C.yellowLight,  color:C.yellow,  border:`${C.yellow}30` },
};
const getType = code => TYPE_CFG[code] || { label:"Noma'lum", icon:I.other, bg:C.lightGray, color:C.mid, border:C.gray };

/* ── BUILDINGS list (filter uchun) ── */
const BUILDINGS = [
  {id:"",  name:"Barcha binolar"},
  {id:32,  name:"4-Bino"},
  {id:35,  name:"1-Bino (bosh bino)"},
  {id:36,  name:"2-Bino (KIF)"},
  {id:37,  name:"3-Bino"},
  {id:38,  name:"5-Bino (Texnikum)"},
];

/* ── HELPER ── */
const volumeColor = v => v >= 50 ? C.green : v >= 20 ? C.bright : v >= 10 ? C.yellow : C.red;

/* ─────────────────────────────────── */
export default function AuditoriumPage() {
  const [items,      setItems]      = useState(MOCK_ITEMS);
  const [pagination, setPagination] = useState(MOCK_PAGINATION);
  const [loading,    setLoading]    = useState(false);
  const [search,     setSearch]     = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterBldg, setFilterBldg] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [page,       setPage]       = useState(1);
  const [sortField,  setSortField]  = useState("name");
  const [sortDir,    setSortDir]    = useState("asc");
  const [selected,   setSelected]   = useState([]);
  const [viewModal,  setViewModal]  = useState(null);
  const [toast,      setToast]      = useState(null);

  /* ── SIMULATED FETCH ── */
  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let data = [...MOCK_ITEMS];
      if(search)       data = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
      if(filterType)   data = data.filter(d => d.auditoriumType.code === filterType);
      if(filterBldg)   data = data.filter(d => d.building.id === Number(filterBldg));
      if(filterActive === "true")  data = data.filter(d => d.active);
      if(filterActive === "false") data = data.filter(d => !d.active);
      data.sort((a, b) => {
        let va = a[sortField], vb = b[sortField];
        if(sortField === "building") { va = a.building.name; vb = b.building.name; }
        if(sortField === "type")     { va = a.auditoriumType.name; vb = b.auditoriumType.name; }
        if(va < vb) return sortDir === "asc" ? -1 : 1;
        if(va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
      const total = data.length;
      const ps    = 10;
      const start = (page - 1) * ps;
      setItems(data.slice(start, start + ps));
      setPagination({ totalCount: total, pageSize: ps, pageCount: Math.ceil(total / ps), page });
      setLoading(false);
      setSelected([]);
    }, 400);
  }, [search, filterType, filterBldg, filterActive, page, sortField, sortDir]);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* ── SORT ── */
  const handleSort = field => {
    if(sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  /* ── SELECT ── */
  const toggleSelect = code => setSelected(s => s.includes(code) ? s.filter(c => c !== code) : [...s, code]);
  const selectAll    = () => setSelected(s => s.length === items.length ? [] : items.map(i => i.code));

  /* ── TOAST ── */
  const showToast = (msg, type="success") => {
    setToast({msg, type});
    setTimeout(() => setToast(null), 3000);
  };

  /* ── ACTIVE TOGGLE ── */
  const toggleActive = (code, cur) => {
    setItems(prev => prev.map(i => i.code === code ? {...i, active: !cur} : i));
    showToast(`Holat ${!cur ? "faollashtirildi" : "o'chirildi"}`, !cur ? "success" : "warning");
  };

  /* ── STATS ── */
  const allData  = MOCK_ITEMS;
  const stats = [
    { label:"Jami auditoriya", value:MOCK_PAGINATION.totalCount, icon:I.door,     color:C.bright,  bg:C.lightBlue   },
    { label:"Ma'ruza xonalar", value:allData.filter(d=>d.auditoriumType.code==="11").length, icon:I.lecture, color:C.purple, bg:C.purpleLight },
    { label:"Laboratoriyalar", value:allData.filter(d=>d.auditoriumType.code==="12").length, icon:I.lab,     color:C.green,  bg:C.greenLight  },
    { label:"Faol emas",       value:allData.filter(d=>!d.active).length,                    icon:I.x,       color:C.red,    bg:C.redLight    },
  ];

  /* ── SORT INDICATOR ── */
  const SortIcon = ({field}) => (
    <span style={{marginLeft:4,opacity:sortField===field?1:0.3,fontSize:10,color:sortField===field?C.bright:C.light}}>
      {sortField===field&&sortDir==="desc"?"↓":"↑"}
    </span>
  );

  /* ── TYPE BADGE ── */
  const TypeBadge = ({code}) => {
    const cfg = getType(code);
    return (
      <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",
        borderRadius:20,fontSize:11,fontWeight:700,
        background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}`}}>
        <Ico d={cfg.icon} size={11} color={cfg.color}/>
        {cfg.label}
      </span>
    );
  };

  /* ── SELECT COMPONENT ── */
  const Select = ({value, onChange, children, style}) => (
    <div style={{position:"relative",...style}}>
      <select value={value} onChange={onChange}
        style={{width:"100%",padding:"8px 32px 8px 12px",borderRadius:9,
          border:`1.5px solid ${C.gray}`,fontSize:13,color:value?C.dark:C.light,
          background:C.white,cursor:"pointer"}}>
        {children}
      </select>
      <div style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
        <Ico d={I.chevD} size={13} color={C.light}/>
      </div>
    </div>
  );

  /* ── PAGINATION BUTTONS ── */
  const pageNums = () => {
    const pc = pagination.pageCount;
    const p  = pagination.page;
    if(pc <= 7) return Array.from({length:pc},(_,i)=>i+1);
    if(p <= 4)  return [1,2,3,4,5,"...",pc];
    if(p >= pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  return (
    <>
      <style>{css}</style>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background:C.white,borderLeft:`4px solid ${toast.type==="success"?C.green:toast.type==="warning"?C.yellow:C.red}`,
          borderRadius:10,padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",animation:"fadeUp 0.3s ease",fontSize:13,fontWeight:600,color:C.dark}}>
          <Ico d={toast.type==="success"?I.check:I.x} size={15} color={toast.type==="success"?C.green:toast.type==="warning"?C.yellow:C.red}/>
          {toast.msg}
        </div>
      )}

      {/* ── VIEW MODAL ── */}
      {viewModal && (
        <div onClick={e=>e.target===e.currentTarget&&setViewModal(null)}
          style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.4)",
            backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",
            padding:16,animation:"fadeIn 0.2s ease"}}>
          <div style={{background:C.white,borderRadius:20,width:420,
            boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"fadeUp 0.25s ease",overflow:"hidden"}}>
            {/* Modal header */}
            <div style={{padding:"16px 20px",background:`linear-gradient(135deg,${C.navy},${C.blue})`,
              display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.15)",
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Ico d={I.door} size={18} color={C.white}/>
                </div>
                <div>
                  <div style={{fontSize:16,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>
                    {viewModal.name}
                  </div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Kod: {viewModal.code}</div>
                </div>
              </div>
              <button onClick={()=>setViewModal(null)}
                style={{width:30,height:30,borderRadius:8,border:"none",
                  background:"rgba(255,255,255,0.15)",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.x} size={14} color={C.white}/>
              </button>
            </div>
            {/* Modal body */}
            <div style={{padding:20}}>
              {[
                ["Xona nomi",      viewModal.name],
                ["Kod",            viewModal.code],
                ["Bino",           viewModal.building.name],
                ["Sig'imi",        `${viewModal.volume} o'rin`],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                  <span style={{fontSize:12,color:C.light,fontWeight:600}}>{k}</span>
                  <span style={{fontSize:13,color:C.dark,fontWeight:700}}>{v}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:12,color:C.light,fontWeight:600}}>Turi</span>
                <TypeBadge code={viewModal.auditoriumType.code}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",padding:"10px 0"}}>
                <span style={{fontSize:12,color:C.light,fontWeight:600}}>Holat</span>
                <span style={{padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:700,
                  background:viewModal.active?C.greenLight:C.redLight,
                  color:viewModal.active?C.green:C.red}}>
                  {viewModal.active?"Faol":"Faol emas"}
                </span>
              </div>
              {/* Volume bar */}
              <div style={{marginTop:16,padding:"14px",borderRadius:12,background:C.lightGray}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:12,color:C.mid,fontWeight:600}}>Sig'im ko'rsatkichi</span>
                  <span style={{fontSize:12,fontWeight:700,color:volumeColor(viewModal.volume)}}>
                    {viewModal.volume} o'rin
                  </span>
                </div>
                <div style={{height:8,borderRadius:4,background:C.gray,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:4,
                    width:`${Math.min(viewModal.volume/100*100,100)}%`,
                    background:`linear-gradient(90deg,${volumeColor(viewModal.volume)},${volumeColor(viewModal.volume)}aa)`}}/>
                </div>
              </div>
            </div>
            <div style={{padding:"12px 20px",borderTop:`1px solid ${C.lightGray}`,display:"flex",gap:8}}>
              <button onClick={()=>{showToast("Tahrirlash ochildi","success");setViewModal(null);}}
                style={{flex:1,padding:"9px",borderRadius:10,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:13,fontWeight:700,
                  background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
                Tahrirlash
              </button>
              <button onClick={()=>setViewModal(null)}
                style={{padding:"9px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
                  cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PAGE ── */}
      <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>

        {/* HEADER */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Auditoriyalar
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{pagination.totalCount}</b> ta auditoriya •{" "}
              <span style={{color:C.green}}>{allData.filter(d=>d.active).length} faol</span>{" "}•{" "}
              <span style={{color:C.red}}>{allData.filter(d=>!d.active).length} faol emas</span>
            </p>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={fetchData}
              style={{padding:"8px 14px",borderRadius:10,border:`1.5px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                background:C.white,color:C.mid,display:"flex",alignItems:"center",gap:6}}>
              <Ico d={I.refresh} size={14} color={C.mid}/> Yangilash
            </button>
            <button onClick={()=>showToast("Yangi auditoriya qo'shish ochildi","success")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Yangi auditoriya
            </button>
          </div>
        </div>

        {/* STATS */}
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
                <div style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {s.value}
                </div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{background:C.white,borderRadius:14,padding:"14px 16px",
          border:`1px solid ${C.gray}`,marginBottom:16,
          display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {/* Search */}
          <div style={{flex:1,minWidth:180,position:"relative"}}>
            <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input
              value={search}
              onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Xona nomi bo'yicha qidirish..."
              style={{width:"100%",padding:"8px 12px 8px 32px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark,
                transition:"border-color 0.2s"}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}
            />
          </div>

          {/* Bino */}
          <Select value={filterBldg} onChange={e=>{setFilterBldg(e.target.value);setPage(1);}} style={{minWidth:160}}>
            {BUILDINGS.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
          </Select>

          {/* Tur */}
          <Select value={filterType} onChange={e=>{setFilterType(e.target.value);setPage(1);}} style={{minWidth:150}}>
            <option value="">Barcha turlar</option>
            <option value="11">Ma'ruza</option>
            <option value="12">Laboratoriya</option>
            <option value="10">Boshqa</option>
          </Select>

          {/* Faollik */}
          <Select value={filterActive} onChange={e=>{setFilterActive(e.target.value);setPage(1);}} style={{minWidth:130}}>
            <option value="">Barchasi</option>
            <option value="true">Faol</option>
            <option value="false">Faol emas</option>
          </Select>

          {/* Clear */}
          {(search||filterType||filterBldg||filterActive) && (
            <button onClick={()=>{setSearch("");setFilterType("");setFilterBldg("");setFilterActive("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* BULK ACTIONS */}
        {selected.length > 0 && (
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,borderRadius:12,
            padding:"10px 16px",marginBottom:12,display:"flex",alignItems:"center",
            justifyContent:"space-between",animation:"fadeUp 0.2s ease"}}>
            <span style={{fontSize:13,fontWeight:600,color:C.white}}>
              {selected.length} ta tanlandi
            </span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{showToast(`${selected.length} ta faollashtirildi`,"success");setSelected([]);}}
                style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:600,
                  background:C.greenLight,color:C.green}}>
                Faollashtirish
              </button>
              <button onClick={()=>{showToast(`${selected.length} ta o'chirildi`,"warning");setSelected([]);}}
                style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:600,
                  background:C.redLight,color:C.red}}>
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

        {/* TABLE */}
        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
          {/* Table header */}
          <div style={{display:"grid",
            gridTemplateColumns:"40px 60px 1fr 130px 160px 80px 90px 100px",
            gap:0,padding:"10px 16px",
            background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
            {/* Checkbox */}
            <div style={{display:"flex",alignItems:"center"}}>
              <div onClick={selectAll}
                style={{width:16,height:16,borderRadius:4,border:`2px solid ${selected.length===items.length&&items.length>0?C.bright:C.gray}`,
                  background:selected.length===items.length&&items.length>0?C.bright:"transparent",
                  cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {selected.length===items.length&&items.length>0&&<Ico d={I.check} size={10} color={C.white} sw={3}/>}
              </div>
            </div>
            {["Kod","Xona nomi","Turi","Bino","Sig'im","Holat","Amallar"].map((h,i)=>{
              const fields=["code","name","type","building","volume","active",""];
              return (
                <div key={h} onClick={()=>fields[i]&&handleSort(fields[i])}
                  style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
                    letterSpacing:"0.8px",userSelect:"none",
                    cursor:fields[i]?"pointer":"default",
                    display:"flex",alignItems:"center"}}>
                  {h}{fields[i]&&<SortIcon field={fields[i]}/>}
                </div>
              );
            })}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{padding:"40px",textAlign:"center"}}>
              <div style={{width:32,height:32,borderRadius:"50%",
                border:`3px solid ${C.lightBlue}`,borderTopColor:C.bright,
                animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/>
              <div style={{fontSize:13,color:C.light}}>Yuklanmoqda...</div>
            </div>
          )}

          {/* Rows */}
          {!loading && items.length === 0 && (
            <div style={{padding:"48px",textAlign:"center"}}>
              <div style={{width:60,height:60,borderRadius:16,background:C.lightGray,
                display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                <Ico d={I.door} size={28} color={C.light}/>
              </div>
              <div style={{fontSize:14,fontWeight:600,color:C.mid,marginBottom:4}}>Auditoriya topilmadi</div>
              <div style={{fontSize:12,color:C.light}}>Filtrni o'zgartiring yoki qidiruvni tozalang</div>
            </div>
          )}

          {!loading && items.map((item, idx) => {
            const sel = selected.includes(item.code);
            return (
              <div key={item.code}
                style={{display:"grid",
                  gridTemplateColumns:"40px 60px 1fr 130px 160px 80px 90px 100px",
                  gap:0,padding:"11px 16px",
                  borderBottom:`1px solid ${C.lightGray}`,
                  background:sel?`${C.lightBlue}`:C.white,
                  transition:"background 0.15s",
                  animation:`fadeUp 0.25s ${idx*30}ms ease both`}}
                onMouseEnter={e=>!sel&&(e.currentTarget.style.background=C.lightGray)}
                onMouseLeave={e=>!sel&&(e.currentTarget.style.background=C.white)}>

                {/* Checkbox */}
                <div style={{display:"flex",alignItems:"center"}}>
                  <div onClick={()=>toggleSelect(item.code)}
                    style={{width:16,height:16,borderRadius:4,cursor:"pointer",
                      border:`2px solid ${sel?C.bright:C.gray}`,
                      background:sel?C.bright:"transparent",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {sel&&<Ico d={I.check} size={10} color={C.white} sw={3}/>}
                  </div>
                </div>

                {/* Code */}
                <div style={{display:"flex",alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:700,color:C.light}}>#{item.code}</span>
                </div>

                {/* Name */}
                <div style={{display:"flex",alignItems:"center"}}>
                  <span style={{fontSize:13,fontWeight:700,color:C.dark}}>{item.name}</span>
                </div>

                {/* Type */}
                <div style={{display:"flex",alignItems:"center"}}>
                  <TypeBadge code={item.auditoriumType.code}/>
                </div>

                {/* Building */}
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <Ico d={I.building} size={13} color={C.light}/>
                  <span style={{fontSize:12,color:C.mid,fontWeight:500}}>{item.building.name}</span>
                </div>

                {/* Volume */}
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <Ico d={I.users} size={12} color={volumeColor(item.volume)}/>
                  <span style={{fontSize:13,fontWeight:700,color:volumeColor(item.volume)}}>
                    {item.volume}
                  </span>
                </div>

                {/* Active toggle */}
                <div style={{display:"flex",alignItems:"center"}}>
                  <div onClick={()=>toggleActive(item.code, item.active)}
                    style={{width:36,height:20,borderRadius:10,cursor:"pointer",
                      background:item.active?C.green:C.gray,
                      position:"relative",transition:"background 0.2s"}}>
                    <div style={{position:"absolute",top:2,
                      left:item.active?18:2,
                      width:16,height:16,borderRadius:"50%",
                      background:C.white,transition:"left 0.2s",
                      boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                  </div>
                </div>

                {/* Actions */}
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <button onClick={()=>setViewModal(item)}
                    style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                      background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all 0.15s"}}
                    title="Ko'rish"
                    onMouseEnter={e=>e.currentTarget.style.background=`${C.bright}20`}
                    onMouseLeave={e=>e.currentTarget.style.background=C.lightBlue}>
                    <Ico d={I.eye} size={13} color={C.bright}/>
                  </button>
                  <button onClick={()=>showToast("Tahrirlash ochildi","success")}
                    style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                      background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all 0.15s"}}
                    title="Tahrirlash"
                    onMouseEnter={e=>e.currentTarget.style.background=`${C.green}20`}
                    onMouseLeave={e=>e.currentTarget.style.background=C.greenLight}>
                    <Ico d={I.edit} size={13} color={C.green}/>
                  </button>
                  <button onClick={()=>showToast("O'chirildi","warning")}
                    style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                      background:C.redLight,display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all 0.15s"}}
                    title="O'chirish"
                    onMouseEnter={e=>e.currentTarget.style.background=`${C.red}20`}
                    onMouseLeave={e=>e.currentTarget.style.background=C.redLight}>
                    <Ico d={I.trash} size={13} color={C.red}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {pagination.pageCount > 1 && (
          <div style={{marginTop:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{fontSize:12,color:C.light}}>
              Jami <b style={{color:C.dark}}>{pagination.totalCount}</b> ta •{" "}
              <b style={{color:C.dark}}>{(pagination.page-1)*pagination.pageSize+1}</b>–
              <b style={{color:C.dark}}>{Math.min(pagination.page*pagination.pageSize,pagination.totalCount)}</b> ko'rsatilmoqda
            </div>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <button
                disabled={page===1}
                onClick={()=>setPage(p=>p-1)}
                style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:page===1?"not-allowed":"pointer",background:C.white,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  opacity:page===1?0.4:1}}>
                <Ico d={I.chevL} size={14} color={C.mid}/>
              </button>

              {pageNums().map((n,i)=>(
                <button key={i}
                  onClick={()=>n!=="..."&&setPage(n)}
                  style={{width:32,height:32,borderRadius:8,border:`1px solid ${n===page?C.bright:C.gray}`,
                    cursor:n==="..."?"default":"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                    background:n===page?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                    color:n===page?C.white:n==="..."?C.light:C.mid,
                    transition:"all 0.15s"}}>
                  {n}
                </button>
              ))}

              <button
                disabled={page===pagination.pageCount}
                onClick={()=>setPage(p=>p+1)}
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
