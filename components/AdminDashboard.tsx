"use client";

import { CSSProperties, useState } from "react";
import { TeamMember, Hackathon } from "@/types";
import AvatarImage from "./AvatarImage";
import MemberForm from "./MemberForm";
import HackForm from "./HackForm";

interface AdminDashboardProps {
  members: TeamMember[];
  hackathons: Hackathon[];
  onSaveMember: (member: TeamMember) => void;
  onDeleteMember: (id: number) => void;
  onSaveHack: (hackathon: Hackathon) => void;
  onDeleteHack: (id: number) => void;
  editingMember: number | null;
  setEditingMember: (id: number | null) => void;
  editingHack: number | null;
  setEditingHack: (id: number | null) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  newMember: boolean;
  setNewMember: (val: boolean) => void;
  newHack: boolean;
  setNewHack: (val: boolean) => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  members,
  hackathons,
  onSaveMember,
  onDeleteMember,
  onSaveHack,
  onDeleteHack,
  editingMember,
  setEditingMember,
  editingHack,
  setEditingHack,
  activeSection,
  setActiveSection,
  newMember,
  setNewMember,
  newHack,
  setNewHack,
  onLogout,
}: AdminDashboardProps) {
  const emptyMember: TeamMember = {
    id: 0,
    name: "",
    role: "",
    bio: "",
    skills: [],
    imageUrl: "",
    color: "#7C3AED",
    social: { github: "", linkedin: "" },
  };

  const emptyHack: Hackathon = {
    id: 0,
    name: "",
    result: "",
    year: new Date().getFullYear().toString(),
    description: "",
    tags: [],
    highlight: false,
  };

  const [memberForm, setMemberForm] = useState<TeamMember | null>(null);
  const [hackForm, setHackForm] = useState<Hackathon | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const openMemberEdit = (m: TeamMember) => {
    setMemberForm({ ...m, skills: [...(m.skills || [])] });
    setEditingMember(m.id);
    setEditingHack(null);
  };

  const openNewMember = () => {
    setMemberForm({ ...emptyMember, skills: [] });
    setNewMember(true);
    setEditingMember(null);
  };

  const openHackEdit = (h: Hackathon) => {
    setHackForm({ ...h, tags: [...(h.tags || [])] });
    setEditingHack(h.id);
    setEditingMember(null);
  };

  const openNewHack = () => {
    setHackForm({ ...emptyHack, tags: [] });
    setNewHack(true);
    setEditingHack(null);
  };

  const cancelForm = () => {
    setMemberForm(null);
    setHackForm(null);
    setEditingMember(null);
    setEditingHack(null);
    setNewMember(false);
    setNewHack(false);
    setSkillInput("");
    setTagInput("");
  };

  const sideItems = [
    { id: "members", label: "Team Members", icon: "👥" },
    { id: "hackathons", label: "Hackathons", icon: "🏆" },
  ];

  const inp = (style: CSSProperties = {}): CSSProperties => ({
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "11px 14px",
    color: "#fff",
    fontSize: 13,
    fontFamily: "var(--font-dm-sans), sans-serif",
    outline: "none",
    width: "100%",
    ...style,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050508",
        fontFamily: "var(--font-dm-sans), sans-serif",
        color: "#fff",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "0 20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            aurenith<span style={{ color: "#7C3AED" }}>.team</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
            Admin Dashboard
          </div>
        </div>
        {sideItems.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setActiveSection(s.id);
              cancelForm();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              background:
                activeSection === s.id ? "rgba(124,58,237,0.15)" : "transparent",
              border: "none",
              color: activeSection === s.id ? "#A78BFA" : "rgba(255,255,255,0.45)",
              fontSize: 13,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              borderLeft:
                activeSection === s.id
                  ? "2px solid #7C3AED"
                  : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", padding: "0 20px" }}>
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "10px",
              color: "rgba(255,255,255,0.3)",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Back to Site
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
        {activeSection === "members" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                  }}
                >
                  Team Members
                </h1>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 4,
                  }}
                >
                  {members.length} members
                </p>
              </div>
              <button
                onClick={openNewMember}
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 10,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 500,
                }}
              >
                + Add Member
              </button>
            </div>

            {(newMember || editingMember) && memberForm && (
              <MemberForm
                form={memberForm}
                setForm={setMemberForm}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                inp={inp}
                onSave={() => {
                  onSaveMember(memberForm);
                  cancelForm();
                }}
                onCancel={cancelForm}
              />
            )}

            <div style={{ display: "grid", gap: 12 }}>
              {members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 14,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: m.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <AvatarImage src={m.imageUrl} alt={m.name}>
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarImage>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.35)",
                        marginTop: 2,
                      }}
                    >
                      {m.role}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openMemberEdit(m)}
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        color: "#A78BFA",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteMember(m.id)}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#F87171",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "hackathons" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                  }}
                >
                  Hackathons
                </h1>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 4,
                  }}
                >
                  {hackathons.length} entries
                </p>
              </div>
              <button
                onClick={openNewHack}
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 10,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 500,
                }}
              >
                + Add Hackathon
              </button>
            </div>

            {(newHack || editingHack) && hackForm && (
              <HackForm
                form={hackForm}
                setForm={setHackForm}
                tagInput={tagInput}
                setTagInput={setTagInput}
                inp={inp}
                onSave={() => {
                  onSaveHack(hackForm);
                  cancelForm();
                }}
                onCancel={cancelForm}
              />
            )}

            <div style={{ display: "grid", gap: 12 }}>
              {hackathons.map((h) => (
                <div
                  key={h.id}
                  style={{
                    background: h.highlight
                      ? "rgba(124,58,237,0.05)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${
                      h.highlight
                        ? "rgba(124,58,237,0.3)"
                        : "rgba(255,255,255,0.06)"
                    }`,
                    borderRadius: 14,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ fontSize: 24, flexShrink: 0 }}>
                    {h.highlight ? "🏆" : "⭐"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{h.name}</div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.35)",
                        marginTop: 2,
                      }}
                    >
                      {h.result} · {h.year}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openHackEdit(h)}
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        color: "#A78BFA",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteHack(h.id)}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#F87171",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
