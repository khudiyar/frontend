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
  chevL:    "M15 18l-6-6 6-6",
  chevR:    "M9 18l6-6-6-6",
  calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  door:     "M3 21h18M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M9 21V9h6v12",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  building: "M3 21h18M3 7l9-4 9 4M4 11h16v10H4zM9 21V11M15 21V11",
  hash:     "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  filter:   "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
};

/* ── TRAINING TYPE CONFIG ── */
const TRAIN = {
  "11": {name:"Ma'ruza",  color:C.bright,  bg:C.lightBlue,   short:"MR"},
  "12": {name:"Lab",      color:C.green,   bg:C.greenLight,  short:"LB"},
  "13": {name:"Amaliy",   color:C.purple,  bg:C.purpleLight, short:"AM"},
  "14": {name:"Seminar",  color:C.teal,    bg:C.tealLight,   short:"SE"},
  "17": {name:"Mustaqil", color:C.orange,  bg:C.orangeLight, short:"MS"},
};
const getTrain = code => TRAIN[code] || {name:code,color:C.mid,bg:C.lightGray,short:"???"};

/* ── LANG CONFIG ── */
const LANG = {
  "11": {name:"O'zbek",     flag:"🇺🇿", color:C.green},
  "12": {name:"Rus",        flag:"🇷🇺", color:C.blue},
  "13": {name:"Qoraqalpoq", flag:"🌐",  color:C.purple},
};

/* ── DAYS ── */
const DAYS = ["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];
const DAY_SHORT = ["Du","Se","Ch","Pa","Ju","Sh"];

/* ── REAL DATA ── */
const RAW = [
  {id:100676,subject:{id:444,name:"Ishlab chiqarishni tashkil qilish va avtomatlashtirishni rejalashtirish",code:"ICHTQAJ1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:426,name:"M-TJ-QQ-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:23,name:"305",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:20},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"17",name:"3-2",start_time:"16:30",end_time:"17:50",_education_year:"2025"},employee:{id:92,name:"ABUBAKIROV A. B."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772868139,_week:37052},
  {id:100675,subject:{id:444,name:"Ishlab chiqarishni tashkil qilish va avtomatlashtirishni rejalashtirish",code:"ICHTQAJ1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:426,name:"M-TJ-QQ-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:23,name:"305",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:20},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"16",name:"2-2",start_time:"15:00",end_time:"16:20",_education_year:"2025"},employee:{id:92,name:"ABUBAKIROV A. B."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772868132,_week:37052},
  {id:100674,subject:{id:445,name:"Boshqarishning intellektual tizimlari va qaror qabul qilish",code:"BITQQQ1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:426,name:"M-TJ-QQ-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:23,name:"305",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:20},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"15",name:"1-2",start_time:"13:30",end_time:"14:50",_education_year:"2025"},employee:{id:102,name:"KURBANIYAZOV T. U."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772868113,_week:37052},
  {id:100673,subject:{id:446,name:"Qiyoslash muhandisligi",code:"QM1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:426,name:"M-TJ-QQ-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:24,name:"306",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:30},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"17",name:"3-2",start_time:"16:30",end_time:"17:50",_education_year:"2025"},employee:{id:100,name:"YULDASHEV A. A."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772868095,_week:37052},
  {id:100672,subject:{id:446,name:"Qiyoslash muhandisligi",code:"QM1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:426,name:"M-TJ-QQ-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:24,name:"306",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:30},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"16",name:"2-2",start_time:"15:00",end_time:"16:20",_education_year:"2025"},employee:{id:100,name:"YULDASHEV A. A."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772868086,_week:37052},
  {id:100671,subject:{id:445,name:"Boshqarishning intellektual tizimlari va qaror qabul qilish",code:"BITQQQ1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:426,name:"M-TJ-QQ-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:23,name:"305",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:20},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"15",name:"1-2",start_time:"13:30",end_time:"14:50",_education_year:"2025"},employee:{id:102,name:"KURBANIYAZOV T. U."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772868065,_week:37052},
  {id:100670,subject:{id:456,name:"Konchilik korxonalarini loyihalashning nazariy asoslari",code:"KKLNA1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:447,name:"M-KI-A-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"17",name:"3-2",start_time:"16:30",end_time:"17:50",_education_year:"2025"},employee:{id:206,name:"DJAKSÍMURATOV K. M."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772868032,_week:33464},
  {id:100669,subject:{id:457,name:"Konchilikda raqamli texnologiyalar",code:"KRT1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:447,name:"M-KI-A-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"16",name:"2-2",start_time:"15:00",end_time:"16:20",_education_year:"2025"},employee:{id:452,name:"JAQSÍBAEV R. N."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867972,_week:33464},
  {id:100668,subject:{id:457,name:"Konchilikda raqamli texnologiyalar",code:"KRT1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:447,name:"M-KI-A-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"15",name:"1-2",start_time:"13:30",end_time:"14:50",_education_year:"2025"},employee:{id:452,name:"JAQSÍBAEV R. N."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867966,_week:33464},
  {id:100667,subject:{id:455,name:"Konchilik ishlarida portlatish ishlari texnologiyalari va xavfsizligi",code:"KIPITX1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:447,name:"M-KI-A-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"13",name:"3-1",start_time:"11:40",end_time:"13:00",_education_year:"2025"},employee:{id:216,name:"BEKIMBETOV R. T."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772867924,_week:33464},
  {id:100666,subject:{id:456,name:"Konchilik korxonalarini loyihalashning nazariy asoslari",code:"KKLNA1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:447,name:"M-KI-A-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"12",name:"2-1",start_time:"10:00",end_time:"11:20",_education_year:"2025"},employee:{id:206,name:"DJAKSÍMURATOV K. M."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772867846,_week:33464},
  {id:100665,subject:{id:454,name:"Ochiq va yer osti usulida qazib olish",code:"OYOUQO1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:447,name:"M-KI-A-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"11",name:"1-1",start_time:"08:30",end_time:"09:50",_education_year:"2025"},employee:{id:460,name:"REYMOV M. R."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772867809,_week:33464},
  {id:100664,subject:{id:457,name:"Konchilikda raqamli texnologiyalar",code:"KRT1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:448,name:"M-KI-B-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"13",name:"3-1",start_time:"11:40",end_time:"13:00",_education_year:"2025"},employee:{id:452,name:"JAQSÍBAEV R. N."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867538,_week:33464},
  {id:100663,subject:{id:457,name:"Konchilikda raqamli texnologiyalar",code:"KRT1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:448,name:"M-KI-B-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"12",name:"2-1",start_time:"10:00",end_time:"11:20",_education_year:"2025"},employee:{id:452,name:"JAQSÍBAEV R. N."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867530,_week:33464},
  {id:100662,subject:{id:456,name:"Konchilik korxonalarini loyihalashning nazariy asoslari",code:"KKLNA1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:448,name:"M-KI-B-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"11",name:"1-1",start_time:"08:30",end_time:"09:50",_education_year:"2025"},employee:{id:206,name:"DJAKSÍMURATOV K. M."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867502,_week:33464},
  {id:100661,subject:{id:455,name:"Konchilik ishlarida portlatish ishlari texnologiyalari va xavfsizligi",code:"KIPITX1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:448,name:"M-KI-B-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"13",name:"3-1",start_time:"11:40",end_time:"13:00",_education_year:"2025"},employee:{id:216,name:"BEKIMBETOV R. T."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772867477,_week:33464},
  {id:100660,subject:{id:456,name:"Konchilik korxonalarini loyihalashning nazariy asoslari",code:"KKLNA1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:448,name:"M-KI-B-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"11",name:"1-1",start_time:"08:30",end_time:"09:50",_education_year:"2025"},employee:{id:206,name:"DJAKSÍMURATOV K. M."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772867443,_week:33464},
  {id:100659,subject:{id:456,name:"Konchilik korxonalarini loyihalashning nazariy asoslari",code:"KKLNA1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:448,name:"M-KI-B-25",educationLang:{code:"13",name:"Qoraqalpoq"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:13,name:"Konchilik va metallurgiya",code:"540-103-09"},auditorium:{code:11,name:"205",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:16},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"11",name:"1-1",start_time:"08:30",end_time:"09:50",_education_year:"2025"},employee:{id:206,name:"DJAKSÍMURATOV K. M."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773187200,updated_at:1772867431,_week:33464},
  {id:100658,subject:{id:446,name:"Qiyoslash muhandisligi",code:"QM1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:427,name:"M-TJ-UZB-25",educationLang:{code:"11",name:"O'zbek"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:24,name:"306",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:30},trainingType:{code:"13",name:"Amaliy"},lessonPair:{code:"12",name:"2-1",start_time:"10:00",end_time:"11:20",_education_year:"2025"},employee:{id:100,name:"YULDASHEV A. A."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867357,_week:37052},
  {id:100657,subject:{id:444,name:"Ishlab chiqarishni tashkil qilish va avtomatlashtirishni rejalashtirish",code:"ICHTQAJ1606"},semester:{id:1394,code:"12",name:"2-semestr"},educationYear:{code:"2025",name:"2025-2026",current:true},group:{id:427,name:"M-TJ-UZB-25",educationLang:{code:"11",name:"O'zbek"}},faculty:{id:3,name:"Konchilik ishi va energetika",code:"540-103"},department:{id:29,name:"Avtomatlashtirish va boshqaruv",code:"540-103-16"},auditorium:{code:23,name:"305",auditoriumType:{code:"11",name:"Ma'ruza"},building:{id:32,name:"4-Bino"},volume:20},trainingType:{code:"11",name:"Ma'ruza"},lessonPair:{code:"13",name:"3-1",start_time:"11:40",end_time:"13:00",_education_year:"2025"},employee:{id:92,name:"ABUBAKIROV A. B."},weekStartTime:1773014400,weekEndTime:1773446400,lesson_date:1773360000,updated_at:1772867335,_week:37052},
];

/* ── lesson_date → weekday index (0=Du,1=Se,...) ── */
// weekStartTime = 1773014400 = Monday
const WEEK_START = 1773014400;
const dayIndex = ts => {
  const diff = Math.floor((ts - WEEK_START) / 86400);
  return Math.max(0, Math.min(5, diff));
};

/* ── all unique pairs sorted by start_time ── */
const ALL_PAIRS = [
  {code:"11",name:"1-1",start_time:"08:30",end_time:"09:50"},
  {code:"12",name:"2-1",start_time:"10:00",end_time:"11:20"},
  {code:"13",name:"3-1",start_time:"11:40",end_time:"13:00"},
  {code:"15",name:"1-2",start_time:"13:30",end_time:"14:50"},
  {code:"16",name:"2-2",start_time:"15:00",end_time:"16:20"},
  {code:"17",name:"3-2",start_time:"16:30",end_time:"17:50"},
];

/* ── enrich each lesson with dayIndex ── */
const LESSONS = RAW.map(r => ({...r, _dayIdx: dayIndex(r.lesson_date)}));

/* ── group colors per group id ── */
const GRP_COLORS = [C.bright, C.purple, C.teal, C.orange, C.green, C.red, C.pink];
const grpColor = id => GRP_COLORS[id % GRP_COLORS.length];

const Sel = ({value, onChange, children, style={}}) => (
  <div style={{position:"relative", ...style}}>
    <select value={value} onChange={onChange}
      style={{width:"100%", padding:"8px 28px 8px 12px", borderRadius:9,
        border:`1.5px solid ${C.gray}`, fontSize:13,
        color: value ? C.dark : C.light, background:C.white, cursor:"pointer"}}>
      {children}
    </select>
    <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
      <Ico d={I.chevD} size={13} color={C.light}/>
    </div>
  </div>
);

/* ── DETAIL MODAL ── */
function DetailModal({item, onClose}) {
  if (!item) return null;
  const tr  = getTrain(item.trainingType.code);
  const lng = LANG[item.group.educationLang.code] || {};
  const gc  = grpColor(item.group.id);
  return (
    <div onClick={e => e.target===e.currentTarget && onClose()}
      style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.44)",
        backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,animation:"fadeIn 0.18s ease"}}>
      <div style={{background:C.white,borderRadius:22,width:"min(480px,96vw)",
        boxShadow:"0 28px 70px rgba(13,26,99,0.22)",animation:"fadeUp 0.22s ease",overflow:"hidden"}}>

        {/* header */}
        <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:"20px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:tr.bg, color:tr.color}}>{tr.name}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,
                  background:"rgba(255,255,255,0.18)",color:C.white}}>
                  {DAYS[item._dayIdx]} • {item.lessonPair.start_time}–{item.lessonPair.end_time}
                </span>
              </div>
              <div style={{fontSize:15,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif",
                lineHeight:1.35,marginBottom:4}}>{item.subject.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",fontFamily:"monospace"}}>{item.subject.code}</div>
            </div>
            <button onClick={onClose}
              style={{width:30,height:30,flexShrink:0,borderRadius:8,border:"none",cursor:"pointer",
                background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.x} size={14} color={C.white}/>
            </button>
          </div>
        </div>

        {/* body */}
        <div style={{padding:"18px 24px"}}>
          {/* group + lang */}
          <div style={{display:"flex",gap:10,marginBottom:14}}>
            <div style={{flex:1,padding:"10px 12px",borderRadius:11,
              background:`${gc}0D`,border:`1.5px solid ${gc}22`,
              display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,borderRadius:9,background:`${gc}20`,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.layers} size={14} color={gc}/>
              </div>
              <div>
                <div style={{fontSize:10,color:C.light,fontWeight:600}}>Guruh</div>
                <div style={{fontSize:14,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{item.group.name}</div>
              </div>
              <span style={{marginLeft:"auto",fontSize:16}}>{lng.flag}</span>
            </div>
            <div style={{padding:"10px 12px",borderRadius:11,background:C.lightGray,
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minWidth:72}}>
              <div style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                {item.lessonPair.name}
              </div>
              <div style={{fontSize:9,color:C.light,fontWeight:600,marginTop:2}}>juftlik</div>
            </div>
          </div>

          {[
            [I.user,     "O'qituvchi",   item.employee.name],
            [I.door,     "Auditoriya",   `${item.auditorium.name} (${item.auditorium.building.name}) — ${item.auditorium.volume} o'rin`],
            [I.building, "Kafedra",      item.department.name],
            [I.hash,     "Semestr",      item.semester.name],
            [I.calendar, "O'quv yili",   item.educationYear.name],
            [I.book,     "Fan kodi",     item.subject.code],
          ].map(([ico,label,val])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:10,
              padding:"8px 0",borderBottom:`1px solid ${C.lightGray}`}}>
              <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={ico} size={13} color={C.mid}/>
              </div>
              <span style={{fontSize:11,color:C.light,fontWeight:600,width:90,flexShrink:0}}>{label}</span>
              <span style={{fontSize:12,color:C.dark,fontWeight:700,flex:1}}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{padding:"12px 24px 20px",display:"flex",gap:8}}>
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

/* ── LESSON CARD (inside grid cell) ── */
function LessonCard({item, onClick}) {
  const tr = getTrain(item.trainingType.code);
  const gc = grpColor(item.group.id);
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius:10, padding:"7px 9px", cursor:"pointer",
        background: hov ? `${tr.color}12` : `${tr.color}08`,
        border:`1.5px solid ${hov ? tr.color+"60" : tr.color+"25"}`,
        transition:"all 0.15s", marginBottom:4,
      }}>
      {/* train type badge */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20,
          background:tr.bg,color:tr.color}}>{tr.short}</span>
        <span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20,
          background:`${gc}18`,color:gc}}>{item.group.name}</span>
      </div>
      {/* subject */}
      <div style={{fontSize:10,fontWeight:700,color:C.dark,lineHeight:1.3,marginBottom:2,
        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
        {item.subject.name}
      </div>
      {/* employee + auditorium */}
      <div style={{fontSize:9,color:C.light,display:"flex",alignItems:"center",gap:4,marginTop:3}}>
        <Ico d={I.user} size={9} color={C.light}/>
        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>
          {item.employee.name}
        </span>
      </div>
      <div style={{fontSize:9,color:C.light,display:"flex",alignItems:"center",gap:4,marginTop:1}}>
        <Ico d={I.door} size={9} color={C.light}/>
        <span>{item.auditorium.name} • {item.auditorium.building.name}</span>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function ScheduleListPage() {
  const [filterGroup,  setFilterGroup]  = useState("");
  const [filterTrain,  setFilterTrain]  = useState("");
  const [filterEmp,    setFilterEmp]    = useState("");
  const [viewMode,     setViewMode]     = useState("grid"); // grid | list | group
  const [detail,       setDetail]       = useState(null);
  const [toast,        setToast]        = useState(null);
  const [page,         setPage]         = useState(1);
  const PAGE = 10;

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  /* unique values for filters */
  const groups    = useMemo(()=>{ const m={}; LESSONS.forEach(r=>{ if(!m[r.group.id]) m[r.group.id]=r.group; }); return Object.values(m); },[]);
  const employees = useMemo(()=>{ const m={}; LESSONS.forEach(r=>{ if(!m[r.employee.id]) m[r.employee.id]=r.employee.name; }); return Object.entries(m).map(([id,name])=>({id:Number(id),name})); },[]);

  /* filter */
  const filtered = useMemo(()=>LESSONS.filter(r=>{
    if(filterGroup && r.group.id !== Number(filterGroup)) return false;
    if(filterTrain && r.trainingType.code !== filterTrain) return false;
    if(filterEmp   && r.employee.id !== Number(filterEmp)) return false;
    return true;
  }),[filterGroup,filterTrain,filterEmp]);

  const hasFilter = filterGroup||filterTrain||filterEmp;

  /* ── GRID: days × pairs ── */
  const gridMap = useMemo(()=>{
    const m = {};
    filtered.forEach(r=>{
      const key = `${r._dayIdx}_${r.lessonPair.code}`;
      if(!m[key]) m[key]=[];
      m[key].push(r);
    });
    return m;
  },[filtered]);

  /* ── STATS ── */
  const byTrain = useMemo(()=>{
    const m={};
    LESSONS.forEach(r=>{ m[r.trainingType.code]=(m[r.trainingType.code]||0)+1; });
    return m;
  },[]);

  /* list pagination */
  const paginated = filtered.slice((page-1)*PAGE, page*PAGE);
  const pageCount = Math.ceil(filtered.length/PAGE);
  const pageNums  = ()=>{
    const pc=pageCount,p=page;
    if(pc<=7) return Array.from({length:pc},(_,i)=>i+1);
    if(p<=4)  return [1,2,3,4,5,"...",pc];
    if(p>=pc-3) return [1,"...",pc-4,pc-3,pc-2,pc-1,pc];
    return [1,"...",p-1,p,p+1,"...",pc];
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

      <DetailModal item={detail} onClose={()=>setDetail(null)}/>

      <div style={{padding:"24px 28px",maxWidth:1400,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Dars jadvali
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Hafta: <b style={{color:C.dark}}>21–26 Apr 2025</b> •{" "}
              Jami: <b style={{color:C.dark}}>58 850</b> yozuv •{" "}
              Ko'rsatilmoqda: <b style={{color:C.dark}}>{LESSONS.length}</b> ta
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[
                {m:"grid",  i:I.calendar, title:"Haftalik grid"},
                {m:"group", i:I.grid,     title:"Guruh bo'yicha"},
                {m:"list",  i:I.list,     title:"Ro'yxat"},
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
            <button onClick={()=>showToast("Yangi dars qo'shildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Qo'shish
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Jami darslar", v:LESSONS.length, c:C.bright,  bg:C.lightBlue,   i:I.calendar},
            ...Object.entries(byTrain).map(([code,cnt])=>{
              const tr=getTrain(code);
              return {l:tr.name, v:cnt, c:tr.color, bg:tr.bg, i:I.book};
            }),
          ].slice(0,4).map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.i} size={18} color={s.c}/>
              </div>
              <div>
                <div style={{fontSize:24,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:18,
          display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <Sel value={filterGroup} onChange={e=>{setFilterGroup(e.target.value);setPage(1);}} style={{minWidth:180}}>
            <option value="">Barcha guruhlar</option>
            {groups.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}
          </Sel>
          <Sel value={filterEmp} onChange={e=>{setFilterEmp(e.target.value);setPage(1);}} style={{minWidth:220}}>
            <option value="">Barcha o'qituvchilar</option>
            {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </Sel>
          <Sel value={filterTrain} onChange={e=>{setFilterTrain(e.target.value);setPage(1);}} style={{minWidth:150}}>
            <option value="">Dars turi</option>
            {Object.entries(TRAIN).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </Sel>
          {hasFilter&&(
            <button onClick={()=>{setFilterGroup("");setFilterTrain("");setFilterEmp("");setPage(1);}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
          <div style={{marginLeft:"auto",fontSize:12,color:C.light}}>
            {filtered.length} ta natija
          </div>
        </div>

        {/* ════════ GRID VIEW ════════ */}
        {viewMode==="grid"&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"auto"}}>
            <div style={{minWidth:900}}>
              {/* header row */}
              <div style={{display:"grid",gridTemplateColumns:`130px repeat(6,1fr)`,
                borderBottom:`2px solid ${C.gray}`}}>
                <div style={{padding:"12px 14px",background:C.lightGray,
                  borderRight:`1px solid ${C.gray}`,display:"flex",alignItems:"center"}}>
                  <span style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"0.8px"}}>
                    Vaqt / Kun
                  </span>
                </div>
                {DAYS.map((day,di)=>{
                  // compute date label
                  const ts = WEEK_START + di*86400;
                  const d = new Date(ts*1000);
                  const label = `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}`;
                  const count = filtered.filter(r=>r._dayIdx===di).length;
                  return (
                    <div key={day} style={{padding:"10px 12px",background:C.lightGray,
                      borderRight:`1px solid ${C.gray}`,textAlign:"center"}}>
                      <div style={{fontSize:13,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{day}</div>
                      <div style={{fontSize:11,color:C.light}}>{label}</div>
                      {count>0&&<div style={{marginTop:3,fontSize:9,fontWeight:700,padding:"1px 6px",
                        borderRadius:20,background:C.lightBlue,color:C.bright,display:"inline-block"}}>
                        {count} dars
                      </div>}
                    </div>
                  );
                })}
              </div>

              {/* pair rows */}
              {ALL_PAIRS.map((pair,pi)=>(
                <div key={pair.code}
                  style={{display:"grid",gridTemplateColumns:`130px repeat(6,1fr)`,
                    borderBottom:`1px solid ${C.lightGray}`,
                    background:pi%2===0?C.white:C.lightGray+"66"}}>
                  {/* time label */}
                  <div style={{padding:"10px 12px",borderRight:`1px solid ${C.gray}`,
                    display:"flex",flexDirection:"column",justifyContent:"center",
                    background:"rgba(255,255,255,0.8)"}}>
                    <div style={{fontSize:12,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{pair.name}</div>
                    <div style={{fontSize:10,color:C.bright,fontWeight:600}}>{pair.start_time}</div>
                    <div style={{width:16,height:1,background:C.gray,margin:"3px 0"}}/>
                    <div style={{fontSize:10,color:C.light}}>{pair.end_time}</div>
                  </div>

                  {/* day cells */}
                  {DAYS.map((_,di)=>{
                    const key   = `${di}_${pair.code}`;
                    const items = gridMap[key] || [];
                    return (
                      <div key={di} style={{padding:"8px",borderRight:`1px solid ${C.lightGray}`,
                        minHeight:80,verticalAlign:"top"}}>
                        {items.map(item=>(
                          <LessonCard key={item.id} item={item} onClick={setDetail}/>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ GROUP VIEW ════════ */}
        {viewMode==="group"&&(()=>{
          const byGroup = {};
          filtered.forEach(r=>{
            if(!byGroup[r.group.id]) byGroup[r.group.id]={group:r.group,lessons:[]};
            byGroup[r.group.id].lessons.push(r);
          });
          return (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {Object.values(byGroup).map((grp,gi)=>{
                const gc = grpColor(grp.group.id);
                const lng = LANG[grp.group.educationLang.code]||{};
                return (
                  <div key={grp.group.id}
                    style={{background:C.white,borderRadius:16,border:`1.5px solid ${C.gray}`,
                      overflow:"hidden",animation:`fadeUp 0.28s ${gi*60}ms ease both`}}>
                    {/* group header */}
                    <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",
                      background:`linear-gradient(135deg,${gc}0A,${gc}04)`,
                      borderBottom:`1px solid ${gc}20`}}>
                      <div style={{width:44,height:44,borderRadius:13,
                        background:`linear-gradient(135deg,${gc},${gc}aa)`,
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:18,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>
                          {lng.flag||"📚"}
                        </span>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>
                          {grp.group.name}
                        </div>
                        <div style={{fontSize:11,color:C.light,marginTop:2}}>
                          {lng.name} tili •{" "}
                          <b style={{color:gc}}>{grp.lessons.length}</b> ta dars
                        </div>
                      </div>
                      {/* mini day chips */}
                      <div style={{display:"flex",gap:4}}>
                        {[0,1,2,3,4,5].map(di=>{
                          const cnt = grp.lessons.filter(l=>l._dayIdx===di).length;
                          return cnt>0 ? (
                            <div key={di} style={{textAlign:"center",padding:"3px 7px",borderRadius:8,
                              background:`${gc}15`,border:`1px solid ${gc}25`}}>
                              <div style={{fontSize:9,fontWeight:700,color:gc}}>{DAY_SHORT[di]}</div>
                              <div style={{fontSize:10,fontWeight:800,color:C.dark}}>{cnt}</div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {/* lessons */}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))"}}>
                      {grp.lessons
                        .sort((a,b)=>a._dayIdx-b._dayIdx || a.lessonPair.start_time.localeCompare(b.lessonPair.start_time))
                        .map((item,idx)=>{
                          const tr = getTrain(item.trainingType.code);
                          return (
                            <div key={item.id}
                              onClick={()=>setDetail(item)}
                              style={{padding:"11px 16px",cursor:"pointer",transition:"background 0.15s",
                                borderRight:(idx%2===0)?`1px solid ${C.lightGray}`:"none",
                                borderBottom:`1px solid ${C.lightGray}`,background:C.white,
                                animation:`fadeUp 0.2s ${idx*20}ms ease both`}}
                              onMouseEnter={e=>e.currentTarget.style.background=`${tr.color}06`}
                              onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                                <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,
                                  background:tr.bg,color:tr.color,flexShrink:0}}>{tr.name}</span>
                                <span style={{fontSize:10,fontWeight:700,color:C.mid,
                                  background:C.lightGray,padding:"2px 7px",borderRadius:20,flexShrink:0}}>
                                  {DAYS[item._dayIdx]} {item.lessonPair.start_time}
                                </span>
                              </div>
                              <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.3,marginBottom:4,
                                display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                                {item.subject.name}
                              </div>
                              <div style={{display:"flex",gap:10}}>
                                <span style={{fontSize:10,color:C.light,display:"flex",alignItems:"center",gap:3}}>
                                  <Ico d={I.user} size={9} color={C.light}/>{item.employee.name}
                                </span>
                                <span style={{fontSize:10,color:C.light,display:"flex",alignItems:"center",gap:3}}>
                                  <Ico d={I.door} size={9} color={C.light}/>{item.auditorium.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ════════ LIST VIEW ════════ */}
        {viewMode==="list"&&(
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              <div style={{display:"grid",
                gridTemplateColumns:"52px 80px 80px 1fr 120px 90px 80px 100px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {["ID","Kun","Juftlik","Fan","O'qituvchi","Guruh","Xona","Tur"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:C.light,
                    textTransform:"uppercase",letterSpacing:"0.8px"}}>{h}</div>
                ))}
              </div>
              {paginated.map((item,idx)=>{
                const tr = getTrain(item.trainingType.code);
                const gc = grpColor(item.group.id);
                return (
                  <div key={item.id}
                    onClick={()=>setDetail(item)}
                    style={{display:"grid",
                      gridTemplateColumns:"52px 80px 80px 1fr 120px 90px 80px 100px",
                      padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,cursor:"pointer",transition:"background 0.15s",
                      animation:`fadeUp 0.2s ${idx*20}ms ease both`}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,color:C.light}}>#{item.id}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.dark}}>{DAYS[item._dayIdx]}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:11,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{item.lessonPair.start_time}</div>
                        <div style={{fontSize:9,color:C.light}}>{item.lessonPair.name}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",paddingRight:8}}>
                      <div>
                        <div style={{fontSize:11,fontWeight:700,color:C.dark,lineHeight:1.2,
                          overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical"}}>
                          {item.subject.name}
                        </div>
                        <div style={{fontSize:9,color:C.light,fontFamily:"monospace",marginTop:1}}>{item.subject.code}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:600,color:C.mid,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.employee.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                        background:`${gc}15`,color:gc}}>{item.group.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.dark}}>{item.auditorium.name}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                        background:tr.bg,color:tr.color}}>{tr.short}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* pagination */}
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
                        color:n===page?C.white:n==="..."?C.light:C.mid}}>
                      {n}
                    </button>
                  ))}
                  <button disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===pageCount?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",opacity:page===pageCount?0.4:1}}>
                    <Ico d={I.chevR} size={14} color={C.mid}/>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
