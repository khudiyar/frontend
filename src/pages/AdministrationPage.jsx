import { useState, useEffect, useRef } from "react";
import C from "../constants/colors";
import Ico from "../components/ui/Ico";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import IcoBadge from "../components/ui/IcoBadge";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCountUp } from "../hooks";

import { timeline } from "../data/about";

function AdministrationPage({ navigate, isMobile }) {
  const leadership = [
    { name: "Prof. Botir Yusupov",    role: "Rektor",                 exp: "28 yil" },
    { name: "Prof. Dilnora Karimova", role: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha birinchi prorektori", exp: "22 yil" },
    { name: "Prof. Dilnora Karimova", role: "O'quv ishlari prorektori", exp: "22 yil" },
    { name: "Prof. Jasur Toshmatov",  role: "Ilmiy ishlar prorektori",  exp: "20 yil" },
    { name: "Prof. Sarvar Nazarov",   role: "Xalqaro aloqalar prorektori", exp: "18 yil" },
    { name: "Prof. Sarvar Nazarov",   role: "Xalqaro aloqalar prorektori", exp: "18 yil" },
  ];

  const [rector, ...deputies] = leadership;

  return (
      <div style={{ background: C.lightGray, minHeight: "100vh" }}>
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px 32px" : "0 24px 52px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ color: C.orange, fontWeight: 700, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8, marginTop: 8 }}>Rektorat</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, color: C.dark, fontFamily: "'Playfair Display',Georgia,serif" }}>Universitet rahbariyati</h2>
          </div>

          {/* Rektor — 1-qator, katta karta, markazda */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div
                style={{
                  background: C.white,
                  borderRadius: 20,
                  padding: isMobile ? "28px 24px" : "36px 48px",
                  textAlign: "center",
                  border: `1px solid ${C.gray}`,
                  width: isMobile ? "100%" : 340,
                  transition: "all 0.25s",
                  animation: "fadeUp 0.4s ease both",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 48px rgba(13,26,99,0.14)";
                  e.currentTarget.style.borderColor = C.bright;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = C.gray;
                }}
            >
              {/* Decorative top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.bright}, ${C.orange})`, borderRadius: "20px 20px 0 0" }} />

              <div style={{
                width: 88, height: 88, borderRadius: "50%",
                background: `linear-gradient(135deg,${C.bright}20,${C.orange}28)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
                border: `3px solid ${C.bright}30`,
              }}>
                <Ico name="user" size={44} color={C.bright} />
              </div>

              <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 6, fontFamily: "'Playfair Display',Georgia,serif" }}>{rector.name}</div>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5, marginBottom: 14 }}>{rector.role}</div>
              <Badge label={rector.exp} color={C.bright} />
            </div>
          </div>

          {/* Prorektorlar — 2-qator, standart */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${deputies.length}, 1fr)`,
            gap: 16,
          }}>
            {deputies.map((l, i) => (
                <div
                    key={i}
                    style={{
                      background: C.white, borderRadius: 16, padding: 22,
                      textAlign: "center", border: `1px solid ${C.gray}`,
                      transition: "all 0.25s",
                      animation: `fadeUp 0.4s ${(i + 1) * 80}ms ease both`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 16px 40px rgba(13,26,99,0.12)";
                      e.currentTarget.style.borderColor = C.bright;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = C.gray;
                    }}
                >
                  <div style={{
                    width: isMobile ? 52 : 64, height: isMobile ? 52 : 64, borderRadius: "50%",
                    background: `linear-gradient(135deg,${C.bright}16,${C.orange}20)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                    border: `2px solid ${C.bright}18`,
                  }}>
                    <Ico name="user" size={isMobile ? 24 : 30} color={C.bright} />
                  </div>
                  <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 700, color: C.dark, marginBottom: 5, fontFamily: "'Playfair Display',Georgia,serif" }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.4, marginBottom: 10 }}>{l.role}</div>
                  <Badge label={l.exp} color={C.bright} />
                </div>
            ))}
          </div>

        </section>
      </div>
  );
}

export default AdministrationPage;