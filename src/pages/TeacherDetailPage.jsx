import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { allTeachers, departments } from "../data/departments";

function TeacherDetailPage({ navigate, params, isMobile }) {
  const teacher = allTeachers.find(t=>t.id===params?.teacherId)||allTeachers[0];
  const fac  = faculties.find(f=>f.id===teacher.facId)||faculties[0];
  const dept = departments.find(d=>d.id===teacher.deptId)||departments[0];
  const [tab,setTab]=useState("profil");
  const tabs=[
    {id:"profil",   icon:"user",     label:"Profil"},
    {id:"fanlar",   icon:"bookOpen", label:"Fanlar"},
    {id:"ilmiy",    icon:"microscope",label:"Ilmiy ishlar"},
  ];
  const rankColor = teacher.rank==="Professor"?C.orange:teacher.rank==="Dotsent"?C.bright:C.mid;

  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,${fac.color} 0%,${C.navy} 100%)`, padding:isMobile?"28px 20px 40px":"44px 24px 52px", position:"relative", overflow:"hidden" }}>
        {[0,1].map(i=><div key={i} style={{ position:"absolute", top:-60-i*60, right:-60-i*60, width:260+i*120, height:260+i*120, borderRadius:"50%", border:`${2-i}px solid rgba(255,255,255,0.06)` }}/>)}
        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative" }}>
          <Breadcrumb items={[
            {label:"Bosh sahifa",page:"home"},
            {label:fac.short,page:"faculty-detail",params:{facId:fac.id}},
            {label:"O'qituvchilar",page:"faculty-detail",params:{facId:fac.id}},
            {label:teacher.name.split(" ").slice(1).join(" ")},
          ]} navigate={navigate}/>

          <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", gap:isMobile?16:28, flexDirection:isMobile?"column":"row" }}>
            {/* Avatar */}
            <div style={{ width:isMobile?80:110, height:isMobile?80:110, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:"4px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 28px rgba(0,0,0,0.2)" }}>
              <Ico name="user" size={isMobile?42:58} color={C.white}/>
            </div>
            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${rankColor}30`, border:`1px solid ${rankColor}50`, color:C.white, padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:"0.7px", textTransform:"uppercase", marginBottom:10 }}>
                <Ico name="award" size={11} color={C.white}/>{teacher.rank}
              </div>
              <h1 style={{ color:C.white, fontSize:isMobile?"22px":"clamp(22px,3.5vw,38px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.2, marginBottom:8 }}>{teacher.name}</h1>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
                <span style={{ background:"rgba(255,255,255,0.13)", color:"rgba(255,255,255,0.85)", padding:"5px 12px", borderRadius:20, fontSize:12, display:"flex", alignItems:"center", gap:6 }}>
                  <Ico name="university" size={11} color="rgba(255,255,255,0.7)"/>{fac.name}
                </span>
                {dept&&<span style={{ background:"rgba(255,255,255,0.13)", color:"rgba(255,255,255,0.85)", padding:"5px 12px", borderRadius:20, fontSize:12, display:"flex", alignItems:"center", gap:6 }}>
                  <Ico name="building2" size={11} color="rgba(255,255,255,0.7)"/>{dept.name}
                </span>}
              </div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                {[{ic:"clock",v:`${teacher.exp} yil tajriba`},{ic:"fileText",v:`${teacher.publications} maqola`},{ic:"trendUp",v:`h-index: ${teacher.hIndex}`}].map(s=>(
                  <span key={s.v} style={{ color:"rgba(255,255,255,0.7)", fontSize:13, display:"flex", alignItems:"center", gap:5 }}>
                    <Ico name={s.ic} size={13} color="rgba(255,255,255,0.55)"/>{s.v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.gray}`, position:"sticky", top:isMobile?56:68, zIndex:100 }}>
        <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 16px", display:"flex" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:isMobile?"12px 16px":"13px 22px", whiteSpace:"nowrap", border:"none", background:"transparent", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit", color:tab===t.id?fac.color:C.light, borderBottom:tab===t.id?`3px solid ${fac.color}`:"3px solid transparent", transition:"all 0.2s" }}>
              <Ico name={t.icon} size={14} color={tab===t.id?fac.color:C.light}/>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:isMobile?"20px 16px 100px":"28px 24px 60px" }}>
        {/* ── PROFIL ── */}
        {tab==="profil"&&(
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"2fr 1fr", gap:isMobile?20:28 }}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:14 }}>Shaxsiy ma'lumot</h2>
              <p style={{ fontSize:15, color:C.mid, lineHeight:1.85, borderLeft:`4px solid ${fac.color}`, paddingLeft:18, marginBottom:24, fontStyle:"italic" }}>{teacher.bio}</p>

              <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                <Ico name="scroll" size={16} color={fac.color}/> Ta'lim
              </h3>
              {(teacher.education||["Oliy ma'lumot"]).map((edu,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12, background:C.white, borderRadius:10, padding:"12px 14px", border:`1px solid ${C.gray}` }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${fac.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico name="graduation" size={15} color={fac.color}/>
                  </div>
                  <div style={{ fontSize:13, color:C.dark, lineHeight:1.5 }}>{edu}</div>
                </div>
              ))}

              {teacher.awards?.length>0&&<>
                <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, margin:"22px 0 12px", display:"flex", alignItems:"center", gap:8 }}>
                  <Ico name="award" size={16} color={C.orange}/> Mukofotlar va unvonlar
                </h3>
                {teacher.awards.map((aw,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:C.white, borderRadius:10, marginBottom:8, border:`1px solid ${C.gray}` }}>
                    <div style={{ width:30, height:30, borderRadius:8, background:`${C.orange}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name="star" size={14} color={C.orange}/>
                    </div>
                    <span style={{ fontSize:13, fontWeight:600, color:C.dark }}>{aw}</span>
                  </div>
                ))}
              </>}
            </div>

            {/* Sidebar */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Contact card */}
              <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                <h4 style={{ fontSize:12, fontWeight:700, color:C.dark, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.7px" }}>Aloqa</h4>
                {[{ic:"mail",v:teacher.email},{ic:"phone",v:teacher.phone},{ic:"mapPin",v:teacher.room||"2-bino, 310-xona"},{ic:"clock",v:"Du–Ju: 10:00–16:00"}].map(r=>(
                  <div key={r.v} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11 }}>
                    <div style={{ width:30, height:30, borderRadius:8, background:`${fac.color}10`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={r.ic} size={13} color={fac.color}/>
                    </div>
                    <span style={{ fontSize:13, color:C.dark }}>{r.v}</span>
                  </div>
                ))}
                {teacher.orcid&&<div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11 }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:`${C.green}10`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico name="externalLink" size={13} color={C.green}/>
                  </div>
                  <span style={{ fontSize:12, color:C.green, fontWeight:600 }}>ORCID: {teacher.orcid}</span>
                </div>}
              </div>

              {/* Stats */}
              <div style={{ background:`linear-gradient(135deg,${fac.color},${C.navy})`, borderRadius:14, padding:18 }}>
                <h4 style={{ fontSize:12, fontWeight:700, color:C.white, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.7px" }}>Ilmiy ko'rsatkichlar</h4>
                {[{l:"Maqolalar",v:teacher.publications||0,ic:"fileText"},{l:"h-index",v:teacher.hIndex||0,ic:"trendUp"},{l:"Tajriba",v:teacher.exp+" yil",ic:"clock"}].map(s=>(
                  <div key={s.l} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid rgba(255,255,255,0.1)` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Ico name={s.ic} size={13} color="rgba(255,255,255,0.6)"/>
                      <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)" }}>{s.l}</span>
                    </div>
                    <span style={{ fontSize:16, fontWeight:800, color:C.orange, fontFamily:"'Playfair Display',Georgia,serif" }}>{s.v}</span>
                  </div>
                ))}
              </div>

              {/* Back buttons */}
              <Btn variant="outline" onClick={()=>navigate("dept-detail",{deptId:teacher.deptId||dept.id})} style={{ width:"100%", fontSize:13 }}>
                <Ico name="building2" size={14} color={C.bright}/> Kafedra sahifasi
              </Btn>
              <Btn variant="navy" onClick={()=>navigate("faculty-detail",{facId:fac.id})} style={{ width:"100%", fontSize:13 }}>
                <Ico name="university" size={14} color={C.white}/> Fakultet sahifasi
              </Btn>
            </div>
          </div>
        )}

        {/* ── FANLAR ── */}
        {tab==="fanlar"&&(
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:18, display:"flex", alignItems:"center", gap:10 }}>
              <Ico name="bookOpen" size={20} color={fac.color}/> O'qitiladigan fanlar
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:10 }}>
              {(teacher.subjects||["Fan I","Fan II"]).map((sub,i)=>{
                const colors=[fac.color,C.orange,C.bright,C.navy,C.green,C.purple];
                const col=colors[i%colors.length];
                return (
                  <div key={sub} style={{ background:C.white, borderRadius:12, padding:"16px 18px", border:`1px solid ${C.gray}`, display:"flex", alignItems:"center", gap:14, transition:"all 0.2s", animation:`fadeUp 0.4s ${i*50}ms ease both` }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.transform="translateY(0)";}}
                  >
                    <div style={{ width:44, height:44, borderRadius:11, background:`${col}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={["sigma","trendUp","cpu","atom","bookOpen","layers"][i%6]} size={22} color={col}/>
                    </div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.dark }}>{sub}</div>
                      <div style={{ fontSize:12, color:C.light, marginTop:3, display:"flex", alignItems:"center", gap:6 }}>
                        <Badge label={i===0?"Asosiy":i===1?"Maxsus kurs":"Amaliy"} color={col}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ILMIY ISHLAR ── */}
        {tab==="ilmiy"&&(
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:18, display:"flex", alignItems:"center", gap:10 }}>
              <Ico name="microscope" size={20} color={fac.color}/> Ilmiy faoliyat
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:12, marginBottom:24 }}>
              {[{ic:"fileText",v:teacher.publications||0,l:"Maqolalar"},{ic:"trendUp",v:teacher.hIndex||0,l:"h-index"},{ic:"award",v:teacher.awards?.length||0,l:"Mukofotlar"},{ic:"globe",v:3,l:"Xalqaro"}].map(s=>(
                <div key={s.l} style={{ background:C.white, borderRadius:12, padding:"14px", textAlign:"center", border:`1px solid ${C.gray}` }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:`${fac.color}12`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                    <Ico name={s.ic} size={20} color={fac.color}/>
                  </div>
                  <div style={{ fontSize:24, fontWeight:800, color:fac.color, fontFamily:"'Playfair Display',Georgia,serif" }}>{s.v}</div>
                  <div style={{ fontSize:11, color:C.light, marginTop:2, textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* Sample publications */}
            <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
              <Ico name="fileText" size={16} color={fac.color}/> So'nggi nashrlar
            </h3>
            {[
              {title:`${teacher.subjects?.[0]||"Matematika"} sohasida yangi yondashuv`,journal:"Journal of Mathematics",year:2024,doi:"10.1234/jm.2024"},
              {title:`${teacher.subjects?.[1]||"Analiz"} nazariyasiga hissa`,journal:"Applied Mathematics",year:2023,doi:"10.1234/am.2023"},
              {title:"Amaliy usullar tahlili va qo'llanmalar",journal:"Uzbek Math Journal",year:2023,doi:"10.5678/umj.2023"},
            ].map((pub,i)=>(
              <div key={i} style={{ background:C.white, borderRadius:12, padding:"16px 18px", border:`1px solid ${C.gray}`, marginBottom:10, transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=fac.color;e.currentTarget.style.boxShadow=`0 4px 14px ${fac.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:8, lineHeight:1.4 }}>{pub.title}</div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:C.mid, display:"flex", alignItems:"center", gap:5 }}>
                    <Ico name="bookOpen" size={11} color={C.mid}/>{pub.journal}
                  </span>
                  <Badge label={String(pub.year)} color={fac.color}/>
                  <span style={{ fontSize:11, color:C.light, display:"flex", alignItems:"center", gap:4 }}>
                    <Ico name="externalLink" size={10} color={C.light}/>DOI: {pub.doi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default TeacherDetailPage;
