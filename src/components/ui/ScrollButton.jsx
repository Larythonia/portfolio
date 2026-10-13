import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ScrollButton() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight / 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () =>
    window.scrollTo({
      top: atTop ? document.documentElement.scrollHeight : 0,
      behavior: "smooth",
    });

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={atTop ? "Scroll to bottom" : "Scroll to top"}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-caramel text-night shadow-lg shadow-black/40 transition hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
    >
      {atTop ? <ArrowDown size={22} /> : <ArrowUp size={22} />}
    </button>
  );
}