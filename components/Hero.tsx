"use client";

import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="grid-noise"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 70%)",
          bottom: "20%",
          right: "15%",
          pointerEvents: "none",
        }}
      />

      <div
        className="fade-up"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(124,58,237,0.1)",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#7C3AED",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#A78BFA",
          }}
        >
          Active Hackathon Team
        </span>
      </div>

      <h1
        className="fade-up delay-1"
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "clamp(52px, 8vw, 96px)",
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}
      >
        We build at<br />
        <span
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #DB2777 50%, #F59E0B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          full speed.
        </span>
      </h1>

      <p
        className="fade-up delay-2"
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.45)",
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 48,
        }}
      >
        Five engineers. One mission. Turning ideas into working products in 36 hours or less. Recently crowned hackathon champions.
      </p>

      <div
        className="fade-up delay-3"
        style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
      >
        <button className="glow-btn" onClick={() => scrollTo("team")}>
          Meet the Team
        </button>
        <button className="ghost-btn" onClick={() => scrollTo("hackathons")}>
          Our Wins
        </button>
      </div>

      {/* Trophy badge */}
      <div
        className="fade-up delay-4"
        style={{
          marginTop: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div className="trophy-glow" style={{ fontSize: 56 }}>
          🏆
        </div>
        <div
          style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: 100,
            padding: "8px 24px",
          }}
        >
          <span style={{ fontSize: 13, color: "#FCD34D", letterSpacing: "0.05em" }}>
            36-Hour Hackathon Champions
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.3,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}
