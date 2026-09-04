/**
 * Motor do efeito de cáusticas. Vive fora do componente de propósito: assim o
 * shader e o loop de render só são baixados quando a tela realmente vai usá-lo
 * (≥768px, com GPU de verdade). No celular este arquivo nunca chega.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAspect;
varying vec2 vUv;
void main() {
  vec2 uv = vec2(vUv.x * uAspect, vUv.y);
  vec2 p = uv * 3.2;
  float t = uTime * 0.11;
  vec2 i = p;
  float c = 1.0;
  float inten = .006;
  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - 3.5 / float(n + 1));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  float v = pow(abs(c), 7.0);
  vec2 m = vec2(uMouse.x * uAspect, uMouse.y);
  float glow = smoothstep(0.9, 0.0, distance(uv, m)) * 0.35;
  vec3 sky = vec3(0.50, 0.85, 0.92);
  vec3 aqua = vec3(0.11, 0.61, 0.77);
  vec3 col = mix(sky, aqua, clamp(v * 1.4, 0.0, 1.0));
  float alpha = clamp(v * 0.55 + glow * 0.5, 0.0, 0.6);
  gl_FragColor = vec4(col, alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Liga o efeito dentro de `el`. Devolve o cleanup, ou null se não deu para rodar. */
export function start(el: HTMLElement, forced: boolean): (() => void) | null {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const debug = gl.getExtension('WEBGL_debug_renderer_info');
  const gpu = debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : '';
  if (!forced && /swiftshader|llvmpipe|software|mesa offscreen/i.test(gpu)) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = vs && fs ? gl.createProgram() : null;
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // Um único triângulo cobrindo a tela: mais barato que dois de um quad.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'uTime');
  const uMouse = gl.getUniformLocation(program, 'uMouse');
  const uAspect = gl.getUniformLocation(program, 'uAspect');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  el.appendChild(canvas);

  const dpr = Math.min(window.devicePixelRatio, 1.25);
  const target = { x: .7, y: .4 };
  const mouse = { x: .7, y: .4 };

  const onMove = (event: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    target.x = (event.clientX - rect.left) / rect.width;
    target.y = 1 - (event.clientY - rect.top) / rect.height;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const resize = () => {
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uAspect, w / h);
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(el);

  let visible = true;
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
  io.observe(el);

  const startedAt = performance.now();
  let frame = 0;
  let previous = 0;
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (!visible || document.hidden || now - previous < 33) return; // ~30fps basta
    previous = now;
    mouse.x += (target.x - mouse.x) * .05;
    mouse.y += (target.y - mouse.y) * .05;
    gl.uniform1f(uTime, (now - startedAt) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onMove);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buffer);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    canvas.remove();
  };
}
