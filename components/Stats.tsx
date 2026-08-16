"use client";

export default function Stats() {
  const statsList = [
    { num: "5", label: "Elite Engineers" },
    { num: "36hrs", label: "Fastest Delivery" },
    { num: "3+", label: "Hackathons Won" },
    { num: "200+", label: "Teams Beaten" },
  ];

  return (
    <section id="about" style={{ padding: "80px 48px", width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
        }}
      >
        {statsList.map((s, i) => (
          <div
            key={i}
            className="fade-up"
            style={{
              animationDelay: `${i * 0.1}s`,
              textAlign: "center",
              padding: 32,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: 44,
                fontWeight: 800,
                background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
