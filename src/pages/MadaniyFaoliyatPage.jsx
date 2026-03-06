import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { culturalSections } from "../data/cultural";

function MadaniyFaoliyatPage({navigate,params,isMobile}){
  const sec=params?.section||"sport";
  const cur=culturalSections.find(s=>s.id===sec)||culturalSections[0];

  const content={
    sport:{
      title:"Sport klub hayoti",
      intro:"O'zbekiston Milliy universiteti har yili milliy va xalqaro musobaqalarda faol ishtirok etadi. Taekvondo, futbol, basketball, kurash va tennis bo'yicha professional sport seksiyalar mavjud.",
      stats:[{v:"18",l:"Sport seksiya"},{v:"420",l:"Faol sportchi"},{v:"34",l:"Medal (2024)"},{v:"1",l:"Olimpiya chempioni"}],
      items:[
        {name:"Taekvondo",head:"Murabiy: A.Mirzayev",students:80,achievements:"Jahon chempionati bronzasi (2023)"},
        {name:"Futbol",head:"Murabiy: B.Xolmatov",students:45,achievements:"O'zbekiston universitetlar chempioni (2024)"},
        {name:"Basketball",head:"Murabiy: N.Ergasheva",students:36,achievements:"Respublika o'yinlari 2-o'rin (2024)"},
        {name:"Kurash",head:"Murabiy: D.Qodirov",students:28,achievements:"Milliy o'yinlar oltin medali (2023)"},
      ]
    },
    hayot:{
      title:"Talabalar hayoti",
      intro:"NUU'da talabalar hayoti boy va rang-barang. Madaniy, ilmiy va ijtimoiy tadbirlar yil bo'yi davom etadi.",
      stats:[{v:"60+",l:"Klub va to'garak"},{v:"200+",l:"Tadbir/yil"},{v:"34K",l:"Talaba"},{v:"140+",l:"Millatlar"}],
      items:[
        {name:"KVN klubi",desc:"Har semestrda respublika KVN ligasida ishtirok etadi. 2024-yilda Toshkent chempionligi."},
        {name:"Debate klubi",desc:"Ingliz va o'zbek tillarida bahs-munozara mashg'ulotlari. Xalqaro turnirlar."},
        {name:"Intellektual klub",desc:"'Nima? Qayerda? Qachon?' o'yini. Universitetlararo musobaqa chempionlari."},
        {name:"Teatr studiyasi",desc:"Har yili 3-4 ta spektakl. Ko'plab taniqli artistlarning olma mater."},
      ]
    },
    kengash:{
      title:"Talabalar kengashi",
      intro:"Talabalar kengashi — talabalarning manfaatlarini himoya qiluvchi va faolligini oshiruvchi asosiy organ.",
      stats:[{v:"47",l:"Kengash a'zolari"},{v:"13",l:"Fakultet vakillari"},{v:"12",l:"Loyiha/yil"},{v:"2005",l:"Tashkil yili"}],
      items:[
        {name:"Ijroiya komissiya",members:"11 nafar",head:"Xasan Nazarov (Rais)",role:"Kengash faoliyatini boshqaradi"},
        {name:"Ta'lim va fan komissiyasi",members:"8 nafar",head:"Lobar Yusupova",role:"Akademik masalalar, stipendiyalar"},
        {name:"Madaniy-ma'rifiy komissiya",members:"9 nafar",head:"Jamshid Toshpo'latov",role:"Tadbirlar, klublarga mas'ul"},
        {name:"Sport va sog'lom turmush",members:"7 nafar",head:"Abdulloh Rahimov",role:"Sport tadbirlari koordinatsiyasi"},
      ]
    },
    psixolog:{
      title:"Psixolog maslahatlari",
      intro:"Psixologik ko'mak xizmati barcha talabalar uchun bepul va maxfiy tarzda ishlaydi.",
      stats:[{v:"8",l:"Psixolog"},{v:"300+",l:"Maslahat/oy"},{v:"24h",l:"Telefon liniyasi"},{v:"100%",l:"Maxfiy"}],
      items:[
        {name:"Individual maslahat",desc:"Shaxsiy muammolar, stress, ilmiy yuk — haftada 5 kun qabul. Ushbu xizmat bepul."},
        {name:"Guruhiy sessiyalar",desc:"Stressga bardoshlilik, ijtimoiy ko'nikmalar, o'z-o'zini boshqarish bo'yicha guruh mashg'ulotlari."},
        {name:"Inqiroz yordami",desc:"Hodisalar, inqirozlar yuzaga kelganda tezkor psixologik yordam 24/7 telefon orqali."},
        {name:"Onlayn konsultatsiya",desc:"HEMIS portali orqali masofaviy maslahat olish imkoniyati. Haftada 3 kun."},
      ]
    },
    tyutor:{
      title:"Tyutorlik faoliyati",
      intro:"Tyutorlar talabalarning akademik jarayonini yo'naltiruvchi va qo'llab-quvvatlovchi murabbiylardir.",
      stats:[{v:"68",l:"Tyutor"},{v:"1:50",l:"Nisbat"},{v:"4",l:"To'garak/hafta"},{v:"2019",l:"Tashkil yili"}],
      items:[
        {name:"Akademik tyutorlik",desc:"1-kurs talabalari uchun boshlanish bosqichi. Dars tartibini, baholash tizimini tushuntirish."},
        {name:"Karyera tyutori",desc:"2-4 kurs. Ish joylari, amaliyot, CV yozish bo'yicha yo'l-yo'riq."},
        {name:"Ilmiy tyutor",desc:"Magistratura va doktorantura. Maqola yozish, grant arizalari bo'yicha qo'llab-quvvatlash."},
        {name:"Xorijiy til tyutori",desc:"Ingliz, rus, nemis tillarida qo'shimcha mashg'ulotlar. Imtihonlarga tayyorgarlik."},
      ]
    },
    turarjoy:{
      title:"Talabalar turar joylari",
      intro:"Universitetda 5 ta yotoqxona mavjud bo'lib, 4200 talaba joylasha oladi.",
      stats:[{v:"5",l:"Yotoqxona"},{v:"4200",l:"O'rin"},{v:"24/7",l:"Xavfsizlik"},{v:"Wi-Fi",l:"Bepul internet"}],
      items:[
        {name:"1-yotoqxona (Qizlar)",capacity:"800 o'rin",address:"Talabalar shaharchasi, 1-bino",features:"Oshxona, kir yuvish, o'qish zali"},
        {name:"2-yotoqxona (O'g'il)",capacity:"1000 o'rin",address:"Talabalar shaharchasi, 2-bino",features:"Trenazyor zali, o'qish xonasi, kafe"},
        {name:"3-yotoqxona (Aralash)",capacity:"900 o'rin",address:"Talabalar shaharchasi, 3-bino",features:"Mini-market, o'qish zali, kir yuvish"},
        {name:"4 va 5-yotoqxona",capacity:"1500 o'rin",address:"Talabalar shaharchasi, 4-5-bino",features:"Yangi remont, sport maydoni, kafe"},
      ]
    },
    yashil:{
      title:"Yashil Universitet loyihasi",
      intro:"2022-yildan boshlab NUU «Yashil Universitet» strategiyasini amalga oshirmoqda — energiya tejash, qayta tiklanadigan energiya va ekologik ma'daniyat.",
      stats:[{v:"40%",l:"Energiya tejash"},{v:"2000+",l:"Daraxt ekildi"},{v:"12",l:"Quyosh panel"},{v:"2030",l:"Maqsad yil"}],
      items:[
        {name:"Quyosh energiyasi",desc:"Campus binolari 12 ta quyosh panel bilan ta'minlangan. Yiliga 180 MWh toza energiya."},
        {name:"Yashil maydon",desc:"2022-2024 yillarda 2000+ daraxt va o'simlik ekildi. 3 ta yangi bog' tashkil etildi."},
        {name:"Chiqindilarni qayta ishlash",desc:"5 fakultetda ajratilgan chiqindi yig'ish konteynerlar. Yiliga 8 tonna plastik qayta ishlanadi."},
        {name:"Ekologik ta'lim",desc:"Barcha 1-kurs talabalari uchun majburiy \"Ekologik savodxonlik\" moduli."},
      ]
    },
    ekofaol:{
      title:"Ekofaol talabalar",
      intro:"\"Ekofaol\" dasturi talabalarni atrof-muhit muhofazasiga faol jalb qiladi.",
      stats:[{v:"1200+",l:"Ekofaol"},{v:"24",l:"Aksiya/yil"},{v:"15 tonna",l:"Chiqindi"},{v:"4",l:"Grunt"}],
      items:[
        {name:"\"Toza tabiat\" aksiyasi",desc:"Har bahor va kuz Chirchiq va Ohangaronni tozalash kampaniyasi. 500+ ishtirokchi."},
        {name:"Daryo monitoring",desc:"Tabiatshunoslik talabalari Chirchiq daryosi sifatini muntazam kuzatadi."},
        {name:"Ekomarafon",desc:"Xalqaro Yer kuni munosabati bilan yillik ekomarafon va ko'rgazma."},
        {name:"Biotexnologiya loyihalari",desc:"Talabalar bioparklarida kompost, vermikultura va urban fermer loyihalari."},
      ]
    },
    konstitutsiya:{
      title:"Mening Konstitutsiyam",
      intro:"O'zbekiston Respublikasi Konstitutsiyasini targ'ib qilish va huquqiy savodxonlikni oshirish dasturi.",
      stats:[{v:"2023",l:"Tashkil yili"},{v:"8000+",l:"Ishtirokchi"},{v:"13",l:"Fakultet"},{v:"4",l:"Tanlov turi"}],
      items:[
        {name:"Olimpiada",desc:"Konstitutsiya bo'yicha yillik bilimdonlar musobaqasi. G'oliblar respublika bosqichiga chiqadi."},
        {name:"Esse tanlovi",desc:"\"Mening huquqlarim va burchlarim\" mavzusida talabalar orasida esse musobaqasi."},
        {name:"Ochiq ma'ruzalar",desc:"Huquqshunos olimlar va vakillarning ishtiroki bilan oylik ochiq ma'ruzalar."},
        {name:"Videotasvirlar tanlovi",desc:"Konstitutsiyaviy qadriyatlarni targ'ib qiluvchi qisqa video musobaqasi."},
      ]
    },
    manaviyat:{
      title:"Ma'naviyat rukni",
      intro:"Ma'naviyat va ma'rifat, milliy qadriyatlar hamda axloqiy tarbiya markazining faoliyati.",
      stats:[{v:"120+",l:"Tadbir/yil"},{v:"5000+",l:"Ishtirokchi"},{v:"6",l:"Yo'nalish"},{v:"2001",l:"Tashkil yili"}],
      items:[
        {name:"Milliy bayramlar",desc:"Navro'z, Mustaqillik, Konstitutsiya kunlari munosabati bilan keng ko'lamli madaniy tadbirlar."},
        {name:"Adabiy kechalar",desc:"O'zbek va jahon adabiyoti namoyandalarini targ'ib qiluvchi oylik adabiy kechalar."},
        {name:"Tarix va meros",desc:"Ulug'bek, Ibn Sino, al-Xorazmiy va boshqa allomalar hayotiga bag'ishlangan expo va ko'rgazmalar."},
        {name:"Talabalar teatri",desc:"Ma'naviy-axloqiy mavzulardagi spektakllar. Yiliga 4-6 ta yangi qo'yilma."},
      ]
    },
  };

  const cd=content[sec]||content.sport;

  return(
    <div style={{background:C.lightGray,minHeight:"100vh"}}>
      {/* HERO */}
      <div style={{background:`linear-gradient(135deg,${cur.color} 0%,${C.navy} 100%)`,padding:isMobile?"28px 20px":"40px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-60,left:-60,width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          <Breadcrumb items={[{label:"Bosh sahifa",page:"home"},{label:"Madaniy faoliyat",page:"cultural"},{label:cur.label}]} navigate={navigate}/>
          <div style={{display:"flex",alignItems:"center",gap:16,marginTop:12}}>
            <div style={{width:isMobile?52:68,height:isMobile?52:68,borderRadius:16,background:"rgba(255,255,255,0.14)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"2px solid rgba(255,255,255,0.2)"}}>
              <Ico name={cur.icon} size={isMobile?26:34} color={C.white} sw={1.4}/>
            </div>
            <div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:4}}>Madaniy-ma'rifiy faoliyat</div>
              <h1 style={{color:C.white,fontSize:isMobile?"20px":"clamp(20px,3vw,32px)",fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2}}>{cd.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:isMobile?"20px 16px 80px":"32px 24px 60px",display:"grid",gridTemplateColumns:isMobile?"1fr":"220px 1fr",gap:24}}>
        {/* SIDEBAR */}
        {!isMobile&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{background:C.white,borderRadius:14,padding:14,border:`1px solid ${C.gray}`,position:"sticky",top:80}}>
              <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${C.lightGray}`}}>Bo'limlar</div>
              {culturalSections.map(s=>(
                <div key={s.id} onClick={()=>navigate("cultural",{section:s.id})}
                  style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sec===s.id?`${s.color}12`:"transparent",color:sec===s.id?s.color:C.mid,fontWeight:sec===s.id?700:500,fontSize:12,transition:"all 0.15s",marginBottom:2}}
                  onMouseEnter={e=>{if(sec!==s.id)e.currentTarget.style.background=C.lightGray;}}
                  onMouseLeave={e=>{if(sec!==s.id)e.currentTarget.style.background="transparent";}}>
                  <Ico name={s.icon} size={13} color={sec===s.id?s.color:C.light}/>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAIN */}
        <div>
          {isMobile&&(
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12,marginBottom:16}}>
              {culturalSections.map(s=>(
                <button key={s.id} onClick={()=>navigate("cultural",{section:s.id})}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:20,border:`1px solid ${sec===s.id?s.color:C.gray}`,background:sec===s.id?s.color:"white",color:sec===s.id?C.white:C.mid,fontSize:10,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",flexShrink:0}}>
                  <Ico name={s.icon} size={10} color={sec===s.id?C.white:C.mid}/>{s.label}
                </button>
              ))}
            </div>
          )}

          {/* Stats strip */}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:10,marginBottom:24}}>
            {cd.stats.map(s=>(
              <div key={s.l} style={{background:C.white,borderRadius:12,padding:"14px 16px",border:`1px solid ${C.gray}`,textAlign:"center"}}>
                <div style={{fontSize:isMobile?20:26,fontWeight:800,color:cur.color,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:C.light,marginTop:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Intro */}
          <div style={{background:C.white,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.gray}`,marginBottom:20,borderLeft:`4px solid ${cur.color}`}}>
            <p style={{fontSize:14,color:C.mid,lineHeight:1.8}}>{cd.intro}</p>
          </div>

          {/* Cards */}
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
            {cd.items.map((item,i)=>(
              <div key={i} style={{background:C.white,borderRadius:14,padding:"16px 18px",border:`1px solid ${C.gray}`,animation:`fadeUp 0.4s ${i*60}ms ease both`}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${cur.color}14`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10,border:`1.5px solid ${cur.color}20`}}>
                  <Ico name={cur.icon} size={16} color={cur.color}/>
                </div>
                <h3 style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6}}>{item.name}</h3>
                {item.desc&&<p style={{fontSize:13,color:C.mid,lineHeight:1.6}}>{item.desc}</p>}
                {item.head&&<p style={{fontSize:12,color:C.light,marginBottom:4}}>{item.head}</p>}
                {item.students&&<p style={{fontSize:12,color:C.mid}}>{item.students} talaba · {item.achievements}</p>}
                {item.members&&<p style={{fontSize:12,color:C.mid}}>{item.members} · {item.role}</p>}
                {item.capacity&&<p style={{fontSize:12,color:C.mid}}>{item.capacity} · {item.address}</p>}
                {item.features&&<p style={{fontSize:11,color:C.light,marginTop:4}}>{item.features}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default MadaniyFaoliyatPage;
