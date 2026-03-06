import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { admissionSteps, programs } from "../data/admissions";

function AdmissionsPage({ navigate, isMobile }) {
  const [degree,setDegree]=useState("Bakalavriat");
  const [openFaq,setOpenFaq]=useState(null);
  const degrees=["Bakalavriat","Magistratura","Doktorantura"];
  const faqs=[
    {q:"Qabul qachon boshlanadi?",a:"Har yili iyun oyining birinchi kunidan qabul jarayoni boshlanadi. Qabul komissiyasiga murojaat qiling."},
    {q:"Qanday hujjatlar kerak?",a:"Shahodatnomasining notarial tasdiqlangan nusxasi, pasport va 3x4 formatdagi suratlar talab etiladi."},
    {q:"Grant o'rinlari qancha?",a:"Bakalavriat bo'yicha jami 300+ grant o'rni mavjud. Har bir yo'nalish uchun grant soni alohida belgilanadi."},
    {q:"Til imtihoni talab etiladimi?",a:"Xorijiy til yo'nalishlari uchun ingliz tili bo'yicha alohida test o'tkaziladi."},
    {q:"Yotoqxona bormi?",a:"Ha, universitetimizda 5000+ nafar talabaga mo'ljallangan zamonaviy yotoqxonalar mavjud."},
  ];
  const deadlines=[
    {l:"Hujjat topshirish",  d:"1 Iyun 2026",    color:C.green},
    {l:"Online ariza muddati",d:"25 Iyun 2026",   color:C.orange},
    {l:"Kirish imtihonlari", d:"5-10 Iyul 2026",  color:C.bright},
    {l:"Natijalar e'loni",   d:"20 Iyul 2026",    color:C.navy},
    {l:"Shartnoma va to'lov",d:"1-10 Avgust 2026",color:C.purple},
  ];
  const degreeIcons={"Bakalavriat":"graduation","Magistratura":"bookOpen","Doktorantura":"microscope"};
  const filteredProg=programs.filter(p=>p.degree===degree);
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.bright})`, padding:isMobile?"28px 20px":"44px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:380, height:380, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Qabul"}]} navigate={navigate}/>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ico name="graduation" size={26} color={C.orange} sw={1.5}/>
            </div>
            <h1 style={{ color:C.white, fontSize:isMobile?22:"clamp(22px,4vw,38px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif" }}>Qabul 2026-2027</h1>
          </div>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14, marginBottom:22 }}>O'zbekiston Milliy universitetiga qabul jarayoni haqida to'liq ma'lumot</p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {degrees.map(d=>(
              <button key={d} onClick={()=>setDegree(d)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 18px", borderRadius:10, border:degree===d?"none":`1px solid rgba(255,255,255,0.28)`, cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:13, background:degree===d?`linear-gradient(135deg,${C.orange},#ff9f6a)`:"rgba(255,255,255,0.1)", color:C.white, backdropFilter:"blur(4px)", transition:"all 0.2s", boxShadow:degree===d?"0 4px 14px rgba(246,128,72,0.35)":"none" }}>
                <Ico name={degreeIcons[d]} size={15} color={C.white}/>{d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"20px 16px 100px":"32px 24px 60px" }}>
        {/* STEPS */}
        <div style={{ background:C.white, borderRadius:16, padding:isMobile?"18px":"28px", marginBottom:24, border:`1px solid ${C.gray}` }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:22, display:"flex", alignItems:"center", gap:8 }}>
            <Ico name="layers" size={20} color={C.bright}/> Qabul bosqichlari
          </h2>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:isMobile?12:0, alignItems:isMobile?"stretch":"flex-start", position:"relative" }}>
            {!isMobile&&<div style={{ position:"absolute", top:32, left:"8%", right:"8%", height:2, background:`linear-gradient(90deg,${C.bright},${C.orange})`, zIndex:0 }}/>}
            {admissionSteps.map((step,i)=>(
              <div key={step.n} style={{ flex:1, display:"flex", flexDirection:isMobile?"row":"column", alignItems:isMobile?"flex-start":"center", gap:isMobile?12:10, textAlign:isMobile?"left":"center", position:"relative", zIndex:1 }}>
                <div style={{ width:isMobile?48:62, height:isMobile?48:62, borderRadius:"50%", background:`linear-gradient(135deg,${C.bright},${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 4px 14px rgba(40,69,214,0.28)`, border:`3px solid ${C.white}` }}>
                  <Ico name={step.icon} size={isMobile?22:26} color={C.white} sw={1.5}/>
                </div>
                <div style={{ flex:isMobile?1:undefined }}>
                  <div style={{ fontSize:10, fontWeight:700, color:C.orange, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:4 }}>Bosqich {step.n}</div>
                  <div style={{ fontSize:isMobile?14:13, fontWeight:700, color:C.dark, marginBottom:4 }}>{step.title}</div>
                  <div style={{ fontSize:12, color:C.mid, lineHeight:1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 300px", gap:isMobile?20:24, alignItems:"start" }}>
          <div>
            {/* Table */}
            <div style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.gray}`, marginBottom:22 }}>
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"14px 18px", display:"flex", alignItems:"center", gap:10 }}>
                <Ico name="bookOpen" size={16} color={C.white}/>
                <h3 style={{ color:C.white, fontSize:15, fontWeight:700, margin:0 }}>{degree} yo'nalishlari</h3>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead><tr style={{ background:C.lightGray }}>
                    {["Yo'nalish","Davomiyligi","Til","Grant","Kontrakt","Ball"].map(h=><th key={h} style={{ padding:"10px 14px", fontSize:11, fontWeight:700, color:C.mid, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.5px", borderBottom:`1px solid ${C.gray}`, whiteSpace:"nowrap" }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {filteredProg.map((p,i)=>(
                      <tr key={i} style={{ transition:"background 0.15s" }} onMouseEnter={e=>e.currentTarget.style.background=C.lightGray} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:C.dark, borderBottom:`1px solid ${C.lightGray}` }}>{p.name}</td>
                        <td style={{ padding:"12px 14px", fontSize:13, color:C.mid, borderBottom:`1px solid ${C.lightGray}`, whiteSpace:"nowrap" }}>{p.dur}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:C.mid, borderBottom:`1px solid ${C.lightGray}` }}>{p.lang}</td>
                        <td style={{ padding:"12px 14px", borderBottom:`1px solid ${C.lightGray}` }}><span style={{ background:`${C.green}14`, color:C.green, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{p.grant} ta</span></td>
                        <td style={{ padding:"12px 14px", fontSize:13, fontWeight:600, color:C.orange, borderBottom:`1px solid ${C.lightGray}`, whiteSpace:"nowrap" }}>{(p.kontrakt/1000000).toFixed(1)}M so'm</td>
                        <td style={{ padding:"12px 14px", borderBottom:`1px solid ${C.lightGray}` }}><span style={{ background:`${C.bright}12`, color:C.bright, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{p.score}+</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* FAQ */}
            <div style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.gray}` }}>
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"14px 18px", display:"flex", alignItems:"center", gap:10 }}>
                <Ico name="messageCircle" size={16} color={C.white}/>
                <h3 style={{ color:C.white, fontSize:15, fontWeight:700, margin:0 }}>Ko'p beriladigan savollar</h3>
              </div>
              {faqs.map((faq,i)=>(
                <div key={i} style={{ borderBottom:i<faqs.length-1?`1px solid ${C.lightGray}`:"none" }}>
                  <div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", cursor:"pointer", transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                  >
                    <span style={{ fontSize:14, fontWeight:600, color:C.dark, flex:1, paddingRight:12 }}>{faq.q}</span>
                    <div style={{ transform:openFaq===i?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s", flexShrink:0 }}>
                      <Ico name="chevDown" size={16} color={openFaq===i?C.bright:C.light} sw={2}/>
                    </div>
                  </div>
                  {openFaq===i&&<div style={{ padding:"0 18px 14px", fontSize:14, color:C.mid, lineHeight:1.7, animation:"fadeUp 0.2s ease" }}>{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          {!isMobile&&(
            <aside style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.8px", display:"flex", alignItems:"center", gap:8 }}>
                  <Ico name="calendar" size={13} color={C.orange}/> Muhim sanalar
                </h3>
                {deadlines.map((d,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:13, paddingBottom:13, borderBottom:i<deadlines.length-1?`1px solid ${C.lightGray}`:"none" }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:d.color, marginTop:5, flexShrink:0 }}/>
                    <div><div style={{ fontSize:12, color:C.mid, marginBottom:2 }}>{d.l}</div><div style={{ fontSize:13, fontWeight:700, color:d.color }}>{d.d}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ background:`linear-gradient(135deg,${C.orange},#ff9f6a)`, borderRadius:14, padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <Ico name="fileText" size={22} color={C.white}/>
                  <h3 style={{ fontSize:15, fontWeight:700, color:C.white }}>Hujjat topshirish</h3>
                </div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.85)", marginBottom:14, lineHeight:1.5 }}>Online ariza orqali tezroq qabul jarayonini boshlang.</p>
                <Btn variant="ghost" style={{ width:"100%", padding:"11px", fontSize:13 }}>Online ariza →</Btn>
              </div>
              <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.8px", display:"flex", alignItems:"center", gap:8 }}>
                  <Ico name="phone" size={13} color={C.bright}/> Qabul komissiyasi
                </h3>
                {[{ic:"mapPin",v:"1-bino, 101-xona"},{ic:"phone",v:"(71) 246-08-96"},{ic:"mail",v:"qabul@nuu.uz"},{ic:"clock",v:"Du–Ju: 9:00–17:00"}].map(r=>(
                  <div key={r.ic} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9, fontSize:13, color:C.dark }}>
                    <Ico name={r.ic} size={13} color={C.bright}/>{r.v}
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}


export default AdmissionsPage;
