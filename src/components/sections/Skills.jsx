import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiVite,
  SiTailwindcss,
  SiReactrouter,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import Section from "../ui/Section";
import SectionLabel from "../ui/SectionLabel";

const stack = [
  { name: "HTML5", Icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", Icon: FaJs, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "React Router", Icon: SiReactrouter, color: "#CA4245" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "Git", Icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", Icon: FaGithub, color: "#FFFFFF" },
];

export default function Skills() {
  return (
    <Section id="skills" className="bg-latte">
      <div className="mx-auto w-full text-center">
        <SectionLabel>Tech stack</SectionLabel>
        <h2 className="mb-4 text-3xl font-bold text-espresso">TOOLS $ TECHNOLOGIES</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stack.map(({ name, Icon, color }) => (
            <div
              key={name}
              className="flex items-center justify-center gap-2 rounded-xl border border-espresso/20 bg-espresso px-1 py-3 text-xs font-medium text-latte transition hover:-translate-y-1 hover:border-caramel/50"
            >
              <Icon size={20} color={color} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}