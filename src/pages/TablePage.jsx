import { useState, useMemo } from "react";

const C = {
  navy:"#0D1A63",blue:"#1E3A9E",bright:"#2845D6",lightBlue:"#EEF2FF",
  orange:"#F68048",orangeLight:"#FFF4ED",green:"#16A34A",greenLight:"#F0FDF4",
  red:"#DC2626",redLight:"#FEF2F2",yellow:"#D97706",yellowLight:"#FFFBEB",
  purple:"#7C3AED",purpleLight:"#F5F3FF",
  dark:"#0F172A",mid:"#475569",light:"#94A3B8",gray:"#E2E8F0",
  lightGray:"#F8FAFC",white:"#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:${C.lightGray}; }
  ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  tr:hover td { background:${C.lightGray} !important; }
  input,button,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  .cb:hover{background:${C.lightBlue}!important}
`;

const Ico = ({ d, size=16, color="currentColor", fill="none", sw=2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);

const ICONS = {
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  filter: "M4 6h16M7 12h10M10 18h4",
  sort:   "M3 6l9-4 9 4M3 18l9 4 9-4M3 12h18",
  sortUp: "M3 9l9-7 9 7M3 18l9 4 9-4",
  sortDn: "M3 6l9 4 9-4M3 15l9 7 9-7",
  edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:  "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  plus:   "M12 5v14M5 12h14",
  down:   "M6 9l6 6 6-6",
  up:     "M18 15l-6-6-6 6",
  export: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  check:  "M20 6L9 17l-5-5",
  x:      "M18 6L6 18M6 6l12 12",
  dots:   "M12 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  chevL:  "M15 18l-6-6 6-6",
  chevR:  "M9 18l6-6-6-6",
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  mail:   "M4 4h16v16H4zM4 4l8 9 8-9",
  phone:  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.24 16z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

// ── SAMPLE DATA ──
const ROLES = ["Admin","O'qituvchi","Talaba","Dekan","Kutubxonachi"];
const STATUSES = ["Faol","Nofaol","Bloklangan","Kutilmoqda"];
const FACULTIES = ["Axborot texnologiyalari","Iqtisodiyot","Huquqshunoslik","Matematika","Fizika"];
const STATUS_COLORS = { "Faol":C.green, "Nofaol":C.light, "Bloklangan":C.red, "Kutilmoqda":C.yellow };
const STATUS_BG = { "Faol":C.greenLight, "Nofaol":C.lightGray, "Bloklangan":C.redLight, "Kutilmoqda":C.yellowLight };

const seed = (n) => Array.from({length:n},(_,i)=>({
  id: i+1,
  name: ["Alisher Qodirov","Dilnoza Yusupova","Jasur Toshmatov","Malika Karimova","Sanjar Nazarov","Barno Rahimova","Otabek Mirzayev","Zulfiya Abdullayeva","Bekzod Ismoilov","Nodira Hasanova","Ulugbek Rашидов","Feruza Sobirov","Sherzod Tursunov","Gulnora Xoliqova","Doniyor Ergashev","Sabohat Mirzayeva","Husan Normatov","Mohira Qosimova","Ravshan Haydarov","Nilufar Botirov"][i%20],
  email: `user${i+1}@edu.uz`,
  phone: `+998 9${i%3} ${100+i} ${10+i} ${20+i}`,
  role: ROLES[i%5],
  faculty: FACULTIES[i%5],
  status: STATUSES[i%4],
  gpa: (2.5 + Math.random()*1.5).toFixed(2),
  course: (i%4)+1,
  joined: `${2020+(i%4)}-${String((i%12)+1).padStart(2,"0")}-${String((i%28)+1).padStart(2,"0")}`,
}));

const USERS = seed(87);

const COURSES_DATA = Array.from({length:24},(_,i)=>({
  id:i+1,
  name:["Matematika I","Dasturlash asoslari","Ma'lumotlar bazasi","Kompyuter tarmoqlari","Algoritmlar","OOP","Web dasturlash","Sun'iy intellekt","Fizika","Kimyo","Ingliz tili","Rus tili","Iqtisodiyot nazariyasi","Buxgalteriya","Huquq asoslari","Sotsiologiya","Tarix","Falsafa","Statistika","Ekologiya","Psixologiya","Sport","Chizmachilik","Pedagogika"][i],
  faculty: FACULTIES[i%5],
  teacher: ["Prof. B.Yusupov","Prof. D.Karimova","Prof. J.Toshmatov","Prof. S.Nazarov","Dos. M.Rahimova"][i%5],
  students: 20+i*3,
  credits: [2,3,4,5][i%4],
  status: i%5===3?"Nofaol":"Faol",
}));

// ── HELPERS ──
const Badge = ({label,color,bg})=>(
  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,color,background:bg,whiteSpace:"nowrap"}}>{label}</span>
);
const Btn = ({children,onClick,variant="primary",size="md",disabled})=>{
  const styles = {
    primary: {background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,border:"none",boxShadow:`0 3px 10px ${C.bright}30`},
    ghost:   {background:C.lightBlue,color:C.bright,border:`1px solid ${C.bright}20`},
    danger:  {background:C.redLight,color:C.red,border:`1px solid ${C.red}20`},
    outline: {background:C.white,color:C.mid,border:`1px solid ${C.gray}`},
  };
  const sizes = { sm:{padding:"5px 12px",fontSize:12}, md:{padding:"8px 16px",fontSize:13}, lg:{padding:"10px 20px",fontSize:14} };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{...styles[variant],...sizes[size],borderRadius:9,cursor:disabled?"not-allowed":"pointer",
        fontFamily:"'DM Sans',sans-serif",fontWeight:600,display:"inline-flex",alignItems:"center",gap:6,
        opacity:disabled?0.5:1,transition:"all 0.2s",whiteSpace:"nowrap"}}>
      {children}
    </button>
  );
};

// ── DATATABLE ──
function DataTable({ data, columns, onEdit, onDelete, onView }) {
  const [search,setSearch]=useState("");
  const [sortCol,setSortCol]=useState(null);
  const [sortDir,setSortDir]=useState("asc");
  const [page,setPage]=useState(1);
  const [perPage,setPerPage]=useState(10);
  const [selected,setSelected]=useState([]);
  const [filters,setFilters]=useState({});
  const [showFilters,setShowFilters]=useState(false);

  const filtered = useMemo(()=>{
    let d = data.filter(row =>
      columns.some(col=> String(row[col.key]||"").toLowerCase().includes(search.toLowerCase()))
    );
    Object.entries(filters).forEach(([k,v])=>{ if(v) d=d.filter(r=>String(r[k])===v); });
    if(sortCol) d=[...d].sort((a,b)=>{
      const av=a[sortCol], bv=b[sortCol];
      const cmp = typeof av==="number"?av-bv:String(av).localeCompare(String(bv));
      return sortDir==="asc"?cmp:-cmp;
    });
    return d;
  },[data,search,sortCol,sortDir,filters]);

  const totalPages = Math.ceil(filtered.length/perPage);
  const paged = filtered.slice((page-1)*perPage, page*perPage);

  const toggleSort = col => {
    if(sortCol===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortCol(col); setSortDir("asc"); }
    setPage(1);
  };

  const toggleAll = () => setSelected(s=> s.length===paged.length ? [] : paged.map(r=>r.id));
  const toggleRow = id => setSelected(s=> s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  const SortIcon = ({col})=>{
    if(sortCol!==col) return <span style={{opacity:0.3}}><Ico d={ICONS.sort} size={13} color={C.mid}/></span>;
    return <Ico d={sortDir==="asc"?ICONS.sortUp:ICONS.sortDn} size={13} color={C.bright}/>;
  };

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      {/* Toolbar */}
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{flex:1,minWidth:200,position:"relative"}}>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Qidirish..."
            style={{width:"100%",padding:"9px 12px 9px 36px",borderRadius:10,border:`1.5px solid ${C.gray}`,
              background:C.white,fontSize:13,color:C.dark}}/>
          <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:C.light,pointerEvents:"none"}}>
            <Ico d={ICONS.search} size={15}/>
          </span>
        </div>
        <Btn variant="outline" size="sm" onClick={()=>setShowFilters(p=>!p)}>
          <Ico d={ICONS.filter} size={14} color={C.mid}/> Filter {showFilters?"▲":"▼"}
        </Btn>
        {selected.length>0&&(
          <>
            <span style={{fontSize:12,color:C.mid,fontWeight:600}}>{selected.length} ta tanlandi</span>
            <Btn variant="danger" size="sm"><Ico d={ICONS.trash} size={13} color={C.red}/> O'chirish</Btn>
            <Btn variant="outline" size="sm"><Ico d={ICONS.export} size={13} color={C.mid}/> Export</Btn>
          </>
        )}
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:12,color:C.light}}>Sahifada:</span>
          <select value={perPage} onChange={e=>{setPerPage(+e.target.value);setPage(1);}}
            style={{padding:"7px 10px",borderRadius:8,border:`1px solid ${C.gray}`,background:C.white,fontSize:12,color:C.mid}}>
            {[5,10,20,50].map(n=><option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Filters row */}
      {showFilters&&(
        <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap",padding:"12px 14px",
          background:C.white,borderRadius:10,border:`1px solid ${C.gray}`,animation:"fadeIn 0.2s ease"}}>
          {columns.filter(c=>c.filterable).map(col=>(
            <div key={col.key}>
              <div style={{fontSize:10,fontWeight:700,color:C.light,marginBottom:4,textTransform:"uppercase"}}>{col.label}</div>
              <select value={filters[col.key]||""} onChange={e=>{setFilters(p=>({...p,[col.key]:e.target.value}));setPage(1);}}
                style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${C.gray}`,background:C.white,fontSize:12,color:C.mid,minWidth:130}}>
                <option value="">Barchasi</option>
                {col.filterOptions.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={()=>{setFilters({});setPage(1);}}
            style={{alignSelf:"flex-end",padding:"6px 12px",borderRadius:8,border:`1px solid ${C.gray}`,
              background:C.white,fontSize:12,color:C.red,cursor:"pointer",fontFamily:"inherit"}}>
            Tozalash
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead>
              <tr style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`}}>
                <th style={{padding:"11px 14px",width:40}}>
                  <div onClick={toggleAll} style={{width:18,height:18,borderRadius:5,border:`2px solid ${selected.length===paged.length&&paged.length>0?"transparent":"rgba(255,255,255,0.4)"}`,
                    background:selected.length===paged.length&&paged.length>0?C.white:"transparent",
                    cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {selected.length===paged.length&&paged.length>0&&<Ico d={ICONS.check} size={11} color={C.bright}/>}
                  </div>
                </th>
                {columns.map(col=>(
                  <th key={col.key} onClick={()=>col.sortable&&toggleSort(col.key)}
                    style={{padding:"11px 14px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.85)",
                      textAlign:"left",whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:"0.5px",
                      cursor:col.sortable?"pointer":"default",userSelect:"none"}}>
                    <span style={{display:"inline-flex",alignItems:"center",gap:5}}>
                      {col.label}{col.sortable&&<SortIcon col={col.key}/>}
                    </span>
                  </th>
                ))}
                <th style={{padding:"11px 14px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.85)",textAlign:"center",textTransform:"uppercase",letterSpacing:"0.5px"}}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {paged.length===0?(
                <tr><td colSpan={columns.length+2} style={{padding:"40px",textAlign:"center",color:C.light,fontSize:14}}>Ma'lumot topilmadi</td></tr>
              ):paged.map((row,i)=>(
                <tr key={row.id} style={{borderBottom:`1px solid ${C.lightGray}`,transition:"background 0.12s"}}>
                  <td style={{padding:"12px 14px"}}>
                    <div onClick={()=>toggleRow(row.id)} style={{width:18,height:18,borderRadius:5,
                      border:`2px solid ${selected.includes(row.id)?C.bright:C.gray}`,
                      background:selected.includes(row.id)?C.bright:"transparent",
                      cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                      {selected.includes(row.id)&&<Ico d={ICONS.check} size={11} color={C.white}/>}
                    </div>
                  </td>
                  {columns.map(col=>(
                    <td key={col.key} style={{padding:"12px 14px",fontSize:13,color:C.dark}}>
                      {col.render?col.render(row[col.key],row):row[col.key]}
                    </td>
                  ))}
                  <td style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",gap:5,justifyContent:"center"}}>
                      {onView&&<button onClick={()=>onView(row)} className="cb" style={{width:30,height:30,borderRadius:7,border:"none",cursor:"pointer",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s"}}>
                        <Ico d={ICONS.eye} size={15} color={C.light}/>
                      </button>}
                      {onEdit&&<button onClick={()=>onEdit(row)} className="cb" style={{width:30,height:30,borderRadius:7,border:"none",cursor:"pointer",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s"}}>
                        <Ico d={ICONS.edit} size={15} color={C.bright}/>
                      </button>}
                      {onDelete&&<button onClick={()=>onDelete(row)} className="cb" style={{width:30,height:30,borderRadius:7,border:"none",cursor:"pointer",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s"}}>
                        <Ico d={ICONS.trash} size={15} color={C.red}/>
                      </button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderTop:`1px solid ${C.lightGray}`,flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:12,color:C.light}}>
            {filtered.length} ta natijadan {Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)} ko'rsatilmoqda
          </span>
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            <button onClick={()=>setPage(1)} disabled={page===1} style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.gray}`,background:C.white,cursor:page===1?"not-allowed":"pointer",fontSize:11,color:C.mid,opacity:page===1?0.4:1}}>«</button>
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.gray}`,background:C.white,cursor:page===1?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
              <Ico d={ICONS.chevL} size={13} color={C.mid}/>
            </button>
            {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
              let p;
              if(totalPages<=5) p=i+1;
              else if(page<=3) p=i+1;
              else if(page>=totalPages-2) p=totalPages-4+i;
              else p=page-2+i;
              return (
                <button key={p} onClick={()=>setPage(p)}
                  style={{width:30,height:30,borderRadius:7,border:`1px solid ${page===p?C.bright:C.gray}`,
                    background:page===p?C.bright:C.white,color:page===p?C.white:C.mid,
                    cursor:"pointer",fontSize:12,fontWeight:page===p?700:400,transition:"all 0.15s"}}>
                  {p}
                </button>
              );
            })}
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.gray}`,background:C.white,cursor:page===totalPages?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:page===totalPages?0.4:1}}>
              <Ico d={ICONS.chevR} size={13} color={C.mid}/>
            </button>
            <button onClick={()=>setPage(totalPages)} disabled={page===totalPages} style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.gray}`,background:C.white,cursor:page===totalPages?"not-allowed":"pointer",fontSize:11,color:C.mid,opacity:page===totalPages?0.4:1}}>»</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SIMPLE TABLE ──
function SimpleTable({ title, data, columns }) {
  return (
    <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.gray}`,overflow:"hidden",marginBottom:24}}>
      {title&&<div style={{padding:"14px 18px",borderBottom:`1px solid ${C.lightGray}`,fontSize:14,fontWeight:700,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{title}</div>}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:C.lightGray}}>
              {columns.map(c=><th key={c.key} style={{padding:"10px 14px",fontSize:11,fontWeight:700,color:C.light,textAlign:"left",textTransform:"uppercase",letterSpacing:"0.5px",whiteSpace:"nowrap"}}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${C.lightGray}`}}>
                {columns.map(c=>(
                  <td key={c.key} style={{padding:"11px 14px",fontSize:13,color:C.dark}}>
                    {c.render?c.render(row[c.key],row):row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── MAIN EXPORT ──
export default function TablePage() {
  const [activeTab,setActiveTab]=useState("users");
  const [editUser,setEditUser]=useState(null);

  const userColumns = [
    { key:"id", label:"#", sortable:true },
    { key:"name", label:"Ism Familiya", sortable:true, render:(v,r)=>(
      <div style={{display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:32,height:32,borderRadius:9,background:`linear-gradient(135deg,${C.bright}18,${C.orange}22)`,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:13,fontWeight:700,color:C.bright}}>{v.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:C.dark}}>{v}</div>
          <div style={{fontSize:11,color:C.light}}>{r.email}</div>
        </div>
      </div>
    )},
    { key:"role", label:"Rol", sortable:true, filterable:true, filterOptions:ROLES,
      render:v=><Badge label={v} color={C.bright} bg={C.lightBlue}/> },
    { key:"faculty", label:"Fakultet", sortable:true, filterable:true, filterOptions:FACULTIES,
      render:v=><span style={{fontSize:12,color:C.mid}}>{v}</span> },
    { key:"status", label:"Holat", sortable:true, filterable:true, filterOptions:STATUSES,
      render:v=><Badge label={v} color={STATUS_COLORS[v]} bg={STATUS_BG[v]}/> },
    { key:"gpa", label:"GPA", sortable:true, render:v=><span style={{fontWeight:700,color:+v>=3.5?C.green:+v>=2.5?C.orange:C.red}}>{v}</span> },
    { key:"joined", label:"Qo'shilgan", sortable:true },
  ];

  const courseColumns = [
    { key:"id", label:"#", sortable:true },
    { key:"name", label:"Fan nomi", sortable:true },
    { key:"faculty", label:"Fakultet", sortable:true, filterable:true, filterOptions:FACULTIES },
    { key:"teacher", label:"O'qituvchi", sortable:true },
    { key:"students", label:"Talabalar", sortable:true, render:v=>(
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <div style={{width:40,height:6,borderRadius:3,background:C.lightGray,overflow:"hidden"}}>
          <div style={{width:`${(v/80)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.bright},${C.orange})`,borderRadius:3}}/>
        </div>
        <span style={{fontSize:12,fontWeight:700,color:C.mid}}>{v}</span>
      </div>
    )},
    { key:"credits", label:"Kredit", sortable:true, render:v=><Badge label={`${v} kr`} color={C.purple} bg={C.purpleLight}/> },
    { key:"status", label:"Holat", sortable:true, filterable:true, filterOptions:["Faol","Nofaol"],
      render:v=><Badge label={v} color={v==="Faol"?C.green:C.light} bg={v==="Faol"?C.greenLight:C.lightGray}/> },
  ];

  const summaryData = USERS.reduce((acc,u)=>{
    const key=u.role; acc[key]=(acc[key]||0)+1; return acc;
  },{});

  return (
    <>
      <style>{css}</style>
      <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>
        {/* Header */}
        <div style={{marginBottom:22}}>
          <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>Jadvallar va Ma'lumotlar</h1>
          <p style={{fontSize:13,color:C.light}}>DataTable, oddiy jadval va boshqaruv amallarining namunasi</p>
        </div>

        {/* Tab switcher */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {[{id:"users",label:"Foydalanuvchilar"},{id:"courses",label:"Fanlar ro'yxati"},{id:"simple",label:"Oddiy jadvallar"}].map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              style={{
                padding:"8px 18px",
                borderRadius:9,
                cursor:"pointer",
                fontFamily:"inherit",fontSize:13,
                fontWeight:activeTab===t.id?700:500,
                background:activeTab===t.id?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                color:activeTab===t.id?C.white:C.mid,
                boxShadow:activeTab===t.id?`0 3px 12px ${C.bright}30`:"none",
                border:activeTab===t.id?"none":`1px solid ${C.gray}`,
                transition:"all 0.2s"}}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab==="users"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div style={{fontSize:14,fontWeight:700,color:C.dark}}>Jami: <span style={{color:C.bright}}>{USERS.length}</span> ta foydalanuvchi</div>
              <Btn><Ico d={ICONS.plus} size={14} color={C.white}/> Yangi foydalanuvchi</Btn>
            </div>
            <DataTable data={USERS} columns={userColumns}
              onView={r=>alert(`Ko'rish: ${r.name}`)}
              onEdit={r=>setEditUser(r)}
              onDelete={r=>confirm(`${r.name}ni o'chirasizmi?`)}/>
          </div>
        )}

        {activeTab==="courses"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div style={{fontSize:14,fontWeight:700,color:C.dark}}>Jami: <span style={{color:C.bright}}>{COURSES_DATA.length}</span> ta fan</div>
              <Btn><Ico d={ICONS.plus} size={14} color={C.white}/> Yangi fan</Btn>
            </div>
            <DataTable data={COURSES_DATA} columns={courseColumns}
              onView={r=>alert(`Ko'rish: ${r.name}`)}
              onEdit={r=>alert(`Tahrirlash: ${r.name}`)}
              onDelete={r=>confirm(`${r.name}ni o'chirasizmi?`)}/>
          </div>
        )}

        {activeTab==="simple"&&(
          <div>
            <SimpleTable title="Rollar statistikasi" data={Object.entries(summaryData).map(([role,count])=>({role,count,pct:((count/USERS.length)*100).toFixed(1)}))}
              columns={[
                {key:"role",label:"Rol",render:v=><Badge label={v} color={C.bright} bg={C.lightBlue}/>},
                {key:"count",label:"Soni",render:v=><span style={{fontWeight:700,color:C.dark}}>{v}</span>},
                {key:"pct",label:"Foiz",render:v=>(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:80,height:6,borderRadius:3,background:C.lightGray}}>
                      <div style={{width:`${v}%`,height:"100%",background:`linear-gradient(90deg,${C.bright},${C.orange})`,borderRadius:3}}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:700,color:C.bright}}>{v}%</span>
                  </div>
                )},
              ]}/>
            <SimpleTable title="Oxirgi kirishlar" data={USERS.slice(0,8).map(u=>({...u,lastLogin:"Bugun "+("0"+(9+USERS.indexOf(u))).slice(-2)+":"+("0"+(10+USERS.indexOf(u)%50)).slice(-2)}))}
              columns={[
                {key:"name",label:"Foydalanuvchi",render:(v,r)=>(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:28,height:28,borderRadius:8,background:`${C.bright}15`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.bright}}>{v.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
                    </div>
                    <span style={{fontWeight:600,color:C.dark}}>{v}</span>
                  </div>
                )},
                {key:"role",label:"Rol",render:v=><Badge label={v} color={C.bright} bg={C.lightBlue}/>},
                {key:"lastLogin",label:"Oxirgi kirish"},
                {key:"status",label:"Holat",render:v=><Badge label={v} color={STATUS_COLORS[v]} bg={STATUS_BG[v]}/>},
              ]}/>
            <SimpleTable title="Top fanlar (talabalar soni bo'yicha)" data={[...COURSES_DATA].sort((a,b)=>b.students-a.students).slice(0,8)}
              columns={[
                {key:"name",label:"Fan"},
                {key:"teacher",label:"O'qituvchi"},
                {key:"students",label:"Talabalar",render:v=>(
                  <div style={{display:"flex",alignItems:"center",gap:8,minWidth:120}}>
                    <div style={{flex:1,height:6,borderRadius:3,background:C.lightGray}}>
                      <div style={{width:`${(v/100)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.green},${C.bright})`,borderRadius:3}}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:700,color:C.dark,minWidth:24}}>{v}</span>
                  </div>
                )},
                {key:"credits",label:"Kredit",render:v=><Badge label={`${v} kr`} color={C.purple} bg={C.purpleLight}/>},
              ]}/>
          </div>
        )}

        {/* Inline edit mini modal */}
        {editUser&&(
          <div style={{position:"fixed",inset:0,background:"rgba(13,26,99,0.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)",animation:"fadeIn 0.2s"}}
            onClick={e=>e.target===e.currentTarget&&setEditUser(null)}>
            <div style={{background:C.white,borderRadius:18,padding:28,width:440,boxShadow:"0 24px 64px rgba(13,26,99,0.18)",animation:"fadeUp 0.25s ease"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                <h3 style={{fontSize:17,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Foydalanuvchini tahrirlash</h3>
                <button onClick={()=>setEditUser(null)} style={{width:32,height:32,borderRadius:8,border:"none",background:C.lightGray,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Ico d={ICONS.x} size={15} color={C.mid}/>
                </button>
              </div>
              {[{l:"Ism Familiya",v:"name"},{l:"Email",v:"email"},{l:"Telefon",v:"phone"}].map(f=>(
                <div key={f.v} style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.3px"}}>{f.l}</div>
                  <input defaultValue={editUser[f.v]} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}/>
                </div>
              ))}
              <div style={{display:"flex",gap:10,marginTop:20}}>
                <Btn onClick={()=>setEditUser(null)}>Saqlash</Btn>
                <Btn variant="outline" onClick={()=>setEditUser(null)}>Bekor qilish</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
