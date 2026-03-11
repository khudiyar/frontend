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
  building: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  faculty:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  kafedra:  "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  bolim:    "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2",
  boshqarma:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  rektorat: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4l3 3",
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:    "M6 9l6 6 6-6",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  plus:     "M12 5v14M5 12h14",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  tree:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  hash:     "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};

/* ── STRUCTURE TYPE CONFIG ── */
const ST = {
  "11": { label:"Fakultet",   icon:I.faculty,    color:C.bright,  bg:C.lightBlue,   border:`${C.bright}25` },
  "12": { label:"Kafedra",    icon:I.kafedra,    color:C.purple,  bg:C.purpleLight, border:`${C.purple}25` },
  "13": { label:"Bo'lim",     icon:I.bolim,      color:C.teal,    bg:C.tealLight,   border:`${C.teal}25`   },
  "14": { label:"Boshqarma",  icon:I.boshqarma,  color:C.orange,  bg:C.orangeLight, border:`${C.orange}25` },
  "16": { label:"Rektorat",   icon:I.rektorat,   color:C.red,     bg:C.redLight,    border:`${C.red}25`    },
};
const getST = code => ST[code] || { label:"Boshqa", icon:I.building, color:C.mid, bg:C.lightGray, border:C.gray };

/* ── RAW DATA (haqiqiy API dan, totalCount:33, page1+page2) ── */
const RAW = [
  /* ── Page 1 (id 33→14) ── */
  {id:33, name:"Matematik modellashtirish",                                     code:"540-105-20",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:27,   active:true},
  {id:32, name:"Kiberxavfsizlik injiniringi",                                   code:"540-105-19",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:27,   active:true},
  {id:31, name:"Aniq fanlar",                                                   code:"540-104-18",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:4,    active:true},
  {id:30, name:"Muhandislik pedagogika",                                        code:"540-103-17",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:3,    active:true},
  {id:29, name:"Avtomatlashtirish va boshqaruv",                                code:"540-103-16",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:3,    active:true},
  {id:28, name:"Ijtimoiy-gumanitar fanlar",                                     code:"540-101-15",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:2,    active:true},
  {id:27, name:"Sun'iy intellekt",                                              code:"540-105",     structureType:{code:"11",name:"Fakultet"},  localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:26, name:"Registrator ofis",                                              code:"540-208",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:25, name:"Talabalar amaliyoti bo'limi",                                   code:"540-207",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:24, name:"Axborot resurs markazi",                                        code:"540-206",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:23, name:"Ta'lim sifatini nazorat qilish",                                code:"540-205",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:22, name:"Rektorat",                                                      code:"540-204",     structureType:{code:"16",name:"Rektorat"},  localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:21, name:"Xodimlar bo'limi",                                              code:"540-203",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:20, name:"O'quv-uslubiy boshqarma",                                       code:"540-202",     structureType:{code:"14",name:"Boshqarma"}, localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:19, name:"Buxgalteriya",                                                  code:"540-201",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:18, name:"Tabiiy fanlar",                                                 code:"540-104-14",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:4,    active:true},
  {id:17, name:"Iqtisodiyot va menejment",                                      code:"540-102-13",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:1,    active:true},
  {id:16, name:"Kimyo muhandisligi va ekologiya",                               code:"540-104-12",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:4,    active:true},
  {id:15, name:"Mexanika muhandisligi, mehnat va texnika xavfsizligi",          code:"540-104-11",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:4,    active:true},
  {id:14, name:"Energetika muhandisligi",                                       code:"540-103-10",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:3,    active:true},
  /* ── Page 2 (id 13→1, inferred from totalCount:33) ── */
  {id:13, name:"Konchilik va metallurgiya",                                     code:"540-103-09",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:3,    active:true},
  {id:12, name:"Davlat tili va chet tillari",                                   code:"540-101-08",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:2,    active:true},
  {id:11, name:"Ijtimoiy va iqtisodiy fanlar",                                  code:"540-101-07",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:2,    active:true},
  {id:10, name:"Huquq va boshqaruv",                                            code:"540-102-06",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:1,    active:true},
  {id:9,  name:"Moliya va soliqlar",                                            code:"540-102-05",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:1,    active:true},
  {id:8,  name:"Muhandislik grafikasi",                                         code:"540-103-04",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:3,    active:true},
  {id:7,  name:"Jismoniy tarbiya kafedrasi",                                    code:"540-101-03",  structureType:{code:"12",name:"Kafedra"},   localityType:{code:"11",name:"Mahalliy"}, parent:2,    active:true},
  {id:6,  name:"Harbiy ta'lim",                                                 code:"540-203-02",  structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:5,  name:"Ilmiy-tadqiqot bo'limi",                                        code:"540-209",     structureType:{code:"13",name:"Bo'lim"},    localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:4,  name:"Muhandislik texnologiyalari",                                   code:"540-104",     structureType:{code:"11",name:"Fakultet"},  localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:3,  name:"Konchilik ishi va energetika",                                  code:"540-103",     structureType:{code:"11",name:"Fakultet"},  localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:2,  name:"Ijtimoiy fanlar",                                               code:"540-101",     structureType:{code:"11",name:"Fakultet"},  localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
  {id:1,  name:"Iqtisodiyot va boshqaruv",                                      code:"540-102",     structureType:{code:"11",name:"Fakultet"},  localityType:{code:"11",name:"Mahalliy"}, parent:null, active:true},
];

/* ── BUILD TREE ── */
function buildTree(data) {
  const map = {};
  data.forEach(d => map[d.id] = {...d, children: []});
  const roots = [];
  data.forEach(d => {
    if (d.parent && map[d.parent]) map[d.parent].children.push(map[d.id]);
    else if (!d.parent) roots.push(map[d.id]);
  });
  // Sort roots: Fakultet first, then others
  roots.sort((a,b) => {
    const order = {"11":0,"16":1,"14":2,"13":3};
    return (order[a.structureType.code]||9) - (order[b.structureType.code]||9);
  });
  return roots;
}

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
export default function DepartmentPage() {
  const [search,     setSearch]     = useState("");
  const [filterType, setFilterType] = useState("");
  const [viewMode,   setViewMode]   = useState("tree"); // "tree"|"table"
  const [expanded,   setExpanded]   = useState({});
  const [detailItem, setDetailItem] = useState(null);
  const [toast,      setToast]      = useState(null);
  const [page,       setPage]       = useState(1);
  const PAGE = 15;

  const showToast = (msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  /* ── FILTER ── */
  const filtered = useMemo(()=>RAW.filter(r=>{
    const ms = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase());
    const mt = !filterType || r.structureType.code === filterType;
    return ms && mt;
  }),[search,filterType]);

  /* ── TREE (from full RAW for hierarchy, filter for highlight) ── */
  const tree = useMemo(()=>buildTree(RAW),[]);
  const filteredIds = useMemo(()=>new Set(filtered.map(r=>r.id)),[filtered]);

  /* ── TABLE ── */
  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);

  const toggleExp = id => setExpanded(p=>({...p,[id]:p[id]===false}));
  const isExp     = id => expanded[id] !== false;

  /* ── STATS ── */
  const byType = useMemo(()=>{
    const m = {};
    RAW.forEach(r=>{ const c=r.structureType.code; m[c]=(m[c]||0)+1; });
    return m;
  },[]);

  /* ── DETAIL MODAL ── */
  const DetailModal = ()=>{
    const d = detailItem;
    if(!d) return null;
    const st  = getST(d.structureType.code);
    const par = d.parent ? RAW.find(r=>r.id===d.parent) : null;
    const children = RAW.filter(r=>r.parent===d.id);
    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:20,width:"min(480px,95vw)",
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>
          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{display:"flex",gap:12,alignItems:"center",flex:1}}>
                <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,0.15)",
                  flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Ico d={st.icon} size={22} color={C.white}/>
                </div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:`${st.color}40`,color:C.white,marginBottom:5,display:"inline-block"}}>
                    {st.label}
                  </div>
                  <div style={{fontSize:17,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",lineHeight:1.3}}>
                    {d.name}
                  </div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontFamily:"monospace",marginTop:2}}>
                    {d.code}
                  </div>
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
            {/* info rows */}
            {[
              ["ID",            `#${d.id}`],
              ["Tur",           d.structureType.name],
              ["Joylashuv",     d.localityType.name],
              ["Holat",         d.active ? "Faol" : "Faol emas"],
              ["Ustki bo'linma", par ? `${par.name} (${par.code})` : "Yo'q (root)"],
            ].map(([k,v],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"8px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:700,textAlign:"right",maxWidth:"65%"}}>{v}</span>
              </div>
            ))}
            {/* children */}
            {children.length>0&&(
              <div style={{marginTop:14}}>
                <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",
                  letterSpacing:"1px",marginBottom:8}}>
                  Bog'liq bo'linmalar ({children.length})
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {children.map(ch=>{
                    const cs=getST(ch.structureType.code);
                    return (
                      <div key={ch.id} style={{display:"flex",alignItems:"center",gap:8,
                        padding:"7px 10px",borderRadius:9,background:C.lightGray}}>
                        <div style={{width:24,height:24,borderRadius:7,background:cs.bg,flexShrink:0,
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <Ico d={cs.icon} size={11} color={cs.color}/>
                        </div>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,color:C.dark}}>{ch.name}</div>
                          <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{ch.code}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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

  /* ── TREE NODE (recursive) ── */
  const TreeNode = ({node, depth=0})=>{
    const st       = getST(node.structureType.code);
    const hasKids  = node.children.length > 0;
    const open     = isExp(node.id);
    const highlight= filteredIds.has(node.id);
    const dimmed   = (search||filterType) && !highlight && !node.children.some(function check(c){
      return filteredIds.has(c.id)||c.children.some(check);
    });

    // check if any descendant matches
    const anyDescMatch = (n)=> filteredIds.has(n.id) || n.children.some(anyDescMatch);
    const selfOrDescMatch = anyDescMatch(node);
    if((search||filterType) && !selfOrDescMatch) return null;

    return (
      <div style={{marginLeft: depth>0?20:0, opacity: dimmed?0.35:1, transition:"opacity 0.2s"}}>
        {/* connector line */}
        {depth>0&&(
          <div style={{position:"absolute",left:-12,top:0,bottom:0,
            width:1,background:C.gray,pointerEvents:"none"}}/>
        )}
        <div style={{position:"relative"}}>
          {depth>0&&(
            <div style={{position:"absolute",left:-12,top:18,
              width:10,height:1,background:C.gray}}/>
          )}
          <div
            style={{display:"flex",alignItems:"center",gap:10,
              padding:"10px 12px",borderRadius:12,marginBottom:4,
              background: highlight&&(search||filterType) ? `${st.color}08` : C.white,
              border:`1px solid ${highlight&&(search||filterType)?st.border:C.gray}`,
              transition:"all 0.15s",cursor:"pointer"}}
            onMouseEnter={e=>e.currentTarget.style.background=`${st.color}06`}
            onMouseLeave={e=>e.currentTarget.style.background=highlight&&(search||filterType)?`${st.color}08`:C.white}>

            {/* expand toggle */}
            <div onClick={()=>hasKids&&toggleExp(node.id)}
              style={{width:24,height:24,borderRadius:7,background:hasKids?st.bg:C.lightGray,
                flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
                cursor:hasKids?"pointer":"default",transition:"transform 0.2s",
                transform:hasKids&&open?"rotate(90deg)":"rotate(0deg)"}}>
              {hasKids
                ? <Ico d={I.chevR} size={12} color={st.color}/>
                : <div style={{width:4,height:4,borderRadius:"50%",background:C.gray}}/>}
            </div>

            {/* icon */}
            <div style={{width:34,height:34,borderRadius:10,background:st.bg,flexShrink:0,
              border:`1.5px solid ${st.border}`,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={st.icon} size={15} color={st.color}/>
            </div>

            {/* info */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:13,fontWeight:700,color:C.dark}}>{node.name}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:20,
                  background:st.bg,color:st.color,flexShrink:0}}>{st.label}</span>
                {!node.active&&(
                  <span style={{fontSize:10,fontWeight:600,padding:"1px 6px",borderRadius:20,
                    background:C.redLight,color:C.red,flexShrink:0}}>Faol emas</span>
                )}
              </div>
              <div style={{fontSize:11,color:C.light,fontFamily:"monospace",marginTop:1}}>
                {node.code}
                {hasKids&&<span style={{marginLeft:8,color:C.light,fontFamily:"'DM Sans',sans-serif"}}>• {node.children.length} ta bo'linma</span>}
              </div>
            </div>

            {/* actions */}
            <div style={{display:"flex",gap:5,flexShrink:0}}>
              <button onClick={e=>{e.stopPropagation();setDetailItem(node);}}
                style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                  background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.eye} size={12} color={C.bright}/>
              </button>
              <button onClick={e=>{e.stopPropagation();showToast("Tahrirlash ochildi");}}
                style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                  background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.edit} size={12} color={C.green}/>
              </button>
            </div>
          </div>

          {/* Children */}
          {hasKids&&open&&(
            <div style={{paddingLeft:20,position:"relative"}}>
              {node.children.map(ch=>(
                <TreeNode key={ch.id} node={ch} depth={depth+1}/>
              ))}
            </div>
          )}
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

      <div style={{padding:"24px 28px",maxWidth:1100,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Bo'linmalar tuzilmasi
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{RAW.length}</b> ta bo'linma •{" "}
              <span style={{color:C.bright}}>{byType["11"]||0} fakultet</span> •{" "}
              <span style={{color:C.purple}}>{byType["12"]||0} kafedra</span> •{" "}
              <span style={{color:C.teal}}>{byType["13"]||0} bo'lim</span>
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* View toggle */}
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[{m:"tree",i:I.tree},{m:"table",i:I.list}].map(({m,i})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi bo'linma qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Qo'shish
            </button>
          </div>
        </div>

        {/* ── STATS CARDS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:20}}>
          {[
            {label:"Fakultet",  value:byType["11"]||0, ...getST("11")},
            {label:"Kafedra",   value:byType["12"]||0, ...getST("12")},
            {label:"Bo'lim",    value:byType["13"]||0, ...getST("13")},
            {label:"Boshqarma", value:byType["14"]||0, ...getST("14")},
            {label:"Rektorat",  value:byType["16"]||0, ...getST("16")},
          ].map((s,i)=>(
            <div key={i}
              onClick={()=>{setFilterType(filterType===Object.keys(ST)[i]?"":Object.keys(ST)[i]);setViewMode("table");setPage(1);}}
              style={{background:C.white,borderRadius:14,padding:"12px 14px",
                border:`1.5px solid ${filterType===Object.keys(ST)[i]?s.color:C.gray}`,
                display:"flex",alignItems:"center",gap:10,cursor:"pointer",
                transition:"all 0.15s",animation:`fadeUp 0.3s ${i*40}ms ease both`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 6px 16px ${s.color}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <div style={{width:36,height:36,borderRadius:10,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.icon} size={16} color={s.color}/>
              </div>
              <div>
                <div style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {s.value}
                </div>
                <div style={{fontSize:10,color:C.light,fontWeight:500,marginTop:2}}>{s.label}</div>
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
              placeholder="Bo'linma nomi yoki kodi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterType} onChange={e=>{setFilterType(e.target.value);setPage(1);}} style={{minWidth:160}}>
            <option value="">Barcha turlar</option>
            <option value="11">Fakultet</option>
            <option value="12">Kafedra</option>
            <option value="13">Bo'lim</option>
            <option value="14">Boshqarma</option>
            <option value="16">Rektorat</option>
          </Sel>
          {(search||filterType)&&(
            <button onClick={()=>{setSearch("");setFilterType("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* ═══ TREE VIEW ═══ */}
        {viewMode==="tree"&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,padding:"16px"}}>
            {/* Expand/collapse all */}
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <button onClick={()=>{const m={}; RAW.forEach(r=>m[r.id]=true); setExpanded(m);}}
                style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                  background:C.white,color:C.mid,display:"flex",alignItems:"center",gap:5}}>
                <Ico d={I.chevD} size={12} color={C.mid}/> Barchasini yoy
              </button>
              <button onClick={()=>setExpanded({})}
                style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                  background:C.white,color:C.mid,display:"flex",alignItems:"center",gap:5}}>
                <Ico d={I.chevR} size={12} color={C.mid}/> Barchasini yig'
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              {tree.map((node,i)=>(
                <div key={node.id} style={{animation:`fadeUp 0.28s ${i*40}ms ease both`}}>
                  <TreeNode node={node} depth={0}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TABLE VIEW ═══ */}
        {viewMode==="table"&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",
                gridTemplateColumns:"44px 1fr 140px 120px 110px 80px 90px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["ID","Nomi","Kodi","Turi","Joylashuv","Holat","Amallar"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>

              {paginated.length===0&&(
                <div style={{padding:"48px",textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:600,color:C.mid}}>Natija topilmadi</div>
                </div>
              )}

              {paginated.map((item, idx)=>{
                const st  = getST(item.structureType.code);
                const par = item.parent ? RAW.find(r=>r.id===item.parent) : null;
                return (
                  <div key={item.id}
                    style={{display:"grid",
                      gridTemplateColumns:"44px 1fr 140px 120px 110px 80px 90px",
                      padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,transition:"background 0.15s",
                      animation:`fadeUp 0.22s ${idx*20}ms ease both`}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{item.id}</span>
                    </div>

                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:30,height:30,borderRadius:9,background:st.bg,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${st.border}`}}>
                        <Ico d={st.icon} size={13} color={st.color}/>
                      </div>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:C.dark}}>{item.name}</div>
                        {par&&<div style={{fontSize:10,color:C.light}}>{par.name}</div>}
                      </div>
                    </div>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,color:C.mid,fontFamily:"monospace",fontWeight:600}}>{item.code}</span>
                    </div>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,
                        background:st.bg,color:st.color,display:"inline-flex",alignItems:"center",gap:4}}>
                        <Ico d={st.icon} size={9} color={st.color}/>{st.label}
                      </span>
                    </div>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,color:C.mid,fontWeight:500}}>{item.localityType.name}</span>
                    </div>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,
                        background:item.active?C.greenLight:C.redLight,
                        color:item.active?C.green:C.red}}>
                        {item.active?"Faol":"Nofaol"}
                      </span>
                    </div>

                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <button onClick={()=>setDetailItem(item)}
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
                  {Array.from({length:Math.min(pageCount,7)},(_,i)=>{
                    const n=i+1;
                    return (
                      <button key={n} onClick={()=>setPage(n)}
                        style={{width:32,height:32,borderRadius:8,fontFamily:"inherit",fontSize:13,fontWeight:600,
                          border:`1px solid ${n===page?C.bright:C.gray}`,cursor:"pointer",
                          background:n===page?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                          color:n===page?C.white:C.mid}}>
                        {n}
                      </button>
                    );
                  })}
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
