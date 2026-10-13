import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ChevronDown } from "lucide-react";

export default function ProjectCard({ title, text, tags, live, repo, image, index = 0 }) {
  const ref = useRef(null);
  const textRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = textRef.current;
    const check = () => {
      if (!expanded) setClamped(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, expanded]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`min-w-[17rem] flex-1 snap-start transition-all duration-700 ease-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"
      }`}
    >
      <article className="h-full overflow-hidden rounded-xl border border-caramel/20 bg-mocha/15 text-latte shadow-lg shadow-caramel/15 transition duration-300 hover:-translate-y-1 hover:border-caramel/40 hover:shadow-xl hover:shadow-caramel/30">
        {image ? (
          <img src={image} alt={`${title} screenshot`} className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-caramel to-mocha text-3xl font-bold text-cream">
            {title}
          </div>
        )}

        <div className="p-5">
          <h3 className="font-semibold">{title}</h3>

          <p
            ref={textRef}
            className={`mt-2 text-sm text-cream/80 ${expanded ? "" : "line-clamp-3"}`}
          >
            {text}
          </p>

          {(clamped || expanded) && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={expanded ? "Show less" : "Show more"}
              className="mx-auto mt-1 flex text-mocha transition hover:text-espresso"
            >
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded bg-mocha/15 px-2 py-1 text-xs text-cream">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 flex gap-4 text-sm font-medium text-cream">
            <a href={live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
              Live <ExternalLink size={14} />
            </a>
            <a href={repo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
              Code <Github size={14} />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}