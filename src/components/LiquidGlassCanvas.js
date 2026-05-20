"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texcoord;
  varying vec2 v_texcoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texcoord = a_texcoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_textureSize;
  uniform vec2 u_elementCenter;
  uniform float u_scrollY;
  uniform float u_borderRadius;
  uniform float u_blurRadius;
  uniform float u_edgeIntensity;
  uniform float u_rimIntensity;
  uniform float u_baseIntensity;
  uniform float u_rippleEffect;
  varying vec2 v_texcoord;

  float pillDistance(vec2 coord, vec2 size, float radius) {
    vec2 center = size * 0.5;
    vec2 pixel = coord * size;
    vec2 start = vec2(radius, center.y);
    vec2 end = vec2(size.x - radius, center.y);
    vec2 axis = end - start;
    vec2 toPoint = pixel - start;
    float t = clamp(dot(toPoint, axis) / dot(axis, axis), 0.0, 1.0);
    vec2 closest = start + t * axis;
    return length(pixel - closest) - radius;
  }

  void main() {
    vec2 coord = v_texcoord;
    vec2 size = u_resolution;
    vec2 pixel = coord * size;
    vec2 center = size * 0.5;

    float signedDistance = pillDistance(coord, size, u_borderRadius);
    float mask = 1.0 - smoothstep(-1.2, 1.2, signedDistance);
    if (mask <= 0.0) {
      discard;
    }

    vec2 capsuleStart = vec2(u_borderRadius, center.y);
    vec2 capsuleEnd = vec2(size.x - u_borderRadius, center.y);
    vec2 axis = capsuleEnd - capsuleStart;
    float t = clamp(dot(pixel - capsuleStart, axis) / dot(axis, axis), 0.0, 1.0);
    vec2 closest = capsuleStart + t * axis;
    vec2 normal = normalize(pixel - closest);
    if (length(pixel - closest) < 0.001) {
      normal = normalize(coord - vec2(0.5));
    }

    float insideDistance = max(-signedDistance, 0.0);
    float normalizedDistance = insideDistance / min(size.x, size.y);
    float edge = exp(-normalizedDistance * 13.0) * u_edgeIntensity;
    float rim = exp(-normalizedDistance * 4.2) * u_rimIntensity;
    float base = (1.0 - exp(-insideDistance * 0.04)) * u_baseIntensity;
    vec2 tangent = vec2(-normal.y, normal.x);
    vec2 ripple = tangent * sin(normalizedDistance * 48.0) * u_rippleEffect * rim;
    vec2 refraction = normal * (edge + rim + base) + ripple;

    vec2 pagePixel = u_elementCenter + vec2(0.0, u_scrollY) + (coord - 0.5) * size;
    vec2 textureCoord = pagePixel / u_textureSize + refraction;
    vec2 texel = 1.0 / u_textureSize;
    float sigma = max(u_blurRadius, 1.0) / 2.0;
    vec2 blurStep = texel * sigma;
    vec4 color = vec4(0.0);
    float totalWeight = 0.0;

    for (float x = -4.0; x <= 4.0; x += 1.0) {
      for (float y = -4.0; y <= 4.0; y += 1.0) {
        float distance = length(vec2(x, y));
        if (distance > 4.0) continue;
        float weight = exp(-(distance * distance) / (2.0 * sigma * sigma));
        color += texture2D(u_image, textureCoord + vec2(x, y) * blurStep) * weight;
        totalWeight += weight;
      }
    }

    color /= totalWeight;
    float shine = smoothstep(0.92, 0.15, coord.y) * 0.18;
    float edgeHighlight = smoothstep(0.28, 0.0, abs(signedDistance)) * 0.22;
    color.rgb += vec3(shine + edgeHighlight);
    gl_FragColor = vec4(color.rgb, mask);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
  }
  return shader;
}

function createProgram(gl) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
  }
  return program;
}

export default function LiquidGlassCanvas() {
  const canvasRef = useRef(null);
  const refsRef = useRef(null);
  const snapshotRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    let disposed = false;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!canvas || !gl) return undefined;

    const setup = async () => {
      const html2canvas = (await import("html2canvas")).default;
      if (disposed) return;

      const program = createProgram(gl);
      gl.useProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );

      const texcoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
        gl.STATIC_DRAW,
      );

      const positionLocation = gl.getAttribLocation(program, "a_position");
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const texcoordLocation = gl.getAttribLocation(program, "a_texcoord");
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
      gl.enableVertexAttribArray(texcoordLocation);
      gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      refsRef.current = {
        gl,
        texture,
        resolution: gl.getUniformLocation(program, "u_resolution"),
        textureSize: gl.getUniformLocation(program, "u_textureSize"),
        elementCenter: gl.getUniformLocation(program, "u_elementCenter"),
        scrollY: gl.getUniformLocation(program, "u_scrollY"),
        borderRadius: gl.getUniformLocation(program, "u_borderRadius"),
        blurRadius: gl.getUniformLocation(program, "u_blurRadius"),
        edgeIntensity: gl.getUniformLocation(program, "u_edgeIntensity"),
        rimIntensity: gl.getUniformLocation(program, "u_rimIntensity"),
        baseIntensity: gl.getUniformLocation(program, "u_baseIntensity"),
        rippleEffect: gl.getUniformLocation(program, "u_rippleEffect"),
        image: gl.getUniformLocation(program, "u_image"),
      };

      const capture = async () => {
        const snapshot = await html2canvas(document.body, {
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          ignoreElements: (element) =>
            element.classList?.contains("bottom-nav-wrap") ||
            element.classList?.contains("liquid-glass-canvas") ||
            element.classList?.contains("bottom-nav-liquid"),
        });
        if (disposed) return;
        snapshotRef.current = snapshot;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snapshot);
      };

      const render = () => {
        if (disposed || !refsRef.current || !snapshotRef.current) return;
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(refsRef.current.resolution, width, height);
        gl.uniform2f(refsRef.current.textureSize, snapshotRef.current.width, snapshotRef.current.height);
        gl.uniform2f(refsRef.current.elementCenter, rect.left + width / 2, rect.top + height / 2);
        gl.uniform1f(refsRef.current.scrollY, window.scrollY || document.documentElement.scrollTop || 0);
        gl.uniform1f(refsRef.current.borderRadius, height / 2);
        gl.uniform1f(refsRef.current.blurRadius, 5.5);
        gl.uniform1f(refsRef.current.edgeIntensity, 0.055);
        gl.uniform1f(refsRef.current.rimIntensity, 0.12);
        gl.uniform1f(refsRef.current.baseIntensity, 0.018);
        gl.uniform1f(refsRef.current.rippleEffect, 0.16);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, refsRef.current.texture);
        gl.uniform1i(refsRef.current.image, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      await capture();
      render();
      const queueRender = () => {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(render);
      };
      const queueCapture = () => {
        window.setTimeout(() => {
          capture().then(queueRender).catch(() => {});
        }, 120);
      };
      window.addEventListener("scroll", queueRender, { passive: true });
      window.addEventListener("resize", queueCapture);
      document.addEventListener("visibilitychange", queueCapture);
      refsRef.current.cleanup = () => {
        window.removeEventListener("scroll", queueRender);
        window.removeEventListener("resize", queueCapture);
        document.removeEventListener("visibilitychange", queueCapture);
      };
    };

    setup().catch(() => {});

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      refsRef.current?.cleanup?.();
    };
  }, []);

  return <canvas className="liquid-glass-canvas" ref={canvasRef} aria-hidden />;
}
