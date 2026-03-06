import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";


function TalabalargaHubPage({navigate,isMobile}){
  const sections=[
    {id:"mobillik",   icon:"globe",      label:"Akademik mobillik",       desc:"Xorijda o'qish imkoniyatlari",color:C.bright},
    {id:"baholash",   icon:"barChart",   label:"Baholash tizimi",          desc:"Ball-reyting tizimi",         color:C.orange},
    {id:"gpa",        icon:"trendUp",    label:"GPA va Kredit talablari",  desc:"Kredit standartlari",         color:C.navy},
    {id:"jadval",     icon:"calendar",   label:"Dars jadvali",             desc:"Joriy semestr jadvali",       color:C.bright},
    {id:"stipendiya", icon:"award",      label:"Stipendiyalar",            desc:"Turlari va miqdorlari",       color:C.orange},
    {id:"yada",       icon:"clock",      label:"YaDA o'tkazish jadvali",   desc:"Yakuniy amaliy dars attestatsiya",color:C.navy},
    {id:"iqtidorli",  icon:"star",       label:"Iqtidorli talabalar",      desc:"Rag'batlantirish dasturi",    color:C.bright},
    {id:"yakuniy",    icon:"clipboard",  label:"Yakuniy nazorat",          desc:"Imtihon tartibi va savollari",color:C.orange},
    {id:"qollanma",   icon:"bookOpen",   label:"O'quv qo'llanmalar",       desc:"Fanlar bo'yicha qo'llanmalar",color:C.navy},
  ];

  const bachelor=[
    {icon:"compass",label:"Yo'riqnoma",page:"student-info",params:{section:"baholash"}},
    {icon:"barChart",label:"Baholash tizimi",page:"student-info",params:{section:"baholash"}},
    {icon:"trendUp",label:"GPA va kredit",page:"student-info",params:{section:"gpa"}},
    {icon:"calendar",label:"Dars jadvali",page:"student-info",params:{section:"jadval"}},
    {icon:"award",label:"Stipendiyalar",page:"student-info",params:{section:"stipendiya"}},
    {icon:"clock",label:"YaDA jadvali",page:"student-info",params:{section:"yada"}},
    {icon:"star",label:"Iqtidorli talabalar",page:"student-info",params:{section:"iqtidorli"}},
    {icon:"clipboard",label:"Yakuniy nazorat",page:"student-info",params:{section:"yakuniy"}},
    {icon:"bookOpen",label:"Fan qo'llanmalari",page:"student-info",params:{section:"qollanma"}},
  ];

  return(
    <div style={{background:C.lightGray,minHeight:"100vh"}}>
      {/* HERO */}
      <div style={{background:`linear-gradient(135deg,${C.bright} 0%,${C.navy} 100%)`,padding:isMobile?"36px 20px 48px":"52px 24px 64px",position:"relative",overflow:"hidden",textAlign:"center"}}>
        {[0,1].map(i=><div key={i} style={{position:"absolute",top:-40-i*60,right:-40-i*60,width:300+i*140,height:300+i*140,borderRadius:"50%",border:`1px solid rgba(255,255,255,${0.06-i*0.02})`}}/>)}
        <div style={{maxWidth:900,margin:"0 auto",position:"relative"}}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Talabalarga"}]} navigate={navigate}/>
          <div style={{width:isMobile?64:84,height:isMobile?64:84,borderRadius:"50%",background:"rgba(255,255,255,0.14)",display:"flex",alignItems:"center",justifyContent:"center",margin:"16px auto 16px",border:"3px solid rgba(255,255,255,0.25)"}}>
            <Ico name="graduation" size={isMobile?32:42} color={C.white} sw={1.4}/>
          </div>
          <h1 style={{color:C.white,fontSize:isMobile?"24px":"clamp(24px,4vw,44px)",fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2,marginBottom:10}}>Talabalarga</h1>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:isMobile?14:16,lineHeight:1.7,maxWidth:600,margin:"0 auto 24px"}}>O'qish jarayoniga oid barcha muhim ma'lumotlar, jadvallar, stipendiyalar va qo'llanmalar shu yerda.</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn variant="orange" onClick={()=>navigate("portal")}><Ico name="graduation" size={15} color={C.white}/> Talaba portali</Btn>
            <Btn variant="ghost" onClick={()=>navigate("student-info",{section:"mobillik"})}><Ico name="globe" size={15} color={C.white}/> Akademik mobillik</Btn>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div style={{maxWidth:1000,margin:"-20px auto 0",padding:"0 16px",position:"relative",zIndex:10}}>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:10}}>
          {[{v:"34000",l:"Talaba",ic:"users"},{v:"56",l:"Yo'nalish",ic:"bookOpen"},{v:"1230",l:"O'qituvchi",ic:"award"},{v:"15",l:"Hamkorlik",ic:"globe"}].map(s=>(
            <div key={s.l} style={{background:C.white,borderRadius:12,padding:"14px",textAlign:"center",boxShadow:"0 4px 20px rgba(13,26,99,0.1)",border:`1px solid ${C.gray}`}}>
              <Ico name={s.ic} size={18} color={C.bright} style={{marginBottom:6}}/>
              <div style={{fontSize:22,fontWeight:800,color:C.bright,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:10,color:C.light,marginTop:3,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTIONS GRID */}
      <div style={{maxWidth:1000,margin:"0 auto",padding:isMobile?"28px 16px 80px":"36px 24px 60px"}}>
        <h2 style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="bookOpen" size={18} color={C.bright}/> Bakalavriat
        </h2>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(3,1fr)":"repeat(3,1fr)",gap:12,marginBottom:32}}>
          {bachelor.map((item,i)=>(
            <div key={item.label} onClick={()=>navigate(item.page,item.params)}
              style={{background:C.white,borderRadius:14,padding:isMobile?"12px 10px":"16px",textAlign:"center",cursor:"pointer",border:`1px solid ${C.gray}`,transition:"all 0.22s",animation:`fadeUp 0.4s ${i*40}ms ease both`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.bright;e.currentTarget.style.boxShadow=`0 8px 24px ${C.bright}18`;e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{width:isMobile?36:44,height:isMobile?36:44,borderRadius:12,background:`${C.bright}12`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",border:`1.5px solid ${C.bright}20`}}>
                <Ico name={item.icon} size={isMobile?18:22} color={C.bright}/>
              </div>
              <div style={{fontSize:isMobile?11:13,fontWeight:700,color:C.dark,lineHeight:1.3}}>{item.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="graduation" size={18} color={C.orange}/> Magistratura
        </h2>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(3,1fr)":"repeat(3,1fr)",gap:12,marginBottom:32}}>
          {[
            {icon:"award",label:"Stipendiyalar",page:"student-info",params:{section:"stipendiya"}},
            {icon:"scroll",label:"Dissertatsiya himoyasi",page:"student-info",params:{section:"yakuniy"}},
            {icon:"fileText",label:"Dissertatsiya mavzulari",page:"student-info",params:{section:"qollanma"}},
            {icon:"clock",label:"YaDA jadvali",page:"student-info",params:{section:"yada"}},
            {icon:"clipboard",label:"Yakuniy nazorat savollari",page:"student-info",params:{section:"yakuniy"}},
            {icon:"bookOpen",label:"Fan qo'llanmasi",page:"student-info",params:{section:"qollanma"}},
          ].map((item,i)=>(
            <div key={item.label} onClick={()=>navigate(item.page,item.params)}
              style={{background:C.white,borderRadius:14,padding:isMobile?"12px 10px":"16px",textAlign:"center",cursor:"pointer",border:`1px solid ${C.gray}`,transition:"all 0.22s",animation:`fadeUp 0.4s ${i*40}ms ease both`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.orange;e.currentTarget.style.boxShadow=`0 8px 24px ${C.orange}18`;e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{width:isMobile?36:44,height:isMobile?36:44,borderRadius:12,background:`${C.orange}12`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",border:`1.5px solid ${C.orange}20`}}>
                <Ico name={item.icon} size={isMobile?18:22} color={C.orange}/>
              </div>
              <div style={{fontSize:isMobile?11:13,fontWeight:700,color:C.dark,lineHeight:1.3}}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Muhim havolalar */}
        <h2 style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="globe" size={18} color={C.navy}/> Muhim tizimlarga kirish
        </h2>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:10}}>
          {[
            {icon:"graduation",label:"HEMIS Talaba",href:"https://hstudent.nuu.uz",col:C.bright},
            {icon:"book",label:"Kutubxona",href:"https://library.nuu.uz",col:C.orange},
            {icon:"layers",label:"Unilibrary",href:"https://unilibrary.uz",col:C.navy},
            {icon:"globe",label:"NUU portali",href:"https://my.nuu.uz",col:C.bright},
          ].map(lk=>(
            <a key={lk.label} href={lk.href} target="_blank" rel="noreferrer"
              style={{background:C.white,borderRadius:12,padding:"14px",textAlign:"center",border:`1px solid ${C.gray}`,textDecoration:"none",transition:"all 0.2s",display:"block"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=lk.col;e.currentTarget.style.boxShadow=`0 6px 18px ${lk.col}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="none";}}>
              <div style={{width:38,height:38,borderRadius:10,background:`${lk.col}12`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>
                <Ico name={lk.icon} size={18} color={lk.col}/>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:C.dark}}>{lk.label}</div>
              <Ico name="externalLink" size={10} color={C.light} style={{marginTop:4}}/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


export default TalabalargaHubPage;
