import { useState, useRef, useCallback, useEffect } from "react";

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
  html, body { height:100%; }
  body { font-family:'DM Sans',sans-serif; background:${C.lightGray}; }
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideInLeft{from{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideInRight{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
  @keyframes toast-enter{from{opacity:0;transform:translateX(110%)}to{opacity:1;transform:translateX(0)}}
  @keyframes progress{from{width:100%}to{width:0%}}
  button,input,textarea,select{font-family:'DM Sans',sans-serif}
  input:focus,textarea:focus{outline:none}
  .mail-row:hover{background:${C.lightGray}!important}
  .nav-item:hover{background:${C.lightBlue}!important;color:${C.bright}!important}
  .nav-item.active{background:${C.lightBlue}!important;color:${C.bright}!important}
  .action-btn:hover{background:${C.lightGray}!important}
  .bottom-tab.active{color:${C.bright}!important}
`;

/* ── ICONS ── */
const Ico = ({d,size=16,color="currentColor",fill="none",sw=2})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
         style={{flexShrink:0,display:"block"}}>
      <path d={d}/>
    </svg>
);

const I = {
  inbox:    "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
  sent:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  draft:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4h6v2",
  spam:     "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  compose:  "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  reply:    "M9 17H5a2 2 0 0 0-2 2v2M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4M21 3h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM3 12l3-3-3-3",
  replyAll: "M7 17l-4-4 4-4M3 13h10a4 4 0 0 1 4 4v2M11 17l-4-4 4-4",
  forward:  "M17 7l4 4-4 4M3 11h18",
  archive:  "M21 8v13H3V8M1 3h22v5H1zM10 12h4",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  attach:   "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
  more:     "M12 5h.01M12 12h.01M12 19h.01",
  close:    "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  chevronD: "M6 9l6 6 6-6",
  chevronL: "M15 18l-6-6 6-6",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  send:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  image:    "M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM21 15l-5-5L5 21",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  menu:     "M3 12h18M3 6h18M3 18h18",
  plus:     "M12 5v14M5 12h14",
};

/* ── DATA ── */
const FOLDERS = [
  {id:"inbox",   label:"Kiruvchi",    icon:I.inbox,  count:12},
  {id:"sent",    label:"Yuborilgan",  icon:I.sent,   count:0},
  {id:"drafts",  label:"Qoralamalar", icon:I.draft,  count:3},
  {id:"starred", label:"Yulduzli",    icon:I.star,   count:5},
  {id:"spam",    label:"Spam",        icon:I.spam,   count:2},
  {id:"trash",   label:"O'chirilgan", icon:I.trash,  count:0},
];
const LABELS = [
  {id:"work",    label:"Ish",         color:C.bright},
  {id:"study",   label:"Ta'lim",      color:C.green},
  {id:"urgent",  label:"Shoshilinch", color:C.red},
  {id:"personal",label:"Shaxsiy",     color:C.purple},
];
const AVATARS = {
  "AQ":C.bright,"SM":C.orange,"DK":C.green,"NR":C.purple,
  "ZT":C.red,"BH":C.yellow,"FY":C.navy,"MO":C.mid,
};
const MAILS = [
  {id:1,from:"Alisher Qodirov",email:"alisher@edu.uz",avatar:"AQ",
    subject:"Kurs loyihasi haqida muhokama",
    preview:"Salom! Loyihamizning keyingi bosqichi haqida muhokama qilmoqchi edim.",
    body:`<p>Salom!</p><p>Loyihamizning keyingi bosqichi haqida muhokama qilmoqchi edim. Bugun kechqurun erkin vaqtingiz bormi?</p><p>Asosan <strong>frontend qism</strong>i haqida gaplashmoqchi edim — dizayn sistemasini to'liq ko'rib chiqishimiz kerak.</p><blockquote>Agar bugun bo'lmasa, ertaga ham bo'ladi. Lekin iloji boricha tez hal qilsak yaxshi bo'ladi.</blockquote><p>Kutib qolaman!</p>`,
    time:"10:45",date:"Bugun",unread:true,starred:true,label:"work",
    attachments:[{name:"loyiha_brief.pdf",size:"2.4 MB"},{name:"dizayn.fig",size:"8.1 MB"}]},
  {id:2,from:"Sarvinoz Mirzayeva",email:"sarvinoz@univ.uz",avatar:"SM",
    subject:"Imtihon jadvali o'zgardi",
    preview:"Hurmatli talabalar, e'tiboringizga yetkazamizki, kelgusi haftadagi imtihon...",
    body:`<p>Hurmatli talabalar,</p><p>E'tiboringizga yetkazamizki, kelgusi haftadagi imtihon jadvali <strong>o'zgardi</strong>.</p><ul><li>Matematika: Dushanba, 09:00</li><li>Fizika: Seshanba, 11:00</li><li>Ingliz tili: Chorshanba, 14:00</li></ul>`,
    time:"09:20",date:"Bugun",unread:true,starred:false,label:"study",attachments:[]},
  {id:3,from:"Dilshod Karimov",email:"dilshod@corp.uz",avatar:"DK",
    subject:"Shartnoma imzolash to'g'risida",
    preview:"Assalomu alaykum! Sizning kompaniyangiz bilan hamkorlik haqida...",
    body:`<p>Assalomu alaykum!</p><p>Sizning kompaniyangiz bilan hamkorlik qilish imkoniyati haqida gaplashmoqchi edim.</p><p>Agar qulay bo'lsa, <strong>ertaga soat 15:00</strong>da ofisimizda uchrashsak bo'ladi.</p>`,
    time:"Kecha",date:"Kecha",unread:false,starred:true,label:"work",
    attachments:[{name:"shartnoma_loyiha.docx",size:"560 KB"}]},
  {id:4,from:"Nilufar Rashidova",email:"nilufar@mail.uz",avatar:"NR",
    subject:"Tug'ilgan kuningiz bilan!",
    preview:"Hurmatli do'stim! Bugun sizning bayramingiz — tug'ilgan kuningiz bilan...",
    body:`<p>Hurmatli do'stim!</p><p>Bugun sizning bayramingiz — <strong>tug'ilgan kuningiz</strong> bilan chinakam tabriklayman! 🎉</p><p>Sizga sog'lik, baxt va omad tilayman.</p>`,
    time:"12 Mar",date:"12 Mar",unread:false,starred:false,label:"personal",attachments:[]},
  {id:5,from:"Zafar Toshmatov",email:"zafar@edu.uz",avatar:"ZT",
    subject:"[SPAM] Ajoyib taklifimiz!!!",
    preview:"Siz tanlangan 100 kishidan birisiz! Hoziroq bosing va 1,000,000 so'm...",
    body:`<p>Siz tanlangan 100 kishidan birisiz! Hoziroq bosing!!!</p>`,
    time:"10 Mar",date:"10 Mar",unread:true,starred:false,label:"urgent",attachments:[]},
  {id:6,from:"Bobur Hasanov",email:"bobur@tech.uz",avatar:"BH",
    subject:"Yangi texnologiyalar seminari",
    preview:"Keyingi oyda bo'lib o'tadigan seminar haqida ma'lumot. React va Next.js...",
    body:`<p>Salom!</p><p>Keyingi oyda bo'lib o'tadigan seminar haqida:</p><ul><li>React 19 yangiliklari</li><li>Next.js App Router</li><li>TypeScript best practices</li></ul>`,
    time:"8 Mar",date:"8 Mar",unread:false,starred:false,label:"study",
    attachments:[{name:"seminar_dastur.pdf",size:"1.2 MB"}]},
  {id:7,from:"Feruza Yusupova",email:"feruza@admin.uz",avatar:"FY",
    subject:"Hisobot topshirish muddati",
    preview:"Eslatma: oylik hisobotingizni topshirish muddati yaqinlashmoqda...",
    body:`<p>Hurmatli xodim,</p><p>Oylik hisobotni topshirish muddati <strong>15-mart</strong> — 3 kun qoldi.</p>`,
    time:"7 Mar",date:"7 Mar",unread:false,starred:false,label:"work",attachments:[]},
  {id:8,from:"Mansur Ortiqov",email:"mansur@uni.uz",avatar:"MO",
    subject:"Guruh uchrashuvi haqida",
    preview:"Hamma e'tibor! Keyingi dushanba kuni guruh uchrashuvi bo'lib o'tadi...",
    body:`<p>Hamma e'tibor!</p><p>Keyingi <strong>dushanba kuni soat 14:00</strong>da guruh uchrashuvi. Qatnashish majburiy.</p>`,
    time:"5 Mar",date:"5 Mar",unread:false,starred:true,label:"study",attachments:[]},
];

/* ── HOOKS ── */
function useWindowWidth(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1024);
  useEffect(()=>{
    const fn=()=>setW(window.innerWidth);
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);
  return w;
}

let _tid=0;
function useToasts(){
  const [toasts,setToasts]=useState([]);
  const add=useCallback((msg,type="success",dur=3500)=>{
    const id=++_tid;
    setToasts(p=>[...p,{id,msg,type,dur}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),dur);
  },[]);
  const remove=useCallback(id=>setToasts(p=>p.filter(t=>t.id!==id)),[]);
  return{toasts,add,remove};
}

/* ── SMALL ATOMS ── */
const TCFG={
  success:{border:C.green,bg:C.greenLight,ic:C.green,icon:I.check},
  error:{border:C.red,bg:C.redLight,ic:C.red,icon:I.close},
  info:{border:C.bright,bg:C.lightBlue,ic:C.bright,icon:I.inbox},
  warning:{border:C.yellow,bg:C.yellowLight,ic:C.yellow,icon:I.spam},
};
const Toast=({t,onRemove})=>{
  const cfg=TCFG[t.type]||TCFG.info;
  return(
      <div style={{background:C.white,border:`1px solid ${C.gray}`,borderLeft:`4px solid ${cfg.border}`,
        borderRadius:12,padding:"11px 13px",width:290,boxShadow:"0 8px 28px rgba(13,26,99,0.11)",
        display:"flex",gap:10,alignItems:"flex-start",animation:"toast-enter 0.3s ease",
        position:"relative",overflow:"hidden"}}>
        <div style={{width:28,height:28,borderRadius:7,background:cfg.bg,display:"flex",
          alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ico d={cfg.icon} size={13} color={cfg.ic}/>
        </div>
        <div style={{flex:1,fontSize:12,color:C.mid,lineHeight:1.4,paddingTop:4}}>{t.msg}</div>
        <button onClick={()=>onRemove(t.id)} style={{width:18,height:18,borderRadius:4,border:"none",
          background:C.lightGray,cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",flexShrink:0,marginTop:2}}>
          <Ico d={I.close} size={10} color={C.light}/>
        </button>
        <div style={{position:"absolute",bottom:0,left:0,height:2,background:cfg.border,
          animation:`progress ${t.dur}ms linear forwards`,borderRadius:2}}/>
      </div>
  );
};

const Avatar=({initials,size=36})=>{
  const bg=AVATARS[initials]||C.mid;
  return(
      <div style={{width:size,height:size,borderRadius:size/2.8,flexShrink:0,
        background:`${bg}18`,border:`1.5px solid ${bg}30`,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:size*0.33,fontWeight:700,color:bg,fontFamily:"'Syne',sans-serif"}}>{initials}</span>
      </div>
  );
};

const LabelBadge=({labelId})=>{
  const lbl=LABELS.find(l=>l.id===labelId);
  if(!lbl)return null;
  return(
      <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,
        background:`${lbl.color}14`,color:lbl.color,flexShrink:0,whiteSpace:"nowrap"}}>
      {lbl.label}
    </span>
  );
};

/* ── COMPOSE MODAL ── */
const ComposeModal=({onClose,onSend,isMobile})=>{
  const [to,setTo]=useState("");
  const [subject,setSubject]=useState("");
  const [body,setBody]=useState("");
  const inp={width:"100%",padding:"8px 0",border:"none",
    borderBottom:`1px solid ${C.gray}`,fontSize:13,color:C.dark,
    background:"transparent",transition:"border-color 0.2s"};

  if(isMobile) return(
      <div style={{position:"fixed",inset:0,zIndex:2000,background:C.white,
        display:"flex",flexDirection:"column",animation:"slideInRight 0.25s ease"}}>
        <div style={{padding:"12px 16px",background:`linear-gradient(135deg,${C.navy},${C.blue})`,
          display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,
          paddingTop:"max(12px,env(safe-area-inset-top))"}}>
          <button onClick={onClose} style={{width:34,height:34,borderRadius:9,border:"none",
            background:"rgba(255,255,255,0.15)",cursor:"pointer",display:"flex",
            alignItems:"center",justifyContent:"center"}}>
            <Ico d={I.close} size={15} color={C.white}/>
          </button>
          <span style={{fontSize:15,fontWeight:700,color:C.white,fontFamily:"'Syne',sans-serif"}}>
          Yangi xabar
        </span>
          <button onClick={()=>onSend("send")}
                  style={{padding:"8px 16px",borderRadius:9,border:"none",
                    background:`linear-gradient(135deg,${C.orange},#ff9f6a)`,
                    color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",
                    display:"flex",alignItems:"center",gap:5}}>
            <Ico d={I.send} size={13} color={C.white}/>
            Yuborish
          </button>
        </div>
        <div style={{padding:"12px 16px 0",borderBottom:`1px solid ${C.lightGray}`}}>
          {[{l:"Kimga",v:to,s:setTo,p:"email@misol.uz"},
            {l:"Mavzu",v:subject,s:setSubject,p:"Xabar mavzusi..."}].map(f=>(
              <div key={f.l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <span style={{fontSize:11,fontWeight:600,color:C.light,width:44,flexShrink:0,
              textTransform:"uppercase"}}>{f.l}</span>
                <input value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p}
                       style={{...inp}} onFocus={e=>e.target.style.borderBottomColor=C.bright}
                       onBlur={e=>e.target.style.borderBottomColor=C.gray}/>
              </div>
          ))}
        </div>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Xabar matni..."
                  style={{flex:1,border:"none",resize:"none",padding:"14px 16px",fontSize:14,
                    color:C.dark,lineHeight:1.7,background:C.white,fontFamily:"'DM Sans',sans-serif"}}/>
        <div style={{padding:"10px 16px",borderTop:`1px solid ${C.lightGray}`,
          display:"flex",gap:6,background:C.white,
          paddingBottom:"max(10px,env(safe-area-inset-bottom))"}}>
          {[I.attach,I.image,I.tag].map((d,i)=>(
              <button key={i} className="action-btn"
                      style={{width:36,height:36,border:"none",borderRadius:9,cursor:"pointer",
                        background:C.lightGray,color:C.mid,display:"flex",alignItems:"center",
                        justifyContent:"center"}}>
                <Ico d={d} size={17}/>
              </button>
          ))}
          <div style={{flex:1}}/>
          <button onClick={()=>onSend("draft")}
                  style={{padding:"8px 16px",borderRadius:9,border:`1px solid ${C.gray}`,
                    background:C.white,color:C.mid,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            Qoralama
          </button>
        </div>
      </div>
  );

  return(
      <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"flex-end",
        justifyContent:"flex-end",padding:"0 24px 24px 0",pointerEvents:"none"}}>
        <div style={{width:520,borderRadius:16,background:C.white,pointerEvents:"all",
          boxShadow:"0 24px 60px rgba(13,26,99,0.2)",animation:"slideUp 0.3s ease",
          border:`1px solid ${C.gray}`,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",background:`linear-gradient(135deg,${C.navy},${C.blue})`,
            display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:14,fontWeight:700,color:C.white,fontFamily:"'Syne',sans-serif"}}>Yangi xabar</span>
            <button onClick={onClose} style={{width:26,height:26,borderRadius:7,border:"none",
              background:"rgba(255,255,255,0.15)",cursor:"pointer",display:"flex",
              alignItems:"center",justifyContent:"center"}}>
              <Ico d={I.close} size={13} color={C.white}/>
            </button>
          </div>
          <div style={{padding:"12px 16px 0"}}>
            {[{l:"Kimga",v:to,s:setTo,p:"email@misol.uz"},
              {l:"Mavzu",v:subject,s:setSubject,p:"Xabar mavzusi..."}].map(f=>(
                <div key={f.l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <span style={{fontSize:11,fontWeight:600,color:C.light,width:48,flexShrink:0,
                textTransform:"uppercase"}}>{f.l}</span>
                  <input value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p}
                         style={{...inp}} onFocus={e=>e.target.style.borderBottomColor=C.bright}
                         onBlur={e=>e.target.style.borderBottomColor=C.gray}/>
                </div>
            ))}
          </div>
          <div style={{padding:"8px 16px 0"}}>
          <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Xabar matni..."
                    style={{width:"100%",minHeight:180,border:"none",resize:"none",
                      fontSize:13,color:C.dark,lineHeight:1.7,background:"transparent",
                      fontFamily:"'DM Sans',sans-serif"}}/>
          </div>
          <div style={{padding:"10px 16px",borderTop:`1px solid ${C.lightGray}`,
            display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:4}}>
              {[I.attach,I.image,I.tag].map((d,i)=>(
                  <button key={i} className="action-btn"
                          style={{width:30,height:30,border:"none",borderRadius:7,cursor:"pointer",
                            background:"transparent",color:C.light,display:"flex",alignItems:"center",
                            justifyContent:"center",transition:"all 0.15s"}}>
                    <Ico d={d} size={15}/>
                  </button>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>onSend("draft")}
                      style={{padding:"7px 14px",borderRadius:9,border:`1px solid ${C.gray}`,
                        background:C.white,color:C.mid,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                Qoralama
              </button>
              <button onClick={()=>onSend("send")}
                      style={{padding:"7px 16px",borderRadius:9,border:"none",
                        background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,
                        fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",
                        alignItems:"center",gap:6,boxShadow:`0 3px 12px ${C.bright}30`}}>
                <Ico d={I.send} size={13} color={C.white}/>
                Yuborish
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

/* ── MAIL ROW ── */
const MailRow=({mail,selected,onClick,onStar,onCheck,checked,isMobile})=>(
    <div className={`mail-row`} onClick={onClick}
         style={{display:"flex",alignItems:"center",gap:10,
           padding:isMobile?"12px 14px":"11px 16px",cursor:"pointer",
           background:selected?C.lightBlue:C.white,
           borderLeft:`3px solid ${selected?C.bright:"transparent"}`,
           borderBottom:`1px solid ${C.lightGray}`,transition:"all 0.15s"}}>
      {!isMobile&&(
          <div onClick={e=>{e.stopPropagation();onCheck(mail.id);}}
               style={{width:16,height:16,borderRadius:4,
                 border:`1.5px solid ${checked?C.bright:C.gray}`,
                 background:checked?C.bright:"transparent",flexShrink:0,cursor:"pointer",
                 display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
            {checked&&<Ico d={I.check} size={10} color={C.white} sw={2.5}/>}
          </div>
      )}
      <div onClick={e=>{e.stopPropagation();onStar(mail.id);}}
           style={{flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center"}}>
        <Ico d={I.star} size={isMobile?14:14}
             color={mail.starred?C.yellow:C.gray} fill={mail.starred?C.yellow:"none"}/>
      </div>
      <Avatar initials={mail.avatar} size={isMobile?38:34}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
        <span style={{fontSize:13,fontWeight:mail.unread?700:500,color:C.dark,
          whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:160}}>
          {mail.from}
        </span>
          <span style={{fontSize:11,color:C.light,flexShrink:0,marginLeft:6}}>{mail.time}</span>
        </div>
        <div style={{fontSize:12,fontWeight:mail.unread?600:400,color:mail.unread?C.dark:C.mid,
          whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:2}}>
          {mail.subject}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6}}>
        <span style={{fontSize:11,color:C.light,whiteSpace:"nowrap",overflow:"hidden",
          textOverflow:"ellipsis",flex:1}}>
          {mail.preview}
        </span>
          <LabelBadge labelId={mail.label}/>
        </div>
      </div>
    </div>
);

/* ── MAIL DETAIL ── */
const MailDetail=({mail,onClose,onReply,onStar,onArchive,onTrash,isMobile})=>(
    <div style={{display:"flex",flexDirection:"column",height:"100%",
      animation:isMobile?"slideInRight 0.25s ease":"fadeIn 0.2s ease",background:C.white}}>
      {/* Header */}
      <div style={{padding:isMobile?"0 14px":"14px 20px",
        minHeight:isMobile?56:54,
        background:isMobile?`linear-gradient(135deg,${C.navy},${C.blue})`:C.white,
        borderBottom:isMobile?"none":`1px solid ${C.lightGray}`,
        display:"flex",alignItems:"center",gap:8,flexShrink:0,
        paddingTop:isMobile?"max(14px,env(safe-area-inset-top))":"14px"}}>
        <button onClick={onClose} className="action-btn"
                style={{width:34,height:34,border:"none",borderRadius:9,cursor:"pointer",
                  background:isMobile?"rgba(255,255,255,0.15)":C.lightGray,
                  color:isMobile?C.white:C.mid,display:"flex",alignItems:"center",
                  justifyContent:"center",transition:"all 0.15s",flexShrink:0}}>
          <Ico d={isMobile?I.chevronL:I.close} size={15} color={isMobile?C.white:C.mid}/>
        </button>
        {isMobile&&(
            <span style={{flex:1,fontSize:14,fontWeight:700,color:C.white,
              fontFamily:"'Syne',sans-serif",whiteSpace:"nowrap",overflow:"hidden",
              textOverflow:"ellipsis"}}>
          {mail.subject}
        </span>
        )}
        {!isMobile&&<div style={{flex:1}}/>}
        {[
          {d:I.archive,fn:onArchive,color:isMobile?"rgba(255,255,255,0.75)":C.light},
          {d:I.trash,  fn:onTrash,  color:isMobile?"rgba(255,255,255,0.75)":C.light},
          {d:I.star,   fn:()=>onStar(mail.id),
            fill:mail.starred?C.yellow:"none",
            color:mail.starred?C.yellow:(isMobile?"rgba(255,255,255,0.75)":C.light)},
          {d:I.more,   fn:()=>{},  color:isMobile?"rgba(255,255,255,0.75)":C.light},
        ].map((b,i)=>(
            <button key={i} onClick={b.fn} className="action-btn"
                    style={{width:34,height:34,border:"none",borderRadius:9,cursor:"pointer",
                      background:isMobile?"rgba(255,255,255,0.12)":"transparent",
                      display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
              <Ico d={b.d} size={15} fill={b.fill||"none"} color={b.color}/>
            </button>
        ))}
      </div>

      {/* Body */}
      <div style={{flex:1,overflowY:"auto",padding:isMobile?"16px 14px":"24px 28px"}}>
        {!isMobile&&(
            <h2 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",
              marginBottom:16,lineHeight:1.3}}>{mail.subject}</h2>
        )}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          marginBottom:isMobile?14:20,padding:"10px 12px",
          background:C.lightGray,borderRadius:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Avatar initials={mail.avatar} size={isMobile?36:40}/>
            <div>
              <div style={{fontSize:isMobile?13:14,fontWeight:700,color:C.dark}}>{mail.from}</div>
              <div style={{fontSize:11,color:C.light}}>{mail.email}</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:12,color:C.mid}}>{mail.date}</div>
            <div style={{fontSize:11,color:C.light}}>{mail.time}</div>
          </div>
        </div>
        <div style={{fontSize:14,color:C.mid,lineHeight:1.8}}
             dangerouslySetInnerHTML={{__html:mail.body}}/>
        {mail.attachments?.length>0&&(
            <div style={{marginTop:20}}>
              <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",
                letterSpacing:"1px",marginBottom:8}}>
                Biriktirmalar ({mail.attachments.length})
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {mail.attachments.map((a,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8,
                      padding:"8px 12px",borderRadius:10,border:`1.5px solid ${C.gray}`,
                      background:C.white,cursor:"pointer",transition:"all 0.15s"}}
                         onMouseEnter={e=>{e.currentTarget.style.borderColor=C.bright;e.currentTarget.style.background=C.lightBlue;}}
                         onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray;e.currentTarget.style.background=C.white;}}>
                      <Ico d={I.attach} size={13} color={C.bright}/>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:C.dark}}>{a.name}</div>
                        <div style={{fontSize:10,color:C.light}}>{a.size}</div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>

      {/* Reply bar */}
      <div style={{padding:isMobile?"10px 14px":"14px 20px",
        borderTop:`1px solid ${C.lightGray}`,
        display:"flex",gap:isMobile?6:8,flexShrink:0,background:C.white,
        paddingBottom:isMobile?"max(10px,env(safe-area-inset-bottom))":"14px"}}>
        {[
          {d:I.reply,   l:"Javob",        primary:true},
          {d:I.replyAll,l:"Hammasiga",    primary:false},
          {d:I.forward, l:"Yo'naltirish", primary:false},
        ].map((b,i)=>(
            <button key={i} onClick={()=>onReply(b.l)}
                    style={{flex:isMobile?1:undefined,
                      padding:isMobile?"9px 4px":"8px 16px",borderRadius:9,cursor:"pointer",
                      fontFamily:"inherit",fontSize:12,fontWeight:600,
                      display:"flex",alignItems:"center",justifyContent:"center",gap:5,
                      border:b.primary?"none":`1px solid ${C.gray}`,
                      background:b.primary?`linear-gradient(135deg,${C.bright},${C.blue})`:C.white,
                      color:b.primary?C.white:C.mid,
                      boxShadow:b.primary?`0 3px 10px ${C.bright}25`:"none",
                      transition:"all 0.2s"}}>
              <Ico d={b.d} size={13} color={b.primary?C.white:C.mid}/>
              {b.l}
            </button>
        ))}
      </div>
    </div>
);

/* ── SIDEBAR CONTENT ── */
const SidebarContent=({folder,setFolder,unread,onCompose,onClose,isMobile})=>(
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.white}}>
      <div style={{padding:"14px 14px 10px",
        background:`linear-gradient(135deg,${C.navy},${C.blue})`,
        paddingTop:isMobile?"max(14px,env(safe-area-inset-top))":"14px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontSize:16,fontWeight:800,color:C.white,fontFamily:"'Syne',sans-serif"}}>
          📬 EduMail
        </span>
          {isMobile?(
              <button onClick={onClose}
                      style={{width:30,height:30,borderRadius:8,border:"none",
                        background:"rgba(255,255,255,0.15)",cursor:"pointer",display:"flex",
                        alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.close} size={14} color={C.white}/>
              </button>
          ):(
              <button className="action-btn"
                      style={{width:28,height:28,borderRadius:7,border:"none",
                        background:"rgba(255,255,255,0.15)",cursor:"pointer",display:"flex",
                        alignItems:"center",justifyContent:"center"}}>
                <Ico d={I.settings} size={13} color={C.white}/>
              </button>
          )}
        </div>
        <button onClick={onCompose}
                style={{width:"100%",padding:"9px",borderRadius:10,border:"none",cursor:"pointer",
                  background:`linear-gradient(135deg,${C.orange},#ff9f6a)`,color:C.white,
                  fontSize:13,fontWeight:700,fontFamily:"inherit",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                  boxShadow:"0 4px 14px rgba(246,128,72,0.38)"}}>
          <Ico d={I.compose} size={14} color={C.white}/>
          Yangi xabar
        </button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"10px 8px"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",
          letterSpacing:"1px",marginBottom:6,paddingLeft:6}}>Papkalar</div>
        {FOLDERS.map(f=>(
            <button key={f.id} className={`nav-item${folder===f.id?" active":""}`}
                    onClick={()=>{setFolder(f.id);onClose?.();}}
                    style={{width:"100%",display:"flex",alignItems:"center",gap:10,
                      padding:"9px 10px",borderRadius:9,border:"none",cursor:"pointer",
                      background:"transparent",color:folder===f.id?C.bright:C.mid,
                      fontSize:13,fontWeight:folder===f.id?700:500,textAlign:"left",
                      marginBottom:2,transition:"all 0.15s",fontFamily:"inherit"}}>
              <Ico d={f.icon} size={15} color={folder===f.id?C.bright:C.light}/>
              <span style={{flex:1,whiteSpace:"nowrap"}}>{f.label}</span>
              {(f.id==="inbox"?unread:f.count)>0&&(
                  <span style={{fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:20,
                    background:folder===f.id?C.bright:C.lightBlue,
                    color:folder===f.id?C.white:C.bright}}>
              {f.id==="inbox"?unread:f.count}
            </span>
              )}
            </button>
        ))}
        <div style={{fontSize:10,fontWeight:700,color:C.light,textTransform:"uppercase",
          letterSpacing:"1px",margin:"12px 0 6px",paddingLeft:6}}>Teglar</div>
        {LABELS.map(l=>(
            <button key={l.id} className="nav-item"
                    style={{width:"100%",display:"flex",alignItems:"center",gap:10,
                      padding:"8px 10px",borderRadius:9,border:"none",cursor:"pointer",
                      background:"transparent",color:C.mid,fontSize:12,fontWeight:500,
                      textAlign:"left",marginBottom:2,transition:"all 0.15s",fontFamily:"inherit"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:l.color,flexShrink:0}}/>
              <span style={{flex:1}}>{l.label}</span>
            </button>
        ))}
      </div>
      <div style={{padding:"10px",borderTop:`1px solid ${C.lightGray}`,
        paddingBottom:isMobile?"max(10px,env(safe-area-inset-bottom))":"10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",
          borderRadius:10,background:C.lightGray}}>
          <Avatar initials="AQ" size={32}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:700,color:C.dark,
              whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
              Alisher Qodirov
            </div>
            <div style={{fontSize:10,color:C.light}}>alisher@edu.uz</div>
          </div>
          <Ico d={I.chevronD} size={13} color={C.light}/>
        </div>
      </div>
    </div>
);

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function MailboxPage(){
  const {toasts,add,remove}=useToasts();
  const width=useWindowWidth();
  const isMobile=width<768;

  const [mails,setMails]                = useState(MAILS);
  const [folder,setFolder]              = useState("inbox");
  const [selectedMail,setSelectedMail]  = useState(null);
  const [checkedIds,setCheckedIds]      = useState([]);
  const [search,setSearch]              = useState("");
  const [compose,setCompose]            = useState(false);
  const [sidebarOpen,setSidebarOpen]    = useState(true);
  const [mobileSidebar,setMobileSidebar]= useState(false);
  const [mobileView,setMobileView]      = useState("list"); // "list" | "detail"
  const [searchFocused,setSearchFocused]= useState(false);

  const unread=mails.filter(m=>m.unread).length;

  const toggleStar=id=>setMails(ms=>ms.map(m=>m.id===id?{...m,starred:!m.starred}:m));
  const toggleCheck=id=>setCheckedIds(ids=>ids.includes(id)?ids.filter(i=>i!==id):[...ids,id]);
  const toggleAll=()=>setCheckedIds(ids=>ids.length===mails.length?[]:mails.map(m=>m.id));

  const markRead=()=>{
    setMails(ms=>ms.map(m=>checkedIds.includes(m.id)?{...m,unread:false}:m));
    add(`${checkedIds.length} ta xabar o'qildi deb belgilandi`,"success");
    setCheckedIds([]);
  };
  const deleteChecked=()=>{
    setMails(ms=>ms.filter(m=>!checkedIds.includes(m.id)));
    if(selectedMail&&checkedIds.includes(selectedMail.id)){
      setSelectedMail(null);setMobileView("list");
    }
    add(`${checkedIds.length} ta xabar o'chirildi`,"info");
    setCheckedIds([]);
  };
  const handleSend=type=>{
    setCompose(false);
    add(type==="send"?"Xabar muvaffaqiyatli yuborildi!":"Qoralamaga saqlandi","success");
  };
  const handleArchive=()=>{
    setMails(ms=>ms.filter(m=>m.id!==selectedMail?.id));
    add("Xabar arxivlandi","info");
    setSelectedMail(null);setMobileView("list");
  };
  const handleTrash=()=>{
    setMails(ms=>ms.filter(m=>m.id!==selectedMail?.id));
    add("Xabar o'chirildi","info");
    setSelectedMail(null);setMobileView("list");
  };
  const openMail=m=>{
    setSelectedMail(m);
    setMails(ms=>ms.map(x=>x.id===m.id?{...x,unread:false}:x));
    if(isMobile) setMobileView("detail");
  };

  const filteredMails=mails.filter(m=>{
    const q=search.toLowerCase();
    const ms=!q||m.from.toLowerCase().includes(q)||
        m.subject.toLowerCase().includes(q)||m.preview.toLowerCase().includes(q);
    const mf=folder==="inbox"||folder==="sent"?true
        :folder==="starred"?m.starred:folder==="drafts"?false:true;
    return ms&&mf;
  });

  /* ── MOBILE ── */
  if(isMobile) return(
      <>
        <style>{css}</style>
        {/* Toasts — above bottom nav */}
        <div style={{position:"fixed",bottom:68,right:12,zIndex:9999,
          display:"flex",flexDirection:"column",gap:6}}>
          {toasts.map(t=><Toast key={t.id} t={t} onRemove={remove}/>)}
        </div>

        {compose&&<ComposeModal onClose={()=>setCompose(false)} onSend={handleSend} isMobile/>}

        <div style={{height:"100dvh",display:"flex",flexDirection:"column",
          background:C.white,overflow:"hidden",position:"relative"}}>

          {/* Sidebar drawer overlay */}
          {mobileSidebar&&(
              <div style={{position:"fixed",inset:0,zIndex:1500,animation:"fadeIn 0.2s"}}>
                <div style={{position:"absolute",inset:0,background:"rgba(13,26,99,0.4)",
                  backdropFilter:"blur(3px)"}} onClick={()=>setMobileSidebar(false)}/>
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:280,
                  animation:"slideInLeft 0.25s ease",
                  boxShadow:"8px 0 40px rgba(13,26,99,0.15)"}}>
                  <SidebarContent folder={folder} setFolder={f=>{setFolder(f);setMobileView("list");}}
                                  unread={unread}
                                  onCompose={()=>{setMobileSidebar(false);setCompose(true);}}
                                  onClose={()=>setMobileSidebar(false)} isMobile/>
                </div>
              </div>
          )}

          {/* ── LIST SCREEN ── */}
          {mobileView==="list"&&(
              <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                {/* Top bar */}
                <div style={{padding:"0 14px 8px",background:C.white,
                  borderBottom:`1px solid ${C.gray}`,flexShrink:0,
                  paddingTop:"max(12px,env(safe-area-inset-top))"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,height:44}}>
                    <button onClick={()=>setMobileSidebar(true)}
                            style={{width:38,height:38,border:"none",borderRadius:10,cursor:"pointer",
                              background:C.lightGray,color:C.mid,display:"flex",alignItems:"center",
                              justifyContent:"center",flexShrink:0}}>
                      <Ico d={I.menu} size={18}/>
                    </button>
                    <span style={{flex:1,fontSize:17,fontWeight:800,color:C.dark,
                      fontFamily:"'Syne',sans-serif"}}>
                  {FOLDERS.find(f=>f.id===folder)?.label||"Kiruvchi"}
                </span>
                    {unread>0&&(
                        <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,
                          background:C.bright,color:C.white}}>{unread}</span>
                    )}
                    <button onClick={()=>add("Yangilandi","info")}
                            style={{width:38,height:38,border:"none",borderRadius:10,cursor:"pointer",
                              background:C.lightGray,color:C.mid,display:"flex",alignItems:"center",
                              justifyContent:"center"}}>
                      <Ico d={I.refresh} size={17}/>
                    </button>
                  </div>
                  {/* Search */}
                  <div style={{position:"relative"}}>
                    <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",
                      pointerEvents:"none",display:"flex",zIndex:1}}>
                      <Ico d={I.search} size={15} color={searchFocused?C.bright:C.light}/>
                    </div>
                    <input value={search} onChange={e=>setSearch(e.target.value)}
                           placeholder="Xabarlarni qidiring..."
                           onFocus={()=>setSearchFocused(true)}
                           onBlur={()=>setSearchFocused(false)}
                           style={{width:"100%",padding:"10px 12px 10px 38px",borderRadius:11,
                             border:`1.5px solid ${searchFocused?C.bright:C.gray}`,
                             fontSize:14,color:C.dark,
                             background:searchFocused?C.white:C.lightGray,transition:"all 0.2s"}}/>
                  </div>
                </div>

                {/* Bulk bar */}
                {checkedIds.length>0&&(
                    <div style={{padding:"8px 14px",background:C.lightBlue,
                      borderBottom:`1px solid ${C.bright}20`,
                      display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:600,color:C.bright,flex:1}}>
                  {checkedIds.length} ta tanlandi
                </span>
                      {[{d:I.check,fn:markRead},{d:I.archive,fn:()=>{}},{d:I.trash,fn:deleteChecked}].map((b,i)=>(
                          <button key={i} onClick={b.fn}
                                  style={{width:34,height:34,border:"none",borderRadius:8,cursor:"pointer",
                                    background:C.white,color:C.mid,display:"flex",alignItems:"center",
                                    justifyContent:"center"}}>
                            <Ico d={b.d} size={16}/>
                          </button>
                      ))}
                    </div>
                )}

                {/* Mails */}
                <div style={{flex:1,overflowY:"auto",background:C.white}}>
                  {filteredMails.length===0?(
                      <div style={{padding:"56px 20px",textAlign:"center"}}>
                        <div style={{width:56,height:56,borderRadius:16,background:C.lightGray,
                          display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                          <Ico d={I.inbox} size={24} color={C.light}/>
                        </div>
                        <div style={{fontSize:13,fontWeight:600,color:C.light}}>Xabar topilmadi</div>
                      </div>
                  ):filteredMails.map(m=>(
                      <MailRow key={m.id} mail={m} selected={selectedMail?.id===m.id}
                               checked={checkedIds.includes(m.id)} onClick={()=>openMail(m)}
                               onStar={toggleStar} onCheck={toggleCheck} isMobile/>
                  ))}
                </div>

                {/* Bottom tab bar */}
                <div style={{borderTop:`1px solid ${C.gray}`,background:C.white,
                  display:"flex",flexShrink:0,
                  paddingBottom:"env(safe-area-inset-bottom)"}}>
                  {FOLDERS.slice(0,5).map(f=>(
                      <button key={f.id} className={`bottom-tab${folder===f.id?" active":""}`}
                              onClick={()=>setFolder(f.id)}
                              style={{flex:1,padding:"10px 2px 8px",border:"none",cursor:"pointer",
                                background:"transparent",color:folder===f.id?C.bright:C.light,
                                display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                                transition:"color 0.2s",fontFamily:"inherit"}}>
                        <div style={{position:"relative"}}>
                          <Ico d={f.icon} size={20} color={folder===f.id?C.bright:C.light}/>
                          {f.id==="inbox"&&unread>0&&(
                              <div style={{position:"absolute",top:-3,right:-4,width:8,height:8,
                                borderRadius:"50%",background:C.red,border:`1.5px solid ${C.white}`}}/>
                          )}
                        </div>
                        <span style={{fontSize:9,fontWeight:folder===f.id?700:500,lineHeight:1}}>
                    {f.label}
                  </span>
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* ── DETAIL SCREEN ── */}
          {mobileView==="detail"&&selectedMail&&(
              <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                <MailDetail mail={selectedMail}
                            onClose={()=>{setMobileView("list");setSelectedMail(null);}}
                            onReply={l=>add(`${l} bosildi`,"info")}
                            onStar={toggleStar} onArchive={handleArchive} onTrash={handleTrash} isMobile/>
              </div>
          )}

          {/* FAB */}
          {mobileView==="list"&&!compose&&(
              <button onClick={()=>setCompose(true)}
                      style={{position:"fixed",right:16,
                        bottom:`calc(66px + env(safe-area-inset-bottom))`,
                        width:52,height:52,borderRadius:16,border:"none",cursor:"pointer",
                        background:`linear-gradient(135deg,${C.orange},#ff9f6a)`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        boxShadow:"0 6px 20px rgba(246,128,72,0.5)",zIndex:100}}>
                <Ico d={I.plus} size={22} color={C.white}/>
              </button>
          )}
        </div>
      </>
  );

  /* ── DESKTOP ── */
  return(
      <>
        <style>{css}</style>
        <div style={{position:"fixed",bottom:20,right:20,zIndex:9999,
          display:"flex",flexDirection:"column",gap:8}}>
          {toasts.map(t=><Toast key={t.id} t={t} onRemove={remove}/>)}
        </div>
        {compose&&<ComposeModal onClose={()=>setCompose(false)} onSend={handleSend}/>}

        <div style={{display:"flex",height:"100vh",overflow:"hidden"}}>
          {/* Sidebar */}
          <div style={{width:sidebarOpen?240:0,transition:"width 0.25s ease",
            overflow:"hidden",flexShrink:0,borderRight:`1px solid ${C.gray}`}}>
            <SidebarContent folder={folder} setFolder={setFolder} unread={unread}
                            onCompose={()=>setCompose(true)}/>
          </div>

          {/* Main */}
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {/* Topbar */}
            <div style={{padding:"10px 16px",background:C.white,
              borderBottom:`1px solid ${C.gray}`,
              display:"flex",alignItems:"center",gap:12,flexShrink:0,
              position:"sticky",top:0,zIndex:10}}>
              <button onClick={()=>setSidebarOpen(p=>!p)} className="action-btn"
                      style={{width:32,height:32,border:"none",borderRadius:8,cursor:"pointer",
                        background:C.lightGray,color:C.mid,display:"flex",alignItems:"center",
                        justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
                <Ico d={I.menu} size={15}/>
              </button>
              {/* Search — icon properly inside */}
              <div style={{flex:1,maxWidth:480,position:"relative"}}>
                <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",
                  pointerEvents:"none",display:"flex",zIndex:1}}>
                  <Ico d={I.search} size={15} color={searchFocused?C.bright:C.light}/>
                </div>
                <input value={search} onChange={e=>setSearch(e.target.value)}
                       placeholder="Xabarlarni qidiring..."
                       onFocus={()=>setSearchFocused(true)}
                       onBlur={()=>setSearchFocused(false)}
                       style={{width:"100%",padding:"8px 12px 8px 36px",borderRadius:10,
                         border:`1.5px solid ${searchFocused?C.bright:C.gray}`,
                         fontSize:13,color:C.dark,
                         background:searchFocused?C.white:C.lightGray,transition:"all 0.2s"}}/>
              </div>
              <div style={{flex:1}}/>
              {[{d:I.refresh,t:"Yangilash"},{d:I.filter,t:"Filtrlash"},
                {d:I.bell,t:"Bildirishnomalar"}].map((b,i)=>(
                  <button key={i} title={b.t} className="action-btn"
                          onClick={()=>add(b.t+" bosildi","info")}
                          style={{width:32,height:32,border:"none",borderRadius:8,cursor:"pointer",
                            background:C.lightGray,color:C.mid,display:"flex",alignItems:"center",
                            justifyContent:"center",transition:"all 0.15s",position:"relative"}}>
                    <Ico d={b.d} size={15}/>
                    {i===2&&<div style={{position:"absolute",top:6,right:6,width:7,height:7,
                      borderRadius:"50%",background:C.red,border:`1.5px solid ${C.white}`}}/>}
                  </button>
              ))}
            </div>

            {/* List + Detail */}
            <div style={{flex:1,display:"flex",overflow:"hidden"}}>
              {/* Mail list */}
              <div style={{width:selectedMail?340:undefined,flex:selectedMail?undefined:1,
                flexShrink:0,borderRight:`1px solid ${C.gray}`,
                display:"flex",flexDirection:"column",background:C.white,overflow:"hidden",
                transition:"width 0.25s ease"}}>
                <div style={{padding:"8px 14px",borderBottom:`1px solid ${C.lightGray}`,
                  display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                  <div onClick={toggleAll}
                       style={{width:16,height:16,borderRadius:4,
                         border:`1.5px solid ${checkedIds.length>0?C.bright:C.gray}`,
                         background:checkedIds.length===mails.length?C.bright:"transparent",
                         cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
                         transition:"all 0.15s",flexShrink:0}}>
                    {checkedIds.length>0&&<Ico d={I.check} size={10} color={C.white} sw={2.5}/>}
                  </div>
                  <span style={{fontSize:12,color:C.light,flex:1}}>
                  {checkedIds.length>0?`${checkedIds.length} ta tanlandi`:`${filteredMails.length} ta xabar`}
                </span>
                  {checkedIds.length>0&&(
                      <div style={{display:"flex",gap:4}}>
                        {[{d:I.check,fn:markRead},{d:I.archive,fn:()=>{}},{d:I.trash,fn:deleteChecked}].map((b,i)=>(
                            <button key={i} onClick={b.fn} className="action-btn"
                                    style={{width:28,height:28,border:"none",borderRadius:7,cursor:"pointer",
                                      background:C.lightGray,color:C.mid,display:"flex",alignItems:"center",
                                      justifyContent:"center",transition:"all 0.15s"}}>
                              <Ico d={b.d} size={13}/>
                            </button>
                        ))}
                      </div>
                  )}
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,
                    background:C.lightBlue,color:C.bright,whiteSpace:"nowrap"}}>
                  {FOLDERS.find(f=>f.id===folder)?.label}
                </span>
                </div>
                <div style={{flex:1,overflowY:"auto"}}>
                  {filteredMails.length===0?(
                      <div style={{padding:"40px 20px",textAlign:"center"}}>
                        <div style={{width:52,height:52,borderRadius:14,background:C.lightGray,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          margin:"0 auto 12px"}}>
                          <Ico d={I.inbox} size={22} color={C.light}/>
                        </div>
                        <div style={{fontSize:13,fontWeight:600,color:C.light}}>Xabar topilmadi</div>
                      </div>
                  ):filteredMails.map(m=>(
                      <MailRow key={m.id} mail={m} selected={selectedMail?.id===m.id}
                               checked={checkedIds.includes(m.id)} onClick={()=>openMail(m)}
                               onStar={toggleStar} onCheck={toggleCheck}/>
                  ))}
                </div>
              </div>

              {/* Detail / empty */}
              <div style={{flex:1,overflow:"hidden",background:C.white,
                display:"flex",flexDirection:"column"}}>
                {selectedMail?(
                    <MailDetail mail={selectedMail}
                                onClose={()=>setSelectedMail(null)}
                                onReply={l=>add(`${l} bosildi`,"info")}
                                onStar={toggleStar} onArchive={handleArchive} onTrash={handleTrash}/>
                ):(
                    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",
                      flexDirection:"column",gap:14}}>
                      <div style={{width:72,height:72,borderRadius:20,
                        background:`linear-gradient(135deg,${C.lightBlue},${C.lightGray})`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        boxShadow:"0 8px 24px rgba(13,26,99,0.08)"}}>
                        <Ico d={I.inbox} size={30} color={C.bright}/>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:16,fontWeight:800,color:C.dark,
                          fontFamily:"'Syne',sans-serif",marginBottom:6}}>
                          Xabar tanlang
                        </div>
                        <div style={{fontSize:13,color:C.light,maxWidth:220,lineHeight:1.5}}>
                          Chap tarafdagi ro'yxatdan xabarni tanlang
                        </div>
                      </div>
                      <button onClick={()=>setCompose(true)}
                              style={{padding:"9px 22px",borderRadius:10,border:"none",cursor:"pointer",
                                background:`linear-gradient(135deg,${C.bright},${C.blue})`,
                                color:C.white,fontSize:13,fontWeight:600,fontFamily:"inherit",
                                boxShadow:`0 4px 14px ${C.bright}25`,transition:"transform 0.2s"}}
                              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                        Yangi xabar yozish
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}