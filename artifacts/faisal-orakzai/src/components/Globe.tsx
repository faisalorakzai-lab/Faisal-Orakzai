import { useEffect, useRef } from "react";

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let renderer: any, scene: any, camera: any, sphere: any;

    const init = async () => {
      if (!mountRef.current) return;

      const THREE = await import("three");

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!context) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 2.5;

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
      } catch {
        return;
      }

      renderer.setSize(300, 300);
      renderer.setPixelRatio(window.devicePixelRatio);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });

      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        sphere.rotation.y += 0.001;
        sphere.rotation.x += 0.0005;
        renderer.render(scene, camera);
      };

      animate();
    };

    init().catch(() => {});

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        try {
          if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
        } catch {}
      }
      if (sphere) {
        try {
          sphere.geometry.dispose();
          sphere.material.dispose();
        } catch {}
      }
    };
  }, []);

  return <div ref={mountRef} className="w-[300px] h-[300px]" />;
}
