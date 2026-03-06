import C from "../../constants/colors";

function Badge({ label, color }) {
  return <span style={{ background:`${color}18`, color, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.4px", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center" }}>{label}</span>;
}

export default Badge;
