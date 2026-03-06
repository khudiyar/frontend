import C from "../constants/colors";

const faculties = [
  { id:1,  name:"Mexanika-matematika",       short:"MexMat", icon:"sigma",        color:C.bright,   dean:"Prof. A. Yusupov",   students:2800, depts:5, programs:8,  year:1918 },
  { id:2,  name:"Fizika",                    short:"Fizika", icon:"atom",         color:C.orange,   dean:"Prof. B. Toshmatov", students:1900, depts:4, programs:6,  year:1920 },
  { id:3,  name:"Kimyo",                     short:"Kimyo",  icon:"flaskConical", color:C.green,    dean:"Prof. D. Raximov",   students:2100, depts:5, programs:7,  year:1921 },
  { id:4,  name:"Biologiya",                 short:"Bio",    icon:"dna",          color:C.purple,   dean:"Prof. S. Nazarova",  students:1700, depts:6, programs:9,  year:1925 },
  { id:5,  name:"Geologiya va geografiya",   short:"Geo",    icon:"compass",      color:"#0891B2",  dean:"Prof. K. Mirzaev",   students:1500, depts:4, programs:6,  year:1933 },
  { id:6,  name:"Tarix",                     short:"Tarix",  icon:"scroll",       color:"#92400E",  dean:"Prof. O. Hamidov",   students:2200, depts:5, programs:7,  year:1920 },
  { id:7,  name:"Filologiya",                short:"Filol",  icon:"bookOpen",     color:C.navy,     dean:"Prof. Z. Qosimova",  students:2600, depts:6, programs:10, year:1918 },
  { id:8,  name:"Jurnalistika",              short:"Journ",  icon:"newspaper",    color:C.red,      dean:"Prof. F. Ergashev",  students:1400, depts:3, programs:5,  year:1960 },
  { id:9,  name:"Iqtisodiyot",               short:"Iqtis",  icon:"barChart",     color:"#0F766E",  dean:"Prof. M. Umarov",    students:3100, depts:5, programs:8,  year:1955 },
  { id:10, name:"Informatika va AT",         short:"IT",     icon:"cpu",          color:C.bright,   dean:"Prof. N. Xoliqov",   students:2900, depts:4, programs:7,  year:1975 },
  { id:11, name:"Xorijiy filologiya",        short:"XFil",   icon:"globe",        color:C.orange,   dean:"Prof. L. Askarova",  students:2000, depts:5, programs:8,  year:1970 },
  { id:12, name:"Ijtimoiy fanlar",           short:"IjFan",  icon:"layers",       color:C.mid,      dean:"Prof. T. Bekmurodov",students:1800, depts:4, programs:6,  year:1991 },
  { id:13, name:"San'atshunoslik",           short:"San'at", icon:"palette",      color:C.purple,   dean:"Prof. G. Holiqova",  students:900,  depts:3, programs:5,  year:2001 },
];

const professors = [
  { id:1, name:"Prof. Aziz Yusupov",     title:"Dekan, Matematik tahlil",     icon:"user",  exp:28 },
  { id:2, name:"Prof. Dilnoza Karimova", title:"Algebra va geometriya",        icon:"user",  exp:22 },
  { id:3, name:"Dots. Jamshid Tursunov", title:"Hisoblash matematikasi",       icon:"user",  exp:15 },
  { id:4, name:"Dots. Nargiza Yoqubova", title:"Differensial tenglamalar",     icon:"user",  exp:12 },
  { id:5, name:"Prof. Bekzod Rahimov",   title:"Funksional analiz",            icon:"user",  exp:30 },
  { id:6, name:"Dots. Hulkar Ergasheva", title:"Kompleks analiz",              icon:"user",  exp:18 },
];

const schedule = [
  { time:"8:30–10:00",  mon:"Matematika I",  tue:"Fizika",       wed:"Informatika",  thu:"Matematika I", fri:"Chizmachilik", icon:"sigma" },
  { time:"10:15–11:45", mon:"Algebra",       tue:"—",            wed:"Ingliz tili",  thu:"Algebra",      fri:"—",            icon:"layers" },
  { time:"12:00–13:30", mon:"—",             tue:"Kimyo",        wed:"—",            thu:"Fizika",       fri:"Ingliz tili",  icon:"flaskConical" },
  { time:"14:00–15:30", mon:"Informatika",   tue:"Chizmachilik", wed:"Matematika I", thu:"—",            fri:"Kimyo",        icon:"cpu" },
  { time:"15:45–17:15", mon:"—",             tue:"Ingliz tili",  wed:"—",            thu:"Informatika",  fri:"—",            icon:"globe" },
];

const grades = [
  { subj:"Matematika I", credit:5, mid1:88, mid2:91, final:90, total:89.5 },
  { subj:"Algebra",      credit:4, mid1:76, mid2:82, final:80, total:79.2 },
  { subj:"Fizika",       credit:5, mid1:93, mid2:88, final:92, total:91.0 },
  { subj:"Informatika",  credit:3, mid1:95, mid2:98, final:97, total:96.5 },
  { subj:"Ingliz tili",  credit:3, mid1:84, mid2:87, final:85, total:85.4 },
  { subj:"Kimyo",        credit:4, mid1:71, mid2:79, final:75, total:74.8 },
];

export { faculties, professors, schedule, grades };
