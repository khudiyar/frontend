import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { faculties } from "../data/faculties";

function FacultyListPage({ navigate, isMobile }) {
  const [search,setSearch]=useState("");
  const filtered=faculties.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())||f.short.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:isMobile?"28px 20px":"44px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Fakultetlar"}]} navigate={navigate}/>
          <h1 style={{ color:C.white, fontSize:isMobile?24:"clamp(24px,4vw,40px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:8 }}>Fakultetlar va kafedralar</h1>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14, marginBottom:20 }}>13 ta fakultet · 56 ta ta'lim yo'nalishi · 1918-yildan buyon</p>
          <div style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"9px 14px", maxWidth:400, border:"1px solid rgba(255,255,255,0.18)" }}>
            <Ico name="search" size={16} color="rgba(255,255,255,0.5)"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Fakultet qidiring..." style={{ flex:1, border:"none", outline:"none", fontSize:14, fontFamily:"inherit", color:C.white, background:"transparent" }}/>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"20px 16px 100px":"32px 24px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3,1fr)", gap:isMobile?12:18 }}>
          {filtered.map((fac,i)=>(
            <div key={fac.id} onClick={()=>navigate("faculty-detail",{facId:fac.id})} style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.gray}`, cursor:"pointer", animation:`fadeUp 0.4s ${i*35}ms ease both`, transition:"all 0.3s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 48px rgba(13,26,99,0.14)";e.currentTarget.style.borderColor=fac.color;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=C.gray;}}
            >
              <div style={{ background:`linear-gradient(135deg,${fac.color}12,${fac.color}26)`, padding:isMobile?"18px 14px":"22px 18px", position:"relative", borderBottom:`3px solid ${fac.color}`, overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-16, right:-16, width:70, height:70, borderRadius:"50%", background:`${fac.color}12` }}/>
                <div style={{ width:isMobile?44:52, height:isMobile?44:52, borderRadius:12, background:`${fac.color}20`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, border:`1.5px solid ${fac.color}30` }}>
                  <Ico name={fac.icon} size={isMobile?22:26} color={fac.color} sw={1.5}/>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20, background:`${fac.color}20`, color:fac.color, fontSize:10, fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase" }}>{fac.short}</div>
              </div>
              <div style={{ padding:isMobile?"12px 14px":"15px 18px" }}>
                <h3 style={{ fontSize:isMobile?12:14, fontWeight:700, color:C.dark, lineHeight:1.35, marginBottom:isMobile?8:10, fontFamily:"'Playfair Display',Georgia,serif", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{fac.name}</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
                  {[{ic:"users",v:fac.students.toLocaleString(),l:"Talabalar"},{ic:"bookOpen",v:fac.programs,l:"Dasturlar"}].map(s=>(
                    <div key={s.l} style={{ background:C.lightGray, borderRadius:8, padding:isMobile?"6px 8px":"7px 10px", display:"flex", alignItems:"center", gap:isMobile?5:0, flexDirection:isMobile?"row":"column" }}>
                      {isMobile ? (
                        <>
                          <div style={{ width:22, height:22, borderRadius:6, background:`${fac.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <Ico name={s.ic} size={12} color={fac.color}/>
                          </div>
                          <span style={{ fontSize:13, fontWeight:800, color:fac.color, lineHeight:1 }}>{s.v}</span>
                        </>
                      ) : (
                        <>
                          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:2 }}><Ico name={s.ic} size={10} color={C.light}/><span style={{ fontSize:9, color:C.light, textTransform:"uppercase", letterSpacing:"0.3px" }}>{s.l}</span></div>
                          <div style={{ fontSize:15, fontWeight:700, color:fac.color }}>{s.v}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5, color:fac.color, fontSize:12, fontWeight:600 }}>
                  {!isMobile&&"Batafsil ko'rish"} <Ico name="arrowRight" size={13} color={fac.color}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default FacultyListPage;
