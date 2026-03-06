import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { financeSections, financeData } from "../data/finance";

function MoliyaPage({navigate,params,isMobile}){
  const sec=params?.section||"tolov";
  const cur=financeSections.find(s=>s.id===sec)||financeSections[0];
  const data=financeData[sec]||[];

  return(
    <div style={{background:C.lightGray,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(135deg,${C.navy} 0%,#1e3a8a 100%)`,padding:isMobile?"28px 20px":"40px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:240,height:240,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Moliyaviy faoliyat",page:"finance"},{label:cur.label}]} navigate={navigate}/>
          <div style={{display:"flex",alignItems:"center",gap:16,marginTop:12}}>
            <div style={{width:isMobile?52:68,height:isMobile?52:68,borderRadius:16,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"2px solid rgba(255,255,255,0.2)"}}>
              <Ico name={cur.icon} size={isMobile?26:34} color={C.white} sw={1.4}/>
            </div>
            <div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:4}}>Moliyaviy faoliyat · Shaffoflik</div>
              <h1 style={{color:C.white,fontSize:isMobile?"20px":"clamp(20px,3vw,32px)",fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2}}>{cur.label}</h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:isMobile?"20px 16px 80px":"32px 24px 60px",display:"grid",gridTemplateColumns:isMobile?"1fr":"200px 1fr",gap:24}}>
        {!isMobile&&(
          <div style={{background:C.white,borderRadius:14,padding:14,border:`1px solid ${C.gray}`,position:"sticky",top:80,height:"fit-content"}}>
            <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${C.lightGray}`}}>Bo'limlar</div>
            {financeSections.map(s=>(
              <div key={s.id} onClick={()=>navigate("finance",{section:s.id})}
                style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sec===s.id?`${s.color}10`:"transparent",color:sec===s.id?s.color:C.mid,fontWeight:sec===s.id?700:500,fontSize:12,transition:"all 0.15s",marginBottom:2}}
                onMouseEnter={e=>{if(sec!==s.id)e.currentTarget.style.background=C.lightGray;}}
                onMouseLeave={e=>{if(sec!==s.id)e.currentTarget.style.background="transparent";}}>
                <Ico name={s.icon} size={13} color={sec===s.id?s.color:C.light}/>{s.label}
              </div>
            ))}
          </div>
        )}

        <div>
          {isMobile&&(
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12,marginBottom:16}}>
              {financeSections.map(s=>(
                <button key={s.id} onClick={()=>navigate("finance",{section:s.id})}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:20,border:`1px solid ${sec===s.id?s.color:C.gray}`,background:sec===s.id?s.color:"white",color:sec===s.id?C.white:C.mid,fontSize:11,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",flexShrink:0}}>
                  <Ico name={s.icon} size={11} color={sec===s.id?C.white:C.mid}/>{s.label}
                </button>
              ))}
            </div>
          )}

          {/* TO'LOV NARXLARI */}
          {sec==="tolov"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:6,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="creditCard" size={20} color={C.bright}/> Kontrakt to'lov narxlari (2024-2025)
              </h2>
              <p style={{fontSize:13,color:C.light,marginBottom:18}}>Narxlar yillik to'lov miqdori bo'lib, so'mda ko'rsatilgan.</p>
              <div style={{background:C.white,borderRadius:14,overflow:"hidden",border:`1px solid ${C.gray}`}}>
                <div style={{background:`${C.bright}08`,padding:"12px 18px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:8}}>
                  {["Fakultet","Bakalavriat","Magistratura","Doktorantura"].map(h=><span key={h} style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"0.4px"}}>{h}</span>)}
                </div>
                {data.map((r,i)=>(
                  <div key={r.faculty} style={{padding:"12px 18px",borderBottom:i<data.length-1?`1px solid ${C.lightGray}`:"none",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:8,alignItems:"center",background:i%2===0?"transparent":C.lightGray+"80"}}>
                    <span style={{fontSize:13,fontWeight:600,color:C.dark}}>{r.faculty}</span>
                    <span style={{fontSize:13,fontWeight:700,color:C.bright}}>{(r.bachelor/1000000).toFixed(1)}M</span>
                    <span style={{fontSize:13,fontWeight:700,color:C.orange}}>{(r.master/1000000).toFixed(1)}M</span>
                    <span style={{fontSize:13,fontWeight:700,color:C.navy}}>{r.phd?(r.phd/1000000).toFixed(1)+"M":"—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* XARAJATLAR */}
          {sec==="xarajat"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="barChart" size={20} color={C.orange}/> Xarajatlar smetasi — 2024 yil
              </h2>
              <div style={{background:C.white,borderRadius:14,padding:"20px",border:`1px solid ${C.gray}`,marginBottom:16}}>
                <div style={{fontSize:13,color:C.mid,marginBottom:4}}>Umumiy byudjet (2024)</div>
                <div style={{fontSize:28,fontWeight:800,color:C.orange,fontFamily:"'Playfair Display',Georgia,serif"}}>297,8 mlrd so'm</div>
              </div>
              {data.map((x,i)=>(
                <div key={x.cat} style={{background:C.white,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.gray}`,marginBottom:10,animation:`fadeUp 0.3s ${i*40}ms ease both`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontSize:13,fontWeight:600,color:C.dark}}>{x.cat}</span>
                    <span style={{fontSize:13,fontWeight:700,color:C.orange}}>{(x.amount/1000000000).toFixed(1)} mlrd · {x.pct}%</span>
                  </div>
                  <div style={{height:8,background:C.lightGray,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${x.pct}%`,background:`linear-gradient(90deg,${C.bright},${C.orange})`,borderRadius:4,transition:"width 0.8s ease"}}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SHARTNOMALAR */}
          {sec==="shartnoma"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="fileText" size={20} color={C.navy}/> Tuzilgan shartnomalar
              </h2>
              {data.map((sh,i)=>(
                <div key={sh.id} style={{background:C.white,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.gray}`,marginBottom:12,animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:8}}>
                    <span style={{fontSize:11,fontWeight:700,color:C.light,fontFamily:"monospace"}}>{sh.id}</span>
                    <Badge label={sh.status} color={sh.status==="Bajarilmoqda"?C.green:sh.status==="Yakunlangan"?C.bright:C.orange}/>
                  </div>
                  <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6}}>{sh.name}</h3>
                  <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="building2" size={11} color={C.light}/>{sh.contractor}</span>
                    <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="creditCard" size={11} color={C.light}/>{(sh.amount/1000000000).toFixed(2)} mlrd so'm</span>
                    <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="calendar" size={11} color={C.light}/>{sh.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* XARID KOMISSIYASI */}
          {sec==="xarid"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="users" size={20} color={C.bright}/> Xarid komissiyasi a'zolari
              </h2>
              {data.map((m,i)=>(
                <div key={m.name} style={{background:C.white,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.gray}`,marginBottom:12,display:"flex",alignItems:"center",gap:14,animation:`fadeUp 0.3s ${i*60}ms ease both`}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:`${C.bright}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Ico name="user" size={22} color={C.bright}/>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:C.dark}}>{m.name}</div>
                    <div style={{fontSize:12,color:C.orange,fontWeight:600}}>{m.role}</div>
                    <div style={{fontSize:12,color:C.light}}>{m.degree}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TRANSPORT */}
          {sec==="transport"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="compass" size={20} color={C.orange}/> Avtomototransport vositalari
              </h2>
              <div style={{background:C.white,borderRadius:14,overflow:"hidden",border:`1px solid ${C.gray}`}}>
                <div style={{background:`${C.orange}08`,padding:"12px 18px",display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"1fr 1fr 1fr 1fr 1fr",gap:8}}>
                  {["Model","Davlat raqami","Yil","Tur","Foydalanish"].map(h=><span key={h} style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"0.4px"}}>{h}</span>)}
                </div>
                {data.map((t,i)=>(
                  <div key={t.plate} style={{padding:"12px 18px",borderBottom:i<data.length-1?`1px solid ${C.lightGray}`:"none",display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"1fr 1fr 1fr 1fr 1fr",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:13,fontWeight:600,color:C.dark}}>{t.model}</span>
                    <span style={{fontSize:12,fontFamily:"monospace",color:C.mid}}>{t.plate}</span>
                    <span style={{fontSize:12,color:C.mid}}>{t.year}</span>
                    <span style={{fontSize:12,color:C.mid}}>{t.type}</span>
                    <span style={{fontSize:12,color:C.mid}}>{t.use}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default MoliyaPage;
