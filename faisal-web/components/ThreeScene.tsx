"use client";
  import { useEffect, useRef } from "react";

  export default function ThreeScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      let rafId: number;
      let cleanup: (() => void) | undefined;

      import("three").then((THREE) => {
        const isMobile = window.innerWidth < 768;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          55, window.innerWidth / window.innerHeight, 0.1, 100
        );
        camera.position.z = 3.2;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        const GOLD = new THREE.Color("#D4AF37");
        const group = new THREE.Group();
        scene.add(group);

        // === WIREFRAME GLOBE ===
        const globeGeo = new THREE.IcosahedronGeometry(1, 5);
        const edgesGeo = new THREE.EdgesGeometry(globeGeo);
        const globeMat = new THREE.LineBasicMaterial({
          color: GOLD, transparent: true, opacity: 0.065,
        });
        const globe = new THREE.LineSegments(edgesGeo, globeMat);
        globe.position.set(isMobile ? 0 : 0.9, 0, 0);
        group.add(globe);

        // === DOTS ON GLOBE SURFACE ===
        const dotCount = isMobile ? 60 : 150;
        const dotPositions = new Float32Array(dotCount * 3);
        for (let i = 0; i < dotCount; i++) {
          const phi = Math.acos(1 - (2 * i) / dotCount);
          const theta = Math.PI * (1 + Math.sqrt(5)) * i;
          dotPositions[i * 3] = Math.sin(phi) * Math.cos(theta);
          dotPositions[i * 3 + 1] = Math.cos(phi);
          dotPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta);
        }
        const dotGeo = new THREE.BufferGeometry();
        dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
        const dotMat = new THREE.PointsMaterial({
          color: GOLD, size: 0.028, transparent: true, opacity: 0.8, sizeAttenuation: true,
        });
        const dots = new THREE.Points(dotGeo, dotMat);
        dots.position.copy(globe.position);
        group.add(dots);

        // === AMBIENT PARTICLE FIELD ===
        const pCount = isMobile ? 400 : 1200;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          pPos[i * 3]     = (Math.random() - 0.5) * 10;
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
          pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
          color: GOLD, size: 0.005, transparent: true, opacity: 0.45, sizeAttenuation: true,
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // === NETWORK LINES (desktop only) ===
        if (!isMobile) {
          const n = 180;
          const lines: number[] = [];
          for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
              const dx = pPos[i * 3] - pPos[j * 3];
              const dy = pPos[i * 3 + 1] - pPos[j * 3 + 1];
              const dz = pPos[i * 3 + 2] - pPos[j * 3 + 2];
              if (dx * dx + dy * dy + dz * dz < 0.7) {
                lines.push(pPos[i*3], pPos[i*3+1], pPos[i*3+2], pPos[j*3], pPos[j*3+1], pPos[j*3+2]);
              }
            }
          }
          if (lines.length) {
            const lGeo = new THREE.BufferGeometry();
            lGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lines), 3));
            const lMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.03 });
            scene.add(new THREE.LineSegments(lGeo, lMat));
          }
        }

        // === INTERACTION ===
        let targetRX = 0, targetRY = 0, currentRX = 0, currentRY = 0, scrollY = 0;

        const onMouse = (e: MouseEvent) => {
          targetRY = (e.clientX / window.innerWidth - 0.5) * 0.28;
          targetRX = (e.clientY / window.innerHeight - 0.5) * 0.16;
        };
        const onScroll = () => { scrollY = window.scrollY; };
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        document.addEventListener("mousemove", onMouse, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        // === ANIMATE ===
        const clock = new THREE.Clock();
        const animate = () => {
          rafId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          globe.rotation.y = t * 0.065;
          globe.rotation.x = Math.sin(t * 0.025) * 0.12;
          dots.rotation.y = t * 0.065;
          dots.rotation.x = Math.sin(t * 0.025) * 0.12;
          particles.rotation.y = t * 0.007;
          particles.rotation.x = t * 0.003;

          currentRX += (targetRX - currentRX) * 0.04;
          currentRY += (targetRY - currentRY) * 0.04;
          scene.rotation.x = currentRX;
          scene.rotation.y = currentRY;
          camera.position.z = 3.2 + scrollY * 0.0008;

          renderer.render(scene, camera);
        };
        animate();

        cleanup = () => {
          cancelAnimationFrame(rafId);
          document.removeEventListener("mousemove", onMouse);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          renderer.dispose();
        };
      });

      return () => { cleanup?.(); };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0, opacity: 0.9,
        }}
      />
    );
  }