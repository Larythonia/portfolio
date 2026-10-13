import Section from "../ui/Section";
import SectionLabel from "../ui/SectionLabel";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data";

export default function Projects() {
  return (
    <Section id="projects">
      <div className="text-center">
        <SectionLabel>projects</SectionLabel>
        <h2 className="mb-10 text-3xl font-bold text-cream">FEATURED PROJECTS</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  );
}