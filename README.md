# Aurenith Team Portfolio (Next.js v2) 🚀

![aurenith-v2](https://img.shields.io/badge/Aurenith-v2--Next.js-7C3AED?style=for-the-badge)

A lightning-fast, highly aesthetic web portfolio built for **Aurenith**—a team of 5 elite engineers who build at full speed and compete in high-stakes hackathons. Re-engineered in **Next.js 16 App Router** with TypeScript, Tailwind CSS v4, modern UI/UX principles, glassmorphism, fluid micro-animations, and a secure built-in admin dashboard.

## 🌟 Features

- **Next.js App Router Architecture**: Modular React components, SSR metadata optimizations, and clean root-level aliases (`@/components` and `@/types`).
- **Modern & Dynamic Design**: Dark mode aesthetic with vibrant gradients, floating background orbs, and SVG noise textures.
- **Custom Interactions**: A custom trailing cursor effect, hover micro-animations, and smooth scroll-based navigation blur states.
- **Fully Responsive**: Flawless experience across desktop, tablet, and mobile devices (featuring a custom frosted glass mobile menu).
- **Team Roster**: Display cards for each member highlighting their role, bio, and technical skills with intelligent fallback avatars.
- **Battle Record**: Highlight winning hackathons and achievements with a responsive data grid layout.
- **Built-in Admin Panel**: A sleek, password-protected internal portal to effortlessly add, edit, or delete team members and hackathon records on the fly. 

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Vanilla CSS Design Tokens
- **Typography**: Google Fonts (*Syne* for heavy striking headings, *DM Sans* for clean body text)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aurenith/aurenith-v2.git
   ```
2. Navigate into the project directory:
   ```bash
   cd aurenith-v2
   ```
3. Install the required dependencies:
   ```bash
   npm install
   # or
   bun install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

## ⚙️ CI/CD & Lockfile Support

This repository supports both `npm` (`package-lock.json`) and `bun` (`bun.lock`) for automated deployment pipelines (such as GitHub Actions `actions/setup-node`).

## 🔐 Admin Dashboard

To access the internal admin dashboard, click the **Admin ↗** button in the navigation bar. 
- **Default Password:** `aurenith2024`

From the dashboard, you have full control to:
- Add and edit Team Members (name, role, skills, avatar URLs, and color accents).
- Modify the Battle Record (hackathons, placements, custom tags, and featured highlights).

## 🏆 The Core Team
- **Nishidh Singh** - Team Lead & Full Stack Developer
- **Navya Pandey** - UI/UX Designer & Frontend Dev
- **Sushant Kumar** - Backend Engineer
- **Saumil Taragi** - ML & Data Engineer
- **Dhairya Panwar** - DevOps & Cloud Architect

## 📜 License
Available unconditionally for use. Open-source and free to be adapted for your own hackathon group or team projects.
