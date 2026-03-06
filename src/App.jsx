import { useState } from "react";
import C from "./constants/colors";
import Ico from "./components/ui/Ico";
import { useIsMobile } from "./hooks";
import Header          from "./components/layout/Header";
import Footer          from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";

import HomePage              from "./pages/HomePage";
import NewsListPage          from "./pages/NewsListPage";
import NewsDetailPage        from "./pages/NewsDetailPage";
import FacultyListPage       from "./pages/FacultyListPage";
import FacultyDetailPage     from "./pages/FacultyDetailPage";
import DepartmentDetailPage  from "./pages/DepartmentDetailPage";
import TeacherDetailPage     from "./pages/TeacherDetailPage";
import AdmissionsPage        from "./pages/AdmissionsPage";
import AboutPage             from "./pages/AboutPage";
import StudentPortalPage     from "./pages/StudentPortalPage";
import ContactPage           from "./pages/ContactPage";
import IlmiyFaoliyatPage    from "./pages/IlmiyFaoliyatPage";
import MadaniyFaoliyatPage  from "./pages/MadaniyFaoliyatPage";
import MoliyaPage            from "./pages/MoliyaPage";
import TalabalargaHubPage   from "./pages/TalabalargaHubPage";
import StudentInfoPage       from "./pages/StudentInfoPage";

export default function App() {
  const [route,setRoute]=useState({page:"home",params:{}});
  const isMobile=useIsMobile();
  const navigate=(page,params={})=>{setRoute({page,params});window.scrollTo({top:0,behavior:"smooth"});};
  const isPortal=route.page==="portal";

  const pages={
    "home":           <HomePage           navigate={navigate} isMobile={isMobile}/>,
    "news-list":      <NewsListPage       navigate={navigate} isMobile={isMobile}/>,
    "news-detail":    <NewsDetailPage     navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "faculty-list":   <FacultyListPage    navigate={navigate} isMobile={isMobile}/>,
    "faculty-detail": <FacultyDetailPage  navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "dept-detail":    <DepartmentDetailPage navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "teacher-detail": <TeacherDetailPage  navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "admissions":     <AdmissionsPage     navigate={navigate} isMobile={isMobile}/>,
    "about":          <AboutPage          navigate={navigate} isMobile={isMobile}/>,
    "portal":         <StudentPortalPage  navigate={navigate} isMobile={isMobile}/>,
    "contact":        <ContactPage        navigate={navigate} isMobile={isMobile}/>,
    "science":        <IlmiyFaoliyatPage  navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "cultural":       <MadaniyFaoliyatPage navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "finance":        <MoliyaPage         navigate={navigate} params={route.params} isMobile={isMobile}/>,
    "edu-methods":    <MoliyaPage         navigate={navigate} params={{section:"tolov"}} isMobile={isMobile}/>,
    "student-hub":    <TalabalargaHubPage navigate={navigate} isMobile={isMobile}/>,
    "student-info":   <StudentInfoPage    navigate={navigate} params={route.params} isMobile={isMobile}/>,
  };

  return (
    <div style={{ fontFamily:"'IBM Plex Sans','Segoe UI',sans-serif", background:C.lightGray, minHeight:"100vh", paddingBottom:isMobile?64:0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(246,128,72,0.4);}70%{box-shadow:0 0 0 8px rgba(246,128,72,0);}}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#F4F6FB;}
        ::-webkit-scrollbar-thumb{background:#2845D6;border-radius:3px;}
        input::placeholder,textarea::placeholder{color:#6B7BAE!important;}
      `}</style>

      {/* Demo navigation bar */}
      <div style={{ background:"#070E38", padding:"6px 0", overflowX:"auto", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display:"flex", gap:4, padding:"0 14px", minWidth:"max-content", alignItems:"center" }}>
          <span style={{ color:"rgba(255,255,255,0.28)", fontSize:11, marginRight:6, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:5 }}>
            <Ico name="grid2" size={11} color="rgba(255,255,255,0.28)"/> Demo sahifalar:
          </span>
          {[
            {label:"Bosh sahifa",      icon:"home",       page:"home"},
            {label:"Yangiliklar",      icon:"newspaper",  page:"news-list"},
            {label:"Fakultetlar",      icon:"university", page:"faculty-list"},
            {label:"Fakultet",         icon:"bookOpen",   page:"faculty-detail", params:{facId:1}},
            {label:"Kafedra",          icon:"building2",  page:"dept-detail",    params:{deptId:1}},
            {label:"O'qituvchi",       icon:"user",       page:"teacher-detail", params:{teacherId:1}},
            {label:"Ilmiy faoliyat",   icon:"microscope", page:"science",        params:{section:"kengash"}},
            {label:"Ilmiy loyihalar",  icon:"layers",     page:"science",        params:{section:"loyihalar"}},
            {label:"Doktorantura",     icon:"graduation", page:"science",        params:{section:"doktorantura"}},
            {label:"Konferensiyalar",  icon:"globe",      page:"science",        params:{section:"konferensiyalar"}},
            {label:"Jurnallar",        icon:"newspaper",  page:"science",        params:{section:"jurnallar"}},
            {label:"Sport",            icon:"sportsBall", page:"cultural",       params:{section:"sport"}},
            {label:"Talabalar hayoti", icon:"users",      page:"cultural",       params:{section:"hayot"}},
            {label:"Psixolog",         icon:"heart",      page:"cultural",       params:{section:"psixolog"}},
            {label:"Turar joy",        icon:"building2",  page:"cultural",       params:{section:"turarjoy"}},
            {label:"Yashil UNI",       icon:"globe",      page:"cultural",       params:{section:"yashil"}},
            {label:"To'lov narxlari",  icon:"creditCard", page:"finance",        params:{section:"tolov"}},
            {label:"Xarajatlar",       icon:"barChart",   page:"finance",        params:{section:"xarajat"}},
            {label:"Shartnomalar",     icon:"fileText",   page:"finance",        params:{section:"shartnoma"}},
            {label:"Talabalarga",      icon:"graduation", page:"student-hub"},
            {label:"Baholash tizimi",  icon:"barChart",   page:"student-info",   params:{section:"baholash"}},
            {label:"GPA & Kredit",     icon:"trendUp",    page:"student-info",   params:{section:"gpa"}},
            {label:"Stipendiyalar",    icon:"award",      page:"student-info",   params:{section:"stipendiya"}},
            {label:"Mobillik",         icon:"globe",      page:"student-info",   params:{section:"mobillik"}},
            {label:"Iqtidorli",        icon:"star",       page:"student-info",   params:{section:"iqtidorli"}},
            {label:"Qabul",            icon:"clipboard",  page:"admissions"},
            {label:"Haqida",           icon:"scroll",     page:"about"},
            {label:"Talaba portali",   icon:"graduation", page:"portal"},
            {label:"Aloqa",            icon:"phone",      page:"contact"},
          ].map(item=>(
            <button key={item.page+(item.params?.section||item.params?.newsId||item.params?.facId||"")} onClick={()=>navigate(item.page,item.params||{})}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"inherit", background:route.page===item.page?C.orange:"rgba(255,255,255,0.1)", color:C.white, whiteSpace:"nowrap", flexShrink:0, transition:"all 0.2s" }}>
              <Ico name={item.icon} size={12} color={C.white} sw={route.page===item.page?2.2:1.5}/>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {!isPortal&&<Header navigate={navigate} currentPage={route.page} isMobile={isMobile}/>}
      <main>{pages[route.page]||pages["home"]}</main>
      {!isMobile&&!isPortal&&<Footer navigate={navigate}/>}
      {isMobile&&<MobileBottomNav currentPage={route.page} navigate={navigate}/>}
    </div>
  );
}

