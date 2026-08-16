"use client";

import { Hackathon } from "@/types";
import HackathonCard from "./HackathonCard";

interface HackathonListProps {
  hackathons: Hackathon[];
}

export default function HackathonList({ hackathons }: HackathonListProps) {
  return (
    <section id="hackathons" style={{ padding: "80px 48px", width: "100%" }}>
      <div style={{ marginBottom: 60 }}>
        <div className="section-label">Battle Record</div>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          We don't just
          <br />
          participate. We win.
        </h2>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {hackathons.map((h, i) => (
          <HackathonCard key={h.id} hackathon={h} index={i} />
        ))}
      </div>
    </section>
  );
}
