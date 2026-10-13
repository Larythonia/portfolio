import { Send } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import myPhoto from "../../assets/images/profile.png";
import { profile } from "../../data";
import { User, Mail, MapPin, BadgeCheck } from "lucide-react";


const field =
  "w-full rounded-lg border border-caramel/30 bg-night/60 px-4 py-3 text-sm text-cream outline-none backdrop-blur-sm transition placeholder:text-cream/50 focus:border-caramel";

  const details = [
  { Icon: User, label: "Name", value: profile.name },
  { Icon: Mail, label: "Email", value: profile.email },
  { Icon: MapPin, label: "Location", value: profile.location },
  { Icon: BadgeCheck, label: "Availability", value: "Open to work" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-8">
      {/* Faint photo background */}
      <img
        src={myPhoto}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-[0.12]"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-xl gap-8 md:gap-14 md:grid-cols-3 md:max-w-full">
        <div className="relative z-10 mx-auto max-w-xl text-center px-6 md:text-left md:px-0">
        <SectionLabel>Let's work together</SectionLabel>
        <h2 className="text-2xl font-semibold text-cream md:text-3xl">
          I'm Available to Build, Collaborate and Learn.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/85">
          Let’s create something useful together, from idea to a polished, deployed product.
        </p>
      </div>

   
        <form action={profile.formEndpoint} method="POST" className="space-y-2 text-left">
          <input name="name" required aria-label="Your name" placeholder="Your name" className={field} />
          <input name="email" type="email" required aria-label="Your email" placeholder="Your email" className={field} />
          <textarea name="message" required rows={3} aria-label="Your message" placeholder="Tell me about your project" className={field} />
          <Button type="submit" className="w-full">
            Send message <Send size={12} />
          </Button>
        </form>


        <ul className="flex flex-col content-center gap-4 p-8 ">
          {details.map(({ Icon, label, value }) => (
            <li key={label} className="flex items-center justify-center gap-2 md:justify-start">
              <Icon size={30} strokeWidth={1.5} className="shrink-0 text-caramel" />
              <div className="min-w-0">
                <p className="truncate font-semibold uppercase text-cream">
                  {label}
                </p>
                <p className="truncate text-xs text-cream/70" title={value}>
                  {value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}