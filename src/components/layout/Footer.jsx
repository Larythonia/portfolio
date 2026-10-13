import { Github, Linkedin, Twitter } from "lucide-react";
import { profile, navLinks } from "../../data";

const socials = [
  { Icon: Github, href: profile.github, label: "GitHub" },
  { Icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { Icon: Twitter, href: profile.twitter, label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
  
          <p className="mt-1 text-sm text-cream/60">
            Building the web, one pixel at a time.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-cream/80">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-caramel">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
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

      <p className="mt-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}