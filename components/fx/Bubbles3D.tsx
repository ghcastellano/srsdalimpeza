'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Bolhas de sabão 3D (Three.js) — só em tablet/desktop com ponteiro preciso
 * ou tela ≥ 768px, sem prefers-reduced-motion. Fica confinada ao container
 * do pai (pointer-events: none), nunca sobre o texto. Pausa fora da tela.
 */
export default function Bubbles3D({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ok = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches;
    if (!ok) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import('three').then((THREE) => {
      if (disposed || !el) return;
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      el.appendChild(canvas);

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch {
        canvas.remove();
        return;
      }
      // Sem GPU (SwiftShader/llvmpipe, GPU bloqueada): cada frame vira uma
      // long task e trava a página. Só roda com aceleração real — a menos que
      // ?bolhas=1 force (usado pelos testes).
      const forced = new URLSearchParams(window.location.search).has('bolhas');
      const gl = renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
      if (!forced && /swiftshader|llvmpipe|software|mesa offscreen/i.test(gpu)) {
        renderer.dispose();
        canvas.remove();
        return;
      }
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal; varying vec3 vView; varying vec2 vUv;
          void main(){
            vec4 world = modelMatrix * vec4(position,1.0);
            vNormal = normalize(mat3(modelMatrix) * normal);
            vView = normalize(cameraPosition - world.xyz);
            vUv = uv;
            gl_Position = projectionMatrix * viewMatrix * world;
          }`,
        fragmentShader: `
          uniform float uTime; varying vec3 vNormal; varying vec3 vView; varying vec2 vUv;
          void main(){
            float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
            // iridescência sutil (tons de água): ciano → azul → lilás claro
            float h = fract(vUv.y * 1.6 + vUv.x * 0.8 + uTime * 0.05);
            vec3 c1 = vec3(0.50, 0.85, 0.92);
            vec3 c2 = vec3(0.11, 0.61, 0.77);
            vec3 c3 = vec3(0.80, 0.80, 0.98);
            vec3 col = mix(mix(c1, c2, smoothstep(0.0, 0.5, h)), c3, smoothstep(0.5, 1.0, h));
            // reflexo especular no topo-esquerda
            float spec = pow(max(dot(normalize(vNormal + vec3(-0.4, 0.6, 0.7)), vView), 0.0), 40.0);
            float alpha = fres * 0.95 + spec * 0.7 + 0.03;
            gl_FragColor = vec4(col * 1.15 + spec, alpha);
          }`,
      });

      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const count = 11;
      const bubbles: { mesh: import('three').Mesh; speed: number; phase: number; drift: number; base: import('three').Vector3 }[] = [];
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        const r = 0.18 + Math.random() * 0.55;
        mesh.scale.setScalar(r);
        const base = new THREE.Vector3((Math.random() - 0.5) * 6.4, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 2.5);
        mesh.position.copy(base);
        scene.add(mesh);
        bubbles.push({ mesh, speed: 0.12 + Math.random() * 0.22, phase: Math.random() * Math.PI * 2, drift: 0.3 + Math.random() * 0.5, base });
      }

      const target = { x: 0, y: 0 };
      const mouse = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
      io.observe(el);

      let frame = 0;
      const clock = new THREE.Clock();
      const loop = () => {
        frame = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        material.uniforms.uTime.value = t;
        mouse.x += (target.x - mouse.x) * 0.04;
        mouse.y += (target.y - mouse.y) * 0.04;
        for (const b of bubbles) {
          const y = b.base.y + Math.sin(t * b.speed + b.phase) * b.drift + ((t * b.speed * 0.6 + b.phase) % 7) - 3.5;
          const wrapped = ((y + 4) % 8 + 8) % 8 - 4;
          b.mesh.position.set(b.base.x + Math.sin(t * 0.3 + b.phase) * 0.25 + mouse.x * 0.35, wrapped - mouse.y * 0.3, b.base.z);
        }
        scene.rotation.y = mouse.x * 0.08;
        renderer.render(scene, camera);
      };
      loop();
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove', onMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        canvas.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={host}
      data-bubbles={ready ? 'on' : 'off'}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden md:block [&>canvas]:h-full [&>canvas]:w-full ${className}`}
    />
  );
}
