"use client";

import { CSSProperties, Dispatch, SetStateAction } from "react";
import { TeamMember } from "@/types";
import AvatarImage from "./AvatarImage";

interface MemberFormProps {
  form: TeamMember;
  setForm: Dispatch<SetStateAction<TeamMember | null>>;
  skillInput: string;
  setSkillInput: (val: string) => void;
  inp: (style?: CSSProperties) => CSSProperties;
  onSave: () => void;
  onCancel: () => void;
}

export default function MemberForm({
  form,
  setForm,
  skillInput,
  setSkillInput,
  inp,
  onSave,
  onCancel,
}: MemberFormProps) {
  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const initials = form.name
    ? form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      style={{
        background: "rgba(124,58,237,0.05)",
        border: "1px solid rgba(124,58,237,0.2)",
        borderRadius: 16,
        padding: 28,
        marginBottom: 24,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        {form.id ? "Edit Member" : "New Member"}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <input
          style={inp()}
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={inp()}
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
      </div>
      <textarea
        style={{ ...inp(), height: 80, resize: "vertical", marginBottom: 12 }}
        placeholder="Bio"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      {/* Image URL + preview */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: form.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            flexShrink: 0,
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.1)",
          }}
        >
          <AvatarImage src={form.imageUrl} alt="preview">
            <span>{initials}</span>
          </AvatarImage>
        </div>
        <input
          style={inp({ flex: 1 })}
          placeholder="Profile image URL (optional)"
          value={form.imageUrl || ""}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          style={inp({ flex: 1 })}
          placeholder="Add skill & press Enter"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <button
          onClick={addSkill}
          style={{
            background: "rgba(124,58,237,0.3)",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "#A78BFA",
            padding: "0 16px",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
          }}
        >
          Add
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {form.skills.map((s) => (
          <span
            key={s}
            onClick={() =>
              setForm({ ...form, skills: form.skills.filter((x) => x !== s) })
            }
            style={{
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 100,
              padding: "3px 10px",
              fontSize: 11,
              color: "#A78BFA",
              cursor: "pointer",
            }}
          >
            {s} ×
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          Fallback color:
        </label>
        <input
          type="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          style={{ width: 40, height: 32, border: "none", background: "none", cursor: "pointer" }}
        />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          Used when no image is set
        </span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onSave}
          style={{
            background: "linear-gradient(135deg, #7C3AED, #DB2777)",
            border: "none",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: 10,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
