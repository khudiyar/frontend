import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";

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
import AdministrationPage from "./pages/AdministrationPage.jsx";
import StudentPortalPage     from "./pages/StudentPortalPage";
import ContactPage           from "./pages/ContactPage";
import IlmiyFaoliyatPage    from "./pages/IlmiyFaoliyatPage";
import MadaniyFaoliyatPage  from "./pages/MadaniyFaoliyatPage";
import MoliyaPage            from "./pages/MoliyaPage";
import TalabalargaHubPage   from "./pages/TalabalargaHubPage";
import StudentInfoPage       from "./pages/StudentInfoPage";
import AdminPanel from "./pages/AdminPanel.jsx";
import ModalsPage from "./pages/ModalsPage.jsx";
import ChartsPage from "./pages/ChartsPage.jsx";
import TablePage from "./pages/TablePage.jsx";
import EditorPage from "./pages/EditorPage.jsx";

import AuditoriumPage from "./pages/AuditoriumPage.jsx";
import CurriculumPage from "./pages/CurriculumPage.jsx";
import EmployeePage from "./pages/EmployeePage.jsx";
import MailboxPage from "./pages/MailboxPage.jsx";
import TipTapEditorPage from "./pages/TipTapEditor.jsx";

import TimetablePage from "./pages/TimetablePage.jsx";

/* ─── Inner layout — uses router hooks ─────────────────────────── */
function AppLayout() {
  const navigateFn = useNavigate();
  const location   = useLocation();
  const isMobile   = useIsMobile();

  // Thin wrapper so existing pages keep the same `navigate(page, params)` API
  const navigate = (page, params = {}) => {
    const path = buildPath(page, params);
    navigateFn(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPage = locationToPage(location.pathname);
  const isPortal    = currentPage === "portal";

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans','Segoe UI',sans-serif",
        background: C.lightGray,
        minHeight: "100vh",
        paddingBottom: isMobile ? 64 : 0,
      }}
    >
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

      {!isPortal && (
        <Header navigate={navigate} currentPage={currentPage} isMobile={isMobile} />
      )}

      <main>
        <Routes>
          {/* ── Static pages ── */}
          <Route path="/"            element={<HomePage           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/news"        element={<NewsListPage       navigate={navigate} isMobile={isMobile} />} />
          <Route path="/faculty"     element={<FacultyListPage    navigate={navigate} isMobile={isMobile} />} />
          <Route path="/admissions"  element={<AdmissionsPage     navigate={navigate} isMobile={isMobile} />} />
          <Route path="/about"       element={<AboutPage          navigate={navigate} isMobile={isMobile} />} />
          <Route path="/administration"       element={<AdministrationPage          navigate={navigate} isMobile={isMobile} />} />
          <Route path="/portal"      element={<StudentPortalPage  navigate={navigate} isMobile={isMobile} />} />
          <Route path="/contact"     element={<ContactPage        navigate={navigate} isMobile={isMobile} />} />
          <Route path="/student-hub" element={<TalabalargaHubPage navigate={navigate} isMobile={isMobile} />} />

          {/* ── Dynamic-param pages ── */}
          <Route path="/news/:newsId"         element={<NewsDetailWrapper        navigate={navigate} isMobile={isMobile} />} />
          <Route path="/faculty/:facId"       element={<FacultyDetailWrapper     navigate={navigate} isMobile={isMobile} />} />
          <Route path="/dept/:deptId"         element={<DeptDetailWrapper        navigate={navigate} isMobile={isMobile} />} />
          <Route path="/teacher/:teacherId"   element={<TeacherDetailWrapper     navigate={navigate} isMobile={isMobile} />} />

          {/* ── Section pages ── */}
          <Route path="/science/:section"     element={<ScienceWrapper           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/science"              element={<Navigate replace to="/science/kengash" />} />

          <Route path="/cultural/:section"    element={<CulturalWrapper          navigate={navigate} isMobile={isMobile} />} />
          <Route path="/cultural"             element={<Navigate replace to="/cultural/sport" />} />

          <Route path="/finance/:section"     element={<FinanceWrapper           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/finance"              element={<Navigate replace to="/finance/tolov" />} />

          <Route path="/student-info/:section" element={<StudentInfoWrapper      navigate={navigate} isMobile={isMobile} />} />
          <Route path="/student-info"          element={<Navigate replace to="/student-info/baholash" />} />

          {/* ── edu-methods alias ── */}
          <Route path="/edu-methods" element={<MoliyaPage navigate={navigate} params={{ section: "tolov" }} isMobile={isMobile} />} />

          <Route path="/admin"          element={<AdminPanel           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/modals"          element={<ModalsPage           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/editor"          element={<EditorPage           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/tiptap"          element={<TipTapEditorPage           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/charts"          element={<ChartsPage           navigate={navigate} isMobile={isMobile} />} />
          <Route path="/tables"          element={<TablePage          navigate={navigate} isMobile={isMobile} />} />

          <Route path="/auditorium"          element={<AuditoriumPage          navigate={navigate} isMobile={isMobile} />} />
          <Route path="/curriculum"          element={<CurriculumPage          navigate={navigate} isMobile={isMobile} />} />
          <Route path="/employee"          element={<EmployeePage          navigate={navigate} isMobile={isMobile} />} />
          <Route path="/mail"          element={<MailboxPage          navigate={navigate} isMobile={isMobile} />} />

          <Route path="/timetable"          element={<TimetablePage          navigate={navigate} isMobile={isMobile} />} />

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      {!isMobile && !isPortal && <Footer navigate={navigate} />}
      {isMobile  && <MobileBottomNav currentPage={currentPage} navigate={navigate} />}
    </div>
  );
}

/* ─── Param-reading wrappers ────────────────────────────────────── */
function NewsDetailWrapper({ navigate, isMobile }) {
  const { newsId } = useParams();
  return <NewsDetailPage navigate={navigate} params={{ newsId }} isMobile={isMobile} />;
}
function FacultyDetailWrapper({ navigate, isMobile }) {
  const { facId } = useParams();
  return <FacultyDetailPage navigate={navigate} params={{ facId: Number(facId) }} isMobile={isMobile} />;
}
function DeptDetailWrapper({ navigate, isMobile }) {
  const { deptId } = useParams();
  return <DepartmentDetailPage navigate={navigate} params={{ deptId: Number(deptId) }} isMobile={isMobile} />;
}
function TeacherDetailWrapper({ navigate, isMobile }) {
  const { teacherId } = useParams();
  return <TeacherDetailPage navigate={navigate} params={{ teacherId: Number(teacherId) }} isMobile={isMobile} />;
}
function ScienceWrapper({ navigate, isMobile }) {
  const { section } = useParams();
  return <IlmiyFaoliyatPage navigate={navigate} params={{ section }} isMobile={isMobile} />;
}
function CulturalWrapper({ navigate, isMobile }) {
  const { section } = useParams();
  return <MadaniyFaoliyatPage navigate={navigate} params={{ section }} isMobile={isMobile} />;
}
function FinanceWrapper({ navigate, isMobile }) {
  const { section } = useParams();
  return <MoliyaPage navigate={navigate} params={{ section }} isMobile={isMobile} />;
}
function StudentInfoWrapper({ navigate, isMobile }) {
  const { section } = useParams();
  return <StudentInfoPage navigate={navigate} params={{ section }} isMobile={isMobile} />;
}

/* ─── Helpers ───────────────────────────────────────────────────── */

/**
 * Convert the old (page, params) API to a URL path so all existing
 * navigate() call-sites keep working without any changes.
 */
function buildPath(page, params = {}) {
  switch (page) {
    case "home":           return "/";
    case "news-list":      return "/news";
    case "news-detail":    return `/news/${params.newsId}`;
    case "faculty-list":   return "/faculty";
    case "faculty-detail": return `/faculty/${params.facId}`;
    case "dept-detail":    return `/dept/${params.deptId}`;
    case "teacher-detail": return `/teacher/${params.teacherId}`;
    case "admissions":     return "/admissions";
    case "about":          return "/about";
    case "administration":          return "/administration";
    case "portal":         return "/portal";
    case "contact":        return "/contact";
    case "science":        return `/science/${params.section || "kengash"}`;
    case "cultural":       return `/cultural/${params.section || "sport"}`;
    case "finance":        return `/finance/${params.section || "tolov"}`;
    case "edu-methods":    return "/edu-methods";
    case "student-hub":    return "/student-hub";
    case "student-info":   return `/student-info/${params.section || "baholash"}`;

    case "admin":    return "/admin";
    case "tables":    return "/tables";
    case "charts":    return "/charts";
    case "editor":    return "/editor";
    case "modals":    return "/modals";
    case "mail":    return "/mail";
    case "timetable":    return "/timetable";
    default:               return "/";
  }
}

/** Map current pathname back to a "page" string for Header/BottomNav active states. */
function locationToPage(pathname) {
  if (pathname === "/")                       return "home";
  if (pathname.startsWith("/news/"))          return "news-detail";
  if (pathname === "/news")                   return "news-list";
  if (pathname.startsWith("/faculty/"))       return "faculty-detail";
  if (pathname === "/faculty")                return "faculty-list";
  if (pathname.startsWith("/dept/"))          return "dept-detail";
  if (pathname.startsWith("/teacher/"))       return "teacher-detail";
  if (pathname === "/admissions")             return "admissions";
  if (pathname === "/about")                  return "about";
  if (pathname === "/portal")                 return "portal";
  if (pathname === "/contact")                return "contact";
  if (pathname.startsWith("/science"))        return "science";
  if (pathname.startsWith("/cultural"))       return "cultural";
  if (pathname.startsWith("/finance"))        return "finance";
  if (pathname === "/edu-methods")            return "edu-methods";
  if (pathname === "/student-hub")            return "student-hub";
  if (pathname.startsWith("/student-info"))   return "student-info";
  if (pathname === "/admin")            return "admin";
  if (pathname === "/tables")            return "tables";
  if (pathname === "/charts")            return "charts";
  if (pathname === "/editor")            return "editor";
  if (pathname === "/modals")            return "modals";
  if (pathname === "/mail")            return "mail";
  return "home";
}

/* ─── Root export ───────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}