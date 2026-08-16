"use client";

import { MouseEvent } from "react";
import { TeamMember } from "@/types";
import AvatarImage from "./AvatarImage";

interface MemberCardProps {
  member: TeamMember;
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="member-card fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: member.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            flexShrink: 0,
            boxShadow: `0 0 20px ${member.color}50`,
            overflow: "hidden",
          }}
        >
          <AvatarImage src={member.imageUrl} alt={member.name}>
            <span>{initials}</span>
          </AvatarImage>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.01em",
            }}
          >
            {member.name}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
            {member.role}
          </div>
        </div>
      </div>
      <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {member.bio}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {(member.skills || []).map((s) => (
          <span key={s} className="skill-tag">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
