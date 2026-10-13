import { ArrowUpRight, Award, Layers, Heart } from "lucide-react";
import { stats } from "../../data";

const icons = [ArrowUpRight, Award, Layers, Heart];

export default function Stats() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 space-1 rounded-2xl border border-white/10 bg-espresso/60 p-8 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/15">
        {stats.map(({ value, label, text }, i) => {
          const Icon = icons[i];
          return (
            <div key={label} className="px-4 md:px-10">
              <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-caramel/70 text-caramel">
                <Icon size={24} />
              </span>
              <p className="text-5xl font-extrabold text-caramel md:text-5xl">{value}</p>
              <p className="my-1 text-sm font-bold uppercase tracking-wide text-cream">{label}</p>
              <p className="text-xs text-cream/60">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}