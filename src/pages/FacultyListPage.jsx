import { useState } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { faculties } from "../data/faculties";
import { departments } from "../data/departments";
import {useTitle} from "../hooks/useTitle.js";

const TYPES = ["Fakultet", "Kafedra"];

function FacultyListPage({ navigate, isMobile }) {

    useTitle("Fakultet va kafedralar")

    const [search, setSearch] = useState("");
    const [type, setType] = useState("Fakultet");

    const filteredFaculties = faculties.filter(f => {
        const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.short.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    const filteredDepartments = departments.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    return (
        <div style={{ background: C.lightGray, minHeight: "100vh" }}>

            {/* Hero */}
            <div style={{ background: `linear-gradient(135deg,${C.navy},${C.blue})`, padding: isMobile ? "28px 16px" : "44px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}/>
                <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                    <Breadcrumb items={[{ label: "Bosh sahifa", page: "home" }, { label: "Fakultetlar" }]} navigate={navigate}/>
                    <h1 style={{ color: C.white, fontSize: isMobile ? 22 : "clamp(24px,4vw,40px)", fontWeight: 800, fontFamily: "'Playfair Display',Georgia,serif", marginBottom: 8 }}>
                        Fakultetlar va kafedralar
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 20 }}>
                        13 ta fakultet · 56 ta ta'lim yo'nalishi · 1918-yildan buyon
                    </p>

                    {/* Type toggle */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                        {TYPES.map(t => (
                            <button key={t} onClick={() => setType(t)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, border: type === t ? "none" : "1px solid rgba(255,255,255,0.28)", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13, background: type === t ? `linear-gradient(135deg,${C.orange},#ff9f6a)` : "rgba(255,255,255,0.1)", color: C.white, backdropFilter: "blur(4px)", transition: "all 0.2s", boxShadow: type === t ? "0 4px 14px rgba(246,128,72,0.35)" : "none" }}>
                                <Ico name={t === "Fakultet" ? "university" : "building2"} size={15} color={C.white}/>
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 14px", maxWidth: 400, border: "1px solid rgba(255,255,255,0.18)" }}>
                        <Ico name="search" size={16} color="rgba(255,255,255,0.5)"/>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={`${type} qidiring...`}
                            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "inherit", color: C.white, background: "transparent" }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "16px 12px 80px" : "32px 24px 60px", boxSizing: "border-box" }}>

                {type === "Fakultet" ? (
                    <>
                        <p style={{ fontSize: 13, color: C.light, marginBottom: 14 }}>{filteredFaculties.length} ta natija</p>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: isMobile ? 8 : 14 }}>
                            {filteredFaculties.map((fac, i) => (
                                <div
                                    key={fac.id}
                                    onClick={() => navigate("faculty-detail", { facId: fac.id })}
                                    style={{ background: C.white, borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "stretch", border: `1px solid ${C.gray}`, cursor: "pointer", transition: "all 0.22s ease", animation: `fadeUp 0.4s ${i * 35}ms ease both`, minWidth: 0 }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,26,99,0.13)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = fac.color; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.gray; }}
                                >
                                    <div style={{ width: isMobile ? 64 : 80, minWidth: isMobile ? 64 : 80, background: `linear-gradient(135deg,${fac.color}14,${fac.color}28)`, borderRight: `3px solid ${fac.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <div style={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 12, background: `${fac.color}22`, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${fac.color}30` }}>
                                            <Ico name={fac.icon} size={isMobile ? 20 : 24} color={fac.color} sw={1.5}/>
                                        </div>
                                    </div>
                                    <div style={{ padding: isMobile ? "12px 12px" : "14px 16px", flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 20, background: `${fac.color}18`, color: fac.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", flexShrink: 0 }}>{fac.short}</span>
                                        </div>
                                        <h3 style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: C.dark, lineHeight: 1.35, marginBottom: 10, fontFamily: "'Playfair Display',Georgia,serif", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", wordBreak: "break-word" }}>
                                            {fac.name}
                                        </h3>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.mid }}>
                        <Ico name="users" size={12} color={C.light}/>{fac.students.toLocaleString()} talaba
                      </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.mid }}>
                        <Ico name="bookOpen" size={12} color={C.light}/>{fac.programs} dastur
                      </span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", padding: "0 14px", flexShrink: 0 }}>
                                        <Ico name="chevRight" size={16} color={fac.color}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <p style={{ fontSize: 13, color: C.light, marginBottom: 14 }}>{filteredDepartments.length} ta natija</p>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: isMobile ? 8 : 14 }}>
                            {filteredDepartments.map((dept, i) => {
                                const parentFac = faculties.find(f => f.id === dept.facId);
                                const color = parentFac?.color || C.bright;
                                return (
                                    <div
                                        key={dept.id}
                                        onClick={() => navigate("dept-detail", { deptId: dept.id })}
                                        style={{ background: C.white, borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "stretch", border: `1px solid ${C.gray}`, cursor: "pointer", transition: "all 0.22s ease", animation: `fadeUp 0.4s ${i * 35}ms ease both`, minWidth: 0 }}
                                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,26,99,0.13)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = color; }}
                                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.gray; }}
                                    >
                                        {/* Left icon */}
                                        <div style={{ width: isMobile ? 64 : 80, minWidth: isMobile ? 64 : 80, background: `linear-gradient(135deg,${color}14,${color}28)`, borderRight: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <div style={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${color}30` }}>
                                                <Ico name={dept.icon || "building2"} size={isMobile ? 20 : 24} color={color} sw={1.5}/>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div style={{ padding: isMobile ? "12px 12px" : "14px 16px", flex: 1, minWidth: 0 }}>
                                            {/* Faculty badge */}
                                            {parentFac && (
                                                <div style={{ marginBottom: 5 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 9px", borderRadius: 20, background: `${color}18`, color, fontSize: 10, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                            <Ico name="university" size={9} color={color}/>{parentFac.short}
                          </span>
                                                </div>
                                            )}
                                            <h3 style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: C.dark, lineHeight: 1.35, marginBottom: 8, fontFamily: "'Playfair Display',Georgia,serif", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", wordBreak: "break-word" }}>
                                                {dept.name}
                                            </h3>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                                {dept.head?.name && (
                                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.mid }}>
                            <Ico name="user" size={11} color={C.light}/>{dept.head.name}
                          </span>
                                                )}
                                                {dept.teacherCount && (
                                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.mid }}>
                            <Ico name="users" size={11} color={C.light}/>{dept.teacherCount} o'qituvchi
                          </span>
                                                )}
                                                {dept.year && (
                                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.mid }}>
                            <Ico name="calendar" size={11} color={C.light}/>{dept.year}-yil
                          </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div style={{ display: "flex", alignItems: "center", padding: "0 14px", flexShrink: 0 }}>
                                            <Ico name="chevRight" size={16} color={color}/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FacultyListPage;