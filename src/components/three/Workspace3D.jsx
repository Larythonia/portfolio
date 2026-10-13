import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeScreenTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 280;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "#1c120d";
  ctx.fillRect(0, 0, 512, 280);
  ctx.fillStyle = "#2a1b14";
  ctx.fillRect(0, 0, 512, 28);
  ["#ff6b5e", "#f5c04a", "#5fcf6b"].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(18 + i * 20, 14, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  const colors = ["#c9915f", "#e6d2bb", "#7cc4f0", "#8fd694", "#f0a5b4"];
  const lines = [
    [0, 140], [1, 220], [1, 90], [2, 170], [2, 120], [1, 60],
    [0, 100], [1, 200], [2, 150], [2, 80], [1, 130], [0, 60],
  ];
  lines.forEach(([indent, len], i) => {
    const y = 48 + i * 19;
    ctx.fillStyle = colors[(i * 3 + indent) % colors.length];
    ctx.globalAlpha = 0.9;
    ctx.fillRect(24 + indent * 26, y, len, 7);
    ctx.fillStyle = "#6b4a36";
    ctx.fillRect(24 + indent * 26 + len + 10, y, 30 + (i % 3) * 20, 7);
  });
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function Workspace3D() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const mat = (color) =>
      new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.8 });
    const box = (w, h, d, m, x, y, z) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      return mesh;
    };

    const group = new THREE.Group();
    scene.add(group);

    // Monitor
    const screenTex = makeScreenTexture();
    const black = mat(0x2a1b14);
    group.add(box(0.9, 0.05, 0.5, black, 0, 0.025, -0.7));
    group.add(box(0.12, 0.75, 0.1, black, 0, 0.4, -0.8));
    group.add(box(2.7, 1.55, 0.1, mat(0x1c120d), 0, 1.3, -0.8));
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 1.37),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    screen.position.set(0, 1.3, -0.745);
    group.add(screen);

    // Keyboard and mouse
    group.add(box(1.5, 0.06, 0.5, mat(0xe6d2bb), 0, 0.03, 0.4));
    group.add(box(0.2, 0.07, 0.32, mat(0xe6d2bb), 1.2, 0.035, 0.4));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(3, 5, 5);
    scene.add(sun);
    const glow = new THREE.PointLight(0xc9915f, 6, 7);
    glow.position.set(0, 1.4, 2);
    scene.add(glow);

    const setCamera = () => {
      const narrow = el.clientWidth / el.clientHeight < 1;
      camera.position.set(0, 2, narrow ? 9 : 6.5);
      camera.lookAt(0, 1, 0);
    };
    setCamera();

    let mx = 0;
    let my = 0;
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const ro = new ResizeObserver(() => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
      setCamera();
    });
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    let id;
    let t = 0;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.01;
      group.rotation.y += (Math.sin(t * 0.4) * 0.6 + mx * 0.5 - group.rotation.y) * 0.05;
      group.rotation.x += (my * 0.15 - group.rotation.x) * 0.05;
      group.position.y = Math.sin(t) * 0.05;
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      group.rotation.y = -0.4;
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      screenTex.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="h-full w-full" />;
}