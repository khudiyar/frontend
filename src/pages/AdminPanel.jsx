import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ──────────────────────────────────────────────
const C = {
  navy:       "#0D1A63",
  blue:       "#1E3A9E",
  bright:     "#2845D6",
  lightBlue:  "#EEF2FF",
  orange:     "#F68048",
  orangeLight:"#FFF4ED",
  green:      "#16A34A",
  greenLight: "#F0FDF4",
  red:        "#DC2626",
  redLight:   "#FEF2F2",
  yellow:     "#D97706",
  yellowLight:"#FFFBEB",
  dark:       "#0F172A",
  mid:        "#475569",
  light:      "#94A3B8",
  gray:       "#E2E8F0",
  lightGray:  "#F8FAFC",
  white:      "#FFFFFF",
};

// ─── ICONS (SVG inline) ──────────────────────────────────────────
const icons = {
  menu:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  dashboard:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  users:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  forms:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  calendar:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  upload:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  settings:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  bell:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  user:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  chevDown:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>,
  chevRight:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18"/></svg>,
  chevLeft:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 6 9 12 15 18"/></svg>,
  search:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  x:           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  logout:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  profile:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  key:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  file:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
  image:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  info:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const Ico = ({ name, size = 18, color = "currentColor" }) => (
  <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:size, height:size, color, flexShrink:0 }}>
    {icons[name] || icons.info}
  </span>
);

// ─── GLOBAL STYLES ───────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${C.gray}; border-radius: 99px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  input, textarea, select, button { font-family: 'DM Sans', sans-serif; }
  input:focus, textarea:focus, select:focus { outline: none; }
`;

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────
const Label = ({ children, required }) => (
  <div style={{ fontSize:12, fontWeight:600, color:C.mid, marginBottom:7, letterSpacing:"0.3px", textTransform:"uppercase" }}>
    {children}{required && <span style={{ color:C.red, marginLeft:3 }}>*</span>}
  </div>
);

const FieldWrap = ({ label, required, hint, children, style }) => (
  <div style={{ marginBottom:20, ...style }}>
    {label && <Label required={required}>{label}</Label>}
    {children}
    {hint && <div style={{ fontSize:11, color:C.light, marginTop:5 }}>{hint}</div>}
  </div>
);

const inputBase = {
  width:"100%", padding:"10px 13px", borderRadius:10,
  border:`1.5px solid ${C.gray}`, background:C.white,
  fontSize:14, color:C.dark, transition:"border-color 0.2s, box-shadow 0.2s",
};

const SectionTitle = ({ icon, title, subtitle }) => (
  <div style={{ marginBottom:24, paddingBottom:16, borderBottom:`2px solid ${C.lightGray}` }}>
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
      <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C.bright},${C.blue})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Ico name={icon} size={18} color={C.white}/>
      </div>
      <h2 style={{ fontSize:20, fontWeight:800, color:C.dark, fontFamily:"'Syne',sans-serif" }}>{title}</h2>
    </div>
    {subtitle && <p style={{ fontSize:13, color:C.light, marginLeft:46 }}>{subtitle}</p>}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.gray}`, padding:"24px", ...style }}>
    {children}
  </div>
);

// ─── COMPONENTS ──────────────────────────────────────────────────

// TEXT INPUT
const TextInput = ({ label, placeholder, type="text", required, hint, icon, prefix, suffix }) => {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  return (
    <FieldWrap label={label} required={required} hint={hint}>
      <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
        {icon && <span style={{ position:"absolute", left:11, color:focused?C.bright:C.light, transition:"color 0.2s" }}><Ico name={icon} size={16}/></span>}
        {prefix && <div style={{ position:"absolute", left:12, fontSize:14, color:C.light, userSelect:"none" }}>{prefix}</div>}
        <input
          type={type} value={val} onChange={e=>setVal(e.target.value)}
          placeholder={placeholder}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{ ...inputBase, paddingLeft: icon?38:prefix?28:13, paddingRight: suffix?38:13,
            borderColor: focused?C.bright:C.gray,
            boxShadow: focused?`0 0 0 3px ${C.bright}18`:"none",
          }}
        />
        {suffix && <span style={{ position:"absolute", right:11, color:C.light }}>{suffix}</span>}
      </div>
    </FieldWrap>
  );
};

// TEXTAREA
const TextArea = ({ label, placeholder, required, hint, rows=4 }) => {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  return (
    <FieldWrap label={label} required={required} hint={hint}>
      <textarea
        rows={rows} value={val} onChange={e=>setVal(e.target.value)}
        placeholder={placeholder}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ ...inputBase, resize:"vertical", lineHeight:1.6,
          borderColor: focused?C.bright:C.gray,
          boxShadow: focused?`0 0 0 3px ${C.bright}18`:"none",
        }}
      />
      <div style={{ textAlign:"right", fontSize:11, color:C.light, marginTop:4 }}>{val.length} ta belgi</div>
    </FieldWrap>
  );
};

// RADIO GROUP
const RadioGroup = ({ label, options, required, hint, direction="row" }) => {
  const [val, setVal] = useState(null);
  return (
    <FieldWrap label={label} required={required} hint={hint}>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", flexDirection: direction==="col"?"column":"row" }}>
        {options.map(opt => (
          <label key={opt.value} onClick={()=>setVal(opt.value)}
            style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 14px", borderRadius:10,
              border:`1.5px solid ${val===opt.value?C.bright:C.gray}`,
              background: val===opt.value?C.lightBlue:C.white,
              cursor:"pointer", transition:"all 0.2s", userSelect:"none",
            }}>
            <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${val===opt.value?C.bright:C.light}`,
              display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", flexShrink:0 }}>
              {val===opt.value && <div style={{ width:8, height:8, borderRadius:"50%", background:C.bright }}/>}
            </div>
            <span style={{ fontSize:13, fontWeight:500, color:val===opt.value?C.bright:C.mid }}>{opt.label}</span>
          </label>
        ))}
      </div>
    </FieldWrap>
  );
};

// CHECKBOX GROUP
const CheckboxGroup = ({ label, options, required, hint }) => {
  const [vals, setVals] = useState([]);
  const toggle = v => setVals(p => p.includes(v) ? p.filter(x=>x!==v) : [...p,v]);
  return (
    <FieldWrap label={label} required={required} hint={hint}>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
        {options.map(opt => {
          const checked = vals.includes(opt.value);
          return (
            <label key={opt.value} onClick={()=>toggle(opt.value)}
              style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 14px", borderRadius:10,
                border:`1.5px solid ${checked?C.bright:C.gray}`,
                background: checked?C.lightBlue:C.white,
                cursor:"pointer", transition:"all 0.2s", userSelect:"none",
              }}>
              <div style={{ width:18, height:18, borderRadius:5, border:`2px solid ${checked?C.bright:C.light}`,
                background:checked?C.bright:"transparent", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.2s", flexShrink:0 }}>
                {checked && <Ico name="check" size={11} color={C.white}/>}
              </div>
              <span style={{ fontSize:13, fontWeight:500, color:checked?C.bright:C.mid }}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </FieldWrap>
  );
};

// TOGGLE / SWITCH
const Toggle = ({ label, description, defaultOn=false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"14px 16px", borderRadius:12, border:`1.5px solid ${on?C.bright:C.gray}`,
      background:on?C.lightBlue:C.white, cursor:"pointer", transition:"all 0.25s",
      marginBottom:10 }} onClick={()=>setOn(p=>!p)}>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color:on?C.bright:C.dark }}>{label}</div>
        {description && <div style={{ fontSize:11, color:C.light, marginTop:2 }}>{description}</div>}
      </div>
      <div style={{ width:44, height:24, borderRadius:12, background:on?C.bright:C.gray, position:"relative", transition:"background 0.25s", flexShrink:0 }}>
        <div style={{ position:"absolute", top:3, left: on?23:3, width:18, height:18, borderRadius:"50%", background:C.white,
          boxShadow:"0 1px 4px rgba(0,0,0,0.2)", transition:"left 0.25s" }}/>
      </div>
    </div>
  );
};

// SELECT WITH SEARCH
const SearchSelect = ({ label, options, placeholder="Tanlang...", required, hint, multi=false }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(multi?[]:[]);
  const ref = useRef();

  useEffect(() => {
    const h = e => { if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  const select = (opt) => {
    if (multi) {
      setSelected(p => p.find(x=>x.value===opt.value) ? p.filter(x=>x.value!==opt.value) : [...p, opt]);
    } else {
      setSelected(opt);
      setOpen(false);
      setSearch("");
    }
  };

  const isSelected = (opt) => multi
    ? selected.find(x=>x.value===opt.value)
    : selected?.value === opt.value;

  const displayText = multi
    ? selected.length===0 ? placeholder : null
    : selected?.label || placeholder;

  return (
    <FieldWrap label={label} required={required} hint={hint}>
      <div ref={ref} style={{ position:"relative" }}>
        <div onClick={()=>setOpen(p=>!p)}
          style={{ ...inputBase, display:"flex", alignItems:"center", justifyContent:"space-between",
            cursor:"pointer", borderColor:open?C.bright:C.gray,
            boxShadow:open?`0 0 0 3px ${C.bright}18`:"none", minHeight:42,
          }}>
          <div style={{ flex:1, display:"flex", flexWrap:"wrap", gap:5 }}>
            {multi && selected.length>0
              ? selected.map(s=>(
                  <span key={s.value} style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 8px",
                    borderRadius:20, background:C.lightBlue, color:C.bright, fontSize:12, fontWeight:600 }}>
                    {s.label}
                    <span onClick={e=>{e.stopPropagation();select(s)}} style={{ cursor:"pointer", display:"flex" }}>
                      <Ico name="x" size={12}/>
                    </span>
                  </span>
                ))
              : <span style={{ color: displayText===placeholder?C.light:C.dark, fontSize:14 }}>{displayText}</span>
            }
          </div>
          <span style={{ color:C.light, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s" }}>
            <Ico name="chevDown" size={16}/>
          </span>
        </div>
        {open && (
          <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:200,
            background:C.white, borderRadius:12, border:`1.5px solid ${C.gray}`,
            boxShadow:"0 12px 36px rgba(13,26,99,0.12)", overflow:"hidden", animation:"slideDown 0.15s ease" }}>
            <div style={{ padding:"10px 10px 6px", borderBottom:`1px solid ${C.lightGray}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 11px",
                background:C.lightGray, borderRadius:8 }}>
                <Ico name="search" size={14} color={C.light}/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Qidirish..."
                  autoFocus
                  style={{ border:"none", background:"transparent", fontSize:13, color:C.dark, width:"100%" }}/>
                {search && <span onClick={()=>setSearch("")} style={{ cursor:"pointer", color:C.light }}><Ico name="x" size={13}/></span>}
              </div>
            </div>
            <div style={{ maxHeight:220, overflowY:"auto" }}>
              {filtered.length===0
                ? <div style={{ padding:"16px", textAlign:"center", color:C.light, fontSize:13 }}>Natija topilmadi</div>
                : filtered.map(opt => (
                    <div key={opt.value} onClick={()=>select(opt)}
                      style={{ padding:"10px 14px", fontSize:13, cursor:"pointer",
                        background: isSelected(opt)?C.lightBlue:"transparent",
                        color: isSelected(opt)?C.bright:C.dark,
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        fontWeight: isSelected(opt)?600:400,
                        transition:"background 0.15s",
                      }}
                      onMouseEnter={e=>{ if(!isSelected(opt)) e.currentTarget.style.background=C.lightGray; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background=isSelected(opt)?C.lightBlue:"transparent"; }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        {opt.icon && <Ico name={opt.icon} size={15} color={isSelected(opt)?C.bright:C.light}/>}
                        {opt.label}
                      </div>
                      {isSelected(opt) && <Ico name="check" size={15} color={C.bright}/>}
                    </div>
                  ))
              }
            </div>
          </div>
        )}
      </div>
    </FieldWrap>
  );
};

// DATE TIME PICKER
const DateTimePicker = ({ label, type="date", required, hint }) => {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  return (
    <FieldWrap label={label} required={required} hint={hint}>
      <div style={{ position:"relative" }}>
        <input type={type} value={val} onChange={e=>setVal(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{ ...inputBase, paddingLeft:38,
            borderColor:focused?C.bright:C.gray,
            boxShadow:focused?`0 0 0 3px ${C.bright}18`:"none",
            colorScheme:"light",
          }}/>
        <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:focused?C.bright:C.light, pointerEvents:"none", transition:"color 0.2s" }}>
          <Ico name="calendar" size={16}/>
        </span>
      </div>
    </FieldWrap>
  );
};

// RANGE SLIDER
const RangeSlider = ({ label, min=0, max=100, step=1, defaultVal=40, hint, suffix="" }) => {
  const [val, setVal] = useState(defaultVal);
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <FieldWrap label={label} hint={hint}>
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontSize:12, color:C.light }}>{min}{suffix}</span>
          <span style={{ fontSize:15, fontWeight:700, color:C.bright, fontFamily:"'Syne',sans-serif" }}>{val}{suffix}</span>
          <span style={{ fontSize:12, color:C.light }}>{max}{suffix}</span>
        </div>
        <div style={{ position:"relative", height:24, display:"flex", alignItems:"center" }}>
          <div style={{ width:"100%", height:6, borderRadius:3, background:C.gray, position:"relative" }}>
            <div style={{ position:"absolute", left:0, width:`${pct}%`, height:"100%", borderRadius:3, background:`linear-gradient(90deg,${C.bright},${C.orange})` }}/>
          </div>
          <input type="range" min={min} max={max} step={step} value={val} onChange={e=>setVal(+e.target.value)}
            style={{ position:"absolute", width:"100%", opacity:0, cursor:"pointer", height:24 }}/>
          <div style={{ position:"absolute", left:`calc(${pct}% - 11px)`, width:22, height:22, borderRadius:"50%",
            background:C.white, border:`2.5px solid ${C.bright}`, boxShadow:"0 2px 8px rgba(40,69,214,0.25)",
            pointerEvents:"none", transition:"box-shadow 0.2s" }}/>
        </div>
      </div>
    </FieldWrap>
  );
};

// FILE UPLOAD
const FileUpload = ({ label, hint, accept="*", multiple=false }) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFiles = (newFiles) => {
    const arr = Array.from(newFiles).map(f=>({ name:f.name, size:f.size, type:f.type, id:Math.random() }));
    setFiles(p => multiple ? [...p,...arr] : arr);
  };

  const formatSize = b => b>1024*1024 ? `${(b/1024/1024).toFixed(1)}MB` : `${(b/1024).toFixed(0)}KB`;

  const remove = id => setFiles(p=>p.filter(f=>f.id!==id));

  return (
    <FieldWrap label={label} hint={hint}>
      <div
        onClick={()=>inputRef.current.click()}
        onDrop={e=>{e.preventDefault();setDragging(false);handleFiles(e.dataTransfer.files);}}
        onDragOver={e=>{e.preventDefault();setDragging(true);}}
        onDragLeave={()=>setDragging(false)}
        style={{ border:`2px dashed ${dragging?C.bright:C.gray}`, borderRadius:12, padding:"28px 20px",
          textAlign:"center", cursor:"pointer", background:dragging?C.lightBlue:C.lightGray,
          transition:"all 0.2s" }}>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} style={{ display:"none" }}
          onChange={e=>handleFiles(e.target.files)}/>
        <div style={{ width:48, height:48, borderRadius:12, background:dragging?`${C.bright}18`:C.white,
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px",
          border:`1.5px solid ${dragging?C.bright:C.gray}`, transition:"all 0.2s" }}>
          <Ico name="upload" size={22} color={dragging?C.bright:C.light}/>
        </div>
        <div style={{ fontSize:14, fontWeight:600, color:dragging?C.bright:C.dark, marginBottom:4 }}>
          {dragging?"Faylni qo'yib yuboring":"Faylni yuklash uchun bosing yoki tortib tashlang"}
        </div>
        <div style={{ fontSize:12, color:C.light }}>PNG, JPG, PDF, DOC qabul qilinadi (max 10MB)</div>
      </div>
      {files.length>0 && (
        <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:8 }}>
          {files.map(f=>(
            <div key={f.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
              background:C.white, borderRadius:10, border:`1px solid ${C.gray}` }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`${C.bright}12`,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ico name={f.type.startsWith("image")?"image":"file"} size={16} color={C.bright}/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.dark, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</div>
                <div style={{ fontSize:11, color:C.light }}>{formatSize(f.size)}</div>
              </div>
              <div style={{ width:24, height:24, borderRadius:6, background:C.lightGray,
                display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
                flexShrink:0 }} onClick={()=>remove(f.id)}>
                <Ico name="x" size={13} color={C.light}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldWrap>
  );
};

// MINI CALENDAR
const MiniCalendar = ({ label }) => {
  const today = new Date();
  const [cur, setCur] = useState({ y:today.getFullYear(), m:today.getMonth() });
  const [selected, setSelected] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [mode, setMode] = useState("single"); // "single" | "range"

  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
  const dayNames = ["Du","Se","Ch","Pa","Ju","Sh","Ya"];

  const firstDay = new Date(cur.y, cur.m, 1).getDay();
  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(cur.y, cur.m+1, 0).getDate();

  const cells = [];
  for(let i=0; i<offset; i++) cells.push(null);
  for(let i=1; i<=daysInMonth; i++) cells.push(i);

  const prevMonth = () => setCur(p => p.m===0?{y:p.y-1,m:11}:{y:p.y,m:p.m-1});
  const nextMonth = () => setCur(p => p.m===11?{y:p.y+1,m:0}:{y:p.y,m:p.m+1});

  const clickDay = d => {
    if(!d) return;
    const date = new Date(cur.y, cur.m, d);
    if(mode==="single") { setSelected(date); setRangeStart(null); setRangeEnd(null); }
    else {
      if(!rangeStart || (rangeStart && rangeEnd)) { setRangeStart(date); setRangeEnd(null); }
      else {
        if(date < rangeStart) { setRangeEnd(rangeStart); setRangeStart(date); }
        else setRangeEnd(date);
      }
    }
  };

  const isToday = d => d && today.getDate()===d && today.getMonth()===cur.m && today.getFullYear()===cur.y;
  const isSelected = d => {
    if(!d) return false;
    const date = new Date(cur.y, cur.m, d);
    if(mode==="single") return selected && date.toDateString()===selected.toDateString();
    return (rangeStart && date.toDateString()===rangeStart.toDateString()) || (rangeEnd && date.toDateString()===rangeEnd.toDateString());
  };
  const inRange = d => {
    if(!d || mode==="single" || !rangeStart || !rangeEnd) return false;
    const date = new Date(cur.y, cur.m, d);
    return date > rangeStart && date < rangeEnd;
  };

  return (
    <FieldWrap label={label}>
      <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.gray}`, overflow:"hidden" }}>
        {/* Mode selector */}
        <div style={{ display:"flex", gap:6, padding:"12px 14px 0" }}>
          {["single","range"].map(m=>(
            <button key={m} onClick={()=>setMode(m)}
              style={{ padding:"4px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11, fontWeight:700,
                background:mode===m?C.bright:C.lightGray, color:mode===m?C.white:C.light, transition:"all 0.2s" }}>
              {m==="single"?"Bitta sana":"Diapazon"}
            </button>
          ))}
        </div>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px 8px" }}>
          <button onClick={prevMonth} style={{ width:28, height:28, borderRadius:8, border:"none", cursor:"pointer", background:C.lightGray, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Ico name="chevLeft" size={14} color={C.mid}/>
          </button>
          <div style={{ fontSize:14, fontWeight:700, color:C.dark, fontFamily:"'Syne',sans-serif" }}>{months[cur.m]} {cur.y}</div>
          <button onClick={nextMonth} style={{ width:28, height:28, borderRadius:8, border:"none", cursor:"pointer", background:C.lightGray, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Ico name="chevRight" size={14} color={C.mid}/>
          </button>
        </div>
        {/* Days header */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", padding:"0 10px" }}>
          {dayNames.map(d=><div key={d} style={{ textAlign:"center", fontSize:10, fontWeight:700, color:C.light, padding:"4px 0", textTransform:"uppercase", letterSpacing:"0.5px" }}>{d}</div>)}
        </div>
        {/* Cells */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", padding:"4px 10px 12px", gap:2 }}>
          {cells.map((d,i)=>(
            <div key={i} onClick={()=>clickDay(d)}
              style={{ aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center",
                borderRadius:8, fontSize:13, fontWeight: isToday(d)?700:400,
                cursor:d?"pointer":"default",
                background: isSelected(d)?C.bright : inRange(d)?`${C.bright}18` : "transparent",
                color: isSelected(d)?C.white : isToday(d)?C.bright : d?C.dark:"transparent",
                border: isToday(d)&&!isSelected(d)?`1.5px solid ${C.bright}18`:"1.5px solid transparent",
                transition:"all 0.15s",
              }}
              onMouseEnter={e=>{ if(d&&!isSelected(d)&&!inRange(d)) e.currentTarget.style.background=C.lightGray; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=isSelected(d)?C.bright:inRange(d)?`${C.bright}18`:"transparent"; }}>
              {d}
            </div>
          ))}
        </div>
        {/* Footer */}
        {(selected || rangeStart) && (
          <div style={{ padding:"10px 14px", borderTop:`1px solid ${C.lightGray}`, background:C.lightBlue, fontSize:12, color:C.bright, fontWeight:600 }}>
            {mode==="single" && selected && `✓ ${selected.toLocaleDateString("uz-UZ")}`}
            {mode==="range" && rangeStart && !rangeEnd && `${rangeStart.toLocaleDateString("uz-UZ")} → ...`}
            {mode==="range" && rangeStart && rangeEnd && `${rangeStart.toLocaleDateString("uz-UZ")} → ${rangeEnd.toLocaleDateString("uz-UZ")}`}
          </div>
        )}
      </div>
    </FieldWrap>
  );
};

// COLOR PICKER
const ColorPicker = ({ label, hint }) => {
  const presets = ["#2845D6","#F68048","#16A34A","#DC2626","#D97706","#7C3AED","#0EA5E9","#0F172A","#64748B","#EC4899"];
  const [val, setVal] = useState(presets[0]);
  return (
    <FieldWrap label={label} hint={hint}>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
        {presets.map(c=>(
          <div key={c} onClick={()=>setVal(c)} style={{ width:32, height:32, borderRadius:8, background:c, cursor:"pointer",
            border:`2.5px solid ${val===c?"rgba(0,0,0,0.3)":"transparent"}`,
            boxShadow:val===c?`0 0 0 2px ${C.white}, 0 0 0 4px ${c}`:"none",
            transition:"all 0.2s" }}/>
        ))}
        <label style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px",
          borderRadius:8, border:`1.5px solid ${C.gray}`, cursor:"pointer", background:C.white }}>
          <input type="color" value={val} onChange={e=>setVal(e.target.value)}
            style={{ width:24, height:24, padding:0, border:"none", borderRadius:4, cursor:"pointer", background:"transparent" }}/>
          <span style={{ fontSize:12, fontWeight:600, color:C.mid, fontFamily:"monospace" }}>{val}</span>
        </label>
      </div>
    </FieldWrap>
  );
};

// RATING STARS
const StarRating = ({ label, hint }) => {
  const [val, setVal] = useState(0);
  const [hover, setHover] = useState(0);
  const labels = ["","Yomon","O'rtacha","Yaxshi","Zo'r","A'lo"];
  return (
    <FieldWrap label={label} hint={hint}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {[1,2,3,4,5].map(s=>(
          <span key={s} onClick={()=>setVal(s)} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)}
            style={{ fontSize:28, cursor:"pointer", color:(hover||val)>=s?"#F59E0B":"#E2E8F0",
              transition:"color 0.15s, transform 0.15s", transform:(hover||val)>=s?"scale(1.1)":"scale(1)" }}>
            ★
          </span>
        ))}
        {(hover||val)>0 && <span style={{ fontSize:13, color:C.mid, marginLeft:4 }}>{labels[hover||val]}</span>}
      </div>
    </FieldWrap>
  );
};

// TAGS INPUT
const TagsInput = ({ label, hint, placeholder="Tag qo'shing..." }) => {
  const [tags, setTags] = useState(["React","JavaScript"]);
  const [inp, setInp] = useState("");
  const add = () => { const t=inp.trim(); if(t && !tags.includes(t)) { setTags(p=>[...p,t]); setInp(""); } };
  return (
    <FieldWrap label={label} hint={hint}>
      <div style={{ ...inputBase, display:"flex", flexWrap:"wrap", gap:6, minHeight:44, alignItems:"center", cursor:"text" }}
        onClick={e=>e.currentTarget.querySelector("input")?.focus()}>
        {tags.map(t=>(
          <span key={t} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px",
            borderRadius:20, background:C.lightBlue, color:C.bright, fontSize:12, fontWeight:600, flexShrink:0 }}>
            {t}
            <span onClick={()=>setTags(p=>p.filter(x=>x!==t))} style={{ cursor:"pointer", display:"flex", lineHeight:1 }}>
              <Ico name="x" size={11}/>
            </span>
          </span>
        ))}
        <input value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter"||e.key===","){ e.preventDefault(); add(); } if(e.key==="Backspace"&&!inp) setTags(p=>p.slice(0,-1)); }}
          placeholder={tags.length===0?placeholder:""}
          style={{ border:"none", outline:"none", fontSize:13, color:C.dark, minWidth:80, flex:1, background:"transparent" }}/>
      </div>
    </FieldWrap>
  );
};

// STEPPER / NUMBER INPUT
const Stepper = ({ label, min=0, max=100, step=1, defaultVal=5, hint, suffix="" }) => {
  const [val, setVal] = useState(defaultVal);
  return (
    <FieldWrap label={label} hint={hint}>
      <div style={{ display:"flex", alignItems:"center", gap:0, border:`1.5px solid ${C.gray}`, borderRadius:10, overflow:"hidden", width:"fit-content", background:C.white }}>
        <button onClick={()=>setVal(p=>Math.max(min,p-step))}
          style={{ width:40, height:40, border:"none", cursor:val<=min?"not-allowed":"pointer",
            background:val<=min?C.lightGray:C.white, color:val<=min?C.light:C.dark, fontSize:18, fontWeight:700,
            transition:"background 0.15s" }}>−</button>
        <div style={{ padding:"0 20px", borderLeft:`1px solid ${C.gray}`, borderRight:`1px solid ${C.gray}`,
          fontSize:15, fontWeight:700, color:C.dark, height:40, display:"flex", alignItems:"center", gap:4 }}>
          {val}<span style={{ fontSize:12, color:C.light }}>{suffix}</span>
        </div>
        <button onClick={()=>setVal(p=>Math.min(max,p+step))}
          style={{ width:40, height:40, border:"none", cursor:val>=max?"not-allowed":"pointer",
            background:val>=max?C.lightGray:C.white, color:val>=max?C.light:C.dark, fontSize:18, fontWeight:700,
            transition:"background 0.15s" }}>+</button>
      </div>
    </FieldWrap>
  );
};

// PROGRESS BAR
const ProgressBar = ({ label, value, max=100, color=C.bright }) => {
  const pct = Math.min(100, Math.round((value/max)*100));
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:12, fontWeight:600, color:C.mid }}>{label}</span>
        <span style={{ fontSize:12, fontWeight:700, color }}>{pct}%</span>
      </div>
      <div style={{ height:8, borderRadius:4, background:C.lightGray, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, borderRadius:4,
          background:`linear-gradient(90deg,${color},${color}99)`, transition:"width 1s ease" }}/>
      </div>
    </div>
  );
};

// NOTIFICATION TOAST
const Toast = ({ type="success", message }) => {
  const cfg = {
    success: { bg:C.greenLight, border:C.green,  color:C.green,  icon:"check" },
    error:   { bg:C.redLight,   border:C.red,    color:C.red,    icon:"x" },
    warning: { bg:C.yellowLight,border:C.yellow, color:C.yellow, icon:"info" },
    info:    { bg:C.lightBlue,  border:C.bright, color:C.bright, icon:"info" },
  }[type];
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"12px 14px",
      borderRadius:10, background:cfg.bg, border:`1px solid ${cfg.border}20`,
      borderLeft:`3px solid ${cfg.border}`, marginBottom:8 }}>
      <div style={{ width:24, height:24, borderRadius:6, background:`${cfg.color}20`,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <Ico name={cfg.icon} size={13} color={cfg.color}/>
      </div>
      <span style={{ fontSize:13, color:C.dark, flex:1, lineHeight:1.5 }}>{message}</span>
    </div>
  );
};

// BADGE VARIANTS
const BadgeDemo = () => {
  const variants = [
    { label:"Faol",     color:C.green,  bg:C.greenLight },
    { label:"Kutilmoqda", color:C.yellow, bg:C.yellowLight },
    { label:"Bloklangan", color:C.red,   bg:C.redLight },
    { label:"Yangi",    color:C.bright, bg:C.lightBlue },
    { label:"Arxiv",    color:C.light,  bg:C.lightGray },
  ];
  return (
    <FieldWrap label="Badge / Status teglar">
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {variants.map(v=>(
          <span key={v.label} style={{ padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700,
            color:v.color, background:v.bg }}>{v.label}</span>
        ))}
      </div>
    </FieldWrap>
  );
};

// ─── SIDEBAR NAV ─────────────────────────────────────────────────
const navItems = [
  { id:"inputs",   icon:"forms",    label:"Input maydonlar" },
  { id:"selects",  icon:"chevDown", label:"Select & Multiselect" },
  { id:"checks",   icon:"check",    label:"Radio & Checkbox" },
  { id:"datetime", icon:"calendar", label:"Sana & Vaqt" },
  { id:"calendar", icon:"calendar", label:"Kalendar" },
  { id:"files",    icon:"upload",   label:"Fayl yuklash" },
  { id:"misc",     icon:"settings", label:"Qo'shimcha" },
];

// ─── MAIN APP ────────────────────────────────────────────────────
export default function AdminPanel() {
  const [tab, setTab] = useState("inputs");
  const [sideOpen, setSideOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef();

  useEffect(()=>{
    const h = e => { if(userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ minHeight:"100vh", background:C.lightGray, fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── HEADER ── */}
        <header style={{ height:60, background:`linear-gradient(135deg,${C.navy},${C.blue})`,
          display:"flex", alignItems:"center", padding:"0 20px",
          boxShadow:"0 2px 16px rgba(13,26,99,0.2)", position:"sticky", top:0, zIndex:300 }}>
          
          {/* Left: hamburger + logo */}
          <div style={{ display:"flex", alignItems:"center", gap:14, flex:1 }}>
            <button onClick={()=>setSideOpen(p=>!p)} style={{ width:36, height:36, borderRadius:9,
              background:"rgba(255,255,255,0.1)", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Ico name="menu" size={18} color={C.white}/>
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:9,
                background:`linear-gradient(135deg,${C.orange},#ff9f6a)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:"0 3px 10px rgba(246,128,72,0.35)" }}>
                <span style={{ fontSize:16 }}>🎓</span>
              </div>
              <div>
                <div style={{ color:C.white, fontWeight:800, fontSize:14, fontFamily:"'Syne',sans-serif", lineHeight:1 }}>EduAdmin</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:10 }}>Boshqaruv paneli</div>
              </div>
            </div>
          </div>

          {/* Right: notifications + user */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <button style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.1)",
              border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <Ico name="bell" size={17} color={C.white}/>
              <span style={{ position:"absolute", top:6, right:6, width:8, height:8, borderRadius:"50%",
                background:C.orange, border:`2px solid ${C.navy}` }}/>
            </button>

            {/* User menu */}
            <div ref={userRef} style={{ position:"relative" }}>
              <button onClick={()=>setUserMenuOpen(p=>!p)}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 10px 5px 5px",
                  borderRadius:10, background:"rgba(255,255,255,0.1)", border:"none", cursor:"pointer" }}>
                <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${C.orange},#ff9f6a)`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ico name="user" size={14} color={C.white}/>
                </div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ color:C.white, fontSize:12, fontWeight:700, lineHeight:1 }}>Admin User</div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10 }}>Super admin</div>
                </div>
                <span style={{ color:"rgba(255,255,255,0.5)", transform:userMenuOpen?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s" }}>
                  <Ico name="chevDown" size={14}/>
                </span>
              </button>

              {userMenuOpen && (
                <div style={{ position:"absolute", top:"calc(100%+8px)", right:0, marginTop:6, width:200,
                  background:C.white, borderRadius:12, border:`1px solid ${C.gray}`,
                  boxShadow:"0 12px 36px rgba(13,26,99,0.14)", overflow:"hidden", animation:"slideDown 0.15s ease", zIndex:400 }}>
                  <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.lightGray}` }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>Admin User</div>
                    <div style={{ fontSize:11, color:C.light }}>admin@edu.uz</div>
                    <div style={{ marginTop:6 }}>
                      <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10,
                        background:C.lightBlue, color:C.bright }}>Super Admin</span>
                    </div>
                  </div>
                  {[
                    { icon:"profile", label:"Profilim" },
                    { icon:"key",     label:"Parolni o'zgartirish" },
                    { icon:"settings",label:"Sozlamalar" },
                  ].map(item=>(
                    <button key={item.label}
                      style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                        border:"none", background:"transparent", cursor:"pointer", fontFamily:"inherit",
                        fontSize:13, color:C.mid, textAlign:"left", transition:"background 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <Ico name={item.icon} size={15} color={C.light}/>{item.label}
                    </button>
                  ))}
                  <div style={{ borderTop:`1px solid ${C.lightGray}` }}>
                    <button style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                      border:"none", background:"transparent", cursor:"pointer", fontFamily:"inherit",
                      fontSize:13, color:C.red, textAlign:"left", transition:"background 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background=C.redLight}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <Ico name="logout" size={15} color={C.red}/>Chiqish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── BODY ── */}
        <div style={{ display:"flex", minHeight:"calc(100vh - 60px)" }}>

          {/* ── SIDEBAR ── */}
          <aside style={{ width:sideOpen?220:0, background:C.white, borderRight:`1px solid ${C.gray}`,
            overflow:"hidden", transition:"width 0.25s ease", flexShrink:0,
            position:"sticky", top:60, height:"calc(100vh - 60px)", overflowY:"auto" }}>
            <nav style={{ padding:"16px 10px" }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.light, padding:"0 8px 8px",
                letterSpacing:"1px", textTransform:"uppercase" }}>Komponentlar</div>
              {navItems.map(item=>(
                <button key={item.id} onClick={()=>setTab(item.id)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                    borderRadius:10, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13,
                    fontWeight:tab===item.id?700:500, background:tab===item.id?`${C.bright}12`:"transparent",
                    color:tab===item.id?C.bright:C.mid, transition:"all 0.2s", marginBottom:3, textAlign:"left",
                    whiteSpace:"nowrap" }}>
                  <Ico name={item.icon} size={16} color={tab===item.id?C.bright:C.light}/>
                  {item.label}
                  {tab===item.id && <div style={{ marginLeft:"auto", width:4, height:4, borderRadius:"50%", background:C.bright }}/>}
                </button>
              ))}
            </nav>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main style={{ flex:1, padding:"28px 32px", maxWidth:900, animation:"fadeUp 0.3s ease" }}>

            {/* INPUT FIELDS */}
            {tab==="inputs" && (
              <div>
                <SectionTitle icon="forms" title="Input maydonlar" subtitle="Barcha asosiy input turlari namunasi"/>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
                  <Card style={{ gridColumn:"1/-1", marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Matn inputlari</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 20px" }}>
                      <TextInput label="Ism" placeholder="To'liq ismingizni kiriting" required icon="user"/>
                      <TextInput label="Email" type="email" placeholder="example@mail.com" icon="search"/>
                      <TextInput label="Telefon" placeholder="+998 90 123 45 67" prefix="+998"/>
                      <TextInput label="Veb-sayt" placeholder="https://example.com" suffix=".uz"/>
                      <TextInput label="Parol" type="password" placeholder="Parolni kiriting" required icon="key"/>
                      <TextInput label="Narx" type="number" placeholder="0" suffix="so'm" hint="Faqat raqam kiriting"/>
                    </div>
                  </Card>
                  <Card style={{ gridColumn:"1/-1", marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Textarea</div>
                    <TextArea label="Izoh / Tavsif" placeholder="Bu yerga matn kiriting..." required rows={4} hint="Maksimal 500 ta belgi"/>
                    <TextArea label="Qo'shimcha ma'lumot" placeholder="Ixtiyoriy maydon..." rows={3}/>
                  </Card>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Stepper</div>
                    <Stepper label="Talabalar soni" min={1} max={50} defaultVal={10} hint="1 dan 50 gacha"/>
                    <Stepper label="Kreditlar" min={0} max={30} step={0.5} defaultVal={3} suffix=" kr"/>
                  </Card>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Tags input</div>
                    <TagsInput label="Kalit so'zlar" hint="Enter yoki vergul bilan ajrating"/>
                    <StarRating label="Baho / Reyting" hint="Kursni baholang"/>
                    <ColorPicker label="Rang tanlash" hint="Fon rangi uchun"/>
                  </Card>
                  <Card style={{ gridColumn:"1/-1", marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Range Slider</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 20px" }}>
                      <RangeSlider label="Davomat foizi" min={0} max={100} defaultVal={75} suffix="%"/>
                      <RangeSlider label="Ball chegarasi" min={0} max={100} defaultVal={55} hint="O'tish bali"/>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* SELECT */}
            {tab==="selects" && (
              <div>
                <SectionTitle icon="chevDown" title="Select & Multiselect" subtitle="Qidiruv imkoniyatli tanlash komponentlari"/>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Oddiy Select</div>
                    <SearchSelect label="Fakultet" required placeholder="Fakultet tanlang..."
                      options={[
                        {value:"it",    label:"Axborot texnologiyalari"},
                        {value:"eco",   label:"Iqtisodiyot"},
                        {value:"law",   label:"Huquqshunoslik"},
                        {value:"math",  label:"Matematika"},
                        {value:"phys",  label:"Fizika"},
                        {value:"chem",  label:"Kimyo"},
                        {value:"bio",   label:"Biologiya"},
                        {value:"hist",  label:"Tarix"},
                      ]} hint="Qidiruv maydoni orqali tez topish mumkin"/>
                    <SearchSelect label="Kurs" placeholder="Kursni tanlang..."
                      options={[
                        {value:"1",label:"1-kurs"},{value:"2",label:"2-kurs"},
                        {value:"3",label:"3-kurs"},{value:"4",label:"4-kurs"},
                        {value:"m1",label:"Magistratura 1-kurs"},{value:"m2",label:"Magistratura 2-kurs"},
                      ]}/>
                    <SearchSelect label="O'quv yili" placeholder="Yilni tanlang..."
                      options={["2021-2022","2022-2023","2023-2024","2024-2025","2025-2026"].map(y=>({value:y,label:y}))}/>
                  </Card>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Multi Select</div>
                    <SearchSelect label="Fanlar (bir nechta)" multi placeholder="Fanlarni tanlang..."
                      options={[
                        {value:"math",  label:"Matematika I"},
                        {value:"prog",  label:"Dasturlash asoslari"},
                        {value:"db",    label:"Ma'lumotlar bazasi"},
                        {value:"net",   label:"Kompyuter tarmoqlari"},
                        {value:"algo",  label:"Algoritmlar"},
                        {value:"oop",   label:"OOP"},
                        {value:"web",   label:"Web dasturlash"},
                        {value:"ai",    label:"Sun'iy intellekt"},
                      ]} hint="Bir nechta fan tanlash mumkin"/>
                    <SearchSelect label="Rollar (bir nechta)" multi placeholder="Rollarni tanlang..."
                      options={[
                        {value:"admin", label:"Administrator"},
                        {value:"teach", label:"O'qituvchi"},
                        {value:"stud",  label:"Talaba"},
                        {value:"dean",  label:"Dekan"},
                        {value:"lib",   label:"Kutubxonachi"},
                      ]}/>
                  </Card>
                </div>
              </div>
            )}

            {/* RADIO & CHECKBOX */}
            {tab==="checks" && (
              <div>
                <SectionTitle icon="check" title="Radio & Checkbox & Toggle" subtitle="Tanlov elementlari to'liq namunasi"/>
                <Card style={{ marginBottom:20 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Radio tugmalar</div>
                  <RadioGroup label="Kurs turi" required options={[
                    {value:"full",label:"Kunduzgi"},{value:"eve",label:"Kechki"},{value:"ext",label:"Sirtqi"},
                  ]}/>
                  <RadioGroup label="Tolov turi" options={[
                    {value:"state",label:"Davlat granti"},{value:"contract",label:"Kontrakt"},{value:"grant",label:"Grant"},
                  ]}/>
                  <RadioGroup label="Jinsi" direction="col" options={[
                    {value:"m",label:"Erkak"},{value:"f",label:"Ayol"},{value:"o",label:"Ko'rsatmaslik"},
                  ]}/>
                </Card>
                <Card style={{ marginBottom:20 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Checkbox guruhlar</div>
                  <CheckboxGroup label="Ruxsatlar" options={[
                    {value:"read",label:"O'qish"},{value:"write",label:"Yozish"},
                    {value:"delete",label:"O'chirish"},{value:"admin",label:"Admin"},
                    {value:"export",label:"Eksport"},{value:"import",label:"Import"},
                  ]}/>
                  <CheckboxGroup label="Bildirishnoma kanallari" options={[
                    {value:"email",label:"Email"},{value:"sms",label:"SMS"},
                    {value:"push",label:"Push"},{value:"tg",label:"Telegram"},
                  ]}/>
                </Card>
                <Card>
                  <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Toggle / Switch</div>
                  <Toggle label="Email bildirishnomalari" description="Yangiliklar va xabarlarni email orqali olish" defaultOn={true}/>
                  <Toggle label="Ikki faktorli autentifikatsiya" description="Xavfsizlikni oshirish uchun 2FA yoqish"/>
                  <Toggle label="Qorong'i rejim" description="Interfeys ranglari o'zgaradi" defaultOn={false}/>
                  <Toggle label="Avtomatik saqlash" description="Har 30 sekundda saqlaydi" defaultOn={true}/>
                </Card>
              </div>
            )}

            {/* DATE TIME */}
            {tab==="datetime" && (
              <div>
                <SectionTitle icon="calendar" title="Sana & Vaqt inputlari" subtitle="Barcha vaqt va sana turlari"/>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Asosiy turlar</div>
                    <DateTimePicker label="Sana" type="date" required hint="Kun/Oy/Yil formatida"/>
                    <DateTimePicker label="Vaqt" type="time" hint="Soat:daqiqa formatida"/>
                    <DateTimePicker label="Sana va vaqt" type="datetime-local" hint="To'liq timestamp"/>
                    <DateTimePicker label="Oy tanlash" type="month"/>
                    <DateTimePicker label="Hafta tanlash" type="week"/>
                  </Card>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Foydalanish namunalari</div>
                    <DateTimePicker label="Tug'ilgan sana" type="date" required hint="Pasport ma'lumotlariga ko'ra"/>
                    <DateTimePicker label="Qabul qilingan sana" type="date"/>
                    <DateTimePicker label="Imtihon boshlanishi" type="datetime-local" required/>
                    <DateTimePicker label="Imtihon tugashi" type="datetime-local" required hint="Boshlanish vaqtidan keyin bo'lishi kerak"/>
                  </Card>
                </div>
              </div>
            )}

            {/* CALENDAR */}
            {tab==="calendar" && (
              <div>
                <SectionTitle icon="calendar" title="Interaktiv Kalendar" subtitle="Bitta sana yoki diapazon tanlash"/>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                  <div>
                    <MiniCalendar label="Sana tanlash (bitta yoki diapazon)"/>
                  </div>
                  <Card>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Foydalanish ko'rsatmasi</div>
                    {[
                      { t:"Bitta sana", d:"Yuqorida 'Bitta sana' rejimini tanlang va ixtiyoriy kunni bosing" },
                      { t:"Diapazon", d:"'Diapazon' rejimini tanlab, boshlanish va tugash sanasini belgilang" },
                      { t:"Oy almashtirish", d:"< > tugmalari orqali oylar orasida harakatlaning" },
                      { t:"Bugun", d:"Bugungi sana rangli chegara bilan ajratib ko'rsatiladi" },
                    ].map((item,i)=>(
                      <div key={i} style={{ display:"flex", gap:10, marginBottom:14 }}>
                        <div style={{ width:24, height:24, borderRadius:6, background:C.lightBlue,
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <span style={{ fontSize:11, fontWeight:700, color:C.bright }}>{i+1}</span>
                        </div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{item.t}</div>
                          <div style={{ fontSize:12, color:C.light, lineHeight:1.5 }}>{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            )}

            {/* FILE UPLOAD */}
            {tab==="files" && (
              <div>
                <SectionTitle icon="upload" title="Fayl yuklash" subtitle="Drag & drop va oddiy yuklash namunalari"/>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Rasm yuklash</div>
                    <FileUpload label="Profil rasmi" accept="image/*" hint="PNG, JPG, WebP (max 5MB)"/>
                    <FileUpload label="Banner rasmi" accept="image/*" hint="1920×400px tavsiya etiladi"/>
                  </Card>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Hujjat yuklash</div>
                    <FileUpload label="Diplom / Sertifikat" accept=".pdf,.doc,.docx" hint="PDF yoki Word hujjat"/>
                    <FileUpload label="Ko'p fayl yuklash" accept="*" multiple hint="Bir vaqtda bir nechta fayl tanlash mumkin"/>
                  </Card>
                </div>
              </div>
            )}

            {/* MISC */}
            {tab==="misc" && (
              <div>
                <SectionTitle icon="settings" title="Qo'shimcha komponentlar" subtitle="Toast, Progress, Badge va boshqalar"/>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Toast / Bildirishnomalar</div>
                    <Toast type="success" message="Talaba ma'lumotlari muvaffaqiyatli saqlandi!"/>
                    <Toast type="error" message="Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."/>
                    <Toast type="warning" message="Sessiya yakunlanmoqda. Saqlashni unutmang!"/>
                    <Toast type="info" message="Tizim yangilanishi 30 daqiqadan so'ng bo'ladi."/>
                  </Card>
                  <Card style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Progress bar</div>
                    <ProgressBar label="Kurs o'zlashtirilishi" value={78} color={C.bright}/>
                    <ProgressBar label="Davomat" value={94} color={C.green}/>
                    <ProgressBar label="Topshiriqlar" value={60} color={C.orange}/>
                    <ProgressBar label="Yakuniy baho" value={45} color={C.red}/>
                  </Card>
                  <Card style={{ gridColumn:"1/-1", marginBottom:20 }}>
                    <BadgeDemo/>
                    <div style={{ fontSize:13, fontWeight:700, color:C.mid, marginBottom:16, textTransform:"uppercase", letterSpacing:"1px" }}>Tugma turlari</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                      {[
                        { label:"Saqlash",   bg:`linear-gradient(135deg,${C.bright},${C.blue})`, color:C.white, shadow:`0 4px 14px ${C.bright}40` },
                        { label:"Tahrirlash",bg:C.lightBlue, color:C.bright, shadow:"none", border:`1px solid ${C.bright}30` },
                        { label:"O'chirish", bg:C.redLight,  color:C.red, shadow:"none",   border:`1px solid ${C.red}20` },
                        { label:"Bekor qilish",bg:C.lightGray,color:C.mid, shadow:"none",  border:`1px solid ${C.gray}` },
                        { label:"Yuklab olish",bg:C.greenLight,color:C.green,shadow:"none",border:`1px solid ${C.green}20` },
                        { label:"Yuborish",  bg:`linear-gradient(135deg,${C.orange},#ff9f6a)`,color:C.white,shadow:`0 4px 14px ${C.orange}40` },
                      ].map(b=>(
                        <button key={b.label}
                          style={{ padding:"9px 20px", borderRadius:10, border:b.border||"none", cursor:"pointer",
                            fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700,
                            background:b.bg, color:b.color, boxShadow:b.shadow||"none", transition:"all 0.2s" }}
                          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.opacity="0.9"; }}
                          onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.opacity="1"; }}>
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}
