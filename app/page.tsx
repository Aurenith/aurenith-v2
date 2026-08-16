"use client";

import { useState } from "react";
import {
  TeamMember,
  Hackathon,
  TEAM_MEMBERS_DEFAULT,
  HACKATHONS_DEFAULT,
  ADMIN_PASS,
} from "@/types";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TeamGrid from "@/components/TeamGrid";
import HackathonList from "@/components/HackathonList";
import Footer from "@/components/Footer";
import LoginPage from "@/components/LoginPage";
import AdminDashboard from "@/components/AdminDashboard";

export default function Home() {
  const [page, setPage] = useState<"home" | "admin" | "login">("home");
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS_DEFAULT);
  const [hackathons, setHackathons] = useState<Hackathon[]>(HACKATHONS_DEFAULT);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [editingHack, setEditingHack] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("members");
  const [newMember, setNewMember] = useState(false);
  const [newHack, setNewHack] = useState(false);

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASS) {
      setPage("admin");
      setAdminError("");
    } else {
      setAdminError("Invalid credentials. Access denied.");
    }
  };

  const saveMember = (member: TeamMember) => {
    if (member.id) {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)));
    } else {
      setMembers((prev) => [...prev, { ...member, id: Date.now() }]);
    }
    setEditingMember(null);
    setNewMember(false);
  };

  const deleteMember = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const saveHack = (h: Hackathon) => {
    if (h.id) {
      setHackathons((prev) => prev.map((x) => (x.id === h.id ? h : x)));
    } else {
      setHackathons((prev) => [...prev, { ...h, id: Date.now() }]);
    }
    setEditingHack(null);
    setNewHack(false);
  };

  const deleteHack = (id: number) => {
    setHackathons((prev) => prev.filter((h) => h.id !== id));
  };

  if (page === "login") {
    return (
      <LoginPage
        adminPass={adminPass}
        setAdminPass={setAdminPass}
        onLogin={handleAdminLogin}
        error={adminError}
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "admin") {
    return (
      <AdminDashboard
        members={members}
        hackathons={hackathons}
        onSaveMember={saveMember}
        onDeleteMember={deleteMember}
        onSaveHack={saveHack}
        onDeleteHack={deleteHack}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
        editingHack={editingHack}
        setEditingHack={setEditingHack}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        newMember={newMember}
        setNewMember={setNewMember}
        newHack={newHack}
        setNewHack={setNewHack}
        onLogout={() => setPage("home")}
      />
    );
  }

  return (
    <div
      style={{
        background: "#050508",
        minHeight: "100vh",
        fontFamily: "var(--font-dm-sans), sans-serif",
        color: "#fff",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar onAdminClick={() => setPage("login")} />

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Team Section */}
      <TeamGrid members={members} />

      {/* Hackathons Section */}
      <HackathonList hackathons={hackathons} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
