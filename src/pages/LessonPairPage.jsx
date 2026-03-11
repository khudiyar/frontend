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
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico = ({d,size=16,color="currentColor",sw=2,fill="none"})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  sun:     "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
  moon:    "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  coffee:  "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  plus:    "M12 5v14M5 12h14",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevL:   "M15 18l-6-6 6-6",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  timeline:"M12 20V4M5 9l7-7 7 7M5 15l7 7 7-7",
  bell:    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  calendar:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  hash:    "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
};

/* ───────────────────────────────────────────────
   DARS JUFTLIKLARI HISOB-KITOBI
   Ertalab 08:30 dan, har juftlik 80 daqiqa
   1-2 orasida 10 min, 2-3 orasida 20 min
   Tushdan keyin 13:30 dan boshlansa:
     1-juft: 08:30 – 09:50
     tanaffus 10 min
     2-juft: 10:00 – 11:20
     tanaffus 20 min
     3-juft: 11:40 – 13:00
     tush tanaffusi 30 min
     4-juft: 13:30 – 14:50
     tanaffus 10 min
     5-juft: 15:00 – 16:20
     tanaffus 10 min
     6-juft: 16:30 – 17:50
     tanaffus 10 min
     7-juft: 18:00 – 19:20  (kechki smena)
─────────────────────────────────────────────── */

const RAW = [
  {
    code: "1",
    name: "1-juftlik",
    start_time: "08:30",
    end_time:   "09:50",
    _education_year: "2025",
    session: "morning",
    break_after: {duration:10, label:"10 daqiqa tanaffus"},
    pair_number: 1,
  },
  {
    code: "2",
    name: "2-juftlik",
    start_time: "10:00",
    end_time:   "11:20",
    _education_year: "2025",
    session: "morning",
    break_after: {duration:20, label:"20 daqiqa katta tanaffus"},
    pair_number: 2,
  },
  {
    code: "3",
    name: "3-juftlik",
    start_time: "11:40",
    end_time:   "13:00",
    _education_year: "2025",
    session: "morning",
    break_after: {duration:30, label:"Tush tanaffusi (13:00–13:30)"},
    pair_number: 3,
    is_last_morning: true,
  },
  {
    code: "4",
    name: "4-juftlik",
    start_time: "13:30",
    end_time:   "14:50",
    _education_year: "2025",
    session: "afternoon",
    break_after: {duration:10, label:"10 daqiqa tanaffus"},
    pair_number: 4,
    is_first_afternoon: true,
  },
  {
    code: "5",
    name: "5-juftlik",
    start_time: "15:00",
    end_time:   "16:20",
    _education_year: "2025",
    session: "afternoon",
    break_after: {duration:10, label:"10 daqiqa tanaffus"},
    pair_number: 5,
  },
  {
    code: "6",
    name: "6-juftlik",
    start_time: "16:30",
    end_time:   "17:50",
    _education_year: "2025",
    session: "afternoon",
    break_after: {duration:10, label:"10 daqiqa tanaffus"},
    pair_number: 6,
  },
  {
    code: "7",
    name: "7-juftlik",
    start_time: "18:00",
    end_time:   "19:20",
    _education_year: "2025",
    session: "evening",
    break_after: null,
    pair_number: 7,
  },
];

/* ── current time helpers ── */
function timeToMins(t) {
  const [h,m] = t.split(":").map(Number);
  return h*60+m;
}
function getNowMins() {
  const now = new Date();
  return now.getHours()*60 + now.getMinutes();
}
function getPairStatus(pair) {
  const nowM  = getNowMins();
  const start = timeToMins(pair.start_time);
  const end   = timeToMins(pair.end_time);
  if(nowM < start) return "upcoming";
  if(nowM >= start && nowM <= end) return "active";
  return "done";
}

/* ── SESSION CONFIG ── */
const SESSION = {
  morning:   {label:"Ertalabki smena",  icon:I.sun,     color:C.orange, bg:C.orangeLight, range:"08:30 – 13:00"},
  afternoon: {label:"Tushdan keyingi",  icon:I.coffee,  color:C.teal,   bg:C.tealLight,   range:"13:30 – 17:50"},
  evening:   {label:"Kechki smena",     icon:I.moon,    color:C.purple, bg:C.purpleLight, range:"18:00 – 19:20"},
};

/* ── BREAK COLORS ── */
const breakColor = duration =>
  duration >= 30 ? {bg:"#FFF7ED",color:C.orange,border:"#FED7AA"}
  : duration >= 20 ? {bg:"#EDE9FE",color:C.purple,border:"#DDD6FE"}
  : {bg:"#F0FDF4",color:C.green,border:"#BBF7D0"};

/* ─────────────────────── MAIN ─────────────────────── */
export default function LessonPairPage() {
  const [viewMode,   setViewMode]   = useState("timeline");
  const [detailItem, setDetailItem] = useState(null);
  const [toast,      setToast]      = useState(null);
  const [editItem,   setEditItem]   = useState(null);

  // Live clock
  const [nowStr, setNowStr] = useState(()=>{
    const d=new Date(); return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
  });
  useState(()=>{
    const t = setInterval(()=>{
      const d=new Date();
      setNowStr(`${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`);
    },30000);
    return ()=>clearInterval(t);
  });

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* group by session */
  const bySession = useMemo(()=>{
    const m = {};
    RAW.forEach(r=>{
      if(!m[r.session]) m[r.session]=[];
      m[r.session].push(r);
    });
    return m;
  },[]);

  const activePair = RAW.find(r=>getPairStatus(r)==="active");
  const nextPair   = RAW.find(r=>getPairStatus(r)==="upcoming");
  const nowMins    = getNowMins();

  /* ── STATUS BADGE ── */
  const StatusBadge = ({pair})=>{
    const s = getPairStatus(pair);
    if(s==="active")   return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.greenLight,color:C.green,display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:C.green,animation:"pulse 1s infinite",display:"inline-block"}}/>Hozir dars</span>;
    if(s==="upcoming") return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.lightBlue,color:C.bright}}>Kutilmoqda</span>;
    return <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20,background:C.lightGray,color:C.light}}>Tugagan</span>;
  };

  /* ── DETAIL MODAL ── */
  const DetailModal = ()=>{
    const p = detailItem;
    if(!p) return null;
    const sess  = SESSION[p.session];
    const stat  = getPairStatus(p);
    const dur   = 80;
    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:20,width:"min(440px,95vw)",
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${sess.color})`,padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:"rgba(255,255,255,0.2)",color:C.white}}>{sess.label}</span>
                  <StatusBadge pair={p}/>
                </div>
                <div style={{fontSize:32,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",letterSpacing:"-0.5px",lineHeight:1}}>
                  {p.start_time} <span style={{fontSize:18,opacity:0.6}}>—</span> {p.end_time}
                </div>
                <div style={{fontSize:14,color:"rgba(255,255,255,0.7)",marginTop:4}}>
                  {p.name} • {dur} daqiqa
                </div>
              </div>
              <button onClick={()=>setDetailItem(null)}
                style={{width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",
                  background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ico d={I.x} size={14} color={C.white}/>
              </button>
            </div>
          </div>

          {/* progress bar if active */}
          {stat==="active"&&(()=>{
            const start = timeToMins(p.start_time);
            const end   = timeToMins(p.end_time);
            const pct   = Math.min(100,Math.round(((nowMins-start)/(end-start))*100));
            const rem   = end - nowMins;
            return (
              <div style={{padding:"12px 22px",background:`${C.green}06`,borderBottom:`1px solid ${C.greenLight}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:11,fontWeight:600,color:C.green}}>Dars davom etmoqda</span>
                  <span style={{fontSize:11,fontWeight:700,color:C.green}}>{rem} daqiqa qoldi</span>
                </div>
                <div style={{height:6,borderRadius:99,background:C.greenLight,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${pct}%`,borderRadius:99,
                    background:`linear-gradient(90deg,${C.green},${C.teal})`,transition:"width 1s"}}/>
                </div>
              </div>
            );
          })()}

          {/* details */}
          <div style={{padding:"16px 22px"}}>
            {[
              ["Juftlik №",    `${p.pair_number}-juftlik`],
              ["Kod",          p.code],
              ["O'quv yili",   "2025-2026"],
              ["Smena",        sess.label],
              ["Davomiyligi",  `${dur} daqiqa (1 soat 20 daqiqa)`],
              ["Tanaffus",     p.break_after ? `${p.break_after.duration} daqiqa` : "Yo'q"],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"7px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:700}}>{v}</span>
              </div>
            ))}

            {p.break_after&&(
              <div style={{marginTop:12,padding:"10px 12px",borderRadius:10,
                background:breakColor(p.break_after.duration).bg,
                border:`1px solid ${breakColor(p.break_after.duration).border}`}}>
                <div style={{fontSize:11,fontWeight:700,color:breakColor(p.break_after.duration).color}}>
                  🔔 Keyingi tanaffus: {p.break_after.label}
                </div>
              </div>
            )}
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

  /* ─── TIMELINE VIEW ─── */
  const TimelineView = ()=>(
    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      {Object.entries(bySession).map(([sessKey, pairs],si)=>{
        const sess = SESSION[sessKey];
        return (
          <div key={sessKey} style={{marginBottom:24,animation:`fadeUp 0.3s ${si*80}ms ease both`}}>
            {/* Session header */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:36,height:36,borderRadius:10,background:sess.bg,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={sess.icon} size={16} color={sess.color}/>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{sess.label}</div>
                <div style={{fontSize:11,color:C.light}}>{sess.range}</div>
              </div>
              <div style={{height:1,flex:1,background:C.gray}}/>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                background:sess.bg,color:sess.color}}>{pairs.length} juftlik</span>
            </div>

            {/* Timeline items */}
            <div style={{position:"relative",paddingLeft:52}}>
              {/* vertical line */}
              <div style={{position:"absolute",left:17,top:0,bottom:0,width:2,
                background:`linear-gradient(to bottom,${sess.color}40,${sess.color}10)`,borderRadius:99}}/>

              {pairs.map((pair,idx)=>{
                const stat  = getPairStatus(pair);
                const isAct = stat==="active";
                const isDone= stat==="done";
                const bc    = pair.break_after ? breakColor(pair.break_after.duration) : null;

                return (
                  <div key={pair.code}>
                    {/* pair card */}
                    <div style={{display:"flex",alignItems:"stretch",gap:0,marginBottom:0,position:"relative"}}>
                      {/* dot */}
                      <div style={{position:"absolute",left:-39,top:16,
                        width:18,height:18,borderRadius:"50%",
                        background:isAct?C.green:isDone?C.gray:sess.color,
                        border:`3px solid ${C.white}`,
                        boxShadow:isAct?`0 0 0 4px ${C.green}30`:`0 0 0 3px ${C.lightGray}`,
                        zIndex:1,animation:isAct?"pulse 1.5s infinite":undefined,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {isDone&&<div style={{width:6,height:6,borderRadius:"50%",background:C.light}}/>}
                        {isAct&&<div style={{width:6,height:6,borderRadius:"50%",background:C.white}}/>}
                      </div>

                      {/* card */}
                      <div
                        onClick={()=>setDetailItem(pair)}
                        style={{flex:1,background:C.white,borderRadius:14,
                          border:`1.5px solid ${isAct?C.green:isDone?C.gray:sess.color+"30"}`,
                          padding:"14px 18px",cursor:"pointer",transition:"all 0.18s",
                          opacity:isDone?0.6:1,
                          boxShadow:isAct?`0 4px 20px ${C.green}20`:"none"}}
                        onMouseEnter={e=>{if(!isDone){e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.boxShadow=`0 8px 24px ${sess.color}18`;}}}
                        onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=isAct?`0 4px 20px ${C.green}20`:"none";}}>

                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                          {/* left: time */}
                          <div style={{display:"flex",alignItems:"center",gap:14}}>
                            <div style={{textAlign:"center",minWidth:56}}>
                              <div style={{fontSize:20,fontWeight:800,color:isAct?C.green:isDone?C.light:C.dark,
                                fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                                {pair.start_time}
                              </div>
                              <div style={{fontSize:9,color:C.light,fontWeight:600,marginTop:2,textTransform:"uppercase"}}>
                                boshlanish
                              </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                              <div style={{width:32,height:2,borderRadius:99,
                                background:`linear-gradient(90deg,${isAct?C.green:isDone?C.gray:sess.color},transparent)`}}/>
                              <div style={{fontSize:9,color:C.light,fontWeight:600}}>80 min</div>
                              <div style={{width:32,height:2,borderRadius:99,
                                background:`linear-gradient(90deg,transparent,${isAct?C.green:isDone?C.gray:sess.color})`}}/>
                            </div>
                            <div style={{textAlign:"center",minWidth:56}}>
                              <div style={{fontSize:20,fontWeight:800,color:isAct?C.green:isDone?C.light:C.dark,
                                fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                                {pair.end_time}
                              </div>
                              <div style={{fontSize:9,color:C.light,fontWeight:600,marginTop:2,textTransform:"uppercase"}}>
                                tugash
                              </div>
                            </div>
                          </div>

                          {/* right: info */}
                          <div style={{flex:1,textAlign:"right"}}>
                            <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end",marginBottom:4}}>
                              <StatusBadge pair={pair}/>
                              <span style={{fontSize:12,fontWeight:800,color:isDone?C.light:C.dark,fontFamily:"'Syne',sans-serif"}}>
                                {pair.name}
                              </span>
                            </div>
                            <div style={{fontSize:10,color:C.light}}>Kod: {pair.code} • O'quv yili: 2025-2026</div>
                          </div>
                        </div>

                        {/* progress bar for active */}
                        {isAct&&(()=>{
                          const start = timeToMins(pair.start_time);
                          const end   = timeToMins(pair.end_time);
                          const pct   = Math.min(100,Math.round(((nowMins-start)/(end-start))*100));
                          return (
                            <div style={{marginTop:10}}>
                              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                                <span style={{fontSize:10,color:C.green,fontWeight:600}}>Dars davom etmoqda</span>
                                <span style={{fontSize:10,color:C.green,fontWeight:700}}>{pct}%</span>
                              </div>
                              <div style={{height:4,borderRadius:99,background:C.greenLight,overflow:"hidden"}}>
                                <div style={{height:"100%",width:`${pct}%`,borderRadius:99,
                                  background:`linear-gradient(90deg,${C.green},${C.teal})`}}/>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* break indicator */}
                    {pair.break_after&&(
                      <div style={{marginLeft:0,marginBottom:0,padding:"6px 0 6px 0",
                        display:"flex",alignItems:"center",gap:10}}>
                        <div style={{position:"absolute",left:-32,width:4,height:4,borderRadius:"50%",
                          background:bc.color,opacity:0.5}}/>
                        <div style={{flex:1,display:"flex",alignItems:"center",gap:8,
                          padding:"7px 14px",borderRadius:8,
                          background:bc.bg,border:`1px dashed ${bc.border}`}}>
                          <Ico d={I.coffee} size={12} color={bc.color}/>
                          <span style={{fontSize:11,fontWeight:600,color:bc.color}}>
                            {pair.break_after.label}
                          </span>
                          <span style={{fontSize:10,color:bc.color,opacity:0.7,marginLeft:"auto"}}>
                            {pair.end_time} – {RAW[pair.pair_number]?.start_time}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ─── CARD VIEW ─── */
  const CardView = ()=>(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
      {RAW.map((pair,idx)=>{
        const stat  = getPairStatus(pair);
        const sess  = SESSION[pair.session];
        const isAct = stat==="active";
        const isDone= stat==="done";
        return (
          <div key={pair.code}
            onClick={()=>setDetailItem(pair)}
            style={{background:C.white,borderRadius:16,overflow:"hidden",cursor:"pointer",
              border:`1.5px solid ${isAct?C.green:isDone?C.gray:sess.color+"30"}`,
              opacity:isDone?0.65:1,transition:"all 0.18s",
              animation:`fadeUp 0.28s ${idx*50}ms ease both`,
              boxShadow:isAct?`0 8px 24px ${C.green}20`:""}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 10px 28px ${sess.color}20`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=isAct?`0 8px 24px ${C.green}20`:"";}}>

            {/* stripe */}
            <div style={{height:4,background:isAct?C.green:isDone?C.gray:sess.color}}/>

            <div style={{padding:"16px"}}>
              {/* pair number */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{width:40,height:40,borderRadius:12,
                  background:isAct?C.greenLight:isDone?C.lightGray:sess.bg,
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:20,fontWeight:800,fontFamily:"'Syne',sans-serif",
                    color:isAct?C.green:isDone?C.light:sess.color}}>
                    {pair.pair_number}
                  </span>
                </div>
                <StatusBadge pair={pair}/>
              </div>

              {/* time */}
              <div style={{marginBottom:10}}>
                <div style={{fontSize:26,fontWeight:800,color:isAct?C.green:isDone?C.light:C.dark,
                  fontFamily:"'Syne',sans-serif",lineHeight:1,letterSpacing:"-0.5px"}}>
                  {pair.start_time}
                </div>
                <div style={{fontSize:12,color:C.light,marginTop:2}}>— {pair.end_time} • 80 daqiqa</div>
              </div>

              {/* session badge */}
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                  background:sess.bg,color:sess.color,display:"inline-flex",alignItems:"center",gap:4}}>
                  <Ico d={sess.icon} size={9} color={sess.color}/>{sess.label}
                </span>
                {pair.break_after&&(
                  <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,
                    background:breakColor(pair.break_after.duration).bg,
                    color:breakColor(pair.break_after.duration).color}}>
                    +{pair.break_after.duration}' tanaffus
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ─── TABLE VIEW ─── */
  const TableView = ()=>(
    <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"56px 100px 90px 90px 80px 160px 140px 100px",
        padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
        {["№","Nomi","Boshlanish","Tugash","Davom","Smena","Tanaffus","Holat"].map((h,i)=>(
          <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
            textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
        ))}
      </div>
      {RAW.map((pair,idx)=>{
        const stat  = getPairStatus(pair);
        const sess  = SESSION[pair.session];
        const isAct = stat==="active";
        const isDone= stat==="done";
        return (
          <div key={pair.code}
            onClick={()=>setDetailItem(pair)}
            style={{display:"grid",gridTemplateColumns:"56px 100px 90px 90px 80px 160px 140px 100px",
              padding:"12px 16px",borderBottom:`1px solid ${C.lightGray}`,
              background:isAct?`${C.green}06`:C.white,
              cursor:"pointer",transition:"background 0.15s",opacity:isDone?0.6:1,
              animation:`fadeUp 0.22s ${idx*40}ms ease both`}}
            onMouseEnter={e=>e.currentTarget.style.background=isAct?`${C.green}10`:C.lightGray}
            onMouseLeave={e=>e.currentTarget.style.background=isAct?`${C.green}06`:C.white}>

            <div style={{display:"flex",alignItems:"center"}}>
              <div style={{width:30,height:30,borderRadius:9,
                background:isAct?C.greenLight:isDone?C.lightGray:sess.bg,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:14,fontWeight:800,fontFamily:"'Syne',sans-serif",
                  color:isAct?C.green:isDone?C.light:sess.color}}>{pair.pair_number}</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:700,color:isDone?C.light:C.dark}}>{pair.name}</span>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:15,fontWeight:800,fontFamily:"'Syne',sans-serif",
                color:isAct?C.green:isDone?C.light:C.dark}}>{pair.start_time}</span>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:15,fontWeight:800,fontFamily:"'Syne',sans-serif",
                color:isAct?C.green:isDone?C.light:C.dark}}>{pair.end_time}</span>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:600,color:C.mid}}>80 min</span>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,
                background:sess.bg,color:sess.color,display:"inline-flex",alignItems:"center",gap:4}}>
                <Ico d={sess.icon} size={9} color={sess.color}/>{sess.label}
              </span>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              {pair.break_after
                ? <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,
                    background:breakColor(pair.break_after.duration).bg,
                    color:breakColor(pair.break_after.duration).color}}>
                    {pair.break_after.duration} daqiqa
                  </span>
                : <span style={{fontSize:11,color:C.gray}}>—</span>}
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <StatusBadge pair={pair}/>
            </div>
          </div>
        );
      })}
    </div>
  );

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

      <div style={{padding:"24px 28px",maxWidth:980,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Dars juftliklari
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{RAW.length}</b> ta juftlik •{" "}
              O'quv yili: <b style={{color:C.bright}}>2025-2026</b> •{" "}
              Hozir: <b style={{color:C.dark,fontFamily:"monospace"}}>{nowStr}</b>
              {activePair&&<span style={{marginLeft:8,color:C.green,fontWeight:700}}>• {activePair.name} davom etmoqda</span>}
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"timeline",i:I.timeline,title:"Timeline"},
                {m:"card",    i:I.grid,    title:"Karta"},
                {m:"table",   i:I.list,    title:"Jadval"},
              ].map(({m,i,title})=>(
                <button key={m} onClick={()=>setViewMode(m)} title={title}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi juftlik qo'shildi")}
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
            {l:"Jami juftlik", v:`${RAW.length} ta`,   c:C.bright, bg:C.lightBlue,   i:I.clock},
            {l:"Ertalabki",    v:`3 ta`,                c:C.orange, bg:C.orangeLight, i:I.sun},
            {l:"Tushdan keyin",v:`3 ta`,                c:C.teal,   bg:C.tealLight,   i:I.coffee},
            {l:"Kechki",       v:`1 ta`,                c:C.purple, bg:C.purpleLight, i:I.moon},
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

        {/* ── TODAY SCHEDULE BANNER ── */}
        <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,
          borderRadius:14,padding:"14px 20px",marginBottom:20,
          display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.15)",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.calendar} size={18} color={C.white}/>
            </div>
            <div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:600}}>Bugungi jadval</div>
              <div style={{fontSize:14,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>
                08:30 — 19:20 • 7 ta juftlik
              </div>
            </div>
          </div>
          <div style={{flex:1,display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {RAW.map(p=>{
              const stat=getPairStatus(p);
              const sess=SESSION[p.session];
              return (
                <div key={p.code}
                  onClick={()=>setDetailItem(p)}
                  title={`${p.name}: ${p.start_time}–${p.end_time}`}
                  style={{padding:"4px 10px",borderRadius:8,cursor:"pointer",transition:"all 0.15s",
                    background:stat==="active"?C.green:stat==="done"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.15)",
                    border:`1px solid ${stat==="active"?C.green:stat==="done"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.3)"}`}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.25)"}
                  onMouseLeave={e=>e.currentTarget.style.background=stat==="active"?C.green:stat==="done"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.15)"}>
                  <div style={{fontSize:11,fontWeight:700,color:stat==="done"?"rgba(255,255,255,0.4)":C.white}}>
                    {p.start_time}
                  </div>
                  <div style={{fontSize:9,color:stat==="done"?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.7)"}}>
                    {p.pair_number}-juft
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── VIEWS ── */}
        {viewMode==="timeline" && <TimelineView/>}
        {viewMode==="card"     && <CardView/>}
        {viewMode==="table"    && <TableView/>}
      </div>
    </>
  );
}
