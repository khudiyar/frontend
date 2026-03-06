import C from "../constants/colors";

const financeSections=[
  {id:"tolov",    icon:"creditCard", label:"To'lov-kontrakt narxlari",color:C.bright},
  {id:"xarajat",  icon:"barChart",   label:"Xarajatlar smetasi",       color:C.orange},
  {id:"shartnoma",icon:"fileText",   label:"Tuzilgan shartnomalar",    color:C.navy},
  {id:"xarid",    icon:"users",      label:"Xarid komissiyasi",        color:C.bright},
  {id:"transport",icon:"compass",    label:"Transport vositalari",     color:C.orange},
];

const financeData={
  tolov:[
    {faculty:"Matematika",bachelor:19800000,master:23500000,phd:28000000},
    {faculty:"Fizika",bachelor:21200000,master:24800000,phd:29500000},
    {faculty:"Kimyo",bachelor:20400000,master:23000000,phd:28500000},
    {faculty:"Biologiya va Ekologiya",bachelor:19500000,master:22500000,phd:27000000},
    {faculty:"Amaliy matematika va IT",bachelor:25800000,master:29500000,phd:35000000},
    {faculty:"Iqtisodiyot",bachelor:24600000,master:28000000,phd:33000000},
    {faculty:"Huquq va ijtimoiy fanlar",bachelor:22000000,master:26000000,phd:31000000},
    {faculty:"Filologiya va jurnalistika",bachelor:18500000,master:21500000,phd:26000000},
    {faculty:"Tarix",bachelor:17800000,master:20500000,phd:25000000},
    {faculty:"Taekwondo va sport",bachelor:22000000,master:25000000,phd:null},
  ],
  xarajat:[
    {cat:"Ta'lim xarajatlari",amount:184500000000,pct:62},
    {cat:"Ilmiy tadqiqotlar",amount:48200000000,pct:16},
    {cat:"Kapital qo'yilmalar",amount:26400000000,pct:9},
    {cat:"Ijtimoiy himoya",amount:17600000000,pct:6},
    {cat:"Ma'muriy xarajatlar",amount:12300000000,pct:4},
    {cat:"Boshqa xarajatlar",amount:8800000000,pct:3},
  ],
  shartnoma:[
    {id:"2024-KT-1142",name:"IT infratuzilma modernizatsiyasi",contractor:"TechUz LLC",amount:4800000000,date:"2024-08-12",status:"Bajarilmoqda"},
    {id:"2024-KT-0982",name:"Laboratoriya jihozlari yetkazish",contractor:"SciLab Impex",amount:3200000000,date:"2024-06-20",status:"Yakunlangan"},
    {id:"2024-KT-1087",name:"Yotoqxona ta'mirlash",contractor:"Qurilish-Pro",amount:7600000000,date:"2024-07-15",status:"Bajarilmoqda"},
    {id:"2024-KT-0814",name:"Kutubxona elektron resurslari",contractor:"Clarivate Analytics",amount:1900000000,date:"2024-04-28",status:"Yakunlangan"},
    {id:"2025-KT-0012",name:"Kampus Wi-Fi modernizatsiyasi",contractor:"Cisco Systems UZ",amount:2400000000,date:"2025-01-10",status:"Rejalashtirilgan"},
  ],
  xarid:[
    {name:"Shamsiyev A.K.",role:"Komissiya raisi",degree:"Iqtisod fanlari doktori"},
    {name:"Ergasheva N.B.",role:"A'zo",degree:"Huquqshunos, PhD"},
    {name:"Toshpo'latov R.M.",role:"A'zo",degree:"Moliya mutaxassisi"},
    {name:"Qodirov J.A.",role:"Kotib",degree:"Iqtisodiyotchi"},
  ],
  transport:[
    {model:"Mercedes-Benz Sprinter",plate:"01 A 123 BC",year:2022,type:"Mikroavtobus",use:"Xizmat safari"},
    {model:"Isuzu NQR",plate:"01 B 456 DE",year:2021,type:"Yuk avtomobili",use:"Xo'jalik"},
    {model:"Chevrolet Malibu",plate:"01 C 789 FG",year:2023,type:"Yengil avtomobil",use:"Rektorat"},
    {model:"ZAZ Vida",plate:"01 D 012 HI",year:2020,type:"Yengil avtomobil",use:"Xizmat"},
    {model:"Hyundai County",plate:"01 E 345 JK",year:2022,type:"Avtobus",use:"Talabalar tashish"},
  ],
};

export { financeSections, financeData };
