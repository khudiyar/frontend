import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { studentInfoSections } from "../data/students";

function StudentInfoPage({navigate,params,isMobile}){
  const sec=params?.section||"baholash";
  const cur=studentInfoSections.find(s=>s.id===sec)||studentInfoSections[0];

  const renderContent=()=>{
    if(sec==="baholash") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="barChart" size={20} color={C.orange}/> Ball-Reyting Baholash Tizimi
        </h2>
        <p style={{fontSize:14,color:C.mid,lineHeight:1.8,marginBottom:20,borderLeft:`4px solid ${C.orange}`,paddingLeft:16}}>O'zMUda 100 ballik reyting tizimi qo'llaniladi. Semestr davomida to'plangan balllar asosida yakuniy baho qo'yiladi.</p>
        <div style={{background:C.white,borderRadius:14,overflow:"hidden",border:`1px solid ${C.gray}`,marginBottom:20}}>
          <div style={{background:`${C.orange}08`,padding:"12px 18px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
            {["Harfiy baho","Ball oralig'i","GPA ball","Ta'rif"].map(h=><span key={h} style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"0.4px"}}>{h}</span>)}
          </div>
          {[
            {l:"A",range:"90-100",gpa:"4.0",desc:"A'lo"},
            {l:"A-",range:"85-89",gpa:"3.7",desc:"A'lo (minus)"},
            {l:"B+",range:"80-84",gpa:"3.3",desc:"Yaxshi (plus)"},
            {l:"B",range:"75-79",gpa:"3.0",desc:"Yaxshi"},
            {l:"B-",range:"70-74",gpa:"2.7",desc:"Yaxshi (minus)"},
            {l:"C+",range:"65-69",gpa:"2.3",desc:"Qoniqarli (plus)"},
            {l:"C",range:"60-64",gpa:"2.0",desc:"Qoniqarli"},
            {l:"D",range:"55-59",gpa:"1.0",desc:"Yetarli emas"},
            {l:"F",range:"0-54",gpa:"0.0",desc:"Qoniqarsiz"},
          ].map((r,i)=>(
            <div key={r.l} style={{padding:"10px 18px",borderBottom:i<8?`1px solid ${C.lightGray}`:"none",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,alignItems:"center",background:i%2===0?"transparent":C.lightGray+"80"}}>
              <span style={{fontSize:15,fontWeight:800,color:r.gpa==="4.0"||r.gpa==="3.7"?C.green:r.gpa==="0.0"?C.red:C.orange}}>{r.l}</span>
              <span style={{fontSize:13,color:C.mid}}>{r.range}</span>
              <span style={{fontSize:13,fontWeight:700,color:C.dark}}>{r.gpa}</span>
              <span style={{fontSize:12,color:C.mid}}>{r.desc}</span>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12}}>
          {[{title:"Joriy nazorat taqsimoti",items:["1-oraliq nazorat: 30 ball","2-oraliq nazorat: 30 ball","Yakuniy nazorat: 40 ball"]},{title:"Qayta topshirish",items:["Shart: kamida 55 ball to'plash","Qayta topshirish huquqi: 2 mahal","3-urinish: dekan ruxsati kerak"]}].map((box,i)=>(
            <div key={i} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.gray}`}}>
              <h4 style={{fontSize:13,fontWeight:700,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Ico name="info" size={13} color={C.bright}/>{box.title}</h4>
              {box.items.map((it,j)=>(
                <div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
                  <div style={{width:18,height:18,borderRadius:5,background:`${C.bright}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    <Ico name="check" size={9} color={C.bright} sw={2.5}/>
                  </div>
                  <span style={{fontSize:13,color:C.mid}}>{it}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );

    if(sec==="gpa") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="trendUp" size={20} color={C.navy}/> GPA va Kredit Talablari
        </h2>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:12,marginBottom:20}}>
          {[{v:"2.0",l:"Minimal GPA",desc:"Shu balldan past bo'lsa akademik ogohlantirish"},{v:"3.0",l:"Stipendiya GPA",desc:"Davlat stipendiyasi uchun minimal GPA"},{v:"240",l:"Bakalavriat kredit",desc:"4 yillik dastur uchun minimal kredit soni"}].map(s=>(
            <div key={s.l} style={{background:C.white,borderRadius:12,padding:"16px",border:`1px solid ${C.gray}`,textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,color:C.navy,fontFamily:"'Playfair Display',Georgia,serif"}}>{s.v}</div>
              <div style={{fontSize:13,fontWeight:700,color:C.dark,margin:"6px 0 4px"}}>{s.l}</div>
              <div style={{fontSize:12,color:C.light}}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`,marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:12}}>GPA hisoblash formulasi</h3>
          <div style={{background:`${C.navy}08`,borderRadius:10,padding:"14px",marginBottom:12,fontFamily:"monospace",fontSize:13,color:C.dark,lineHeight:1.8}}>
            GPA = Σ (Baho × Kredit) ÷ Jami kredit soni
          </div>
          <p style={{fontSize:13,color:C.mid,lineHeight:1.7}}>Misol: 4 kreditli fan A (4.0) va 3 kreditli fan B (3.0) olsangiz: GPA = (4×4.0 + 3×3.0) ÷ (4+3) = 25÷7 ≈ 3.57</p>
        </div>
        <div style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`}}>
          <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:12}}>Semestr bo'yicha kredit talablari</h3>
          {[["1-semestr","30 kredit"],["2-semestr","30 kredit"],["3-semestr","30 kredit"],["4-semestr","30 kredit"],["5-semestr","30 kredit"],["6-semestr","30 kredit"],["7-semestr","30 kredit"],["8-semestr","30 kredit + BMI"]].map(([sem,kredit],i)=>(
            <div key={sem} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<7?`1px solid ${C.lightGray}`:"none"}}>
              <span style={{fontSize:13,color:C.mid}}>{sem}</span>
              <span style={{fontSize:13,fontWeight:700,color:C.navy}}>{kredit}</span>
            </div>
          ))}
        </div>
      </div>
    );

    if(sec==="stipendiya") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="award" size={20} color={C.orange}/> Stipendiyalar
        </h2>
        {[
          {name:"Davlat stipendiyasi",amount:"680 000 so'm/oy",color:C.bright,cond:"GPA ≥ 3.0, deviant holati yo'q"},
          {name:"Prezident stipendiyasi",amount:"1 400 000 so'm/oy",color:C.orange,cond:"GPA ≥ 3.5, xalqaro maqola yoki olimpiada"},
          {name:"El-yurt umidi stipendiyasi",amount:"Xalqaro darajada",color:C.navy,cond:"Magistratura/doktorantura, xorijda o'qish"},
          {name:"Ulug'bek stipendiyasi",amount:"2 200 000 so'm/oy",color:"#9333EA",cond:"Fanning iste'dodli vakili, GPA ≥ 3.8"},
          {name:"Ijtimoiy stipendiya",amount:"420 000 so'm/oy",color:C.green,cond:"Kam ta'minlangan oila, I-II guruh nogironlar"},
        ].map((s,i)=>(
          <div key={s.name} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:12,display:"flex",alignItems:"flex-start",gap:14,animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
            <div style={{width:44,height:44,borderRadius:12,background:`${s.color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1.5px solid ${s.color}20`}}>
              <Ico name="award" size={20} color={s.color}/>
            </div>
            <div>
              <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:4}}>{s.name}</h3>
              <div style={{fontSize:16,fontWeight:800,color:s.color,marginBottom:6}}>{s.amount}</div>
              <div style={{fontSize:12,color:C.light}}>Shart: {s.cond}</div>
            </div>
          </div>
        ))}
      </div>
    );

    if(sec==="jadval") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="calendar" size={20} color={C.bright}/> Dars jadvali (2024-2025 bahor semestri)
        </h2>
        <div style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`,marginBottom:16}}>
          <p style={{fontSize:14,color:C.mid,lineHeight:1.7,marginBottom:14}}>Barcha fakultetlar bo'yicha to'liq dars jadvali HEMIS Student tizimi orqali mavjud. Quyida namunaviy jadval keltirilgan.</p>
          {[
            {day:"Dushanba",classes:["09:00 Matematika tahlil I (3-auditoriya)","11:00 Dasturlash asoslari lab. (12-lab)","14:00 Fizika (6-auditoriya)"]},
            {day:"Seshanba",classes:["08:30 Algebra (5-auditoriya)","11:00 Ingliz tili (11-auditoriya)","13:00 Chizmachilik (8-auditoriya)"]},
            {day:"Chorshanba",classes:["09:00 Matematika tahlil I (3-auditoriya)","12:00 Fizika laboratoriyasi (4-lab)"]},
            {day:"Payshanba",classes:["08:30 Algebra (5-auditoriya)","10:30 Ingliz tili (11-auditoriya)","13:00 Dasturlash (12-lab)"]},
            {day:"Juma",classes:["09:00 Sport (sport zali)","11:00 Erkin ish / konsultatsiya"]},
          ].map((d,i)=>(
            <div key={d.day} style={{marginBottom:12,borderBottom:i<4?`1px solid ${C.lightGray}`:"none",paddingBottom:12}}>
              <div style={{fontSize:12,fontWeight:700,color:C.bright,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>{d.day}</div>
              {d.classes.map((cl,j)=>(
                <div key={j} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:C.bright,flexShrink:0}}/>
                  <span style={{fontSize:13,color:C.mid}}>{cl}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Btn variant="primary" onClick={()=>{}} style={{width:"100%",padding:"11px"}}><Ico name="externalLink" size={14} color={C.white}/> HEMIS'da to'liq jadvalni ko'rish</Btn>
      </div>
    );

    if(sec==="yada") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="clock" size={20} color={C.navy}/> YaDA — Yakuniy Amaliy Dars Attestatsiyasi
        </h2>
        <div style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:16,borderLeft:`4px solid ${C.navy}`}}>
          <p style={{fontSize:14,color:C.mid,lineHeight:1.8}}>YaDA — semestr yakunida barcha fanlar bo'yicha o'tkaziladigan nazorat mashg'ulotlari. YaDAda to'plangan ball Joriy nazorat balliga qo'shiladi.</p>
        </div>
        {[["2025-yil bahor YaDA jadvali",[
          {fan:"Matematika tahlil I",sana:"2025-01-20",vaqt:"09:00",xona:"3-auditoriya",tur:"Yozma"},
          {fan:"Algoritm nazariyasi",sana:"2025-01-22",vaqt:"11:00",xona:"12-lab",tur:"Amaliy"},
          {fan:"Fizika",sana:"2025-01-24",vaqt:"09:00",xona:"6-auditoriya",tur:"Yozma"},
          {fan:"Ingliz tili",sana:"2025-01-25",vaqt:"14:00",xona:"11-auditoriya",tur:"Og'zaki"},
        ]]].map(([title,rows])=>(
          <div key={title} style={{background:C.white,borderRadius:14,overflow:"hidden",border:`1px solid ${C.gray}`}}>
            <div style={{background:`${C.navy}08`,padding:"12px 18px",borderBottom:`1px solid ${C.gray}`}}>
              <div style={{fontSize:13,fontWeight:700,color:C.dark}}>{title}</div>
            </div>
            {rows.map((r,i)=>(
              <div key={r.fan} style={{padding:"12px 18px",borderBottom:i<rows.length-1?`1px solid ${C.lightGray}`:"none",display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr 1fr 1fr 1fr",gap:8,alignItems:"center"}}>
                <span style={{fontSize:13,fontWeight:600,color:C.dark}}>{r.fan}</span>
                <span style={{fontSize:12,color:C.mid}}>{r.sana}</span>
                <span style={{fontSize:12,color:C.mid}}>{r.vaqt}</span>
                <span style={{fontSize:12,color:C.mid}}>{r.xona}</span>
                <Badge label={r.tur} color={r.tur==="Yozma"?C.bright:r.tur==="Amaliy"?C.orange:C.navy}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    );

    if(sec==="iqtidorli") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="star" size={20} color={C.bright}/> Iqtidorli Talabalar Dasturi
        </h2>
        {[
          {name:"Prezident stipendianti nomzodlari",crit:"GPA 3.5+, xalqaro musobaqa yoki maqola",count:45,benefits:"Moddiy rag'batlantirish, xorij safarlari, ilmiy rahbar"},
          {name:"Ulug'bek stipendianti",crit:"GPA 3.8+, 2+ xalqaro maqola, patent",count:12,benefits:"Oylik 2.2 mln so'm, maxsus laboratoriyaga kirish"},
          {name:"O'qituvchi yordamchisi (TA)",crit:"GPA 3.2+, o'qituvchi tavsiyasi",count:68,benefits:"Moddiy to'lov, ilmiy staj, kafedraga kirish"},
          {name:"Fan olimpiadachilari",crit:"Respublika/xalqaro olimpiada g'olibi",count:156,benefits:"Naqd mukofot, maxsus yordam, abituriyentlarga imtiyoz"},
        ].map((p,i)=>(
          <div key={p.name} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:14,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6}}>{p.name}</h3>
                <p style={{fontSize:13,color:C.mid,marginBottom:8}}>Mezon: {p.crit}</p>
                <p style={{fontSize:13,color:C.green,fontWeight:600}}>Imtiyozlar: {p.benefits}</p>
              </div>
              <div style={{background:`${C.bright}10`,borderRadius:10,padding:"10px 14px",textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:22,fontWeight:800,color:C.bright,fontFamily:"'Playfair Display',Georgia,serif"}}>{p.count}</div>
                <div style={{fontSize:10,color:C.light,textTransform:"uppercase",letterSpacing:"0.5px"}}>talaba</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    if(sec==="yakuniy") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="clipboard" size={20} color={C.orange}/> Yakuniy Nazorat
        </h2>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12,marginBottom:20}}>
          {[{title:"Imtihon tartibi",items:["Imtihon paytida hujjat ko'rsatiladi","Ruxsatsiz material ishlatish taqiqlanadi","Vaqt: 90 daqiqa (yozma), 15 daqiqa tayyorlik","Natijalar 3 ish kuni ichida e'lon qilinadi"]},{title:"Apellyatsiya",items:["Baho e'lon qilingan kundan 3 kun ichida","Dekan kotibligi orqali ariza topshiriladi","Ko'rib chiqish muddati: 5 ish kuni","Apellyatsiya komissiyasi 3 nafar"]}].map((box,i)=>(
            <div key={i} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.gray}`}}>
              <h4 style={{fontSize:13,fontWeight:700,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Ico name="info" size={13} color={C.orange}/>{box.title}</h4>
              {box.items.map((it,j)=>(
                <div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
                  <div style={{width:18,height:18,borderRadius:5,background:`${C.orange}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    <Ico name="check" size={9} color={C.orange} sw={2.5}/>
                  </div>
                  <span style={{fontSize:13,color:C.mid}}>{it}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{background:C.white,borderRadius:14,padding:"18px 20px",border:`1px solid ${C.gray}`}}>
          <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:12}}>2024-2025 Bahor sessiyasi jadvali</h3>
          {[{fan:"Matematika tahlil II",sana:"2025-06-03",vaqt:"09:00"},{fan:"Fizika II",sana:"2025-06-05",vaqt:"09:00"},{fan:"Algoritm nazariyasi",sana:"2025-06-07",vaqt:"11:00"},{fan:"Ingliz tili",sana:"2025-06-09",vaqt:"14:00"},{fan:"Dasturlash asoslari",sana:"2025-06-11",vaqt:"09:00"}].map((r,i)=>(
            <div key={r.fan} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<4?`1px solid ${C.lightGray}`:"none",flexWrap:"wrap",gap:8}}>
              <span style={{fontSize:13,fontWeight:600,color:C.dark}}>{r.fan}</span>
              <div style={{display:"flex",gap:12}}>
                <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:4}}><Ico name="calendar" size={11} color={C.light}/>{r.sana}</span>
                <span style={{fontSize:12,color:C.mid,display:"flex",alignItems:"center",gap:4}}><Ico name="clock" size={11} color={C.light}/>{r.vaqt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if(sec==="qollanma") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="bookOpen" size={20} color={C.navy}/> O'quv Qo'llanmalar
        </h2>
        {[
          {faculty:"Matematika",books:["Algebra I — Prof. A.Yusupov (2023)","Matematik tahlil I,II — Prof. B.Rahimov (2022)","Differensial tenglamalar — Dots. N.Yoqubova (2023)"]},
          {faculty:"Amaliy matematika va IT",books:["Algoritmlar va ma'lumotlar tuzilmasi — Dots. J.Tursunov (2024)","Dasturlash asoslari (Python) — Prof. N.Xoliqova (2023)","Sun'iy intellekt asoslari — Prof. N.Xoliqova (2024)"]},
          {faculty:"Fizika",books:["Umumiy fizika kursi I,II — Prof. S.Yuldashev (2022)","Kvant mexanikasi — Prof. S.Yuldashev (2023)"]},
        ].map((f,i)=>(
          <div key={f.faculty} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:14}}>
            <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
              <Ico name="university" size={14} color={C.navy}/>{f.faculty}
            </h3>
            {f.books.map((b,j)=>(
              <div key={j} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:j<f.books.length-1?`1px solid ${C.lightGray}`:"none"}}>
                <div style={{width:28,height:28,borderRadius:8,background:`${C.navy}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ico name="book" size={13} color={C.navy}/>
                </div>
                <span style={{fontSize:13,color:C.mid,flex:1}}>{b}</span>
                <a href="#" style={{fontSize:11,color:C.bright,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                  <Ico name="fileText" size={11} color={C.bright}/>PDF
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    );

    if(sec==="mobillik") return(
      <div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <Ico name="globe" size={20} color={C.bright}/> Akademik Mobillik Dasturlari
        </h2>
        {[
          {name:"Erasmus+ KA1",countries:"Germaniya, Fransiya, Polsha, Italiya",duration:"1 semestr yoki 1 yil",grant:"To'liq grant — yashash, uchish, sug'urta",cond:"GPA 3.0+, B2 ingliz yoki nemis/fransuz"},
          {name:"El-yurt umidi",countries:"USA, UK, Germaniya, Yaponiya, Janubiy Koreya",duration:"1-2 yil (Magistratura/PhD)",grant:"Davlat granti — to'liq moliyalashtiriladi",cond:"GPA 3.5+, IELTS 6.5+ yoki ekvivalent"},
          {name:"Ikki tomonlama ta'lim",countries:"MGU, KAIST, Nagoya Universiteti",duration:"1 semestr yoki 1 yil almashinuv",grant:"Qisman grant yoki o'z mablag'i",cond:"GPA 3.2+, fakultet dekani tavsiyasi"},
          {name:"Qisqa muddatli stajlar",countries:"Germaniya, USA, Xitoy, Turkiya",duration:"2-8 hafta",grant:"Qisman qoplanishi mumkin",cond:"Magistr/PhD talabasi, ilmiy rahbar tavsiyasi"},
        ].map((p,i)=>(
          <div key={p.name} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.gray}`,marginBottom:14,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
            <h3 style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:10}}>{p.name}</h3>
            {[{ic:"mapPin",v:p.countries},{ic:"clock",v:p.duration},{ic:"creditCard",v:p.grant},{ic:"checkCircle",v:p.cond}].map(r=>(
              <div key={r.v} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:7}}>
                <Ico name={r.ic} size={13} color={C.bright} style={{marginTop:1,flexShrink:0}}/>
                <span style={{fontSize:13,color:C.mid}}>{r.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );

    return <div style={{padding:20,color:C.mid}}>Bo'lim tez orada qo'shiladi.</div>;
  };

  return(
    <div style={{background:C.lightGray,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(135deg,${cur.color} 0%,${C.navy} 100%)`,padding:isMobile?"28px 20px":"40px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Talabalarga",page:"student-hub"},{label:cur.label}]} navigate={navigate}/>
          <div style={{display:"flex",alignItems:"center",gap:16,marginTop:12}}>
            <div style={{width:isMobile?52:68,height:isMobile?52:68,borderRadius:16,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"2px solid rgba(255,255,255,0.2)"}}>
              <Ico name={cur.icon} size={isMobile?26:34} color={C.white} sw={1.4}/>
            </div>
            <div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:4}}>Talabalarga</div>
              <h1 style={{color:C.white,fontSize:isMobile?"20px":"clamp(20px,3vw,32px)",fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2}}>{cur.label}</h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:isMobile?"20px 16px 80px":"32px 24px 60px",display:"grid",gridTemplateColumns:isMobile?"1fr":"220px 1fr",gap:24}}>
        {!isMobile&&(
          <div style={{background:C.white,borderRadius:14,padding:14,border:`1px solid ${C.gray}`,position:"sticky",top:80,height:"fit-content"}}>
            <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${C.lightGray}`}}>Bo'limlar</div>
            {studentInfoSections.map(s=>(
              <div key={s.id} onClick={()=>navigate("student-info",{section:s.id})}
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
              {studentInfoSections.map(s=>(
                <button key={s.id} onClick={()=>navigate("student-info",{section:s.id})}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:20,border:`1px solid ${sec===s.id?s.color:C.gray}`,background:sec===s.id?s.color:"white",color:sec===s.id?C.white:C.mid,fontSize:10,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",flexShrink:0}}>
                  <Ico name={s.icon} size={10} color={sec===s.id?C.white:C.mid}/>{s.label}
                </button>
              ))}
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}


export default StudentInfoPage;
