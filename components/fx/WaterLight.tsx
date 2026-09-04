'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Luz de água": cáusticas suaves em WebGL (Three.js) atrás do hero, como o
 * reflexo do sol no fundo de uma piscina limpa. Indireto, sem objeto óbvio.
 * Reage ao mouse e respira devagar. Só em tablet/desktop, com GPU real e sem
 * prefers-reduced-motion. Sem GPU (SwiftShader etc.) cada frame vira tarefa
 * longa, então desliga; ?fx=1 força (usado pelos testes).
 */
export default function WaterLight({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const forced = new URLSearchParams(window.location.search).has('fx');
    const ok = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches;
    if (!ok && !forced) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import('three').then((THREE) => {
      if (disposed) return;
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch {
        return;
      }
      const gl = renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
      if (!forced && /swiftshader|llvmpipe|software|mesa offscreen/i.test(gpu)) {
        renderer.dispose();
        return;
      }
      el.appendChild(canvas);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.7, 0.4) },
        uAspect: { value: 1 },
      };
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms,
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
        fragmentShader: `
          precision highp float;
          uniform float uTime; uniform vec2 uMouse; uniform float uAspect; varying vec2 vUv;
          void main(){
            vec2 uv = vec2(vUv.x * uAspect, vUv.y);
            vec2 p = uv * 3.2;
            float t = uTime * 0.11;
            vec2 i = p; float c = 1.0; float inten = .006;
            for (int n = 0; n < 4; n++) {
              float tt = t * (1.0 - 3.5 / float(n + 1));
              i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
              c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
            }
            c /= 4.0; c = 1.17 - pow(c, 1.4);
            float v = pow(abs(c), 7.0);
            // brilho suave que segue o mouse
            vec2 m = vec2(uMouse.x * uAspect, uMouse.y);
            float glow = smoothstep(0.9, 0.0, distance(uv, m)) * 0.35;
            vec3 sky = vec3(0.50, 0.85, 0.92);
            vec3 aqua = vec3(0.11, 0.61, 0.77);
            vec3 col = mix(sky, aqua, clamp(v * 1.4, 0.0, 1.0));
            float alpha = clamp(v * 0.55 + glow * 0.5, 0.0, 0.6);
            gl_FragColor = vec4(col, alpha);
          }`,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      const target = new THREE.Vector2(0.7, 0.4);
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        uniforms.uAspect.value = w / h;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
      io.observe(el);

      let frame = 0;
      let last = 0;
      const clock = new THREE.Clock();
      const loop = (now: number) => {
        frame = requestAnimationFrame(loop);
        if (!visible || document.hidden || now - last < 33) return; // ~30 fps basta
        last = now;
        uniforms.uTime.value = clock.getElapsedTime();
        uniforms.uMouse.value.lerp(target, 0.05);
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(loop);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove', onMove);
        mesh.geometry.dispose();
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
      data-fx={ready ? 'on' : 'off'}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden md:block [&>canvas]:h-full [&>canvas]:w-full ${className}`}
    />
  );
}
