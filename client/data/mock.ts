import type { User } from "../types/user";

const avatar = (initials: string, background: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${initials} avatar">
      <rect width="128" height="128" rx="32" fill="${background}"/>
      <text
        x="50%"
        y="54%"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="44"
        font-weight="700"
        fill="#ffffff"
      >${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Amaka Obi",
    bio: "Frontend engineer who turns design systems into clean, teachable interfaces.",
    location: "Lagos, Nigeria",
    availability: "Mon-Wed evenings, Sat mornings",
    profileImage: avatar("AO", "#0f766e"),
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma-to-Code", "CSS Animations"],
    interests: ["Go", "System Design", "Product Thinking"],
    credits: 120,
    rating: 4.9,
    reputation: "Reliable mentor",
    previousExchanges: [
      {
        with: "Fatima Bello",
        gave: "Tailwind CSS review",
        received: "Figma-to-Code tips",
        date: "2026-06-26",
      },
      {
        with: "Kunle Adebayo",
        gave: "React component critique",
        received: "CLI workflow tricks",
        date: "2026-06-19",
      },
    ],
    contactDetails: {
      email: "amaka.obi@ripple.dev",
      handle: "@amakaobi",
      phone: "+234 801 555 0121",
    },
  },
  {
    id: "u2",
    name: "Tunde Bakare",
    bio: "Backend builder focused on stable APIs, data persistence, and dependable delivery.",
    location: "Ibadan, Nigeria",
    availability: "Weeknights after 7pm",
    profileImage: avatar("TB", "#1d4ed8"),
    skills: ["Node.js", "PostgreSQL", "Docker", "React", "Testing", "Go", "CLI Tools"],
    interests: ["TypeScript", "Accessibility", "API Design"],
    credits: 45,
    rating: 4.7,
    reputation: "Backend specialist",
    previousExchanges: [
      {
        with: "Amaka Obi",
        gave: "Node.js API debugging",
        received: "React architecture feedback",
        date: "2026-06-18",
      },
    ],
    contactDetails: {
      email: "tunde.bakare@ripple.dev",
      handle: "@tundebakare",
      phone: "+234 803 610 2044",
    },
  },
  {
    id: "u3",
    name: "Chiamaka Nwosu",
    bio: "Data-minded developer who helps people learn through Python, SQL, and hands-on examples.",
    location: "Enugu, Nigeria",
    availability: "Tue/Thu evenings",
    profileImage: avatar("CN", "#7c3aed"),
    skills: ["Python", "Django", "Data Analysis", "SQL", "GraphQL", "NestJS", "Tableau"],
    interests: ["Machine Learning", "API Design", "Teaching"],
    credits: 300,
    rating: 4.8,
    reputation: "Analytical tutor",
    previousExchanges: [
      {
        with: "Ngozi Adeyemi-Williams",
        gave: "SQL cleanup session",
        received: "Database modeling notes",
        date: "2026-06-21",
      },
      {
        with: "Aisha Bello",
        gave: "Python data notebook review",
        received: "GraphQL schema feedback",
        date: "2026-06-29",
      },
    ],
    contactDetails: {
      email: "chiamaka.nwosu@ripple.dev",
      handle: "@chiamakanwosu",
      phone: "+234 805 448 9901",
    },
  },
  {
    id: "u4",
    name: "David Okoro",
    bio: "Platform engineer who likes infrastructure, Java services, and dependable deployments.",
    location: "Abuja, Nigeria",
    availability: "Weekends and late evenings",
    profileImage: avatar("DO", "#b45309"),
    skills: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes", "Concurrency Patterns"],
    interests: ["React", "Observability", "System Design"],
    credits: 0,
    rating: 4.5,
    reputation: "Infrastructure builder",
    previousExchanges: [
      {
        with: "Kunle Adebayo",
        gave: "Kubernetes deployment help",
        received: "Go concurrency guidance",
        date: "2026-06-16",
      },
    ],
    contactDetails: {
      email: "david.okoro@ripple.dev",
      handle: "@davidokoro",
      phone: "+234 806 777 1450",
    },
  },
  {
    id: "u5",
    name: "Fatima Bello",
    bio: "Product-focused UI builder who turns mockups into lively, accessible experiences.",
    location: "Kano, Nigeria",
    availability: "Mon-Fri afternoons",
    profileImage: avatar("FB", "#db2777"),
    skills: ["JavaScript", "CSS Animations", "Figma-to-Code", "React", "Tailwind CSS", "TypeScript"],
    interests: ["NestJS", "Drizzle ORM", "Motion Design"],
    credits: 80,
    rating: 4.6,
    reputation: "Frontend craftswoman",
    previousExchanges: [
      {
        with: "Amaka Obi",
        gave: "Figma handoff notes",
        received: "Tailwind CSS review",
        date: "2026-06-26",
      },
      {
        with: "Aisha Bello",
        gave: "Animation polish",
        received: "Design system critique",
        date: "2026-06-30",
      },
    ],
    contactDetails: {
      email: "fatima.bello@ripple.dev",
      handle: "@fatimabello",
      phone: "+234 807 233 0914",
    },
  },
  {
    id: "u6",
    name: "Emeka Chukwu",
    bio: "Generalist learner who trades fast feedback on frontend, testing, and data workflows.",
    location: "Port Harcourt, Nigeria",
    availability: "Flexible evenings",
    profileImage: avatar("EC", "#065f46"),
    skills: ["React", "Python", "SQL", "Testing", "Django", "Data Analysis"],
    interests: ["Go", "Product Strategy", "Data Visualization"],
    credits: 15,
    rating: 4.3,
    reputation: "Fast learner",
    previousExchanges: [
      {
        with: "Chiamaka Nwosu",
        gave: "Django bug hunt",
        received: "SQL query tuning",
        date: "2026-06-12",
      },
    ],
    contactDetails: {
      email: "emeka.chukwu@ripple.dev",
      handle: "@emekachukwu",
      phone: "+234 808 421 3320",
    },
  },
  {
    id: "u7",
    name: "Ngozi Adeyemi-Williams",
    bio: "Database and analytics mentor who helps teams organize, move, and interpret data.",
    location: "Lagos, Nigeria",
    availability: "Tue-Sat mornings",
    profileImage: avatar("NA", "#0ea5e9"),
    skills: ["SQL", "Database Design", "Data Engineering", "ETL Pipelines", "PostgreSQL", "AWS"],
    interests: ["React", "Python", "Cloud Architecture"],
    credits: 60,
    rating: 4.9,
    reputation: "Data systems mentor",
    previousExchanges: [
      {
        with: "Chiamaka Nwosu",
        gave: "Database modeling notes",
        received: "SQL cleanup session",
        date: "2026-06-21",
      },
      {
        with: "Chinedu Eze",
        gave: "ETL pipeline review",
        received: "Data visualization feedback",
        date: "2026-06-28",
      },
    ],
    contactDetails: {
      email: "ngozi.williams@ripple.dev",
      handle: "@ngoziwilliams",
      phone: "+234 809 515 7781",
    },
  },
  {
    id: "u8",
    name: "Kunle Adebayo",
    bio: "Systems programmer who enjoys building tools that make complex workflows feel simple.",
    location: "Abuja, Nigeria",
    availability: "Evenings and Sunday afternoons",
    profileImage: avatar("KA", "#334155"),
    skills: ["Go", "Concurrency Patterns", "CLI Tools", "Docker", "Kubernetes", "Java", "Spring Boot"],
    interests: ["Distributed Systems", "Observability", "Rust"],
    credits: 200,
    rating: 4.4,
    reputation: "Systems generalist",
    previousExchanges: [
      {
        with: "David Okoro",
        gave: "Go concurrency guidance",
        received: "Kubernetes deployment help",
        date: "2026-06-16",
      },
      {
        with: "Amaka Obi",
        gave: "CLI workflow tricks",
        received: "React component critique",
        date: "2026-06-19",
      },
    ],
    contactDetails: {
      email: "kunle.adebayo@ripple.dev",
      handle: "@kunleadebayo",
      phone: "+234 810 408 2255",
    },
  },
  {
    id: "u9",
    name: "Aisha Bello",
    bio: "Full-stack collaborator who bridges frontend, backend, and learning-focused product ideas.",
    location: "Lagos, Nigeria",
    availability: "Weeknights and alternate Saturdays",
    profileImage: avatar("AB", "#ca8a04"),
    skills: ["TypeScript", "React", "NestJS", "GraphQL", "Node.js", "Tailwind CSS", "Figma-to-Code"],
    interests: ["SQL", "Data Analysis", "Design Systems"],
    credits: 140,
    rating: 4.8,
    reputation: "Versatile collaborator",
    previousExchanges: [
      {
        with: "Chiamaka Nwosu",
        gave: "GraphQL schema feedback",
        received: "Python data notebook review",
        date: "2026-06-29",
      },
      {
        with: "Fatima Bello",
        gave: "Design system critique",
        received: "Animation polish",
        date: "2026-06-30",
      },
    ],
    contactDetails: {
      email: "aisha.bello@ripple.dev",
      handle: "@aishabello",
      phone: "+234 811 662 4300",
    },
  },
  {
    id: "u10",
    name: "Chinedu Eze",
    bio: "Analyst and prototype designer who helps teams connect data, visuals, and user flow.",
    location: "Enugu, Nigeria",
    availability: "Weekends",
    profileImage: avatar("CE", "#ef4444"),
    skills: [
      "Python",
      "Data Analysis",
      "SQL",
      "Tableau",
      "Figma-to-Code",
      "JavaScript",
      "Database Design",
      "Data Engineering",
      "ETL Pipelines",
    ],
    interests: ["React", "Product Design", "Storytelling"],
    credits: 95,
    rating: 4.2,
    reputation: "Insight builder",
    previousExchanges: [
      {
        with: "Ngozi Adeyemi-Williams",
        gave: "Data visualization feedback",
        received: "ETL pipeline review",
        date: "2026-06-28",
      },
      {
        with: "Amaka Obi",
        gave: "Figma-to-Code advice",
        received: "React UI critique",
        date: "2026-07-02",
      },
    ],
    contactDetails: {
      email: "chinedu.eze@ripple.dev",
      handle: "@chinedueze",
      phone: "+234 812 094 6712",
    },
  },
];
