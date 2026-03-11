import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", orangeLight:"#FFF4ED",
  green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  teal:"#0D9488",   tealLight:"#F0FDFA",
  pink:"#DB2777",   pinkLight:"#FDF2F8",
  dark:"#0F172A", mid:"#475569", light:"#94A3B8",
  gray:"#E2E8F0", lightGray:"#F8FAFC", white:"#FFFFFF",
};
const PALETTE=[C.bright,C.teal,C.purple,C.orange,C.green,C.red,C.pink,C.navy,C.yellow,"#00BCD4"];

const css=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.lightGray}}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico=({d,size=16,color="currentColor",sw=2})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I={
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  x:       "M18 6L6 18M6 6l12 12",
  chevD:   "M6 9l6 6 6-6",
  check:   "M20 6L9 17l-5-5",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  filter:  "M22 3H2l8 9.46V19l4 2V12.46z",
  bar:     "M18 20V10M12 20V4M6 20v-6",
  pie:     "M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z",
  area:    "M3 3v18h18M3 18l5-7 4 4 4-6 5 4",
  radar:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  file:    "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  db:      "M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6zM3 5v14a9 3 0 0 0 18 0V5",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  globe:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  excel:   "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M8 9h2",
};

/* ── Static reference data ── */
const FACULTIES=[
  {id:1,name:"Axborot texnologiyalari fakulteti",code:"ATF"},
  {id:2,name:"Tabiiy fanlar fakulteti",          code:"TFF"},
  {id:3,name:"Muhandislik va energetika",        code:"MEF"},
  {id:4,name:"Iqtisodiyot va menejment",         code:"IMF"},
];
const DEPARTMENTS=[
  {id:10,name:"Dasturlash va AT",        code:"DAT",facultyId:1},
  {id:11,name:"Axborot xavfsizligi",     code:"AX", facultyId:1},
  {id:12,name:"Multimedia va dizayn",    code:"MD", facultyId:1},
  {id:20,name:"Matematika",              code:"MAT",facultyId:2},
  {id:30,name:"Elektrotexnika",          code:"EL", facultyId:3},
  {id:31,name:"Mexanika",                code:"MX", facultyId:3},
  {id:40,name:"Iqtisodiyot nazariyasi",  code:"IN", facultyId:4},
];
const EMPLOYEES=[
  {id:91, name:"KAZAXBAEV S. A.",   deptId:10},
  {id:159,name:"YESBERGENOV D. M.",deptId:30},
  {id:105,name:"BAYNAZAROV A. Y.", deptId:11},
  {id:144,name:"ADILOVA N. N.",    deptId:12},
  {id:34, name:"URAZOVA A. A.",    deptId:40},
];
const GROUPS=[
  {id:1,name:"MT-21",facultyId:1},{id:2,name:"AX-22",facultyId:1},
  {id:3,name:"MV-23",facultyId:1},{id:4,name:"EL-21",facultyId:3},
  {id:5,name:"MX-22",facultyId:3},{id:6,name:"IQ-23",facultyId:4},
];
const LANGS    =[{code:"11",name:"O'zbek"},{code:"12",name:"Rus"},{code:"13",name:"Qoraqalpoq"}];
const EDU_TYPES=[{code:"11",name:"Kunduzgi"},{code:"12",name:"Kechki"},{code:"13",name:"Sirtqi"}];
const RES_NAMES={"10":"Boshqa","11":"Video","12":"Audio","13":"Taqdimot","14":"O'quv","15":"Test"};
const TRAIN_NAMES={"11":"Ma'ruza","12":"Lab","13":"Amaliy","14":"Seminar","17":"Mustaqil"};

/* ── Raw data ── */
const RAW=[
  {id:88698,title:"Ideal aralashtirish",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:1,eduTypeCode:"11",resTypeCode:"14",files:[{name:"3-Maruza.docx",size:89822}],updated_at:1772890786},
  {id:88697,title:"Apparatda bo'lish vaqti",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:1,eduTypeCode:"11",resTypeCode:"14",files:[{name:"2-Maruza.pdf",size:527849}],updated_at:1772890740},
  {id:88696,title:"Sanoat apparatlarida oqim zarralarini taqsimlanish",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:1,eduTypeCode:"11",resTypeCode:"14",files:[{name:"1-Maruza.docx",size:22801}],updated_at:1772890702},
  {id:88695,title:"Identifikatsiyalash masalasi",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:1,eduTypeCode:"11",resTypeCode:"14",files:[{name:"6-Maruza.pdf",size:569765}],updated_at:1772890535},
  {id:88694,title:"Klassik usuli bilan minimallashtirish",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:1,eduTypeCode:"11",resTypeCode:"14",files:[{name:"5-maruza.docx",size:30374}],updated_at:1772890509},
  {id:88693,title:"Optimiallashtirish masalalari",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:2,eduTypeCode:"11",resTypeCode:"14",files:[{name:"4-Maruza.pdf",size:552811}],updated_at:1772890482},
  {id:88692,title:"To'g'ri oqimli issiqlik almashish apparatlari",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:2,eduTypeCode:"11",resTypeCode:"14",files:[{name:"3-Maruza.pdf",size:602151}],updated_at:1772890454},
  {id:88691,title:"Rektifikatsiya kolonnalarini hisoblash",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:2,eduTypeCode:"13",resTypeCode:"14",files:[{name:"2-Maruza.pdf",size:710874}],updated_at:1772890423},
  {id:88690,title:"Konveksiya-diffuziya tenglamalari",subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish"},trainingTypeCode:"11",langCodes:["11","13"],employeeId:91,deptId:10,facultyId:1,groupId:2,eduTypeCode:"13",resTypeCode:"14",files:[{name:"1-Maruza.docx",size:45799}],updated_at:1772890387},
  {id:88689,title:"Motorlar va aktuatorlar",subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash"},trainingTypeCode:"11",langCodes:["13"],employeeId:159,deptId:30,facultyId:3,groupId:4,eduTypeCode:"11",resTypeCode:"10",files:[{name:"15-lek.docx",size:2529986}],updated_at:1772887459},
  {id:88688,title:"Signal qayta ishlash va filtrlash",subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash"},trainingTypeCode:"11",langCodes:["13"],employeeId:159,deptId:30,facultyId:3,groupId:4,eduTypeCode:"11",resTypeCode:"10",files:[{name:"14-lek.docx",size:785308}],updated_at:1772887407},
  {id:88687,title:"Elektron va boshqaruv sistemalari",subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash"},trainingTypeCode:"11",langCodes:["13"],employeeId:159,deptId:30,facultyId:3,groupId:4,eduTypeCode:"11",resTypeCode:"10",files:[{name:"13-lek.docx",size:555035}],updated_at:1772887343},
  {id:88686,title:"Tisli uzatpalar va sovutish sistemalari",subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash"},trainingTypeCode:"11",langCodes:["13"],employeeId:159,deptId:30,facultyId:3,groupId:5,eduTypeCode:"12",resTypeCode:"10",files:[{name:"12-lek.docx",size:870180}],updated_at:1772887296},
  {id:88685,title:"Dvigateller va DC motorlar",subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash"},trainingTypeCode:"11",langCodes:["13"],employeeId:159,deptId:30,facultyId:3,groupId:5,eduTypeCode:"12",resTypeCode:"10",files:[{name:"11-lek.docx",size:2706421}],updated_at:1772887245},
  {id:88684,title:"15-Amaliy ish",subject:{id:908,code:"EMBS16MBK*",name:"O'rnatilgan tizimlar"},trainingTypeCode:"13",langCodes:["11"],employeeId:105,deptId:11,facultyId:1,groupId:2,eduTypeCode:"11",resTypeCode:"14",files:[{name:"15-Amaliy.docx",size:1276366}],updated_at:1772887156},
  {id:88683,title:"Topic: What are you up to?",subject:{id:185,code:"XT1408",name:"Xorijiy til"},trainingTypeCode:"13",langCodes:["11","13"],employeeId:144,deptId:12,facultyId:1,groupId:3,eduTypeCode:"11",resTypeCode:"14",files:[{name:"lesson1.png",size:20630}],updated_at:1772882963},
  {id:88682,title:"Topic: Town and country",subject:{id:185,code:"XT1408",name:"Xorijiy til"},trainingTypeCode:"13",langCodes:["11","13"],employeeId:144,deptId:12,facultyId:1,groupId:3,eduTypeCode:"11",resTypeCode:"11",files:[{name:"lesson2.png",size:19998}],updated_at:1772882865},
  {id:88681,title:"Topic: Everyday English (Shopping)",subject:{id:185,code:"XT1408",name:"Xorijiy til"},trainingTypeCode:"13",langCodes:["11","13"],employeeId:144,deptId:12,facultyId:1,groupId:3,eduTypeCode:"11",resTypeCode:"11",files:[{name:"lesson3.png",size:761884}],updated_at:1772882761},
  {id:88680,title:"Topic: Daily needs",subject:{id:185,code:"XT1408",name:"Xorijiy til"},trainingTypeCode:"13",langCodes:["11","13"],employeeId:144,deptId:12,facultyId:1,groupId:3,eduTypeCode:"13",resTypeCode:"11",files:[{name:"lesson4.png",size:31676}],updated_at:1772882689},
  {id:88679,title:"Ilmiy uslub va uning xususiyatlari",subject:{id:318,code:"ORT1204",name:"O'zbek (rus) tili"},trainingTypeCode:"13",langCodes:["12"],employeeId:34,deptId:40,facultyId:4,groupId:6,eduTypeCode:"12",resTypeCode:null,files:[],updated_at:1772882501},
];
const TOTAL_SERVER=85731;

/* ══ analytics builder ══ */
const fmtSize=b=>{
  if(b>=1048576) return`${(b/1048576).toFixed(1)} MB`;
  if(b>=1024)    return`${(b/1024).toFixed(0)} KB`;
  return`${b} B`;
};
function buildA(data){
  const totalTopics=data.length;
  const totalFiles =data.reduce((s,r)=>s+r.files.length,0);
  const totalSize  =data.reduce((s,r)=>s+r.files.reduce((a,f)=>a+Number(f.size),0),0);
  const withFile   =data.filter(r=>r.files.length>0).length;
  const noFile     =data.filter(r=>r.files.length===0).length;

  const sm={};
  data.forEach(r=>{
    if(!sm[r.subject.id]) sm[r.subject.id]={
      name:r.subject.name.length>26?r.subject.name.slice(0,24)+"…":r.subject.name,
      fullName:r.subject.name,code:r.subject.code,topics:0,files:0,size:0,noFile:0};
    sm[r.subject.id].topics++;
    sm[r.subject.id].files+=r.files.length;
    sm[r.subject.id].size+=r.files.reduce((a,f)=>a+Number(f.size),0);
    if(!r.files.length) sm[r.subject.id].noFile++;
  });
  const bySubject=Object.values(sm).sort((a,b)=>b.topics-a.topics);

  const rm={};
  data.forEach(r=>{const k=r.resTypeCode||"none";const n=r.resTypeCode?(RES_NAMES[r.resTypeCode]||k):"Fayl yo'q";if(!rm[k])rm[k]={name:n,value:0};rm[k].value++;});
  const byRes=Object.values(rm);

  const tm={};
  data.forEach(r=>{const k=r.trainingTypeCode;const n=TRAIN_NAMES[k]||k;if(!tm[k])tm[k]={name:n,topics:0,files:0};tm[k].topics++;tm[k].files+=r.files.length;});
  const byTrain=Object.values(tm);

  const em={};
  data.forEach(r=>{
    const emp=EMPLOYEES.find(e=>e.id===r.employeeId);
    if(!em[r.employeeId])em[r.employeeId]={name:emp?emp.name:`#${r.employeeId}`,topics:0,files:0,size:0};
    em[r.employeeId].topics++;em[r.employeeId].files+=r.files.length;
    em[r.employeeId].size+=r.files.reduce((a,f)=>a+Number(f.size),0);
  });
  const byEmp=Object.values(em).sort((a,b)=>b.topics-a.topics);

  const lm={};
  data.forEach(r=>r.langCodes.forEach(c=>{const n=LANGS.find(l=>l.code===c)?.name||c;if(!lm[c])lm[c]={name:n,value:0};lm[c].value++;}));
  const byLang=Object.values(lm);

  const xm={};
  data.forEach(r=>r.files.forEach(f=>{const ext=(f.name.split(".").pop()||"other").toLowerCase();if(!xm[ext])xm[ext]={name:`.${ext}`,value:0,size:0};xm[ext].value++;xm[ext].size+=Number(f.size);}));
  const byExt=Object.values(xm).sort((a,b)=>b.value-a.value);

  const fm={};
  data.forEach(r=>{const fac=FACULTIES.find(f=>f.id===r.facultyId);if(!fac)return;if(!fm[r.facultyId])fm[r.facultyId]={name:fac.code,fullName:fac.name,topics:0,files:0};fm[r.facultyId].topics++;fm[r.facultyId].files+=r.files.length;});
  const byFac=Object.values(fm).sort((a,b)=>b.topics-a.topics);

  const coverage=[{name:"Faol bor",value:withFile},{name:"Fayl yo'q",value:noFile}];

  const dm={};
  data.forEach(r=>{const d=new Date(r.updated_at*1000);const k=`${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}`;if(!dm[k])dm[k]={date:k,uploads:0,files:0};dm[k].uploads++;dm[k].files+=r.files.length;});
  const timeline=Object.values(dm).sort((a,b)=>a.date.localeCompare(b.date));

  const radar=bySubject.slice(0,5).map(s=>({subject:s.code,Mavzular:s.topics,Fayllar:s.files,"Hajm(×MB)":Math.round(s.size/100000)}));

  return{bySubject,byRes,byTrain,byEmp,byLang,byExt,byFac,coverage,timeline,radar,
    totalTopics,totalFiles,totalSize,withFile,noFile,avgFiles:totalTopics?(totalFiles/totalTopics).toFixed(1):"0"};
}

/* ── Shared UI pieces ── */
const Sel=({value,onChange,children,style={}})=>(
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 28px 8px 11px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:12,
        color:value?C.dark:C.light,background:C.white,cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={12} color={C.light}/>
    </div>
  </div>
);

const CT=({active,payload,label})=>{
  if(!active||!payload?.length) return null;
  return(
    <div style={{background:C.white,border:`1px solid ${C.gray}`,borderRadius:10,
      padding:"10px 14px",fontSize:12,boxShadow:"0 4px 16px rgba(13,26,99,.1)"}}>
      {label&&<div style={{color:C.mid,marginBottom:5,fontWeight:600}}>{label}</div>}
      {payload.map((p,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",gap:16,
          color:C.dark,fontWeight:700,marginTop:i>0?3:0}}>
          <span style={{color:p.color||C.mid}}>{p.name}</span>
          <span>{typeof p.value==="number"?p.value.toLocaleString():p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Card=({title,sub,icon,children,span=1,delay=0,accent=C.bright})=>(
  <div style={{gridColumn:`span ${span}`,background:C.white,borderRadius:16,
    border:`1.5px solid ${C.gray}`,padding:"18px 20px",
    animation:`fadeUp .4s ${delay}ms ease both`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,
      background:`linear-gradient(90deg,${accent},${accent}30)`}}/>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
      <div>
        <div style={{fontSize:14,fontWeight:700,color:C.dark}}>{title}</div>
        {sub&&<div style={{fontSize:11,color:C.light,marginTop:2}}>{sub}</div>}
      </div>
      <div style={{width:32,height:32,borderRadius:9,flexShrink:0,
        background:`${accent}15`,border:`1px solid ${accent}25`,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Ico d={icon} size={14} color={accent}/>
      </div>
    </div>
    {children}
  </div>
);

const StatCard=({label,value,sub,color,icon,delay})=>(
  <div style={{background:C.white,borderRadius:14,padding:"16px 18px",
    border:`1.5px solid ${C.gray}`,animation:`fadeUp .35s ${delay}ms ease both`}}>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
      <div>
        <div style={{fontSize:10,color:C.light,fontWeight:600,textTransform:"uppercase",
          letterSpacing:"0.7px",marginBottom:6}}>{label}</div>
        <div style={{fontSize:28,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{value}</div>
        {sub&&<div style={{fontSize:11,color:C.light,marginTop:4}}>{sub}</div>}
      </div>
      <div style={{width:40,height:40,borderRadius:11,background:`${color}15`,
        border:`1px solid ${color}25`,flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Ico d={icon} size={18} color={color}/>
      </div>
    </div>
    <div style={{marginTop:12,height:3,borderRadius:2,background:C.gray}}>
      <div style={{height:"100%",borderRadius:2,
        background:`linear-gradient(90deg,${color},${color}55)`,width:"70%"}}/>
    </div>
  </div>
);

const HBar=({data,vk="value",nk="name",colors=PALETTE})=>(
  <div style={{display:"flex",flexDirection:"column",gap:9}}>
    {data.map((d,i)=>{
      const max=Math.max(...data.map(x=>x[vk]));
      const pct=max>0?(d[vk]/max)*100:0;
      const col=colors[i%colors.length];
      return(
        <div key={i}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:11}}>
            <span style={{color:C.dark,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",
              whiteSpace:"nowrap",maxWidth:"76%"}}>{d[nk]}</span>
            <span style={{color:col,fontWeight:800,fontFamily:"'Syne',sans-serif",flexShrink:0}}>{d[vk]}</span>
          </div>
          <div style={{height:7,borderRadius:4,background:C.lightGray,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,width:`${pct}%`,
              background:`linear-gradient(90deg,${col},${col}70)`,transition:"width .8s ease"}}/>
          </div>
        </div>
      );
    })}
  </div>
);

function Chip({label,onRemove}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,
      padding:"3px 8px 3px 10px",borderRadius:20,
      background:C.lightBlue,border:`1px solid ${C.bright}25`}}>
      <span style={{fontSize:11,fontWeight:600,color:C.bright}}>{label}</span>
      <button onClick={onRemove}
        style={{width:15,height:15,borderRadius:"50%",border:"none",cursor:"pointer",
          background:`${C.bright}20`,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
        <Ico d={I.x} size={8} color={C.bright}/>
      </button>
    </span>
  );
}

const TABS=[
  {id:"overview",  label:"Umumiy",        icon:I.bar},
  {id:"subjects",  label:"Fanlar",         icon:I.book},
  {id:"resources", label:"Resurslar",      icon:I.layers},
  {id:"employees", label:"O'qituvchilar",  icon:I.users},
  {id:"files",     label:"Fayllar",        icon:I.file},
];

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function SubjectResourceAnalytics(){
  const [tab,       setTab]      = useState("overview");
  const [fFac,      setFFac]     = useState("");
  const [fDept,     setFDept]    = useState("");
  const [fEmp,      setFEmp]     = useState("");
  const [fGrp,      setFGrp]     = useState("");
  const [fLang,     setFLang]    = useState("");
  const [fEdu,      setFEdu]     = useState("");
  const [toast,     setToast]    = useState(null);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),3000);};

  const availDepts=useMemo(()=>fFac?DEPARTMENTS.filter(d=>d.facultyId===Number(fFac)):DEPARTMENTS,[fFac]);

  const filtered=useMemo(()=>RAW.filter(r=>{
    if(fFac  && r.facultyId!==Number(fFac))   return false;
    if(fDept && r.deptId!==Number(fDept))      return false;
    if(fEmp  && r.employeeId!==Number(fEmp))   return false;
    if(fGrp  && r.groupId!==Number(fGrp))      return false;
    if(fLang && !r.langCodes.includes(fLang))  return false;
    if(fEdu  && r.eduTypeCode!==fEdu)          return false;
    return true;
  }),[fFac,fDept,fEmp,fGrp,fLang,fEdu]);

  const A=useMemo(()=>buildA(filtered),[filtered]);
  const hasFilter=fFac||fDept||fEmp||fGrp||fLang||fEdu;
  const clearAll=()=>{setFFac("");setFDept("");setFEmp("");setFGrp("");setFLang("");setFEdu("");};

  return(
    <>
      <style>{css}</style>

      {toast&&(
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background:C.white,borderLeft:`4px solid ${C.green}`,borderRadius:10,
          padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark,
          animation:"fadeUp .3s ease"}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast}
        </div>
      )}

      <div style={{padding:"24px 28px",maxWidth:1400,margin:"0 auto"}}>

        {/* HEADER */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,
              fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              O'quv Resurslar Hisoboti
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Ko'rsatilmoqda:{" "}
              <b style={{color:C.dark}}>{filtered.length}</b> ta mavzu •{" "}
              Server jami:{" "}
              <b style={{color:C.bright}}>{TOTAL_SERVER.toLocaleString()}</b>
              {hasFilter&&(
                <span style={{marginLeft:8,fontSize:11,fontWeight:700,padding:"2px 9px",
                  borderRadius:20,background:C.orangeLight,color:C.orange}}>
                  ● Filter faol
                </span>
              )}
            </p>
          </div>
          <button onClick={()=>showToast("Excel eksport so'rovi yuborildi")}
            style={{padding:"10px 22px",borderRadius:10,border:"none",cursor:"pointer",
              fontFamily:"inherit",fontSize:13,fontWeight:700,
              background:`linear-gradient(135deg,${C.green},#15803d)`,color:C.white,
              display:"flex",alignItems:"center",gap:8,
              boxShadow:`0 4px 14px ${C.green}35`}}>
            <Ico d={I.excel} size={15} color={C.white}/>
            Excel eksport
            <Ico d={I.download} size={13} color={C.white}/>
          </button>
        </div>

        {/* FILTER PANEL */}
        <div style={{background:C.white,borderRadius:14,border:`1.5px solid ${C.gray}`,
          padding:"14px 18px",marginBottom:20,animation:"fadeUp .3s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <Ico d={I.filter} size={13} color={C.mid}/>
            <span style={{fontSize:11,fontWeight:700,color:C.mid,textTransform:"uppercase",
              letterSpacing:"0.7px"}}>Filtrlar</span>
            {hasFilter&&(
              <button onClick={clearAll}
                style={{marginLeft:"auto",padding:"4px 10px",borderRadius:7,
                  border:`1.5px solid ${C.red}25`,cursor:"pointer",
                  fontFamily:"inherit",fontSize:11,fontWeight:600,
                  background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:4}}>
                <Ico d={I.x} size={10} color={C.red}/>Barchasini tozalash
              </button>
            )}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            <Sel value={fFac} onChange={e=>{setFFac(e.target.value);setFDept("");}}>
              <option value="">Barcha fakultetlar</option>
              {FACULTIES.map(f=><option key={f.id} value={f.id}>{f.code} — {f.name}</option>)}
            </Sel>
            <Sel value={fDept} onChange={e=>setFDept(e.target.value)}>
              <option value="">Barcha kafedralar</option>
              {availDepts.map(d=><option key={d.id} value={d.id}>{d.code} — {d.name}</option>)}
            </Sel>
            <Sel value={fEmp} onChange={e=>setFEmp(e.target.value)}>
              <option value="">Barcha o'qituvchilar</option>
              {EMPLOYEES.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
            </Sel>
            <Sel value={fGrp} onChange={e=>setFGrp(e.target.value)}>
              <option value="">Barcha guruhlar</option>
              {GROUPS.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}
            </Sel>
            <Sel value={fLang} onChange={e=>setFLang(e.target.value)}>
              <option value="">Barcha tillar</option>
              {LANGS.map(l=><option key={l.code} value={l.code}>{l.name}</option>)}
            </Sel>
            <Sel value={fEdu} onChange={e=>setFEdu(e.target.value)}>
              <option value="">O'qish shakli</option>
              {EDU_TYPES.map(e=><option key={e.code} value={e.code}>{e.name}</option>)}
            </Sel>
          </div>

          {/* active chips */}
          {hasFilter&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>
              {fFac&&(()=>{const f=FACULTIES.find(x=>x.id===Number(fFac));return<Chip key="fac" label={`Fakultet: ${f?.code}`} onRemove={()=>setFFac("")}/>;})()}
              {fDept&&(()=>{const d=DEPARTMENTS.find(x=>x.id===Number(fDept));return<Chip key="dept" label={`Kafedra: ${d?.code}`} onRemove={()=>setFDept("")}/>;})()}
              {fEmp&&(()=>{const e=EMPLOYEES.find(x=>x.id===Number(fEmp));return<Chip key="emp" label={`O'qituvchi: ${e?.name}`} onRemove={()=>setFEmp("")}/>;})()}
              {fGrp&&(()=>{const g=GROUPS.find(x=>x.id===Number(fGrp));return<Chip key="grp" label={`Guruh: ${g?.name}`} onRemove={()=>setFGrp("")}/>;})()}
              {fLang&&(()=>{const l=LANGS.find(x=>x.code===fLang);return<Chip key="lang" label={`Til: ${l?.name}`} onRemove={()=>setFLang("")}/>;})()}
              {fEdu&&(()=>{const e=EDU_TYPES.find(x=>x.code===fEdu);return<Chip key="edu" label={`Shakl: ${e?.name}`} onRemove={()=>setFEdu("")}/>;})()}
            </div>
          )}
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{padding:"8px 18px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,transition:"all .15s",
                display:"flex",alignItems:"center",gap:6,
                background:tab===t.id?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                color:tab===t.id?C.white:C.mid,
                outline:`1.5px solid ${tab===t.id?C.bright:C.gray}`,
                boxShadow:tab===t.id?`0 4px 12px ${C.bright}30`:"none"}}>
              <Ico d={t.icon} size={13} color={tab===t.id?C.white:C.light}/>
              {t.label}
            </button>
          ))}
          <div style={{marginLeft:"auto",fontSize:11,color:C.light,
            display:"flex",alignItems:"center",gap:5}}>
            <Ico d={I.refresh} size={12} color={C.light}/>
            Real vaqt filtr
          </div>
        </div>

        {/* EMPTY */}
        {filtered.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1.5px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.layers} size={44} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>
              Filtr bo'yicha ma'lumot topilmadi
            </div>
            <button onClick={clearAll}
              style={{marginTop:12,padding:"8px 20px",borderRadius:10,
                border:`1.5px solid ${C.bright}`,cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:C.lightBlue,color:C.bright}}>
              Filtrlarni tozalash
            </button>
          </div>
        )}

        {filtered.length>0&&(
          <>
            {/* ─── OVERVIEW ─── */}
            {tab==="overview"&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
                <StatCard label="Jami mavzular"  value={A.totalTopics} sub={`${filtered.length} ta filtrlangan`} color={C.bright}  icon={I.book}  delay={0}/>
                <StatCard label="Jami fayllar"   value={A.totalFiles}  sub="Yuklangan materiallar"              color={C.teal}    icon={I.file}  delay={60}/>
                <StatCard label="Umumiy hajm"    value={fmtSize(A.totalSize)} sub="Barcha fayllar"             color={C.purple}  icon={I.db}    delay={120}/>
                <StatCard label="O'qituvchilar"  value={A.byEmp.length} sub="Faol mualliflar"                  color={C.orange}  icon={I.users} delay={180}/>

                <Card title="Fanga ko'ra mavzu va fayl soni" icon={I.bar}
                  sub="Yuklangan mavzular va fayllar" span={3} delay={100} accent={C.bright}>
                  <ResponsiveContainer width="100%" height={230}>
                    <BarChart data={A.bySubject} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="28%">
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="code" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                      <Bar dataKey="topics" name="Mavzular" fill={C.bright} radius={[5,5,0,0]}/>
                      <Bar dataKey="files"  name="Fayllar"  fill={C.teal}   radius={[5,5,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Fayl qamrovi" icon={I.pie}
                  sub="Fayl bor / yo'q" span={1} delay={150} accent={C.green}>
                  <ResponsiveContainer width="100%" height={190}>
                    <PieChart>
                      <Pie data={A.coverage} cx="50%" cy="44%" innerRadius={48} outerRadius={72}
                        paddingAngle={4} dataKey="value">
                        <Cell fill={C.green} stroke="none"/>
                        <Cell fill={C.red}   stroke="none"/>
                      </Pie>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:4}}>
                    {A.coverage.map((d,i)=>(
                      <div key={i} style={{textAlign:"center"}}>
                        <div style={{fontSize:20,fontWeight:800,fontFamily:"'Syne',sans-serif",
                          color:i===0?C.green:C.red}}>{d.value}</div>
                        <div style={{fontSize:10,color:C.light}}>{d.name}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card title="Yuklash faolligi — sanalar bo'yicha" icon={I.area}
                  sub="Kunlik mavzu va fayl yuklanishi" span={4} delay={200} accent={C.teal}>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={A.timeline} margin={{top:4,right:8,left:-12,bottom:0}}>
                      <defs>
                        <linearGradient id="gU" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={C.bright} stopOpacity={0.15}/>
                          <stop offset="95%" stopColor={C.bright} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={C.teal} stopOpacity={0.15}/>
                          <stop offset="95%" stopColor={C.teal} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="date" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                      <Area type="monotone" dataKey="uploads" name="Mavzular" stroke={C.bright} fill="url(#gU)" strokeWidth={2.5}/>
                      <Area type="monotone" dataKey="files"   name="Fayllar"  stroke={C.teal}   fill="url(#gF)" strokeWidth={2.5}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            )}

            {/* ─── SUBJECTS ─── */}
            {tab==="subjects"&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                <Card title="Fanga ko'ra mavzu soni" icon={I.book}
                  sub="Progress bar ko'rinishi" span={2} delay={0} accent={C.bright}>
                  <HBar data={A.bySubject} vk="topics" nk="fullName"/>
                </Card>

                <Card title="Fan → Fayl ulushi" icon={I.pie}
                  sub="Fayl taqsimoti" span={1} delay={60} accent={C.teal}>
                  <ResponsiveContainer width="100%" height={270}>
                    <PieChart>
                      <Pie data={A.bySubject.map(s=>({name:s.code,value:s.files}))}
                        cx="50%" cy="44%" innerRadius={46} outerRadius={80} paddingAngle={3} dataKey="value">
                        {A.bySubject.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]} stroke="none"/>)}
                      </Pie>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:10,color:C.mid}}/>
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Fanga ko'ra fayl hajmi (MB)" icon={I.db}
                  sub="Umumiy yuklangan hajm" span={3} delay={120} accent={C.purple}>
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart data={A.bySubject.map(s=>({...s,MB:parseFloat((s.size/1048576).toFixed(2))}))}
                      margin={{top:4,right:8,left:-12,bottom:4}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="name" tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}MB`}/>
                      <Tooltip content={<CT/>}/>
                      <Bar dataKey="MB" name="Hajm (MB)" radius={[5,5,0,0]}>
                        {A.bySubject.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Radar: Top 5 fan taqqoslash" icon={I.radar}
                  sub="Mavzu, fayl, hajm mezonlari" span={2} delay={160} accent={C.purple}>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={A.radar} cx="50%" cy="50%" outerRadius={90}>
                      <PolarGrid stroke={C.gray}/>
                      <PolarAngleAxis dataKey="subject" tick={{fill:C.mid,fontSize:11}}/>
                      <PolarRadiusAxis stroke={C.gray} tick={{fill:C.light,fontSize:9}}/>
                      <Radar name="Mavzular" dataKey="Mavzular" stroke={C.bright} fill={C.bright} fillOpacity={0.15}/>
                      <Radar name="Fayllar"  dataKey="Fayllar"  stroke={C.teal}   fill={C.teal}   fillOpacity={0.15}/>
                      <Radar name="Hajm"     dataKey="Hajm(×MB)" stroke={C.purple} fill={C.purple} fillOpacity={0.15}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                      <Tooltip content={<CT/>}/>
                    </RadarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Fayl yuklanmagan mavzular" icon={I.file}
                  sub="Mavzularda fayl yo'q" span={1} delay={200} accent={C.red}>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {A.bySubject.filter(s=>s.noFile>0).length===0
                      ?(
                        <div style={{textAlign:"center",padding:"24px 0",color:C.green}}>
                          <Ico d={I.check} size={30} color={C.green}/>
                          <div style={{fontSize:12,marginTop:8,fontWeight:600}}>
                            Hamma mavzularda fayl bor!
                          </div>
                        </div>
                      )
                      :A.bySubject.filter(s=>s.noFile>0).map((s,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:9,
                          padding:"8px 10px",borderRadius:9,
                          background:C.redLight,border:`1px solid ${C.red}20`}}>
                          <div style={{width:7,height:7,borderRadius:"50%",background:C.red,flexShrink:0}}/>
                          <span style={{fontSize:11,color:C.dark,flex:1,overflow:"hidden",
                            textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.code}</span>
                          <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,
                            fontWeight:800,color:C.red}}>{s.noFile}</span>
                        </div>
                      ))
                    }
                  </div>
                </Card>
              </div>
            )}

            {/* ─── RESOURCES ─── */}
            {tab==="resources"&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                <Card title="Resurs turi bo'yicha" icon={I.bar}
                  sub="Har bir resurs turidan nechta mavzu" span={2} delay={0} accent={C.orange}>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={A.byRes} margin={{top:4,right:8,left:-12,bottom:4}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="name" tick={{fill:C.light,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Bar dataKey="value" name="Mavzu soni" radius={[6,6,0,0]}>
                        {A.byRes.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Resurs turi ulushi" icon={I.pie}
                  sub="Nisbiy taqsimot" span={1} delay={60} accent={C.yellow}>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={A.byRes} cx="50%" cy="44%" outerRadius={78} paddingAngle={3} dataKey="value">
                        {A.byRes.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]} stroke="none"/>)}
                      </Pie>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:10,color:C.mid}}/>
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Dars turi bo'yicha mavzu/fayl" icon={I.bar}
                  sub="Ma'ruza, Amaliy va boshqa" span={2} delay={120} accent={C.teal}>
                  <ResponsiveContainer width="100%" height={195}>
                    <BarChart data={A.byTrain} margin={{top:4,right:8,left:-12,bottom:4}} barCategoryGap="30%">
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="name" tick={{fill:C.light,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                      <Bar dataKey="topics" name="Mavzular" fill={C.teal}   radius={[5,5,0,0]}/>
                      <Bar dataKey="files"  name="Fayllar"  fill={C.bright} radius={[5,5,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Til bo'yicha taqsimot" icon={I.globe}
                  sub="O'zbek, Rus, Qoraqalpoq" span={1} delay={160} accent={C.green}>
                  <ResponsiveContainer width="100%" height={195}>
                    <PieChart>
                      <Pie data={A.byLang} cx="50%" cy="44%" innerRadius={40} outerRadius={70}
                        paddingAngle={4} dataKey="value">
                        {A.byLang.map((_,i)=><Cell key={i} fill={[C.green,C.red,C.purple][i%3]} stroke="none"/>)}
                      </Pie>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Fakultet bo'yicha material" icon={I.layers}
                  sub="Qaysi fakultetda ko'p material" span={3} delay={200} accent={C.navy}>
                  <HBar data={A.byFac} vk="topics" nk="fullName" colors={[C.bright,C.teal,C.purple,C.orange]}/>
                </Card>
              </div>
            )}

            {/* ─── EMPLOYEES ─── */}
            {tab==="employees"&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                <Card title="O'qituvchi bo'yicha mavzu soni" icon={I.users}
                  sub="Kim ko'proq material yuklagan" span={2} delay={0} accent={C.teal}>
                  <HBar data={A.byEmp} vk="topics" nk="name"/>
                </Card>

                <Card title="Fayl / Mavzu nisbati" icon={I.bar}
                  sub="Har bir mavzuga nechta fayl" span={1} delay={80} accent={C.purple}>
                  <div style={{display:"flex",flexDirection:"column",gap:9}}>
                    {A.byEmp.map((e,i)=>{
                      const ratio=e.topics>0?(e.files/e.topics).toFixed(1):0;
                      const pct=Math.min(100,(e.files/e.topics)*50);
                      const col=PALETTE[i%PALETTE.length];
                      return(
                        <div key={i}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:11}}>
                            <span style={{color:C.dark,overflow:"hidden",textOverflow:"ellipsis",
                              whiteSpace:"nowrap",maxWidth:"72%"}}>{e.name}</span>
                            <span style={{color:col,fontWeight:800,fontFamily:"'Syne',sans-serif",flexShrink:0}}>
                              {ratio}×
                            </span>
                          </div>
                          <div style={{height:6,borderRadius:3,background:C.lightGray}}>
                            <div style={{height:"100%",borderRadius:3,width:`${pct}%`,
                              background:`linear-gradient(90deg,${col},${col}70)`}}/>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card title="O'qituvchi bo'yicha umumiy hajm" icon={I.db}
                  sub="Nechta MB material yuklagan" span={3} delay={140} accent={C.orange}>
                  <ResponsiveContainer width="100%" height={185}>
                    <BarChart data={A.byEmp.map(e=>({...e,MB:parseFloat((e.size/1048576).toFixed(2))}))}
                      margin={{top:4,right:8,left:-12,bottom:4}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="name" tick={{fill:C.light,fontSize:9}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}MB`}/>
                      <Tooltip content={<CT/>}/>
                      <Bar dataKey="MB" name="Hajm (MB)" radius={[5,5,0,0]}>
                        {A.byEmp.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            )}

            {/* ─── FILES ─── */}
            {tab==="files"&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                <Card title="Fayl formati taqsimoti" icon={I.file}
                  sub=".docx, .pdf, .png va boshqalar" span={2} delay={0} accent={C.yellow}>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={A.byExt} margin={{top:4,right:8,left:-12,bottom:4}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="name" tick={{fill:C.light,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Bar dataKey="value" name="Fayl soni" radius={[7,7,0,0]}>
                        {A.byExt.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Format ulushi" icon={I.pie}
                  sub="Eng ko'p ishlatiladigan formatlar" span={1} delay={60} accent={C.orange}>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={A.byExt} cx="50%" cy="44%" outerRadius={76} paddingAngle={3} dataKey="value">
                        {A.byExt.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]} stroke="none"/>)}
                      </Pie>
                      <Tooltip content={<CT/>}/>
                      <Legend wrapperStyle={{fontSize:11,color:C.mid}}/>
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Format bo'yicha umumiy hajm" icon={I.db}
                  sub="Qaysi format ko'p joy egallaydi" span={2} delay={120} accent={C.pink}>
                  <ResponsiveContainer width="100%" height={185}>
                    <BarChart data={A.byExt.map(e=>({...e,MB:parseFloat((e.size/1048576).toFixed(2))}))}
                      margin={{top:4,right:8,left:-12,bottom:4}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray} vertical={false}/>
                      <XAxis dataKey="name" tick={{fill:C.light,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.light,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}MB`}/>
                      <Tooltip content={<CT/>}/>
                      <Bar dataKey="MB" name="Hajm (MB)" radius={[5,5,0,0]}>
                        {A.byExt.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="Umumiy statistika" icon={I.bar}
                  sub="Yig'ma ko'rsatkichlar" span={1} delay={160} accent={C.green}>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {[
                      {l:"Jami mavzular",       v:A.totalTopics,        c:C.bright},
                      {l:"Jami fayllar",         v:A.totalFiles,         c:C.teal},
                      {l:"Fayl bor",             v:A.withFile,           c:C.green},
                      {l:"Fayl yo'q",            v:A.noFile,             c:C.red},
                      {l:"O'rtacha fayl/mavzu",  v:`${A.avgFiles}×`,     c:C.yellow},
                      {l:"Umumiy hajm",          v:fmtSize(A.totalSize), c:C.purple},
                    ].map((s,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",
                        padding:"8px 10px",borderRadius:9,
                        background:`${s.c}0D`,border:`1px solid ${s.c}18`}}>
                        <span style={{fontSize:11,color:C.mid}}>{s.l}</span>
                        <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,
                          fontWeight:800,color:s.c}}>{s.v}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
