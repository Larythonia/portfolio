import "./App.css";
import ParticlesBackground from "./components/three/ParticlesBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Stats from "./components/sections/Stats";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Skills />
          <Projects />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}