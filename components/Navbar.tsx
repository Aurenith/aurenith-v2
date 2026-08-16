"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  onAdminClick: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    ["About", "about"],
    ["Team", "team"],
    ["Wins", "hackathons"],
  ] as const;

  return (
    <>
      <nav
        className="nav-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          background: scrollY > 50 ? "rgba(5,5,8,0.8)" : "transparent",
          borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 101 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "var(--font-syne), sans-serif",
              overflow: "hidden",
            }}
          >
            <img
              src="/aurenith.png"
              alt="aurenith"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "0.02em",
            }}
          >
            aurenith<span style={{ color: "#7C3AED" }}>.team</span>
          </span>
        </div>

        <div className="desktop-nav">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className="nav-link"
              style={{ background: "none", border: "none", fontFamily: "inherit", cursor: "none" }}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
          <Link
            href="/e-sign"
            className="nav-link"
            style={{ color: "#A78BFA" }}
          >
            E-Sign ✍️
          </Link>
          <button
            className="ghost-btn"
            style={{ fontSize: 11, padding: "8px 20px" }}
            onClick={onAdminClick}
          >
            Admin ↗
          </button>
        </div>

        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navItems.map(([label, id]) => (
          <button
            key={id}
            className="nav-link"
            style={{ background: "none", border: "none", fontFamily: "inherit", cursor: "none" }}
            onClick={() => {
              scrollTo(id);
              setMobileMenuOpen(false);
            }}
          >
            {label}
          </button>
        ))}
        <Link
          href="/e-sign"
          className="nav-link"
          style={{ color: "#A78BFA", fontSize: 28 }}
          onClick={() => setMobileMenuOpen(false)}
        >
          E-Sign ✍️
        </Link>
        <button
          className="glow-btn"
          style={{ fontSize: 14, padding: "14px 32px", marginTop: 24 }}
          onClick={() => {
            onAdminClick();
            setMobileMenuOpen(false);
          }}
        >
          Admin Access
        </button>
      </div>
    </>
  );
}
