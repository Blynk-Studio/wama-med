'use client';

import { useEffect, useRef } from 'react';

export function ZelligeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on mobile — fallback is CSS gradient on body
    if (navigator.maxTouchPoints > 0 && window.innerWidth < 768) return;

    // Skip if reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const vs = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const fs = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uRes;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i),             hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float star8(vec2 p) {
        p = fract(p * 2.5) - 0.5;
        float a = atan(p.y, p.x);
        float r = length(p);
        float f = abs(cos(a * 4.0)) * 0.15 + 0.3;
        return smoothstep(f + 0.015, f - 0.015, r);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uRes;

        float n  = noise(uv * 3.0 + uTime * 0.07);
        float n2 = noise(uv * 5.5 - uTime * 0.05);
        float nv = n * 0.6 + n2 * 0.4;

        vec3 dark = vec3(0.039, 0.055, 0.102); /* #0A0E1A */
        vec3 teal = vec3(0.102, 0.290, 0.322); /* #1A4A52 */
        float breathe = sin(uTime * 0.125) * 0.10;
        vec3 bg = mix(dark, teal, nv * 0.42 + breathe);

        vec2 starUV = uv * vec2(uRes.x / uRes.y, 1.0);
        float star = star8(starUV * 4.0);
        vec3 gold = vec3(0.788, 0.659, 0.298); /* #C9A84C */
        vec3 col = mix(bg, gold, star * 0.12);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('ZelligeCanvas shader error:', gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // Fullscreen triangle — covers entire clip space with 3 vertices
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes  = gl.getUniformLocation(prog, 'uRes');

    const start = performance.now();
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        display: 'block',
        background: '#0A0E1A', // CSS fallback if WebGL fails
      }}
    />
  );
}
