import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { schedule, grades } from "../data/faculties";

function StudentPortalPage({ navigate, isMobile }) {
  const [sideTab,setSideTab]=useState("dashboard");
  const days=["Du","Se","Ch","Pa","Ju"];
  const daysFull=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma"];
  const [activeDay,setActiveDay]=useState("Du");
  const student={ name:"Alisher Qodirov", group:"MT-203", gpa:3.75, course:"2-kurs" };
  const navMenu=[
    {id:"dashboard",icon:"pieChart",  label:"Dashboard"},
    {id:"schedule", icon:"calendar",  label:"Dars jadvali"},
    {id:"grades",   icon:"barChart",  label:"Baholar"},
    {id:"library",  icon:"bookOpen",  label:"Kutubxona"},
    {id:"finance",  icon:"creditCard",label:"To'lovlar"},
    {id:"settings", icon:"settings",  label:"Sozlamalar"},
  ];
  const alerts=[
    {icon:"fileText",text:"Matematika I — Yakuniy nazorat 15 Mart",color:C.red},
    {icon:"creditCard",text:"Kontrakt to'lovi muddati: 20 Mart",color:C.orange},
    {icon:"globe",text:"Erasmus+ grant ariza muddati uzaytirildi",color:C.bright},
    {icon:"star",text:"Navro'z bayrami tadbiriga taklif",color:C.green},
  ];
  const avgGrade=(grades.reduce((a,g)=>a+g.total,0)/grades.length).toFixed(1);
  const gpaColor=avgGrade>=85?C.green:avgGrade>=70?C.orange:C.red;
  const dayKey={Du:"mon",Se:"tue",Ch:"wed",Pa:"thu",Ju:"fri"}[activeDay];
  const activeSchedule=schedule.map(row=>({time:row.time,subj:row[dayKey],icon:row.icon}));

  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      {/* Portal header */}
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"14px 20px" }}>
        <div style={{ maxWidth:1300, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${C.orange},#ff9f6a)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 10px rgba(246,128,72,0.4)" }}>
              <Ico name="user" size={22} color={C.white}/>
            </div>
            <div><div style={{ color:C.white, fontWeight:700, fontSize:14 }}>{student.name}</div><div style={{ color:"rgba(255,255,255,0.55)", fontSize:11 }}>{student.group} · {student.course}</div></div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:8, width:36, height:36, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <Ico name="bell" size={17} color={C.white}/>
              <span style={{ position:"absolute", top:6, right:6, width:8, height:8, borderRadius:"50%", background:C.orange, border:`2px solid ${C.navy}` }}/>
            </button>
            <Btn variant="ghost" onClick={()=>navigate("home")} style={{ padding:"7px 14px", fontSize:12 }}>
              <Ico name="arrowLeft" size={14} color={C.white}/> Chiqish
            </Btn>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1300, margin:"0 auto", display:"grid", gridTemplateColumns:isMobile?"1fr":"220px 1fr", minHeight:"calc(100vh - 64px)", paddingBottom:isMobile?80:0 }}>
        {!isMobile&&(
          <aside style={{ background:C.white, borderRight:`1px solid ${C.gray}`, padding:"24px 0", position:"sticky", top:68, height:"calc(100vh - 68px)", overflowY:"auto" }}>
            <div style={{ padding:"0 16px 20px", borderBottom:`1px solid ${C.gray}` }}>
              <div style={{ background:`${C.bright}08`, borderRadius:12, padding:16, textAlign:"center" }}>
                <div style={{ width:54, height:54, borderRadius:"50%", background:`linear-gradient(135deg,${C.bright}18,${C.orange}22)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                  <Ico name="user" size={28} color={C.bright}/>
                </div>
                <div style={{ fontWeight:700, fontSize:13, color:C.dark }}>{student.name}</div>
                <div style={{ fontSize:11, color:C.light, marginTop:2 }}>{student.group}</div>
                <div style={{ marginTop:10, display:"inline-flex", alignItems:"center", gap:6, background:`${gpaColor}14`, color:gpaColor, padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>
                  <Ico name="trendUp" size={12} color={gpaColor}/> GPA: {student.gpa}
                </div>
              </div>
            </div>
            <nav style={{ padding:"12px" }}>
              {navMenu.map(item=>(
                <button key={item.id} onClick={()=>setSideTab(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:sideTab===item.id?700:500, background:sideTab===item.id?`${C.bright}12`:"transparent", color:sideTab===item.id?C.bright:C.mid, transition:"all 0.2s", marginBottom:3, textAlign:"left" }}>
                  <Ico name={item.icon} size={16} color={sideTab===item.id?C.bright:C.light}/>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        )}

        <main style={{ padding:isMobile?"16px 16px":"26px 28px" }}>
          {isMobile&&(
            <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:14, paddingBottom:4 }}>
              {navMenu.map(item=>(
                <button key={item.id} onClick={()=>setSideTab(item.id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 10px", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:10, fontWeight:600, background:sideTab===item.id?`${C.bright}12`:C.white, color:sideTab===item.id?C.bright:C.mid, flexShrink:0, minWidth:52 }}>
                  <Ico name={item.icon} size={18} color={sideTab===item.id?C.bright:C.light}/>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {sideTab==="dashboard"&&(
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:4 }}>Xush kelibsiz, {student.name.split(" ")[0]}!</h2>
              <p style={{ color:C.light, fontSize:13, marginBottom:20 }}>2025-2026 o'quv yili, 2-semestr</p>
              <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:12, marginBottom:22 }}>
                {[{ic:"trendUp",v:student.gpa,l:"GPA",color:gpaColor},{ic:"bookOpen",v:"6/6",l:"Fanlar",color:C.bright},{ic:"checkCircle",v:"94%",l:"Davomat",color:C.green},{ic:"creditCard",v:"To'langan",l:"To'lov",color:C.orange}].map(k=>(
                  <div key={k.l} style={{ background:C.white, borderRadius:12, padding:"14px 13px", border:`1px solid ${C.gray}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9 }}>
                      <div style={{ width:32, height:32, borderRadius:9, background:`${k.color}14`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Ico name={k.ic} size={16} color={k.color}/>
                      </div>
                    </div>
                    <div style={{ fontSize:isMobile?18:22, fontWeight:800, color:k.color, fontFamily:"'Playfair Display',Georgia,serif" }}>{k.v}</div>
                    <div style={{ fontSize:11, color:C.light, marginTop:2, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px" }}>{k.l}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize:15, fontWeight:700, color:C.dark, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}><Ico name="bell" size={16} color={C.orange}/> Ogohlantirishlar</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
                {alerts.map((al,i)=>(
                  <div key={i} style={{ background:C.white, borderRadius:10, padding:"11px 14px", display:"flex", alignItems:"center", gap:12, border:`1px solid ${C.gray}`, borderLeft:`4px solid ${al.color}` }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:`${al.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={al.icon} size={15} color={al.color}/>
                    </div>
                    <span style={{ fontSize:13, color:C.dark, flex:1 }}>{al.text}</span>
                    <Ico name="chevRight" size={14} color={C.light}/>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize:15, fontWeight:700, color:C.dark, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}><Ico name="calendar" size={16} color={C.bright}/> Bugungi darslar</h3>
              {schedule.slice(0,3).map((row,i)=>row.mon!=="—"&&(
                <div key={i} style={{ background:C.white, borderRadius:10, padding:"12px 14px", display:"flex", alignItems:"center", gap:12, border:`1px solid ${C.gray}`, marginBottom:8 }}>
                  <div style={{ width:6, height:40, borderRadius:3, background:`linear-gradient(to bottom,${C.bright},${C.orange})` }}/>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${C.bright}12`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Ico name={row.icon} size={16} color={C.bright}/>
                  </div>
                  <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{row.mon}</div><div style={{ fontSize:11, color:C.light, marginTop:2 }}>{row.time}</div></div>
                  <Badge label="Bugun" color={C.bright}/>
                </div>
              ))}
            </div>
          )}

          {sideTab==="schedule"&&(
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:18, display:"flex", alignItems:"center", gap:10 }}><Ico name="calendar" size={20} color={C.bright}/> Dars jadvali</h2>
              <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
                {days.map((d,i)=>(
                  <button key={d} onClick={()=>setActiveDay(d)} style={{ flex:isMobile?1:0, minWidth:isMobile?0:90, padding:"9px 14px", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:700, background:activeDay===d?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white, color:activeDay===d?C.white:C.mid, boxShadow:activeDay===d?`0 4px 14px rgba(40,69,214,0.28)`:`0 1px 6px rgba(13,26,99,0.06)`, transition:"all 0.2s" }}>
                    <div style={{ fontSize:10, opacity:0.75, marginBottom:1 }}>{daysFull[i].slice(0,3)}</div>{d}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {activeSchedule.map((row,i)=>(
                  <div key={i} style={{ background:C.white, borderRadius:12, padding:"13px 16px", display:"flex", alignItems:"center", gap:14, border:`1px solid ${C.gray}`, opacity:row.subj==="—"?0.45:1 }}>
                    <div style={{ textAlign:"center", minWidth:60 }}>
                      <div style={{ fontSize:10, color:C.light, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:1 }}>Vaqt</div>
                      <div style={{ fontSize:12, fontWeight:700, color:C.dark }}>{row.time.split("–")[0]}</div>
                      <div style={{ fontSize:11, color:C.light }}>–{row.time.split("–")[1]}</div>
                    </div>
                    <div style={{ width:1, height:40, background:row.subj==="—"?C.gray:`linear-gradient(to bottom,${C.bright},${C.orange})` }}/>
                    <div style={{ width:34, height:34, borderRadius:9, background:row.subj==="—"?C.lightGray:`${C.bright}12`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Ico name={row.icon} size={17} color={row.subj==="—"?C.light:C.bright}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:row.subj==="—"?400:700, color:row.subj==="—"?C.light:C.dark }}>{row.subj==="—"?"Bo'sh vaqt":row.subj}</div>
                      {row.subj!=="—"&&<div style={{ fontSize:11, color:C.light, marginTop:1 }}>3-bino · 214-xona</div>}
                    </div>
                    {row.subj!=="—"&&<Badge label="Ma'ruza" color={C.bright}/>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {sideTab==="grades"&&(
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:12 }}>
                <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", display:"flex", alignItems:"center", gap:10 }}><Ico name="barChart" size={20} color={C.bright}/> Baholar</h2>
                <div style={{ display:"flex", alignItems:"center", gap:10, background:C.white, padding:"9px 16px", borderRadius:12, border:`1px solid ${C.gray}` }}>
                  <Ico name="trendUp" size={16} color={gpaColor}/>
                  <span style={{ fontSize:13, color:C.mid }}>O'rtacha:</span>
                  <span style={{ fontSize:20, fontWeight:800, color:gpaColor, fontFamily:"'Playfair Display',Georgia,serif" }}>{avgGrade}</span>
                </div>
              </div>
              <div style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.gray}`, marginBottom:18 }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead><tr style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})` }}>
                    {["Fan","Kredit","Oraliq 1","Oraliq 2","Yakuniy","Jami"].map(h=><th key={h} style={{ padding:"11px 14px", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.85)", textAlign:"left", whiteSpace:"nowrap", textTransform:"uppercase", letterSpacing:"0.5px" }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {grades.map((g,i)=>{
                      const col=g.total>=85?C.green:g.total>=70?C.orange:C.red;
                      return (
                        <tr key={i} style={{ borderBottom:`1px solid ${C.lightGray}`, transition:"background 0.15s" }} onMouseEnter={e=>e.currentTarget.style.background=C.lightGray} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:C.dark }}>{g.subj}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:C.mid }}>{g.credit}</td>
                          {[g.mid1,g.mid2,g.final].map((v,j)=><td key={j} style={{ padding:"12px 14px", fontSize:13, fontWeight:600, color:v>=85?C.green:v>=70?C.orange:C.red }}>{v}</td>)}
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <div style={{ flex:1, height:6, borderRadius:3, background:C.lightGray, overflow:"hidden" }}>
                                <div style={{ height:"100%", background:`linear-gradient(90deg,${col},${col}88)`, width:`${g.total}%`, borderRadius:3, transition:"width 0.8s ease" }}/>
                              </div>
                              <span style={{ fontSize:13, fontWeight:700, color:col, minWidth:36 }}>{g.total}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {[{l:"A'lo (85-100)",c:C.green},{l:"Yaxshi (70-84)",c:C.orange},{l:"Qoniqarli (55-69)",c:C.red}].map(l=>(
                  <div key={l.l} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 14px", background:C.white, borderRadius:20, border:`1px solid ${C.gray}`, fontSize:12, color:C.mid }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:l.c }}/>
                    {l.l}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!["dashboard","schedule","grades"].includes(sideTab)&&(
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 20px", textAlign:"center" }}>
              <div style={{ width:80, height:80, borderRadius:20, background:`${C.bright}12`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
                <Ico name={navMenu.find(n=>n.id===sideTab)?.icon||"info"} size={40} color={C.bright}/>
              </div>
              <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:8 }}>{navMenu.find(n=>n.id===sideTab)?.label}</h2>
              <p style={{ color:C.light, fontSize:14 }}>Bu bo'lim tez orada ishga tushiriladi.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


export default StudentPortalPage;
