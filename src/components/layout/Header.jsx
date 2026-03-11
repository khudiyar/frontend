import { useState, useEffect } from "react";
import C from "../../constants/colors";
import Ico from "../ui/Ico";
import Btn from "../ui/Btn";

function Header({ navigate, currentPage, isMobile }) {
  // 1. Komponent yuqorisiga qo'ying:
  const LANG_SVG = {
    uz: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 2C19.3 2 8.5 9.9 4.1 21h55.8C55.5 9.9 44.7 2 32 2z" fill="#42ade2"/><path d="M32 62c12.7 0 23.5-7.9 27.9-19H4.1C8.5 54.1 19.3 62 32 62z" fill="#83bf4f"/><path d="M62 32c0-3.1-.5-6.2-1.4-9H3.4C2.5 25.8 2 28.9 2 32s.5 6.2 1.4 9h57.2c.9-2.8 1.4-5.9 1.4-9" fill="#fff"/><g fill="#c94747"><path d="M60.3 22c-.1-.3-.3-.7-.4-1H4.1c-.1.3-.3.7-.4 1-.1.3-.2.7-.3 1h57.2c-.1-.3-.2-.7-.3-1"/><path d="M3.7 42c.1.3.3.7.4 1h55.8c.1-.3.3-.7.4-1 .1-.3.2-.7.3-1H3.4c.1.3.2.7.3 1"/></g><g fill="#fff"><path d="M20.4 17.3c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c.6 0 1.1.1 1.6.3-.8-.6-1.9-1-3-1-2.8 0-5 2.2-5 5s2.2 5 5 5c1.1 0 2.2-.4 3-1-.5.2-1 .3-1.6.3"/><path d="M24.7 15.2l.4 1.1h1.1l-.9.6.3 1.1-.9-.7-.9.7.4-1.1-.9-.6h1.1z"/><path d="M29 15.2l.3 1.1h1.2l-.9.6.3 1.1-.9-.7-.9.7.3-1.1-.9-.6h1.1z"/><path d="M33.3 15.2l.3 1.1h1.1l-.9.6.4 1.1-.9-.7-1 .7.4-1.1-.9-.6h1.1z"/><path d="M37.5 15.2l.4 1.1H39l-.9.6.3 1.1-.9-.7-.9.7.3-1.1-.9-.6h1.2z"/><path d="M41.8 15.2l.3 1.1h1.2l-1 .6.4 1.1-.9-.7-.9.7.3-1.1-.9-.6h1.1z"/></g></svg>`,
    kaa: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cc"><circle cx="32" cy="32" r="30"/></clipPath><path id="st" fill="#fff" d="M0,-1.4 L0.353,-0.485 L1.332,-0.433 L0.571,0.185 L0.823,1.133 L0,0.6 L-0.823,1.133 L-0.571,0.185 L-1.332,-0.433 L-0.353,-0.485 Z"/></defs><g clip-path="url(#cc)"><rect fill="#0099B5" x="0" y="0" width="64" height="21"/><rect fill="#fff" x="0" y="21" width="64" height="1"/><rect fill="#c94747" x="0" y="22" width="64" height="2"/><rect fill="#F7BE24" x="0" y="24" width="64" height="16"/><rect fill="#c94747" x="0" y="40" width="64" height="2"/><rect fill="#fff" x="0" y="42" width="64" height="1"/><rect fill="#1EB53A" x="0" y="43" width="64" height="21"/><circle cx="19" cy="13" r="6" fill="#fff"/><circle cx="21.8" cy="13" r="6" fill="#0099B5"/><use href="#st" transform="translate(28,10) scale(4)"/><use href="#st" transform="translate(32,10) scale(4)"/><use href="#st" transform="translate(26,16) scale(4)"/><use href="#st" transform="translate(30,16) scale(4)"/><use href="#st" transform="translate(34,16) scale(4)"/></g></svg>`,
    ru: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M31.9 2c-13 0-24.1 8.4-28.2 20h56.6C56.1 10.4 45 2 31.9 2z" fill="#f9f9f9"/><path d="M31.9 62c13.1 0 24.2-8.4 28.3-20H3.7c4.1 11.7 15.2 20 28.2 20z" fill="#ed4c5c"/><path d="M3.7 22C2.6 25.1 2 28.5 2 32s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.7" fill="#428bc1"/></svg>`,
    en: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="background:#41479b;border-radius:50%"><rect width="64" height="64" fill="#41479b"/><rect x="29" y="0" width="6" height="64" fill="#f5f5f5"/><rect x="0" y="29" width="64" height="6" fill="#f5f5f5"/><line x1="0" y1="0" x2="64" y2="64" stroke="#f5f5f5" stroke-width="8"/><line x1="64" y1="0" x2="0" y2="64" stroke="#f5f5f5" stroke-width="8"/><rect x="30" y="0" width="4" height="64" fill="#ff4b55"/><rect x="0" y="30" width="64" height="4" fill="#ff4b55"/><line x1="0" y1="0" x2="64" y2="64" stroke="#ff4b55" stroke-width="4"/><line x1="64" y1="0" x2="0" y2="64" stroke="#ff4b55" stroke-width="4"/></svg>`,
  };

  const LANGS = [
    { key: "uz",  label: "O'zbekcha" },
    { key: "kaa", label: "Qaraqalpaqsha" },
    { key: "ru",  label: "Русский" },
    { key: "en",  label: "English" },
  ];

  // 2. useState qo'ying (component ichida):
  const [activeLang, setActiveLang] = useState("uz");

  const [showLangLabel, setShowLangLabel] = useState(false);

  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const [scrolled,setScrolled]=useState(false);
  const [hov,setHov]=useState(null);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);

  const nav=[
    {label:"Universitet",
      page:"faculty-list",
      sub:[
          {l:"Tarixi",p:"about"},{l:"Rektorat",p:"administration"},{l:"Fakultetlar",p:"faculty-list"},{l:"Markazlar",p:"contact"}
      ]
    },
    {label:"Faoliyat",    page:"science",      sub:[{l:"Ilmiy kengashlar",p:"science",ps:{section:"kengash"}},{l:"Ilmiy loyihalar",p:"science",ps:{section:"loyihalar"}},{l:"Doktorantura",p:"science",ps:{section:"doktorantura"}},{l:"Konferensiyalar",p:"science",ps:{section:"konferensiyalar"}},{l:"Sport",p:"cultural",ps:{section:"sport"}},{l:"Talabalar hayoti",p:"cultural",ps:{section:"hayot"}},{l:"To'lov narxlari",p:"finance",ps:{section:"tolov"}}]},
    {label:"Xalqaro",     page:"contact",      sub:[{l:"Erasmus+",p:"student-info",ps:{section:"mobillik"}},{l:"Grantlar",p:"contact"},{l:"Study in UZ",p:"contact"}]},
    {label:"Talabalarga", page:"student-hub",  sub:[{l:"Akademik mobillik",p:"student-info",ps:{section:"mobillik"}},{l:"Baholash tizimi",p:"student-info",ps:{section:"baholash"}},{l:"GPA va Kredit",p:"student-info",ps:{section:"gpa"}},{l:"Stipendiyalar",p:"student-info",ps:{section:"stipendiya"}},{l:"Yakuniy nazorat",p:"student-info",ps:{section:"yakuniy"}},{l:"Iqtidorli talabalar",p:"student-info",ps:{section:"iqtidorli"}},{l:"Talaba portali",p:"portal"}]},
    {label:"Yangiliklar", page:"news-list",    sub:[]},
  ];

  return (
      <header style={{
          background: scrolled ? "rgba(13,26,99,0.97)" : C.blue,
          backdropFilter: scrolled ? "blur(14px)" : "none",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: scrolled ? "0 4px 24px rgba(13,26,99,0.3)" : "none",
          transition: "all 0.3s"
      }}>
      {!isMobile&&(
        <div style={{ background:C.navy, padding:"6px 0" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, color:"rgba(255,255,255,0.7)", fontSize:12 }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Ico name="mapPin" size={13} color={C.orange}/> Nukus, A. Dosnazarov ko'chasi 74</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Ico name="phone" size={13} color={C.orange}/> (61) 123-08-96</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: C.mid,
              borderRadius: 999,
              padding: "2px 3px",
            }}>
              {[LANGS.find(l => l.key === activeLang), ...LANGS.filter(l => l.key !== activeLang)].map((lang) => {
                const isActive = lang.key === activeLang;
                return (
                    <button
                        key={lang.key}
                        onClick={() => setActiveLang(lang.key)}
                        title={lang.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isActive ? 6 : 0,
                          padding: isActive ? "2px 8px 2px 3px" : "2px 3px",
                          borderRadius: 999,
                          background: isActive ? C.navy : "transparent",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          height: 22,
                          overflow: "hidden",
                        }}
                    >
        <span
            style={{
              width: 16, height: 16,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              display: "block",
            }}
            dangerouslySetInnerHTML={{ __html: LANG_SVG[lang.key] }}
        />
                      {isActive && (
                          <span style={{
                            color: C.gray,
                            fontSize: 12,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            lineHeight: 1,
                          }}>
            {lang.label}
          </span>
                      )}
                    </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
          <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: isMobile ? 56 : 68
          }}>
          {/* Logo */}
          <div onClick={()=>navigate("home")} style={{ display:"flex", alignItems:"center", gap:11, cursor:"pointer" }}>
            <div style={{ width:isMobile?36:44, height:isMobile?36:44, borderRadius:10, background:`linear-gradient(135deg,${C.orange},#ff9f6a)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(246,128,72,0.4)", flexShrink:0 }}>
              <Ico name="university" size={isMobile?20:24} color={C.white} sw={1.8}/>
            </div>
            <div>
              <div style={{ color:C.white, fontWeight:700, fontSize:isMobile?12:14, lineHeight:1.2, letterSpacing:"1.2px", textTransform:"uppercase" }}>Nukus davlat</div>
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
          {isMobile && (
              <div style={{ position: "relative" }}>
                <div style={{ display:"flex", gap:8 }}>
                  {/* Lang button */}
                  <button
                      onClick={() => setShowLangDropdown(v => !v)}
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "none",
                        borderRadius: 7,
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                  >
        <span
            style={{ width: 18, height: 18, borderRadius: "50%", overflow: "hidden", display: "block" }}
            dangerouslySetInnerHTML={{ __html: LANG_SVG[activeLang] }}
        />
                  </button>

                  {/* Search button */}
                  <button style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:7, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Ico name="search" size={15} color={C.white}/>
                  </button>
                </div>

                {/* Dropdown */}
                {showLangDropdown && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: C.white,
                      borderRadius: 10,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      overflow: "hidden",
                      zIndex: 100,
                      minWidth: 160,
                    }}>
                      {LANGS.map((lang) => {
                        const isActive = lang.key === activeLang;
                        return (
                            <button
                                key={lang.key}
                                onClick={() => { setActiveLang(lang.key); setShowLangDropdown(false); }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  width: "100%",
                                  padding: "9px 14px",
                                  background: isActive ? C.lightGray : "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  fontFamily: "inherit",
                                }}
                            >
              <span
                  style={{ width: 20, height: 20, borderRadius: "50%", overflow: "hidden", flexShrink: 0, display: "block" }}
                  dangerouslySetInnerHTML={{ __html: LANG_SVG[lang.key] }}
              />
                              <span style={{
                                fontSize: 12,
                                fontWeight: isActive ? 700 : 400,
                                color: C.navy,
                              }}>
                {lang.label}
              </span>
            </button>
                        );
                      })}
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
