import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import newsList from "../data/news";

function NewsCard({ item, delay, compact, onClick }) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
      style={{ background:C.white, borderRadius:12, overflow:"hidden", boxShadow:hov?"0 16px 40px rgba(13,26,99,0.14)":"0 4px 16px rgba(13,26,99,0.07)", transform:hov?"translateY(-5px)":"translateY(0)", transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)", cursor:"pointer", animation:`fadeUp 0.5s ease both`, animationDelay:`${delay}ms`, display:compact?"flex":"block", alignItems:compact?"center":"undefined" }}>
      {compact ? (
        <>
          <div style={{ width:64, minWidth:64, height:64, background:`linear-gradient(135deg,${item.accent}18,${item.accent}30)`, display:"flex", alignItems:"center", justifyContent:"center", borderRight:`3px solid ${item.accent}` }}>
            <Ico name={item.icon} size={26} color={item.accent} sw={1.5}/>
          </div>
          <div style={{ padding:"10px 14px", flex:1, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}><Badge label={item.cat} color={item.accent}/><span style={{ color:C.light, fontSize:11 }}>{item.date}</span></div>
            <div style={{ fontSize:13, fontWeight:700, color:C.dark, lineHeight:1.35, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.title}</div>
          </div>
          <div style={{ padding:"0 14px", display:"flex", alignItems:"center" }}><Ico name="chevRight" size={16} color={item.accent}/></div>
        </>
      ) : (
        <>
          <div style={{ background:`linear-gradient(135deg,${item.accent}12,${item.accent}25)`, padding:"32px 24px", display:"flex", alignItems:"center", justifyContent:"center", borderBottom:`3px solid ${item.accent}`, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%", background:`${item.accent}18` }}/>
            <Ico name={item.icon} size={48} color={item.accent} sw={1.2}/>
          </div>
          <div style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}><Badge label={item.cat} color={item.accent}/><span style={{ color:C.light, fontSize:12 }}>{item.date}</span></div>
            <h3 style={{ fontSize:15, fontWeight:700, color:C.dark, lineHeight:1.4, marginBottom:8, fontFamily:"'Playfair Display',Georgia,serif" }}>{item.title}</h3>
            <p style={{ fontSize:13, color:C.mid, lineHeight:1.6, margin:0 }}>{item.desc}</p>
            <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:6, color:item.accent, fontSize:13, fontWeight:600 }}>
              Batafsil <Ico name="arrowRight" size={14} color={item.accent}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function HomePage({ navigate, isMobile }) {
  const statsRef = useRef(null);
  const [go, setGo] = useState(false);
  const stats = [
    { v:13,    l:"Fakultetlar",         s:"",  icon:"university" },
    { v:34000, l:"Talabalar",           s:"+", icon:"users"      },
    { v:56,    l:"Ta'lim yo'nalishlari",s:"",  icon:"bookOpen"   },
    { v:1230,  l:"O'qituvchilar",       s:"",  icon:"award"      },
  ];
  const ql = [
    { icon:"clipboard",  label:"Qabul",           desc:"Hujjat topshirish",   page:"admissions" },
    { icon:"calendar",   label:"Dars jadvali",     desc:"Barcha guruhlar",     page:"portal"     },
    { icon:"graduation", label:"Doktorantura",     desc:"PhD dasturlari",      page:"admissions" },
    { icon:"globe",      label:"Xalqaro dasturlar",desc:"Grant imkoniyatlari", page:"contact"    },
    { icon:"bookOpen",   label:"Kutubxona",        desc:"Elektron resurslar",  page:"contact"    },
    { icon:"messageCircle",label:"Rektorga murojaat",desc:"Murojaat qilish",  page:"contact"    },
  ];
  const [tab, setTab] = useState("barcha");
  const cats = ["barcha","yangilik","ilm-fan","xalqaro","ta'lim"];
  const filtered = tab==="barcha" ? newsList : newsList.filter(n=>n.cat.toLowerCase()===tab);

  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:0.3});
    if(statsRef.current)ob.observe(statsRef.current);
    return()=>ob.disconnect();
  },[]);

  return (
    <div>
      {/* HERO */}
      <section style={{ background:`linear-gradient(135deg,${C.navy} 0%,${C.blue} 55%,${C.bright} 100%)`, padding:isMobile?"44px 20px 60px":"80px 24px 100px", position:"relative", overflow:"hidden" }}>
        {[[500,500,-100,null,null,-100],[300,300,null,-50,100,null],[200,200,100,null,"45%",null]].map(([w,h,top,bot,left,right],i)=>(
          <div key={i} style={{ position:"absolute",width:w,height:h,borderRadius:"50%",border:`${i===2?1:2}px solid rgba(255,255,255,0.08)`,background:"radial-gradient(circle,rgba(255,255,255,0.04),transparent)",top,bottom:bot,left,right }}/>
        ))}
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <div style={{ maxWidth:700 }}>
            {/* <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(246,128,72,0.18)", border:"1px solid rgba(246,128,72,0.35)", color:C.orange, padding:"5px 14px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:18, animation:"fadeUp 0.6s ease both" }}>
              <Ico name="star" size={12} color={C.orange} sw={2}/> Markaziy Osiyoning #1 universiteti
            </div> */}
            <h1 style={{ color:C.white, fontSize:isMobile?"26px":"clamp(30px,5vw,52px)", fontWeight:800, lineHeight:1.15, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:16, animation:"fadeUp 0.6s 0.1s ease both" }}>
              Nukus davlat<br/>
              <span style={{ background:`linear-gradient(90deg,${C.orange},#ffb88a,${C.orange})`, backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>texnika universiteti</span>{" "}
            </h1>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:isMobile?13:16, lineHeight:1.75, maxWidth:540, marginBottom:28, animation:"fadeUp 0.6s 0.2s ease both" }}>
              2005-yildan buyon bilim va innovatsiyalar markazi. Kelajak avlodlarni tayyorlash, ilm-fanni rivojlantirish va jamiyatga xizmat qilish bizning asosiy maqsadimizdir.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", animation:"fadeUp 0.6s 0.3s ease both" }}>
              {/* <Btn variant="orange" onClick={()=>navigate("admissions")} style={{ padding:isMobile?"11px 20px":"13px 28px", fontSize:isMobile?13:15 }}>
                <Ico name="clipboard" size={16} color={C.white}/> Hujjat topshirish
              </Btn> */}
              <Btn variant="ghost" onClick={()=>navigate("about")} style={{ padding:isMobile?"11px 20px":"13px 28px", fontSize:isMobile?13:15 }}>
                <Ico name="info" size={16} color={C.white}/> Universitet haqida
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      {!isMobile && 
      <section ref={statsRef} style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, position:"relative" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)` }}>
            {stats.map((s,i)=>{
              const n=useCountUp(s.v,2000,go);
              return (
                <div key={i} style={{ textAlign:"center", padding:isMobile?"24px 8px":"28px 16px", borderRight:!isMobile&&i<3?`1px solid rgba(255,255,255,0.1)`:"none", borderBottom:isMobile&&i<2?`1px solid rgba(255,255,255,0.1)`:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Ico name={s.icon} size={22} color={C.orange} sw={1.6}/>
                  </div>
                  <div style={{ fontSize:isMobile?"clamp(20px,7vw,32px)":"clamp(26px,5vw,44px)", fontWeight:800, color:C.orange, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1 }}>{n.toLocaleString()}{s.s}</div>
                  {!isMobile&&<div style={{ fontSize:10, color:"rgba(255,255,255,0.65)", fontWeight:600, textTransform:"uppercase", letterSpacing:"1.2px" }}>{s.l}</div>}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ height:3, background:`linear-gradient(90deg,${C.orange},${C.bright},${C.orange})` }}/>
      </section>
      }

      {/* QUICK LINKS */}
      <section style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"36px 16px 20px":"56px 24px 36px" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ color:C.orange, fontWeight:700, fontSize:11, letterSpacing:"2px", textTransform:"uppercase", marginBottom:6 }}>Tezkor havolalar</div>
          <h2 style={{ fontSize:"clamp(18px,3vw,28px)", fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif" }}>Kerakli ma'lumotlarga tez kiring</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(3,1fr)":"repeat(6,1fr)", gap:10 }}>
          {ql.map((lk,i)=>(
            <div key={lk.label} onClick={()=>navigate(lk.page)} style={{ background:C.white, borderRadius:14, padding:isMobile?"14px 8px":"20px 14px", textAlign:"center", cursor:"pointer", boxShadow:`0 2px 12px rgba(13,26,99,0.06)`, border:`1px solid ${C.gray}`, animation:`fadeUp 0.4s ${i*55}ms ease both`, transition:"all 0.25s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(13,26,99,0.13)";e.currentTarget.style.borderColor=C.bright;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 2px 12px rgba(13,26,99,0.06)`;e.currentTarget.style.borderColor=C.gray;}}
            >
              <div style={{ width:isMobile?40:48, height:isMobile?40:48, borderRadius:12, background:`linear-gradient(135deg,${C.bright}12,${C.orange}10)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}>
                <Ico name={lk.icon} size={isMobile?20:24} color={C.bright} sw={1.6}/>
              </div>
              <div style={{ fontWeight:700, fontSize:isMobile?10:12, color:C.dark, lineHeight:1.3 }}>{lk.label}</div>
              {!isMobile&&<div style={{ fontSize:11, color:C.light, marginTop:2 }}>{lk.desc}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"0 16px 100px":"0 24px 60px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
          <div>
            <div style={{ color:C.orange, fontWeight:700, fontSize:11, letterSpacing:"2px", textTransform:"uppercase", marginBottom:4 }}>So'nggi yangiliklar</div>
            <h2 style={{ fontSize:"clamp(18px,3vw,28px)", fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif" }}>Universitetdagi voqealar</h2>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {cats.map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ padding:"6px 12px", borderRadius:20, border:tab===t?"none":`1px solid ${C.gray}`, cursor:"pointer", fontSize:11, fontWeight:600, textTransform:"capitalize", fontFamily:"inherit", background:tab===t?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white, color:tab===t?C.white:C.mid, transition:"all 0.2s" }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?10:16 }}>
          {(filtered.length?filtered:newsList).slice(0,6).map((item,i)=>(
            <NewsCard key={item.id} item={item} delay={i*65} compact={isMobile} onClick={()=>navigate("news-detail",{newsId:item.id})}/>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <Btn variant="outline" onClick={()=>navigate("news-list")}><Ico name="newspaper" size={15} color={C.bright}/> Barcha yangiliklar</Btn>
        </div>
      </section>

      {/* CTA */}
      {!isMobile&&(
        <section style={{ background:`linear-gradient(135deg,${C.navy} 0%,${C.bright} 100%)`, padding:"64px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(246,128,72,0.12),transparent)" }}/>
          <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative" }}>
            <h2 style={{ color:C.white, fontSize:"clamp(22px,4vw,38px)", fontWeight:800, marginBottom:14, fontFamily:"'Playfair Display',Georgia,serif" }}>2026-2027 o'quv yiliga hujjat topshiring</h2>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:16, marginBottom:32, lineHeight:1.6 }}>56 ta ta'lim yo'nalishi bo'yicha bakalavriat va magistraturaga qabul davom etmoqda.</p>
            <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
              <Btn variant="orange" onClick={()=>navigate("admissions")}><Ico name="arrowRight" size={16} color={C.white}/> Hujjat topshirish</Btn>
              <Btn variant="ghost">To'lov-kontrakt narxlari</Btn>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* shared news card */

export default HomePage;
