"use client";

interface LoginPageProps {
  adminPass: string;
  setAdminPass: (pass: string) => void;
  onLogin: () => void;
  error: string;
  onBack: () => void;
}

export default function LoginPage({
  adminPass,
  setAdminPass,
  onLogin,
  error,
  onBack,
}: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-dm-sans), sans-serif",
        color: "#fff",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420, padding: 24 }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 32,
            fontFamily: "inherit",
          }}
        >
          ← Back to site
        </button>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              marginBottom: 24,
            }}
          >
            🔐
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 800,
              fontSize: 28,
              marginBottom: 8,
            }}
          >
            Admin Access
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
            aurenith.team internal panel
          </p>
          <input
            type="password"
            placeholder="Enter access code"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "14px 16px",
              color: "#fff",
              fontSize: 14,
              fontFamily: "inherit",
              outline: "none",
              marginBottom: 8,
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: "#F87171", marginBottom: 16 }}>{error}</p>
          )}
          <button
            onClick={onLogin}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
              border: "none",
              color: "#fff",
              padding: "14px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              marginTop: error ? 0 : 8,
            }}
          >
            Sign In →
          </button>
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(255,255,255,0.15)",
              marginTop: 20,
            }}
          >
            Hint: aurenith2024
          </p>
        </div>
      </div>
    </div>
  );
}
