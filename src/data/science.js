import C from "../constants/colors";

const scienceSections=[
  {id:"kengash",      icon:"users",       label:"Ilmiy kengashlar",     color:C.bright},
  {id:"loyihalar",    icon:"layers",      label:"Ilmiy loyihalar",       color:C.orange},
  {id:"maktablar",    icon:"award",       label:"Ilmiy maktablar",       color:C.navy},
  {id:"doktorantura", icon:"graduation",  label:"Doktorantura",          color:C.bright},
  {id:"avtoreferat",  icon:"fileText",    label:"Avtoreferat",           color:C.orange},
  {id:"konferensiyalar",icon:"globe",     label:"Ilmiy konferensiyalar", color:C.navy},
  {id:"jurnallar",    icon:"newspaper",   label:"Ilmiy jurnallar",       color:C.bright},
  {id:"innovatsiya",  icon:"cpu",         label:"Ilmiy innovatsiyalar",  color:C.orange},
];

const scienceData={
  kengash:[
    {id:1,name:"Matematika fanlari bo'yicha ilmiy kengash",chair:"Akad. N.Yusupov",members:15,year:1962,specialties:["01.01.01","01.01.02","01.01.03"],meetings:"Oyda bir marta, har oyning 3-jumasida",room:"1-bino, 102-auditoriya"},
    {id:2,name:"Fizika-matematika fanlari ilmiy kengashi",chair:"Prof. B.Rahimov",members:12,year:1975,specialties:["01.04.01","01.04.02"],meetings:"45 kunda bir marta",room:"2-bino, 205-auditoriya"},
    {id:3,name:"Kimyo fanlari bo'yicha ilmiy kengash",chair:"Prof. X.Toshmatov",members:14,year:1980,specialties:["02.00.01","02.00.02","02.00.03"],meetings:"Oyda bir marta",room:"3-bino, 310-auditoriya"},
    {id:4,name:"Biologiya fanlari ilmiy kengashi",chair:"Prof. D.Saidova",members:13,year:1970,specialties:["03.00.01","03.00.02"],meetings:"45 kunda bir marta",room:"4-bino, 108-auditoriya"},
  ],
  loyihalar:[
    {id:1,name:"Kvant kompyuting va nanostrukturalar tadqiqoti",pi:"Prof. S.Yuldashev",grant:"ANRS-2024-12",amount:"1.8 mlrd so'm",partner:"MIT, AQSh",start:"2024-01",end:"2026-12",status:"Faol"},
    {id:2,name:"O'zbek tilini NLP usullari bilan qayta ishlash",pi:"Prof. N.Xoliqova",grant:"UN-AI-2023-08",amount:"950 mln so'm",partner:"Innopolis, Rossiya",start:"2023-09",end:"2025-08",status:"Faol"},
    {id:3,name:"Markaziy Osiyo flora genofondini saqlash",pi:"Prof. M.Alieva",grant:"GEF-2023-04",amount:"2.1 mlrd so'm",partner:"BGCI, UK",start:"2023-05",end:"2026-05",status:"Faol"},
    {id:4,name:"Sun'iy intellekt asosida tibbiy diagnostika",pi:"Dots.J.Tursunov",grant:"UZINNOVATECH-22",amount:"720 mln so'm",partner:"NUU, Toshkent",start:"2022-01",end:"2024-12",status:"Yakunlangan"},
  ],
  maktablar:[
    {id:1,name:"Algebraik tuzilmalar ilmiy maktabi",founder:"Akad. T.Sarymsaqov (1945)",head:"Prof. A.Yusupov",members:24,phd:8,publications:320,awards:"O'zbekiston Fanlar Akademiyasi diplomlari (2018,2022)"},
    {id:2,name:"Raqamli metodlar va optimallashtirish maktabi",founder:"Prof. J.Tursunov (1975)",head:"Dots. J.Tursunov",members:15,phd:5,publications:185,awards:"TWAS mukofoti (2020)"},
    {id:3,name:"O'rta Osiyo florasi va botanika maktabi",founder:"Akad. O.Butkov (1950)",head:"Prof. M.Alieva",members:30,phd:11,publications:450,awards:"UNESCO sertifikati (2019)"},
    {id:4,name:"Kvant fizikasi ilmiy maktabi",founder:"Prof. B.Yuldashev (1961)",head:"Prof. S.Yuldashev",members:18,phd:7,publications:260,awards:"IUPAP Fellowship (2021)"},
  ],
  doktorantura:[
    {name:"PhD talabchanlik shartlari",items:["Magistr yoki unga tenglashtirilgan diplom","Chet tili sertifikati (B2 va yuqori)","Ilmiy rahbar tavsiyasi","Kirish imtihonlari: ixtisoslik, chet tili, falsafa"]},
    {name:"DSc (Fan doktori) shartlari",items:["PhD diplomiga ega bo'lish","Kamida 10 ta Scopus/WoS maqola","Ilmiy kengash xulosasi","Himoya oldidan avtoreferat nashr qilish"]},
    {name:"Joriy holat",items:["Doktorantlar soni: 145","Haqdor raxbarlar soni: 68","Himoya qilingan dissertatsiyalar (2024): 28"]},
  ],
  avtoreferat:[
    {id:1,author:"Nazarov Sh.O.",title:"Elliptik tenglamalar nazariyasida inversli masalalar",date:"2024-11-20",type:"PhD",field:"Matematika",file:"#"},
    {id:2,author:"Toshmatova N.K.",title:"O'simlik polisaxaridlarining fizik-kimyoviy xossalari",date:"2024-11-14",type:"PhD",field:"Kimyo",file:"#"},
    {id:3,author:"Ergashev R.B.",title:"Markaziy Osiyo quruqlik ekotizimlarining raqamli modeli",date:"2024-10-30",type:"DSc",field:"Ekologiya",file:"#"},
    {id:4,author:"Qodirov M.A.",title:"Nanostrukturalangan yarimo'tkazgichlar spektroskopiyasi",date:"2024-10-15",type:"PhD",field:"Fizika",file:"#"},
    {id:5,author:"Yusupova D.I.",title:"O'zbek tili leksikasini mashina o'rganish usullari bilan tahlil qilish",date:"2024-09-28",type:"PhD",field:"Filologiya",file:"#"},
  ],
  konferensiyalar:[
    {id:1,name:"Raqamli transformatsiya va sun'iy intellekt: xalqaro forum",date:"2025-04-10",place:"NUU Asosiy zali",type:"Xalqaro",lang:"O'z/Eng/Rus",reg:"Ochiq",deadline:"2025-03-15"},
    {id:2,name:"O'zbekiston geologiyasi: yangi kashfiyotlar",date:"2025-05-22",place:"Geologiya fakulteti",type:"Respublika",lang:"O'z/Rus",reg:"Ochiq",deadline:"2025-04-30"},
    {id:3,name:"Kvant fizikasi va nanostrukturalar — 2025",date:"2025-09-04",place:"NUU + Onlayn",type:"Xalqaro",lang:"Eng",reg:"Rejalashtirilgan",deadline:"2025-07-01"},
    {id:4,name:"O'zbek tilshunosligi va NLP konferensiyasi",date:"2024-11-14",place:"NUU 5-auditoriya",type:"Respublika",lang:"O'z",reg:"Yakunlangan",deadline:"—"},
  ],
  jurnallar:[
    {id:1,name:"O'zMU Xabarlari — Matematika va Fizika",issn:"2181-1601",wos:true,scopus:false,freq:"Oyda 2 marta",editor:"Prof. B.Rahimov",link:"https://journalsnuu.uz"},
    {id:2,name:"O'zMU Xabarlari — Kimyo va Biologiya",issn:"2181-1628",wos:true,scopus:true,freq:"Oyda 1 marta",editor:"Prof. X.Toshmatov",link:"https://journalsnuu.uz"},
    {id:3,name:"O'zMU Xabarlari — Iqtisodiyot",issn:"2181-1644",wos:false,scopus:true,freq:"Chorakda 1 marta",editor:"Prof. A.Mirzayev",link:"https://journalsnuu.uz"},
    {id:4,name:"Computational Linguistics — Uzbek",issn:"2992-9105",wos:false,scopus:false,freq:"Yarim yilda 1 marta",editor:"Prof. N.Xoliqova",link:"https://journalsnuu.uz"},
  ],
  innovatsiya:[
    {id:1,name:"NLP Toolkit for Uzbek & Karakalpak",type:"Dasturiy ta'minot",year:2024,team:"Prof. N.Xoliqova va jamoasi",desc:"O'zbek va qoraqalpoq tillarini tahlil qiluvchi ochiq kutubxona. GitHub'da 2.1K yulduz.",link:"#"},
    {id:2,name:"Solar Tracker Controller (STC-NUU)",type:"Apparat-dasturiy",year:2023,team:"Fizika kafedrasi",desc:"Quyosh panellarini optimal boshqaruvchi arzon mikrokontroller yechimi.",link:"#"},
    {id:3,name:"BioNUU Plant DB",type:"Ma'lumotlar bazasi",year:2024,team:"Botanika kafedrasi",desc:"Markaziy Osiyo o'simliklari 48000 ta yozuvdan iborat ochiq ma'lumotlar bazasi.",link:"#"},
  ],
};

export { scienceSections, scienceData };
