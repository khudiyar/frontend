import { useState, useCallback } from "react";

/* ─── TOKENS ─── */
const C = {
  navy:"#0D1A63", blue:"#1E3A9E", bright:"#2845D6", lightBlue:"#EEF2FF",
  orange:"#F68048", orangeLight:"#FFF4ED",
  green:"#16A34A", greenLight:"#F0FDF4",
  red:"#DC2626",   redLight:"#FEF2F2",
  yellow:"#D97706", yellowLight:"#FFFBEB",
  purple:"#7C3AED", purpleLight:"#F5F3FF",
  teal:"#0D9488",   tealLight:"#F0FDFA",
  pink:"#DB2777",   pinkLight:"#FDF2F8",
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
  button,input,select{font-family:'DM Sans',sans-serif}
  input:focus,select:focus{outline:none}
  select{appearance:none;-webkit-appearance:none}
`;

/* ─── ICONS ─── */
const Ico = ({ d, size=16, color="currentColor", sw=2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const I = {
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  door:    "M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M9 22V12h6v10",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  minus:   "M5 12h14",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  chevD:   "M6 9l6 6 6-6",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  save:    "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  merge:   "M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3",
  split:   "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
  info:    "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z",
  warn:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  calendar:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
};

/* ─── DATA ─── */
const DAYS = [
  { id:"du", label:"Dushanba" }, { id:"se", label:"Seshanba" },
  { id:"ch", label:"Chorshanba" }, { id:"pa", label:"Payshanba" },
  { id:"ju", label:"Juma" }, { id:"sh", label:"Shanba" },
];
const PAIRS = [
  { id:"1", label:"I",   time:"08:00–09:30" },
  { id:"2", label:"II",  time:"09:45–11:15" },
  { id:"3", label:"III", time:"11:30–13:00" },
  { id:"4", label:"IV",  time:"14:00–15:30" },
];
const GROUPS = [
  { id:"g1", label:"301/25 KI (qq)",   count:24 },
  { id:"g2", label:"301/1-25 KI",      count:22 },
  { id:"g3", label:"304/25 DI qq",     count:28 },
  { id:"g4", label:"304/1-25 DI qq",   count:27 },
  { id:"g5", label:"314/25 ATT",       count:20 },
  { id:"g6", label:"101/25 KI (siob)", count:25 },
];
const SUBJECTS = [
  { id:1,  name:"Kompyuter injiniringi",    code:"KI1306"   },
  { id:2,  name:"Dasturlash asoslari",      code:"DA1406"   },
  { id:3,  name:"Matematika",               code:"MAT101"   },
  { id:4,  name:"Fizika",                   code:"FIZ201"   },
  { id:5,  name:"Ma'lumotlar tuzilmasi",    code:"MDT1106"  },
  { id:6,  name:"Algoritmlar nazariyasi",   code:"ALG1206"  },
  { id:7,  name:"Tarmoq texnologiyalari",   code:"KOT1306"  },
  { id:8,  name:"Dasturiy ta'minot sinovi", code:"SOTE18"   },
  { id:9,  name:"Web dasturlash",           code:"WEB1406"  },
  { id:10, name:"Ma'lumotlar bazasi",       code:"MDB1506"  },
  { id:11, name:"Ingliz tili",              code:"ING101"   },
  { id:12, name:"Filosofiya",               code:"FLS201"   },
  { id:13, name:"Intellektual tizimlari",   code:"SPEE16"   },
  { id:14, name:"ESAPLAW II",               code:"ESAP16"   },
  { id:15, name:"Kompyuter tarmoqlari",     code:"CMNT16"   },
];
const TYPES = [
  { id:"M", label:"Ma'ruza",      short:"Ma'r",  color:C.bright,  bg:C.lightBlue,   canMerge:true,  canSplit:false },
  { id:"A", label:"Amaliy",       short:"Aml",   color:C.green,   bg:C.greenLight,  canMerge:false, canSplit:true  },
  { id:"L", label:"Laboratoriya", short:"Lab",   color:C.orange,  bg:C.orangeLight, canMerge:false, canSplit:true  },
  { id:"S", label:"Seminar",      short:"Sem",   color:C.purple,  bg:C.purpleLight, canMerge:false, canSplit:true  },
  { id:"W", label:"Workshop",     short:"Work",  color:C.teal,    bg:C.tealLight,   canMerge:false, canSplit:true  },
];
const ROOMS = ["101","102","103","104","105","201","202","203","204","301","302","303","Lab-1","Lab-2","Lab-3","Lab-4","Aula","Konf-zal"];
const TEACHERS = [
  { id:1,  name:"KENJAYEV X. B."      }, { id:2,  name:"YADGAROV SH. A."     },
  { id:3,  name:"ARTIKBAYEV M. A."    }, { id:4,  name:"BABAJANOVA T. M."    },
  { id:5,  name:"PRIMBETOV A. M."     }, { id:6,  name:"MAMUTOVA A. K."      },
  { id:7,  name:"DJIYEMURATOVA Z. K." }, { id:8,  name:"SHAGÍMBAEV D. M."    },
  { id:9,  name:"PIRIMBETOV A. O."    }, { id:10, name:"DJAYKOV G. M."       },
  { id:11, name:"ABDULLAYEV S. B."    }, { id:12, name:"KALMURATOV B. K."    },
];

/* ─── HELPERS ─── */
const cellKey  = (day, pair, grp) => `${day}_${pair}_${grp}`;
const typeOf   = id => TYPES.find(t => t.id === id);
const avColors = [C.bright, C.purple, C.green, C.teal, C.orange, C.red, C.pink, C.navy];
const avColor  = i => avColors[i % avColors.length];
const ordinal  = n => `${n}-kichik guruh`;

/* default subgroups for a group */
const makeSubgroups = (n) =>
  Array.from({ length: n }, (_, i) => ({ id: String(i+1), teacher:"", room:"" }));

/* ─── SELECT ─── */
const Sel = ({ value, onChange, children, icon, small }) => (
  <div style={{ position:"relative" }}>
    {icon && (
      <div style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }}>
        <Ico d={icon} size={12} color={value ? C.bright : C.light}/>
      </div>
    )}
    <select value={value} onChange={onChange}
      style={{
        width:"100%",
        padding: small ? `6px 24px 6px ${icon?28:8}px` : `9px 28px 9px ${icon?32:12}px`,
        borderRadius:9, border:`1.5px solid ${value?C.bright+"55":C.gray}`,
        fontSize: small ? 12 : 13, color:value?C.dark:C.light,
        background:value?C.lightBlue:C.white,
        cursor:"pointer", transition:"all 0.15s",
      }}
      onFocus={e=>{ e.target.style.borderColor=C.bright; e.target.style.boxShadow=`0 0 0 3px ${C.bright}20`; }}
      onBlur={e=>{  e.target.style.borderColor=value?C.bright+"55":C.gray; e.target.style.boxShadow="none"; }}>
      {children}
    </select>
    <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
      <Ico d={I.chevD} size={12} color={C.light}/>
    </div>
  </div>
);

/* ─── STAT CARD ─── */
const StatCard = ({ icon, label, value, color, bg, delay=0 }) => (
  <div style={{ background:C.white, borderRadius:14, padding:"14px 16px", border:`1px solid ${C.gray}`, display:"flex", alignItems:"center", gap:12, animation:`fadeUp 0.3s ${delay}ms ease both` }}>
    <div style={{ width:42, height:42, borderRadius:12, background:bg, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Ico d={icon} size={18} color={color}/>
    </div>
    <div>
      <div style={{ fontSize:22, fontWeight:800, color:C.dark, fontFamily:"'Syne',sans-serif", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:11, color:C.light, fontWeight:500, marginTop:3 }}>{label}</div>
    </div>
  </div>
);

/* ════════════════════════ MODAL ════════════════════════ */
const Modal = ({ slot, form, setForm, schedule, onSave, onClear, onClose }) => {
  if (!slot) return null;

  const dayObj   = DAYS.find(d => d.id === slot.day);
  const pairObj  = PAIRS.find(p => p.id === slot.pair);
  const grpObj   = GROUPS.find(g => g.id === slot.group);
  const k        = cellKey(slot.day, slot.pair, slot.group);
  const hasData  = !!schedule[k];
  const selType  = typeOf(form.type);
  const isMaruza = form.type === "M";
  const canSplit = selType?.canSplit;

  /* merged groups list */
  const merged = form.mergedGroups?.length ? form.mergedGroups : [slot.group];

  /* subgroups */
  const subgroups   = form.subgroups || [];
  const isSplitting = canSplit && subgroups.length > 1;

  /* occupied check */
  const occupiedByOther = GROUPS
    .filter(g => g.id !== slot.group)
    .filter(g => {
      const ex = schedule[cellKey(slot.day, slot.pair, g.id)];
      if (!ex) return false;
      if (ex.isSlave && ex.masterKey === k) return false;
      return true;
    })
    .map(g => g.id);

  const toggleGroup = gid => {
    if (gid === slot.group) return;
    setForm(f => {
      const cur = f.mergedGroups || [slot.group];
      return { ...f, mergedGroups: cur.includes(gid) ? cur.filter(id=>id!==gid) : [...cur,gid] };
    });
  };

  const setSplitCount = n => {
    setForm(f => {
      if (n <= 1) return { ...f, subgroups: [] };
      const cur = f.subgroups || [];
      const next = Array.from({ length: n }, (_, i) => cur[i] || { id:String(i+1), teacher:"", room:"" });
      return { ...f, subgroups: next };
    });
  };

  const updateSubgroup = (idx, field, val) => {
    setForm(f => {
      const sgs = [...(f.subgroups||[])];
      sgs[idx] = { ...sgs[idx], [field]: val };
      return { ...f, subgroups: sgs };
    });
  };

  const totalStudents = grpObj?.count || 0;
  const splitCount    = subgroups.length > 1 ? subgroups.length : 1;
  const perGroup      = Math.ceil(totalStudents / splitCount);

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(13,26,99,0.42)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, animation:"fadeIn 0.18s ease" }}>
      <div style={{ background:C.white, borderRadius:20, width:"min(500px,95vw)", boxShadow:"0 28px 64px rgba(13,26,99,0.22)", animation:"fadeUp 0.22s ease", overflow:"hidden", maxHeight:"92vh", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"18px 22px 20px", flexShrink:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:6 }}>Dars uyasi tahrirlash</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.white, background:"rgba(255,255,255,0.15)", padding:"4px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)" }}>{dayObj?.label}</span>
                <span style={{ color:"rgba(255,255,255,0.35)" }}>·</span>
                <span style={{ fontSize:13, fontWeight:700, color:C.white, background:"rgba(255,255,255,0.15)", padding:"4px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)" }}>{pairObj?.label} juft · {pairObj?.time}</span>
              </div>
              <div style={{ marginTop:7, fontSize:11, color:"rgba(255,255,255,0.55)" }}>
                Guruh: <b style={{ color:C.white }}>{grpObj?.label}</b>
                {grpObj && <span style={{ marginLeft:6, opacity:0.6 }}>({grpObj.count} talaba)</span>}
              </div>
            </div>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:9, border:"none", cursor:"pointer", background:"rgba(255,255,255,0.12)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ico d={I.x} size={15} color={C.white}/>
            </button>
          </div>
        </div>

        {/* Type strip */}
        {form.type && (
          <div style={{ padding:"8px 22px", background:selType?.bg, borderBottom:`1px solid ${selType?.color}22`, display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:selType?.color }}/>
            <span style={{ fontSize:12, fontWeight:700, color:selType?.color }}>{selType?.label} darsi</span>
            {isMaruza && merged.length > 1 && (
              <span style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:selType?.color, background:`${selType?.color}18`, padding:"2px 10px", borderRadius:20, display:"flex", alignItems:"center", gap:5 }}>
                <Ico d={I.merge} size={11} color={selType?.color}/> {merged.length} guruh birlashtirildi
              </span>
            )}
            {isSplitting && (
              <span style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:selType?.color, background:`${selType?.color}18`, padding:"2px 10px", borderRadius:20, display:"flex", alignItems:"center", gap:5 }}>
                <Ico d={I.split} size={11} color={selType?.color}/> {splitCount} kichik guruh
              </span>
            )}
          </div>
        )}

        {/* Scrollable body */}
        <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>

          {/* Fan nomi */}
          <div>
            <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>Fan nomi</label>
            <Sel value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} icon={I.book}>
              <option value="">— Fanni tanlang —</option>
              {SUBJECTS.map(s=><option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
            </Sel>
          </div>

          {/* Fan turi */}
          <div>
            <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>Fan turi</label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
              {TYPES.map(t=>(
                <button key={t.id}
                  onClick={()=>setForm(f=>({
                    ...f, type:f.type===t.id?"":t.id,
                    mergedGroups: t.id!=="M" ? [slot.group] : (f.mergedGroups?.length?f.mergedGroups:[slot.group]),
                    subgroups: t.canSplit ? (f.subgroups||[]) : [],
                  }))}
                  style={{
                    padding:"8px 4px", borderRadius:10, cursor:"pointer", fontFamily:"inherit",
                    fontSize:11, fontWeight:700, transition:"all 0.15s",
                    border:`1.5px solid ${form.type===t.id?t.color:C.gray}`,
                    background:form.type===t.id?t.bg:C.white,
                    color:form.type===t.id?t.color:C.mid,
                    boxShadow:form.type===t.id?`0 2px 8px ${t.color}30`:"none",
                    position:"relative",
                  }}>
                  {t.short}
                  {t.canMerge && <div title="Birlashtirilishi mumkin" style={{ position:"absolute", top:3, right:3, width:5, height:5, borderRadius:"50%", background:t.color, opacity:0.7 }}/>}
                  {t.canSplit && <div title="Bo'linishi mumkin" style={{ position:"absolute", top:3, left:3, width:5, height:5, borderRadius:"50%", background:t.color, opacity:0.7 }}/>}
                </button>
              ))}
            </div>
            <div style={{ marginTop:5, fontSize:10, color:C.light, display:"flex", gap:12 }}>
              <span><span style={{ display:"inline-block", width:5, height:5, borderRadius:"50%", background:C.bright, verticalAlign:"middle", marginRight:4 }}/>Birlashtirilishi mumkin</span>
              <span><span style={{ display:"inline-block", width:5, height:5, borderRadius:"50%", background:C.green, verticalAlign:"middle", marginRight:4 }}/>Kichik guruhlarga bo'linishi mumkin</span>
            </div>
          </div>

          {/* ─── MARUZA: MERGE SECTION ─── */}
          {isMaruza && (
            <div style={{ borderRadius:12, border:`1.5px solid ${C.bright}35`, background:`${C.bright}04`, overflow:"hidden" }}>
              <div style={{ padding:"10px 14px", background:`${C.bright}0d`, borderBottom:`1px solid ${C.bright}20`, display:"flex", alignItems:"center", gap:8 }}>
                <Ico d={I.merge} size={14} color={C.bright}/>
                <span style={{ fontSize:12, fontWeight:700, color:C.bright }}>Birgalikda qatnashadigan guruhlar</span>
                <span style={{ marginLeft:"auto", fontSize:10, color:C.light }}>{merged.length}/{GROUPS.length} guruh</span>
              </div>
              {/* Scrollable list — 5 ta ko'rinadi, ortasi scroll */}
              <div style={{ maxHeight:240, overflowY:"auto", padding:"8px 12px", display:"flex", flexDirection:"column", gap:5 }}>
                {GROUPS.map(g => {
                  const isCurrent  = g.id === slot.group;
                  const isSelected = merged.includes(g.id);
                  const isOccupied = occupiedByOther.includes(g.id);
                  const disabled   = isCurrent || isOccupied;
                  return (
                    <div key={g.id} onClick={()=>!disabled&&toggleGroup(g.id)}
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:9, cursor:disabled?"default":"pointer", border:`1.5px solid ${isSelected?C.bright+"55":C.gray}`, background:isSelected?`${C.bright}09`:isOccupied?C.lightGray:C.white, opacity:isOccupied&&!isSelected?0.5:1, transition:"all 0.15s", userSelect:"none", flexShrink:0 }}>
                      <div style={{ width:18, height:18, borderRadius:5, flexShrink:0, border:`2px solid ${isSelected?C.bright:isOccupied?C.light:C.gray}`, background:isSelected?C.bright:C.white, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
                        {isSelected && <Ico d={I.check} size={11} color={C.white} sw={2.5}/>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:isOccupied&&!isSelected?C.light:C.dark, display:"flex", alignItems:"center", gap:6 }}>
                          {g.label}
                          {isCurrent && <span style={{ fontSize:9, padding:"1px 7px", borderRadius:20, background:C.lightBlue, color:C.bright, fontWeight:700 }}>asosiy</span>}
                        </div>
                        <div style={{ fontSize:10, color:C.light, marginTop:1 }}>{g.count} talaba</div>
                      </div>
                      {isOccupied&&!isSelected && <div style={{ display:"flex", alignItems:"center", gap:3 }}><Ico d={I.warn} size={12} color={C.yellow}/><span style={{ fontSize:10, color:C.yellow, fontWeight:600 }}>band</span></div>}
                      {isSelected&&!isCurrent  && <span style={{ fontSize:9, padding:"2px 8px", borderRadius:20, background:`${C.bright}15`, color:C.bright, fontWeight:700 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
              {/* Sticky summary — always visible below the list */}
              <div style={{ padding:"8px 14px 10px", borderTop:`1px solid ${C.bright}20`, background:`${C.bright}06`, display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                <span style={{ fontSize:10, color:C.light, fontWeight:600, flexShrink:0 }}>
                  Tanlandi: <b style={{ color:C.bright }}>{merged.length}</b> guruh
                </span>
                {merged.length > 1 && (
                  <>
                    <span style={{ color:C.gray, fontSize:12 }}>·</span>
                    {merged.map(gid => {
                      const g = GROUPS.find(x => x.id===gid);
                      return (
                        <span key={gid} style={{ fontSize:10, padding:"2px 9px", borderRadius:20, background:`${C.bright}15`, color:C.bright, fontWeight:700, display:"flex", alignItems:"center", gap:4 }}>
                          {g?.label}
                        </span>
                      );
                    })}
                    <span style={{ marginLeft:"auto", fontSize:10, color:C.light, fontWeight:600, flexShrink:0 }}>
                      Jami: <b style={{ color:C.dark }}>{merged.reduce((s,gid)=>s+(GROUPS.find(g=>g.id===gid)?.count||0),0)}</b> talaba
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── NON-MARUZA: SINGLE TEACHER (no split) ─── */}
          {!isMaruza && form.type && !isSplitting && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>Xona</label>
                <Sel value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} icon={I.door}>
                  <option value="">— Xona —</option>
                  {ROOMS.map(r=><option key={r} value={r}>Xona {r}</option>)}
                </Sel>
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>O'qituvchi</label>
                <Sel value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} icon={I.user}>
                  <option value="">— O'qituvchi —</option>
                  {TEACHERS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                </Sel>
              </div>
            </div>
          )}

          {/* ─── MARUZA: SINGLE TEACHER ─── */}
          {isMaruza && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>Xona</label>
                <Sel value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} icon={I.door}>
                  <option value="">— Xona —</option>
                  {ROOMS.map(r=><option key={r} value={r}>Xona {r}</option>)}
                </Sel>
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>O'qituvchi</label>
                <Sel value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} icon={I.user}>
                  <option value="">— O'qituvchi —</option>
                  {TEACHERS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                </Sel>
              </div>
            </div>
          )}

          {/* ─── SPLIT SECTION — only for canSplit types ─── */}
          {canSplit && form.type && (
            <div style={{ borderRadius:12, border:`1.5px solid ${selType?.color}35`, background:`${selType?.color}04`, overflow:"hidden" }}>
              {/* Section header */}
              <div style={{ padding:"10px 14px", background:`${selType?.color}0d`, borderBottom:`1px solid ${selType?.color}20`, display:"flex", alignItems:"center", gap:8 }}>
                <Ico d={I.split} size={14} color={selType?.color}/>
                <span style={{ fontSize:12, fontWeight:700, color:selType?.color }}>Kichik guruhlarga bo'lish</span>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:10, color:C.light }}>Bo'linish soni:</span>
                  {/* Count buttons */}
                  {[1,2,3,4].map(n=>(
                    <button key={n} onClick={()=>setSplitCount(n)}
                      style={{
                        width:26, height:26, borderRadius:7, border:`1.5px solid ${(isSplitting?splitCount:1)===n ? selType?.color : C.gray}`,
                        cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:700, transition:"all 0.15s",
                        background:(isSplitting?splitCount:1)===n ? selType?.bg : C.white,
                        color:(isSplitting?splitCount:1)===n ? selType?.color : C.mid,
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subgroup rows */}
              {isSplitting && (
                <div style={{ padding:"10px 12px", display:"flex", flexDirection:"column", gap:8 }}>
                  {subgroups.map((sg, idx) => (
                    <div key={sg.id} style={{ background:C.white, borderRadius:10, border:`1px solid ${selType?.color}25`, overflow:"hidden" }}>
                      {/* Subgroup header */}
                      <div style={{ padding:"6px 12px", background:`${selType?.color}0d`, display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:22, height:22, borderRadius:6, background:`${selType?.color}20`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:11, fontWeight:800, color:selType?.color }}>{idx+1}</span>
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:selType?.color }}>{ordinal(idx+1)}</span>
                        <span style={{ marginLeft:"auto", fontSize:10, color:C.light }}>
                          ~{Math.ceil(totalStudents/splitCount)} talaba
                        </span>
                      </div>
                      {/* Subgroup selects */}
                      <div style={{ padding:"8px 12px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        <div>
                          <div style={{ fontSize:10, color:C.light, fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.6px" }}>O'qituvchi</div>
                          <Sel small value={sg.teacher} onChange={e=>updateSubgroup(idx,"teacher",e.target.value)} icon={I.user}>
                            <option value="">— tanlang —</option>
                            {TEACHERS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                          </Sel>
                        </div>
                        <div>
                          <div style={{ fontSize:10, color:C.light, fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.6px" }}>Xona</div>
                          <Sel small value={sg.room} onChange={e=>updateSubgroup(idx,"room",e.target.value)} icon={I.door}>
                            <option value="">— tanlang —</option>
                            {ROOMS.map(r=><option key={r} value={r}>{r}</option>)}
                          </Sel>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No split hint */}
              {!isSplitting && (
                <div style={{ padding:"10px 14px", fontSize:11, color:C.light }}>
                  1 ta guruh — bo'linish yo'q. Yuqoridagi tugmalar orqali kichik guruhlarga bo'ling.
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {(form.subject||form.type) && (
            <div style={{ padding:"10px 14px", borderRadius:10, background:C.lightGray, border:`1px dashed ${C.gray}` }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.light, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:5 }}>Ko'rinish</div>
              {form.subject && <div style={{ fontSize:12, fontWeight:700, color:C.dark, marginBottom:5 }}>{SUBJECTS.find(s=>String(s.id)===String(form.subject))?.name}</div>}
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                {form.type && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, fontWeight:700, background:selType?.bg, color:selType?.color }}>{selType?.label}</span>}
                {!isSplitting && form.room && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:C.gray, color:C.mid, fontWeight:600 }}>Xona {form.room}</span>}
                {!isSplitting && form.teacher && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:C.gray, color:C.mid, fontWeight:600 }}>{TEACHERS.find(t=>String(t.id)===String(form.teacher))?.name}</span>}
                {isMaruza && merged.length > 1 && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:`${C.bright}15`, color:C.bright, fontWeight:700, display:"flex", alignItems:"center", gap:4 }}><Ico d={I.merge} size={10} color={C.bright}/>{merged.length} guruh</span>}
                {isSplitting && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:`${selType?.color}15`, color:selType?.color, fontWeight:700, display:"flex", alignItems:"center", gap:4 }}><Ico d={I.split} size={10} color={selType?.color}/>{splitCount} kichik guruh</span>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"4px 22px 20px", display:"flex", gap:8, flexShrink:0 }}>
          <button onClick={onSave} style={{ flex:1, padding:"10px 0", borderRadius:11, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:700, background:`linear-gradient(135deg,${C.bright},${C.blue})`, color:C.white, display:"flex", alignItems:"center", justifyContent:"center", gap:7, boxShadow:`0 4px 14px ${C.bright}40` }}>
            <Ico d={I.save} size={14} color={C.white}/> Saqlash
          </button>
          {hasData && (
            <button onClick={onClear} style={{ padding:"10px 16px", borderRadius:11, border:`1.5px solid ${C.red}30`, cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:700, background:C.redLight, color:C.red, display:"flex", alignItems:"center", gap:6 }}>
              <Ico d={I.trash} size={13} color={C.red}/> Tozala
            </button>
          )}
          <button onClick={onClose} style={{ padding:"10px 16px", borderRadius:11, border:`1.5px solid ${C.gray}`, cursor:"pointer", fontFamily:"inherit", fontSize:13, background:C.white, color:C.mid }}>Bekor</button>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════ CELL ════════════════════════ */
const Cell = ({ data, colSpan, mergedLabels, isMergeStart, isMergeEnd, onClick }) => {
  const [hover, setHover] = useState(false);
  if (!data || data.isSlave) return null;

  const t         = typeOf(data.type);
  const subj      = SUBJECTS.find(s => String(s.id)===String(data.subject));
  const tch       = TEACHERS.find(tc => String(tc.id)===String(data.teacher));
  const isMerged  = (colSpan||1) > 1;
  const isSplit   = data.subgroups?.length > 1;
  const isEmpty   = !data.subject && !data.type && !data.room && !data.teacher;

  /* ── Empty placeholder ── */
  if (isEmpty) {
    return (
      <td colSpan={colSpan||1} onClick={onClick}
        onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
        style={{ border:`1px solid ${C.gray}`, padding:4, minWidth:110, minHeight:70, verticalAlign:"top", cursor:"pointer", transition:"background 0.15s", background:hover?C.lightGray:C.white }}>
        <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:4, opacity:hover?0.65:0.22 }}>
          <div style={{ width:22, height:22, borderRadius:6, background:C.gray, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Ico d={I.plus} size={11} color={C.mid}/>
          </div>
          <span style={{ fontSize:9, color:C.light, fontWeight:600 }}>qo'shish</span>
        </div>
      </td>
    );
  }

  /* ── Filled cell ── */
  /* Merge border style — thick colored border on top + sides of the merged group */
  const mergeTopBorder   = isMerged ? `3px solid ${t?.color}` : `1px solid ${t?.color+"45"||C.gray}`;
  const mergeBorderLeft  = isMerged && isMergeStart ? `3px solid ${t?.color}` : `3px solid ${t?.color}`;
  const mergeBorderRight = isMerged && isMergeEnd   ? `2px solid ${t?.color}` : isMerged ? `2px solid ${t?.color}` : `1px solid ${t?.color+"45"||C.gray}`;

  return (
    <td colSpan={colSpan||1} onClick={onClick}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        padding:0, minWidth:110, minHeight:70, verticalAlign:"top",
        cursor:"pointer", transition:"background 0.15s",
        background: hover ? t?.bg : `${t?.bg}99`,
        borderTop:    mergeTopBorder,
        borderBottom: `1px solid ${t?.color+"35"||C.gray}`,
        borderLeft:   mergeBorderLeft,
        borderRight:  mergeBorderRight,
        position:"relative",
      }}>

      {/* Merge top accent bar */}
      {isMerged && (
        <div style={{ height:3, background:`linear-gradient(90deg,${t?.color},${t?.color}66)` }}/>
      )}

      {/* ── CELL BODY: left (fan+teacher) | right (xona) ── */}
      <div style={{ display:"flex", minHeight:isSplit ? "auto" : 65 }}>

        {/* LEFT — fan nomi (fan turi) + teacher(s) */}
        <div style={{ flex:1, padding:"5px 6px", display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Fan nomi (fan turi) */}
          <div style={{ fontSize:10, fontWeight:700, color:C.dark, lineHeight:1.3, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
            {subj?.name || "—"}
            {t && <span style={{ fontWeight:400, color:t.color }}> ({t.short})</span>}
          </div>

          {/* Teacher(s) — pushed to bottom */}
          <div style={{ marginTop:"auto", paddingTop:2 }}>
            {!isSplit && tch && (
              <div style={{ fontSize:9, color:C.mid, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {tch.name}
              </div>
            )}
            {isSplit && (
              <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                {data.subgroups.map((sg, i) => {
                  const sgTch = TEACHERS.find(tc => String(tc.id)===String(sg.teacher));
                  return (
                    <div key={i} style={{ fontSize:9, color:C.mid, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {sgTch ? sgTch.name : <span style={{ color:C.light }}>—</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — xona (always shown if present) */}
        {(data.room || isSplit) && (
          <div style={{
            padding:"5px 6px 5px 6px",
            borderLeft:`1px solid ${t?.color+"30"||C.gray}`,
            display:"flex", flexDirection:"column",
            alignItems:"flex-end", justifyContent:"flex-start",
            gap:2, flexShrink:0, minWidth:36,
          }}>
            {/* Single room */}
            {!isSplit && data.room && (
              <span style={{ fontSize:9, fontWeight:600, color:C.mid, whiteSpace:"nowrap" }}>
                {data.room}
              </span>
            )}
            {/* Split rooms — one per subgroup, aligned to each teacher row */}
            {isSplit && data.subgroups.map((sg, i) => (
              <span key={i} style={{ fontSize:9, fontWeight:600, color:C.mid, whiteSpace:"nowrap" }}>
                {sg.room || "—"}
              </span>
            ))}
          </div>
        )}
      </div>
    </td>
  );
};

/* ════════════════════════ MAIN PAGE ════════════════════════ */
export default function TimetablePage() {
  const [schedule,    setSchedule]    = useState({});
  const [slot,        setSlot]        = useState(null);
  const [form,        setForm]        = useState({ subject:"", type:"", room:"", teacher:"", mergedGroups:[], subgroups:[] });
  const [toast,       setToast]       = useState(null);
  const [filterDay,   setFilterDay]   = useState("all");
  const [filterGroup, setFilterGroup] = useState("all");

  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),2800); };

  /* ── Open ── */
  const openSlot = (day, pair, group) => {
    const k  = cellKey(day, pair, group);
    const ex = schedule[k];
    if (ex?.isSlave) {
      const [mDay,mPair,mGroup] = ex.masterKey.split("_");
      const m = schedule[ex.masterKey]||{};
      setForm({ subject:m.subject||"", type:m.type||"", room:m.room||"", teacher:m.teacher||"", mergedGroups:m.mergedGroups||[mGroup], subgroups:m.subgroups||[] });
      setSlot({ day:mDay, pair:mPair, group:mGroup });
      return;
    }
    setForm({ subject:ex?.subject||"", type:ex?.type||"", room:ex?.room||"", teacher:ex?.teacher||"", mergedGroups:ex?.mergedGroups||[group], subgroups:ex?.subgroups||[] });
    setSlot({ day, pair, group });
  };

  /* ── Save ── */
  const handleSave = () => {
    if (!form.subject && !form.type && !form.room && !form.teacher && !form.subgroups?.length) { setSlot(null); return; }
    const masterKey = cellKey(slot.day, slot.pair, slot.group);
    const merged = (form.type==="M" && form.mergedGroups?.length) ? form.mergedGroups : [slot.group];
    const subgroups = form.subgroups || [];

    setSchedule(prev => {
      const next = { ...prev };
      /* clear old slaves */
      Object.keys(next).forEach(k => { if (next[k]?.isSlave && next[k]?.masterKey===masterKey) delete next[k]; });
      const old = prev[masterKey];
      if (old?.mergedGroups) old.mergedGroups.forEach(gid => { const sk=cellKey(slot.day,slot.pair,gid); if(sk!==masterKey) delete next[sk]; });
      /* set master */
      next[masterKey] = { subject:form.subject, type:form.type, room:form.room, teacher:form.teacher, mergedGroups:merged, isMaster:merged.length>1, subgroups };
      /* set slaves */
      merged.forEach(gid => { if(gid!==slot.group) next[cellKey(slot.day,slot.pair,gid)]={ isSlave:true, masterKey }; });
      return next;
    });

    const msg = merged.length>1
      ? `${merged.length} guruh birlashtirilgan ma'ruza saqlandi ✓`
      : subgroups.length>1
        ? `${subgroups.length} kichik guruhga bo'lindi ✓`
        : "Dars saqlandi ✓";
    showToast(msg);
    setSlot(null);
  };

  /* ── Clear ── */
  const handleClear = () => {
    const masterKey = cellKey(slot.day, slot.pair, slot.group);
    setSchedule(prev => {
      const next = { ...prev };
      const m = next[masterKey];
      if (m?.mergedGroups) m.mergedGroups.forEach(gid => delete next[cellKey(slot.day,slot.pair,gid)]);
      delete next[masterKey];
      return next;
    });
    showToast("Dars o'chirildi", false);
    setSlot(null);
  };

  /* Stats */
  const masterCells = Object.values(schedule).filter(v => !v.isSlave);
  const filledCount = masterCells.length;
  const totalSlots  = DAYS.length * PAIRS.length * GROUPS.length;
  const mergedCount = masterCells.filter(v => v.isMaster).length;
  const splitCount  = masterCells.filter(v => v.subgroups?.length>1).length;
  const pct         = Math.round((Object.keys(schedule).length / totalSlots) * 100);

  const visibleDays   = filterDay==="all"   ? DAYS   : DAYS.filter(d=>d.id===filterDay);
  const visibleGroups = filterGroup==="all" ? GROUPS : GROUPS.filter(g=>g.id===filterGroup);

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div style={{ position:"fixed", top:20, right:20, zIndex:9999, background:C.white, borderLeft:`4px solid ${toast.ok?C.green:C.red}`, borderRadius:12, padding:"12px 18px", boxShadow:"0 8px 28px rgba(13,26,99,0.14)", display:"flex", gap:10, alignItems:"center", fontSize:13, fontWeight:600, color:C.dark, animation:"fadeUp 0.28s ease" }}>
          <Ico d={toast.ok?I.check:I.x} size={15} color={toast.ok?C.green:C.red}/>{toast.msg}
        </div>
      )}

      <Modal slot={slot} form={form} setForm={setForm} schedule={schedule}
        onSave={handleSave} onClear={handleClear} onClose={()=>setSlot(null)}/>

      <div style={{ padding:"24px 28px", maxWidth:1440, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, color:C.dark, fontFamily:"'Syne',sans-serif", marginBottom:4 }}>Dars Jadvali</h1>
            <p style={{ fontSize:13, color:C.light }}>
              2024/2025 o'quv yili · 1-semestr ·{" "}
              <b style={{ color:C.bright }}>{filledCount}</b> dars ·{" "}
              <b style={{ color:C.bright }}>{mergedCount}</b> birlashtirilgan ma'ruza ·{" "}
              <b style={{ color:C.green }}>{splitCount}</b> bo'lingan dars
            </p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>{setSchedule({});showToast("Jadval tozalandi",false);}}
              style={{ padding:"9px 16px", borderRadius:11, border:`1.5px solid ${C.gray}`, cursor:"pointer", fontFamily:"inherit", fontSize:13, background:C.white, color:C.mid, fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
              <Ico d={I.trash} size={14} color={C.mid}/> Tozalash
            </button>
            <button onClick={()=>showToast("Jadval saqlandi")}
              style={{ padding:"9px 18px", borderRadius:11, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:700, background:`linear-gradient(135deg,${C.bright},${C.blue})`, color:C.white, display:"flex", alignItems:"center", gap:6, boxShadow:`0 4px 14px ${C.bright}40` }}>
              <Ico d={I.save} size={14} color={C.white}/> Saqlash
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
          <StatCard icon={I.grid}     label="Jami uyachalar"             value={totalSlots}    color={C.blue}   bg={C.lightBlue}   delay={0}  />
          <StatCard icon={I.calendar} label="Band uyachalar"             value={filledCount}   color={C.green}  bg={C.greenLight}  delay={50} />
          <StatCard icon={I.merge}    label="Birlashtirilgan ma'ruzalar" value={mergedCount}   color={C.bright} bg={C.lightBlue}   delay={100}/>
          <StatCard icon={I.split}    label="Kichik guruhli darslar"     value={splitCount}    color={C.teal}   bg={C.tealLight}   delay={150}/>
        </div>

        {/* Progress */}
        <div style={{ background:C.white, borderRadius:14, padding:"12px 18px", border:`1px solid ${C.gray}`, marginBottom:14, display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:12, fontWeight:700, color:C.mid, whiteSpace:"nowrap" }}>Jadval to'ldirilishi</span>
          <div style={{ flex:1, height:8, borderRadius:99, background:C.gray, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:99, transition:"width 0.5s ease", width:`${pct}%`, background:pct>70?`linear-gradient(90deg,${C.green},${C.teal})`:pct>30?`linear-gradient(90deg,${C.bright},${C.purple})`:`linear-gradient(90deg,${C.orange},${C.red})` }}/>
          </div>
          <span style={{ fontSize:13, fontWeight:800, color:C.dark, fontFamily:"'Syne',sans-serif", minWidth:36 }}>{pct}%</span>
        </div>

        {/* Filters + Legend */}
        <div style={{ background:C.white, borderRadius:14, padding:"12px 16px", border:`1px solid ${C.gray}`, marginBottom:14, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          <Ico d={I.filter} size={15} color={C.light}/>
          {[
            { val:filterDay,   set:setFilterDay,   opts:DAYS,   all:"Barcha kunlar"   },
            { val:filterGroup, set:setFilterGroup, opts:GROUPS, all:"Barcha guruhlar" },
          ].map((f,i)=>(
            <div key={i} style={{ position:"relative", minWidth:i===0?150:180 }}>
              <select value={f.val} onChange={e=>f.set(e.target.value)}
                style={{ padding:"8px 28px 8px 12px", borderRadius:9, border:`1.5px solid ${C.gray}`, fontSize:13, color:C.dark, background:C.white, cursor:"pointer", appearance:"none", width:"100%" }}>
                <option value="all">{f.all}</option>
                {f.opts.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
              <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><Ico d={I.chevD} size={13} color={C.light}/></div>
            </div>
          ))}
          {(filterDay!=="all"||filterGroup!=="all")&&(
            <button onClick={()=>{setFilterDay("all");setFilterGroup("all");}}
              style={{ padding:"8px 12px", borderRadius:9, border:`1.5px solid ${C.red}30`, cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:600, background:C.redLight, color:C.red, display:"flex", alignItems:"center", gap:5 }}>
              <Ico d={I.x} size={12} color={C.red}/> Tozalash
            </button>
          )}
          <div style={{ marginLeft:"auto", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
            {TYPES.map(t=>(
              <div key={t.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:t.color }}/>
                <span style={{ fontSize:11, color:C.mid, fontWeight:600 }}>{t.label}</span>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:5, paddingLeft:8, borderLeft:`1px solid ${C.gray}` }}>
              <Ico d={I.merge} size={12} color={C.bright}/><span style={{ fontSize:11, color:C.bright, fontWeight:700 }}>Birlashtirilgan</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <Ico d={I.split} size={12} color={C.teal}/><span style={{ fontSize:11, color:C.teal, fontWeight:700 }}>Bo'lingan</span>
            </div>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.gray}`, overflow:"auto", boxShadow:"0 4px 20px rgba(13,26,99,0.06)" }}>
          <table style={{ borderCollapse:"collapse", width:"100%", minWidth:700 }}>
            <thead>
              <tr>
                <th style={{ width:36, background:C.navy, border:`1px solid ${C.navy}` }}/>
                <th style={{ width:80, background:C.navy, border:`1px solid ${C.navy}`, padding:"8px 4px", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.8px", textAlign:"center" }}>Juft</th>
                {visibleGroups.map(g=>(
                  <th key={g.id} style={{ background:C.navy, border:`1px solid ${C.navy+"80"}`, padding:"10px 8px", textAlign:"center", fontSize:11, fontWeight:700, color:C.white, whiteSpace:"nowrap" }}>
                    <div>{g.label}</div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginTop:2, fontWeight:400 }}>{g.count} talaba</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleDays.map((day,di)=>
                PAIRS.map((pair,pi)=>{
                  const isFirst = pi===0;
                  return (
                    <tr key={day.id+pair.id} style={{ animation:`fadeUp 0.25s ${(di*4+pi)*16}ms ease both` }}>
                      {isFirst && (
                        <td rowSpan={PAIRS.length} style={{ border:`1px solid ${avColor(di)}30`, background:`${avColor(di)}12`, writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", textAlign:"center", padding:"6px 4px", fontSize:11, fontWeight:800, color:avColor(di), fontFamily:"'Syne',sans-serif", width:36 }}>
                          {day.label}
                        </td>
                      )}
                      <td style={{ border:`1px solid ${C.gray}`, background:C.lightGray, padding:"6px 10px", textAlign:"center", width:80 }}>
                        <div style={{ fontSize:14, fontWeight:800, color:C.dark, fontFamily:"'Syne',sans-serif" }}>{pair.label}</div>
                        <div style={{ fontSize:9, color:C.light, marginTop:1, whiteSpace:"nowrap" }}>{pair.time}</div>
                      </td>

                      {/* ── Cells with merge colspan + subgroup display ── */}
                      {(()=>{
                        const cells=[];
                        let skipNext=0;
                        visibleGroups.forEach((grp,gi)=>{
                          if(skipNext>0){skipNext--;return;}
                          const k    = cellKey(day.id,pair.id,grp.id);
                          const data = schedule[k];
                          if(data?.isSlave) return;

                          let colSpan=1, mergedLabels=null;
                          if(data?.isMaster && data.mergedGroups?.length>1){
                            const rest=visibleGroups.slice(gi+1);
                            let extra=0;
                            for(const ng of rest){
                              const nk=cellKey(day.id,pair.id,ng.id);
                              if(schedule[nk]?.isSlave && schedule[nk]?.masterKey===k) extra++;
                              else break;
                            }
                            colSpan=1+extra;
                            skipNext=extra;
                            mergedLabels=data.mergedGroups.map(gid=>GROUPS.find(g=>g.id===gid)?.label).filter(Boolean);
                          }
                          cells.push(
                            <Cell key={grp.id} data={data||{}} colSpan={colSpan} mergedLabels={mergedLabels}
                              isMergeStart={true} isMergeEnd={true}
                              onClick={()=>openSlot(day.id,pair.id,grp.id)}/>
                          );
                        });
                        return cells;
                      })()}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop:14, fontSize:12, color:C.light, textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <Ico d={I.info} size={13} color={C.light}/>
          Uyachani bosib darsni qo'shing · Ma'ruza: guruhlarni birlashtiring · Amaliy/Lab/Sem: kichik guruhlarga bo'ling
        </div>
      </div>
    </>
  );
}