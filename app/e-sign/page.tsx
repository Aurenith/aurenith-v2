"use client";

import React, { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import SignaturePad from "@/components/SignaturePad";
import Footer from "@/components/Footer";
import { ESignResponse } from "@/types";

export default function ESignPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Full Stack Developer");
  const [customRole, setCustomRole] = useState("");
  const [joinedDate, setJoinedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [recipientGmail, setRecipientGmail] = useState("xnishidh.codes@gmail.com");
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successResult, setSuccessResult] = useState<ESignResponse | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const finalRole = role === "Other" ? customRole : role;

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!finalRole.trim()) {
      setErrorMsg("Please specify your team role.");
      return;
    }
    if (!signatureDataUrl) {
      setErrorMsg("Please draw or type your digital signature before submitting.");
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg("You must accept the Aurenith Team Code of Conduct to complete e-signing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/e-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          role: finalRole.trim(),
          joinedDate,
          recipientGmail: recipientGmail.trim(),
          signatureDataUrl,
        }),
      });

      const data: ESignResponse = await response.json();

      if (data.success) {
        setSuccessResult(data);
      } else {
        setErrorMsg(data.message || "Failed to process e-signature.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setRole("Full Stack Developer");
    setCustomRole("");
    setSignatureDataUrl("");
    setAgreedToTerms(false);
    setSuccessResult(null);
    setErrorMsg("");
  };

  return (
    <div
      style={{
        background: "#050508",
        minHeight: "100vh",
        fontFamily: "var(--font-dm-sans), sans-serif",
        color: "#fff",
        cursor: "none",
      }}
    >
      <CustomCursor />

      {/* Navigation Header */}
      <nav
        style={{
          padding: "20px 48px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(20px)",
          background: "rgba(5,5,8,0.8)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src="/aurenith.png" alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
            aurenith<span style={{ color: "#7C3AED" }}>.team</span>
          </span>
        </Link>

        <Link href="/" className="ghost-btn" style={{ fontSize: 11, padding: "8px 20px" }}>
          ← Back to Portfolio
        </Link>
      </nav>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 16,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3AED" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A78BFA" }}>
              Member Onboarding Portal
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            E-Sign Agreement
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
            Welcome to Aurenith. Complete your digital signature and pledge to officially join the engineering roster. Signed copies will be delivered to both your email address and the admin Gmail.
          </p>
        </div>

        {successResult ? (
          /* Success Screen */
          <div
            style={{
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 24,
              padding: 40,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                margin: "0 auto 24px",
              }}
            >
              ✍️
            </div>
            <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 12 }}>
              E-Signature Verified!
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
              {successResult.message}
            </p>

            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 24,
                textAlign: "left",
                maxWidth: 480,
                margin: "0 auto 32px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Document Ref:</span>
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA" }}>{successResult.submissionId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Signed By:</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{successResult.details?.fullName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Role:</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{successResult.details?.role}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Delivered To:</span>
                <span style={{ fontSize: 12, color: "#FCD34D" }}>{successResult.details?.recipientGmail}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <button className="glow-btn" onClick={resetForm}>
                Sign Another Member
              </button>
              <Link href="/" className="ghost-btn" style={{ display: "inline-flex", alignItems: "center" }}>
                Return to Team
              </Link>
            </div>
          </div>
        ) : (
          /* Onboarding Form */
          <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: 32 }}>
            {/* Agreement Document Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 32,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 20 }}>📜</span>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 18, fontWeight: 700 }}>
                  Aurenith Team Code of Conduct & Pledge
                </h3>
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  padding: 20,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                <p style={{ marginBottom: 12 }}>
                  <strong>1. Speed & Precision:</strong> We build products in 36 hours or less with uncompromising engineering quality.
                </p>
                <p style={{ marginBottom: 12 }}>
                  <strong>2. Unwavering Collaboration:</strong> We support team members across frontend, backend, ML, UI/UX, and cloud infrastructure.
                </p>
                <p style={{ marginBottom: 12 }}>
                  <strong>3. Winner's Mindset:</strong> We show up with relentless focus, push through high-pressure sprints, and deliver working solutions.
                </p>
                <p>
                  By affixing your digital signature below, you officially declare your commitment as a member of Aurenith.
                </p>
              </div>
            </div>

            {/* Member Details */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 32,
              }}
            >
              <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                1. Member Information
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@aurenith.space"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Team Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: "100%",
                      background: "#0a0a12",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  >
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="ML & Data Engineer">ML & Data Engineer</option>
                    <option value="DevOps & Cloud Architect">DevOps & Cloud Architect</option>
                    <option value="Other">Custom Role...</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Joined Date
                  </label>
                  <input
                    type="date"
                    value={joinedDate}
                    onChange={(e) => setJoinedDate(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {role === "Other" && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Custom Role Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI Research Lead"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
              )}

              {/* Destination Gmail */}
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#A78BFA", marginBottom: 6 }}>
                  Send E-Signed Document To (Gmail) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="xnishidh.codes@gmail.com"
                  value={recipientGmail}
                  onChange={(e) => setRecipientGmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Signature Section */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 32,
              }}
            >
              <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                2. Digital Signature
              </h3>

              <SignaturePad
                onSignatureChange={(url) => setSignatureDataUrl(url)}
                typedName={fullName}
              />
            </div>

            {/* Agreement Checkbox & Submit */}
            <div style={{ display: "grid", gap: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={{ accentColor: "#7C3AED", width: 18, height: 18 }}
                />
                I agree to the Aurenith Team Code of Conduct and confirm this is my official digital signature.
              </label>

              {errorMsg && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#F87171",
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                >
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="glow-btn"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: 15,
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? "Processing & Delivering E-Signature..." : "✍️ Complete E-Sign & Send to Gmail"}
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
