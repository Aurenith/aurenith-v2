import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#7C3AED",
};

export const metadata: Metadata = {
  title: "Aurenith | Nishidh Singh & Engineering Team",
  description:
    "Nishidh Singh is a Full Stack Developer and Software Engineer leading Aurenith, an elite team turning ideas into working products in 36 hours. Open for internships & freelance.",
  keywords: [
    "Nishidh Singh",
    "Aurenith",
    "software engineer",
    "full stack developer",
    "Next.js",
    "Django",
    "React",
    "PyTorch",
    "SAFE_HER",
    "Navium",
    "open source",
  ],
  authors: [{ name: "Nishidh Singh" }],
  openGraph: {
    title: "Aurenith | Nishidh Singh & Elite Engineering Team",
    description:
      "Nishidh Singh is a Full Stack Developer and Software Engineer leading Aurenith, an elite team turning ideas into working products in 36 hours.",
    url: "https://www.aurenith.space/",
    siteName: "Aurenith Team",
    images: [{ url: "https://www.aurenith.space/aurenith.png" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurenith | Nishidh Singh & Elite Engineering Team",
    description:
      "Nishidh Singh is a Full Stack Developer and Software Engineer leading Aurenith, an elite team turning ideas into working products in 36 hours.",
    images: ["https://www.aurenith.space/aurenith.png"],
  },
  icons: {
    icon: "/aurenith.png",
    shortcut: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.aurenith.space/#website",
      "url": "https://www.aurenith.space/",
      "name": "Aurenith",
      "description":
        "Five engineers. One mission. Turning ideas into working products in 36 hours or less.",
    },
    {
      "@type": "Organization",
      "@id": "https://www.aurenith.space/#organization",
      "name": "Aurenith Team",
      "url": "https://www.aurenith.space/",
      "sameAs": ["https://www.instagram.com/aurenith.team/"],
      "description": "An elite hackathon engineering team building at full speed.",
      "member": [
        { "@id": "https://www.aurenith.space/#nishidh" },
        { "@id": "https://www.aurenith.space/#navya" },
        { "@id": "https://www.aurenith.space/#sushant" },
        { "@id": "https://www.aurenith.space/#saumil" },
        { "@id": "https://www.aurenith.space/#dhairya" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.aurenith.space/#nishidh",
      "name": "Nishidh Singh",
      "jobTitle": "Software Engineer & Full Stack Developer",
      "url": "https://www.aurenith.space/",
      "sameAs": ["https://www.linkedin.com/in/nishidh0singh04/"],
      "image":
        "https://lh3.googleusercontent.com/a/ACg8ocLAHeo_eskSlNluIeVhhsHz9Y_nsUEHePd98lZHbbG6J9oa0FmT1Q=s576-c-no",
      "description":
        "Nishidh Singh is a full stack developer primarily using JavaScript, Next.js, and Django. Contributor to open-source projects like FeatherIcons and builder of SAFE_HER and Navium.",
      "knowsAbout": [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Django",
        "Flask",
        "Python",
        "PyTorch",
        "C++",
        "AWS",
        "Docker",
        "Kubernetes",
        "Node.js",
        "TailwindCSS",
      ],
      "owns": [
        { "@type": "SoftwareSourceCode", "name": "SAFE_HER" },
        { "@type": "SoftwareSourceCode", "name": "Navium" },
      ],
      "memberOf": { "@id": "https://www.aurenith.space/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
