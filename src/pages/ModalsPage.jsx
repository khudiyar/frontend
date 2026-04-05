import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  navy:"#0D1A63",blue:"#1E3A9E",bright:"#2845D6",lightBlue:"#EEF2FF",
  orange:"#F68048",orangeLight:"#FFF4ED",green:"#16A34A",greenLight:"#F0FDF4",
  red:"#DC2626",redLight:"#FEF2F2",yellow:"#D97706",yellowLight:"#FFFBEB",
  purple:"#7C3AED",purpleLight:"#F5F3FF",
  dark:"#0F172A",mid:"#475569",light:"#94A3B8",gray:"#E2E8F0",
  lightGray:"#F8FAFC",white:"#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:${C.lightGray}; }
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(-120%)}to{opacity:1;transform:translateX(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
  @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
  @keyframes bounceIn{0%{transform:scale(0.3);opacity:0}50%{transform:scale(1.05)}70%{transform:scale(0.95)}100%{transform:scale(1);opacity:1}}
  @keyframes slideUpIn{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes toast-enter{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
  @keyframes progress{from{width:100%}to{width:0%}}
  @keyframes nativeScaleIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
  button,input,textarea,select{font-family:'DM Sans',sans-serif}
  input:focus,textarea:focus,select:focus{outline:none}
`;

/* ── ICONS ── */
const Ico = ({d,size=18,color="currentColor",fill="none",sw=2})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d}/>
    </svg>
);
const I = {
  x:      "M18 6L6 18M6 6l12 12",
  check:  "M20 6L9 17l-5-5",
  warn:   "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
  info:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  error:  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15 9l-6 6M9 9l6 6",
  trash:  "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  lock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  mail:   "M4 4h16v16H4zM4 4l8 9 8-9",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  star:   "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  bell:   "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  settings:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  img:    "M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM21 15l-5-5L5 21",
  save:   "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
};

/* ── SHARED COMPONENTS ── */
const Overlay = ({children, onClick, onBgClick, blur=true}) => {
  const handler = onClick || onBgClick;
  return (
      <div
          onClick={e => e.target === e.currentTarget && handler?.()}
          style={{position:"fixed",inset:0,zIndex:1000,
            background:"rgba(13,26,99,0.42)",
            backdropFilter:blur?"blur(4px)":"none",
            display:"flex",alignItems:"center",justifyContent:"center",
            animation:"fadeIn 0.2s ease",padding:16}}>
        {children}
      </div>
  );
};

const CloseBtn = ({onClick}) => (
    <button onClick={onClick}
            style={{width:32,height:32,borderRadius:9,border:"none",background:C.lightGray,
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
              flexShrink:0,transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=C.gray}
            onMouseLeave={e=>e.currentTarget.style.background=C.lightGray}>
      <Ico d={I.x} size={15} color={C.mid}/>
    </button>
);

const Section = ({title,children}) => (
    <div style={{marginBottom:32}}>
      <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
        letterSpacing:"1.5px",marginBottom:14,paddingLeft:2}}>{title}</div>
      {children}
    </div>
);

const TriggerBtn = ({children,onClick,color=C.bright,bg,outline}) => (
    <button onClick={onClick} style={{
      padding:"9px 18px",borderRadius:10,
      border:outline?`1.5px solid ${color}`:"none",
      cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
      background:outline?"transparent":bg||`linear-gradient(135deg,${color},${color}cc)`,
      color:outline?color:C.white,
      boxShadow:outline?"none":`0 3px 12px ${color}30`,
      transition:"all 0.2s",display:"inline-flex",alignItems:"center",gap:7,
    }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
      {children}
    </button>
);

/* ── TOAST SYSTEM ── */
let _tid = 0;
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type="success", duration=4000) => {
    const id = ++_tid;
    setToasts(p => [...p, {id,msg,type,duration}]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration);
  }, []);
  const remove = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);
  return {toasts, add, remove};
}

const TCFG = {
  success:{border:C.green, icon:I.check,ic:C.green, ibg:C.greenLight, title:"Muvaffaqiyat"},
  error:  {border:C.red,   icon:I.error,ic:C.red,   ibg:C.redLight,   title:"Xatolik"},
  warning:{border:C.yellow,icon:I.warn, ic:C.yellow,ibg:C.yellowLight, title:"Ogohlantirish"},
  info:   {border:C.bright,icon:I.info, ic:C.bright,ibg:C.lightBlue,   title:"Ma'lumot"},
};

const Toast = ({t, onRemove}) => {
  const cfg = TCFG[t.type] || TCFG.info;
  return (
      <div style={{background:C.white,border:`1px solid ${C.gray}`,borderLeft:`4px solid ${cfg.border}`,
        borderRadius:12,padding:"12px 14px",width:320,
        boxShadow:"0 8px 30px rgba(13,26,99,0.12)",
        display:"flex",gap:10,alignItems:"flex-start",
        animation:"toast-enter 0.3s ease",position:"relative",overflow:"hidden"}}>
        <div style={{width:32,height:32,borderRadius:8,background:cfg.ibg,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ico d={cfg.icon} size={15} color={cfg.ic}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:C.dark,marginBottom:2}}>{cfg.title}</div>
          <div style={{fontSize:12,color:C.mid,lineHeight:1.4}}>{t.msg}</div>
        </div>
        <button onClick={() => onRemove(t.id)}
                style={{width:22,height:22,borderRadius:6,border:"none",background:C.lightGray,
                  cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ico d={I.x} size={12} color={C.light}/>
        </button>
        <div style={{position:"absolute",bottom:0,left:0,height:3,background:cfg.border,borderRadius:3,
          animation:`progress ${t.duration}ms linear forwards`}}/>
      </div>
  );
};

/* ═══════════════════════════════════════════════════
   NATIVE ALERT / CONFIRM / PROMPT OVERRIDE HOOK
   window.alert(), window.confirm(), window.prompt()
   ni Promise asosida custom modal bilan almashtiradi.
   Mavjud kodda hech narsa o'zgartirish shart emas.
═══════════════════════════════════════════════════ */
function useNativeOverride() {
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const _alert   = window.alert.bind(window);
    const _confirm = window.confirm.bind(window);
    const _prompt  = window.prompt.bind(window);

    window.alert = (message = "") =>
        new Promise(resolve =>
            setDialog({ type:"alert", message:String(message), resolve })
        );

    window.confirm = (message = "") =>
        new Promise(resolve =>
            setDialog({ type:"confirm", message:String(message), resolve })
        );

    window.prompt = (message = "", defaultValue = "") =>
        new Promise(resolve =>
            setDialog({ type:"prompt", message:String(message),
              placeholder:String(defaultValue || ""), inputValue:"", resolve })
        );

    return () => {
      window.alert   = _alert;
      window.confirm = _confirm;
      window.prompt  = _prompt;
    };
  }, []);

  const close = useCallback((result) => {
    setDialog(d => { d?.resolve(result); return null; });
  }, []);

  const updateInput = useCallback((val) => {
    setDialog(d => d ? {...d, inputValue: val} : null);
  }, []);

  return { dialog, close, updateInput };
}

/* ── Native: alert() ── */
const NativeAlertModal = ({dialog, close}) => (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(13,26,99,0.45)",
      backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
      padding:16,animation:"fadeIn 0.15s ease"}}>
      <div style={{background:C.white,borderRadius:20,padding:28,width:400,
        boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"nativeScaleIn 0.2s ease"}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:22}}>
          <div style={{width:44,height:44,borderRadius:12,background:C.lightBlue,flexShrink:0,
            display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ico d={I.info} size={22} color={C.bright}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:6}}>
              Bildirishnoma
            </div>
            <div style={{fontSize:13,color:C.mid,lineHeight:1.65,whiteSpace:"pre-wrap"}}>
              {dialog.message}
            </div>
          </div>
        </div>
        <button onClick={() => close(undefined)}
                style={{width:"100%",padding:"11px",borderRadius:11,border:"none",cursor:"pointer",
                  fontFamily:"inherit",fontSize:13,fontWeight:700,
                  background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
          OK
        </button>
      </div>
    </div>
);

/* ── Native: confirm() ── card-style (rasmga mos) ── */
const NativeConfirmModal = ({dialog, close}) => {
  // message ichidan title va text ajratish:
  // "Title\nText matni" formatida yoki oddiy matn
  const lines  = dialog.message.split("\n");
  const title  = lines[0] || "Tasdiqlash";
  const body   = lines.slice(1).join("\n") || dialog.message;
  const isDelete = /o'chir|o'chir|удал|delet/i.test(dialog.message);
  const actionColor = isDelete ? C.red : C.bright;
  const iconBg      = isDelete ? C.redLight : C.yellowLight;
  const iconColor   = isDelete ? C.red : C.yellow;
  const iconPath    = isDelete ? I.trash : I.warn;
  const confirmLabel= isDelete ? "Ha, o'chiraman" : "Ha";

  return (
      <div style={{position:"fixed",inset:0,zIndex:9999,
        background:"rgba(13,26,99,0.35)",backdropFilter:"blur(4px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,animation:"fadeIn 0.15s ease"}}>
        <div style={{background:C.white,borderRadius:16,padding:"18px 18px 14px",width:360,
          boxShadow:"0 8px 32px rgba(13,26,99,0.14)",animation:"nativeScaleIn 0.2s ease",
          border:`1px solid ${C.gray}`}}>

          {/* Header: icon + texts */}
          <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:16}}>
            <div style={{width:40,height:40,borderRadius:11,background:iconBg,flexShrink:0,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={iconPath} size={18} color={iconColor}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:3,lineHeight:1.3}}>
                {title}
              </div>
              <div style={{fontSize:12,color:C.mid,lineHeight:1.5,whiteSpace:"pre-wrap"}}>
                {lines.length > 1 ? body : "Ma'lumot butunlay o'chiriladi."}
              </div>
            </div>
          </div>

          {/* Divider */}
          {/*<div style={{height:1,background:C.gray,marginBottom:12}}/>*/}

          {/* Buttons */}
          <div style={{display:"flex",gap:10}}>
            <button onClick={() => close(true)}
                    style={{flex:1,padding:"10px 14px",borderRadius:10,border:"none",cursor:"pointer",
                      fontFamily:"inherit",fontSize:13,fontWeight:700,
                      background:`linear-gradient(135deg,${actionColor},${actionColor}cc)`,
                      color:C.white,boxShadow:`0 3px 10px ${actionColor}30`}}>
              {confirmLabel}
            </button>
            <button onClick={() => close(false)}
                    style={{flex:1,padding:"10px 14px",borderRadius:10,
                      border:`1.5px solid ${C.gray}`,cursor:"pointer",fontFamily:"inherit",
                      fontSize:13,fontWeight:600,background:C.white,color:C.mid}}>
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
  );
};

/* ── Native: prompt() ── */
const NativePromptModal = ({dialog, close, updateInput}) => {
  const inputRef = useRef();
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);
  return (
      <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(13,26,99,0.45)",
        backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,animation:"fadeIn 0.15s ease"}}>
        <div style={{background:C.white,borderRadius:20,padding:28,width:420,
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"nativeScaleIn 0.2s ease"}}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18}}>
            <div style={{width:44,height:44,borderRadius:12,background:C.purpleLight,flexShrink:0,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.edit} size={20} color={C.purple}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:6}}>
                Kiritish talab qilinadi
              </div>
              <div style={{fontSize:13,color:C.mid,lineHeight:1.65,whiteSpace:"pre-wrap"}}>
                {dialog.message}
              </div>
            </div>
          </div>
          <input
              ref={inputRef}
              value={dialog.inputValue}
              onChange={e => updateInput(e.target.value)}
              placeholder={dialog.placeholder || "Bu yerga kiriting..."}
              onKeyDown={e => {
                if(e.key === "Enter")  close(dialog.inputValue || null);
                if(e.key === "Escape") close(null);
              }}
              style={{width:"100%",padding:"10px 13px",borderRadius:10,
                border:`1.5px solid ${C.bright}`,fontSize:13,color:C.dark,
                marginBottom:16,boxShadow:`0 0 0 3px ${C.bright}18`}}
          />
          <div style={{display:"flex",gap:10}}>
            <button onClick={() => close(dialog.inputValue || null)}
                    style={{flex:2,padding:"11px",borderRadius:11,border:"none",cursor:"pointer",
                      fontFamily:"inherit",fontSize:13,fontWeight:700,
                      background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
              Tasdiqlash
            </button>
            <button onClick={() => close(null)}
                    style={{flex:1,padding:"11px",borderRadius:11,border:`1px solid ${C.gray}`,
                      cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                      background:C.white,color:C.mid}}>
              Bekor
            </button>
          </div>
        </div>
      </div>
  );
};

/* ── Native Dialog Switcher ── */
const NativeDialogs = ({dialog, close, updateInput}) => {
  if(!dialog) return null;
  if(dialog.type === "alert")   return <NativeAlertModal   dialog={dialog} close={close}/>;
  if(dialog.type === "confirm") return <NativeConfirmModal dialog={dialog} close={close}/>;
  if(dialog.type === "prompt")  return <NativePromptModal  dialog={dialog} close={close} updateInput={updateInput}/>;
  return null;
};

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function ModalsPage() {
  const {toasts, add, remove}        = useToasts();
  const {dialog, close, updateInput} = useNativeOverride();

  const [modal,       setModal]       = useState(null);
  const [step,        setStep]        = useState(0);
  const [loading,     setLoading]     = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [lightbox,    setLightbox]    = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const openModal  = id => { setModal(id); setStep(0); setLoading(false); setProgress(0); setDeleteInput(""); };
  const closeModal = () => setModal(null);

  const simulateLoading = () => {
    setLoading(true);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 15;
      setProgress(Math.min(p, 100));
      if(p >= 100) {
        clearInterval(t);
        setTimeout(() => {
          setLoading(false);
          closeModal();
          add("Fayl muvaffaqiyatli yuklandi!", "success");
        }, 400);
      }
    }, 200);
  };

  /* ── Native demo handlers ── */
  const demoAlert = async () => {
    await window.alert("Bu oddiy alert xabari.\nBrauzer default alert o'rniga custom modal.");
    add("Alert OK bosildi", "info");
  };
  const demoConfirm = async () => {
    const ok = await window.confirm("Faylni o'chirishni tasdiqlaysizmi?");
    add(ok ? "Ha — tasdiqlandi" : "Yo'q — bekor", ok ? "success" : "warning");
  };
  const demoPrompt = async () => {
    const val = await window.prompt("Yangi ismingizni kiriting:", "Alisher Qodirov");
    if(val !== null) add(`Kiritildi: "${val}"`, "success");
    else             add("Bekor qilindi", "warning");
  };
  const demoChain = async () => {
    await window.alert("Hisobni o'chirishdan oldin tasdiqlash talab qilinadi.");
    const ok = await window.confirm("Rostdan ham hisobni o'chirmoqchimisiz?");
    if(!ok) { add("Bekor qilindi", "info"); return; }
    const word = await window.prompt("Tasdiqlash uchun  o'chiraman  so'zini yozing:");
    if(word?.trim().toLowerCase() === "o'chiraman")
      add("Hisob o'chirildi", "success");
    else
      add("Noto'g'ri so'z — amal bekor", "error");
  };

  /* ── Inline alerts data ── */
  const alerts = [
    {type:"success",icon:I.check,color:C.green, bg:C.greenLight, title:"Muvaffaqiyatli saqlandi",  text:"O'zgarishlar muvaffaqiyatli bazaga yozildi."},
    {type:"info",   icon:I.info, color:C.bright,bg:C.lightBlue,  title:"Yangilanish mavjud",        text:"Tizim 30 daqiqadan so'ng yangilanadi. Ishingizni saqlang."},
    {type:"warning",icon:I.warn, color:C.yellow,bg:C.yellowLight,title:"Sessiya tugamoqda",         text:"Faolsizlik sababli 10 daqiqadan so'ng chiqarilasiz."},
    {type:"error",  icon:I.error,color:C.red,   bg:C.redLight,   title:"Xatolik yuz berdi",         text:"Server bilan aloqa yo'q. Qayta urinib ko'ring."},
  ];

  /* ── Alert dialog cards ── */
  const alertCards = [
    {title:"Chiqishni tasdiqlang",text:"Saqlenmagan o'zgarishlar yo'qoladi. Davom etasizmi?",
      color:C.yellow,icon:I.warn,
      btns:[{label:"Ha, chiqaman",bg:`linear-gradient(135deg,${C.yellow},#f59e0b)`,color:C.white},
        {label:"Qolaman",bg:C.white,color:C.mid,border:`1px solid ${C.gray}`}]},
    {title:"Hisobni o'chirish",text:"Bu amalni qaytarib bo'lmaydi. Hisobingiz butunlay o'chiriladi.",
      color:C.red,icon:I.trash,
      btns:[{label:"Ha, o'chiraman",bg:`linear-gradient(135deg,${C.red},#ef4444)`,color:C.white},
        {label:"Bekor qilish",bg:C.white,color:C.mid,border:`1px solid ${C.gray}`}]},
    {title:"Ruxsat so'rash",text:"Bu sahifaga kirish uchun login talab qilinadi.",
      color:C.bright,icon:I.lock,
      btns:[{label:"Login",bg:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white},
        {label:"Bekor",bg:C.white,color:C.mid,border:`1px solid ${C.gray}`}]},
    {title:"Yuborish tasdiqi",text:"Shakl ma'lumotlari serverga yuboriladi. Davom etasizmi?",
      color:C.green,icon:I.check,
      btns:[{label:"Yuborish",bg:`linear-gradient(135deg,${C.green},#22c55e)`,color:C.white},
        {label:"Ko'rib chiqish",bg:C.white,color:C.mid,border:`1px solid ${C.gray}`}]},
  ];

  return (
      <>
        <style>{css}</style>

        {/* Toast container — pastki o'ng burchak */}
        <div style={{position:"fixed",bottom:20,right:20,zIndex:10000,
          display:"flex",flexDirection:"column-reverse",gap:8}}>
          {[...toasts].reverse().map(t => <Toast key={t.id} t={t} onRemove={remove}/>)}
        </div>

        {/* Native alert/confirm/prompt modallari */}
        <NativeDialogs dialog={dialog} close={close} updateInput={updateInput}/>

        {/* ─── PAGE CONTENT ─── */}
        <div style={{padding:"24px 28px",maxWidth:1000,margin:"0 auto"}}>
          <div style={{marginBottom:28}}>
            <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>
              Modallar va Alertlar
            </h1>
            <p style={{fontSize:13,color:C.light}}>
              Barcha modal, drawer, alert va toast turlari —{" "}
              <code style={{background:C.lightGray,padding:"1px 6px",borderRadius:4,fontSize:12,color:C.bright}}>window.alert/confirm/prompt</code>
              {" "}ham custom modal bilan ishlaydi
            </p>
          </div>

          {/* ── INLINE ALERTS ── */}
          <Section title="Inline Alertlar">
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {alerts.map((a, i) => (
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,
                    padding:"14px 16px",borderRadius:12,background:a.bg,
                    border:`1px solid ${a.color}18`,borderLeft:`4px solid ${a.color}`,
                    animation:`fadeUp 0.3s ${i*60}ms ease both`}}>
                    <div style={{width:34,height:34,borderRadius:9,background:`${a.color}18`,
                      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Ico d={a.icon} size={16} color={a.color}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.dark,marginBottom:3}}>{a.title}</div>
                      <div style={{fontSize:13,color:C.mid,lineHeight:1.5}}>{a.text}</div>
                    </div>
                    <button style={{width:24,height:24,borderRadius:6,border:"none",
                      background:`${a.color}14`,cursor:"pointer",display:"flex",
                      alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.x} size={12} color={a.color}/>
                    </button>
                  </div>
              ))}
            </div>
          </Section>

          {/* ── TOAST TRIGGERS ── */}
          <Section title="Toast bildirishnomalar">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <TriggerBtn onClick={()=>add("Ma'lumot muvaffaqiyatli saqlandi!","success")} color={C.green}>✓ Success</TriggerBtn>
              <TriggerBtn onClick={()=>add("Xatolik yuz berdi. Qayta urinib ko'ring.","error")} color={C.red}>✕ Error</TriggerBtn>
              <TriggerBtn onClick={()=>add("Sessiya yakunlanmoqda. Ishingizni saqlang!","warning")} color={C.yellow}>⚠ Warning</TriggerBtn>
              <TriggerBtn onClick={()=>add("Yangi versiya mavjud. Sahifani yangilang.","info")} color={C.bright}>ℹ Info</TriggerBtn>
            </div>
          </Section>

          {/* ── NATIVE ALERT OVERRIDE ── */}
          <Section title="Native alert override (window.alert / confirm / prompt)">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <TriggerBtn onClick={demoAlert}   color={C.bright}>alert()</TriggerBtn>
              <TriggerBtn onClick={demoConfirm} color={C.yellow}>confirm()</TriggerBtn>
              <TriggerBtn onClick={demoPrompt}  color={C.purple}>prompt()</TriggerBtn>
              <TriggerBtn onClick={demoChain}   color={C.red}>Zanjir: alert→confirm→prompt</TriggerBtn>
            </div>
          </Section>

          {/* ── BASIC MODALS ── */}
          <Section title="Asosiy modallar">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <TriggerBtn onClick={()=>openModal("info")}    color={C.bright} outline>ℹ Ma'lumot</TriggerBtn>
              <TriggerBtn onClick={()=>openModal("confirm")} color={C.red}    outline>🗑 Tasdiqlash</TriggerBtn>
              <TriggerBtn onClick={()=>openModal("form")}    color={C.green}  outline>📝 Forma</TriggerBtn>
              <TriggerBtn onClick={()=>openModal("large")}   color={C.purple} outline>⬜ Katta modal</TriggerBtn>
              <TriggerBtn onClick={()=>openModal("success")} color={C.green}  outline>🎉 Muvaffaqiyat</TriggerBtn>
              <TriggerBtn onClick={()=>openModal("wizard")}  color={C.orange} outline>🧭 Ko'p bosqichli</TriggerBtn>
            </div>
          </Section>

          {/* ── SPECIAL ── */}
          <Section title="Maxsus modallar">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <TriggerBtn onClick={()=>openModal("upload")}  color={C.blue}   outline>📤 Yuklash</TriggerBtn>
              <TriggerBtn onClick={()=>setDrawerOpen(true)}  color={C.navy}   outline>◁ Drawer</TriggerBtn>
              <TriggerBtn onClick={()=>setBottomSheet(true)} color={C.mid}    outline>↑ Bottom Sheet</TriggerBtn>
              <TriggerBtn onClick={()=>setLightbox(true)}    color={C.dark}   outline>🖼 Lightbox</TriggerBtn>
              <TriggerBtn onClick={()=>openModal("delete")}  color={C.red}    outline>⛔ Xavfli o'chirish</TriggerBtn>
            </div>
          </Section>

          {/* ── ALERT DIALOG CARDS ── */}
          <Section title="Alert dialog variantlari">
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
              {alertCards.map((a, i) => (
                  <div key={i} style={{background:C.white,borderRadius:14,padding:"18px",
                    border:`1px solid ${C.gray}`,animation:`fadeUp 0.3s ${i*80}ms ease both`}}>
                    <div style={{display:"flex",gap:12,marginBottom:14}}>
                      <div style={{width:40,height:40,borderRadius:11,background:`${a.color}14`,
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <Ico d={a.icon} size={18} color={a.color}/>
                      </div>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:4}}>{a.title}</div>
                        <div style={{fontSize:12,color:C.mid,lineHeight:1.5}}>{a.text}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      {a.btns.map((b, j) => (
                          <button key={j}
                                  onClick={() => add(j===0?"Tasdiqlandi!":"Bekor qilindi", j===0?"success":"info")}
                                  style={{flex:1,padding:"8px",borderRadius:9,border:b.border||"none",
                                    cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
                                    background:b.bg,color:b.color,transition:"all 0.15s"}}>
                            {b.label}
                          </button>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </Section>
        </div>

        {/* ══════════ MODALS ══════════ */}

        {/* INFO */}
        {modal==="info" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,padding:28,width:420,
                boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"scaleIn 0.25s ease"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:36,height:36,borderRadius:10,background:C.lightBlue,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.info} size={18} color={C.bright}/>
                    </div>
                    <h3 style={{fontSize:17,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Tizim haqida</h3>
                  </div>
                  <CloseBtn onClick={closeModal}/>
                </div>
                <p style={{fontSize:13,color:C.mid,lineHeight:1.7,marginBottom:6}}>EduAdmin v2.5.1 — O'quv muassasalari uchun zamonaviy boshqaruv tizimi.</p>
                <p style={{fontSize:13,color:C.mid,lineHeight:1.7,marginBottom:20}}>Tizim barcha asosiy funksiyalarni qo'llab-quvvatlaydi: talabalar boshqaruvi, jadvallar, moliya va hisobotlar.</p>
                <button onClick={closeModal}
                        style={{width:"100%",padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
                          fontFamily:"inherit",fontSize:13,fontWeight:700,
                          background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
                  Yopish
                </button>
              </div>
            </Overlay>
        )}

        {/* CONFIRM DELETE */}
        {modal==="confirm" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,padding:28,width:400,
                boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"scaleIn 0.25s ease",textAlign:"center"}}>
                <div style={{width:68,height:68,borderRadius:18,background:C.redLight,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 18px",animation:"bounceIn 0.5s ease"}}>
                  <Ico d={I.trash} size={30} color={C.red}/>
                </div>
                <h3 style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:8}}>O'chirishni tasdiqlang</h3>
                <p style={{fontSize:13,color:C.mid,lineHeight:1.6,marginBottom:6}}>
                  Ushbu foydalanuvchi barcha ma'lumotlari bilan birga <b>butunlay o'chiriladi</b>.
                </p>
                <p style={{fontSize:12,color:C.red,background:C.redLight,padding:"8px 14px",
                  borderRadius:8,marginBottom:22}}>⚠ Bu amalni qaytarib bo'lmaydi!</p>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{closeModal();add("Foydalanuvchi o'chirildi","success");}}
                          style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
                            fontFamily:"inherit",fontSize:13,fontWeight:700,
                            background:`linear-gradient(135deg,${C.red},#ef4444)`,color:C.white}}>
                    Ha, o'chiraman
                  </button>
                  <button onClick={closeModal}
                          style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.gray}`,
                            cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                            background:C.white,color:C.mid}}>
                    Bekor qilish
                  </button>
                </div>
              </div>
            </Overlay>
        )}

        {/* FORM */}
        {modal==="form" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,padding:28,width:480,
                boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"fadeUp 0.3s ease"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:36,height:36,borderRadius:10,
                      background:`linear-gradient(135deg,${C.bright},${C.blue})`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ico d={I.user} size={18} color={C.white}/>
                    </div>
                    <h3 style={{fontSize:17,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Yangi foydalanuvchi</h3>
                  </div>
                  <CloseBtn onClick={closeModal}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 14px",marginBottom:18}}>
                  {[{l:"Ism",p:"Ism"},{l:"Familiya",p:"Familiya"},{l:"Email",p:"email@edu.uz"},{l:"Telefon",p:"+998 90 000 00 00"}].map(f=>(
                      <div key={f.l}>
                        <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.3px"}}>{f.l}</div>
                        <input placeholder={f.p}
                               style={{width:"100%",padding:"9px 12px",borderRadius:9,
                                 border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark,transition:"border-color 0.2s"}}
                               onFocus={e=>e.target.style.borderColor=C.bright}
                               onBlur={e=>e.target.style.borderColor=C.gray}/>
                      </div>
                  ))}
                  <div style={{gridColumn:"1/-1"}}>
                    <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.3px"}}>Rol</div>
                    <select style={{width:"100%",padding:"9px 12px",borderRadius:9,
                      border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark,background:C.white}}>
                      {["Talaba","O'qituvchi","Admin","Dekan"].map(r=><option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{closeModal();add("Foydalanuvchi yaratildi!","success");}}
                          style={{flex:2,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
                            fontFamily:"inherit",fontSize:13,fontWeight:700,
                            background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
                    Saqlash
                  </button>
                  <button onClick={closeModal}
                          style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.gray}`,
                            cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                            background:C.white,color:C.mid}}>
                    Bekor
                  </button>
                </div>
              </div>
            </Overlay>
        )}

        {/* LARGE */}
        {modal==="large" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,width:"min(700px,95vw)",maxHeight:"85vh",
                overflow:"hidden",boxShadow:"0 24px 60px rgba(13,26,99,0.18)",
                animation:"fadeUp 0.3s ease",display:"flex",flexDirection:"column"}}>
                <div style={{padding:"18px 24px",background:`linear-gradient(135deg,${C.navy},${C.blue})`,
                  display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
                  <h3 style={{fontSize:17,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>Talaba batafsil ma'lumoti</h3>
                  <button onClick={closeModal}
                          style={{width:32,height:32,borderRadius:8,border:"none",
                            background:"rgba(255,255,255,0.15)",cursor:"pointer",
                            display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={I.x} size={16} color={C.white}/>
                  </button>
                </div>
                <div style={{overflowY:"auto",flex:1,padding:"20px 24px"}}>
                  <div style={{display:"flex",gap:16,marginBottom:20,alignItems:"flex-start"}}>
                    <div style={{width:72,height:72,borderRadius:16,
                      background:`linear-gradient(135deg,${C.bright}20,${C.orange}25)`,
                      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:28,fontWeight:800,color:C.bright}}>AQ</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Alisher Qodirov</div>
                      <div style={{fontSize:13,color:C.light,marginBottom:8}}>MT-203 · 2-kurs · Axborot texnologiyalari</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:C.greenLight,color:C.green}}>Faol</span>
                        <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:C.lightBlue,color:C.bright}}>Talaba</span>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
                    {[{l:"GPA",v:"3.75",c:C.green},{l:"Davomat",v:"94%",c:C.bright},{l:"Kreditlar",v:"42/60",c:C.orange}].map(s=>(
                        <div key={s.l} style={{background:C.lightGray,borderRadius:12,padding:"12px 14px",textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
                          <div style={{fontSize:11,color:C.light,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.l}</div>
                        </div>
                    ))}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 16px"}}>
                    {[["Email","alisher@edu.uz"],["Telefon","+998 90 123 45 67"],["Tug'ilgan sana","2002-03-15"],["Manzil","Toshkent sh."],["Qabul yili","2023"],["Stipendiya","Ha"]].map(([k,v])=>(
                        <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                          padding:"8px 0",borderBottom:`1px solid ${C.lightGray}`}}>
                          <span style={{fontSize:12,color:C.light,fontWeight:600}}>{k}</span>
                          <span style={{fontSize:13,color:C.dark,fontWeight:600}}>{v}</span>
                        </div>
                    ))}
                  </div>
                </div>
                <div style={{padding:"14px 24px",borderTop:`1px solid ${C.lightGray}`,
                  display:"flex",gap:8,flexShrink:0}}>
                  <button onClick={closeModal}
                          style={{flex:1,padding:"9px",borderRadius:10,border:"none",cursor:"pointer",
                            fontFamily:"inherit",fontSize:13,fontWeight:700,
                            background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
                    Tahrirlash
                  </button>
                  <button onClick={closeModal}
                          style={{padding:"9px 18px",borderRadius:10,border:`1px solid ${C.gray}`,
                            cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                            background:C.white,color:C.mid}}>
                    Yopish
                  </button>
                </div>
              </div>
            </Overlay>
        )}

        {/* SUCCESS */}
        {modal==="success" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:24,padding:"36px 32px",width:380,
                boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"scaleIn 0.3s ease",textAlign:"center"}}>
                <div style={{width:80,height:80,borderRadius:"50%",
                  background:`linear-gradient(135deg,${C.green},#22c55e)`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 20px",boxShadow:`0 8px 24px ${C.green}40`,
                  animation:"bounceIn 0.6s ease"}}>
                  <Ico d={I.check} size={36} color={C.white} sw={3}/>
                </div>
                <h3 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:8}}>Tabriklaymiz! 🎉</h3>
                <p style={{fontSize:14,color:C.mid,lineHeight:1.6,marginBottom:24}}>
                  Ro'yxatdan o'tish muvaffaqiyatli yakunlandi. Sizning hisobingiz faollashtirildi.
                </p>
                <button onClick={closeModal}
                        style={{width:"100%",padding:"12px",borderRadius:12,border:"none",cursor:"pointer",
                          fontFamily:"inherit",fontSize:14,fontWeight:700,
                          background:`linear-gradient(135deg,${C.green},#22c55e)`,color:C.white,
                          boxShadow:`0 4px 16px ${C.green}40`}}>
                  Davom etish →
                </button>
              </div>
            </Overlay>
        )}

        {/* WIZARD */}
        {modal==="wizard" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,width:500,
                boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"fadeUp 0.3s ease",overflow:"hidden"}}>
                <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${C.lightGray}`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                    <h3 style={{fontSize:17,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Ro'yxatdan o'tish</h3>
                    <CloseBtn onClick={closeModal}/>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    {["Shaxsiy","Hisob","Tasdiqlash"].map((s,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",flex:i<2?1:0}}>
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                            <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                              fontSize:12,fontWeight:700,transition:"all 0.3s",
                              background:i<step?C.green:i===step?C.bright:C.lightGray,
                              color:i<=step?C.white:C.light}}>
                              {i<step?<Ico d={I.check} size={14} color={C.white} sw={2.5}/>:i+1}
                            </div>
                            <div style={{fontSize:10,fontWeight:600,whiteSpace:"nowrap",
                              color:i===step?C.bright:C.light}}>{s}</div>
                          </div>
                          {i<2&&<div style={{flex:1,height:2,margin:"0 6px",marginBottom:14,transition:"background 0.3s",
                            background:i<step?C.green:C.lightGray}}/>}
                        </div>
                    ))}
                  </div>
                </div>
                <div style={{padding:"20px 24px",minHeight:200}}>
                  {step===0&&(
                      <div style={{animation:"fadeIn 0.2s ease",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 14px"}}>
                        {[{l:"Ism",p:"Ism"},{l:"Familiya",p:"Familiya"},{l:"Tug'ilgan sana",p:"2000-01-01"},{l:"Jinsi",type:"select"}].map(f=>(
                            <div key={f.l}>
                              <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:5,textTransform:"uppercase"}}>{f.l}</div>
                              {f.type==="select"
                                  ?<select style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark,background:C.white}}><option>Erkak</option><option>Ayol</option></select>
                                  :<input placeholder={f.p} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}/>
                              }
                            </div>
                        ))}
                      </div>
                  )}
                  {step===1&&(
                      <div style={{animation:"fadeIn 0.2s ease"}}>
                        {[{l:"Email",p:"email@edu.uz",t:"email"},{l:"Parol",p:"Parol kiriting",t:"password"},{l:"Parolni tasdiqlash",p:"Qaytaring",t:"password"}].map(f=>(
                            <div key={f.l} style={{marginBottom:12}}>
                              <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:5,textTransform:"uppercase"}}>{f.l}</div>
                              <input type={f.t} placeholder={f.p} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}/>
                            </div>
                        ))}
                      </div>
                  )}
                  {step===2&&(
                      <div style={{textAlign:"center",padding:"16px 0",animation:"fadeIn 0.2s ease"}}>
                        <div style={{width:64,height:64,borderRadius:16,background:C.lightBlue,
                          display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
                          <Ico d={I.mail} size={28} color={C.bright}/>
                        </div>
                        <h4 style={{fontSize:16,fontWeight:700,color:C.dark,marginBottom:6}}>Emailni tasdiqlang</h4>
                        <p style={{fontSize:13,color:C.mid,lineHeight:1.6,marginBottom:16}}>email@edu.uz manziliga tasdiqlash kodi yuborildi.</p>
                        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                          {[1,2,3,4].map(i=>(
                              <input key={i} maxLength={1}
                                     style={{width:50,height:54,borderRadius:12,border:`2px solid ${C.gray}`,
                                       textAlign:"center",fontSize:22,fontWeight:700,color:C.bright,background:C.lightGray}}
                                     onFocus={e=>{e.target.style.borderColor=C.bright;e.target.style.background=C.white;}}
                                     onBlur={e=>{e.target.style.borderColor=C.gray;e.target.style.background=C.lightGray;}}/>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
                <div style={{padding:"14px 24px",borderTop:`1px solid ${C.lightGray}`,
                  display:"flex",gap:10,justifyContent:"space-between"}}>
                  <button onClick={()=>{if(step>0)setStep(s=>s-1);else closeModal();}}
                          style={{padding:"9px 20px",borderRadius:10,border:`1px solid ${C.gray}`,
                            cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                            background:C.white,color:C.mid}}>
                    {step===0?"Bekor":"← Orqaga"}
                  </button>
                  <button onClick={()=>{if(step<2)setStep(s=>s+1);else{closeModal();add("Ro'yxatdan o'tildi!","success");}}}
                          style={{padding:"9px 24px",borderRadius:10,border:"none",cursor:"pointer",
                            fontFamily:"inherit",fontSize:13,fontWeight:700,
                            background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white}}>
                    {step<2?"Keyingi →":"Yakunlash ✓"}
                  </button>
                </div>
              </div>
            </Overlay>
        )}

        {/* UPLOAD */}
        {modal==="upload" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,padding:28,width:440,
                boxShadow:"0 24px 60px rgba(13,26,99,0.18)",animation:"fadeUp 0.3s ease"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                  <h3 style={{fontSize:17,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Fayl yuklash</h3>
                  <CloseBtn onClick={closeModal}/>
                </div>
                <div style={{border:`2px dashed ${loading?C.bright:C.gray}`,borderRadius:14,
                  padding:"28px 20px",textAlign:"center",
                  background:loading?C.lightBlue:C.lightGray,marginBottom:18,transition:"all 0.3s"}}>
                  <div style={{width:52,height:52,borderRadius:14,background:C.white,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    margin:"0 auto 12px",boxShadow:"0 2px 8px rgba(13,26,99,0.08)"}}>
                    <Ico d={I.upload} size={24} color={loading?C.bright:C.light}/>
                  </div>
                  {loading ? (
                      <div>
                        <div style={{fontSize:14,fontWeight:600,color:C.bright,marginBottom:8}}>
                          Yuklanmoqda... {Math.round(progress)}%
                        </div>
                        <div style={{width:"100%",height:8,borderRadius:4,background:C.gray,overflow:"hidden",marginBottom:4}}>
                          <div style={{height:"100%",width:`${progress}%`,borderRadius:4,transition:"width 0.2s",
                            background:`linear-gradient(90deg,${C.bright},${C.orange})`}}/>
                        </div>
                      </div>
                  ) : (
                      <>
                        <div style={{fontSize:14,fontWeight:600,color:C.dark,marginBottom:4}}>Faylni tortib tashlang yoki tanlang</div>
                        <div style={{fontSize:12,color:C.light}}>PDF, DOC, PNG (max 10MB)</div>
                      </>
                  )}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={simulateLoading} disabled={loading}
                          style={{flex:2,padding:"10px",borderRadius:10,border:"none",
                            cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,
                            background:loading?C.lightGray:`linear-gradient(135deg,${C.bright},${C.blue})`,
                            color:loading?C.light:C.white,transition:"all 0.2s"}}>
                    {loading?"Yuklanmoqda...":"Yuklashni boshlash"}
                  </button>
                  <button onClick={closeModal}
                          style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.gray}`,
                            cursor:"pointer",fontFamily:"inherit",fontSize:13,background:C.white,color:C.mid}}>
                    Bekor
                  </button>
                </div>
              </div>
            </Overlay>
        )}

        {/* DELETE */}
        {modal==="delete" && (
            <Overlay onClick={closeModal}>
              <div style={{background:C.white,borderRadius:20,padding:28,width:400,
                boxShadow:"0 24px 60px rgba(220,38,38,0.2)",animation:"shake 0.4s ease",
                border:`2px solid ${C.red}20`}}>
                <div style={{textAlign:"center",marginBottom:20}}>
                  <div style={{width:72,height:72,borderRadius:"50%",background:C.redLight,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    margin:"0 auto 14px",border:`3px solid ${C.red}20`}}>
                    <Ico d={I.warn} size={32} color={C.red}/>
                  </div>
                  <h3 style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:8}}>Xavfli amal!</h3>
                  <p style={{fontSize:13,color:C.mid,lineHeight:1.6}}>
                    Siz <b>87 ta talaba</b> va <b>24 ta fan</b> ma'lumotlarini o'chirmoqchisiz.
                  </p>
                </div>
                <div style={{background:C.redLight,borderRadius:10,padding:"10px 14px",
                  marginBottom:20,border:`1px solid ${C.red}20`}}>
                  <div style={{fontSize:12,color:C.red,fontWeight:600,marginBottom:6}}>
                    Tasdiqlash uchun quyidagini yozing: <b>o'chiraman</b>
                  </div>
                  <input
                      value={deleteInput}
                      onChange={e => setDeleteInput(e.target.value)}
                      placeholder="o'chiraman"
                      style={{width:"100%",padding:"8px 12px",borderRadius:8,
                        border:`1.5px solid ${deleteInput==="o'chiraman"?C.red:C.gray}`,
                        fontSize:13,color:C.dark,background:C.white,transition:"border-color 0.2s"}}
                  />
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{closeModal();add("Amal bekor qilindi","info");setDeleteInput("");}}
                          style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.gray}`,
                            cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,
                            background:C.white,color:C.mid}}>
                    Bekor qilish
                  </button>
                  <button
                      disabled={deleteInput !== "o'chiraman"}
                      onClick={()=>{closeModal();add("Barcha ma'lumotlar o'chirildi","success");setDeleteInput("");}}
                      style={{flex:2,padding:"10px",borderRadius:10,border:"none",
                        cursor:deleteInput==="o'chiraman"?"pointer":"not-allowed",
                        fontFamily:"inherit",fontSize:13,fontWeight:700,transition:"all 0.2s",
                        background:deleteInput==="o'chiraman"
                            ?`linear-gradient(135deg,${C.red},#ef4444)`
                            :C.lightGray,
                        color:deleteInput==="o'chiraman"?C.white:C.light}}>
                    Ha, barchasini o'chiraman
                  </button>
                </div>
              </div>
            </Overlay>
        )}

        {/* DRAWER */}
        {drawerOpen && (
            <div style={{position:"fixed",inset:0,zIndex:1000,animation:"fadeIn 0.2s"}}>
              <div style={{position:"absolute",inset:0,background:"rgba(13,26,99,0.4)",backdropFilter:"blur(3px)"}}
                   onClick={()=>setDrawerOpen(false)}/>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:320,background:C.white,
                boxShadow:"8px 0 40px rgba(13,26,99,0.15)",animation:"slideLeft 0.3s ease",
                display:"flex",flexDirection:"column"}}>
                <div style={{padding:"18px 20px",background:`linear-gradient(135deg,${C.navy},${C.blue})`,
                  display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <h3 style={{fontSize:16,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>Tezkor panel</h3>
                  <button onClick={()=>setDrawerOpen(false)}
                          style={{width:30,height:30,borderRadius:8,border:"none",
                            background:"rgba(255,255,255,0.15)",cursor:"pointer",
                            display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={I.x} size={15} color={C.white}/>
                  </button>
                </div>
                <div style={{flex:1,overflowY:"auto",padding:16}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>Tez harakatlar</div>
                  {[
                    {i:I.user,l:"Yangi talaba qo'shish",c:C.bright},
                    {i:I.bell,l:"Bildirishnoma yuborish",c:C.orange},
                    {i:I.mail,l:"Email xabar",c:C.green},
                    {i:I.settings,l:"Tizim sozlamalari",c:C.purple},
                    {i:I.star,l:"Hisobot yaratish",c:C.yellow},
                    {i:I.lock,l:"Xavfsizlik",c:C.red},
                  ].map((item,i)=>(
                      <button key={i}
                              onClick={()=>{setDrawerOpen(false);add(`${item.l} bajarildi`,"success");}}
                              style={{width:"100%",display:"flex",alignItems:"center",gap:12,
                                padding:"11px 14px",borderRadius:10,border:"none",cursor:"pointer",
                                fontFamily:"inherit",fontSize:13,fontWeight:600,background:C.white,
                                color:C.dark,textAlign:"left",marginBottom:6,transition:"all 0.15s"}}
                              onMouseEnter={e=>e.currentTarget.style.background=C.lightGray}
                              onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                        <div style={{width:36,height:36,borderRadius:9,background:`${item.c}12`,
                          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Ico d={item.i} size={16} color={item.c}/>
                        </div>
                        {item.l}
                      </button>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* BOTTOM SHEET */}
        {bottomSheet && (
            <div style={{position:"fixed",inset:0,zIndex:1000,animation:"fadeIn 0.2s"}}>
              <div style={{position:"absolute",inset:0,background:"rgba(13,26,99,0.4)",backdropFilter:"blur(3px)"}}
                   onClick={()=>setBottomSheet(false)}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:C.white,
                borderRadius:"20px 20px 0 0",boxShadow:"0 -8px 40px rgba(13,26,99,0.15)",
                animation:"slideUpIn 0.3s ease",padding:"0 0 20px"}}>
                <div style={{width:40,height:4,borderRadius:2,background:C.gray,margin:"12px auto 16px"}}/>
                <div style={{padding:"0 20px 10px",borderBottom:`1px solid ${C.lightGray}`,
                  marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif"}}>Amallar</h3>
                  <button onClick={()=>setBottomSheet(false)}
                          style={{width:30,height:30,borderRadius:8,border:"none",background:C.lightGray,
                            cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Ico d={I.x} size={14} color={C.mid}/>
                  </button>
                </div>
                <div style={{padding:"0 14px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                  {[
                    {i:I.save,l:"Saqlash",c:C.bright},{i:I.img,l:"Rasm",c:C.orange},
                    {i:I.upload,l:"Yuklash",c:C.green},{i:I.star,l:"Sevimli",c:C.yellow},
                    {i:I.mail,l:"Yuborish",c:C.purple},{i:I.user,l:"Profil",c:C.blue},
                    {i:I.settings,l:"Sozlama",c:C.mid},{i:I.trash,l:"O'chirish",c:C.red},
                  ].map((item,i)=>(
                      <button key={i}
                              onClick={()=>{setBottomSheet(false);add(`${item.l} tanlandi`,"info");}}
                              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7,
                                padding:"14px 8px",borderRadius:12,border:"none",cursor:"pointer",
                                fontFamily:"inherit",fontSize:11,fontWeight:600,
                                background:C.white,color:C.mid,transition:"all 0.15s"}}
                              onMouseEnter={e=>{e.currentTarget.style.background=`${item.c}10`;e.currentTarget.style.color=item.c;}}
                              onMouseLeave={e=>{e.currentTarget.style.background=C.white;e.currentTarget.style.color=C.mid;}}>
                        <div style={{width:44,height:44,borderRadius:12,background:`${item.c}12`,
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <Ico d={item.i} size={20} color={item.c}/>
                        </div>
                        {item.l}
                      </button>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* LIGHTBOX */}
        {lightbox && (
            <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.9)",
              display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.2s"}}
                 onClick={()=>setLightbox(false)}>
              <div style={{textAlign:"center",padding:20}}>
                <div style={{width:"min(500px,80vw)",aspectRatio:"16/9",
                  background:`linear-gradient(135deg,${C.navy},${C.blue})`,borderRadius:16,
                  display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
                  <div style={{textAlign:"center",color:"rgba(255,255,255,0.4)"}}>
                    <Ico d={I.img} size={60} color="rgba(255,255,255,0.2)"/>
                    <div style={{fontSize:13,marginTop:8}}>Rasm namunasi</div>
                  </div>
                </div>
                <div style={{color:"rgba(255,255,255,0.6)",fontSize:13}}>Kurs banner rasmi · 1920×1080</div>
                <button onClick={e=>{e.stopPropagation();setLightbox(false);}}
                        style={{marginTop:16,padding:"8px 20px",borderRadius:9,border:"none",
                          background:"rgba(255,255,255,0.15)",color:C.white,fontSize:13,
                          cursor:"pointer",fontFamily:"inherit"}}>
                  Yopish
                </button>
              </div>
            </div>
        )}
      </>
  );
}