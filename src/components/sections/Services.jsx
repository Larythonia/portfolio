import { Code2, Palette, Gauge, Rocket } from "lucide-react";
import Section from "../ui/Section";
import SectionLabel from "../ui/SectionLabel";
import { services } from "../../data";

const icons = [Code2, Palette, Gauge, Rocket];

export default function Services() {
  return (
    <Section id="services">
      
      <div className="text-center rounded-2xl bg-gradient-to-br from-caramel/80 via-caramel/20 to-caramel/60 p-px">
  <div className="h-full rounded-[calc(1rem-1px)] bg-[#1E110B] p-6">
    <SectionLabel>Services</SectionLabel>
     <h2 className="mb-4 text-3xl font-bold text-cream">WHAT I DO</h2>
  </div>
</div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <div
              key={service.title}
             className="rounded-2xl border-5 border-transparent p-6 [background:linear-gradient(#1E110B,#1E110B)_padding-box,linear-gradient(135deg,#D9B38C,#5A3A26_50%,#C69C6D)_border-box]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-mocha/35 p-3 text-cream ">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-cream/80">{service.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}