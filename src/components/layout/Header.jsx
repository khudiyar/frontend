import { useState, useEffect } from "react";
import C from "../../constants/colors";
import Ico from "../ui/Ico";
import Btn from "../ui/Btn";

function Header({ navigate, currentPage, isMobile }) {
  const [scrolled,setScrolled]=useState(false);
  const [hov,setHov]=useState(null);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);

  const nav=[
    {label:"Universitet", page:"faculty-list", sub:[{l:"Tarixi",p:"about"},{l:"Rektorat",p:"about"},{l:"Fakultetlar",p:"faculty-list"},{l:"Markazlar",p:"contact"}]},
    {label:"Faoliyat",    page:"science",      sub:[{l:"Ilmiy kengashlar",p:"science",ps:{section:"kengash"}},{l:"Ilmiy loyihalar",p:"science",ps:{section:"loyihalar"}},{l:"Doktorantura",p:"science",ps:{section:"doktorantura"}},{l:"Konferensiyalar",p:"science",ps:{section:"konferensiyalar"}},{l:"Sport",p:"cultural",ps:{section:"sport"}},{l:"Talabalar hayoti",p:"cultural",ps:{section:"hayot"}},{l:"To'lov narxlari",p:"finance",ps:{section:"tolov"}}]},
    {label:"Xalqaro",     page:"contact",      sub:[{l:"Erasmus+",p:"student-info",ps:{section:"mobillik"}},{l:"Grantlar",p:"contact"},{l:"Study in UZ",p:"contact"}]},
    {label:"Talabalarga", page:"student-hub",  sub:[{l:"Akademik mobillik",p:"student-info",ps:{section:"mobillik"}},{l:"Baholash tizimi",p:"student-info",ps:{section:"baholash"}},{l:"GPA va Kredit",p:"student-info",ps:{section:"gpa"}},{l:"Stipendiyalar",p:"student-info",ps:{section:"stipendiya"}},{l:"Yakuniy nazorat",p:"student-info",ps:{section:"yakuniy"}},{l:"Iqtidorli talabalar",p:"student-info",ps:{section:"iqtidorli"}},{l:"Talaba portali",p:"portal"}]},
    {label:"Yangiliklar", page:"news-list",    sub:[]},
  ];

  return (
    <header style={{ background:scrolled?"rgba(13,26,99,0.97)":C.blue, backdropFilter:scrolled?"blur(14px)":"none", position:"sticky", top:0, zIndex:1000, boxShadow:scrolled?"0 4px 24px rgba(13,26,99,0.3)":"none", transition:"all 0.3s" }}>
      {!isMobile&&(
        <div style={{ background:C.navy, padding:"6px 0" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, color:"rgba(255,255,255,0.7)", fontSize:12 }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Ico name="mapPin" size={13} color={C.orange}/> Nukus, A. Dosnazarov ko'chasi 74</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Ico name="phone" size={13} color={C.orange}/> (61) 123-08-96</span>
            </div>
            <div style={{ display:"flex", gap:14, fontSize:12 }}>
              {["O'zbekcha","Qaraqalpaqsha","Русский","English"].map((l,i)=><span key={l} style={{ color:i===0?C.orange:"rgba(255,255,255,0.6)", cursor:"pointer", fontWeight:i===0?700:400 }}>{l}</span>)}
            </div>
          </div>
        </div>
      )}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:isMobile?56:68 }}>
          {/* Logo */}
          <div onClick={()=>navigate("home")} style={{ display:"flex", alignItems:"center", gap:11, cursor:"pointer" }}>
            <div style={{ width:isMobile?36:44, height:isMobile?36:44, borderRadius:10, background:`linear-gradient(135deg,${C.orange},#ff9f6a)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(246,128,72,0.4)", flexShrink:0 }}>
              <Ico name="university" size={isMobile?20:24} color={C.white} sw={1.8}/>
            </div>
            <div>
              <div style={{ color:C.white, fontWeight:700, fontSize:isMobile?12:14, lineHeight:1.2 }}>Nukus Davlat</div>
              <div style={{ color:C.orange, fontWeight:600, fontSize:9, letterSpacing:"1.2px", textTransform:"uppercase" }}>texnika universiteti</div>
            </div>
          </div>

          {/* Desktop nav */}
          {!isMobile&&(
            <nav style={{ display:"flex", alignItems:"center", gap:2 }}>
              {nav.map(item=>(
                <div key={item.label} style={{ position:"relative" }} onMouseEnter={()=>setHov(item.label)} onMouseLeave={()=>setHov(null)}>
                  <button onClick={()=>navigate(item.page)} style={{ background:hov===item.label?"rgba(255,255,255,0.1)":"transparent", border:"none", cursor:"pointer", color:currentPage===item.page?C.orange:"rgba(255,255,255,0.9)", fontSize:13, fontWeight:600, padding:"8px 14px", borderRadius:7, display:"flex", alignItems:"center", gap:5, fontFamily:"inherit", transition:"all 0.2s" }}>
                    {item.label}
                    {item.sub.length>0&&<Ico name="chevDown" size={12} color="rgba(255,255,255,0.5)" sw={2}/>}
                  </button>
                  {item.sub.length>0&&hov===item.label&&(
                    <div style={{ position:"absolute", top:"100%", left:0, background:C.white, borderRadius:12, boxShadow:"0 16px 48px rgba(13,26,99,0.18)", padding:"8px 0", minWidth:200, border:`1.5px solid ${C.gray}`, zIndex:100, animation:"slideDown 0.18s ease" }}>
                      {item.sub.map(ch=>(
                        <div key={ch.l} onClick={()=>{navigate(ch.p,ch.ps||{});setHov(null);}} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 18px", color:C.mid, fontSize:13, fontWeight:500, cursor:"pointer", transition:"all 0.15s" }}
                          onMouseEnter={e=>{e.currentTarget.style.background=C.lightGray;e.currentTarget.style.color=C.bright;e.currentTarget.style.paddingLeft="22px";}}
                          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.mid;e.currentTarget.style.paddingLeft="18px";}}
                        >
                          <div style={{ width:6, height:6, borderRadius:"50%", background:C.orange, flexShrink:0 }}/>
                          {ch.l}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Btn variant="orange" onClick={()=>navigate("admissions")} style={{ marginLeft:8, padding:"8px 18px", fontSize:13 }}>
                <Ico name="graduation" size={15} color={C.white}/> Qabul
              </Btn>
            </nav>
          )}

          {/* Mobile right */}
          {isMobile&&(
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:7, padding:"6px 11px", color:C.white, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>O'Z</button>
              <button style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:7, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Ico name="search" size={15} color={C.white}/>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
