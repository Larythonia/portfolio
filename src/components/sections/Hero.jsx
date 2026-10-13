import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";
import Button from "../ui/Button";
import Hero3D from "../three/Hero3D";
import myPhoto from "../../assets/images/profile.png";
import { profile } from "../../data";

const socials = [
  { Icon: Github, href: profile.github, label: "GitHub" },
  { Icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { Icon: Twitter, href: profile.twitter, label: "Twitter" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6">
      <Hero3D />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 py-16 md:grid-cols-2">

        {/* Text (right) */}
        <div className="animate-fade-in text-center md:*:text-left">
          

          <h1 className="text-4xl font-semibold leading-tight text-cream md:text-6xl">
           I BUILD FUTURISTIC WEB
            <span className="text-caramel"> EXPERIENCES</span>
          </h1>
          <p className="mt-5 max-w-xl px-8 md:px-0 text-cream/80">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button href="#projects">
              View my work <ArrowRight size={16} />
            </Button>
            <Button href={profile.resume} download variant="outline">
              Download resume <Download size={16} />
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 justify-center md:justify-start">
            <span className="text-xs font-semibold uppercase tracking-widest text-cream/70">
              Find me on
            </span>
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full bg-latte p-2 text-espresso transition hover:bg-caramel"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

         {/* Photo (left) */}
       <div className="relative mx-auto h-72 w-72 animate-zoom-in [animation-delay:300ms] md:h-96 md:w-96">
          <div className="absolute -inset-3 rounded-full border border-caramel/40" />
          <div className="absolute -inset-8 rounded-full border border-caramel/20" />
          <img
            src={myPhoto}
            alt={profile.name}
            className="h-full w-full rounded-full border-4 border-caramel object-cover"
          />
        
        </div>
      </div>
    </section>
  );
}