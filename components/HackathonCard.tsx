"use client";

import { Hackathon } from "@/types";

interface HackathonCardProps {
  hackathon: Hackathon;
  index: number;
}

export default function HackathonCard({ hackathon, index }: HackathonCardProps) {
  return (
    <div
      className={`hack-card fade-up ${hackathon.highlight ? "highlight" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {hackathon.name}
          </span>
          {hackathon.highlight && (
            <span
              style={{
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.3)",
                borderRadius: 100,
                padding: "2px 10px",
                fontSize: 10,
                color: "#FCD34D",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Featured
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          {hackathon.description}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(hackathon.tags || []).map((t) => (
            <span key={t} className="skill-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {hackathon.result}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{hackathon.year}</div>
      </div>
    </div>
  );
}
