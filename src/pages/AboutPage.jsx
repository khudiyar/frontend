import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { timeline } from "../data/about";

function AboutPage({ navigate, isMobile }) {
  const values=[
    {icon:"award",   title:"Sifat",       desc:"Ta'lim va tadqiqotda eng yuqori standartlar."},
    {icon:"globe",   title:"Xalqarolik",  desc:"Global akademik hamjamiyat bilan faol hamkorlik."},
    {icon:"cpu",     title:"Innovatsiya", desc:"Zamonaviy texnologiya va yondashuvlarni joriy etish."},
    {icon:"users",   title:"Hamkorlik",   desc:"Talabalar va professurlar bilan ochiq muloqot."},
    {icon:"trendUp", title:"Rivojlanish", desc:"Doimiy o'rganish va shaxsiy o'sishni qo'llab-quvvatlash."},
    {icon:"microscope",title:"Ilmiylik",  desc:"Ilmiy haqiqatni asosiy mezon sifatida qabul qilish."},
  ];
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:isMobile?"28px 20px":"52px 24px", position:"relative", overflow:"hidden" }}>
        {[0,1].map(i=><div key={i} style={{ position:"absolute", borderRadius:"50%", border:`${i+1}px solid rgba(255,255,255,0.06)`, width:300+i*200, height:300+i*200, top:-80-i*60, right:-80-i*50 }}/>)}
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Universitet haqida"}]} navigate={navigate}/>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:28, alignItems:"center" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(246,128,72,0.18)", border:"1px solid rgba(246,128,72,0.35)", color:C.orange, padding:"5px 14px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:18 }}>
                <Ico name="star" size={12} color={C.orange} sw={2}/> 2005 · 21 yillik tarix
              </div>
              <h1 style={{ color:C.white, fontSize:isMobile?24:"clamp(24px,4vw,42px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.2, marginBottom:14 }}>Qoraqalpog'istonning <br />IT universiteti</h1>
              <p style={{ color:"rgba(255,255,255,0.8)", fontSize:15, lineHeight:1.75, marginBottom:22 }}>Nukus davlat texnika universiteti 2005-yildan buyon 13 ta fakultet, 34 000 talaba va 1 230 professor-o'qituvchiga ega yetakchi ta'lim markazi.</p>
              <div style={{ display:"flex", gap:10 }}>
                <Btn variant="orange" onClick={()=>navigate("admissions")}><Ico name="clipboard" size={15} color={C.white}/> Qabul</Btn>
                <Btn variant="ghost" onClick={()=>navigate("faculty-list")}><Ico name="university" size={15} color={C.white}/> Fakultetlar</Btn>
              </div>
            </div>
            {!isMobile&&(
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[{v:"106",l:"Yillik tarix",ic:"scroll"},{v:"13",l:"Fakultetlar",ic:"university"},{v:"34K+",l:"Talabalar",ic:"users"},{v:"#1",l:"O'zbekistonda",ic:"award"}].map(s=>(
                  <div key={s.l} style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:20, textAlign:"center", backdropFilter:"blur(6px)", border:"1px solid rgba(255,255,255,0.14)" }}>
                    <Ico name={s.ic} size={26} color={C.orange} sw={1.5} style={{ marginBottom:8 }}/>
                    <div style={{ fontSize:32, fontWeight:800, color:C.orange, fontFamily:"'Playfair Display',Georgia,serif" }}>{s.v}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.8px", marginTop:4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <section style={{ maxWidth:900, margin:"0 auto", padding:isMobile?"32px 16px":"52px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ color:C.orange, fontWeight:700, fontSize:11, letterSpacing:"2px", textTransform:"uppercase", marginBottom:8 }}>Tarix</div>
          <h2 style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif" }}>Universiteti tarixi</h2>
        </div>
        <div style={{ position:"relative" }}>
          {!isMobile&&<div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:`linear-gradient(to bottom,${C.bright},${C.orange})`, transform:"translateX(-50%)" }}/>}
          {isMobile&&<div style={{ position:"absolute", left:20, top:0, bottom:0, width:2, background:`linear-gradient(to bottom,${C.bright},${C.orange})` }}/>}
          {timeline.map((ev,i)=>(
            <div key={ev.year} style={{ marginBottom:28 }}>
              {isMobile ? (
                <div style={{ display:"flex", alignItems:"flex-start", gap:14, paddingLeft:50 }}>
                  <div style={{ position:"absolute", left:10, width:22, height:22, borderRadius:"50%", background:`linear-gradient(135deg,${C.bright},${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:1 }}>
                    <Ico name={ev.icon} size={11} color={C.white} sw={2}/>
                  </div>
                  <div style={{ background:C.white, borderRadius:12, padding:16, flex:1, border:`1px solid ${C.gray}` }}>
                    <div style={{ fontSize:11, fontWeight:700, color:C.orange, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:3 }}>{ev.year}</div>
                    <div style={{ fontSize:15, fontWeight:700, color:C.dark, marginBottom:4, fontFamily:"'Playfair Display',Georgia,serif" }}>{ev.title}</div>
                    <div style={{ fontSize:13, color:C.mid, lineHeight:1.5 }}>{ev.desc}</div>
                  </div>
                </div>
              ) : (
                <div style={{ display:"flex", justifyContent:i%2===0?"flex-start":"flex-end", position:"relative" }}>
                  <div style={{ position:"absolute", left:"50%", top:12, transform:"translateX(-50%)", width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg,${C.bright},${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:1, boxShadow:`0 4px 14px rgba(40,69,214,0.3)`, border:`3px solid ${C.white}` }}>
                    <Ico name={ev.icon} size={20} color={C.white} sw={1.6}/>
                  </div>
                  <div style={{ width:"calc(50% - 40px)", ...(i%2===0 ? {marginRight:"auto"} : {marginLeft:"auto"}) }}>
                    <div style={{ background:C.white, borderRadius:14, padding:20, border:`1px solid ${C.gray}`, boxShadow:`0 2px 14px rgba(13,26,99,0.07)` }}>
                      <div style={{ fontSize:11, fontWeight:700, color:C.orange, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:4 }}>{ev.year}</div>
                      <div style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:5, fontFamily:"'Playfair Display',Georgia,serif" }}>{ev.title}</div>
                      <div style={{ fontSize:13, color:C.mid, lineHeight:1.6 }}>{ev.desc}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:isMobile?"30px 16px":"52px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ color:C.orange, fontWeight:700, fontSize:11, letterSpacing:"2px", textTransform:"uppercase", marginBottom:8 }}>Qadriyatlarimiz</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:800, color:C.white, fontFamily:"'Playfair Display',Georgia,serif" }}>Biz nimaga intilamiz</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
            {values.map((v,i)=>(
              <div key={v.title} style={{ background:"rgba(255,255,255,0.08)", borderRadius:14, padding:20, backdropFilter:"blur(6px)", border:"1px solid rgba(255,255,255,0.1)", transition:"all 0.25s", animation:`fadeUp 0.4s ${i*60}ms ease both` }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}
              >
                <div style={{ width:44, height:44, borderRadius:11, background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                  <Ico name={v.icon} size={22} color={C.orange}/>
                </div>
                <div style={{ fontSize:15, fontWeight:700, color:C.white, marginBottom:7 }}>{v.title}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.68)", lineHeight:1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


export default AboutPage;
