import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { scienceSections, scienceData } from "../data/science";

function IlmiyFaoliyatPage({navigate,params,isMobile}){
  const sec=params?.section||"kengash";
  const cur=scienceSections.find(s=>s.id===sec)||scienceSections[0];
  const data=scienceData[sec]||[];

  return(
    <div style={{background:C.lightGray,minHeight:"100vh"}}>
      {/* HERO */}
      <div style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.bright} 100%)`,padding:isMobile?"28px 20px":"40px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:320,height:320,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Faoliyat",page:"science"},{label:cur.label}]} navigate={navigate}/>
          <div style={{display:"flex",alignItems:"center",gap:16,marginTop:12}}>
            <div style={{width:isMobile?52:68,height:isMobile?52:68,borderRadius:16,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"2px solid rgba(255,255,255,0.2)"}}>
              <Ico name={cur.icon} size={isMobile?26:34} color={C.white} sw={1.4}/>
            </div>
            <div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:4}}>Ilmiy faoliyat</div>
              <h1 style={{color:C.white,fontSize:isMobile?"20px":"clamp(20px,3vw,32px)",fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2}}>{cur.label}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:isMobile?"20px 16px 80px":"32px 24px 60px",display:"grid",gridTemplateColumns:isMobile?"1fr":"240px 1fr",gap:24}}>
        {/* SIDEBAR */}
        {!isMobile&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{background:C.white,borderRadius:14,padding:14,border:`1px solid ${C.gray}`,position:"sticky",top:80}}>
              <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${C.lightGray}`}}>Bo'limlar</div>
              {scienceSections.map(s=>(
                <div key={s.id} onClick={()=>navigate("science",{section:s.id})}
                  style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sec===s.id?`${s.color}10`:"transparent",color:sec===s.id?s.color:C.mid,fontWeight:sec===s.id?700:500,fontSize:13,transition:"all 0.15s",marginBottom:2}}
                  onMouseEnter={e=>{if(sec!==s.id)e.currentTarget.style.background=C.lightGray;}}
                  onMouseLeave={e=>{if(sec!==s.id)e.currentTarget.style.background="transparent";}}>
                  <Ico name={s.icon} size={14} color={sec===s.id?s.color:C.light}/>
                  {s.label}
                  {sec===s.id&&<Ico name="chevRight" size={11} color={s.color} style={{marginLeft:"auto"}}/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div>
          {/* Mobile section picker */}
          {isMobile&&(
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12,marginBottom:16}}>
              {scienceSections.map(s=>(
                <button key={s.id} onClick={()=>navigate("science",{section:s.id})}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:20,border:`1px solid ${sec===s.id?s.color:C.gray}`,background:sec===s.id?s.color:"white",color:sec===s.id?C.white:C.mid,fontSize:11,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",flexShrink:0}}>
                  <Ico name={s.icon} size={11} color={sec===s.id?C.white:C.mid}/>{s.label}
                </button>
              ))}
            </div>
          )}

          {/* KENGASHLAR */}
          {sec==="kengash"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="users" size={20} color={C.bright}/> Ilmiy kengashlar
                <Badge label={`${data.length} ta kengash`} color={C.bright}/>
              </h2>
              {data.map((k,i)=>(
                <div key={k.id} style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`,marginBottom:14,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
                    <div style={{flex:1}}>
                      <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:6}}>{k.name}</h3>
                      <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:10}}>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="user" size={12} color={C.light}/>{k.chair}</span>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="users" size={12} color={C.light}/>{k.members} a'zo</span>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="calendar" size={12} color={C.light}/>Tashkil: {k.year}</span>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="mapPin" size={12} color={C.light}/>{k.room}</span>
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {k.specialties.map(sp=><span key={sp} style={{background:`${C.bright}12`,color:C.bright,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{sp}</span>)}
                      </div>
                    </div>
                    <div style={{background:`${C.bright}10`,borderRadius:10,padding:"10px 14px",textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:10,color:C.light,textTransform:"uppercase",letterSpacing:"0.5px"}}>Majlislar</div>
                      <div style={{fontSize:12,fontWeight:600,color:C.dark,marginTop:3}}>{k.meetings}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LOYIHALAR */}
          {sec==="loyihalar"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="layers" size={20} color={C.orange}/> Ilmiy loyihalar
              </h2>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
                {data.map((p,i)=>(
                  <div key={p.id} style={{background:C.white,borderRadius:14,padding:18,border:`1px solid ${C.gray}`,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                      <span style={{background:p.status==="Faol"?`${C.green}14`:`${C.light}14`,color:p.status==="Faol"?C.green:C.light,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{p.status}</span>
                      <span style={{fontSize:11,color:C.light}}>{p.start} – {p.end}</span>
                    </div>
                    <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:8,lineHeight:1.45}}>{p.name}</h3>
                    {[{ic:"user",v:p.pi},{ic:"tag",v:p.grant},{ic:"creditCard",v:p.amount},{ic:"globe",v:p.partner}].map(r=>(
                      <div key={r.v} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                        <Ico name={r.ic} size={12} color={C.light}/><span style={{fontSize:12,color:C.mid}}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAKTABLAR */}
          {sec==="maktablar"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="award" size={20} color={C.navy}/> Ilmiy maktablar
              </h2>
              {data.map((m,i)=>(
                <div key={m.id} style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`,marginBottom:14,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:16,flexWrap:isMobile?"wrap":"nowrap"}}>
                    <div style={{width:56,height:56,borderRadius:14,background:`${C.navy}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1.5px solid ${C.navy}20`}}>
                      <Ico name="award" size={26} color={C.navy} sw={1.4}/>
                    </div>
                    <div style={{flex:1}}>
                      <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:4}}>{m.name}</h3>
                      <div style={{fontSize:12,color:C.mid,marginBottom:8}}>Asoschisi: {m.founder} · Rahbar: {m.head}</div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
                        {[{l:"A'zo",v:m.members},{l:"PhD",v:m.phd},{l:"Maqola",v:m.publications}].map(s=>(
                          <div key={s.l} style={{background:C.lightGray,borderRadius:8,padding:"6px 8px",textAlign:"center"}}>
                            <div style={{fontSize:16,fontWeight:800,color:C.navy}}>{s.v}</div>
                            <div style={{fontSize:9,color:C.light,textTransform:"uppercase",letterSpacing:"0.4px"}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{fontSize:12,color:C.light,fontStyle:"italic"}}>{m.awards}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DOKTORANTURA */}
          {sec==="doktorantura"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="graduation" size={20} color={C.bright}/> Doktorantura
              </h2>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16,marginBottom:24}}>
                {[{v:"145",l:"Doktorantlar",ic:"users"},{v:"68",l:"Ilmiy rahbarlar",ic:"userCheck"},{v:"28",l:"Himoyalar (2024)",ic:"award"},{v:"12",l:"Ixtisosliklar",ic:"bookOpen"}].map(s=>(
                  <div key={s.l} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:44,height:44,borderRadius:11,background:`${C.bright}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Ico name={s.ic} size={20} color={C.bright}/>
                    </div>
                    <div>
                      <div style={{fontSize:24,fontWeight:800,color:C.bright,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1}}>{s.v}</div>
                      <div style={{fontSize:12,color:C.mid,marginTop:2}}>{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
              {data.map((d,i)=>(
                <div key={i} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:14}}>
                  <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                    <Ico name={i===0?"graduation":i===1?"award":"barChart"} size={15} color={C.bright}/>{d.name}
                  </h3>
                  {d.items.map((it,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                      <div style={{width:20,height:20,borderRadius:6,background:`${C.bright}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                        <Ico name="check" size={10} color={C.bright} sw={2.5}/>
                      </div>
                      <span style={{fontSize:13,color:C.mid,lineHeight:1.5}}>{it}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{background:`linear-gradient(135deg,${C.bright},${C.navy})`,borderRadius:14,padding:"20px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                <div>
                  <div style={{color:C.white,fontWeight:700,fontSize:15,marginBottom:4}}>Hujjat topshirish</div>
                  <div style={{color:"rgba(255,255,255,0.7)",fontSize:13}}>Har yilgi qabul: mart va sentyabr oylarida</div>
                </div>
                <Btn variant="orange" onClick={()=>navigate("admissions")} style={{padding:"10px 20px",fontSize:13}}>
                  <Ico name="clipboard" size={14} color={C.white}/> Qabul sahifasi
                </Btn>
              </div>
            </div>
          )}

          {/* AVTOREFERAT */}
          {sec==="avtoreferat"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="fileText" size={20} color={C.orange}/> Avtorefetatlar
              </h2>
              <div style={{background:C.white,borderRadius:14,overflow:"hidden",border:`1px solid ${C.gray}`}}>
                <div style={{background:`${C.orange}08`,padding:"12px 18px",borderBottom:`1px solid ${C.gray}`,display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr 1fr 1fr",gap:8}}>
                  {["Muallif / Mavzu","Sana","Tur","Soha"].map(h=><span key={h} style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"0.5px"}}>{h}</span>)}
                </div>
                {data.map((av,i)=>(
                  <div key={av.id} style={{padding:"14px 18px",borderBottom:i<data.length-1?`1px solid ${C.lightGray}`:"none",display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr 1fr 1fr",gap:8,alignItems:"center",animation:`fadeUp 0.3s ${i*40}ms ease both`}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:C.dark,marginBottom:2}}>{av.author}</div>
                      <div style={{fontSize:12,color:C.mid,lineHeight:1.4}}>{av.title}</div>
                    </div>
                    <div style={{fontSize:12,color:C.mid}}>{av.date}</div>
                    <Badge label={av.type} color={av.type==="DSc"?C.orange:C.bright}/>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:12,color:C.mid}}>{av.field}</span>
                      <a href={av.file} style={{display:"flex",alignItems:"center",gap:4,color:C.bright,fontSize:12,fontWeight:600,textDecoration:"none"}}>
                        <Ico name="fileText" size={12} color={C.bright}/>PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KONFERENSIYALAR */}
          {sec==="konferensiyalar"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="globe" size={20} color={C.navy}/> Ilmiy konferensiyalar
              </h2>
              {data.map((k,i)=>(
                <div key={k.id} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:14,display:"flex",alignItems:"flex-start",gap:16,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                  <div style={{background:k.reg==="Ochiq"?`${C.green}14`:k.reg==="Yakunlangan"?`${C.light}14`:`${C.orange}14`,borderRadius:10,padding:"10px 12px",textAlign:"center",flexShrink:0,minWidth:60}}>
                    <Ico name="calendar" size={18} color={k.reg==="Ochiq"?C.green:k.reg==="Yakunlangan"?C.light:C.orange}/>
                    <div style={{fontSize:10,fontWeight:700,color:k.reg==="Ochiq"?C.green:k.reg==="Yakunlangan"?C.light:C.orange,marginTop:4,whiteSpace:"nowrap"}}>{k.date}</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                      <Badge label={k.type} color={k.type==="Xalqaro"?C.orange:C.navy}/>
                      <span style={{background:k.reg==="Ochiq"?`${C.green}14`:k.reg==="Yakunlangan"?`${C.gray}`:`${C.orange}14`,color:k.reg==="Ochiq"?C.green:k.reg==="Yakunlangan"?C.light:C.orange,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{k.reg}</span>
                    </div>
                    <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6,lineHeight:1.45}}>{k.name}</h3>
                    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                      <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="mapPin" size={11} color={C.light}/>{k.place}</span>
                      <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="globe" size={11} color={C.light}/>{k.lang}</span>
                      {k.deadline!=="—"&&<span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="clock" size={11} color={C.light}/>Deadline: {k.deadline}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* JURNALLAR */}
          {sec==="jurnallar"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="newspaper" size={20} color={C.bright}/> Ilmiy jurnallar
              </h2>
              {data.map((j,i)=>(
                <div key={j.id} style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`,marginBottom:14,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                        {j.wos&&<span style={{background:`${C.navy}12`,color:C.navy,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>WoS</span>}
                        {j.scopus&&<span style={{background:`${C.orange}12`,color:C.orange,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>Scopus</span>}
                        {!j.wos&&!j.scopus&&<span style={{background:`${C.light}14`,color:C.light,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>Mahalliy</span>}
                      </div>
                      <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:8}}>{j.name}</h3>
                      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="tag" size={11} color={C.light}/>ISSN: {j.issn}</span>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="calendar" size={11} color={C.light}/>{j.freq}</span>
                        <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:5}}><Ico name="user" size={11} color={C.light}/>Muharrir: {j.editor}</span>
                      </div>
                    </div>
                    <a href={j.link} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:6,background:`${C.bright}10`,border:`1px solid ${C.bright}30`,color:C.bright,padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:600,textDecoration:"none",flexShrink:0}}>
                      <Ico name="externalLink" size={12} color={C.bright}/>Ko'rish
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INNOVATSIYA */}
          {sec==="innovatsiya"&&(
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <Ico name="cpu" size={20} color={C.orange}/> Ilmiy ishlar va innovatsiyalar
              </h2>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
                {data.map((inn,i)=>(
                  <div key={inn.id} style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,background:`${C.orange}12`,color:C.orange,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,marginBottom:10}}>{inn.type}</div>
                    <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:8,lineHeight:1.45}}>{inn.name}</h3>
                    <p style={{fontSize:13,color:C.mid,lineHeight:1.6,marginBottom:10}}>{inn.desc}</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:12,color:C.light,display:"flex",alignItems:"center",gap:5}}><Ico name="calendar" size={11} color={C.light}/>{inn.year} · {inn.team.split(" ")[0]+" "+inn.team.split(" ")[1]}</span>
                      <a href={inn.link} style={{fontSize:12,color:C.bright,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}><Ico name="externalLink" size={11} color={C.bright}/>Link</a>
                    </div>
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


export default IlmiyFaoliyatPage;
