import { Download } from "lucide-react";
import Button from "../ui/Button";
import myPhoto from "../../assets/images/workspace.png";

import { profile } from "../../data";

export default function About() {
  return (
    <section id="about" className="bg-black/20 px-6 py-14">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-night md:grid-cols-[1fr_1.1fr]">
        {/* Picture (left) */}
        <div className="relative h-80 bg-latte md:h-auto md:min-h-[26rem] md:[clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]">
          <img
            src={myPhoto}
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>

        {/* About me (right) */}
        <div className="flex flex-col justify-center p-8 md:py-12 md:pl-6 md:pr-12">
          <p className="text-sm font-semibold text-caramel">ABOUT ME</p>
          <h2 className="mt-3 text-2xl font-bold text-cream">
            I'm a frontend developer who builds fast, accessible websites that
            perform on any screen.
          </h2>
          <p className="mt-4 text-cream/80">
            I'm passionate about treating performance, accessibility and clean,
            maintainable code as the foundation of every build, so sites load
            fast, work on any device, and keep visitors engaged.
          </p>
          <Button href={profile.resume} download variant="outline" className="mt-6 self-start">
            Download resume
            <Download size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}