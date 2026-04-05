// TipTap Rich Text Editor — Original dizayn tizimi bilan
// @tiptap/react, @tiptap/starter-kit va boshqa extensionlar kerak

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Highlight } from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { CharacterCount } from "@tiptap/extension-character-count";
import { useState, useCallback } from "react";

// ─── Design tokens (asl loyihadan) ───────────────────────────────────────────
const C = {
  navy: "#0D1A63", blue: "#1E3A9E", bright: "#2845D6", lightBlue: "#EEF2FF",
  orange: "#F68048", orangeLight: "#FFF4ED", green: "#16A34A", greenLight: "#F0FDF4",
  red: "#DC2626", redLight: "#FEF2F2", yellow: "#D97706", yellowLight: "#FFFBEB",
  dark: "#0F172A", mid: "#475569", light: "#94A3B8", gray: "#E2E8F0",
  lightGray: "#F8FAFC", white: "#FFFFFF",
};

// ─── Global styles ─────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:${C.lightGray}; }
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:${C.gray};border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  button,input,select{font-family:'DM Sans',sans-serif}

  /* ── TipTap editor content styles ── */
  .tiptap-wrap .ProseMirror {
    min-height: 380px;
    padding: 28px 32px;
    font-family: 'Merriweather', Georgia, serif;
    font-size: 15px;
    line-height: 1.8;
    color: ${C.dark};
    outline: none;
  }
  .tiptap-wrap .ProseMirror h1{font-size:28px;font-weight:800;margin:0 0 12px;font-family:'Syne',sans-serif;color:${C.navy}}
  .tiptap-wrap .ProseMirror h2{font-size:22px;font-weight:700;margin:16px 0 10px;font-family:'Syne',sans-serif;color:${C.dark}}
  .tiptap-wrap .ProseMirror h3{font-size:18px;font-weight:700;margin:14px 0 8px;font-family:'Syne',sans-serif;color:${C.dark}}
  .tiptap-wrap .ProseMirror p{margin-bottom:10px}
  .tiptap-wrap .ProseMirror p.is-editor-empty:first-child::before{
    content:attr(data-placeholder);color:${C.light};float:left;height:0;pointer-events:none
  }
  .tiptap-wrap .ProseMirror blockquote{
    border-left:4px solid ${C.bright};padding:12px 18px;margin:14px 0;
    background:${C.lightBlue};border-radius:0 8px 8px 0;font-style:italic;color:${C.mid}
  }
  .tiptap-wrap .ProseMirror ul,.tiptap-wrap .ProseMirror ol{padding-left:24px;margin:10px 0}
  .tiptap-wrap .ProseMirror li{margin-bottom:4px}
  .tiptap-wrap .ProseMirror table{width:100%;border-collapse:collapse;margin:14px 0}
  .tiptap-wrap .ProseMirror td,.tiptap-wrap .ProseMirror th{
    border:1px solid ${C.gray};padding:8px 12px;font-size:13px;position:relative
  }
  .tiptap-wrap .ProseMirror th{background:${C.lightBlue};font-weight:700;font-family:'DM Sans',sans-serif}
  .tiptap-wrap .ProseMirror .selectedCell::after{
    content:'';position:absolute;inset:0;background:rgba(40,69,214,0.08);pointer-events:none
  }
  .tiptap-wrap .ProseMirror code{
    background:${C.lightGray};padding:2px 6px;border-radius:4px;
    font-family:monospace;font-size:13px;color:${C.red}
  }
  .tiptap-wrap .ProseMirror pre{
    background:${C.dark};color:#e2e8f0;padding:16px 20px;border-radius:10px;
    margin:12px 0;overflow-x:auto;font-family:monospace;font-size:13px;line-height:1.6
  }
  .tiptap-wrap .ProseMirror pre code{background:transparent;color:inherit;padding:0}
  .tiptap-wrap .ProseMirror a{color:${C.bright};text-decoration:underline;cursor:pointer}
  .tiptap-wrap .ProseMirror img{max-width:100%;border-radius:8px;margin:8px 0}
  .tiptap-wrap .ProseMirror hr{border:none;border-top:2px solid ${C.gray};margin:20px 0}
  .tiptap-wrap .ProseMirror mark{background:#FEF08A;padding:0 2px;border-radius:2px}

  /* Focus ring on selected image */
  .tiptap-wrap .ProseMirror img.ProseMirror-selectednode{
    outline:3px solid ${C.bright};border-radius:8px
  }

  /* Toolbar button hover/active */
  .tool-btn:hover{background:${C.lightBlue}!important;color:${C.bright}!important}
  .tool-btn.active{background:${C.lightBlue}!important;color:${C.bright}!important}
`;

// ─── SVG icon helper ───────────────────────────────────────────────────────
const SVG = ({ d, size = 14, fill = "none", color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
);

// ─── Toolbar primitives ────────────────────────────────────────────────────
const Divider = () => (
    <div style={{ width: 1, height: 22, background: C.gray, margin: "0 3px" }} />
);

const ToolGroup = ({ children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 1, padding: "0 4px" }}>
      {children}
    </div>
);

const ToolBtn = ({ onClick, title, active, icon, children }) => (
    <button
        className={`tool-btn${active ? " active" : ""}`}
        title={title}
        onMouseDown={e => { e.preventDefault(); onClick?.(); }}
        style={{
          width: 30, height: 30, border: "none", borderRadius: 6, cursor: "pointer",
          background: "transparent", color: C.mid, display: "flex", alignItems: "center",
          justifyContent: "center", transition: "all 0.15s", flexShrink: 0,
        }}
    >
      {icon ? <SVG d={icon} size={14} /> : children}
    </button>
);

// ─── Initial content ───────────────────────────────────────────────────────
const INITIAL_CONTENT = `
<h1>O'quv kursi tavsifi</h1>
<p>Bu yerda <strong>kurs haqida batafsil ma'lumot</strong> kiritishingiz mumkin. Editor <em>TipTap</em> asosida qurilgan va barcha asosiy formatlash imkoniyatlarini qo'llab-quvvatlaydi.</p>
<h2>Kurs maqsadlari</h2>
<p>Ushbu kursda talabalar quyidagi ko'nikmalarni egallaydilar:</p>
<ul>
  <li>Dasturlash asoslarini o'rganish</li>
  <li>Amaliy loyihalar ustida ishlash</li>
  <li>Zamonaviy texnologiyalardan foydalanish</li>
</ul>
<blockquote>«Bilim – eng yaxshi boylik. Uni hech kim sizdan ololmaydi.»</blockquote>
<h2>Jadval</h2>
<table>
  <tbody>
    <tr><th>Hafta</th><th>Mavzu</th><th>Soat</th></tr>
    <tr><td>1-2</td><td>Kirish va asoslar</td><td>4</td></tr>
    <tr><td>3-4</td><td>Amaliy mashg'ulotlar</td><td>6</td></tr>
    <tr><td>5-6</td><td>Yakuniy loyiha</td><td>8</td></tr>
  </tbody>
</table>
<p>Batafsil ma'lumot uchun <a href="#">dastur sahifasiga</a> o'ting.</p>
`;

// ─── Main component ────────────────────────────────────────────────────────
export default function TipTapEditorPage() {
  const [saved, setSaved] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // ── TipTap editor instance ──────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // StarterKit includes: Bold, Italic, Strike, Code, Heading,
        // BulletList, OrderedList, Blockquote, CodeBlock, HorizontalRule, History
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({ multicolor: true }),
      Color,
      TextStyle,
      CharacterCount,
    ],
    content: INITIAL_CONTENT,
  });

  if (!editor) return null;

  // ─── Shortcuts ──────────────────────────────────────────────────────────
  const is = (name, attrs) => editor.isActive(name, attrs);
  const run = useCallback((fn) => fn(), []);

  const insertTable = () => {
    editor.chain().focus()
        .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
        .run();
    setShowTableModal(false);
  };

  const insertLink = () => {
    editor.chain().focus().setLink({ href: linkUrl }).run();
    setShowLinkModal(false);
    setLinkUrl("https://");
  };

  const insertImage = () => {
    if (imageUrl) editor.chain().focus().setImage({ src: imageUrl }).run();
    setShowImageModal(false);
    setImageUrl("");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const wordCount = editor.storage.characterCount.words?.() ?? 0;
  const charCount = editor.storage.characterCount.characters?.() ?? 0;

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
      <>
        <style>{css}</style>
        <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto", animation: "fadeUp 0.3s ease" }}>

          {/* Page header */}
          <div style={{ marginBottom: 22 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, fontFamily: "'Syne',sans-serif", marginBottom: 4 }}>
              Matn muharriri
            </h1>
            <p style={{ fontSize: 13, color: C.light }}>
              TipTap asosida boy matn muharriri — barcha formatlash amallar bilan
            </p>
          </div>

          {/* Document card */}
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.gray}`, boxShadow: "0 4px 20px rgba(13,26,99,0.06)" }}>

            {/* ── Document header bar ── */}
            <div style={{
              padding: "12px 16px", position: "sticky", top: 0, zIndex: 11,
              borderRadius: "16px 16px 0 0",
              background: `linear-gradient(135deg,${C.navy},${C.blue})`,
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10
            }}>
              <input
                  defaultValue="O'quv kursi tavsifi — MT-203 guruh"
                  style={{ flex: 1, background: "transparent", border: "none", color: C.white, fontSize: 14, fontWeight: 600, outline: "none" }}
                  placeholder="Hujjat nomi..."
              />
              <div style={{ display: "flex", gap: 6 }}>
                <button
                    onClick={() => setShowSource(p => !p)}
                    style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "rgba(255,255,255,0.15)", color: C.white, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                >
                  {showSource ? "Vizual" : "HTML"}
                </button>
                <button
                    onClick={handleSave}
                    style={{
                      padding: "5px 14px", borderRadius: 7, border: "none",
                      background: saved ? C.green : `linear-gradient(135deg,${C.orange},#ff9f6a)`,
                      color: C.white, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "background 0.3s"
                    }}
                >
                  {saved ? "✓ Saqlandi" : "Saqlash"}
                </button>
              </div>
            </div>

            {/* ── Toolbar ── */}
            <div style={{
              borderBottom: `1px solid ${C.gray}`, background: C.white,
              padding: "6px 8px", display: "flex", alignItems: "center",
              flexWrap: "wrap", gap: 2, position: "sticky", top: 49, zIndex: 10
            }}>

              {/* History */}
              <ToolGroup>
                <ToolBtn title="Orqaga (Ctrl+Z)" icon="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6M3 10l6-6"
                         onClick={() => editor.chain().focus().undo().run()} />
                <ToolBtn title="Oldinga (Ctrl+Y)" icon="M21 10H11a8 8 0 0 0-8 8v2M21 10l-6 6M21 10l-6-6"
                         onClick={() => editor.chain().focus().redo().run()} />
              </ToolGroup>
              <Divider />

              {/* Headings */}
              <ToolGroup>
                {[1, 2, 3].map(level => (
                    <button key={level} className={`tool-btn${is("heading", { level }) ? " active" : ""}`}
                            onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleHeading({ level }).run(); }}
                            style={{
                              padding: "0 7px", height: 30, border: "none", borderRadius: 6, cursor: "pointer",
                              background: "transparent", color: C.mid,
                              fontSize: level === 1 ? 14 : level === 2 ? 13 : 12,
                              fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s"
                            }}>
                      H{level}
                    </button>
                ))}
                <button className={`tool-btn${is("paragraph") ? " active" : ""}`}
                        onMouseDown={e => { e.preventDefault(); editor.chain().focus().setParagraph().run(); }}
                        style={{ padding: "0 7px", height: 30, border: "none", borderRadius: 6, cursor: "pointer", background: "transparent", color: C.mid, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                  P
                </button>
              </ToolGroup>
              <Divider />

              {/* Text formatting */}
              <ToolGroup>
                <ToolBtn title="Qalin (Ctrl+B)" active={is("bold")}
                         onClick={() => editor.chain().focus().toggleBold().run()}>
                  <b style={{ fontSize: 14 }}>B</b>
                </ToolBtn>
                <ToolBtn title="Kursiv (Ctrl+I)" active={is("italic")}
                         onClick={() => editor.chain().focus().toggleItalic().run()}>
                  <i style={{ fontSize: 14, fontFamily: "Georgia" }}>I</i>
                </ToolBtn>
                <ToolBtn title="Tagiga chiziq (Ctrl+U)" active={is("underline")}
                         onClick={() => editor.chain().focus().toggleUnderline().run()}>
                  <u style={{ fontSize: 14 }}>U</u>
                </ToolBtn>
                <ToolBtn title="Ustidan chiziq" active={is("strike")}
                         onClick={() => editor.chain().focus().toggleStrike().run()}>
                  <s style={{ fontSize: 14 }}>S</s>
                </ToolBtn>
              </ToolGroup>
              <Divider />

              {/* Color (TextStyle + Color extension) */}
              <ToolGroup>
                <label title="Matn rangi" style={{ width: 30, height: 30, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", flexShrink: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, borderBottom: `3px solid ${C.bright}` }}>A</span>
                  <input type="color" defaultValue={C.bright}
                         onChange={e => editor.chain().focus().setColor(e.target.value).run()}
                         style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                </label>
                <label title="Belgilash (highlight)" style={{ width: 30, height: 30, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, background: "#FEF08A", padding: "1px 4px", borderRadius: 3 }}>H</span>
                  <input type="color" defaultValue="#FEF08A"
                         onChange={e => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
                         style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                </label>
              </ToolGroup>
              <Divider />

              {/* Lists */}
              <ToolGroup>
                <ToolBtn title="Nuqtali ro'yxat" active={is("bulletList")}
                         icon="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"
                         onClick={() => editor.chain().focus().toggleBulletList().run()} />
                <ToolBtn title="Raqamli ro'yxat" active={is("orderedList")}
                         icon="M10 6h11M10 12h11M10 18h11M4 6l1-1v4M3 14h3l-3 4h3"
                         onClick={() => editor.chain().focus().toggleOrderedList().run()} />
              </ToolGroup>
              <Divider />

              {/* Align */}
              <ToolGroup>
                {[
                  { align: "left", icon: "M3 6h18M3 12h12M3 18h15", title: "Chap" },
                  { align: "center", icon: "M3 6h18M6 12h12M4 18h16", title: "Markazda" },
                  { align: "right", icon: "M3 6h18M9 12h12M6 18h15", title: "O'ng" },
                  { align: "justify", icon: "M3 6h18M3 12h18M3 18h18", title: "Tekislash" },
                ].map(({ align, icon, title }) => (
                    <ToolBtn key={align} title={title} icon={icon} active={is({ textAlign: align })}
                             onClick={() => editor.chain().focus().setTextAlign(align).run()} />
                ))}
              </ToolGroup>
              <Divider />

              {/* Indent (lists only via TipTap) */}
              <ToolGroup>
                <ToolBtn title="Chekinishni kamaytirish"
                         icon="M7 8l-4 4 4 4M3 12h14M21 4H11M21 20H11M21 12H17"
                         onClick={() => editor.chain().focus().liftListItem("listItem").run()} />
                <ToolBtn title="Chekinishni oshirish"
                         icon="M17 8l4 4-4 4M21 12H7M3 4h10M3 20h10M3 12H7"
                         onClick={() => editor.chain().focus().sinkListItem("listItem").run()} />
              </ToolGroup>
              <Divider />

              {/* Insert */}
              <ToolGroup>
                <ToolBtn title="Havola qo'shish" active={is("link")}
                         icon="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                         onClick={() => setShowLinkModal(true)} />
                <ToolBtn title="Havolani olib tashlash"
                         icon="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"
                         onClick={() => editor.chain().focus().unsetLink().run()} />
                <ToolBtn title="Jadval qo'shish"
                         icon="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
                         onClick={() => setShowTableModal(true)} />
                <ToolBtn title="Rasm qo'shish"
                         icon="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM21 15l-5-5L5 21"
                         onClick={() => setShowImageModal(true)} />
                <ToolBtn title="Chiziq qo'shish"
                         icon="M8 12h8M5 12h.01M19 12h.01"
                         onClick={() => editor.chain().focus().setHorizontalRule().run()} />
              </ToolGroup>
              <Divider />

              {/* Table operations (visible only when in table) */}
              {is("table") && (
                  <>
                    <ToolGroup>
                      <ToolBtn title="Ustun qo'shish (o'ng)"
                               icon="M3 3h7v18H3zM14 3h7v18h-7zM10.5 9v6"
                               onClick={() => editor.chain().focus().addColumnAfter().run()}>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>+S</span>
                      </ToolBtn>
                      <ToolBtn title="Satr qo'shish (quyi)"
                               icon="M3 3v7h18V3M3 14v7h18v-7M9 10.5h6"
                               onClick={() => editor.chain().focus().addRowAfter().run()}>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>+R</span>
                      </ToolBtn>
                      <ToolBtn title="Ustunni o'chirish"
                               icon="M3 3h7v18H3zM14 3h7v18h-7z"
                               onClick={() => editor.chain().focus().deleteColumn().run()}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>-S</span>
                      </ToolBtn>
                      <ToolBtn title="Satrni o'chirish"
                               onClick={() => editor.chain().focus().deleteRow().run()}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>-R</span>
                      </ToolBtn>
                      <ToolBtn title="Jadvalni o'chirish"
                               onClick={() => editor.chain().focus().deleteTable().run()}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>✕T</span>
                      </ToolBtn>
                    </ToolGroup>
                    <Divider />
                  </>
              )}

              {/* Block formats */}
              <ToolGroup>
                <ToolBtn title="Iqtibos" active={is("blockquote")}
                         icon="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                         onClick={() => editor.chain().focus().toggleBlockquote().run()} />
                <ToolBtn title="Kod bloki" active={is("codeBlock")}
                         icon="M16 18l6-6-6-6M8 6l-6 6 6 6"
                         onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
                <ToolBtn title="Inline kod" active={is("code")}
                         icon="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
                         onClick={() => editor.chain().focus().toggleCode().run()} />
                <ToolBtn title="Formatni tozalash"
                         icon="M6 6h.01M18 18l-6-6M6 18L18 6"
                         onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} />
              </ToolGroup>
            </div>

            {/* ── Editor area ── */}
            <div className="tiptap-wrap">
              {showSource ? (
                  <textarea
                      value={editor.getHTML()}
                      onChange={e => editor.commands.setContent(e.target.value, false)}
                      style={{
                        width: "100%", minHeight: 380, padding: 20, border: "none", resize: "vertical",
                        fontFamily: "monospace", fontSize: 12, color: C.dark, lineHeight: 1.7, background: C.lightGray
                      }}
                  />
              ) : (
                  <EditorContent editor={editor} />
              )}
            </div>

            {/* ── Footer ── */}
            <div style={{
              padding: "10px 16px", borderTop: `1px solid ${C.lightGray}`,
              display: "flex", alignItems: "center", justifyContent: "space-between", background: C.lightGray
            }}>
              <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 11, color: C.light }}>
                <b style={{ color: C.mid }}>{wordCount}</b> so'z
              </span>
                <span style={{ fontSize: 11, color: C.light }}>
                <b style={{ color: C.mid }}>{charCount}</b> belgi
              </span>
                {is("table") && (
                    <span style={{ fontSize: 11, background: C.lightBlue, color: C.bright, padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>
                  Jadval ichida
                </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "5px 14px", borderRadius: 7, border: `1px solid ${C.gray}`, background: C.white, fontSize: 12, color: C.mid, cursor: "pointer", fontFamily: "inherit" }}>
                  Ko'rinish
                </button>
                <button
                    onClick={handleSave}
                    style={{
                      padding: "5px 14px", borderRadius: 7, border: "none",
                      background: saved ? C.green : `linear-gradient(135deg,${C.bright},${C.blue})`,
                      color: C.white, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.3s"
                    }}
                >
                  {saved ? "✓ Saqlandi" : "Saqlash"}
                </button>
              </div>
            </div>
          </div>

          {/* ── MODALS ── */}
          {[showLinkModal, showTableModal, showImageModal].some(Boolean) && (
              <div
                  style={{ position: "fixed", inset: 0, background: "rgba(13,26,99,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, backdropFilter: "blur(4px)", animation: "fadeIn 0.2s" }}
                  onClick={e => { if (e.target === e.currentTarget) { setShowLinkModal(false); setShowTableModal(false); setShowImageModal(false); } }}
              >
                <div style={{ background: C.white, borderRadius: 16, padding: 24, width: 360, boxShadow: "0 20px 60px rgba(13,26,99,0.2)", animation: "fadeUp 0.25s ease" }}>

                  {/* Link modal */}
                  {showLinkModal && (<>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.dark, fontFamily: "'Syne',sans-serif", marginBottom: 16 }}>Havola qo'shish</h3>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.mid, marginBottom: 6, textTransform: "uppercase" }}>URL manzil</div>
                      <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                             onKeyDown={e => e.key === "Enter" && insertLink()}
                             style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `1.5px solid ${C.gray}`, fontSize: 13, color: C.dark, outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={insertLink}
                              style={{ padding: "8px 18px", borderRadius: 9, border: "none", background: `linear-gradient(135deg,${C.bright},${C.blue})`, color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        Qo'shish
                      </button>
                      <button onClick={() => setShowLinkModal(false)}
                              style={{ padding: "8px 14px", borderRadius: 9, border: `1px solid ${C.gray}`, background: C.white, color: C.mid, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                        Bekor
                      </button>
                    </div>
                  </>)}

                  {/* Table modal */}
                  {showTableModal && (<>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.dark, fontFamily: "'Syne',sans-serif", marginBottom: 16 }}>Jadval kiritish</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                      {[{ l: "Satrlar soni", v: tableRows, s: setTableRows }, { l: "Ustunlar soni", v: tableCols, s: setTableCols }].map(f => (
                          <div key={f.l}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: C.mid, marginBottom: 6, textTransform: "uppercase" }}>{f.l}</div>
                            <input type="number" min={1} max={20} value={f.v}
                                   onChange={e => f.s(+e.target.value)}
                                   style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${C.gray}`, fontSize: 14, color: C.dark, textAlign: "center", outline: "none" }} />
                          </div>
                      ))}
                    </div>
                    {/* Preview */}
                    <div style={{ marginBottom: 14, overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        {Array(Math.min(tableRows, 4)).fill(0).map((_, r) => (
                            <tr key={r}>
                              {Array(Math.min(tableCols, 5)).fill(0).map((_, c) => (
                                  <td key={c} style={{ border: `1px solid ${C.gray}`, padding: "5px 8px", fontSize: 11, background: r === 0 ? C.lightBlue : C.white, fontWeight: r === 0 ? 700 : 400, color: r === 0 ? C.bright : C.light }}>
                                    {r === 0 ? "Sarlavha" : "Ma'lumot"}
                                  </td>
                              ))}
                            </tr>
                        ))}
                      </table>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={insertTable}
                              style={{ padding: "8px 18px", borderRadius: 9, border: "none", background: `linear-gradient(135deg,${C.bright},${C.blue})`, color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        Kiritish
                      </button>
                      <button onClick={() => setShowTableModal(false)}
                              style={{ padding: "8px 14px", borderRadius: 9, border: `1px solid ${C.gray}`, background: C.white, color: C.mid, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                        Bekor
                      </button>
                    </div>
                  </>)}

                  {/* Image modal */}
                  {showImageModal && (<>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.dark, fontFamily: "'Syne',sans-serif", marginBottom: 16 }}>Rasm qo'shish</h3>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.mid, marginBottom: 6, textTransform: "uppercase" }}>Rasm URL</div>
                      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..."
                             style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `1.5px solid ${C.gray}`, fontSize: 13, color: C.dark, outline: "none" }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.mid, marginBottom: 6, textTransform: "uppercase" }}>Yoki fayl yuklash</div>
                      <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 9, border: `2px dashed ${C.gray}`, cursor: "pointer", background: C.lightGray }}>
                        <SVG d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" size={16} color={C.light} />
                        <span style={{ fontSize: 13, color: C.light }}>Faylni tanlash...</span>
                        <input type="file" accept="image/*" style={{ display: "none" }}
                               onChange={e => { if (e.target.files[0]) setImageUrl(URL.createObjectURL(e.target.files[0])); }} />
                      </label>
                    </div>
                    {imageUrl && <img src={imageUrl} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={insertImage}
                              style={{ padding: "8px 18px", borderRadius: 9, border: "none", background: `linear-gradient(135deg,${C.bright},${C.blue})`, color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        Kiritish
                      </button>
                      <button onClick={() => setShowImageModal(false)}
                              style={{ padding: "8px 14px", borderRadius: 9, border: `1px solid ${C.gray}`, background: C.white, color: C.mid, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                        Bekor
                      </button>
                    </div>
                  </>)}

                </div>
              </div>
          )}
        </div>
      </>
  );
}