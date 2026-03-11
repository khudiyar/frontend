import { useState, useMemo } from "react";

const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", orangeLight:"#FFF4ED",
  green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  teal:"#0D9488",   tealLight:"#F0FDFA",
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
const I = {
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  lecture: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  lab:     "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 0-2-2v-4m0 0h18",
  practice:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 1 2 2",
  self:    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:   "M6 9l6 6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevL:   "M15 18l-6-6 6-6",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  plus:    "M12 5v14M5 12h14",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  sort:    "M3 6h18M7 12h10M11 18h2",
};

/* ── TRAINING TYPE CFG ── */
const TRAIN = {
  "11":{label:"Ma'ruza",    icon:I.lecture, color:C.bright, bg:C.lightBlue},
  "12":{label:"Laboratoriya",icon:I.lab,   color:C.green,  bg:C.greenLight},
  "13":{label:"Amaliy",     icon:I.practice,color:C.purple, bg:C.purpleLight},
  "17":{label:"Mustaqil",   icon:I.self,   color:C.orange, bg:C.orangeLight},
};
const getTrain = c => TRAIN[c] || {label:"Boshqa",icon:I.book,color:C.mid,bg:C.lightGray};

/* ── AVATAR COLOR ── */
const AV_COLORS = [C.bright,C.purple,C.green,C.orange,C.teal,C.red];
const avColor = name => AV_COLORS[name.charCodeAt(0) % AV_COLORS.length];
const initials = name => name.split(" ").map(p=>p[0]||"").join("").slice(0,2).toUpperCase();

/* ── SEMESTER LABEL ── */
const semLabel = code => `${parseInt(code)-10}-semestr`;

/* ── RAW DATA ── */
const RAW = [
  {id:1, _curriculum:15,_semester:"14",_education_year:"2024",_department:16,_training_type:"11",_group:29, subject:{id:381,name:"Noyob tarqoq nodir metallar kimyoviy texnologiyasi",code:"NTNMKT1506"}, employee:{id:55,name:"ALLANIYAZOV D. O."}, curriculumSubjectDetail:{id:886,trainingType:{code:"11",name:"Ma'ruza"},academic_load:10},  students_count:13,active:true,created_at:1743593657,updated_at:1743593657},
  {id:2, _curriculum:15,_semester:"14",_education_year:"2024",_department:16,_training_type:"11",_group:30, subject:{id:381,name:"Noyob tarqoq nodir metallar kimyoviy texnologiyasi",code:"NTNMKT1506"}, employee:{id:55,name:"ALLANIYAZOV D. O."}, curriculumSubjectDetail:{id:886,trainingType:{code:"11",name:"Ma'ruza"},academic_load:10},  students_count:11,active:true,created_at:1743593657,updated_at:1743593657},
  {id:3, _curriculum:15,_semester:"14",_education_year:"2024",_department:16,_training_type:"13",_group:29, subject:{id:381,name:"Noyob tarqoq nodir metallar kimyoviy texnologiyasi",code:"NTNMKT1506"}, employee:{id:55,name:"ALLANIYAZOV D. O."}, curriculumSubjectDetail:{id:887,trainingType:{code:"13",name:"Amaliy"},academic_load:10},     students_count:13,active:true,created_at:1743593671,updated_at:1743593671},
  {id:4, _curriculum:15,_semester:"14",_education_year:"2024",_department:16,_training_type:"13",_group:30, subject:{id:381,name:"Noyob tarqoq nodir metallar kimyoviy texnologiyasi",code:"NTNMKT1506"}, employee:{id:55,name:"ALLANIYAZOV D. O."}, curriculumSubjectDetail:{id:887,trainingType:{code:"13",name:"Amaliy"},academic_load:10},     students_count:11,active:true,created_at:1743593671,updated_at:1743593671},
  {id:5, _curriculum:15,_semester:"14",_education_year:"2024",_department:16,_training_type:"12",_group:29, subject:{id:381,name:"Noyob tarqoq nodir metallar kimyoviy texnologiyasi",code:"NTNMKT1506"}, employee:{id:55,name:"ALLANIYAZOV D. O."}, curriculumSubjectDetail:{id:888,trainingType:{code:"12",name:"Laboratoriya"},academic_load:8}, students_count:13,active:true,created_at:1743593685,updated_at:1743593685},
  {id:6, _curriculum:15,_semester:"14",_education_year:"2024",_department:16,_training_type:"12",_group:30, subject:{id:381,name:"Noyob tarqoq nodir metallar kimyoviy texnologiyasi",code:"NTNMKT1506"}, employee:{id:55,name:"ALLANIYAZOV D. O."}, curriculumSubjectDetail:{id:888,trainingType:{code:"12",name:"Laboratoriya"},academic_load:8}, students_count:11,active:true,created_at:1743593685,updated_at:1743593685},
  {id:7, _curriculum:10,_semester:"16",_education_year:"2024",_department:16,_training_type:"11",_group:19, subject:{id:313,name:"Muhandislik ekologiyasi",code:"ME1416"},                               employee:{id:52,name:"BAZARBAEVA D. O."},    curriculumSubjectDetail:{id:436,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:14,active:true,created_at:1743596747,updated_at:1743596747},
  {id:8, _curriculum:10,_semester:"16",_education_year:"2024",_department:16,_training_type:"11",_group:20, subject:{id:313,name:"Muhandislik ekologiyasi",code:"ME1416"},                               employee:{id:52,name:"BAZARBAEVA D. O."},    curriculumSubjectDetail:{id:436,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:17,active:true,created_at:1743596747,updated_at:1743596747},
  {id:9, _curriculum:18,_semester:"14",_education_year:"2024",_department:16,_training_type:"11",_group:317,subject:{id:300,name:"Ijtimoiy ekologiya",code:"IE1416"},                                    employee:{id:52,name:"BAZARBAEVA D. O."},    curriculumSubjectDetail:{id:1019,trainingType:{code:"11",name:"Ma'ruza"},academic_load:30}, students_count:9, active:true,created_at:1743596776,updated_at:1743596776},
  {id:10,_curriculum:26,_semester:"12",_education_year:"2024",_department:16,_training_type:"11",_group:51, subject:{id:437,name:"Gidroekologiya va geoekologiya",code:"GVG1606"},                        employee:{id:52,name:"BAZARBAEVA D. O."},    curriculumSubjectDetail:{id:1576,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24}, students_count:9, active:true,created_at:1743596803,updated_at:1743596803},
  {id:11,_curriculum:10,_semester:"16",_education_year:"2024",_department:16,_training_type:"11",_group:19, subject:{id:311,name:"Asosiy texnologik jarayonlar va qurilmalar",code:"ATJQ1416"},           employee:{id:61,name:"XURRAMOV N. I."},      curriculumSubjectDetail:{id:439,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:14,active:true,created_at:1743597038,updated_at:1743597038},
  {id:12,_curriculum:10,_semester:"16",_education_year:"2024",_department:16,_training_type:"11",_group:20, subject:{id:311,name:"Asosiy texnologik jarayonlar va qurilmalar",code:"ATJQ1416"},           employee:{id:61,name:"XURRAMOV N. I."},      curriculumSubjectDetail:{id:439,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:17,active:true,created_at:1743597038,updated_at:1743597038},
  {id:13,_curriculum:5, _semester:"18",_education_year:"2024",_department:16,_training_type:"11",_group:7,  subject:{id:202,name:"Noorganik moddalar kimyoviy texnologiyasi",code:"NMKT1306"},             employee:{id:61,name:"XURRAMOV N. I."},      curriculumSubjectDetail:{id:170,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:12,active:true,created_at:1743597066,updated_at:1743597066},
  {id:14,_curriculum:5, _semester:"18",_education_year:"2024",_department:16,_training_type:"11",_group:8,  subject:{id:202,name:"Noorganik moddalar kimyoviy texnologiyasi",code:"NMKT1306"},             employee:{id:61,name:"XURRAMOV N. I."},      curriculumSubjectDetail:{id:170,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:8, active:true,created_at:1743597066,updated_at:1743597066},
  {id:15,_curriculum:32,_semester:"12",_education_year:"2024",_department:16,_training_type:"17",_group:64, subject:{id:453,name:"Ilmiy-tadqiqot ishi",code:"ITI1606"},                                   employee:{id:61,name:"XURRAMOV N. I."},      curriculumSubjectDetail:{id:1727,trainingType:{code:"17",name:"Mustaqil ta'lim"},academic_load:180},students_count:3,active:true,created_at:1743597112,updated_at:1743597112},
  {id:16,_curriculum:10,_semester:"16",_education_year:"2024",_department:16,_training_type:"13",_group:19, subject:{id:313,name:"Muhandislik ekologiyasi",code:"ME1416"},                               employee:{id:57,name:"ABDULLAEVA J. K."},    curriculumSubjectDetail:{id:437,trainingType:{code:"13",name:"Amaliy"},academic_load:24},   students_count:14,active:true,created_at:1743598567,updated_at:1743598567},
  {id:17,_curriculum:10,_semester:"16",_education_year:"2024",_department:16,_training_type:"13",_group:20, subject:{id:313,name:"Muhandislik ekologiyasi",code:"ME1416"},                               employee:{id:57,name:"ABDULLAEVA J. K."},    curriculumSubjectDetail:{id:437,trainingType:{code:"13",name:"Amaliy"},academic_load:24},   students_count:17,active:true,created_at:1743598567,updated_at:1743598567},
  {id:18,_curriculum:18,_semester:"14",_education_year:"2024",_department:16,_training_type:"13",_group:316,subject:{id:300,name:"Ijtimoiy ekologiya",code:"IE1416"},                                    employee:{id:57,name:"ABDULLAEVA J. K."},    curriculumSubjectDetail:{id:1020,trainingType:{code:"13",name:"Amaliy"},academic_load:30},  students_count:15,active:true,created_at:1743598603,updated_at:1743598603},
  {id:19,_curriculum:18,_semester:"14",_education_year:"2024",_department:16,_training_type:"13",_group:317,subject:{id:300,name:"Ijtimoiy ekologiya",code:"IE1416"},                                    employee:{id:57,name:"ABDULLAEVA J. K."},    curriculumSubjectDetail:{id:1020,trainingType:{code:"13",name:"Amaliy"},academic_load:30},  students_count:9, active:true,created_at:1743598603,updated_at:1743598603},
  {id:20,_curriculum:18,_semester:"14",_education_year:"2024",_department:16,_training_type:"11",_group:316,subject:{id:417,name:"Amaliy ekologiya",code:"AE1526"},                                       employee:{id:57,name:"ABDULLAEVA J. K."},    curriculumSubjectDetail:{id:1029,trainingType:{code:"11",name:"Ma'ruza"},academic_load:24},  students_count:15,active:true,created_at:1743598639,updated_at:1743598639},
];

/* ── GROUPED BY TEACHER ── */
function groupByTeacher(data) {
  const map = {};
  data.forEach(item => {
    const eid = item.employee.id;
    if (!map[eid]) {
      map[eid] = { employee: item.employee, rows: [] };
    }
    map[eid].rows.push(item);
  });
  return Object.values(map);
}

/* ── GROUPED BY TEACHER → SUBJECT ── */
function groupBySubject(rows) {
  const map = {};
  rows.forEach(r => {
    const key = `${r.subject.id}-${r._training_type}`;
    if (!map[key]) map[key] = { subject: r.subject, trainingType: r.curriculumSubjectDetail.trainingType, academic_load: r.curriculumSubjectDetail.academic_load, groups: [] };
    map[key].groups.push({ groupId: r._group, students: r.students_count, rowId: r.id, semester: r._semester });
  });
  return Object.values(map);
}

/* ─────────────────────────── MAIN ─────────────────────────── */
export default function TeacherSubjectPage() {
  const [search,      setSearch]      = useState("");
  const [filterTrain, setFilterTrain] = useState("");
  const [viewMode,    setViewMode]    = useState("teacher"); // "teacher" | "table"
  const [expanded,    setExpanded]    = useState({});
  const [sortField,   setSortField]   = useState("name");
  const [sortDir,     setSortDir]     = useState("asc");
  const [toast,       setToast]       = useState(null);
  const [page,        setPage]        = useState(1);
  const PAGE_SIZE = 10;

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  /* ── FILTER ── */
  const filtered = useMemo(()=>{
    return RAW.filter(r=>{
      const matchS = !search || r.subject.name.toLowerCase().includes(search.toLowerCase())
        || r.employee.name.toLowerCase().includes(search.toLowerCase())
        || r.subject.code.toLowerCase().includes(search.toLowerCase());
      const matchT = !filterTrain || r._training_type === filterTrain;
      return matchS && matchT;
    });
  },[search,filterTrain]);

  /* ── TEACHER GROUPS ── */
  const teacherGroups = useMemo(()=> groupByTeacher(filtered), [filtered]);

  /* ── TABLE SORT ── */
  const tableSorted = useMemo(()=>{
    const d = [...filtered];
    d.sort((a,b)=>{
      let va = sortField==="employee"?a.employee.name : sortField==="subject"?a.subject.name : sortField==="students"?a.students_count : a[sortField]||"";
      let vb = sortField==="employee"?b.employee.name : sortField==="subject"?b.subject.name : sortField==="students"?b.students_count : b[sortField]||"";
      if(typeof va==="string") va=va.toLowerCase(), vb=vb.toLowerCase();
      return sortDir==="asc"?(va<vb?-1:va>vb?1:0):(va>vb?-1:va<vb?1:0);
    });
    return d;
  },[filtered, sortField, sortDir]);

  const paginated = tableSorted.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const pageCount = Math.ceil(tableSorted.length/PAGE_SIZE);

  const handleSort = f => { if(sortField===f) setSortDir(d=>d==="asc"?"desc":"asc"); else{setSortField(f);setSortDir("asc");} };
  const SortIco = ({f}) => <span style={{marginLeft:3,fontSize:9,opacity:sortField===f?1:0.3,color:sortField===f?C.bright:C.light}}>{sortField===f&&sortDir==="desc"?"↓":"↑"}</span>;

  const toggleExpand = id => setExpanded(p=>({...p,[id]:!p[id]}));

  /* ── STATS ── */
  const uniqueTeachers  = new Set(RAW.map(r=>r.employee.id)).size;
  const uniqueSubjects  = new Set(RAW.map(r=>r.subject.id)).size;
  const totalStudents   = RAW.reduce((s,r)=>s+r.students_count,0);
  const totalHours      = RAW.reduce((s,r)=>s+r.curriculumSubjectDetail.academic_load,0);

  /* ── Sel ── */
  const Sel = ({value,onChange,children,style}) => (
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

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background:C.white,borderLeft:`4px solid ${C.green}`,
          borderRadius:10,padding:"12px 16px",boxShadow:"0 8px 24px rgba(13,26,99,0.12)",
          display:"flex",gap:10,alignItems:"center",fontSize:13,fontWeight:600,color:C.dark,
          animation:"fadeUp 0.3s ease"}}>
          <Ico d={I.check} size={15} color={C.green}/>{toast.msg}
        </div>
      )}

      <div style={{padding:"24px 28px",maxWidth:1280,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",
          marginBottom:22,flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              O'qituvchi — Fan — Guruh
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Jami <b style={{color:C.dark}}>5 623</b> ta yozuv •{" "}
              {uniqueTeachers} ta o'qituvchi • {uniqueSubjects} ta fan
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* View toggle */}
            <div style={{display:"flex",background:C.lightGray,borderRadius:9,padding:3,border:`1px solid ${C.gray}`}}>
              {[{m:"teacher",i:I.user},{m:"table",i:I.list}].map(({m,i})=>(
                <button key={m} onClick={()=>{setViewMode(m);setPage(1);}}
                  style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                    background:viewMode===m?C.white:"transparent",
                    boxShadow:viewMode===m?"0 1px 4px rgba(13,26,99,0.1)":"none"}}>
                  <Ico d={i} size={14} color={viewMode===m?C.bright:C.light}/>
                </button>
              ))}
            </div>
            <button onClick={()=>showToast("Tayinlash ochildi")}
              style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 12px ${C.bright}35`}}>
              <Ico d={I.plus} size={14} color={C.white}/> Tayinlash
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {label:"O'qituvchilar",  value:uniqueTeachers, icon:I.user,   color:C.bright, bg:C.lightBlue},
            {label:"Fanlar",         value:uniqueSubjects,  icon:I.book,   color:C.purple, bg:C.purpleLight},
            {label:"Jami talabalar", value:totalStudents,   icon:I.users,  color:C.green,  bg:C.greenLight},
            {label:"Jami soat",      value:totalHours,      icon:I.clock,  color:C.orange, bg:C.orangeLight},
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
          border:`1px solid ${C.gray}`,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <Ico d={I.search} size={14} color={C.light}/>
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="O'qituvchi, fan nomi yoki kodi..."
              style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:9,
                border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}
              onFocus={e=>e.target.style.borderColor=C.bright}
              onBlur={e=>e.target.style.borderColor=C.gray}/>
          </div>
          <Sel value={filterTrain} onChange={e=>setFilterTrain(e.target.value)} style={{minWidth:160}}>
            <option value="">Barcha tur</option>
            <option value="11">Ma'ruza</option>
            <option value="12">Laboratoriya</option>
            <option value="13">Amaliy</option>
            <option value="17">Mustaqil</option>
          </Sel>
          {(search||filterTrain)&&(
            <button onClick={()=>{setSearch("");setFilterTrain("");}}
              style={{padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.red}30`,
                cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                background:C.redLight,color:C.red,display:"flex",alignItems:"center",gap:5}}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
        </div>

        {/* ═══════════════ TEACHER VIEW ═══════════════ */}
        {viewMode==="teacher" && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {teacherGroups.length===0 && (
              <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,
                padding:"60px",textAlign:"center"}}>
                <Ico d={I.user} size={48} color={C.gray}/>
                <div style={{fontSize:14,fontWeight:600,color:C.mid,marginTop:12}}>Natija topilmadi</div>
              </div>
            )}
            {teacherGroups.map((tg, tIdx) => {
              const col     = avColor(tg.employee.name);
              const ini     = initials(tg.employee.name);
              const open    = expanded[tg.employee.id] !== false;
              const subs    = groupBySubject(tg.rows);
              const totStu  = tg.rows.reduce((s,r)=>s+r.students_count,0);
              const totHrs  = tg.rows.reduce((s,r)=>s+r.curriculumSubjectDetail.academic_load,0);
              const uniqSub = new Set(tg.rows.map(r=>r.subject.id)).size;

              return (
                <div key={tg.employee.id} style={{animation:`fadeUp 0.3s ${tIdx*60}ms ease both`}}>

                  {/* Teacher header */}
                  <div onClick={()=>toggleExpand(tg.employee.id)}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      background:C.white,borderRadius:open?"14px 14px 0 0":14,
                      border:`1px solid ${C.gray}`,
                      borderBottom:open?`1px solid ${C.lightGray}`:`1px solid ${C.gray}`,
                      padding:"14px 18px",cursor:"pointer",userSelect:"none",transition:"background 0.15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      {/* Avatar */}
                      <div style={{width:44,height:44,borderRadius:13,background:`${col}18`,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:15,fontWeight:800,color:col,fontFamily:"'Syne',sans-serif",
                        border:`2px solid ${col}25`}}>
                        {ini}
                      </div>
                      <div>
                        <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>
                          {tg.employee.name}
                        </div>
                        <div style={{fontSize:11,color:C.light,marginTop:2}}>
                          ID: {tg.employee.id} • {subs.length} ta fan turi
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:16}}>
                      {/* Mini stats */}
                      {[
                        {label:"Fan",     v:uniqSub,  color:C.purple},
                        {label:"Talaba",  v:totStu,   color:C.green},
                        {label:"Soat",    v:totHrs,   color:C.orange},
                      ].map((s,i)=>(
                        <div key={i} style={{textAlign:"center",minWidth:36}}>
                          <div style={{fontSize:16,fontWeight:800,color:s.color,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{s.v}</div>
                          <div style={{fontSize:9,color:C.light,fontWeight:600}}>{s.label}</div>
                        </div>
                      ))}
                      <div style={{width:1,height:28,background:C.gray}}/>
                      <div style={{width:28,height:28,borderRadius:8,background:C.lightGray,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"transform 0.2s",transform:open?"rotate(90deg)":"rotate(0deg)"}}>
                        <Ico d={I.chevR} size={14} color={C.mid}/>
                      </div>
                    </div>
                  </div>

                  {/* Teacher subjects */}
                  {open && (
                    <div style={{border:`1px solid ${C.gray}`,borderTop:"none",
                      borderRadius:"0 0 14px 14px",background:`${col}06`,padding:"12px"}}>
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {subs.map((sub, sIdx) => {
                          const tc = getTrain(sub.trainingType.code);
                          const totalStu = sub.groups.reduce((s,g)=>s+g.students,0);
                          return (
                            <div key={sIdx}
                              style={{background:C.white,borderRadius:12,border:`1px solid ${C.gray}`,
                                padding:"12px 14px",animation:`fadeUp 0.2s ${sIdx*30}ms ease both`}}>
                              <div style={{display:"flex",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>

                                {/* Training type icon */}
                                <div style={{width:36,height:36,borderRadius:10,background:tc.bg,flexShrink:0,
                                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                                  <Ico d={tc.icon} size={16} color={tc.color}/>
                                </div>

                                {/* Subject info */}
                                <div style={{flex:1,minWidth:200}}>
                                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
                                    <span style={{fontSize:13,fontWeight:700,color:C.dark}}>{sub.subject.name}</span>
                                    <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
                                      background:tc.bg,color:tc.color}}>{tc.label}</span>
                                  </div>
                                  <div style={{fontSize:11,color:C.light,fontFamily:"monospace",marginBottom:6}}>
                                    {sub.subject.code}
                                  </div>
                                  {/* Groups */}
                                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                                    {sub.groups.map(g=>(
                                      <div key={g.groupId}
                                        style={{display:"inline-flex",alignItems:"center",gap:4,
                                          padding:"3px 8px",borderRadius:20,fontSize:10,fontWeight:700,
                                          background:C.lightGray,color:C.mid,border:`1px solid ${C.gray}`}}>
                                        <Ico d={I.users} size={9} color={C.light}/>
                                        Guruh {g.groupId}
                                        <span style={{color:C.green,fontWeight:800}}>{g.students}</span>
                                        <span style={{color:C.light,fontSize:9}}>ta</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right: hours + students */}
                                <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
                                  <div style={{textAlign:"center",padding:"6px 12px",borderRadius:9,
                                    background:C.lightGray}}>
                                    <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                                      {sub.academic_load}
                                    </div>
                                    <div style={{fontSize:9,color:C.light,fontWeight:600}}>soat</div>
                                  </div>
                                  <div style={{textAlign:"center",padding:"6px 12px",borderRadius:9,
                                    background:C.greenLight}}>
                                    <div style={{fontSize:16,fontWeight:800,color:C.green,fontFamily:"'Syne',sans-serif",lineHeight:1}}>
                                      {totalStu}
                                    </div>
                                    <div style={{fontSize:9,color:C.green,fontWeight:600,opacity:0.8}}>talaba</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════ TABLE VIEW ═══════════════ */}
        {viewMode==="table" && (
          <>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden"}}>
              {/* thead */}
              <div style={{display:"grid",
                gridTemplateColumns:"48px 1fr 180px 120px 80px 90px 80px",
                padding:"10px 16px",background:C.lightGray,borderBottom:`1px solid ${C.gray}`}}>
                {[["#",""],["Fan nomi","subject"],["O'qituvchi","employee"],["Tur",""],["Soat",""],["Guruh",""],["Talabalar","students"]].map(([h,f],i)=>(
                  <div key={i} onClick={()=>f&&handleSort(f)}
                    style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
                      letterSpacing:"0.8px",cursor:f?"pointer":"default",userSelect:"none",
                      display:"flex",alignItems:"center"}}>
                    {h}{f&&<SortIco f={f}/>}
                  </div>
                ))}
              </div>

              {paginated.length===0 && (
                <div style={{padding:"48px",textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:600,color:C.mid}}>Natija topilmadi</div>
                </div>
              )}

              {paginated.map((item, idx) => {
                const tc  = getTrain(item._training_type);
                const col = avColor(item.employee.name);
                const ini = initials(item.employee.name);
                return (
                  <div key={item.id}
                    style={{display:"grid",
                      gridTemplateColumns:"48px 1fr 180px 120px 80px 90px 80px",
                      padding:"11px 16px",borderBottom:`1px solid ${C.lightGray}`,
                      background:C.white,transition:"background 0.15s",
                      animation:`fadeUp 0.22s ${idx*20}ms ease both`}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>

                    {/* id */}
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:C.light}}>#{item.id}</span>
                    </div>

                    {/* subject */}
                    <div style={{display:"flex",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:C.dark,lineHeight:1.4}}>{item.subject.name}</div>
                        <div style={{fontSize:10,color:C.light,fontFamily:"monospace"}}>{item.subject.code}</div>
                      </div>
                    </div>

                    {/* employee */}
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:28,height:28,borderRadius:8,background:`${col}18`,flexShrink:0,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:10,fontWeight:800,color:col}}>
                        {ini}
                      </div>
                      <span style={{fontSize:11,fontWeight:600,color:C.mid}}>{item.employee.name}</span>
                    </div>

                    {/* training type */}
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:tc.bg,color:tc.color,display:"inline-flex",alignItems:"center",gap:4}}>
                        <Ico d={tc.icon} size={9} color={tc.color}/>{tc.label}
                      </span>
                    </div>

                    {/* hours */}
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:13,fontWeight:700,color:C.dark}}>
                        {item.curriculumSubjectDetail.academic_load}
                        <span style={{fontSize:10,color:C.light,fontWeight:500}}> s</span>
                      </span>
                    </div>

                    {/* group */}
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20,
                        background:C.lightGray,color:C.mid}}>
                        #{item._group}
                      </span>
                    </div>

                    {/* students */}
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <Ico d={I.users} size={12} color={C.green}/>
                      <span style={{fontSize:13,fontWeight:700,color:C.green}}>{item.students_count}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            {pageCount > 1 && (
              <div style={{marginTop:14,display:"flex",alignItems:"center",
                justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div style={{fontSize:12,color:C.light}}>
                  <b style={{color:C.dark}}>{(page-1)*PAGE_SIZE+1}</b>–
                  <b style={{color:C.dark}}>{Math.min(page*PAGE_SIZE,tableSorted.length)}</b>{" "}
                  / <b style={{color:C.dark}}>{tableSorted.length}</b>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gray}`,
                      cursor:page===1?"not-allowed":"pointer",background:C.white,
                      display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
                    <Ico d={I.chevL} size={14} color={C.mid}/>
                  </button>
                  {Array.from({length:Math.min(pageCount,7)},(_,i)=>{
                    const n = i+1;
                    return (
                      <button key={n} onClick={()=>setPage(n)}
                        style={{width:32,height:32,borderRadius:8,fontFamily:"inherit",fontSize:13,fontWeight:600,
                          border:`1px solid ${n===page?C.bright:C.gray}`,cursor:"pointer",
                          background:n===page?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                          color:n===page?C.white:C.mid}}>
                        {n}
                      </button>
                    );
                  })}
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
          </>
        )}

        <div style={{marginTop:16,textAlign:"center",fontSize:12,color:C.light}}>
          Ko'rsatilmoqda: <b style={{color:C.dark}}>{filtered.length}</b> •
          Haqiqiy API: <b style={{color:C.dark}}>5 623</b> ta yozuv
        </div>
      </div>
    </>
  );
}
