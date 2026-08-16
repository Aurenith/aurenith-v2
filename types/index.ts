export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  imageUrl: string;
  color: string;
  social?: SocialLinks;
}

export interface Hackathon {
  id: number;
  name: string;
  result: string;
  year: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

export interface ESignFormData {
  fullName: string;
  email: string;
  role: string;
  joinedDate: string;
  recipientGmail: string;
  signatureDataUrl: string;
  agreedToTerms: boolean;
}

export interface ESignResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  timestamp?: string;
  details?: {
    fullName: string;
    email: string;
    role: string;
    recipientGmail: string;
  };
}

export const ADMIN_PASS = "aurenith2024";

export const TEAM_MEMBERS_DEFAULT: TeamMember[] = [
  {
    id: 1,
    name: "Nishidh Singh",
    role: "Team Lead & Full Stack Developer",
    bio: "Architecting scalable solutions and leading the team through 36-hour hackathon sprints with precision.",
    skills: ["React", "Node.js", "System Design", "Leadership"],
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocLAHeo_eskSlNluIeVhhsHz9Y_nsUEHePd98lZHbbG6J9oa0FmT1Q=s576-c-no",
    color: "#7C3AED",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Navya Pandey",
    role: "UI/UX Designer & Frontend Dev",
    bio: "Crafting pixel-perfect interfaces that tell compelling stories under extreme time pressure.",
    skills: ["Figma", "React", "CSS", "Motion Design"],
    imageUrl:
      "https://instagram.fdel5-3.fna.fbcdn.net/v/t51.75761-15/490133522_18061998776081095_2561076458555049383_n.webp?_nc_cat=105&ig_cache_key=MzYwOTMyNDI5MTczMDg3NzIyNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Yw5EMnP0vrwQ7kNvwHzLEjS&_nc_oc=AdpkB8HKXS7Mwv44yzQEDmZxmRe5Wt1sA8Pu9DgmVSxhrD8oISrT-3MkywlMlj4gBZE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fdel5-3.fna&_nc_gid=B2q8pju6KMu6X0sv1dKScQ&_nc_ss=7a32e&oh=00_Af0VvazWIl_J1xjaI85bDcmWY9_rcQREqG3lJqQtxtsl6Q&oe=69D7AF7E",
    color: "#DB2777",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Sushant Kumar",
    role: "Backend Engineer",
    bio: "Building robust APIs and database architectures that keep running even when the coffee runs out.",
    skills: ["Python", "PostgreSQL", "Docker", "FastAPI"],
    imageUrl:
      "https://instagram.fdel5-3.fna.fbcdn.net/v/t51.82787-15/587612166_18028083485759427_5954664181261035920_n.webp?stp=dst-webp_s640x640&_nc_cat=102&ig_cache_key=Mzc7MjM1MzU3OTMxMjIwNzA1Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=kEjICV1cXuoQ7kNvwF5W-fm&_nc_oc=AdqEz968l1NgDeEp36dtjYmsQGVhkaMGSnfenDIS21HMC_Kvq6dflBGbFZmdLCMKzok&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fdel5-3.fna&_nc_gid=trLbJNtGe_jtCZ6fVsgJvg&_nc_ss=7a32e&oh=00_Af2W6pLar5FTEK0JOMp81gUAbbul56piWCqxc0CyGrjH6A&oe=69D7CFCF",
    color: "#0891B2",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Saumil Taragi",
    role: "ML & Data Engineer",
    bio: "Turning raw data into intelligent systems that give the team an unfair advantage in hackathons.",
    skills: ["PyTorch", "scikit-learn", "Pandas", "LLMs"],
    imageUrl:
      "https://instagram.fdel5-3.fna.fbcdn.net/v/t51.82787-15/655210085_17883396381470762_2047817825323073570_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=Mzg1ODMzMjUwMDEyMTI2NzI0MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyNDJ4MTI0MS5zZHIuQzMifQ%3D%3D&_nc_ohc=1VRqfFynJ-EQ7kNvwG2ley-&_nc_oc=Adpkpnl_7Jv1JBXz1YOU1qRKshGH0Aem-qbsbOKoYNU3kraEnFl6mcKtQbz1ZTIQQS8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fdel5-3.fna&_nc_gid=yPXK9jRuKNWXhk0yyPoc8Q&_nc_ss=7a32e&oh=00_Af05PPKKRWUveQhT7l6cvpTDUNnx9cfvrj_pX1MZiK2jyA&oe=69D7C9A7",
    color: "#059669",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 5,
    name: "Dhairya Panwar",
    role: "DevOps & Cloud Architect",
    bio: "Keeping deployments smooth and infrastructure bulletproof when it matters most.",
    skills: ["AWS", "Kubernetes", "CI/CD", "Linux"],
    imageUrl:
      "https://instagram.fdel5-3.fna.fbcdn.net/v/t51.82787-15/561271351_17958086066991544_8937453813235543433_n.webp?_nc_cat=105&ig_cache_key=Mzc0NDQ5MTk4MDU1MTQyMzcyNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=InMorxdF1BcQ7kNvwEGkgxl&_nc_oc=AdoWeCYoleaQKbeEo9XNYOhNBTKlqXDRotLU_Y2nhlSRHG4hcgI8G0InBZO7UXW8jIo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fdel5-3.fna&_nc_gid=CUbv8W7xHJGvMHta6gEfPA&_nc_ss=7a32e&oh=00_Af167VgVd7PVOxlSo4rlsc_nfO-CEuR0DatgUIsu_58dQw&oe=69D7C934",
    color: "#D97706",
    social: { github: "#", linkedin: "#" },
  },
];

export const HACKATHONS_DEFAULT: Hackathon[] = [
  {
    id: 1,
    name: "36-Hour National Hackathon",
    result: "🏆 Winners",
    year: "2024",
    description:
      "Built an AI-powered platform in 36 hours, winning first place against 200+ teams.",
    tags: ["AI/ML", "Full Stack"],
    highlight: true,
  },
  {
    id: 3,
    name: "We Make Devs",
    result: "⭐ Top 20",
    year: "2025",
    description:
      "Ranked in top 20 teams across europe aws campus challenge beating 2000+.",
    tags: ["IoT", "Edge", "Top 20"],
    highlight: false,
  },
];
