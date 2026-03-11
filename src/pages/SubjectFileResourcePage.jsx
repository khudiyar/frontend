import { useState, useMemo } from "react";

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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.lightGray}}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico = ({d,size=16,color="currentColor",sw=2})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  plus:     "M12 5v14M5 12h14",
  chevD:    "M6 9l6 6 6-6",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  file:     "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M13 2v7h7",
  pdf:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6M9 9h1",
  image:    "M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h4l2 3h4a2 2 0 0 1 2 2z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  video:    "M23 7l-7 5 7 5V7z M1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  globe:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  link:     "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  folder:   "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  trash:    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
};

/* ── RESOURCE TYPE ── */
const RES = {
  "10": {name:"Boshqa material", color:C.mid,    bg:C.lightGray,  short:"Boshqa"},
  "11": {name:"Video material",  color:C.red,    bg:C.redLight,   short:"Video"},
  "12": {name:"Audio material",  color:C.orange, bg:C.orangeLight,short:"Audio"},
  "13": {name:"Taqdimot",        color:C.purple, bg:C.purpleLight,short:"Taqdim"},
  "14": {name:"O'quv material",  color:C.bright, bg:C.lightBlue,  short:"O'quv"},
  "15": {name:"Test material",   color:C.green,  bg:C.greenLight, short:"Test"},
};
const getRes = code => RES[code] || {name:code, color:C.mid, bg:C.lightGray, short:"?"};

/* ── TRAINING TYPE ── */
const TRAIN = {
  "11": {name:"Ma'ruza", color:C.bright, bg:C.lightBlue},
  "12": {name:"Lab",     color:C.green,  bg:C.greenLight},
  "13": {name:"Amaliy",  color:C.purple, bg:C.purpleLight},
  "14": {name:"Seminar", color:C.teal,   bg:C.tealLight},
};
const getTrain = code => TRAIN[code] || {name:code, color:C.mid, bg:C.lightGray};

/* ── LANG ── */
const LANG = {"11":"🇺🇿","12":"🇷🇺","13":"🌐"};

/* ── FILE TYPE helpers ── */
const fileExt  = name => (name.split(".").pop()||"").toLowerCase();
const fmtSize  = bytes => {
  const b = Number(bytes);
  if(b >= 1048576) return `${(b/1048576).toFixed(1)} MB`;
  if(b >= 1024)    return `${(b/1024).toFixed(0)} KB`;
  return `${b} B`;
};
const fileIcon = ext => {
  if(["pdf"].includes(ext))               return {d:I.pdf,   color:"#DC2626", bg:"#FEF2F2"};
  if(["docx","doc","txt"].includes(ext))  return {d:I.file,  color:"#2845D6", bg:"#EEF2FF"};
  if(["png","jpg","jpeg","gif"].includes(ext)) return {d:I.image, color:"#D97706", bg:"#FFFBEB"};
  if(["mp4","avi","mov"].includes(ext))   return {d:I.video, color:"#DC2626", bg:"#FEF2F2"};
  return {d:I.file, color:C.mid, bg:C.lightGray};
};

/* ── subject color cycle ── */
const SUBJ_COLORS = [C.bright,C.purple,C.teal,C.orange,C.green,C.red,C.pink,C.navy];
const subjColor   = id => SUBJ_COLORS[id % SUBJ_COLORS.length];

/* ── format timestamp ── */
const fmtTs = ts => {
  const d = new Date(ts*1000);
  return `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}.${d.getFullYear()}`;
};

/* ── REAL DATA ── */
const RAW = [
  {id:88698,title:"Ideal aralashtirish va ideal siqib chiqarish.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93048,comment:"Ideal aralashtirish va siqib chiqarish",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"3-Maruza.docx",size:"89822",url:"https://hemis.nukusstu.uz/static/files/92/4%20(sirtqi)-kurs%20modellestiriw/3-Maruza.docx"}],updated_at:1772890786}],active:true,updated_at:1772890786},
  {id:88697,title:"Apparatda bo'lish vaqti bo'yicha oqim elementlari taqsimlanishining asosiy tavsiflari",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93047,comment:"Apparatda bo'lish vaqti...",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"2-Maruza .pdf",size:"527849",url:"https://hemis.nukusstu.uz/static/files/92/4%20(sirtqi)-kurs%20modellestiriw/2-Maruza%20.pdf"}],updated_at:1772890740}],active:true,updated_at:1772890740},
  {id:88696,title:"SANOAT APPARATLARIDA OQIM ZARRALARINI VAQT BO'YICHA TAQSIMLANISH NOTEKISLIGINING ENG MUHIM MANBALARI",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93046,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"1-Maruza.docx",size:"22801",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/1-Maruza.docx"}],updated_at:1772890702}],active:true,updated_at:1772890702},
  {id:88695,title:"Identifikatsiyalash masalasini qo'yilishi va obyektlarni identifikatsiyalash muammolari.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93045,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"6-Maruza. Identifikatsiyalash.pdf",size:"569765",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/6-Maruza.%20Identifikatsiyalash%20masalasini%20qo'yilishi.pdf"}],updated_at:1772890535}],active:true,updated_at:1772890535},
  {id:88694,title:"Klassik usuli bilan minimallashtirish ketma-ketligi.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93044,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"5-maruza. Klassik usuli.docx",size:"30374",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/5-maruza.%20Klassik%20usuli%20bilan%20minimallashtirish.docx"}],updated_at:1772890509}],active:true,updated_at:1772890509},
  {id:88693,title:"Optimiallashtrish masalalari.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93043,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"4-Maruza. Optimallashtirish.pdf",size:"552811",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/4-Maruza.%20Optimallashtirish%20masalasinin'%20qoyilishi.pdf"}],updated_at:1772890482}],active:true,updated_at:1772890482},
  {id:88692,title:"To'g'ri oqimli 'quvur ichida quvur' isiqlik almashish apparatlarining matematik tavsifini va uning echim algoritmini tuzish.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93042,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"3-Maruza. Togri_oqimli.pdf",size:"602151",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/3-Maruza.%20To'g'ri_oqimli_'quvur_ichida_quvur'_issiqlik_almashish_apparatlari.pdf"}],updated_at:1772890454}],active:true,updated_at:1772890454},
  {id:88691,title:"Rektifikatsiya kolonnalarining boshlang'ich aralashmalarining obi–quvurli qizdirgichlarini hisoblash.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93041,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"2-Maruza. Rektifikatsiya.pdf",size:"710874",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/2-Maruza.%20Tarelkali_kollonnalardagi_ko'p_komponentli_uzluksiz_rektifikatsiya.pdf"}],updated_at:1772890423}],active:true,updated_at:1772890423},
  {id:88690,title:"Konveksiya-diffuziya va issiqlik o'tkazuvchanlik tenglamalari.",comment:null,subject:{id:188,code:"TJMPOM1306",name:"Texnologik jarayonlarni modellashtirish va optimallashtirish asoslari",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:91,name:"KAZAXBAEV S. A."},subjectFileResourceItems:[{id:93040,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"1-Maruza Konveksiya-diffuziya.docx",size:"45799",url:"https://hemis.nukusstu.uz/static/files/92/4-kurs%20modellestiriw/1-Maruza%20Konveksiya%20-diffuziya%20va%20issiqlik%20o'tkazuvchanlik%20tenglamalari.docx"}],updated_at:1772890387}],active:true,updated_at:1772890387},
  {id:88689,title:"Motorlar hám aktuatorlar menen islew",comment:null,subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"13",name:"Qoraqalpoq"}],employee:{id:159,name:"YESBERGENOV D. M."},subjectFileResourceItems:[{id:93039,comment:"",resourceType:{code:"10",name:"Boshqa material"},url:"",files:[{name:"15 lekciya kk.docx",size:"2529986",url:"https://hemis.nukusstu.uz/static/files/162/mex%20mod%20konstrukc/15%20lekciya%20kk.docx"}],updated_at:1772887459}],active:true,updated_at:1772887459},
  {id:88688,title:"Mexatronik modullerde signaldı qayta islew hám filtrlew",comment:null,subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"13",name:"Qoraqalpoq"}],employee:{id:159,name:"YESBERGENOV D. M."},subjectFileResourceItems:[{id:93038,comment:"",resourceType:{code:"10",name:"Boshqa material"},url:"",files:[{name:"14 lekciya kk.docx",size:"785308",url:"https://hemis.nukusstu.uz/static/files/162/mex%20mod%20konstrukc/14%20lekciya%20kk.docx"}],updated_at:1772887407}],active:true,updated_at:1772887407},
  {id:88687,title:"Elektron hám basqarıw sistemaların joybarlaw",comment:null,subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"13",name:"Qoraqalpoq"}],employee:{id:159,name:"YESBERGENOV D. M."},subjectFileResourceItems:[{id:93037,comment:"",resourceType:{code:"10",name:"Boshqa material"},url:"",files:[{name:"13 lekciya kk.docx",size:"555035",url:"https://hemis.nukusstu.uz/static/files/162/mex%20mod%20konstrukc/13%20lekciya%20kk.docx"}],updated_at:1772887343}],active:true,updated_at:1772887343},
  {id:88686,title:"Tisli uzatpalar hám suwıtıw sistemaları",comment:null,subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"13",name:"Qoraqalpoq"}],employee:{id:159,name:"YESBERGENOV D. M."},subjectFileResourceItems:[{id:93036,comment:"",resourceType:{code:"10",name:"Boshqa material"},url:"",files:[{name:"12 lekciya kk.docx",size:"870180",url:"https://hemis.nukusstu.uz/static/files/162/mex%20mod%20konstrukc/12%20lekciya%20kk.docx"}],updated_at:1772887296}],active:true,updated_at:1772887296},
  {id:88685,title:"Dvigateller hám aktuatorlar • DC motorlar.",comment:null,subject:{id:870,code:"MMK14508",name:"Mexatron modullarni konstruksiyalash",in_curriculum:true},trainingType:{code:"11",name:"Ma'ruza"},languages:[{code:"13",name:"Qoraqalpoq"}],employee:{id:159,name:"YESBERGENOV D. M."},subjectFileResourceItems:[{id:93035,comment:"",resourceType:{code:"10",name:"Boshqa material"},url:"",files:[{name:"11 lekciya kk.docx",size:"2706421",url:"https://hemis.nukusstu.uz/static/files/162/mex%20mod%20konstrukc/11%20lekciya%20kk.docx"}],updated_at:1772887245}],active:true,updated_at:1772887245},
  {id:88684,title:"15-Amaliy ish",comment:null,subject:{id:908,code:"EMBS16MBK*",name:"O'rnatilgan tizimlar",in_curriculum:true},trainingType:{code:"13",name:"Amaliy"},languages:[{code:"11",name:"O'zbek"}],employee:{id:105,name:"BAYNAZAROV A. Y."},subjectFileResourceItems:[{id:93034,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"15-Amaliy ishi uz.docx",size:"1276366",url:"https://hemis.nukusstu.uz/static/files/106/15-Amaliy%20ishi%20uz.docx"}],updated_at:1772887156}],active:true,updated_at:1772887156},
  {id:88683,title:"Topic: What are you up to? Grammar: Present Simple and Continuous",comment:null,subject:{id:185,code:"XT1408",name:"Xorijiy til",in_curriculum:true},trainingType:{code:"13",name:"Amaliy"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:144,name:"ADILOVA N. N."},subjectFileResourceItems:[{id:93033,comment:"",resourceType:{code:"14",name:"O'quv material"},url:"",files:[{name:"260307-162918.png",size:"20630",url:"https://hemis.nukusstu.uz/static/files/354/EM-25%201Kurs/260307-162918.png"}],updated_at:1772882963}],active:true,updated_at:1772882963},
  {id:88682,title:"Topic: Town and country Grammar: Prepositions of movement",comment:null,subject:{id:185,code:"XT1408",name:"Xorijiy til",in_curriculum:true},trainingType:{code:"13",name:"Amaliy"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:144,name:"ADILOVA N. N."},subjectFileResourceItems:[{id:93032,comment:"",resourceType:{code:"11",name:"Video material"},url:"",files:[{name:"260307-162740.png",size:"19998",url:"https://hemis.nukusstu.uz/static/files/354/EM-25%201Kurs/260307-162740.png"}],updated_at:1772882865}],active:true,updated_at:1772882865},
  {id:88681,title:"Topic: Everyday English (Shopping)",comment:null,subject:{id:185,code:"XT1408",name:"Xorijiy til",in_curriculum:true},trainingType:{code:"13",name:"Amaliy"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:144,name:"ADILOVA N. N."},subjectFileResourceItems:[{id:93031,comment:"",resourceType:{code:"11",name:"Video material"},url:"",files:[{name:"260307-162552.png",size:"761884",url:"https://hemis.nukusstu.uz/static/files/354/EM-25%201Kurs/260307-162552.png"}],updated_at:1772882761}],active:true,updated_at:1772882761},
  {id:88680,title:"Topic: Daily needs Grammar: a, an or some",comment:null,subject:{id:185,code:"XT1408",name:"Xorijiy til",in_curriculum:true},trainingType:{code:"13",name:"Amaliy"},languages:[{code:"11",name:"O'zbek"},{code:"13",name:"Qoraqalpoq"}],employee:{id:144,name:"ADILOVA N. N."},subjectFileResourceItems:[{id:93030,comment:"",resourceType:{code:"11",name:"Video material"},url:"",files:[{name:"260307-162444.png",size:"31676",url:"https://hemis.nukusstu.uz/static/files/354/EM-25%201Kurs/260307-162444.png"}],updated_at:1772882689}],active:true,updated_at:1772882688},
  {id:88679,title:"12. Научный стиль речи и его особенности. Лексическая тема: Наука и общество.",comment:null,subject:{id:318,code:"O'RT1204",name:"O'zbek (rus, qoraqalpoq) tili",in_curriculum:true},trainingType:{code:"13",name:"Amaliy"},languages:[{code:"12",name:"Rus"}],employee:{id:34,name:"URAZOVA A. A."},subjectFileResourceItems:[],active:true,updated_at:1772882501},
];

const TOTAL = 85731;

/* ── enrich each item ── */
const DATA = RAW.map(r => {
  const allFiles = r.subjectFileResourceItems.flatMap(ri => ri.files||[]);
  const resType  = r.subjectFileResourceItems[0]?.resourceType || null;
  const totalSize = allFiles.reduce((s,f)=>s+Number(f.size||0),0);
  return {...r, allFiles, resType, totalSize};
});

/* ── unique subjects ── */
const SUBJECTS = (() => {
  const m={};
  DATA.forEach(r=>{ if(!m[r.subject.id]) m[r.subject.id]=r.subject; });
  return Object.values(m);
})();

/* ── unique employees ── */
const EMPLOYEES = (() => {
  const m={};
  DATA.forEach(r=>{ if(!m[r.employee.id]) m[r.employee.id]=r.employee; });
  return Object.values(m);
})();

const Sel = ({value,onChange,children,style={}}) => (
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 28px 8px 12px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:13,
        color:value?C.dark:C.light,background:C.white,cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={13} color={C.light}/>
    </div>
  </div>
);

/* ── FILE CHIP ── */
function FileChip({file, compact=false}) {
  const ext = fileExt(file.name);
  const fi  = fileIcon(ext);
  return (
    <a href={file.url} target="_blank" rel="noreferrer"
      style={{display:"inline-flex",alignItems:"center",gap:compact?5:7,
        padding:compact?"5px 9px":"7px 12px",borderRadius:compact?8:10,
        background:fi.bg,border:`1.5px solid ${fi.color}20`,
        textDecoration:"none",cursor:"pointer",transition:"all 0.15s",flexShrink:0}}
      onMouseEnter={e=>{e.currentTarget.style.background=fi.color+"20";e.currentTarget.style.borderColor=fi.color+"60";}}
      onMouseLeave={e=>{e.currentTarget.style.background=fi.bg;e.currentTarget.style.borderColor=fi.color+"20";}}>
      <div style={{width:compact?22:26,height:compact?22:26,borderRadius:compact?6:8,
        background:fi.color+"20",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Ico d={fi.d} size={compact?11:13} color={fi.color}/>
      </div>
      <div style={{minWidth:0}}>
        <div style={{fontSize:compact?10:11,fontWeight:700,color:C.dark,
          maxWidth:compact?120:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {file.name}
        </div>
        {!compact&&<div style={{fontSize:9,color:C.light}}>{fmtSize(file.size)}</div>}
      </div>
      <Ico d={I.download} size={compact?10:11} color={fi.color}/>
    </a>
  );
}

/* ── DETAIL MODAL ── */
function DetailModal({item, onClose}) {
  if(!item) return null;
  const sc   = subjColor(item.subject.id);
  const tr   = getTrain(item.trainingType.code);
  const res  = item.resType ? getRes(item.resType.code) : null;
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.44)",
        backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,animation:"fadeIn 0.18s ease"}}>
      <div style={{background:C.white,borderRadius:22,width:"min(540px,96vw)",
        maxHeight:"90vh",display:"flex",flexDirection:"column",
        boxShadow:"0 28px 70px rgba(13,26,99,0.22)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

        {/* header */}
        <div style={{background:`linear-gradient(135deg,${C.navy},${sc})`,padding:"22px 24px",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:tr.bg,color:tr.color}}>{tr.name}</span>
                {res&&<span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:"rgba(255,255,255,0.2)",color:C.white}}>{res.name}</span>}
                {item.languages.map(l=>(
                  <span key={l.code} style={{fontSize:13}}>{LANG[l.code]||"🌐"}</span>
                ))}
              </div>
              <div style={{fontSize:15,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                lineHeight:1.35,marginBottom:6}}>{item.title}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>
                #{item.id} • {fmtTs(item.updated_at)}
              </div>
            </div>
            <button onClick={onClose}
              style={{width:30,height:30,flexShrink:0,borderRadius:8,border:"none",cursor:"pointer",
                background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",
                alignSelf:"flex-start"}}>
              <Ico d={I.x} size={14} color={C.white}/>
            </button>
          </div>
        </div>

        {/* body */}
        <div style={{overflowY:"auto",flex:1,padding:"20px 24px"}}>
          {/* subject block */}
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",
            borderRadius:12,background:`${sc}0D`,border:`1.5px solid ${sc}22`,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${sc}20`,flexShrink:0,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.book} size={16} color={sc}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,color:C.light,fontWeight:600}}>Fan</div>
              <div style={{fontSize:13,fontWeight:800,color:C.dark,lineHeight:1.3}}>{item.subject.name}</div>
              <div style={{fontSize:10,color:C.light,fontFamily:"monospace",marginTop:1}}>{item.subject.code}</div>
            </div>
          </div>

          {/* meta */}
          {[
            ["O'qituvchi",  item.employee.name],
            ["Dars turi",   item.trainingType.name],
            ["Tillar",      item.languages.map(l=>l.name).join(", ")],
            ["Holat",       item.active ? "Faol" : "Nofaol"],
            ["Yangilangan", fmtTs(item.updated_at)],
          ].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"8px 0",borderBottom:`1px solid ${C.lightGray}`}}>
              <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
              <span style={{fontSize:12,color:C.dark,fontWeight:700}}>{v}</span>
            </div>
          ))}

          {/* files */}
          {item.subjectFileResourceItems.length>0 && (
            <div style={{marginTop:16}}>
              <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
                letterSpacing:"0.8px",marginBottom:10}}>Fayllar</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {item.subjectFileResourceItems.map(ri=>(
                  <div key={ri.id} style={{borderRadius:12,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
                    {ri.comment&&(
                      <div style={{padding:"8px 12px",background:C.lightGray,
                        fontSize:11,color:C.mid,borderBottom:`1px solid ${C.gray}`}}>
                        {ri.comment}
                      </div>
                    )}
                    <div style={{padding:"10px 12px",display:"flex",flexWrap:"wrap",gap:8}}>
                      {(ri.files||[]).map((f,fi)=><FileChip key={fi} file={f}/>)}
                      {(!ri.files||ri.files.length===0)&&(
                        <span style={{fontSize:12,color:C.light,fontStyle:"italic"}}>Fayl yo'q</span>
                      )}
                    </div>
                    {ri.files?.length>0&&(
                      <div style={{padding:"6px 12px",background:C.lightGray,
                        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                          background:getRes(ri.resourceType.code).bg,color:getRes(ri.resourceType.code).color}}>
                          {ri.resourceType.name}
                        </span>
                        <span style={{fontSize:10,color:C.light}}>
                          {fmtSize(ri.files.reduce((s,f)=>s+Number(f.size),0))}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {item.subjectFileResourceItems.length===0&&(
            <div style={{marginTop:16,padding:"16px",borderRadius:12,
              background:C.lightGray,border:`1px dashed ${C.gray}`,textAlign:"center"}}>
              <Ico d={I.folder} size={28} color={C.light}/>
              <div style={{fontSize:12,color:C.light,marginTop:8}}>Fayl yuklanmagan</div>
            </div>
          )}
        </div>

        <div style={{padding:"12px 24px 20px",display:"flex",gap:8,
          borderTop:`1px solid ${C.lightGray}`,flexShrink:0}}>
          <button onClick={onClose}
            style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
              fontFamily:"inherit",fontSize:13,fontWeight:700,
              background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
            Tahrirlash
          </button>
          <button onClick={onClose}
            style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
              cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function SubjectFileResourcePage() {
  const [search,      setSearch]     = useState("");
  const [filterSubj,  setFilterSubj] = useState("");
  const [filterEmp,   setFilterEmp]  = useState("");
  const [filterRes,   setFilterRes]  = useState("");
  const [filterTrain, setFilterTrain]= useState("");
  const [viewMode,    setViewMode]   = useState("card"); // card | table | subject
  const [detail,      setDetail]     = useState(null);
  const [toast,       setToast]      = useState(null);
  const [page,        setPage]       = useState(1);
  const [openSubj,    setOpenSubj]   = useState({}); // for subject accordion
  const PAGE = viewMode==="card" ? 12 : 15;

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* filter */
  const filtered = useMemo(()=>DATA.filter(r=>{
    if(search){
      const q=search.toLowerCase();
      if(!r.title.toLowerCase().includes(q) &&
         !r.subject.name.toLowerCase().includes(q) &&
         !r.employee.name.toLowerCase().includes(q) &&
         !r.allFiles.some(f=>f.name.toLowerCase().includes(q))) return false;
    }
    if(filterSubj  && r.subject.id !== Number(filterSubj)) return false;
    if(filterEmp   && r.employee.id !== Number(filterEmp)) return false;
    if(filterRes   && r.resType?.code !== filterRes) return false;
    if(filterTrain && r.trainingType.code !== filterTrain) return false;
    return true;
  }),[search,filterSubj,filterEmp,filterRes,filterTrain]);

  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);
  const hasFilter = search||filterSubj||filterEmp||filterRes||filterTrain;
  const clearFilters = ()=>{ setSearch(""); setFilterSubj(""); setFilterEmp(""); setFilterRes(""); setFilterTrain(""); setPage(1); };

  const pageNums = ()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  /* stats */
  const totalFiles     = DATA.reduce((s,r)=>s+r.allFiles.length,0);
  const totalSize      = DATA.reduce((s,r)=>s+r.totalSize,0);
  const noFileCount    = DATA.filter(r=>r.allFiles.length===0).length;
  const uniqSubjects   = new Set(DATA.map(r=>r.subject.id)).size;

  /* by-subject grouping */
  const bySubject = useMemo(()=>{
    const m={};
    filtered.forEach(r=>{
      if(!m[r.subject.id]) m[r.subject.id]={subject:r.subject,items:[]};
      m[r.subject.id].items.push(r);
    });
    return Object.values(m);
  },[filtered]);

  /* Pagination */
  const Pagination = () => pageCount>1 ? (
    <div style={{marginTop:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div style={{fontSize:12,color:C.light}}>
        <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
        <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>
        {" "}/ <b style={{color:C.dark}}>{filtered.length}</b>
      </div>
      <div style={{display:"flex",gap:4}}>
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
          style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
            cursor:page===1?"not-allowed":"pointer",background:C.white,opacity:page===1?0.4:1,
            display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ico d={I.chevL} size={14} color={C.mid}/>
        </button>
        {pageNums().map((n,i)=>(
          <button key={i} onClick={()=>n!=="..."&&setPage(n)}
            style={{width:32,height:32,borderRadius:8,fontFamily:"inherit",fontSize:13,fontWeight:600,
              border:`1px solid ${n===page?C.bright:C.gray}`,cursor:n==="..."?"default":"pointer",
              background:n===page?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
              color:n===page?C.white:n==="..."?C.light:C.mid}}>
            {n}
          </button>
        ))}
        <button disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}
          style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
            cursor:page===pageCount?"not-allowed":"pointer",background:C.white,opacity:page===pageCount?0.4:1,
            display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ico d={I.chevR} size={14} color={C.mid}/>
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <style>{css}</style>

      {toast&&(
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background:C.white,borderLeft:`4px solid ${C.green}`,borderRadius:10,
          padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark,
          animation:"fadeUp 0.3s ease"}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast}
        </div>
      )}
      <DetailModal item={detail} onClose={()=>setDetail(null)}/>

      <div style={{padding:"24px 28px",maxWidth:1300,margin:"0 auto"}}>

        {/* HEADER */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              O'quv materiallar kutubxonasi
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{DATA.length}</b> •{" "}
              Jami: <b style={{color:C.dark}}>{TOTAL.toLocaleString()}</b> ta material
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"card",    i:I.grid,   title:"Karta"},
                {m:"subject", i:I.folder, title:"Fan bo'yicha"},
                {m:"table",   i:I.list,   title:"Jadval"},
              ].map(({m,i,title})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}} title={title}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi material qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Yuklash
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Jami materiallar", v:DATA.length,        c:C.bright, bg:C.lightBlue,   i:I.book},
            {l:"Jami fayllar",     v:totalFiles,          c:C.purple, bg:C.purpleLight, i:I.file},
            {l:"Umumiy hajm",      v:fmtSize(totalSize),  c:C.teal,   bg:C.tealLight,   i:I.layers},
            {l:"Fanlar",           v:uniqSubjects,        c:C.orange, bg:C.orangeLight, i:I.folder},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.i} size={18} color={s.c}/>
              </div>
              <div>
                <div style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {s.v}
                </div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:18,
          display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:230,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="Mavzu, fan, o'qituvchi, fayl nomi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterSubj} onChange={e=>{setFilterSubj(e.target.value);setPage(1);}} style={{minWidth:220}}>
            <option value="">Barcha fanlar</option>
            {SUBJECTS.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </Sel>
          <Sel value={filterEmp} onChange={e=>{setFilterEmp(e.target.value);setPage(1);}} style={{minWidth:180}}>
            <option value="">Barcha o'qituvchilar</option>
            {EMPLOYEES.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </Sel>
          <Sel value={filterRes} onChange={e=>{setFilterRes(e.target.value);setPage(1);}} style={{minWidth:150}}>
            <option value="">Resurs turi</option>
            {Object.entries(RES).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </Sel>
          <Sel value={filterTrain} onChange={e=>{setFilterTrain(e.target.value);setPage(1);}} style={{minWidth:130}}>
            <option value="">Dars turi</option>
            {Object.entries(TRAIN).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </Sel>
          {hasFilter&&(
            <button onClick={clearFilters}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
          <div style={{marginLeft:"auto",fontSize:12,color:C.light,flexShrink:0}}>
            {filtered.length} natija
          </div>
        </div>

        {/* ════════ CARD VIEW ════════ */}
        {viewMode==="card"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
              {paginated.map((item,idx)=>{
                const sc   = subjColor(item.subject.id);
                const tr   = getTrain(item.trainingType.code);
                const res  = item.resType ? getRes(item.resType.code) : null;
                const hasFiles = item.allFiles.length > 0;
                return (
                  <div key={item.id}
                    style={{background:C.white,borderRadius:18,overflow:"hidden",
                      border:`1.5px solid ${C.gray}`,transition:"all 0.18s",cursor:"pointer",
                      display:"flex",flexDirection:"column",
                      animation:`fadeUp 0.28s ${idx*30}ms ease both`}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=sc;e.currentTarget.style.boxShadow=`0 10px 28px ${sc}18`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.boxShadow="";}}
                    onClick={()=>setDetail(item)}>

                    {/* stripe */}
                    <div style={{height:3,background:`linear-gradient(90deg,${sc},${sc}50)`}}/>

                    {/* top badges */}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      padding:"10px 14px 0",gap:6}}>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                          background:tr.bg,color:tr.color}}>{tr.name}</span>
                        {res&&<span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                          background:res.bg,color:res.color}}>{res.short}</span>}
                      </div>
                      <div style={{display:"flex",gap:3}}>
                        {item.languages.map(l=>(
                          <span key={l.code} style={{fontSize:13}}>{LANG[l.code]||"🌐"}</span>
                        ))}
                      </div>
                    </div>

                    {/* title */}
                    <div style={{padding:"8px 14px 6px",flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.dark,lineHeight:1.4,
                        display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",
                        marginBottom:8}}>{item.title}</div>
                      {/* subject */}
                      <div style={{display:"flex",alignItems:"center",gap:6,
                        padding:"6px 8px",borderRadius:8,background:`${sc}0D`,marginBottom:6}}>
                        <Ico d={I.book} size={11} color={sc}/>
                        <span style={{fontSize:10,fontWeight:600,color:sc,
                          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {item.subject.name}
                        </span>
                      </div>
                      {/* employee */}
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <Ico d={I.user} size={10} color={C.light}/>
                        <span style={{fontSize:10,color:C.light}}>{item.employee.name}</span>
                      </div>
                    </div>

                    {/* files footer */}
                    <div style={{padding:"10px 14px",borderTop:`1px solid ${C.lightGray}`,
                      display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                      {hasFiles ? (
                        <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>
                          {item.allFiles.slice(0,2).map((f,fi)=>(
                            <FileChip key={fi} file={f} compact/>
                          ))}
                          {item.allFiles.length>2&&(
                            <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",
                              borderRadius:20,background:C.lightGray,color:C.mid,alignSelf:"center"}}>
                              +{item.allFiles.length-2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{fontSize:10,color:C.light,fontStyle:"italic"}}>Fayl yuklanmagan</span>
                      )}
                      <div style={{width:22,height:22,borderRadius:6,background:C.lightGray,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.eye} size={10} color={C.light}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination/>
          </>
        )}

        {/* ════════ SUBJECT ACCORDION VIEW ════════ */}
        {viewMode==="subject"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {bySubject.map((grp,gi)=>{
              const sc   = subjColor(grp.subject.id);
              const isOp = openSubj[grp.subject.id] !== false; // default open
              const totalGrpFiles = grp.items.reduce((s,r)=>s+r.allFiles.length,0);
              return (
                <div key={grp.subject.id}
                  style={{background:C.white,borderRadius:18,border:`1.5px solid ${C.gray}`,
                    overflow:"hidden",animation:`fadeUp 0.3s ${gi*60}ms ease both`}}>
                  {/* subject header */}
                  <div
                    style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",
                      background:isOp?`${sc}08`:C.white,cursor:"pointer",userSelect:"none",
                      borderBottom:isOp?`1px solid ${sc}20`:"none",transition:"background 0.15s"}}
                    onClick={()=>setOpenSubj(p=>({...p,[grp.subject.id]:!isOp}))}>
                    <div style={{width:46,height:46,borderRadius:13,
                      background:`linear-gradient(135deg,${sc},${sc}99)`,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.book} size={20} color={C.white}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",
                        lineHeight:1.25}}>{grp.subject.name}</div>
                      <div style={{fontSize:11,color:C.light,marginTop:2,fontFamily:"monospace"}}>
                        {grp.subject.code}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:18,fontWeight:800,color:sc,fontFamily:"'Syne',sans-serif"}}>{grp.items.length}</div>
                        <div style={{fontSize:9,color:C.light,fontWeight:700}}>mavzu</div>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:18,fontWeight:800,color:sc,fontFamily:"'Syne',sans-serif"}}>{totalGrpFiles}</div>
                        <div style={{fontSize:9,color:C.light,fontWeight:700}}>fayl</div>
                      </div>
                      <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"transform 0.2s",transform:isOp?"rotate(90deg)":"rotate(0)"}}>
                        <Ico d={I.chevR} size={14} color={C.mid}/>
                      </div>
                    </div>
                  </div>

                  {/* items */}
                  {isOp&&(
                    <div style={{display:"flex",flexDirection:"column"}}>
                      {grp.items.map((item,idx)=>{
                        const tr  = getTrain(item.trainingType.code);
                        const res = item.resType ? getRes(item.resType.code) : null;
                        return (
                          <div key={item.id}
                            style={{display:"flex",alignItems:"flex-start",gap:14,
                              padding:"12px 20px",borderBottom:`1px solid ${C.lightGray}`,
                              cursor:"pointer",transition:"background 0.12s",
                              animation:`fadeUp 0.2s ${idx*20}ms ease both`}}
                            onClick={()=>setDetail(item)}
                            onMouseEnter={e=>e.currentTarget.style.background=`${sc}06`}
                            onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                            {/* number */}
                            <div style={{width:28,height:28,borderRadius:8,
                              background:`${sc}15`,border:`1px solid ${sc}20`,flexShrink:0,
                              display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>
                              <span style={{fontSize:11,fontWeight:800,color:sc}}>{idx+1}</span>
                            </div>

                            {/* content */}
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:13,fontWeight:700,color:C.dark,lineHeight:1.35,marginBottom:5}}>
                                {item.title}
                              </div>
                              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                                <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                                  background:tr.bg,color:tr.color}}>{tr.name}</span>
                                {res&&<span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                                  background:res.bg,color:res.color}}>{res.name}</span>}
                                <span style={{fontSize:10,color:C.light,display:"flex",alignItems:"center",gap:3}}>
                                  <Ico d={I.user} size={9} color={C.light}/>{item.employee.name}
                                </span>
                                {item.languages.map(l=><span key={l.code} style={{fontSize:11}}>{LANG[l.code]||"🌐"}</span>)}
                              </div>
                              {item.allFiles.length>0&&(
                                <div style={{display:"flex",gap:6,marginTop:7,flexWrap:"wrap"}}>
                                  {item.allFiles.map((f,fi)=><FileChip key={fi} file={f} compact/>)}
                                </div>
                              )}
                            </div>

                            {/* date + size */}
                            <div style={{textAlign:"right",flexShrink:0}}>
                              <div style={{fontSize:10,color:C.light}}>{fmtTs(item.updated_at)}</div>
                              {item.totalSize>0&&(
                                <div style={{fontSize:10,fontWeight:700,color:C.mid,marginTop:2}}>
                                  {fmtSize(item.totalSize)}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ════════ TABLE VIEW ════════ */}
        {viewMode==="table"&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",
                gridTemplateColumns:"52px 1fr 160px 100px 80px 100px 120px 44px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["ID","Mavzu","Fan","O'qituvchi","Dars","Resurs","Fayllar",""].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>
              {paginated.map((item,idx)=>{
                const sc  = subjColor(item.subject.id);
                const tr  = getTrain(item.trainingType.code);
                const res = item.resType ? getRes(item.resType.code) : null;
                return (
                  <div key={item.id}
                    style={{display:"grid",
                      gridTemplateColumns:"52px 1fr 160px 100px 80px 100px 120px 44px",
                      padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,cursor:"pointer",transition:"background 0.15s",
                      animation:`fadeUp 0.2s ${idx*20}ms ease both`}}
                    onClick={()=>setDetail(item)}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,color:C.light}}>#{item.id}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",paddingRight:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.dark,lineHeight:1.3,
                        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                        {item.title}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                        background:`${sc}15`,color:sc,overflow:"hidden",textOverflow:"ellipsis",
                        whiteSpace:"nowrap",maxWidth:150}}>{item.subject.code}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,color:C.mid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {item.employee.name}
                      </span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                        background:tr.bg,color:tr.color}}>{tr.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      {res
                        ? <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                            background:res.bg,color:res.color}}>{res.short}</span>
                        : <span style={{fontSize:10,color:C.light}}>—</span>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      {item.allFiles.length>0
                        ? item.allFiles.slice(0,2).map((f,fi)=>{
                            const ext=fileExt(f.name); const fi2=fileIcon(ext);
                            return (
                              <a key={fi} href={f.url} target="_blank" rel="noreferrer"
                                onClick={e=>e.stopPropagation()}
                                title={f.name}
                                style={{width:26,height:26,borderRadius:7,background:fi2.bg,
                                  display:"flex",alignItems:"center",justifyContent:"center",
                                  border:`1px solid ${fi2.color}20`,flexShrink:0}}>
                                <Ico d={fi2.d} size={12} color={fi2.color}/>
                              </a>
                            );
                          })
                        : <span style={{fontSize:10,color:C.light,fontStyle:"italic"}}>Yo'q</span>}
                      {item.allFiles.length>2&&(
                        <span style={{fontSize:9,fontWeight:700,color:C.mid}}>+{item.allFiles.length-2}</span>
                      )}
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <div style={{width:26,height:26,borderRadius:7,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={I.eye} size={11} color={C.light}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination/>
          </>
        )}

        {filtered.length===0&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.folder} size={48} color={C.gray}/>
            <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Natija topilmadi</div>
          </div>
        )}
      </div>
    </>
  );
}
