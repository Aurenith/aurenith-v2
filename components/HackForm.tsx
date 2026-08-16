"use client";

import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Hackathon } from "@/types";

interface HackFormProps {
  form: Hackathon;
  setForm: Dispatch<SetStateAction<Hackathon | null>>;
  tagInput: string;
  setTagInput: (val: string) => void;
  inp: (style?: CSSProperties) => CSSProperties;
  onSave: () => void;
  onCancel: () => void;
}

export default function HackForm({
  form,
  setForm,
  tagInput,
  setTagInput,
  inp,
  onSave,
  onCancel,
}: HackFormProps) {
  const addTag = () => {
    if (tagInput.trim() && !(form.tags || []).includes(tagInput.trim())) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

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
        {form.id ? "Edit Hackathon" : "New Hackathon"}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <input
          style={inp()}
          placeholder="Hackathon name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={inp()}
          placeholder="Result (e.g. 🏆 Winners)"
          value={form.result}
          onChange={(e) => setForm({ ...form, result: e.target.value })}
        />
        <input
          style={inp()}
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
      </div>
      <textarea
        style={{ ...inp(), height: 72, resize: "vertical", marginBottom: 12 }}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          style={inp({ flex: 1 })}
          placeholder="Add tag & press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button
          onClick={addTag}
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
        {(form.tags || []).map((t) => (
          <span
            key={t}
            onClick={() =>
              setForm({ ...form, tags: form.tags.filter((x) => x !== t) })
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
            {t} ×
          </span>
        ))}
      </div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
          marginBottom: 20,
        }}
      >
        <input
          type="checkbox"
          checked={form.highlight || false}
          onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
          style={{ accentColor: "#7C3AED" }}
        />
        Feature this hackathon (golden highlight)
      </label>
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
