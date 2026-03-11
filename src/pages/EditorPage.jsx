import { useState, useRef, useCallback, useEffect } from "react";

const C = {
  navy:"#0D1A63",blue:"#1E3A9E",bright:"#2845D6",lightBlue:"#EEF2FF",
  orange:"#F68048",orangeLight:"#FFF4ED",green:"#16A34A",greenLight:"#F0FDF4",
  red:"#DC2626",redLight:"#FEF2F2",yellow:"#D97706",yellowLight:"#FFFBEB",
  dark:"#0F172A",mid:"#475569",light:"#94A3B8",gray:"#E2E8F0",
  lightGray:"#F8FAFC",white:"#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:${C.lightGray}; }
  ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
  button,input,select{font-family:'DM Sans',sans-serif}

  .ck-editor-wrap [contenteditable]:focus { outline:none; }
  .ck-editor-wrap [contenteditable] {
    min-height:320px; padding:28px 32px;
    font-family:'Merriweather',Georgia,serif;
    font-size:15px; line-height:1.8; color:${C.dark};
  }
  .ck-editor-wrap [contenteditable] h1{font-size:28px;font-weight:800;margin:0 0 12px;font-family:'Syne',sans-serif;color:${C.navy}}
  .ck-editor-wrap [contenteditable] h2{font-size:22px;font-weight:700;margin:16px 0 10px;font-family:'Syne',sans-serif;color:${C.dark}}
  .ck-editor-wrap [contenteditable] h3{font-size:18px;font-weight:700;margin:14px 0 8px;font-family:'Syne',sans-serif;color:${C.dark}}
  .ck-editor-wrap [contenteditable] p{margin-bottom:10px}
  .ck-editor-wrap [contenteditable] blockquote{
    border-left:4px solid ${C.bright};padding:12px 18px;margin:14px 0;
    background:${C.lightBlue};border-radius:0 8px 8px 0;font-style:italic;color:${C.mid}
  }
  .ck-editor-wrap [contenteditable] ul,.ck-editor-wrap [contenteditable] ol{padding-left:24px;margin:10px 0}
  .ck-editor-wrap [contenteditable] li{margin-bottom:4px}
  .ck-editor-wrap [contenteditable] table{width:100%;border-collapse:collapse;margin:14px 0}
  .ck-editor-wrap [contenteditable] td,.ck-editor-wrap [contenteditable] th{
    border:1px solid ${C.gray};padding:8px 12px;font-size:13px
  }
  .ck-editor-wrap [contenteditable] th{background:${C.lightBlue};font-weight:700;font-family:'DM Sans',sans-serif}
  .ck-editor-wrap [contenteditable] code{
    background:${C.lightGray};padding:2px 6px;border-radius:4px;
    font-family:monospace;font-size:13px;color:${C.red}
  }
  .ck-editor-wrap [contenteditable] pre{
    background:${C.dark};color:#e2e8f0;padding:16px 20px;border-radius:10px;
    margin:12px 0;overflow-x:auto;font-family:monospace;font-size:13px;line-height:1.6
  }
  .ck-editor-wrap [contenteditable] a{color:${C.bright};text-decoration:underline}
  .ck-editor-wrap [contenteditable] img{max-width:100%;border-radius:8px;margin:8px 0}
  .ck-editor-wrap [contenteditable] hr{border:none;border-top:2px solid ${C.gray};margin:20px 0}
  .ck-editor-wrap [contenteditable] mark{background:#FEF08A;padding:0 2px;border-radius:2px}
  .tool-btn:hover{background:${C.lightBlue}!important;color:${C.bright}!important}
  .tool-btn.active{background:${C.lightBlue}!important;color:${C.bright}!important}
`;

const SVG = ({d,size=15,fill="none",color="currentColor",sw=2})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);

const INITIAL_CONTENT = `<h1>O'quv kursi tavsifi</h1>
<p>Bu yerda <strong>kurs haqida batafsil ma'lumot</strong> kiritishingiz mumkin. Editor <em>CKEditor</em> uslubida ishlaydi va barcha asosiy formatlash imkoniyatlarini qo'llab-quvvatlaydi.</p>
<h2>Kurs maqsadlari</h2>
<p>Ushbu kursda talabalar quyidagi ko'nikmalarni egallaydilar:</p>
<ul>
  <li>Dasturlash asoslarini o'rganish</li>
  <li>Amaliy loyihalar ustida ishlash</li>
  <li>Zamonaviy texnologiyalardan foydalanish</li>
</ul>
<blockquote>«Bilim – eng yaxshi boylik. Uni hech kim sizdan ololmaydi.»</blockquote>
<h2>Jadval</h2>
<table><tr><th>Hafta</th><th>Mavzu</th><th>Soat</th></tr><tr><td>1-2</td><td>Kirish va asoslar</td><td>4</td></tr><tr><td>3-4</td><td>Amaliy mashg'ulotlar</td><td>6</td></tr><tr><td>5-6</td><td>Yakuniy loyiha</td><td>8</td></tr></table>
<p>Batafsil ma'lumot uchun <a href="#">dastur sahifasiga</a> o'ting.</p>`;

export default function EditorPage() {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [activeFormats, setActiveFormats] = useState({});
  const [fontSize, setFontSize] = useState("15");
  const [fontFamily, setFontFamily] = useState("Merriweather");
  const [showSource, setShowSource] = useState(false);
  const [sourceCode, setSourceCode] = useState(INITIAL_CONTENT);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const savedRange = useRef(null);

  useEffect(()=>{
    if(editorRef.current && !showSource) {
      editorRef.current.innerHTML = INITIAL_CONTENT;
      updateCounts();
    }
  },[]);

  const updateCounts = () => {
    if(!editorRef.current) return;
    const text = editorRef.current.innerText || "";
    setCharCount(text.length);
    setWordCount(text.trim()?text.trim().split(/\s+/).length:0);
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if(sel && sel.rangeCount>0) savedRange.current = sel.getRangeAt(0).cloneRange();
  };

  const restoreSelection = () => {
    if(savedRange.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    } else {
      editorRef.current?.focus();
    }
  };

  const exec = (cmd, val=null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    updateCounts();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
    });
  };

  const insertTable = () => {
    restoreSelection();
    let html = "<table>";
    html += "<tr>" + Array(+tableCols).fill("<th>Sarlavha</th>").join("") + "</tr>";
    for(let i=1;i<+tableRows;i++) html += "<tr>" + Array(+tableCols).fill("<td>Ma'lumot</td>").join("") + "</tr>";
    html += "</table><p><br></p>";
    document.execCommand("insertHTML", false, html);
    setShowTableModal(false);
    updateCounts();
  };

  const insertLink = () => {
    restoreSelection();
    exec("createLink", linkUrl);
    setShowLinkModal(false);
    setLinkUrl("https://");
  };

  const insertImage = () => {
    restoreSelection();
    document.execCommand("insertHTML", false, `<img src="${imageUrl}" alt="rasm" style="max-width:100%;border-radius:8px;margin:8px 0"/><p><br></p>`);
    setShowImageModal(false);
    setImageUrl("");
    updateCounts();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  const ToolBtn = ({cmd,val,icon,title,children,active})=>(
    <button className={`tool-btn${(active||activeFormats[cmd])?" active":""}`}
      title={title}
      onMouseDown={e=>{e.preventDefault(); saveSelection(); if(cmd) exec(cmd,val); }}
      style={{width:30,height:30,border:"none",borderRadius:6,cursor:"pointer",
        background:"transparent",color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",
        transition:"all 0.15s",flexShrink:0}}>
      {icon?<SVG d={icon} size={14}/>:children}
    </button>
  );

  const Divider = ()=><div style={{width:1,height:22,background:C.gray,margin:"0 3px"}}/>;

  const ToolGroup = ({children})=>(
    <div style={{display:"flex",alignItems:"center",gap:1,padding:"0 4px"}}>
      {children}
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div style={{padding:"24px 28px",maxWidth:1100,margin:"0 auto",animation:"fadeUp 0.3s ease"}}>
        <div style={{marginBottom:22}}>
          <h1 style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:4}}>Matn muharriri</h1>
          <p style={{fontSize:13,color:C.light}}>CKEditor uslubida boy matn muharriri — barcha formatlash amallar bilan</p>
        </div>

        {/* Document card */}
        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.gray}`,overflow:"hidden",boxShadow:"0 4px 20px rgba(13,26,99,0.06)"}}>
          {/* Document header */}
          <div style={{padding:"12px 16px",background:`linear-gradient(135deg,${C.navy},${C.blue})`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
            <input defaultValue="O'quv kursi tavsifi — MT-203 guruh" style={{flex:1,background:"transparent",border:"none",color:C.white,fontSize:14,fontWeight:600,outline:"none"}} placeholder="Hujjat nomi..."/>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setShowSource(p=>!p)}
                style={{padding:"5px 12px",borderRadius:7,border:"none",background:"rgba(255,255,255,0.15)",color:C.white,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                {showSource?"Vizual":"HTML"}
              </button>
              <button onClick={handleSave}
                style={{padding:"5px 14px",borderRadius:7,border:"none",
                  background:saved?C.green:`linear-gradient(135deg,${C.orange},#ff9f6a)`,
                  color:C.white,fontSize:11,fontWeight:700,cursor:"pointer",transition:"background 0.3s"}}>
                {saved?"✓ Saqlandi":"Saqlash"}
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div style={{borderBottom:`1px solid ${C.gray}`,background:C.white,padding:"6px 8px",display:"flex",alignItems:"center",flexWrap:"wrap",gap:2,position:"sticky",top:0,zIndex:10}}>
            {/* History */}
            <ToolGroup>
              <ToolBtn cmd="undo" title="Orqaga" icon="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6M3 10l6-6"/>
              <ToolBtn cmd="redo" title="Oldinga" icon="M21 10H11a8 8 0 0 0-8 8v2M21 10l-6 6M21 10l-6-6"/>
            </ToolGroup>
            <Divider/>

            {/* Font family */}
            <select value={fontFamily} onChange={e=>{setFontFamily(e.target.value);exec("fontName",e.target.value);}}
              style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.gray}`,fontSize:12,color:C.mid,background:C.white,cursor:"pointer",height:30}}>
              {["Merriweather","'DM Sans'","Georgia","'Courier New'","Arial"].map(f=><option key={f} value={f}>{f.replace(/'/g,"")}</option>)}
            </select>

            {/* Font size */}
            <select value={fontSize} onChange={e=>{setFontSize(e.target.value);exec("fontSize",{12:1,14:2,15:3,18:4,22:5,28:6,36:7}[e.target.value]||3);}}
              style={{padding:"4px 6px",borderRadius:6,border:`1px solid ${C.gray}`,fontSize:12,color:C.mid,background:C.white,cursor:"pointer",height:30,width:56}}>
              {[12,14,15,18,22,28,36].map(s=><option key={s}>{s}</option>)}
            </select>

            <Divider/>

            {/* Headings */}
            <ToolGroup>
              {["H1","H2","H3","P"].map(h=>(
                <button key={h} className="tool-btn"
                  onMouseDown={e=>{e.preventDefault();saveSelection();exec("formatBlock",h==="P"?"<p>":`<${h.toLowerCase()}>`);}}
                  style={{padding:"0 7px",height:30,border:"none",borderRadius:6,cursor:"pointer",background:"transparent",
                    color:C.mid,fontSize:h==="P"?12:parseInt(h[1])===1?14:parseInt(h[1])===2?13:12,
                    fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                  {h}
                </button>
              ))}
            </ToolGroup>
            <Divider/>

            {/* Text formatting */}
            <ToolGroup>
              <ToolBtn cmd="bold" title="Qalin (Ctrl+B)" children={<b style={{fontSize:14}}>B</b>}/>
              <ToolBtn cmd="italic" title="Kursiv (Ctrl+I)" children={<i style={{fontSize:14,fontFamily:"Georgia"}}>I</i>}/>
              <ToolBtn cmd="underline" title="Tagiga chiziq (Ctrl+U)" children={<u style={{fontSize:14}}>U</u>}/>
              <ToolBtn cmd="strikeThrough" title="Ustidan chiziq" children={<s style={{fontSize:14}}>S</s>}/>
            </ToolGroup>
            <Divider/>

            {/* Color */}
            <ToolGroup>
              <label title="Matn rangi" style={{width:30,height:30,borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",flexShrink:0}}>
                <span style={{fontSize:14,fontWeight:700,borderBottom:`3px solid ${C.bright}`}}>A</span>
                <input type="color" defaultValue={C.bright} onChange={e=>exec("foreColor",e.target.value)}
                  style={{position:"absolute",opacity:0,width:0,height:0}}/>
              </label>
              <label title="Fon rangi" style={{width:30,height:30,borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:700,background:"#FEF08A",padding:"1px 4px",borderRadius:3}}>H</span>
                <input type="color" defaultValue="#FEF08A" onChange={e=>exec("hiliteColor",e.target.value)}
                  style={{position:"absolute",opacity:0,width:0,height:0}}/>
              </label>
            </ToolGroup>
            <Divider/>

            {/* Lists */}
            <ToolGroup>
              <ToolBtn cmd="insertUnorderedList" title="Nuqtali ro'yxat" icon="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"/>
              <ToolBtn cmd="insertOrderedList" title="Raqamli ro'yxat" icon="M10 6h11M10 12h11M10 18h11M4 6l1-1v4M3 14h3l-3 4h3"/>
            </ToolGroup>
            <Divider/>

            {/* Align */}
            <ToolGroup>
              <ToolBtn cmd="justifyLeft" title="Chap" icon="M3 6h18M3 12h12M3 18h15"/>
              <ToolBtn cmd="justifyCenter" title="Markazda" icon="M3 6h18M6 12h12M4 18h16"/>
              <ToolBtn cmd="justifyRight" title="O'ng" icon="M3 6h18M9 12h12M6 18h15"/>
              <ToolBtn cmd="justifyFull" title="Tekislash" icon="M3 6h18M3 12h18M3 18h18"/>
            </ToolGroup>
            <Divider/>

            {/* Indent */}
            <ToolGroup>
              <ToolBtn cmd="outdent" title="Chekinishni kamaytirish" icon="M7 8l-4 4 4 4M3 12h14M21 4H11M21 20H11M21 12H17"/>
              <ToolBtn cmd="indent" title="Chekinishni oshirish" icon="M17 8l4 4-4 4M21 12H7M3 4h10M3 20h10M3 12H7"/>
            </ToolGroup>
            <Divider/>

            {/* Insert */}
            <ToolGroup>
              <button className="tool-btn" title="Havola qo'shish"
                onMouseDown={e=>{e.preventDefault();saveSelection();setShowLinkModal(true);}}
                style={{width:30,height:30,border:"none",borderRadius:6,cursor:"pointer",background:"transparent",color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                <SVG d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" size={14}/>
              </button>
              <button className="tool-btn" title="Jadval qo'shish"
                onMouseDown={e=>{e.preventDefault();saveSelection();setShowTableModal(true);}}
                style={{width:30,height:30,border:"none",borderRadius:6,cursor:"pointer",background:"transparent",color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                <SVG d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" size={14}/>
              </button>
              <button className="tool-btn" title="Rasm qo'shish"
                onMouseDown={e=>{e.preventDefault();saveSelection();setShowImageModal(true);}}
                style={{width:30,height:30,border:"none",borderRadius:6,cursor:"pointer",background:"transparent",color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                <SVG d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM21 15l-5-5L5 21" size={14}/>
              </button>
              <ToolBtn cmd="insertHorizontalRule" title="Chiziq qo'shish" icon="M8 12h8M5 12h.01M19 12h.01"/>
            </ToolGroup>
            <Divider/>

            {/* Block */}
            <ToolGroup>
              <button className="tool-btn" title="Iqtibos"
                onMouseDown={e=>{e.preventDefault();saveSelection();exec("formatBlock","<blockquote>");}}
                style={{width:30,height:30,border:"none",borderRadius:6,cursor:"pointer",background:"transparent",color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                <SVG d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" size={14}/>
              </button>
              <button className="tool-btn" title="Kod bloki"
                onMouseDown={e=>{e.preventDefault();saveSelection();exec("formatBlock","<pre>");}}
                style={{width:30,height:30,border:"none",borderRadius:6,cursor:"pointer",background:"transparent",color:C.mid,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                <SVG d="M16 18l6-6-6-6M8 6l-6 6 6 6" size={14}/>
              </button>
              <ToolBtn cmd="removeFormat" title="Formatni tozalash" icon="M6 6h.01M18 18l-6-6M6 18L18 6"/>
            </ToolGroup>
          </div>

          {/* Editor / Source */}
          <div className="ck-editor-wrap">
            {showSource?(
              <textarea value={editorRef.current?.innerHTML||INITIAL_CONTENT}
                onChange={e=>{if(editorRef.current)editorRef.current.innerHTML=e.target.value;}}
                style={{width:"100%",minHeight:380,padding:"20px",border:"none",resize:"vertical",
                  fontFamily:"monospace",fontSize:12,color:C.dark,lineHeight:1.7,background:C.lightGray}}/>
            ):(
              <div ref={editorRef} contentEditable suppressContentEditableWarning
                onInput={updateCounts} onKeyUp={updateActiveFormats} onMouseUp={updateActiveFormats}
                dangerouslySetInnerHTML={{__html:INITIAL_CONTENT}}
                style={{minHeight:380}}/>
            )}
          </div>

          {/* Footer */}
          <div style={{padding:"10px 16px",borderTop:`1px solid ${C.lightGray}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:C.lightGray}}>
            <div style={{display:"flex",gap:16}}>
              <span style={{fontSize:11,color:C.light}}><b style={{color:C.mid}}>{wordCount}</b> so'z</span>
              <span style={{fontSize:11,color:C.light}}><b style={{color:C.mid}}>{charCount}</b> belgi</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{padding:"5px 14px",borderRadius:7,border:`1px solid ${C.gray}`,background:C.white,fontSize:12,color:C.mid,cursor:"pointer",fontFamily:"inherit"}}>Ko'rinish</button>
              <button onClick={handleSave}
                style={{padding:"5px 14px",borderRadius:7,border:"none",
                  background:saved?C.green:`linear-gradient(135deg,${C.bright},${C.blue})`,
                  color:C.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.3s"}}>
                {saved?"✓ Saqlandi":"Saqlash"}
              </button>
            </div>
          </div>
        </div>

        {/* MODALS */}
        {[showLinkModal,showTableModal,showImageModal].some(Boolean)&&(
          <div style={{position:"fixed",inset:0,background:"rgba(13,26,99,0.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)",animation:"fadeIn 0.2s"}}
            onClick={e=>e.target===e.currentTarget&&(setShowLinkModal(false),setShowTableModal(false),setShowImageModal(false))}>
            <div style={{background:C.white,borderRadius:16,padding:24,width:360,boxShadow:"0 20px 60px rgba(13,26,99,0.2)",animation:"fadeUp 0.25s ease"}}>

              {showLinkModal&&(<>
                <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:16}}>Havola qo'shish</h3>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:6,textTransform:"uppercase"}}>URL manzil</div>
                  <input value={linkUrl} onChange={e=>setLinkUrl(e.target.value)}
                    style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}/>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={insertLink} style={{padding:"8px 18px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Qo'shish</button>
                  <button onClick={()=>setShowLinkModal(false)} style={{padding:"8px 14px",borderRadius:9,border:`1px solid ${C.gray}`,background:C.white,color:C.mid,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Bekor</button>
                </div>
              </>)}

              {showTableModal&&(<>
                <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:16}}>Jadval kiritish</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                  {[{l:"Satrlar soni",v:tableRows,s:setTableRows},{l:"Ustunlar soni",v:tableCols,s:setTableCols}].map(f=>(
                    <div key={f.l}>
                      <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:6,textTransform:"uppercase"}}>{f.l}</div>
                      <input type="number" min={1} max={20} value={f.v} onChange={e=>f.s(+e.target.value)}
                        style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1.5px solid ${C.gray}`,fontSize:14,color:C.dark,textAlign:"center"}}/>
                    </div>
                  ))}
                </div>
                {/* Preview */}
                <div style={{marginBottom:14,overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    {Array(Math.min(tableRows,4)).fill(0).map((_,r)=>(
                      <tr key={r}>
                        {Array(Math.min(tableCols,5)).fill(0).map((_,c)=>(
                          <td key={c} style={{border:`1px solid ${C.gray}`,padding:"5px 8px",fontSize:11,
                            background:r===0?C.lightBlue:C.white,
                            fontWeight:r===0?700:400,color:r===0?C.bright:C.light}}>
                            {r===0?"Sarlavha":"Ma'lumot"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </table>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={insertTable} style={{padding:"8px 18px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Kiritish</button>
                  <button onClick={()=>setShowTableModal(false)} style={{padding:"8px 14px",borderRadius:9,border:`1px solid ${C.gray}`,background:C.white,color:C.mid,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Bekor</button>
                </div>
              </>)}

              {showImageModal&&(<>
                <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:"'Syne',sans-serif",marginBottom:16}}>Rasm qo'shish</h3>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:6,textTransform:"uppercase"}}>Rasm URL</div>
                  <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="https://..."
                    style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${C.gray}`,fontSize:13,color:C.dark}}/>
                </div>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.mid,marginBottom:6,textTransform:"uppercase"}}>Yoki fayl yuklash</div>
                  <label style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",borderRadius:9,border:`2px dashed ${C.gray}`,cursor:"pointer",background:C.lightGray}}>
                    <SVG d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" size={16} color={C.light}/>
                    <span style={{fontSize:13,color:C.light}}>Faylni tanlash...</span>
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{if(e.target.files[0]) setImageUrl(URL.createObjectURL(e.target.files[0]));}}/>
                  </label>
                </div>
                {imageUrl&&<img src={imageUrl} alt="" style={{width:"100%",borderRadius:8,marginBottom:12,maxHeight:120,objectFit:"cover"}}/>}
                <div style={{display:"flex",gap:8}}>
                  <button onClick={insertImage} style={{padding:"8px 18px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.bright},${C.blue})`,color:C.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Kiritish</button>
                  <button onClick={()=>setShowImageModal(false)} style={{padding:"8px 14px",borderRadius:9,border:`1px solid ${C.gray}`,background:C.white,color:C.mid,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Bekor</button>
                </div>
              </>)}

            </div>
          </div>
        )}
      </div>
    </>
  );
}
