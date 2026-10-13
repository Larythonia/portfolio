import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    const update = () => {
      const root = document.scrollingElement || document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-1 bg-white/5">
      <div
        ref={bar}
        className="h-full origin-left bg-caramel"
        style={{ transform: "scaleX(0)" }}
      />
    </div>,
    document.body
  );
}