import Section from "../ui/Section";
import SectionLabel from "../ui/SectionLabel";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data";

// repeated so the row is always wider than the screen and loops seamlessly
const loop = [...projects, ...projects, ...projects, ...projects];

export default function Projects() {
  return (
    <Section id="projects">
      <div className="text-center">
        <SectionLabel>projects</SectionLabel>
        <h2 className="mb-10 text-3xl font-bold text-cream">FEATURED PROJECTS</h2>
      </div>

      <div
        className="overflow-hidden py-6"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-start hover:[animation-play-state:paused]">
          {loop.map((project, i) => (
            <div key={`${project.title}-${i}`} className="w-[22rem] shrink-0 pr-6">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}