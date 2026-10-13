import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { navLinks } from "../../data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-xl font-bold text-cream">
         THONIA HILARY
          
        </a>

        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-cream/80 transition hover:text-caramel"
            >
              {link}
            </a>
          ))}
        </nav>


        <button
          className="text-cream md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-medium text-cream"
            >
              {link}
            </a>
          ))}

           <Button href="#contact" variant="outline" className="hidden !py-2 md:inline-flex">
          Let's talk
        </Button>
        </nav>
      )}
    </header>
  );
}