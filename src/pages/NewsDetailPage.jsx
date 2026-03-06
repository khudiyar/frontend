import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import newsList from "../data/news";

function NewsDetailPage({ navigate, params, isMobile }) {
  const item = newsList.find(n=>n.id===params?.newsId)||newsList[0];
  const related = newsList.filter(n=>n.id!==item.id&&n.cat===item.cat).slice(0,3);
  const [liked,setLiked]=useState(false);
  const [saved,setSaved]=useState(false);
  const body=["Bu O'zbekiston Milliy universiteti uchun tarixiy voqea bo'ldi. Barcha professor-o'qituvchilar va talabalarning fidokorona mehnati natijasidir.","Tadbirda rektorat a'zolari, dekanlar va yetakchi professorlar ishtirok etdi. Har yili o'tkaziladigan ushbu tadbir universitetning xalqaro maydonda obro'sini yanada oshirishga xizmat qilmoqda.","Rektor so'zga chiqib, kelgusi yillardagi rivojlanish rejalarini e'lon qildi. Mazkur yutuq yosh olimlar uchun ilhom manbai bo'lishi shubhasiz.","Kelajakda ham universitetimiz xalqaro ilmiy hamjamiyatdagi o'rnini mustahkamlab, O'zbekiston fani va ta'limiga munosib hissa qo'shishda davom etadi."];
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:isMobile?"24px 20px 32px":"36px 24px 48px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Yangiliklar",page:"news-list"},{label:item.cat}]} navigate={navigate}/>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}><Badge label={item.cat} color={item.accent}/><span style={{ color:"rgba(255,255,255,0.55)", fontSize:12 }}>{item.date}</span></div>
          <h1 style={{ color:C.white, fontSize:isMobile?"22px":"clamp(22px,4vw,34px)", fontWeight:800, lineHeight:1.25, fontFamily:"'Playfair Display',Georgia,serif", maxWidth:720 }}>{item.title}</h1>
          <div style={{ marginTop:16, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"6px 12px" }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:`${item.accent}40`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Ico name="user" size={16} color={C.white}/>
              </div>
              <div><div style={{ color:C.white, fontSize:13, fontWeight:600 }}>{item.author}</div><div style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>Muallif</div></div>
            </div>
            <div style={{ display:"flex", gap:12, color:"rgba(255,255,255,0.55)", fontSize:12 }}>
              <span style={{ display:"flex", alignItems:"center", gap:4 }}><Ico name="eye" size={12} color="rgba(255,255,255,0.5)"/>{item.views} ko'rishlar</span>
              <span style={{ display:"flex", alignItems:"center", gap:4 }}><Ico name="clock" size={12} color="rgba(255,255,255,0.5)"/>{item.mins} daqiqa</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:900, margin:"0 auto", padding:isMobile?"20px 16px 100px":"32px 24px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 260px", gap:isMobile?20:28, alignItems:"start" }}>
          <article>
            {/* Featured icon banner */}
            <div style={{ background:`linear-gradient(135deg,${item.accent}10,${item.accent}22)`, borderRadius:16, padding:isMobile?"32px":"48px 32px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28, border:`2px solid ${item.accent}25`, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:`${item.accent}12` }}/>
              <Ico name={item.icon} size={80} color={item.accent} sw={1}/>
            </div>
            <p style={{ fontSize:isMobile?15:17, fontWeight:500, color:C.dark, lineHeight:1.75, borderLeft:`4px solid ${item.accent}`, paddingLeft:20, marginBottom:28, fontStyle:"italic" }}>{item.desc}</p>
            {body.map((para,i)=><p key={i} style={{ fontSize:isMobile?14:15, color:C.mid, lineHeight:1.85, marginBottom:20 }}>{para}</p>)}
            <blockquote style={{ background:`${C.navy}08`, borderRadius:12, padding:"20px 24px", border:`1px solid ${C.bright}18`, borderLeft:`4px solid ${C.bright}`, margin:"28px 0" }}>
              <p style={{ fontSize:16, fontWeight:700, color:C.dark, lineHeight:1.6, fontFamily:"'Playfair Display',Georgia,serif", margin:0 }}>"Universitetimiz faqat ta'lim berish emas, balki kelajak avlodlarni shakllantirishni o'z oldiga maqsad qilib qo'ygan."</p>
              <cite style={{ fontSize:13, color:C.light, marginTop:10, display:"block" }}>— Rektor, Prof. B. Yusupov</cite>
            </blockquote>
            {/* Action bar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0", borderTop:`1px solid ${C.gray}`, borderBottom:`1px solid ${C.gray}`, marginBottom:24 }}>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>setLiked(!liked)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, border:`1px solid ${liked?C.bright:C.gray}`, background:liked?`${C.bright}12`:"transparent", color:liked?C.bright:C.mid, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                  <Ico name="heart" size={14} color={liked?C.bright:C.mid} sw={liked?2:1.5}/>{liked?"Yoqtirdingiz":"Yoqtirish"} · {item.views+90}
                </button>
                <button onClick={()=>setSaved(!saved)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, border:`1px solid ${saved?C.orange:C.gray}`, background:saved?`${C.orange}12`:"transparent", color:saved?C.orange:C.mid, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                  <Ico name="bookmark" size={14} color={saved?C.orange:C.mid}/>{saved?"Saqlangan":"Saqlash"}
                </button>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {[["facebook","#1877F2"],["twitter","#1DA1F2"],["telegram","#2AABEE"]].map(([ic,col])=>(
                  <button key={ic} style={{ width:34, height:34, borderRadius:8, border:`1px solid ${C.gray}`, background:C.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background=col;e.currentTarget.style.borderColor=col;}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.white;e.currentTarget.style.borderColor=C.gray;}}
                  ><Ico name={ic} size={15} color={C.mid}/></button>
                ))}
              </div>
            </div>
            {/* Author */}
            <div style={{ background:C.white, borderRadius:14, padding:20, display:"flex", alignItems:"center", gap:16, border:`1px solid ${C.gray}`, marginBottom:28 }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,${item.accent}20,${item.accent}38)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ico name="user" size={26} color={item.accent}/>
              </div>
              <div><div style={{ fontWeight:700, fontSize:15, color:C.dark }}>{item.author}</div><div style={{ fontSize:12, color:C.light, marginTop:2 }}>O'zMU axborot bo'limi</div><div style={{ fontSize:12, color:C.mid, marginTop:6, lineHeight:1.5 }}>Universitetdagi muhim voqealar va tadbirlarni yoritib keluvchi tajribali muharrir.</div></div>
            </div>
            {isMobile&&related.length>0&&(
              <div>
                <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:12, fontFamily:"'Playfair Display',Georgia,serif" }}>O'xshash maqolalar</h3>
                {related.map(r=>(
                  <div key={r.id} onClick={()=>navigate("news-detail",{newsId:r.id})} style={{ display:"flex", alignItems:"center", gap:12, padding:12, background:C.white, borderRadius:10, marginBottom:10, cursor:"pointer", border:`1px solid ${C.gray}` }}>
                    <div style={{ width:40, height:40, borderRadius:8, background:`${r.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={r.icon} size={18} color={r.accent}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:C.dark, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{r.title}</div>
                      <div style={{ fontSize:11, color:C.light, marginTop:2 }}>{r.date}</div>
                    </div>
                    <Ico name="chevRight" size={16} color={r.accent}/>
                  </div>
                ))}
              </div>
            )}
          </article>
          {!isMobile&&(
            <aside style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.8px", display:"flex", alignItems:"center", gap:8 }}>
                  <Ico name="fileText" size={13} color={C.orange}/> Mundarija
                </h3>
                {["Kirish","Asosiy qism","Muhim faktlar","Rektor sharhi","Xulosa"].map((t,i)=>(
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:i<4?`1px solid ${C.lightGray}`:"none", cursor:"pointer" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:`${item.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:item.accent, flexShrink:0 }}>{i+1}</div>
                    <span style={{ fontSize:13, color:C.mid, transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=C.bright} onMouseLeave={e=>e.currentTarget.style.color=C.mid}>{t}</span>
                  </div>
                ))}
              </div>
              {related.length>0&&(
                <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                  <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.8px" }}>O'xshash maqolalar</h3>
                  {related.map((r,i)=>(
                    <div key={r.id} onClick={()=>navigate("news-detail",{newsId:r.id})} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 0", borderBottom:i<related.length-1?`1px solid ${C.lightGray}`:"none", cursor:"pointer" }}>
                      <div style={{ width:34, height:34, borderRadius:8, background:`${r.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Ico name={r.icon} size={16} color={r.accent}/>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:C.dark, lineHeight:1.4, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{r.title}</div>
                        <div style={{ fontSize:11, color:C.light, marginTop:3, display:"flex", alignItems:"center", gap:4 }}><Ico name="eye" size={10} color={C.light}/>{r.views}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, borderRadius:14, padding:18 }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.white, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                  <Ico name="share" size={13} color={C.orange}/> Ulashing
                </h3>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {[["facebook","Facebook","#1877F2"],["twitter","Twitter","#1DA1F2"],["telegram","Telegram","#2AABEE"],["mail","Email",C.orange]].map(([ic,label,col])=>(
                    <button key={label} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 12px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"none", color:C.white, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background=col;}}
                      onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";}}
                    ><Ico name={ic} size={13} color={C.white}/>{label}</button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsDetailPage;
