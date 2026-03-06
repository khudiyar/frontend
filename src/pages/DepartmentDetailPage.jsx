import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { departments, allTeachers } from "../data/departments";

function DepartmentDetailPage({ navigate, params, isMobile }) {
  const dept = departments.find(d=>d.id===params?.deptId)||departments[0];
  const fac  = faculties.find(f=>f.id===dept.facId)||faculties[0];
  const deptTeachers = allTeachers.filter(t=>t.deptId===dept.id);
  const [tab,setTab]=useState("haqida");
  const tabs=[
    {id:"haqida",   icon:"info",      label:"Haqida"},
    {id:"oqituvchi",icon:"users",     label:"O'qituvchilar"},
    {id:"fanlar",   icon:"bookOpen",  label:"Fanlar"},
    {id:"aloqa",    icon:"phone",     label:"Aloqa"},
  ];

  /* Subject list for this dept */
  const subjectList = deptTeachers.length>0
    ? [...new Set(deptTeachers.flatMap(t=>t.subjects))]
    : ["Asosiy fan I","Asosiy fan II","Amaliy mashg'ulotlar","Ilmiy seminar","Kurs ishi","Bitiruv malakaviy ishi","Amaliyot","Magistr seminar"];

  /* Photo placeholder colors */
  const photoBg = [`linear-gradient(135deg,${dept.color}18,${dept.color}35)`,`linear-gradient(135deg,${C.navy}15,${C.blue}30)`,`linear-gradient(135deg,${C.orange}18,#ff9f6a35)`];

  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,${dept.color} 0%,${C.navy} 100%)`, padding:isMobile?"28px 20px":"44px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <Breadcrumb items={[
            {label:"Bosh sahifa",page:"home"},
            {label:"Fakultetlar",page:"faculty-list"},
            {label:fac.short,page:"faculty-detail",params:{facId:fac.id}},
            {label:"Kafedralar",page:"faculty-detail",params:{facId:fac.id}},
            {label:dept.short},
          ]} navigate={navigate}/>

          <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", gap:isMobile?14:24, flexDirection:isMobile?"column":"row", marginBottom:20 }}>
            <div style={{ width:isMobile?60:78, height:isMobile?60:78, borderRadius:16, background:"rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, backdropFilter:"blur(4px)", border:"2px solid rgba(255,255,255,0.2)" }}>
              <Ico name={dept.icon} size={isMobile?30:40} color={C.white} sw={1.4}/>
            </div>
            <div>
              <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11, marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"1px", display:"flex", alignItems:"center", gap:6 }}>
                <Ico name="building2" size={11} color="rgba(255,255,255,0.5)"/> {fac.name} fakulteti · Kafedra
              </div>
              <h1 style={{ color:C.white, fontSize:isMobile?"20px":"clamp(20px,3.5vw,34px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.2, marginBottom:10 }}>{dept.name} kafedrasi</h1>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ background:"rgba(255,255,255,0.13)", color:C.white, fontSize:11, padding:"4px 12px", borderRadius:20, display:"flex", alignItems:"center", gap:5 }}>
                  <Ico name="calendar" size={11} color="rgba(255,255,255,0.7)"/>{dept.year}-yildan
                </span>
                <Badge label={`${dept.teacherCount} o'qituvchi`} color={C.orange}/>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?4:4},1fr)`, gap:10 }}>
            {[{v:dept.teacherCount,l:"O'qituvchi",ic:"users"},{v:dept.subjectCount,l:"Fan",ic:"bookOpen"},{v:dept.students,l:"Talaba",ic:"graduation"},{v:dept.year,l:"Tashkil",ic:"calendar"}].map(s=>(
              <div key={s.l} style={{ background:"rgba(255,255,255,0.1)", borderRadius:10, padding:isMobile?"8px 6px":"13px", textAlign:"center", backdropFilter:"blur(4px)" }}>
                <Ico name={s.ic} size={isMobile?13:16} color="rgba(255,255,255,0.6)" style={{ marginBottom:isMobile?3:5 }}/>
                <div style={{ fontSize:isMobile?14:20, fontWeight:800, color:C.white, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1 }}>{s.v}</div>
                {!isMobile&&<div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.7px", marginTop:2 }}>{s.l}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.gray}`, position:"sticky", top:isMobile?56:68, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px", display:"flex", overflowX:"auto" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:isMobile?"12px 14px":"13px 20px", whiteSpace:"nowrap", border:"none", background:"transparent", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit", color:tab===t.id?dept.color:C.light, borderBottom:tab===t.id?`3px solid ${dept.color}`:"3px solid transparent", transition:"all 0.2s", flexShrink:0 }}>
              <Ico name={t.icon} size={14} color={tab===t.id?dept.color:C.light}/>
              {!isMobile&&t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"20px 16px 100px":"28px 24px 60px" }}>

        {/* ── HAQIDA ── */}
        {tab==="haqida"&&(
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"2fr 1fr", gap:isMobile?20:28 }}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:14 }}>Kafedra haqida</h2>
              <p style={{ fontSize:15, color:C.mid, lineHeight:1.8, marginBottom:18, borderLeft:`4px solid ${dept.color}`, paddingLeft:16 }}>{dept.about}</p>

              {/* Photos placeholder section */}
              <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <Ico name="photo" size={16} color={dept.color}/> Fotosuratlar
              </h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:24 }}>
                {photoBg.map((bg,i)=>(
                  <div key={i} style={{ borderRadius:12, overflow:"hidden", aspectRatio:"4/3", background:bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, border:`1px solid ${dept.color}18`, cursor:"pointer", transition:"all 0.2s", position:"relative" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow=`0 8px 24px ${dept.color}30`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}
                  >
                    <Ico name={i===0?"university":i===1?"microscope":"users"} size={isMobile?28:36} color={i===0?dept.color:i===1?C.bright:C.orange} sw={1.2}/>
                    <span style={{ fontSize:11, fontWeight:600, color:C.mid }}>{["Kafedra binosi","Laboratoriya","Jamoa surati"][i]}</span>
                    <div style={{ position:"absolute", top:8, right:8, background:"rgba(255,255,255,0.85)", borderRadius:6, padding:"2px 8px", fontSize:10, fontWeight:700, color:C.mid, display:"flex", alignItems:"center", gap:4 }}>
                      <Ico name="photo" size={9} color={C.mid}/>{2024-i}
                    </div>
                  </div>
                ))}
              </div>

              {/* History */}
              <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
                <Ico name="scroll" size={16} color={dept.color}/> Kafedra tarixi
              </h3>
              <p style={{ fontSize:14, color:C.mid, lineHeight:1.8, marginBottom:18 }}>{dept.history}</p>

              {/* Activity */}
              <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
                <Ico name="trendUp" size={16} color={dept.color}/> Faoliyat yo'nalishlari
              </h3>
              <p style={{ fontSize:14, color:C.mid, lineHeight:1.8 }}>{dept.activity}</p>
            </div>

            {/* Sidebar: kafedra mudiri + contact */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Head card */}
              <div style={{ background:C.white, borderRadius:16, overflow:"hidden", border:`1px solid ${C.gray}` }}>
                <div style={{ background:`linear-gradient(135deg,${dept.color},${C.navy})`, padding:"18px 18px 24px", textAlign:"center", position:"relative" }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", border:"3px solid rgba(255,255,255,0.3)" }}>
                    <Ico name="user" size={36} color={C.white}/>
                  </div>
                  <div style={{ color:C.white, fontWeight:700, fontSize:15 }}>{dept.head.name}</div>
                  <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12, marginTop:3 }}>Kafedra mudiri</div>
                  <div style={{ marginTop:8, display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.15)", padding:"4px 12px", borderRadius:20 }}>
                    <Ico name="award" size={11} color={C.orange}/><span style={{ color:C.orange, fontSize:11, fontWeight:700 }}>{dept.head.degree}</span>
                  </div>
                </div>
                <div style={{ padding:"16px 18px" }}>
                  {[{ic:"clock",v:`${dept.head.exp} yil tajriba`},{ic:"mail",v:dept.head.email},{ic:"phone",v:dept.head.phone}].map(r=>(
                    <div key={r.v} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:30, height:30, borderRadius:8, background:`${dept.color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Ico name={r.ic} size={14} color={dept.color}/>
                      </div>
                      <span style={{ fontSize:13, color:C.dark, fontWeight:500 }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ background:C.white, borderRadius:14, padding:16, border:`1px solid ${C.gray}` }}>
                <h4 style={{ fontSize:12, fontWeight:700, color:C.dark, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.7px" }}>Ko'rsatkichlar</h4>
                {[{ic:"fileText",l:"Ilmiy maqolalar",v:"80+"},{ic:"award",l:"Grantlar",v:"5"},{ic:"globe",l:"Xalqaro hamkorlik",v:"3 ta"},{ic:"graduation",l:"Doktorantlar",v:"8"}].map(s=>(
                  <div key={s.l} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.lightGray}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Ico name={s.ic} size={13} color={dept.color}/>
                      <span style={{ fontSize:13, color:C.mid }}>{s.l}</span>
                    </div>
                    <span style={{ fontSize:14, fontWeight:700, color:dept.color }}>{s.v}</span>
                  </div>
                ))}
              </div>

              {/* Navigate to faculty */}
              <div style={{ background:`linear-gradient(135deg,${fac.color}14,${C.navy}18)`, borderRadius:14, padding:16, border:`1px solid ${fac.color}20`, textAlign:"center" }}>
                <Ico name={fac.icon} size={28} color={fac.color} style={{ marginBottom:8 }}/>
                <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:6 }}>{fac.name}</div>
                <Btn variant="primary" onClick={()=>navigate("faculty-detail",{facId:fac.id})} style={{ width:"100%", padding:"9px", fontSize:12 }}>
                  <Ico name="university" size={13} color={C.white}/> Fakultet sahifasi
                </Btn>
              </div>
            </div>
          </div>
        )}

        {/* ── O'QITUVCHILAR ── */}
        {tab==="oqituvchi"&&(
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", display:"flex", alignItems:"center", gap:10 }}>
                <Ico name="users" size={20} color={dept.color}/> O'qituvchilar tarkibi
              </h2>
              <Badge label={`${deptTeachers.length>0?deptTeachers.length:dept.teacherCount} nafar`} color={dept.color}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)", gap:14 }}>
              {(deptTeachers.length>0?deptTeachers:professors.map((p,i)=>({...p,deptId:dept.id,facId:dept.facId,rank:p.exp>20?"Professor":"Dotsent",degree:"Fan doktori",email:`t${i+1}@nuu.uz`,phone:"+998 71 246-10-0"+(i+1),subjects:[p.title,"Ilmiy seminar"],publications:p.exp*2,hIndex:Math.floor(p.exp/4),bio:"O'qituvchi haqida ma'lumot."}))).map((t,i)=>(
                <div key={t.id} onClick={()=>navigate("teacher-detail",{teacherId:t.id})} style={{ background:C.white, borderRadius:14, padding:"16px 18px", border:`1px solid ${C.gray}`, cursor:"pointer", transition:"all 0.25s", display:"flex", alignItems:"flex-start", gap:14, animation:`fadeUp 0.4s ${i*60}ms ease both` }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=dept.color;e.currentTarget.style.boxShadow=`0 10px 28px ${dept.color}20`;e.currentTarget.style.transform="translateY(-3px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}
                >
                  <div style={{ width:54, height:54, borderRadius:"50%", background:`linear-gradient(135deg,${dept.color}18,${dept.color}32)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`2px solid ${dept.color}25` }}>
                    <Ico name="user" size={26} color={dept.color}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.dark, marginBottom:2 }}>{t.name}</div>
                    <div style={{ fontSize:12, color:C.mid, marginBottom:8 }}>{t.subjects?.[0]||t.title}</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      <Badge label={t.rank||"O'qituvchi"} color={dept.color}/>
                      {t.publications>0&&<span style={{ fontSize:11, color:C.light, display:"flex", alignItems:"center", gap:3 }}>
                        <Ico name="fileText" size={10} color={C.light}/>{t.publications} maqola
                      </span>}
                    </div>
                  </div>
                  <Ico name="chevRight" size={16} color={dept.color}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FANLAR ── */}
        {tab==="fanlar"&&(
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", display:"flex", alignItems:"center", gap:10 }}>
                <Ico name="bookOpen" size={20} color={dept.color}/> O'qitiladigan fanlar
              </h2>
              <Badge label={`${subjectList.length} ta fan`} color={dept.color}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)", gap:10 }}>
              {subjectList.map((sub,i)=>{
                const teacher = deptTeachers.find(t=>t.subjects?.includes(sub));
                const colors=[dept.color,C.orange,C.bright,C.navy,C.green,C.purple,C.mid,"#0891B2"];
                const col=colors[i%colors.length];
                return (
                  <div key={sub} style={{ background:C.white, borderRadius:12, padding:"14px 16px", border:`1px solid ${C.gray}`, display:"flex", alignItems:"center", gap:12, transition:"all 0.2s", animation:`fadeUp 0.4s ${i*40}ms ease both` }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.style.background=`${col}05`;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.background=C.white;}}
                  >
                    <div style={{ width:40, height:40, borderRadius:10, background:`${col}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={["sigma","trendUp","cpu","atom","dna","layers","bookOpen","scroll"][i%8]} size={20} color={col}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{sub}</div>
                      {teacher&&<div style={{ fontSize:11, color:C.light, marginTop:2, display:"flex", alignItems:"center", gap:4 }}>
                        <Ico name="user" size={10} color={C.light}/>{teacher.name}
                      </div>}
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <Badge label={i<3?"Asosiy":"Tanlov"} color={col}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ALOQA ── */}
        {tab==="aloqa"&&(
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?20:28 }}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:16 }}>Kafedra bilan bog'laning</h2>
              {[{ic:"mapPin",t:"Manzil",v:`O'zMU, ${fac.id}-bino, ${dept.id*10+200}-xona`},{ic:"phone",t:"Telefon",v:dept.head.phone},{ic:"mail",t:"Email",v:dept.head.email},{ic:"clock",t:"Ish vaqti",v:"Du–Ju: 9:00–18:00"},{ic:"globe",t:"Web",v:`nuu.uz/${fac.short.toLowerCase()}/${dept.short.toLowerCase()}`}].map(r=>(
                <div key={r.t} style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:12, background:C.white, borderRadius:12, padding:"13px 16px", border:`1px solid ${C.gray}` }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${dept.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico name={r.ic} size={16} color={dept.color}/>
                  </div>
                  <div><div style={{ fontSize:10, color:C.light, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:2 }}>{r.t}</div><div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{r.v}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background:C.white, borderRadius:14, padding:22, border:`1px solid ${C.gray}`, height:"fit-content" }}>
              <h3 style={{ fontSize:15, fontWeight:700, color:C.dark, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}><Ico name="send" size={15} color={dept.color}/> Xabar yuborish</h3>
              {[{l:"Ism-familiya",p:"To'liq ismingiz"},{l:"Email",p:"email@domain.com"},{l:"Mavzu",p:"Kafedra bo'yicha savol"}].map(f=>(
                <div key={f.l} style={{ marginBottom:11 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>{f.l}</label>
                  <input placeholder={f.p} style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"inherit", outline:"none", background:C.lightGray, transition:"border 0.2s" }} onFocus={e=>e.target.style.borderColor=dept.color} onBlur={e=>e.target.style.borderColor=C.gray}/>
                </div>
              ))}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>Xabar</label>
                <textarea rows={4} style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"inherit", outline:"none", resize:"vertical", background:C.lightGray }}/>
              </div>
              <Btn variant="primary" style={{ width:"100%", padding:"11px", fontSize:13, background:`linear-gradient(135deg,${dept.color},${C.navy})` }}>
                <Ico name="send" size={14} color={C.white}/> Yuborish
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default DepartmentDetailPage;
