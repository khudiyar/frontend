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
  @keyframes spin{to{transform:rotate(360deg)}}
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
const I={
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  award:   "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  check:   "M20 6L9 17l-5-5",
  x:       "M18 6L6 18M6 6l12 12",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevL:   "M15 18l-6-6 6-6",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  plus:    "M12 5v14M5 12h14",
  dept:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  lecture: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  lab:     "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 0-2-2v-4m0 0h18",
  practice:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 1 2 2",
  self:    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  info:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
};

/* ── TRAINING TYPE CONFIG ── */
const TRAIN_CFG = {
  "11":{label:"Ma'ruza",      icon:I.lecture, color:C.bright,  bg:C.lightBlue},
  "12":{label:"Laboratoriya", icon:I.lab,     color:C.green,   bg:C.greenLight},
  "13":{label:"Amaliy",       icon:I.practice,color:C.purple,  bg:C.purpleLight},
  "14":{label:"Seminar",      icon:I.book,    color:C.teal,    bg:C.tealLight},
  "17":{label:"Mustaqil",     icon:I.self,    color:C.orange,  bg:C.orangeLight},
  "20":{label:"Boshqa",       icon:I.info,    color:C.mid,     bg:C.lightGray},
};
const getTrain = code => TRAIN_CFG[code] || TRAIN_CFG["20"];

/* ── SUBJECT TYPE ── */
const TYPE_CFG = {
  "11":{label:"Majburiy", color:C.bright, bg:C.lightBlue},
  "12":{label:"Tanlov",   color:C.purple, bg:C.purpleLight},
};
const getType = code => TYPE_CFG[code] || {label:"Boshqa",color:C.mid,bg:C.lightGray};

/* ── EXAM TYPE ── */
const EXAM_COLOR = {
  "17":{color:C.bright,  bg:C.lightBlue},   // 1-on
  "18":{color:C.purple,  bg:C.purpleLight},  // 2-on
  "13":{color:C.red,     bg:C.redLight},     // Yakuniy
  "14":{color:C.dark,    bg:C.lightGray},    // Umumiy
  "12":{color:C.teal,    bg:C.tealLight},    // Oraliq
};
const getExam = code => EXAM_COLOR[code] || {color:C.mid,bg:C.lightGray};

/* ── SEMESTER COLORS ── */
const SEM_COLORS = [
  {bg:"#EDE9FE",color:C.purple},
  {bg:"#EEF2FF",color:C.bright},
  {bg:"#F0FDF4",color:C.green},
  {bg:"#FFFBEB",color:C.yellow},
  {bg:"#FFF4ED",color:C.orange},
  {bg:"#F0FDFA",color:C.teal},
  {bg:"#FDF2F8",color:C.pink},
  {bg:"#FEF2F2",color:C.red},
];
const semColor = idx => SEM_COLORS[idx % SEM_COLORS.length];

/* ── RAW DATA ── */
const RAW = [
  {id:1,subject:{id:168,name:"Oliy matematika",code:"OM1203"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:1,trainingType:{code:"11",name:"Ma'ruza"},academic_load:38},{id:2,trainingType:{code:"13",name:"Amaliy"},academic_load:38},{id:3,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:74}],subjectExamTypes:[{id:1,max_ball:25,examType:{code:"17",name:"1-on"}},{id:3,max_ball:25,examType:{code:"18",name:"2-on"}},{id:4,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:2,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:18,name:"Tabiiy fanlar"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:150,resource_count:0,in_group:null,at_semester:true,active:true,credit:5},
  {id:3,subject:{id:169,name:"Fizika",code:"FIZ1306"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:4,trainingType:{code:"11",name:"Ma'ruza"},academic_load:36},{id:6,trainingType:{code:"12",name:"Laboratoriya"},academic_load:18},{id:5,trainingType:{code:"13",name:"Amaliy"},academic_load:20},{id:7,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:76}],subjectExamTypes:[{id:5,max_ball:25,examType:{code:"17",name:"1-on"}},{id:7,max_ball:25,examType:{code:"18",name:"2-on"}},{id:8,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:6,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:18,name:"Tabiiy fanlar"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:150,resource_count:0,in_group:null,at_semester:true,active:true,credit:5},
  {id:10,subject:{id:171,name:"O'zbek tili",code:"O'T1306"},subjectType:{code:"12",name:"Tanlov"},subjectBlock:{code:"11.20",name:"Tanlov fanlar"},subjectDetails:[{id:8797,trainingType:{code:"13",name:"Amaliy"},academic_load:48},{id:8798,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:4865,max_ball:25,examType:{code:"17",name:"1-on"}},{id:4866,max_ball:25,examType:{code:"18",name:"2-on"}},{id:4863,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:4864,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:12,name:"Davlat tili va chet tillari"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:"6",at_semester:true,active:true,credit:4},
  {id:6,subject:{id:170,name:"Rus tili",code:"RT 1306"},subjectType:{code:"12",name:"Tanlov"},subjectBlock:{code:"11.20",name:"Tanlov fanlar"},subjectDetails:[{id:8,trainingType:{code:"13",name:"Amaliy"},academic_load:48},{id:9,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:9,max_ball:25,examType:{code:"17",name:"1-on"}},{id:11,max_ball:25,examType:{code:"18",name:"2-on"}},{id:12,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:10,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:12,name:"Davlat tili va chet tillari"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:"6",at_semester:true,active:true,credit:4},
  {id:15,subject:{id:172,name:"Muhandislik va kompyuter grafikasi",code:"MKG1204"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:12,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},{id:13,trainingType:{code:"13",name:"Amaliy"},academic_load:24},{id:14,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:17,max_ball:25,examType:{code:"17",name:"1-on"}},{id:19,max_ball:25,examType:{code:"18",name:"2-on"}},{id:20,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:18,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:14,name:"Energetika muhandisligi"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:21,subject:{id:173,name:"Jismoniy tarbiya va sport",code:"JTS1206"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:15,trainingType:{code:"13",name:"Amaliy"},academic_load:48},{id:16,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:21,max_ball:25,examType:{code:"17",name:"1-on"}},{id:23,max_ball:25,examType:{code:"18",name:"2-on"}},{id:24,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:22,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:18,name:"Tabiiy fanlar"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:28,subject:{id:175,name:"Kon korxonalarini loyihalash",code:"KSK113"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:17,trainingType:{code:"11",name:"Ma'ruza"},academic_load:32},{id:18,trainingType:{code:"13",name:"Amaliy"},academic_load:16},{id:19,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:25,max_ball:25,examType:{code:"17",name:"1-on"}},{id:27,max_ball:25,examType:{code:"18",name:"2-on"}},{id:28,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:26,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:6659,subject:{id:174,name:"Texnik tizimlarda axborot texnologiyalari",code:"TTAT1104"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:4817,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},{id:4819,trainingType:{code:"12",name:"Laboratoriya"},academic_load:12},{id:4818,trainingType:{code:"13",name:"Amaliy"},academic_load:12},{id:4820,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:3469,max_ball:100,examType:{code:"12",name:"Oraliq nazorat"}},{id:3470,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:14,name:"Energetika muhandisligi"},semester:{code:"11",name:"1-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:65,subject:{id:168,name:"Oliy matematika",code:"OM1203"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:38,trainingType:{code:"11",name:"Ma'ruza"},academic_load:38},{id:39,trainingType:{code:"13",name:"Amaliy"},academic_load:38},{id:40,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:74}],subjectExamTypes:[{id:52,max_ball:25,examType:{code:"17",name:"1-on"}},{id:54,max_ball:25,examType:{code:"18",name:"2-on"}},{id:55,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:53,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:18,name:"Tabiiy fanlar"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:150,resource_count:0,in_group:null,at_semester:true,active:true,credit:5},
  {id:67,subject:{id:169,name:"Fizika",code:"FIZ1306"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:41,trainingType:{code:"11",name:"Ma'ruza"},academic_load:38},{id:43,trainingType:{code:"12",name:"Laboratoriya"},academic_load:20},{id:42,trainingType:{code:"13",name:"Amaliy"},academic_load:18},{id:44,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:74}],subjectExamTypes:[{id:56,max_ball:25,examType:{code:"17",name:"1-on"}},{id:58,max_ball:25,examType:{code:"18",name:"2-on"}},{id:59,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:57,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:18,name:"Tabiiy fanlar"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:150,resource_count:0,in_group:null,at_semester:true,active:true,credit:5},
  {id:70,subject:{id:184,name:"Kimyo",code:"KM1104"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:45,trainingType:{code:"11",name:"Ma'ruza"},academic_load:36},{id:47,trainingType:{code:"12",name:"Laboratoriya"},academic_load:18},{id:46,trainingType:{code:"13",name:"Amaliy"},academic_load:20},{id:48,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:76}],subjectExamTypes:[{id:60,max_ball:25,examType:{code:"17",name:"1-on"}},{id:62,max_ball:25,examType:{code:"18",name:"2-on"}},{id:63,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:61,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:16,name:"Kimyo muhandisligi va ekologiya"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:150,resource_count:0,in_group:null,at_semester:true,active:true,credit:5},
  {id:74,subject:{id:185,name:"Xorijiy til",code:"XT1408"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:49,trainingType:{code:"13",name:"Amaliy"},academic_load:48},{id:50,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:64,max_ball:25,examType:{code:"17",name:"1-on"}},{id:66,max_ball:25,examType:{code:"18",name:"2-on"}},{id:67,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:65,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:12,name:"Davlat tili va chet tillari"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:79,subject:{id:186,name:"Geodeziya",code:"GEOD1106"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:51,trainingType:{code:"11",name:"Ma'ruza"},academic_load:30},{id:53,trainingType:{code:"12",name:"Laboratoriya"},academic_load:14},{id:52,trainingType:{code:"13",name:"Amaliy"},academic_load:16},{id:54,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:90}],subjectExamTypes:[{id:68,max_ball:25,examType:{code:"17",name:"1-on"}},{id:70,max_ball:25,examType:{code:"18",name:"2-on"}},{id:71,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:69,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:150,resource_count:0,in_group:null,at_semester:true,active:true,credit:5},
  {id:85,subject:{id:187,name:"O'zbekistonning eng yangi tarixi",code:"O'EYT1203"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:55,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},{id:56,trainingType:{code:"14",name:"Seminar"},academic_load:24},{id:57,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:72,max_ball:25,examType:{code:"17",name:"1-on"}},{id:74,max_ball:25,examType:{code:"18",name:"2-on"}},{id:75,max_ball:50,examType:{code:"13",name:"Yakuniy nazorat"}},{id:73,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:12,name:"Davlat tili va chet tillari"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:92,subject:{id:182,name:"Malakaviy amaliyot",code:"MA1306"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:58,trainingType:{code:"20",name:"Boshqa"},academic_load:60}],subjectExamTypes:[{id:76,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"14",name:"Malakaviy amaliyot qaydnomasi"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"12",name:"2-semestr"},_curriculum:1,total_acload:60,resource_count:0,in_group:null,at_semester:false,active:true,credit:2},
  {id:3153,subject:{id:612,name:"Gidravlika",code:"GIFR1304"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:2262,trainingType:{code:"11",name:"Ma'ruza"},academic_load:16},{id:2264,trainingType:{code:"12",name:"Laboratoriya"},academic_load:16},{id:2263,trainingType:{code:"13",name:"Amaliy"},academic_load:16},{id:2265,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:72}],subjectExamTypes:[{id:2035,max_ball:100,examType:{code:"13",name:"Yakuniy nazorat"}},{id:2036,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"13",name:"3-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:3155,subject:{id:185,name:"Xorijiy til",code:"XT1408"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:2266,trainingType:{code:"13",name:"Amaliy"},academic_load:36},{id:2267,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:84}],subjectExamTypes:[{id:2037,max_ball:100,examType:{code:"13",name:"Yakuniy nazorat"}},{id:2038,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:12,name:"Davlat tili va chet tillari"},semester:{code:"13",name:"3-semestr"},_curriculum:1,total_acload:120,resource_count:0,in_group:null,at_semester:true,active:true,credit:4},
  {id:3158,subject:{id:613,name:"Marksheyderlik ishi",code:"MARKI1307"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.20",name:"Tanlov fanlar"},subjectDetails:[{id:2268,trainingType:{code:"11",name:"Ma'ruza"},academic_load:30},{id:2269,trainingType:{code:"13",name:"Amaliy"},academic_load:54},{id:2270,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:126}],subjectExamTypes:[{id:2039,max_ball:100,examType:{code:"13",name:"Yakuniy nazorat"}},{id:2040,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"13",name:"3-semestr"},_curriculum:1,total_acload:210,resource_count:0,in_group:null,at_semester:true,active:true,credit:7},
  {id:3162,subject:{id:614,name:"Konchilik ishi asoslari",code:"KONIA1410"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:2271,trainingType:{code:"11",name:"Ma'ruza"},academic_load:36},{id:2272,trainingType:{code:"13",name:"Amaliy"},academic_load:30},{id:2273,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:114}],subjectExamTypes:[{id:2041,max_ball:100,examType:{code:"13",name:"Yakuniy nazorat"}},{id:2042,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"13",name:"3-semestr"},_curriculum:1,total_acload:180,resource_count:0,in_group:null,at_semester:true,active:true,credit:6},
  {id:3167,subject:{id:615,name:"Geologiya",code:"GEOL1306"},subjectType:{code:"11",name:"Majburiy"},subjectBlock:{code:"11.19",name:"Majburiy fanlar"},subjectDetails:[{id:2274,trainingType:{code:"11",name:"Ma'ruza"},academic_load:40},{id:2275,trainingType:{code:"13",name:"Amaliy"},academic_load:32},{id:2276,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:108}],subjectExamTypes:[{id:2043,max_ball:100,examType:{code:"13",name:"Yakuniy nazorat"}},{id:2044,max_ball:100,examType:{code:"14",name:"Umumiy"}}],ratingGrade:{code:"11",name:"Fan qaydnomasi (Asosiy)"},examFinish:{code:"11",name:"Imtihon"},department:{id:13,name:"Konchilik va metallurgiya"},semester:{code:"13",name:"3-semestr"},_curriculum:1,total_acload:180,resource_count:0,in_group:null,at_semester:true,active:true,credit:6},
];

export default function CurriculumSubjectPage() {
  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("");
  const [activeSem,   setActiveSem]   = useState("all");
  const [detailItem,  setDetailItem]  = useState(null);
  const [toast,       setToast]       = useState(null);
  const [expandedSem, setExpandedSem] = useState({});

  const showToast = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3000);
  };

  /* ── Group by semester ── */
  const semesters = useMemo(()=>{
    const map = {};
    RAW.forEach(item=>{
      const k = item.semester.code;
      if(!map[k]) map[k]={code:k,name:item.semester.name,items:[]};
      map[k].items.push(item);
    });
    return Object.values(map).sort((a,b)=>a.code.localeCompare(b.code));
  },[]);

  /* ── Filtered ── */
  const filtered = useMemo(()=>{
    return RAW.filter(item=>{
      const matchSearch = !search || item.subject.name.toLowerCase().includes(search.toLowerCase()) || item.subject.code.toLowerCase().includes(search.toLowerCase());
      const matchType   = !filterType || item.subjectType.code === filterType;
      const matchSem    = activeSem==="all" || item.semester.code===activeSem;
      return matchSearch && matchType && matchSem;
    });
  },[search,filterType,activeSem]);

  /* ── Grouped filtered ── */
  const groupedFiltered = useMemo(()=>{
    const map={};
    filtered.forEach(item=>{
      const k=item.semester.code;
      if(!map[k]) map[k]={code:k,name:item.semester.name,items:[]};
      map[k].items.push(item);
    });
    return Object.values(map).sort((a,b)=>a.code.localeCompare(b.code));
  },[filtered]);

  /* ── Toggle semester expand ── */
  const toggleSem = code => setExpandedSem(p=>({...p,[code]:!p[code]}));
  const isSemExpanded = code => expandedSem[code] !== false; // default open

  /* ── Stats ── */
  const totalCredits = RAW.reduce((s,r)=>s+r.credit,0);
  const totalHours   = RAW.reduce((s,r)=>s+r.total_acload,0);
  const majburiy     = RAW.filter(r=>r.subjectType.code==="11").length;
  const tanlov       = RAW.filter(r=>r.subjectType.code==="12").length;

  /* ── Donut helper ── */
  const LoadBar = ({details}) => {
    const total = details.reduce((s,d)=>s+d.academic_load,0);
    let offset = 0;
    return (
      <div style={{display:"flex",height:6,borderRadius:4,overflow:"hidden",gap:1}}>
        {details.filter(d=>d.trainingType.code!=="17").map(d=>{
          const cfg = getTrain(d.trainingType.code);
          const w   = `${(d.academic_load/total)*100}%`;
          return <div key={d.id} style={{height:"100%",width:w,background:cfg.color,opacity:0.85}}/>;
        })}
        {details.filter(d=>d.trainingType.code==="17").map(d=>{
          const w = `${(d.academic_load/total)*100}%`;
          return <div key={d.id} style={{height:"100%",width:w,background:C.gray}}/>;
        })}
      </div>
    );
  };

  /* ── Subject card ── */
  const SubjectCard = ({item, idx}) => {
    const typeCfg = getType(item.subjectType.code);
    const nonSelf = item.subjectDetails.filter(d=>d.trainingType.code!=="17");
    const selfLoad = item.subjectDetails.find(d=>d.trainingType.code==="17")?.academic_load || 0;
    const examMain = item.subjectExamTypes.filter(e=>e.examType.code!=="14");

    return (
      <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.gray}`,
        overflow:"hidden",transition:"box-shadow 0.18s, transform 0.18s",
        animation:`fadeUp 0.28s ${(idx%10)*30}ms ease both`}}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 6px 20px rgba(13,26,99,0.09)";e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>

        {/* Top accent */}
        <div style={{height:3,background:typeCfg.color}}/>

        <div style={{padding:"14px 16px"}}>
          {/* Header row */}
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10,gap:8}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                  background:typeCfg.bg,color:typeCfg.color}}>
                  {typeCfg.label}
                </span>
                {item.in_group && (
                  <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:20,
                    background:C.yellowLight,color:C.yellow}}>
                    <Ico d={I.users} size={9} color={C.yellow}/> Guruh {item.in_group}
                  </span>
                )}
                {!item.at_semester && (
                  <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:20,
                    background:C.orangeLight,color:C.orange}}>Semestr tashqari</span>
                )}
              </div>
              <div style={{fontSize:14,fontWeight:700,color:C.dark,lineHeight:1.4,marginBottom:2}}>
                {item.subject.name}
              </div>
              <div style={{fontSize:11,color:C.light,fontFamily:"monospace"}}>
                {item.subject.code}
              </div>
            </div>
            {/* Credit circle */}
            <div style={{width:44,height:44,borderRadius:12,flexShrink:0,
              background:`linear-gradient(135deg,${C.bright},${C.blue})`,
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:16,fontWeight:800,color:C.white,lineHeight:1,fontFamily:"'Syne',sans-serif"}}>
                {item.credit}
              </div>
              <div style={{fontSize:8,color:"rgba(255,255,255,0.7)",fontWeight:600}}>kredit</div>
            </div>
          </div>

          {/* Load bar */}
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:10,color:C.light,fontWeight:600}}>O'quv yuklamasi</span>
              <span style={{fontSize:10,fontWeight:700,color:C.dark}}>{item.total_acload} soat</span>
            </div>
            <LoadBar details={item.subjectDetails}/>
          </div>

          {/* Training type chips */}
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
            {item.subjectDetails.map(d=>{
              const cfg = getTrain(d.trainingType.code);
              return (
                <div key={d.id} style={{display:"inline-flex",alignItems:"center",gap:4,
                  padding:"3px 8px",borderRadius:20,fontSize:10,fontWeight:600,
                  background:cfg.bg,color:cfg.color}}>
                  <Ico d={cfg.icon} size={9} color={cfg.color}/>
                  {cfg.label}: {d.academic_load}s
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{height:1,background:C.lightGray,marginBottom:10}}/>

          {/* Exam scores */}
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
            {examMain.map(e=>{
              const ec = getExam(e.examType.code);
              return (
                <div key={e.id} style={{display:"inline-flex",alignItems:"center",gap:4,
                  padding:"3px 8px",borderRadius:6,fontSize:10,fontWeight:700,
                  background:ec.bg,color:ec.color}}>
                  {e.examType.name}: <b>{e.max_ball}</b>
                </div>
              );
            })}
          </div>

          {/* Dept + examFinish */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.dept} size={11} color={C.light}/>
              <span style={{fontSize:10,color:C.light,fontWeight:500}}>{item.department.name}</span>
            </div>
            <button onClick={()=>setDetailItem(item)}
              style={{padding:"5px 10px",borderRadius:7,border:`1px solid ${C.gray}`,
                cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:600,
                background:C.white,color:C.mid,display:"flex",alignItems:"center",gap:4,
                transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.lightBlue;e.currentTarget.style.color=C.bright;e.currentTarget.style.borderColor=C.bright;}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.white;e.currentTarget.style.color=C.mid;e.currentTarget.style.borderColor=C.gray;}}>
              <Ico d={I.eye} size={11}/> Batafsil
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ── DETAIL MODAL ── */
  const DetailModal = () => {
    const d = detailItem;
    if(!d) return null;
    const typeCfg = getType(d.subjectType.code);
    const nonSelf = d.subjectDetails.filter(s=>s.trainingType.code!=="17");
    const selfD   = d.subjectDetails.find(s=>s.trainingType.code==="17");

    return (
      <div onClick={e=>e.target===e.currentTarget&&setDetailItem(null)}
        style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(13,26,99,0.42)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
          padding:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:C.white,borderRadius:22,width:"min(580px,95vw)",
          maxHeight:"88vh",overflow:"hidden",display:"flex",flexDirection:"column",
          boxShadow:"0 28px 64px rgba(13,26,99,0.22)",animation:"fadeUp 0.25s ease"}}>

          {/* Modal header */}
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:"20px 24px",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                    background:"rgba(255,255,255,0.2)",color:C.white}}>{typeCfg.label}</span>
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                    background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.85)"}}>
                    {d.subjectBlock.name}
                  </span>
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                    background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.85)"}}>
                    {d.examFinish.name}
                  </span>
                </div>
                <div style={{fontSize:18,fontWeight:800,color:C.white,lineHeight:1.3,
                  fontFamily:"'Syne',sans-serif",marginBottom:4}}>
                  {d.subject.name}
                </div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontFamily:"monospace"}}>
                  {d.subject.code} • {d.semester.name}
                </div>
              </div>
              <div>
                <div style={{width:52,height:52,borderRadius:14,flexShrink:0,
                  background:"rgba(255,255,255,0.15)",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <div style={{fontSize:22,fontWeight:800,color:C.white,lineHeight:1,fontFamily:"'Syne',sans-serif"}}>
                    {d.credit}
                  </div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.6)",fontWeight:600}}>kredit</div>
                </div>
                <button onClick={()=>setDetailItem(null)}
                  style={{width:52,height:28,borderRadius:8,border:"none",marginTop:6,
                    background:"rgba(255,255,255,0.15)",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Ico d={I.x} size={14} color={C.white}/>
                </button>
              </div>
            </div>
          </div>

          {/* Modal body */}
          <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>

            {/* 3 stat cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:18}}>
              {[
                {label:"Jami soat",  value:`${d.total_acload}s`, color:C.bright},
                {label:"Kredit",     value:d.credit,             color:C.purple},
                {label:"Resurslar",  value:d.resource_count,     color:C.teal},
              ].map((s,i)=>(
                <div key={i} style={{background:C.lightGray,borderRadius:11,padding:"12px",textAlign:"center"}}>
                  <div style={{fontSize:20,fontWeight:800,color:s.color,fontFamily:"'Syne',sans-serif"}}>{s.value}</div>
                  <div style={{fontSize:10,color:C.light,fontWeight:600,marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* O'quv yuklamasi */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,fontWeight:700,color:C.mid,textTransform:"uppercase",
                letterSpacing:"1px",marginBottom:10}}>O'quv yuklamasi</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {d.subjectDetails.map(det=>{
                  const cfg = getTrain(det.trainingType.code);
                  const pct = Math.round((det.academic_load/d.total_acload)*100);
                  return (
                    <div key={det.id} style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:28,height:28,borderRadius:8,background:cfg.bg,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Ico d={cfg.icon} size={13} color={cfg.color}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <span style={{fontSize:12,fontWeight:600,color:C.dark}}>{det.trainingType.name}</span>
                          <span style={{fontSize:12,fontWeight:700,color:cfg.color}}>{det.academic_load} soat</span>
                        </div>
                        <div style={{height:5,borderRadius:3,background:C.gray,overflow:"hidden"}}>
                          <div style={{height:"100%",borderRadius:3,width:`${pct}%`,background:cfg.color,opacity:0.85}}/>
                        </div>
                      </div>
                      <span style={{fontSize:10,color:C.light,fontWeight:600,width:28,textAlign:"right"}}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nazorat turlari */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,fontWeight:700,color:C.mid,textTransform:"uppercase",
                letterSpacing:"1px",marginBottom:10}}>Nazorat va baholash</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {d.subjectExamTypes.map(e=>{
                  const ec = getExam(e.examType.code);
                  return (
                    <div key={e.id} style={{background:ec.bg,borderRadius:11,padding:"12px 14px",
                      border:`1px solid ${ec.color}18`}}>
                      <div style={{fontSize:18,fontWeight:800,color:ec.color,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                        {e.max_ball}
                      </div>
                      <div style={{fontSize:11,color:ec.color,fontWeight:600,opacity:0.8,marginTop:3}}>
                        {e.examType.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Qo'shimcha info */}
            <div style={{background:C.lightGray,borderRadius:12,padding:"14px 16px"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.mid,textTransform:"uppercase",
                letterSpacing:"1px",marginBottom:10}}>Qo'shimcha ma'lumot</div>
              {[
                ["Kafedra",        d.department.name],
                ["Baholash shakli",d.ratingGrade.name],
                ["Fan bloki",      d.subjectBlock.name],
                ["Semestr",        d.semester.name],
                ...(d.in_group ? [["Guruh raqami",d.in_group]] : []),
                ["Semestr ichida", d.at_semester?"Ha":"Yo'q"],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${C.gray}`}}>
                  <span style={{fontSize:11,color:C.light,fontWeight:600}}>{k}</span>
                  <span style={{fontSize:12,color:C.dark,fontWeight:700,textAlign:"right",maxWidth:"60%"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{padding:"14px 24px",borderTop:`1px solid ${C.lightGray}`,
            display:"flex",gap:8,flexShrink:0}}>
            <button onClick={()=>{showToast("Tahrirlash ochildi");setDetailItem(null);}}
              style={{flex:1,padding:"9px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
              Tahrirlash
            </button>
            <button onClick={()=>setDetailItem(null)}
              style={{padding:"9px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
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

      {/* TOAST */}
      {toast&&(
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,animation:"fadeUp 0.3s ease",
          background:C.white,borderLeft:`4px solid ${C.green}`,
          borderRadius:10,padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast.msg}
        </div>
      )}

      <DetailModal/>

      <div style={{padding:"24px 28px",maxWidth:1280,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Curriculum fanlari
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>5 075</b> ta fan •{" "}
              {semesters.length} ta semestr
            </p>
          </div>
          <button onClick={()=>showToast("Yangi fan qo'shish")}
            style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
              fontFamily:"inherit",fontSize:13,fontWeight:700,
              background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
              display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
            <Ico d={I.plus} size={14} color={C.white}/> Fan qo'shish
          </button>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {label:"Jami fanlar",   value:RAW.length,   icon:I.book,    color:C.bright,  bg:C.lightBlue},
            {label:"Jami soat",     value:totalHours,   icon:I.clock,   color:C.purple,  bg:C.purpleLight},
            {label:"Jami kredit",   value:totalCredits, icon:I.award,   color:C.green,   bg:C.greenLight},
            {label:"Semestrlar",    value:semesters.length, icon:I.layers,color:C.orange,bg:C.orangeLight},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,padding:"14px 16px",
              border:`1px solid ${C.gray}`,display:"flex",alignItems:"center",gap:12,
              animation:`fadeUp 0.3s ${i*50}ms ease both`}}>
              <div style={{width:40,height:40,borderRadius:11,background:s.bg,flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ico d={s.icon} size={18} color={s.color}/>
              </div>
              <div>
                <div style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                  {s.value}
                </div>
                <div style={{fontSize:11,color:C.light,fontWeight:500,marginTop:3}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div style={{background:C.white,borderRadius:14,padding:"12px 14px",
          border:`1px solid ${C.gray}`,marginBottom:16,display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {/* Search */}
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Fan nomi yoki kodi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          {/* Type */}
          <div style={{position:"relative"}}>
            <select value={filterType} onChange={e=>setFilterType(e.target.value)}
              style={{padding:"8px 28px 8px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,
                fontSize:13,color:filterType?C.dark:C.light,background:C.white,cursor:"pointer",minWidth:140}}>
              <option value="">Barcha turlar</option>
              <option value="11">Majburiy</option>
              <option value="12">Tanlov</option>
            </select>
            <div style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.chevD} size={13} color={C.light}/>
            </div>
          </div>
          {(search||filterType)&&(
            <button onClick={()=>{setSearch("");setFilterType("");}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* ── SEMESTER TABS ── */}
        <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
          <button onClick={()=>setActiveSem("all")}
            style={{padding:"7px 16px",borderRadius:20,border:"none",cursor:"pointer",
              fontFamily:"inherit",fontSize:12,fontWeight:700,transition:"all 0.15s",
              background:activeSem==="all"?C.dark:C.lightGray,
              color:activeSem==="all"?C.white:C.mid,
              boxShadow:activeSem==="all"?"0 3px 10px rgba(15,23,42,0.2)":"none"}}>
            Barcha semestrlar
          </button>
          {semesters.map((s,i)=>{
            const sc  = semColor(i);
            const act = activeSem===s.code;
            return (
              <button key={s.code} onClick={()=>setActiveSem(act?"all":s.code)}
                style={{padding:"7px 16px",borderRadius:20,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:12,fontWeight:700,transition:"all 0.15s",
                  background:act?sc.color:sc.bg,color:act?C.white:sc.color,
                  boxShadow:act?`0 3px 10px ${sc.color}40`:"none"}}>
                {s.name}
                <span style={{marginLeft:5,fontSize:10,opacity:0.8}}>({s.items.length})</span>
              </button>
            );
          })}
        </div>

        {/* ── CONTENT ── */}
        {groupedFiltered.length === 0 ? (
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
            padding:"60px",textAlign:"center"}}>
            <Ico d={I.book} size={48} color={C.gray}/>
            <div style={{fontSize:15,fontWeight:600,color:C.mid,marginTop:12}}>Fan topilmadi</div>
            <div style={{fontSize:12,color:C.light,marginTop:6}}>Qidiruvni o'zgartiring</div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {groupedFiltered.map((sem, semIdx)=>{
              const sc       = semColor(semesters.findIndex(s=>s.code===sem.code));
              const expanded = isSemExpanded(sem.code);
              const semTotal = sem.items.reduce((s,r)=>s+r.credit,0);
              const semHours = sem.items.reduce((s,r)=>s+r.total_acload,0);

              return (
                <div key={sem.code} style={{animation:`fadeUp 0.3s ${semIdx*60}ms ease both`}}>
                  {/* Semester header */}
                  <div onClick={()=>toggleSem(sem.code)}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      cursor:"pointer",background:C.white,borderRadius:expanded?"14px 14px 0 0":14,
                      border:`1px solid ${C.gray}`,
                      borderBottom:expanded?`1px solid ${C.lightGray}`:`1px solid ${C.gray}`,
                      padding:"14px 18px",transition:"all 0.15s",userSelect:"none"}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:36,height:36,borderRadius:10,background:sc.bg,
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:14,fontWeight:800,color:sc.color,fontFamily:"'Syne',sans-serif"}}>
                          {sem.code.replace("1","")}
                        </span>
                      </div>
                      <div>
                        <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>
                          {sem.name}
                        </div>
                        <div style={{fontSize:11,color:C.light,marginTop:1}}>
                          {sem.items.length} ta fan
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:15,fontWeight:800,color:sc.color,fontFamily:"'Syne',sans-serif"}}>{semTotal}</div>
                          <div style={{fontSize:9,color:C.light,fontWeight:600}}>kredit</div>
                        </div>
                        <div style={{width:1,height:28,background:C.gray}}/>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>{semHours}</div>
                          <div style={{fontSize:9,color:C.light,fontWeight:600}}>soat</div>
                        </div>
                      </div>
                      <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"transform 0.2s",transform:expanded?"rotate(90deg)":"rotate(0deg)"}}>
                        <Ico d={I.chevR} size={14} color={C.mid}/>
                      </div>
                    </div>
                  </div>

                  {/* Semester cards grid */}
                  {expanded && (
                    <div style={{border:`1px solid ${C.gray}`,borderTop:"none",
                      borderRadius:"0 0 14px 14px",padding:"16px",
                      background:`${sc.bg}40`,
                      display:"grid",
                      gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",
                      gap:12}}>
                      {sem.items.map((item,idx)=>(
                        <SubjectCard key={item.id} item={item} idx={idx}/>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom info */}
        <div style={{marginTop:20,textAlign:"center",fontSize:12,color:C.light}}>
          Ko'rsatilmoqda: <b style={{color:C.dark}}>{filtered.length}</b> ta fan •
          Haqiqiy API: <b style={{color:C.dark}}>5 075</b> ta yozuv
        </div>
      </div>
    </>
  );
}
