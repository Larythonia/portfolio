export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`px-8 py-6 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}