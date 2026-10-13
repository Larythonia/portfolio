import { useEffect, useRef } from "react";
import * as THREE from "three";

const CELL = 2;
const HALF_COLS = 20;
const ROWS = 34;
const FLOOR_Y = -2.5;
const CAM_Z = 8;

const gridVert = `
  varying vec3 vPos;
  void main() {
    vPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
  }
`;
const gridFrag = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vPos;
  void main() {
    float d = ${CAM_Z}.0 - vPos.z;
    float a = (1.0 - smoothstep(12.0, 60.0, d))
            * smoothstep(0.0, 6.0, d)
            * (1.0 - smoothstep(24.0, 40.0, abs(vPos.x)));
    gl_FragColor = vec4(uColor, a * uOpacity);
  }
`;

const dotVert = `
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixel;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPixel * 70.0 / -mv.z;
    float pulse = 0.5 + 0.5 * sin(uTime * 0.7 + aPhase);
    vAlpha = pulse * (1.0 - smoothstep(14.0, 55.0, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`;
const dotFrag = `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vAlpha * 0.85);
  }
`;

export default function Hero3D() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = new THREE.Color(0xc9915f);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      el.clientWidth / el.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 1, CAM_Z);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    // Grid lines
    const xMin = -HALF_COLS * CELL;
    const xMax = HALF_COLS * CELL;
    const zNear = CAM_Z;
    const zFar = CAM_Z - ROWS * CELL;
    const verts = [];

    for (let i = -HALF_COLS; i <= HALF_COLS; i++) {
      verts.push(i * CELL, FLOOR_Y, zNear, i * CELL, FLOOR_Y, zFar);
    }
    for (let j = 0; j <= ROWS; j++) {
      const z = CAM_Z - j * CELL;
      verts.push(xMin, FLOOR_Y, z, xMax, FLOOR_Y, z);
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    const gridMat = new THREE.ShaderMaterial({
      vertexShader: gridVert,
      fragmentShader: gridFrag,
      uniforms: { uColor: { value: accent }, uOpacity: { value: 0.3 } },
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(gridGeo, gridMat));

    // Pulsing dots on random intersections
    const DOTS = 26;
    const dotPos = new Float32Array(DOTS * 3);
    const dotPhase = new Float32Array(DOTS);
    for (let i = 0; i < DOTS; i++) {
      const gx = Math.floor(Math.random() * 25) - 12;
      const gz = 3 + Math.floor(Math.random() * 22);
      dotPos.set([gx * CELL, FLOOR_Y, CAM_Z - gz * CELL], i * 3);
      dotPhase[i] = Math.random() * Math.PI * 2;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    dotGeo.setAttribute("aPhase", new THREE.BufferAttribute(dotPhase, 1));
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: dotVert,
      fragmentShader: dotFrag,
      uniforms: {
        uColor: { value: new THREE.Color(0xe6d2bb) },
        uTime: { value: 0 },
        uPixel: { value: pixelRatio },
      },
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Points(dotGeo, dotMat));

    let mx = 0;
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const ro = new ResizeObserver(() => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    });
    ro.observe(el);

    let id;
    const clock = new THREE.Clock();
    const frame = () => {
      const t = clock.getElapsedTime();
      dotMat.uniforms.uTime.value = t;
      camera.position.x += (mx * 1.5 + Math.sin(t * 0.15) * 0.4 - camera.position.x) * 0.03;
      camera.lookAt(0, 0, -30);
      renderer.render(scene, camera);
    };
    const loop = () => {
      frame();
      id = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      camera.lookAt(0, 0, -30);
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      gridGeo.dispose();
      gridMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none absolute inset-0" />;
}