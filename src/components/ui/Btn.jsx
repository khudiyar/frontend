import C from "../../constants/colors";

function Btn({ children, variant="primary", onClick, style:sx={} }) {
  const base = { border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:14, borderRadius:9, padding:"11px 22px", transition:"all 0.2s ease", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8 };
  const vs = {
    primary:  { background:`linear-gradient(135deg,${C.bright},${C.blue})`,  color:C.white, boxShadow:`0 4px 14px rgba(40,69,214,0.28)` },
    orange:   { background:`linear-gradient(135deg,${C.orange},#ff9f6a)`,   color:C.white, boxShadow:`0 4px 14px rgba(246,128,72,0.32)` },
    outline:  { background:"transparent", color:C.bright, border:`2px solid ${C.bright}` },
    ghost:    { background:"rgba(255,255,255,0.12)", color:C.white, border:"2px solid rgba(255,255,255,0.22)", backdropFilter:"blur(8px)" },
    navy:     { background:`linear-gradient(135deg,${C.navy},${C.blue})`,    color:C.white, boxShadow:`0 4px 14px rgba(13,26,99,0.28)` },
  };
  return <button style={{...base,...vs[variant],...sx}} onClick={onClick}>{children}</button>;
}

export default Btn;
