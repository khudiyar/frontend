import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { contactDepts } from "../data/about";

function ContactPage({ navigate, isMobile }) {
  const [sent,setSent]=useState(false);
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:isMobile?"28px 20px":"44px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Aloqa"}]} navigate={navigate}/>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
            <div style={{ width:46, height:46, borderRadius:12, background:"rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ico name="messageCircle" size={24} color={C.orange}/>
            </div>
            <h1 style={{ color:C.white, fontSize:isMobile?22:"clamp(22px,4vw,38px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif" }}>Biz bilan bog'laning</h1>
          </div>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14 }}>Savollaringiz bormi? Biz yordam berishga doimo tayyormiz.</p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"20px 16px 100px":"32px 24px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:12, marginBottom:28 }}>
          {contactDepts.map((d,i)=>(
            <div key={d.name} style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}`, transition:"all 0.25s", animation:`fadeUp 0.4s ${i*60}ms ease both`, cursor:"pointer" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=d.color;e.currentTarget.style.boxShadow=`0 10px 28px ${d.color}20`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{ width:44, height:44, borderRadius:12, background:`${d.color}14`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                <Ico name={d.icon} size={22} color={d.color}/>
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:4 }}>{d.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:d.color, fontWeight:600, marginBottom:2 }}><Ico name="phone" size={11} color={d.color}/>{d.phone}</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:C.light }}><Ico name="clock" size={11} color={C.light}/>{d.time}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?20:28 }}>
          {/* FORM */}
          <div style={{ background:C.white, borderRadius:16, padding:isMobile?20:26, border:`1px solid ${C.gray}` }}>
            {!sent ? (
              <div>
                <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:18, display:"flex", alignItems:"center", gap:10 }}>
                  <Ico name="send" size={18} color={C.bright}/> Xabar yuborish
                </h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                  {[{l:"Ism-familiya *",p:"To'liq ismingiz",ic:"user"},{l:"Email *",p:"email@domain.com",ic:"mail"}].map(f=>(
                    <div key={f.l}>
                      <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>{f.l}</label>
                      <div style={{ position:"relative" }}>
                        <div style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}><Ico name={f.ic} size={14} color={C.light}/></div>
                        <input placeholder={f.p} style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px 9px 32px", fontSize:13, fontFamily:"inherit", color:C.dark, outline:"none", background:C.lightGray, transition:"border 0.2s" }} onFocus={e=>e.target.style.borderColor=C.bright} onBlur={e=>e.target.style.borderColor=C.gray}/>
                      </div>
                    </div>
                  ))}
                </div>
                {[{l:"Telefon",p:"+998 XX XXX XX XX",ic:"phone"},{l:"Bo'lim",p:null,ic:"building2"}].map(f=>(
                  <div key={f.l} style={{ marginBottom:12 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>{f.l}</label>
                    <div style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}><Ico name={f.ic} size={14} color={C.light}/></div>
                      {f.p?
                        <input placeholder={f.p} style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px 9px 32px", fontSize:13, fontFamily:"inherit", color:C.dark, outline:"none", background:C.lightGray, transition:"border 0.2s" }} onFocus={e=>e.target.style.borderColor=C.bright} onBlur={e=>e.target.style.borderColor=C.gray}/>
                        : <select style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px 9px 32px", fontSize:13, fontFamily:"inherit", color:C.light, outline:"none", background:C.lightGray, cursor:"pointer" }}>
                            <option value="">Bo'limni tanlang</option>
                            {contactDepts.map(d=><option key={d.name} value={d.name}>{d.name}</option>)}
                          </select>
                      }
                    </div>
                  </div>
                ))}
                <div style={{ marginBottom:18 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:5 }}>Xabar *</label>
                  <textarea rows={5} placeholder="Savolingiz yoki xabaringizni yozing..." style={{ width:"100%", border:`1px solid ${C.gray}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"inherit", color:C.dark, outline:"none", resize:"vertical", background:C.lightGray, transition:"border 0.2s" }} onFocus={e=>e.target.style.borderColor=C.bright} onBlur={e=>e.target.style.borderColor=C.gray}/>
                </div>
                <Btn variant="primary" onClick={()=>setSent(true)} style={{ width:"100%", padding:"12px", fontSize:14 }}>
                  <Ico name="send" size={16} color={C.white}/> Xabar yuborish
                </Btn>
              </div>
            ) : (
              <div style={{ textAlign:"center", padding:"48px 20px" }}>
                <div style={{ width:72, height:72, borderRadius:"50%", background:`${C.green}14`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
                  <Ico name="checkCircle" size={40} color={C.green}/>
                </div>
                <h3 style={{ fontSize:20, fontWeight:800, color:C.green, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:10 }}>Xabar yuborildi!</h3>
                <p style={{ fontSize:14, color:C.mid, marginBottom:20 }}>Xabaringiz qabul qilindi. Tez orada siz bilan bog'lanamiz.</p>
                <Btn variant="outline" onClick={()=>setSent(false)}>Yana yuborish</Btn>
              </div>
            )}
          </div>

          {/* Info + Map */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:`linear-gradient(135deg,${C.navy}12,${C.bright}18)`, borderRadius:16, height:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:`2px solid ${C.bright}18`, position:"relative", overflow:"hidden", cursor:"pointer" }}>
              <div style={{ position:"absolute", inset:0, display:"grid", gridTemplateColumns:"repeat(12,1fr)", gridTemplateRows:"repeat(7,1fr)", opacity:0.06 }}>
                {Array.from({length:84}).map((_,i)=><div key={i} style={{ border:`0.5px solid ${C.bright}` }}/>)}
              </div>
              <div style={{ position:"relative", textAlign:"center" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:`${C.bright}20`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                  <Ico name="map" size={26} color={C.bright}/>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:C.dark }}>Xaritada ko'rish</div>
                <div style={{ fontSize:12, color:C.mid, marginTop:4 }}>Olmazor, Universitet ko'chasi 4</div>
              </div>
              <div style={{ position:"absolute", width:14, height:14, borderRadius:"50%", background:C.orange, top:"45%", left:"52%", boxShadow:`0 0 0 5px ${C.orange}30`, animation:"pulse 2s infinite" }}/>
            </div>
            <div style={{ background:C.white, borderRadius:14, padding:20, border:`1px solid ${C.gray}` }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}><Ico name="mapPin" size={15} color={C.bright}/> Manzil va aloqa</h3>
              {[{ic:"mapPin",l:"Manzil",v:"100174, Toshkent, Olmazor, Universitet 4"},{ic:"phone",l:"Telefon",v:"(71) 246-08-96"},{ic:"mail",l:"Email",v:"info@nuu.uz"},{ic:"globe",l:"Web",v:"www.nuu.uz"},{ic:"clock",l:"Ish vaqti",v:"Du–Ju: 9:00–18:00"}].map(item=>(
                <div key={item.l} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:`${C.bright}10`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico name={item.ic} size={14} color={C.bright}/>
                  </div>
                  <div><div style={{ fontSize:10, color:C.light, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:1 }}>{item.l}</div><div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{item.v}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, borderRadius:14, padding:18 }}>
              <h3 style={{ fontSize:13, fontWeight:700, color:C.white, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}><Ico name="share" size={13} color={C.orange}/> Ijtimoiy tarmoqlar</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[{ic:"facebook",l:"Facebook",h:"@ozmilliyuniver",col:"#1877F2"},{ic:"telegram",l:"Telegram",h:"@NUUz_official",col:"#2AABEE"},{ic:"instagram",l:"Instagram",h:"@nuu.uz",col:"#E1306C"},{ic:"youtube",l:"YouTube",h:"O'zMU rasmiy",col:"#FF0000"}].map(s=>(
                  <div key={s.l} style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", borderRadius:9, padding:"9px 12px", cursor:"pointer", transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=s.col}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
                  >
                    <Ico name={s.ic} size={16} color={C.white}/>
                    <div><div style={{ fontSize:11, fontWeight:700, color:C.white }}>{s.l}</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.5)" }}>{s.h}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ContactPage;
