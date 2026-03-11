import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { faculties, professors } from "../data/faculties";
import { departments, allTeachers } from "../data/departments";
import { programs} from "../data/admissions.js";

function FacultyDetailPage({ navigate, params, isMobile }) {
  const fac = faculties.find(f=>f.id===params?.facId)||faculties[0];
  const [tab,setTab]=useState("haqida");
  const tabs=[
    {id:"haqida",    icon:"info",     label:"Haqida"},
    {id:"kafedralar",icon:"building2",label:"Kafedralar"},
    {id:"professors",icon:"users",    label:"O'qituvchilar"},
    {id:"dasturlar", icon:"bookOpen", label:"Dasturlar"},
    {id:"tadqiqot",  icon:"microscope",label:"Tadqiqot"},
    {id:"aloqa",     icon:"phone",    label:"Aloqa"},
  ];
  const depts=["Algebra va geometriya","Matematik tahlil","Hisoblash matematikasi","Differensial tenglamalar","Funksional analiz","Differensial geometriya"].slice(0,fac.depts);
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${fac.color} 0%,${C.navy} 100%)`, padding:isMobile?"28px 20px":"44px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Fakultetlar",page:"faculty-list"},{label:fac.short}]} navigate={navigate}/>
          <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", gap:isMobile?16:24, flexDirection:isMobile?"column":"row" }}>
            <div style={{ width:isMobile?64:82, height:isMobile?64:82, borderRadius:18, background:"rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, backdropFilter:"blur(4px)", border:"2px solid rgba(255,255,255,0.18)" }}>
              <Ico name={fac.icon} size={isMobile?32:42} color={C.white} sw={1.3}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Fakultet</div>
              <h1 style={{ color:C.white, fontSize:isMobile?"22px":"clamp(22px,3.5vw,34px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.2, marginBottom:10 }}>{fac.name} fakulteti</h1>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"6px 12px" }}>
                  <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Ico name="user" size={15} color={C.white}/>
                  </div>
                  <div><div style={{ color:C.white, fontSize:12, fontWeight:600 }}>{fac.dean}</div><div style={{ color:"rgba(255,255,255,0.55)", fontSize:10 }}>Dekan</div></div>
                </div>
                <span style={{ background:"rgba(255,255,255,0.14)", color:C.white, fontSize:11, padding:"4px 12px", borderRadius:20, display:"flex", alignItems:"center", gap:5 }}>
                  <Ico name="calendar" size={11} color="rgba(255,255,255,0.7)"/> {fac.year}-yildan
                </span>
              </div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(4,1fr)":"repeat(4,1fr)", gap:10, marginTop:22 }}>
            {[{v:fac.students.toLocaleString(),l:"Talabalar",ic:"users"},{v:fac.depts,l:"Kafedra",ic:"building2"},{v:fac.programs,l:"Dastur",ic:"bookOpen"},{v:"45+",l:"Professor",ic:"award"}].map(s=>(
              <div key={s.l} style={{ background:"rgba(255,255,255,0.1)", borderRadius:10, padding:isMobile?"8px 6px":"12px", textAlign:"center", backdropFilter:"blur(4px)" }}>
                <Ico name={s.ic} size={isMobile?14:18} color="rgba(255,255,255,0.6)" style={{ marginBottom:isMobile?3:5 }}/>
                <div style={{ fontSize:isMobile?16:22, fontWeight:800, color:C.white, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1 }}>{s.v}</div>
                {!isMobile&&<div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.8px", marginTop:2 }}>{s.l}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY TABS */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.gray}`, position:"sticky", top:isMobile?56:68, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
          <div style={{ display:"flex", overflowX:"auto", gap:2 }}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:isMobile?"12px 14px":"13px 20px", whiteSpace:"nowrap", border:"none", background:"transparent", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit", color:tab===t.id?fac.color:C.light, borderBottom:tab===t.id?`3px solid ${fac.color}`:"3px solid transparent", transition:"all 0.2s", flexShrink:0 }}>
                <Ico name={t.icon} size={14} color={tab===t.id?fac.color:C.light}/>
                {!isMobile&&t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"20px 16px 100px":"28px 24px 60px" }}>
        {tab==="haqida"&&(
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"2fr 1fr", gap:isMobile?20:28 }}>
            <div>
              <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:14 }}>Fakultet haqida</h2>
              <p style={{ fontSize:15, color:C.mid, lineHeight:1.8, marginBottom:14 }}>Fakultet {fac.year}-yildan buyon faoliyat yuritib, {fac.students.toLocaleString()} nafar talabaga ta'lim bermoqda. {fac.depts} ta kafedra va {fac.programs} ta ta'lim yo'nalishiga ega.</p>
              <p style={{ fontSize:15, color:C.mid, lineHeight:1.8, marginBottom:24 }}>Ilmiy-tadqiqot ishlarida ham katta yutuqlarga erishilmoqda. Yiliga 120 dan ortiq ilmiy maqolalar xalqaro indekslangan jurnallarda chop etiladi.</p>
              <h3 style={{ fontSize:17, fontWeight:700, color:C.dark, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <Ico name="building2" size={18} color={fac.color}/> Kafedralar
              </h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {depts.map((d,i)=>(
                  <div key={i} style={{ background:C.white, borderRadius:10, padding:"13px 16px", border:`1px solid ${C.gray}`, display:"flex", alignItems:"center", gap:10, cursor:"pointer", transition:"all 0.2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=fac.color;e.currentTarget.style.background=`${fac.color}05`;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.background=C.white;}}
                  >
                    <div style={{ width:6, height:6, borderRadius:"50%", background:fac.color, flexShrink:0 }}/>
                    <span style={{ fontSize:13, fontWeight:600, color:C.dark }}>{d}</span>
                    <Ico name="chevRight" size={12} color={C.light} style={{ marginLeft:"auto" }}/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:C.white, borderRadius:14, padding:20, border:`1px solid ${C.gray}` }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.8px" }}>Aloqa</h3>
                {[{ic:"mapPin",l:"Manzil",v:"4-bino, 3-qavat"},{ic:"phone",l:"Telefon",v:"(71) 246-08-"+(fac.id+90)},{ic:"mail",l:"Email",v:fac.short.toLowerCase()+"@nuu.uz"},{ic:"clock",l:"Ish vaqti",v:"Du-Ju: 9:00-18:00"}].map(item=>(
                  <div key={item.l} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:`${fac.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={item.ic} size={14} color={fac.color}/>
                    </div>
                    <div><div style={{ fontSize:10, color:C.light, marginBottom:1, textTransform:"uppercase", letterSpacing:"0.4px" }}>{item.l}</div><div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{item.v}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ background:`linear-gradient(135deg,${fac.color},${C.navy})`, borderRadius:14, padding:20 }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:C.white, marginBottom:10, display:"flex", alignItems:"center", gap:8 }}><Ico name="graduation" size={16} color={C.white}/> Qabul</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginBottom:14, lineHeight:1.5 }}>Bu fakultetga qabul haqida batafsil ma'lumot oling.</p>
                <Btn variant="orange" onClick={()=>navigate("admissions")} style={{ width:"100%", padding:"10px", fontSize:13 }}>Qabul →</Btn>
              </div>
            </div>
          </div>
        )}
        {tab==="kafedralar"&&(
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", display:"flex", alignItems:"center", gap:10 }}>
                <Ico name="building2" size={22} color={fac.color}/> Kafedralar
              </h2>
              <Badge label={`${fac.depts} ta kafedra`} color={fac.color}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14 }}>
              {departments.filter(d=>d.facId===fac.id).concat(
                Array.from({length:Math.max(0,fac.depts-departments.filter(d=>d.facId===fac.id).length)},(_,i)=>{
                  const names=["Differensial tenglamalar","Funksional analiz","Topologiya","Raqamli metodlar","Ehtimollar nazariyasi","Matematik statistika"];
                  const icons=["layers","trendUp","globe","cpu","pieChart","barChart"];
                  const n=i+departments.filter(d=>d.facId===fac.id).length;
                  return { id:100+i, facId:fac.id, name:names[i]||`Kafedra ${n+1}`, short:"Kaf"+(n+1), icon:icons[i]||"bookOpen", color:fac.color,
                    head:{name:`Prof. ${["A.Qodirov","B.Nazarova","D.Salimov","E.Hasanov","F.Tursunova","G.Rahimov"][i]||"N.N"}`, degree:"Fan doktori", exp:20+i},
                    year:1960+i*5, teacherCount:4+i, subjectCount:6+i, students:200+i*50,
                    about:"Kafedra bo'yicha batafsil ma'lumot.", history:"Kafedra tarixi.", activity:"Faoliyat yo'nalishlari.", photos:[] };
                })
              ).slice(0,fac.depts).map((dept,i)=>(
                <div key={dept.id} onClick={()=>navigate("dept-detail",{deptId:dept.id})} style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.gray}`, cursor:"pointer", transition:"all 0.25s", animation:`fadeUp 0.4s ${i*60}ms ease both` }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(13,26,99,0.13)";e.currentTarget.style.borderColor=fac.color;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=C.gray;}}
                >
                  <div style={{ background:`linear-gradient(135deg,${fac.color}12,${fac.color}22)`, padding:"16px 18px", borderBottom:`3px solid ${fac.color}`, display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:48, height:48, borderRadius:12, background:`${fac.color}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={dept.icon||fac.icon} size={24} color={fac.color}/>
                    </div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:700, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.3 }}>{dept.name}</div>
                      <div style={{ fontSize:11, color:C.light, marginTop:3, display:"flex", alignItems:"center", gap:4 }}>
                        <Ico name="calendar" size={10} color={C.light}/>{dept.year}-yildan
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:"14px 18px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:`${fac.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Ico name="user" size={16} color={fac.color}/>
                      </div>
                      <div>
                        <div style={{ fontSize:12, fontWeight:600, color:C.dark }}>{dept.head.name}</div>
                        <div style={{ fontSize:11, color:C.light }}>Kafedra mudiri</div>
                      </div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
                      {[{ic:"users",v:dept.teacherCount,l:"O'qituvchi"},{ic:"bookOpen",v:dept.subjectCount,l:"Fan"},{ic:"graduation",v:dept.students,l:"Talaba"}].map(s=>(
                        <div key={s.l} style={{ background:C.lightGray, borderRadius:8, padding:"6px 8px", textAlign:"center" }}>
                          <Ico name={s.ic} size={12} color={fac.color} style={{ marginBottom:3 }}/>
                          <div style={{ fontSize:14, fontWeight:700, color:fac.color }}>{s.v}</div>
                          {!isMobile&&<div style={{ fontSize:9, color:C.light, textTransform:"uppercase", letterSpacing:"0.3px" }}>{s.l}</div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:5, color:fac.color, fontSize:12, fontWeight:600 }}>
                      Batafsil <Ico name="arrowRight" size={13} color={fac.color}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="professors"&&(
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
                <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", display:"flex", alignItems:"center", gap:10 }}>
                  <Ico name="users" size={22} color={fac.color}/> O'qituvchilar tarkibi
                </h2>
                <Badge label={`${allTeachers.filter(t=>t.facId===fac.id).length} nafar`} color={fac.color}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap: 8 }}>
                {(allTeachers.filter(t=>t.facId===fac.id).length>0 ? allTeachers.filter(t=>t.facId===fac.id) : professors).map((p, i) => {
                  const dept = departments.find(d => d.id === p.deptId);
                  return (
                      <div
                          key={p.id}
                          onClick={() => navigate("teacher-detail", { teacherId: p.id })}
                          style={{ background: C.white, borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "stretch", border: `1px solid ${C.gray}`, cursor: "pointer", transition: "all 0.22s ease", animation: `fadeUp 0.4s ${i*40}ms ease both`, minWidth: 0 }}
                          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,26,99,0.13)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = fac.color; }}
                          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.gray; }}
                      >
                        {/* Avatar */}
                        <div style={{ width: isMobile ? 68 : 88, minWidth: isMobile ? 68 : 88, background: `linear-gradient(135deg,${fac.color}14,${fac.color}28)`, borderRight: `3px solid ${fac.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <div style={{ width: isMobile ? 46 : 58, height: isMobile ? 46 : 58, borderRadius: "50%", background: `${fac.color}22`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${fac.color}40` }}>
                            <Ico name="user" size={isMobile ? 22 : 28} color={fac.color} sw={1.3}/>
                          </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: isMobile ? "10px 12px" : "13px 18px", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: isMobile ? 3 : 4 }}>

                          {/* 1-qator: ism */}
                          <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: C.dark, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                            {p.name}
                          </div>

                          {/* 2-qator: kafedra + staj */}
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "nowrap", overflow: "hidden" }}>
                            {dept && (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: C.mid, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", minWidth: 0 }}>
                    <Ico name="building2" size={10} color={C.light}/>{dept.name}
                  </span>
                            )}
                            {p.exp && (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: C.light, flexShrink: 0 }}>
                    <Ico name="clock" size={10} color={C.light}/>{p.exp} yil
                  </span>
                            )}
                          </div>

                          {/* 3-qator: lavozim + ilmiy daraja */}
                          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", maxWidth: "75%" }}>
                            {p.degree && (
                                <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 7px", borderRadius: 20, background: `${C.navy}12`, color: C.navy, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
      {p.degree}
    </span>
                            )}
                            {p.title && (
                                <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 7px", borderRadius: 20, background: `${C.orange}14`, color: C.orange, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
      {p.title}
    </span>
                            )}
                            {p.rank && (
                                <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 7px", borderRadius: 20, background: `${fac.color}14`, color: fac.color, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
      {p.rank}
    </span>
                            )}
                          </div>

                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
        )}
        {tab==="dasturlar"&&(
          <div>
            <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:18 }}>Ta'lim dasturlari</h2>
            <div style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.gray}` }}>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 80px 60px":"2fr 120px 80px 80px 80px", background:`linear-gradient(135deg,${fac.color},${C.navy})`, color:C.white, fontSize:11, fontWeight:700, padding:"12px 16px", gap:8, alignItems:"center", textTransform:"uppercase", letterSpacing:"0.5px" }}>
                <span>Yo'nalish</span><span>Daraja</span><span>Muddat</span>{!isMobile&&<><span>Grant</span><span>Kontrakt</span></>}
              </div>
              {programs.slice(0,5).map((p,i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 80px 60px":"2fr 120px 80px 80px 80px", padding:"13px 16px", borderBottom:i<4?`1px solid ${C.lightGray}`:"none", fontSize:13, gap:8, alignItems:"center", transition:"background 0.15s", cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
                  <div style={{ fontWeight:600, color:C.dark, display:"flex", alignItems:"center", gap:8 }}>
                    <Ico name="bookOpen" size={13} color={fac.color}/>{p.name}
                  </div>
                  <Badge label={p.degree} color={p.degree==="Bakalavriat"?fac.color:p.degree==="Magistratura"?C.orange:C.navy}/>
                  <span style={{ color:C.mid }}>{p.dur}</span>
                  {!isMobile&&<><span style={{ color:C.green, fontWeight:600 }}>{p.grant} ta</span><span style={{ color:C.mid }}>{(p.kontrakt/1000000).toFixed(1)}M</span></>}
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="tadqiqot"&&(
          <div>
            <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:20 }}>Ilmiy tadqiqotlar</h2>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14, marginBottom:24 }}>
              {[{ic:"fileText",v:"120+",l:"Ilmiy maqolalar (2025)"},{ic:"layers",v:"8",l:"Faol tadqiqot loyihalari"},{ic:"award",v:"15",l:"Xalqaro grantlar"},{ic:"graduation",v:"23",l:"Doktorantlar"}].map(s=>(
                <div key={s.l} style={{ background:C.white, borderRadius:12, padding:18, display:"flex", alignItems:"center", gap:14, border:`1px solid ${C.gray}` }}>
                  <div style={{ width:50, height:50, borderRadius:12, background:`${fac.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico name={s.ic} size={24} color={fac.color}/>
                  </div>
                  <div><div style={{ fontSize:24, fontWeight:800, color:fac.color, fontFamily:"'Playfair Display',Georgia,serif" }}>{s.v}</div><div style={{ fontSize:13, color:C.mid }}>{s.l}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="aloqa"&&(
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?20:28 }}>
            <div>
              <h2 style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:18 }}>Aloqa ma'lumotlari</h2>
              {[{ic:"mapPin",t:"Manzil",v:"O'zMU, 4-bino, 3-qavat, Toshkent"},{ic:"phone",t:"Telefon",v:"(71) 246-08-"+(fac.id+90)},{ic:"mail",t:"Email",v:fac.short.toLowerCase()+"@nuu.uz"},{ic:"globe",t:"Web",v:"nuu.uz/"+fac.short.toLowerCase()},{ic:"clock",t:"Ish vaqti",v:"Du–Ju: 9:00–18:00"}].map(item=>(
                <div key={item.t} style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:14, background:C.white, borderRadius:12, padding:"13px 16px", border:`1px solid ${C.gray}` }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${fac.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico name={item.ic} size={16} color={fac.color}/>
                  </div>
                  <div><div style={{ fontSize:10, color:C.light, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:2 }}>{item.t}</div><div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{item.v}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background:C.white, borderRadius:14, padding:24, border:`1px solid ${C.gray}`, height:"fit-content" }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}><Ico name="send" size={16} color={fac.color}/> Xabar yuborish</h3>
              {[{l:"Ism-familiya",p:"To'liq ismingiz"},{l:"Email",p:"email@domain.com"},{l:"Mavzu",p:"Xabar mavzusi"}].map(f=>(
                <div key={f.l} style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>{f.l}</label>
                  <input placeholder={f.p} style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"inherit", color:C.dark, outline:"none", background:C.lightGray, transition:"border 0.2s" }} onFocus={e=>e.target.style.borderColor=fac.color} onBlur={e=>e.target.style.borderColor=C.gray}/>
                </div>
              ))}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>Xabar</label>
                <textarea rows={4} placeholder="Xabaringizni yozing..." style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"inherit", color:C.dark, outline:"none", resize:"vertical", background:C.lightGray }}/>
              </div>
              <Btn variant="primary" style={{ width:"100%", padding:"11px" }}><Ico name="send" size={15} color={C.white}/> Yuborish</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default FacultyDetailPage;
