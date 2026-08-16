"use client";

import { TeamMember } from "@/types";
import MemberCard from "./MemberCard";

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <section id="team" style={{ padding: "80px 48px", width: "100%" }}>
      <div style={{ marginBottom: 60 }}>
        <div className="section-label">The Team</div>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Built for speed,
          <br />
          wired for impact.
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {members.map((m, i) => (
          <MemberCard key={m.id} member={m} index={i} />
        ))}
      </div>
    </section>
  );
}
