import C from "../../constants/colors";
import Ico from "../ui/Ico";

const mobileNavItems = [
  { id:"home",      icon:"home",       label:"Bosh sahifa", page:"home"      },
  { id:"faculty",   icon:"university", label:"Fakultetlar", page:"faculty-list" },
  { id:"news",      icon:"newspaper",  label:"Yangiliklar", page:"news-list", badge:true },
  { id:"students",  icon:"graduation", label:"Talabalar",   page:"portal"    },
  { id:"admission", icon:"clipboard",  label:"Qabul",       page:"admissions"},
  { id:"contact", icon:"contact",  label:"Aloqa",       page:"contact"},
];

function MobileBottomNav({ currentPage, navigate }) {
  const active = mobileNavItems.find(i=>i.page===currentPage)?.id||"home";
  const idx    = mobileNavItems.findIndex(i=>i.id===active);
  return (
    <nav style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:3000, background:C.white, borderTop:`1.5px solid ${C.gray}`, boxShadow:"0 -6px 28px rgba(13,26,99,0.12)", display:"flex", paddingBottom:"env(safe-area-inset-bottom,0px)" }}>
      {/* Sliding accent bar */}
      <div style={{ position:"absolute", top:0, height:3, borderRadius:"0 0 4px 4px", background:`linear-gradient(90deg,${C.bright},${C.orange})`, width:`${100/5}%`, left:`${idx*(100/5)}%`, transition:"left 0.3s cubic-bezier(0.34,1.2,0.64,1)" }}/>
      {mobileNavItems.map(item=>{
        const isActive = item.id===active;
        return (
          <button key={item.id} onClick={()=>navigate(item.page)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"6px 2px 8px", position:"relative", WebkitTapHighlightColor:"transparent", outline:"none", fontFamily:"inherit" }}>
            <div style={{ width:isActive?44:32, height:28, borderRadius:isActive?14:9, background:isActive?`linear-gradient(135deg,${C.bright}18,${C.orange}14)`:"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s cubic-bezier(0.34,1.5,0.64,1)" }}>
              <Ico name={item.icon} size={isActive?20:18} color={isActive?C.bright:C.light} sw={isActive?2:1.5}/>
            </div>
            <span style={{ fontSize:9, fontWeight:isActive?700:500, color:isActive?C.bright:C.light, transition:"all 0.2s", letterSpacing:"0.1px" }}>{item.label}</span>
            {item.badge&&!isActive&&<div style={{ position:"absolute", top:7, left:"calc(50% + 7px)", width:7, height:7, borderRadius:"50%", background:C.orange, border:"2px solid white", animation:"pulse 1.8s infinite" }}/>}
          </button>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
