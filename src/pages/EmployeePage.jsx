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
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{to{transform:rotate(360deg)}}
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

const Ico = ({d,size=16,color="currentColor",sw=2,fill="none"})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevL:   "M15 18l-6-6 6-6",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  briefcase:"M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  award:   "M12 15l-4.243 4.243 1.06-5.196L4.574 9.804l5.26-.47L12 4.5l2.166 4.834 5.26.47-4.243 4.243 1.06 5.196z",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  building:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  calendar:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  id:      "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 20c0-2 1.8-3 4-3s4 1 4 3M15 8h4M15 12h4M15 16h4",
  female:  "M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM12 16v6M9 22h6",
  male:    "M10 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 3l-6 6M15 3h6v6",
  phone:   "M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19 19.45 19.45 0 0 1 5 12.39 19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 14.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
};

/* ── LOOKUP CONFIGS ── */
const DEGREE = {
  "10":{label:"Darajasiz",    color:C.mid,    bg:C.lightGray},
  "11":{label:"PhD",          color:C.blue,   bg:C.lightBlue},
  "12":{label:"DSc",          color:C.purple, bg:C.purpleLight},
  "13":{label:"Akademik",     color:C.orange, bg:C.orangeLight},
};
const RANK = {
  "10":{label:"Unvonsiz",   color:C.mid,    bg:C.lightGray},
  "11":{label:"Dotsent",    color:C.teal,   bg:C.tealLight},
  "12":{label:"Professor",  color:C.purple, bg:C.purpleLight},
};
const POSITION = {
  "11":{label:"Stajer-o'q.", color:C.light,  bg:C.lightGray},
  "12":{label:"Assistent",   color:C.teal,   bg:C.tealLight},
  "13":{label:"Katta o'q.",  color:C.blue,   bg:C.lightBlue},
  "14":{label:"Dotsent",     color:C.purple, bg:C.purpleLight},
  "15":{label:"Professor",   color:C.orange, bg:C.orangeLight},
};
const EMP_FORM = {
  "11":{label:"Asosiy",       color:C.green,  bg:C.greenLight},
  "12":{label:"Ichki-qo'sh.", color:C.blue,   bg:C.lightBlue},
  "13":{label:"Tashqi",       color:C.orange, bg:C.orangeLight},
  "14":{label:"Soatbay",      color:C.yellow, bg:C.yellowLight},
};
const STAFF = {
  "11":{label:"1.0 stavka"},
  "12":{label:"0.75 stavka"},
  "13":{label:"0.50 stavka"},
  "14":{label:"0.25 stavka"},
};

const getDeg  = c => DEGREE[c]   || DEGREE["10"];
const getRank = c => RANK[c]     || RANK["10"];
const getPos  = c => POSITION[c] || POSITION["11"];
const getForm = c => EMP_FORM[c] || EMP_FORM["11"];

/* ── AVATAR COLORS ── */
const AV_COLORS = [C.bright,C.purple,C.green,C.teal,C.orange,C.red,C.pink,C.navy];
const avColor = name => AV_COLORS[name.charCodeAt(0) % AV_COLORS.length];
const initials = name => name.split(" ").slice(0,2).map(w=>w[0]).join("");

/* ── FORMAT DATE ── */
const fmtDate = ts => {
  if(!ts) return "—";
  const d = new Date(ts*1000);
  return `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}.${d.getFullYear()}`;
};

/* ──────────── REAL DATA (pagination: totalCount:567, page:1, pageSize:20) ──────────── */
const RAW = [
  {id:508,meta_id:730,full_name:"KURBONOVA GUZAL SALAYEVNA",short_name:"KURBONOVA G. S.",first_name:"GUZAL",second_name:"KURBONOVA",third_name:"SALAYEVNA",employee_id_number:"5402612011",gender:{code:"12",name:"Ayol"},birth_date:527990400,image:"https://hemis.nukusstu.uz/static/crop/2/8/320__90_2828787953.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/f/7/f7d573785648ec428144a29a1af29181.jpg",year_of_enter:2026,specialty:"Ekologiya",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:16,name:"Kimyo muhandisligi va ekologiya",code:"540-104-12"},employmentForm:{code:"11",name:"Asosiy ish joy"},employmentStaff:{code:"13",name:"0,50 stavka"},staffPosition:{code:"11",name:"Stajer-o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"226",decree_number:"224",contract_date:1772496000,decree_date:1772496000,created_at:1772779335,active:true},
  {id:498,meta_id:724,full_name:"ABDULLAEV RUSLAN MAXSETBAY ULI",short_name:"ABDULLAEV R. M.",first_name:"RUSLAN",second_name:"ABDULLAEV",third_name:"MAXSETBAY ULI",employee_id_number:"3982611004",gender:{code:"11",name:"Erkak"},birth_date:878083200,image:"https://hemis.nukusstu.uz/static/crop/3/4/320__90_3431321568.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/3/0/30db8bacbc6612cd5a8dd6bb2795f910.jpg",year_of_enter:2026,specialty:"Matematika va informatika",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:6,name:"Dasturiy injiniringi",code:"540-105-02"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"11",name:"Stajer-o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1772011245,active:true},
  {id:503,meta_id:723,full_name:"SABIROVA MATLUBA MUXAMMET QIZI",short_name:"SABIROVA M. M.",first_name:"MATLUBA",second_name:"SABIROVA",third_name:"MUXAMMET QIZI",employee_id_number:"3912412008",gender:{code:"12",name:"Ayol"},birth_date:874195200,image:"https://hemis.nukusstu.uz/static/crop/2/3/320__90_230755069.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/a/e/ae0266b020f36181d2ed6948603c8369.jpg",year_of_enter:2026,specialty:"Muhandis tadqiqotchi, pedagog",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:9,name:"Telekommunikatsiya texnologiyalari",code:"540-102-05"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"11",name:"Stajer-o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"155",decree_number:"140",contract_date:1771545600,decree_date:1771545600,created_at:1771916640,active:true},
  {id:502,meta_id:717,full_name:"XODJANOV MARAT ISLAMOVICH",short_name:"XODJANOV M. I.",first_name:"MARAT",second_name:"XODJANOV",third_name:"ISLAMOVICH",employee_id_number:"5402611016",gender:{code:"11",name:"Erkak"},birth_date:446774400,image:"https://hemis.nukusstu.uz/static/crop/2/0/320__90_2001091854.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/f/b/fb96b64cdf16420fcd709de8b04fc4a4.jpg",year_of_enter:2026,specialty:"tarix",academicDegree:{code:"11",name:"Fan nomzodi, PhD"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:28,name:"Ijtimoiy-gumanitar fanlar",code:"540-101-15"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"13",name:"Katta o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"150",decree_number:"143",contract_date:1771804800,decree_date:1771804800,created_at:1771831250,active:true},
  {id:500,meta_id:713,full_name:"ELMURATOV QUDIYAR KARJAUBAY ULÍ",short_name:"ELMURATOV Q. K.",first_name:"QUDIYAR",second_name:"ELMURATOV",third_name:"KARJAUBAY ULÍ",employee_id_number:"3912111005",gender:{code:"11",name:"Erkak"},birth_date:801187200,image:"https://hemis.nukusstu.uz/static/crop/3/3/320__90_3337133094.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/c/d/cdc3f940921d27d773d26486d2b4a4e1.jpg",year_of_enter:2026,specialty:"Kompyuter injiniring",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:5,name:"Kompyuter injiniringi",code:"540-101-01"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"13",name:"0,50 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771823803,active:true},
  {id:499,meta_id:712,full_name:"NAJIMOV ISKANDER PERDEBAYEVICH",short_name:"NAJIMOV I. P.",first_name:"ISKANDER",second_name:"NAJIMOV",third_name:"PERDEBAYEVICH",employee_id_number:"3461711008",gender:{code:"11",name:"Erkak"},birth_date:514512000,image:"https://hemis.nukusstu.uz/static/crop/1/4/320__90_1467385428.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/8/c/8cec7e5855385a20f9d112eabda1f706.jpg",year_of_enter:2026,specialty:"Iqtisodiyot",academicDegree:{code:"12",name:"Fan doktori, DSc"},academicRank:{code:"11",name:"Dotsent"},tutorGroups:[],department:{id:17,name:"Iqtisodiyot va menejment",code:"540-102-13"},employmentForm:{code:"14",name:"Soatbay"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"13",name:"Katta o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771591374,active:true},
  {id:498,meta_id:711,full_name:"ABDULLAEV RUSLAN MAXSETBAY ULI",short_name:"ABDULLAEV R. M.",first_name:"RUSLAN",second_name:"ABDULLAEV",third_name:"MAXSETBAY ULI",employee_id_number:"3982611004",gender:{code:"11",name:"Erkak"},birth_date:878083200,image:"https://hemis.nukusstu.uz/static/crop/3/4/320__90_3431321568.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/3/0/30db8bacbc6612cd5a8dd6bb2795f910.jpg",year_of_enter:2026,specialty:"Matematika va informatika",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:33,name:"Matematik modellashtirish",code:"540-105-20"},employmentForm:{code:"11",name:"Asosiy ish joy"},employmentStaff:{code:"12",name:"0,75 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"105",decree_number:"104",contract_date:1771200000,decree_date:1771200000,created_at:1771565290,active:true},
  {id:497,meta_id:710,full_name:"MUXIYATDINOV NURATDIN SADRATDIN ULI",short_name:"MUXIYATDINOV N. S.",first_name:"NURATDIN",second_name:"MUXIYATDINOV",third_name:"SADRATDIN ULI",employee_id_number:"5402611011",gender:{code:"11",name:"Erkak"},birth_date:1055721600,image:"https://hemis.nukusstu.uz/static/crop/2/1/320__90_2182410316.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/e/3/e31f2df0b33ab1dc9d5f4dad316539d5.jpg",year_of_enter:2026,specialty:"Muhandis-dasturchi",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:7,name:"Sun'iy intellekt texnologiyalari",code:"540-105-03"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"11",name:"Stajer-o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"103",decree_number:"102",contract_date:1771200000,decree_date:1771200000,created_at:1771496259,active:true},
  {id:496,meta_id:709,full_name:"SEIDULLAEV ABAT KAMALOVICH",short_name:"SEIDULLAEV A. K.",first_name:"ABAT",second_name:"SEIDULLAEV",third_name:"KAMALOVICH",employee_id_number:"3461711020",gender:{code:"11",name:"Erkak"},birth_date:449884800,image:"https://hemis.nukusstu.uz/static/crop/3/9/320__90_3915287339.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/d/7/d7c8bd49ba920fbf0ad917df8b942921.jpg",year_of_enter:2026,specialty:"matematikaliq logika algebra ham sanlar teoriyasi",academicDegree:{code:"11",name:"Fan nomzodi, PhD"},academicRank:{code:"11",name:"Dotsent"},tutorGroups:[],department:{id:6,name:"Dasturiy injiniringi",code:"540-105-02"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"13",name:"Katta o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771422156,active:true},
  {id:496,meta_id:708,full_name:"SEIDULLAEV ABAT KAMALOVICH",short_name:"SEIDULLAEV A. K.",first_name:"ABAT",second_name:"SEIDULLAEV",third_name:"KAMALOVICH",employee_id_number:"3461711020",gender:{code:"11",name:"Erkak"},birth_date:449884800,image:"https://hemis.nukusstu.uz/static/crop/3/9/320__90_3915287339.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/d/7/d7c8bd49ba920fbf0ad917df8b942921.jpg",year_of_enter:2026,specialty:"matematikaliq logika algebra ham sanlar teoriyasi",academicDegree:{code:"11",name:"Fan nomzodi, PhD"},academicRank:{code:"11",name:"Dotsent"},tutorGroups:[],department:{id:33,name:"Matematik modellashtirish",code:"540-105-20"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"13",name:"Katta o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"102",decree_number:"101",contract_date:1771200000,decree_date:1771200000,created_at:1771411823,active:true},
  {id:131,meta_id:707,full_name:"UZAXBAYEV ARALBAY ZARIPBAY ULI",short_name:"UZAXBAYEV A. Z.",first_name:"ARALBAY",second_name:"UZAXBAYEV",third_name:"ZARIPBAY ULI",employee_id_number:"3172411012",gender:{code:"11",name:"Erkak"},birth_date:811641600,image:"",image_full:"",year_of_enter:2025,specialty:"Elektr energetikasi",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771397437,active:true},
  {id:382,meta_id:706,full_name:"XUDAYBERGENOV ABDUMUXAMED RESUL-ULI",short_name:"XUDAYBERGENOV A. R.",first_name:"ABDUMUXAMED",second_name:"XUDAYBERGENOV",third_name:"RESUL-ULI",employee_id_number:"5402511227",gender:{code:"11",name:"Erkak"},birth_date:900979200,image:"https://hemis.nukusstu.uz/static/crop/3/4/320__90_3439327769.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/6/e/6e5a24827019968c1f7c154ec188a960.jpg",year_of_enter:2025,specialty:"электроника и наноэлектроника",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771397303,active:true},
  {id:385,meta_id:705,full_name:"PERDEBAEV SAPARBAY RUSTEMOVICH",short_name:"PERDEBAEV S. R.",first_name:"SAPARBAY",second_name:"PERDEBAEV",third_name:"RUSTEMOVICH",employee_id_number:"5402511230",gender:{code:"11",name:"Erkak"},birth_date:896227200,image:"https://hemis.nukusstu.uz/static/crop/1/5/320__90_1581997567.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/9/1/91b672df0be6eda5149dc0ce68714916.jpg",year_of_enter:2025,specialty:"Muhandis-energetik",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:14,name:"Energetika muhandisligi",code:"540-103-10"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771396207,active:true},
  {id:366,meta_id:704,full_name:"ABDULLAYEVA DILNOZA INAVATULLA QIZI",short_name:"ABDULLAYEVA D. I.",first_name:"DILNOZA",second_name:"ABDULLAYEVA",third_name:"INAVATULLA QIZI",employee_id_number:"5402512120",gender:{code:"12",name:"Ayol"},birth_date:909964800,image:"https://hemis.nukusstu.uz/static/crop/3/7/320__90_3718882604.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/3/d/3d4e15a4e1819545bf793699a9bd1db3.jpg",year_of_enter:2025,specialty:"Elektr texnikasi",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:14,name:"Energetika muhandisligi",code:"540-103-10"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771396147,active:true},
  {id:75,meta_id:703,full_name:"DAULETBAEV AZIZ BAXADÍR-ULÍ",short_name:"DAULETBAEV A. B.",first_name:"AZIZ",second_name:"DAULETBAEV",third_name:"BAXADÍR-ULÍ",employee_id_number:"3172311028",gender:{code:"11",name:"Erkak"},birth_date:877478400,image:"",image_full:"",year_of_enter:2025,specialty:"Elektr energetika",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:14,name:"Energetika muhandisligi",code:"540-103-10"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"26.02",decree_number:"26.02",contract_date:1771200000,decree_date:1771200000,created_at:1771396034,active:true},
  {id:383,meta_id:701,full_name:"YESENBEKOV AZAMAT JOLDASBAYEVICH",short_name:"YESENBEKOV A. J.",first_name:"AZAMAT",second_name:"YESENBEKOV",third_name:"JOLDASBAYEVICH",employee_id_number:"3461911043",gender:{code:"11",name:"Erkak"},birth_date:335577600,image:"https://hemis.nukusstu.uz/static/crop/1/6/320__90_1627730477.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/b/1/b1b135186713446897b2dd484174d5e9.jpg",year_of_enter:2025,specialty:"Elektr energiyasi elektr taminoti",academicDegree:{code:"11",name:"Fan nomzodi, PhD"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},employmentForm:{code:"11",name:"Asosiy ish joy"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"13",name:"Katta o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"105",decree_number:"104",contract_date:1771200000,decree_date:1771200000,created_at:1771331321,active:true},
  {id:367,meta_id:695,full_name:"JAKSÍMURATOV IBRAYÍM JUMABAEVICH",short_name:"JAKSÍMURATOV I. J.",first_name:"IBRAYÍM",second_name:"JAKSÍMURATOV",third_name:"JUMABAEVICH",employee_id_number:"3522511011",gender:{code:"11",name:"Erkak"},birth_date:696384000,image:"https://hemis.nukusstu.uz/static/crop/1/5/320__90_1517164003.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/0/4/041dc88e3e4eb8acf49dcd664c8a7bd4.jpg",year_of_enter:2025,specialty:"Aniq va tabiyiy fanlarni oqitish",academicDegree:{code:"11",name:"Fan nomzodi, PhD"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},employmentForm:{code:"12",name:"O'rindoshlik (ichki-qo'shimcha)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"13",name:"Katta o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"100",decree_number:"99",contract_date:1771200000,decree_date:1771200000,created_at:1771329834,active:true},
  {id:93,meta_id:694,full_name:"KURBANBAYEV MAQSUD ADAMBAYEVICH",short_name:"KURBANBAYEV M. A.",first_name:"MAQSUD",second_name:"KURBANBAYEV",third_name:"ADAMBAYEVICH",employee_id_number:"3172311011",gender:{code:"11",name:"Erkak"},birth_date:855360000,image:"",image_full:"",year_of_enter:2025,specialty:"Elektr energetika",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"14",name:"0,25 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"99",decree_number:"98",contract_date:1771200000,decree_date:1771200000,created_at:1771329722,active:true},
  {id:495,meta_id:693,full_name:"ATAJANOVA LAYLO MURATBAYEVNA",short_name:"ATAJANOVA L. M.",first_name:"LAYLO",second_name:"ATAJANOVA",third_name:"MURATBAYEVNA",employee_id_number:"5402612009",gender:{code:"12",name:"Ayol"},birth_date:1044144000,image:"https://hemis.nukusstu.uz/static/crop/1/5/320__90_1561993180.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/a/8/a8578cfd49318c353403783a372138df.jpg",year_of_enter:2026,specialty:"Filologiya va inglis tili",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:12,name:"Davlat tili va chet tillari",code:"540-101-08"},employmentForm:{code:"11",name:"Asosiy ish joy"},employmentStaff:{code:"13",name:"0,50 stavka"},staffPosition:{code:"11",name:"Stajer-o'qituvchi"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"99",decree_number:"98",contract_date:1771200000,decree_date:1771200000,created_at:1771325903,active:true},
  {id:494,meta_id:692,full_name:"TLEUMURATOV MIRAS GENJEMURATOVICH",short_name:"TLEUMURATOV M. G.",first_name:"MIRAS",second_name:"TLEUMURATOV",third_name:"GENJEMURATOVICH",employee_id_number:"5402611009",gender:{code:"11",name:"Erkak"},birth_date:497577600,image:"https://hemis.nukusstu.uz/static/crop/1/4/320__90_1432840759.jpg",image_full:"https://hemis.nukusstu.uz/static/uploads/pi/1/4/14638efc47c4def0ff1dec62adaabce5.jpg",year_of_enter:2026,specialty:"Loyiha boshqaruvi",academicDegree:{code:"10",name:"Darajasiz"},academicRank:{code:"10",name:"Unvonsiz"},tutorGroups:[],department:{id:17,name:"Iqtisodiyot va menejment",code:"540-102-13"},employmentForm:{code:"13",name:"O'rindoshlik (tashqi)"},employmentStaff:{code:"13",name:"0,50 stavka"},staffPosition:{code:"12",name:"Assistent"},employeeStatus:{code:"11",name:"Ishlamoqda"},employeeType:{code:"12",name:"Professor-o'qituvchi xodim"},contract_number:"99",decree_number:"98",contract_date:1771200000,decree_date:1771200000,created_at:1771322624,active:true},
];

const TOTAL_COUNT = 567;

const Sel = ({value,onChange,children,style})=>(
  <div style={{position:"relative",...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%",padding:"8px 28px 8px 12px",borderRadius:9,
        border:`1.5px solid ${C.gray}`,fontSize:13,color:value?C.dark:C.light,
        background:C.white,cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={13} color={C.light}/>
    </div>
  </div>
);

/* ── AVATAR ── */
const Avatar = ({emp, size=40})=>{
  const [err,setErr] = useState(false);
  const col = avColor(emp.second_name);
  const ini = initials(emp.second_name+" "+emp.first_name);
  const isFemale = emp.gender.code==="12";
  if(emp.image && !err) return (
    <img src={emp.image} alt={ini} onError={()=>setErr(true)}
      style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,
        border:`2px solid ${col}30`}}/>
  );
  return (
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:`linear-gradient(135deg,${col},${col}bb)`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.32,fontWeight:800,color:C.white,
      border:`2px solid ${col}40`, letterSpacing:"-0.5px"}}>
      {ini}
    </div>
  );
};

/* ─────────────────────── MAIN ─────────────────────── */
export default function EmployeePage() {
  const [search,      setSearch]      = useState("");
  const [filterDept,  setFilterDept]  = useState("");
  const [filterPos,   setFilterPos]   = useState("");
  const [filterForm,  setFilterForm]  = useState("");
  const [filterGender,setFilterGender]= useState("");
  const [filterDegree,setFilterDegree]= useState("");
  const [viewMode,    setViewMode]    = useState("card");
  const [detailItem,  setDetailItem]  = useState(null);
  const [toast,       setToast]       = useState(null);
  const [page,        setPage]        = useState(1);
  const PAGE = viewMode==="card" ? 12 : 15;

  const showToast = msg=>{ setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* unique depts for filter */
  const depts = useMemo(()=>{
    const m={};
    RAW.forEach(r=>{ if(!m[r.department.id]) m[r.department.id]=r.department.name; });
    return Object.entries(m).map(([id,name])=>({id:Number(id),name}));
  },[]);

  /* filter */
  const filtered = useMemo(()=>RAW.filter(r=>{
    const ms = !search || r.full_name.toLowerCase().includes(search.toLowerCase())
                       || r.specialty.toLowerCase().includes(search.toLowerCase())
                       || r.department.name.toLowerCase().includes(search.toLowerCase());
    const md = !filterDept   || r.department.id===Number(filterDept);
    const mp = !filterPos    || r.staffPosition.code===filterPos;
    const mf = !filterForm   || r.employmentForm.code===filterForm;
    const mg = !filterGender || r.gender.code===filterGender;
    const mdc= !filterDegree || r.academicDegree.code===filterDegree;
    return ms&&md&&mp&&mf&&mg&&mdc;
  }),[search,filterDept,filterPos,filterForm,filterGender,filterDegree]);

  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);
  const pageNums  = ()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
  };

  /* stats */
  const stats = useMemo(()=>({
    total:     RAW.length,
    male:      RAW.filter(r=>r.gender.code==="11").length,
    female:    RAW.filter(r=>r.gender.code==="12").length,
    phd:       RAW.filter(r=>["11","12"].includes(r.academicDegree.code)).length,
    asosiy:    RAW.filter(r=>r.employmentForm.code==="11").length,
  }),[]);

  /* active filters count */
  const activeFilters = [filterDept,filterPos,filterForm,filterGender,filterDegree].filter(Boolean).length;

  /* ── DETAIL MODAL ── */
  const DetailModal = ()=>{
    const e = detailItem;
    if(!e) return null;
    const deg  = getDeg(e.academicDegree.code);
    const rnk  = getRank(e.academicRank.code);
    const pos  = getPos(e.staffPosition.code);
    const form = getForm(e.employmentForm.code);
    const col  = avColor(e.second_name);
    return (
      <div onClick={ev=>ev.target===ev.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.45)",
          backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:22,width:"min(520px,96vw)",
          boxShadow:"0 28px 70px rgba(13,26,99,0.22)",animation:"fadeUp 0.22s ease",overflow:"hidden",
          maxHeight:"90vh",overflowY:"auto"}}>

          {/* header */}
          <div style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.blue} 60%,${col}66 100%)`,
            padding:"24px 24px 20px",position:"relative"}}>
            <button onClick={()=>setDetailItem(null)}
              style={{position:"absolute",top:16,right:16,width:30,height:30,borderRadius:8,
                border:"none",cursor:"pointer",background:"rgba(255,255,255,0.15)",
                display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.x} size={14} color={C.white}/>
            </button>
            <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              <Avatar emp={e} size={72}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:e.gender.code==="12"?C.pinkLight+"44":"rgba(255,255,255,0.18)",
                    color:C.white}}>{e.gender.name}</span>
                  {deg.label!=="Darajasiz"&&(
                    <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                      background:"rgba(255,255,255,0.2)",color:C.white}}>{deg.label}</span>
                  )}
                  {rnk.label!=="Unvonsiz"&&(
                    <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                      background:"rgba(255,255,255,0.2)",color:C.white}}>{rnk.label}</span>
                  )}
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                    background:form.bg+"44",color:C.white}}>{form.label}</span>
                </div>
                <div style={{fontSize:17,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                  lineHeight:1.25,marginBottom:4}}>{e.full_name}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>
                  {e.staffPosition.name} • {e.department.name}
                </div>
              </div>
            </div>
          </div>

          {/* mini stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,
            borderBottom:`1px solid ${C.lightGray}`}}>
            {[
              {l:"Yil",    v:e.year_of_enter, c:C.bright},
              {l:"Stavka", v:e.employmentStaff.name.replace(",","."), c:C.purple},
              {l:"ID",     v:`#${e.id}`, c:C.teal},
            ].map((s,i)=>(
              <div key={i} style={{padding:"12px",textAlign:"center",
                borderRight:i<2?`1px solid ${C.lightGray}`:"none"}}>
                <div style={{fontSize:16,fontWeight:800,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
                <div style={{fontSize:10,color:C.light,fontWeight:600,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* details */}
          <div style={{padding:"16px 22px"}}>
            {[
              ["Mutaxassislik",  e.specialty],
              ["Kafedra",        `${e.department.name} (${e.department.code})`],
              ["Lavozim",        e.staffPosition.name],
              ["Ilmiy daraja",   e.academicDegree.name],
              ["Ilmiy unvon",    e.academicRank.name],
              ["Ish shakli",     e.employmentForm.name],
              ["Tug'ilgan sana", fmtDate(e.birth_date)],
              ["Shartnoma №",    e.contract_number],
              ["Buyruq №",       e.decree_number],
              ["Shartnoma sanasi",fmtDate(e.contract_date)],
              ["Xodim ID",       e.employee_id_number],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
                padding:"7px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                <span style={{fontSize:11,color:C.light,fontWeight:600,flexShrink:0}}>{k}</span>
                <span style={{fontSize:12,color:C.dark,fontWeight:600,textAlign:"right",
                  maxWidth:"62%",lineHeight:1.4}}>{v||"—"}</span>
              </div>
            ))}
          </div>

          <div style={{padding:"12px 22px 18px",display:"flex",gap:8}}>
            <button onClick={()=>{showToast("Tahrirlash ochildi");setDetailItem(null);}}
              style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
              Tahrirlash
            </button>
            <button onClick={()=>setDetailItem(null)}
              style={{padding:"10px 20px",borderRadius:10,border:`1px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
              Yopish
            </button>
          </div>
        </div>
      </div>
    );
  };

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

      <DetailModal/>

      <div style={{padding:"24px 28px",maxWidth:1280,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              O'qituvchilar
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>{TOTAL_COUNT}</b> ta xodim •{" "}
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{RAW.length}</b> ta
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[{m:"card",i:I.grid},{m:"table",i:I.list}].map(({m,i})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Yangi xodim qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Qo'shish
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:20}}>
          {[
            {l:"Jami",       v:stats.total,   c:C.bright,  bg:C.lightBlue,    i:I.users},
            {l:"Erkak",      v:stats.male,    c:C.blue,    bg:"#EFF6FF",      i:I.male},
            {l:"Ayol",       v:stats.female,  c:C.pink,    bg:C.pinkLight,    i:I.female},
            {l:"Ilmiy daraja",v:stats.phd,    c:C.purple,  bg:C.purpleLight,  i:I.award},
            {l:"Asosiy ish", v:stats.asosiy,  c:C.green,   bg:C.greenLight,   i:I.briefcase},
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

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,
          display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:220,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              placeholder="F.I.Sh., mutaxassislik, kafedra..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterDept} onChange={e=>{setFilterDept(e.target.value);setPage(1);}} style={{minWidth:200}}>
            <option value="">Barcha kafedralar</option>
            {depts.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
          </Sel>
          <Sel value={filterPos} onChange={e=>{setFilterPos(e.target.value);setPage(1);}} style={{minWidth:160}}>
            <option value="">Barcha lavozim</option>
            <option value="11">Stajer-o'qituvchi</option>
            <option value="12">Assistent</option>
            <option value="13">Katta o'qituvchi</option>
            <option value="14">Dotsent</option>
            <option value="15">Professor</option>
          </Sel>
          <Sel value={filterForm} onChange={e=>{setFilterForm(e.target.value);setPage(1);}} style={{minWidth:150}}>
            <option value="">Barcha shakl</option>
            <option value="11">Asosiy ish joy</option>
            <option value="12">Ichki-qo'shimcha</option>
            <option value="13">Tashqi</option>
            <option value="14">Soatbay</option>
          </Sel>
          <Sel value={filterGender} onChange={e=>{setFilterGender(e.target.value);setPage(1);}} style={{minWidth:120}}>
            <option value="">Jins</option>
            <option value="11">Erkak</option>
            <option value="12">Ayol</option>
          </Sel>
          <Sel value={filterDegree} onChange={e=>{setFilterDegree(e.target.value);setPage(1);}} style={{minWidth:130}}>
            <option value="">Ilmiy daraja</option>
            <option value="11">PhD</option>
            <option value="12">DSc</option>
            <option value="10">Darajasiz</option>
          </Sel>
          {activeFilters>0&&(
            <button onClick={()=>{setFilterDept("");setFilterPos("");setFilterForm("");setFilterGender("");setFilterDegree("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash ({activeFilters})
            </button>
          )}
        </div>

        {/* ── RESULT COUNT ── */}
        {(search||activeFilters>0)&&(
          <div style={{fontSize:12,color:C.light,marginBottom:12}}>
            <b style={{color:C.dark}}>{filtered.length}</b> ta natija topildi
          </div>
        )}

        {/* ═══ CARD VIEW ═══ */}
        {viewMode==="card"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
            {paginated.length===0&&(
              <div style={{gridColumn:"1/-1",background:C.white,borderRadius:16,
                border:`1px solid ${C.gray}`,padding:"60px",textAlign:"center"}}>
                <Ico d={I.users} size={48} color={C.gray}/>
                <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Xodim topilmadi</div>
              </div>
            )}
            {paginated.map((emp,idx)=>{
              const col  = avColor(emp.second_name);
              const deg  = getDeg(emp.academicDegree.code);
              const pos  = getPos(emp.staffPosition.code);
              const form = getForm(emp.employmentForm.code);
              const hasDeg = emp.academicDegree.code!=="10";
              return (
                <div key={emp.meta_id}
                  style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
                    overflow:"hidden",transition:"all 0.18s",cursor:"pointer",
                    animation:`fadeUp 0.28s ${(idx%12)*30}ms ease both`}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 32px ${col}18`;e.currentTarget.style.borderColor=`${col}40`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor=C.gray;}}
                  onClick={()=>setDetailItem(emp)}>

                  {/* color stripe */}
                  <div style={{height:4,background:`linear-gradient(90deg,${col},${col}88)`}}/>

                  <div style={{padding:"16px"}}>
                    {/* top row */}
                    <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                      <Avatar emp={emp} size={52}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:800,color:C.dark,lineHeight:1.25,
                          overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                          {emp.full_name}
                        </div>
                        <div style={{fontSize:11,color:C.light,marginTop:3,
                          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {emp.department.name}
                        </div>
                      </div>
                    </div>

                    {/* specialty */}
                    <div style={{fontSize:11,color:C.mid,marginBottom:10,lineHeight:1.4,
                      overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",
                      padding:"5px 8px",borderRadius:7,background:C.lightGray}}>
                      {emp.specialty}
                    </div>

                    {/* badges */}
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:pos.bg,color:pos.color}}>{pos.label}</span>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:form.bg,color:form.color}}>{form.label}</span>
                      {hasDeg&&(
                        <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                          background:deg.bg,color:deg.color}}>{deg.label}</span>
                      )}
                      <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,
                        background:emp.gender.code==="12"?C.pinkLight:C.lightBlue,
                        color:emp.gender.code==="12"?C.pink:C.blue,marginLeft:"auto"}}>
                        {emp.gender.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ TABLE VIEW ═══ */}
        {viewMode==="table"&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
            <div style={{display:"grid",
              gridTemplateColumns:"44px 52px 1fr 160px 130px 120px 110px 90px",
              padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
              {["#","Foto","F.I.Sh.","Kafedra","Lavozim","Ish shakli","Ilmiy daraja","Amallar"].map((h,i)=>(
                <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                  textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
              ))}
            </div>

            {paginated.length===0&&(
              <div style={{padding:"48px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:600,color:C.mid}}>Xodim topilmadi</div>
              </div>
            )}

            {paginated.map((emp,idx)=>{
              const pos  = getPos(emp.staffPosition.code);
              const form = getForm(emp.employmentForm.code);
              const deg  = getDeg(emp.academicDegree.code);
              return (
                <div key={emp.meta_id}
                  style={{display:"grid",
                    gridTemplateColumns:"44px 52px 1fr 160px 130px 120px 110px 90px",
                    padding:"10px 16px",borderBottom:`1px solid ${C.lightGray}`,
                    background:C.white,transition:"background 0.15s",
                    animation:`fadeUp 0.22s ${idx*20}ms ease both`}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                  onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{emp.id}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <Avatar emp={emp} size={34}/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:C.dark}}>{emp.full_name}</div>
                      <div style={{fontSize:10,color:C.light,marginTop:1}}>{emp.specialty}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.mid,fontWeight:600,lineHeight:1.3,
                      overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                      {emp.department.name}
                    </span>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                      background:pos.bg,color:pos.color}}>{pos.label}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                      background:form.bg,color:form.color}}>{form.label}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    {deg.label!=="Darajasiz"
                      ? <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                          background:deg.bg,color:deg.color}}>{deg.label}</span>
                      : <span style={{fontSize:11,color:C.gray}}>—</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <button onClick={()=>setDetailItem(emp)}
                      style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                        background:C.lightBlue,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.eye} size={12} color={C.bright}/>
                    </button>
                    <button onClick={()=>showToast("Tahrirlash ochildi")}
                      style={{width:28,height:28,borderRadius:7,border:"none",cursor:"pointer",
                        background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.edit} size={12} color={C.green}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {pageCount>1&&(
          <div style={{marginTop:14,display:"flex",alignItems:"center",
            justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{fontSize:12,color:C.light}}>
              <b style={{color:C.dark}}>{(page-1)*PAGE+1}</b>–
              <b style={{color:C.dark}}>{Math.min(page*PAGE,filtered.length)}</b>
              {" "}/ <b style={{color:C.dark}}>{filtered.length}</b>
            </div>
            <div style={{display:"flex",gap:4}}>
              <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
                style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:page===1?"not-allowed":"pointer",background:C.white,
                  display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
                <Ico d={I.chevL} size={14} color={C.mid}/>
              </button>
              {pageNums().map((n,i)=>(
                <button key={i} onClick={()=>n!=="..."&&setPage(n)}
                  style={{width:32,height:32,borderRadius:8,fontFamily:"inherit",fontSize:13,fontWeight:600,
                    border:`1px solid ${n===page?C.bright:C.gray}`,cursor:n==="..."?"default":"pointer",
                    background:n===page?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                    color:n===page?C.white:n==="..."?C.light:C.mid,transition:"all 0.15s"}}>
                  {n}
                </button>
              ))}
              <button disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}
                style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                  cursor:page===pageCount?"not-allowed":"pointer",background:C.white,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  opacity:page===pageCount?0.4:1}}>
                <Ico d={I.chevR} size={14} color={C.mid}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
