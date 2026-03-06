import C from "../../constants/colors";
import Ico from "./Ico";

function IcoBadge({ iconName, label, color, size=38 }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <div style={{ width:size, height:size, borderRadius:10, background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", border:`1.5px solid ${color}25` }}>
        <Ico name={iconName} size={size*0.52} color={color}/>
      </div>
      {label&&<span style={{ fontSize:10, color:C.light, fontWeight:600 }}>{label}</span>}
    </div>
  );
}

export default IcoBadge;
