import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLORS = [0xc9915f, 0xe6d2bb, 0xffffff, 0x8a5a3c];

export default function ParticlesBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    // soft round dot texture
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(c);

    const count = window.innerWidth < 768 ? 350 : 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 48;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = Math.random() * 16 - 10;
      speeds[i] = 0.004 + Math.random() * 0.012;
      tmp.setHex(COLORS[Math.floor(Math.random() * COLORS.length)]);
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.14,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mx = 0;
    let my = 0;
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    let id;
    let t = 0;
    const loop = () => {
      t += 0.01;
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += speeds[i];
        pos[i * 3] += Math.sin(t + i) * 0.002;
        if (pos[i * 3 + 1] > 15) pos[i * 3 + 1] = -15;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y += (mx * 0.3 - points.rotation.y) * 0.03;
      points.rotation.x += (my * 0.15 - points.rotation.x) * 0.03;
      points.position.y = window.scrollY * 0.004;

      renderer.render(scene, camera);
      id = requestAnimationFrame(loop);
    };

    if (reduceMotion) renderer.render(scene, camera);
    else loop();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}