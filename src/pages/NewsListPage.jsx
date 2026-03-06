import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import newsList from "../data/news";

function NewsListPage({ navigate, isMobile }) {
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("Barcha");
  const cats = ["Barcha","Yangilik","Ilm-fan","Xalqaro","Ta'lim","Sport","Madaniyat"];
  const popular = [...newsList].sort((a,b)=>b.views-a.views).slice(0,4);
  const filtered = newsList.filter(n=>{
    const mC=cat==="Barcha"||n.cat===cat;
    const mS=search===""||n.title.toLowerCase().includes(search.toLowerCase());
    return mC&&mS;
  });
  return (
    <div style={{ background:C.lightGray, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:isMobile?"28px 20px":"40px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Yangiliklar"}]} navigate={navigate}/>
          <h1 style={{ color:C.white, fontSize:isMobile?24:"clamp(24px,4vw,38px)", fontWeight:800, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:6 }}>Yangiliklar va e'lonlar</h1>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14 }}>O'zbekiston Milliy universitetidagi so'nggi voqealar</p>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMobile?"20px 16px 100px":"32px 24px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 300px", gap:isMobile?20:28, alignItems:"start" }}>
          {/* Main */}
          <div>
            <div style={{ background:C.white, borderRadius:12, padding:"10px 14px", marginBottom:18, display:"flex", alignItems:"center", gap:10, boxShadow:`0 2px 10px rgba(13,26,99,0.07)`, border:`1px solid ${C.gray}` }}>
              <Ico name="search" size={17} color={C.light}/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Yangilik qidiring..." style={{ flex:1, border:"none", outline:"none", fontSize:14, fontFamily:"inherit", color:C.dark, background:"transparent" }}/>
            </div>
            {isMobile&&(
              <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:14, paddingBottom:4 }}>
                {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{ padding:"6px 13px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11, fontWeight:600, whiteSpace:"nowrap", fontFamily:"inherit", background:cat===c?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white, color:cat===c?C.white:C.mid, flexShrink:0 }}>{c}</button>)}
              </div>
            )}
            <p style={{ fontSize:13, color:C.light, marginBottom:14 }}>{filtered.length} ta natija</p>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
              {filtered.map((item,i)=>(
                <div key={item.id} onClick={()=>navigate("news-detail",{newsId:item.id})} style={{ background:C.white, borderRadius:12, overflow:"hidden", display:"flex", alignItems:"stretch", border:`1px solid ${C.gray}`, cursor:"pointer", transition:"all 0.22s ease", animation:`fadeUp 0.4s ${i*45}ms ease both` }}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 32px rgba(13,26,99,0.13)";e.currentTarget.style.transform="translateY(-3px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}
                >
                  <div style={{ width:5, background:item.accent, flexShrink:0 }}/>
                  <div style={{ padding:16, flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><Badge label={item.cat} color={item.accent}/><span style={{ color:C.light, fontSize:11 }}>{item.date}</span></div>
                    <h3 style={{ fontSize:14, fontWeight:700, color:C.dark, lineHeight:1.4, marginBottom:7, fontFamily:"'Playfair Display',Georgia,serif" }}>{item.title}</h3>
                    <p style={{ fontSize:12, color:C.mid, lineHeight:1.5, margin:0, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.desc}</p>
                    <div style={{ marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", gap:10, fontSize:11, color:C.light }}>
                        <span style={{ display:"flex", alignItems:"center", gap:4 }}><Ico name="user" size={11} color={C.light}/>{item.author}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:4 }}><Ico name="eye" size={11} color={C.light}/>{item.views}</span>
                      </div>
                      <Ico name="chevRight" size={16} color={item.accent}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Sidebar */}
          {!isMobile&&(
            <aside style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.8px" }}>Kategoriyalar</h3>
                {cats.map(c=>(
                  <div key={c} onClick={()=>setCat(c)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:3, background:cat===c?`${C.bright}10`:"transparent", transition:"all 0.15s" }}
                    onMouseEnter={e=>{if(cat!==c)e.currentTarget.style.background=C.lightGray;}}
                    onMouseLeave={e=>{if(cat!==c)e.currentTarget.style.background="transparent";}}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Ico name="tag" size={13} color={cat===c?C.bright:C.light}/>
                      <span style={{ fontSize:13, fontWeight:cat===c?700:500, color:cat===c?C.bright:C.mid }}>{c}</span>
                    </div>
                    <span style={{ fontSize:11, color:C.light, background:C.lightGray, padding:"2px 8px", borderRadius:10 }}>{c==="Barcha"?newsList.length:newsList.filter(n=>n.cat===c).length}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:C.white, borderRadius:14, padding:18, border:`1px solid ${C.gray}` }}>
                <h3 style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.8px", display:"flex", alignItems:"center", gap:8 }}>
                  <Ico name="trendUp" size={14} color={C.orange}/> Mashhur xabarlar
                </h3>
                {popular.map((item,i)=>(
                  <div key={item.id} onClick={()=>navigate("news-detail",{newsId:item.id})} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 0", borderBottom:i<3?`1px solid ${C.lightGray}`:"none", cursor:"pointer" }}>
                    <div style={{ width:34, height:34, borderRadius:8, background:`${item.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ico name={item.icon} size={16} color={item.accent}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:C.dark, lineHeight:1.4, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.title}</div>
                      <div style={{ fontSize:11, color:C.light, marginTop:3, display:"flex", alignItems:"center", gap:4 }}><Ico name="eye" size={10} color={C.light}/>{item.views} ko'rishlar</div>
                    </div>
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

export default NewsListPage;
