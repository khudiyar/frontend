import C from "../../constants/colors";
import Ico from "./Ico";

function Breadcrumb({ items, navigate }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:C.light, flexWrap:"wrap", padding:"12px 0" }}>
      {items.map((item,i)=>(
        <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          {i>0&&<Ico name="chevRight" size={12} color="rgba(255,255,255,0.3)"/>}
          {item.page
            ? <span onClick={()=>navigate(item.page,item.params)} style={{ cursor:"pointer", color:"rgba(255,255,255,0.7)", fontWeight:600, display:"flex", alignItems:"center", gap:4, transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=C.orange} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.7)"}>{item.label}</span>
            : <span style={{ color:"rgba(255,255,255,0.45)", fontWeight:500 }}>{item.label}</span>
          }
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;
