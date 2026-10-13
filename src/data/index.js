import inkwell from "../assets/images/inkwell.png";
import raiquid from "../assets/images/raiquid.png";
import kinel from "../assets/images/kinel.png";

export const profile = {
  name: "Thonia Hilary",
  role: "Frontend Developer",
  tagline:
    "I develop fast, responsive and accessible web experiences with clean, maintainable code and meticulous attention to details.",
  email: "larythonia@gmail.com",
  location: "Lagos, Nigeria",
  github: "https://github.com/larythonia",
  linkedin: "https://www.linkedin.com/in/thonia-hilary-ba9bb5222/",
  twitter: "https://x.com/thoniahilary",
  resume: "/resume.pdf",
  formEndpoint: "https://formspree.io/f/xyekdnob",
};

export const navLinks = ["About", "Services", "Skills", "Projects", "Contact"];

export const services = [
  { title: "Frontend Development", 
    text: "Responsive, high-performance websites and apps using modern tools." 
  },
  { title: "UI Implementation", 
    text: "Turning Figma designs into pixel-perfect, accessible interfaces." 
  },
  { title: "Performance", 
    text: "Faster load times, better Core Web Vitals and cleaner bundles." 
  },
  { title: "Web Applications", 
    text: "Scalable React apps with routing, APIs and solid structure." 
  },
];

export const stack = [
  "HTML5", "CSS3", "JavaScript", "React", "Vite", "NextJS",
  "Tailwind CSS", "React Router", "Three.js", "Git", "GitHub",
];

export const projects = [
  { title: "Inkwell", 
    image: inkwell,
    tags: ["React", "Vite"],
    text: "Inkwell is a responsive blog application that pulls articles from the dev.to API. It has blog listing and details pages with pagination, loading skeletons, and related posts, and implemented user signup and authentication state with React Context. I Used custom hooks for data fetching, styled with Tailwind CSS, and deployed on Vercel with client-side routing configured for production.", 
    live: "https://inkwell-app-sfvw.vercel.app/", 
    repo: "#" ,
  },
  //{ title: "MedTrack", 
    //text: "Medication management and symptom triage app.", 
    //tags: ["React", "Vite"], 
    //live: "#", 
    //repo: "#" 
  //},
  { title: "Moviemate", 
    text: "Moviemate is a movie discovery app powered by the TMDB API. Implemented trending movies and browsing features, handled API data fetching and error states, and managed API keys securely with environment variables.", 
    tags: ["React", "API", "Tailwind CSS"], 
    live: "https://moviemate-app-rouge.vercel.app/", 
    repo: ": https://github.com/Larythonia/moviemate-app" 
  },
  { title: "Raiquid", 
    image: raiquid,
    text: "I contributed in building the frontend for Raiquid, an invoice tokenization platform created for the Build with Brickken hackathon. Developed responsive, user-friendly interfaces that let businesses list unpaid invoices and investors browse and fund them as fractional investments. Worked with the backend team to connect the UI to the API and deployed a live product.", 
    tags: ["NextJS", "API", "Tailwind CSS"], 
    live: "https://raiquid.avane.online/", 
    repo: ": https://github.com/AvaneDevOps/raiquid/" 
  },
  { title: "Kinel website", 
    image: kinel,
    text: "Built responsive UI components for the Kinel Academy landing page and student portal as part of a two-month frontend internship. I also collaborated with a team to implement portal features and fix bugs, delivering working releases within the internship period.", 
    tags: ["NextJS", "API", "Tailwind CSS"], 
    live: "https://www.kinelacademy.com/", 
    repo: "https://github.com/Larythonia/Inkwell-app" 
  },
];

export const stats = [
  { value: "3+", 
    label: "Projects Built", 
    text: "Real apps shipped with React and Tailwind." 
  },
  { value: "2", 
    label: "Certifications", 
    text: "Frontend development training completed." 
  },
  { value: "React", 
    label: "Main Stack", 
    text: "Built with Vite, Router and Tailwind." 
  },
  { value: "100%", 
    label: "Commitment", 
    text: "Clean, accessible and responsive code." 
  },
];