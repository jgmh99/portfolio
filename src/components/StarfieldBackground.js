"use client";

import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = [];
    const STAR_COUNT = 70;
    let animationId = 0;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let glowX = 0;
    let glowY = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pointerX = width * 0.5;
      pointerY = height * 0.5;
      glowX = pointerX;
      glowY = pointerY;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: randomBetween(1, 3.5),
          v: randomBetween(0.08, 0.45),
          a: randomBetween(0.35, 0.9),
          t: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "#f4fbff");
      g.addColorStop(0.55, "#e9f6ff");
      g.addColorStop(1, "#e5f2ee");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      glowX += (pointerX - glowX) * 0.08;
      glowY += (pointerY - glowY) * 0.08;

      const spotlight = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 220);
      spotlight.addColorStop(0, "rgba(103, 187, 157, 0.28)");
      spotlight.addColorStop(0.42, "rgba(103, 187, 157, 0.12)");
      spotlight.addColorStop(1, "rgba(103, 187, 157, 0)");
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        s.t += 0.02;
        const twinkle = 0.2 * Math.sin(s.t);
        const alpha = Math.max(0.15, Math.min(1, s.a + twinkle));

        if (!reduceMotion) {
          s.y += s.v;
          s.x += Math.sin(s.t) * 0.08;
          if (s.y > height + 8) {
            s.y = -8;
            s.x = Math.random() * width;
          }
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(33, 92, 74, ${Math.max(0.22, alpha * 0.42)})`;
        ctx.fill();
      }

      if (!reduceMotion) animationId = requestAnimationFrame(draw);
    };

    resize();
    createStars();
    draw();

    if (reduceMotion) {
      return () => {
        cancelAnimationFrame(animationId);
      };
    }

    const onMouseMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const onResize = () => {
      resize();
      createStars();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden />;
}
