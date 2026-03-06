import C from "../../constants/colors";
import Ico from "../ui/Ico";

function Footer({ navigate }) {
  const cols=[
    {title:"Universitet", links:[{l:"Tarixi",p:"about"},{l:"Tuzilma",p:"about"},{l:"Rektorat",p:"about"},{l:"Fakultetlar",p:"faculty-list"}]},
    {title:"Ta'lim",      links:[{l:"Bakalavriat",p:"admissions"},{l:"Magistratura",p:"admissions"},{l:"Doktorantura",p:"admissions"},{l:"Qabul",p:"admissions"}]},
    {title:"Axborot",     links:[{l:"Yangiliklar",p:"news-list"},{l:"Fotogalereya",p:"news-list"},{l:"Talabalar portali",p:"portal"},{l:"Aloqa",p:"contact"}]},
  ];
  const socials=[{icon:"facebook",color:"#1877F2"},{icon:"telegram",color:"#2AABEE"},{icon:"instagram",color:"#E1306C"},{icon:"youtube",color:"#FF0000"}];
  return (
    <footer style={{ background:C.navy, color:"rgba(255,255,255,0.65)", padding:"48px 24px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{ width:40, height:40, borderRadius:8, background:`linear-gradient(135deg,${C.orange},#ff9f6a)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(246,128,72,0.4)" }}>
                <Ico name="university" size={22} color={C.white} sw={1.8}/>
              </div>
              <div style={{ color:C.white, fontWeight:700, fontSize:14 }}>NukusDTU</div>
            </div>
            <p style={{ fontSize:13, lineHeight:1.7, maxWidth:280 }}>Nukus davlat texnika universiteti</p>
            <div style={{ marginTop:18, display:"flex", gap:8 }}>
              {socials.map(s=>(
                <div key={s.icon} style={{ width:34, height:34, borderRadius:8, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=s.color;e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.transform="translateY(0)";}}
                >
                  <Ico name={s.icon} size={16} color={C.white} sw={1.5}/>
                </div>
              ))}
            </div>
          </div>
          {cols.map(col=>(
            <div key={col.title}>
              <h4 style={{ color:C.white, fontWeight:700, marginBottom:14, fontSize:13, textTransform:"uppercase", letterSpacing:"0.8px" }}>{col.title}</h4>
              {col.links.map(lk=>(
                <div key={lk.l} onClick={()=>navigate(lk.p)} style={{ marginBottom:9, fontSize:13, cursor:"pointer", transition:"color 0.15s", display:"flex", alignItems:"center", gap:6 }}
                  onMouseEnter={e=>e.currentTarget.style.color=C.orange}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.65)"}
                >
                  <div style={{ width:4, height:4, borderRadius:"50%", background:C.orange, opacity:0.5, flexShrink:0 }}/>
                  {lk.l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:18, display:"flex", justifyContent:"space-between", fontSize:12 }}>
          <span>© 2026 Nukus davlat texnika universiteti. Barcha huquqlar himoyalangan.</span>
          <span style={{ color:C.orange }}>Maxfiylik siyosati · Sayt xaritasi</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
