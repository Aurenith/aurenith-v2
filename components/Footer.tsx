"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "48px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 700,
          fontSize: 20,
          marginBottom: 8,
        }}
      >
        aurenith<span style={{ color: "#7C3AED" }}>.team</span>
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
        Built with ⚡ by five engineers who refuse to lose.
      </p>
    </footer>
  );
}
