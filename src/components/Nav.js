"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LiquidGlassCanvas from "@/components/LiquidGlassCanvas";

const links = [
  { href: "/projects", label: "포트폴리오" },
  { href: "/resume", label: "경력기술서" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [dragX, setDragX] = useState(0);
  const dragRef = useRef({ active: false, startX: 0, currentX: 0, moved: false });
  const suppressClickRef = useRef(false);
  const activeIndex = useMemo(
    () => Math.max(0, links.findIndex((link) => pathname.startsWith(link.href))),
    [pathname],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme-mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const navigate = (href) => {
    if (href === pathname) return;
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
      return;
    }
    router.push(href);
  };

  const getLiquidOffset = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const segmentWidth = (rect.width - 16) / links.length;
    const pointerX = event.clientX - rect.left - 8;
    const desiredLeft = Math.min(
      Math.max(pointerX - segmentWidth / 2, 0),
      segmentWidth * (links.length - 1),
    );
    return desiredLeft - activeIndex * segmentWidth;
  };

  const onTabPointerDown = (event) => {
    dragRef.current = { active: true, startX: event.clientX, currentX: 0, moved: false };
    setDragX(0);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onTabPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const pointerDelta = event.clientX - dragRef.current.startX;
    const isDragging = Math.abs(pointerDelta) > 8;
    dragRef.current.moved = isDragging;
    const nextX = isDragging ? getLiquidOffset(event) : 0;
    dragRef.current.currentX = nextX;
    setDragX(nextX);
  };

  const endTabDrag = (event) => {
    if (!dragRef.current.active) return;
    const wasDragged = dragRef.current.moved;
    const finalDragX = dragRef.current.currentX;
    const segmentWidth = (event.currentTarget.clientWidth - 16) / links.length;
    const nextIndex = Math.min(
      Math.max(Math.round((activeIndex * segmentWidth + finalDragX) / segmentWidth), 0),
      links.length - 1,
    );

    suppressClickRef.current = wasDragged;
    dragRef.current = { active: false, startX: 0, currentX: 0, moved: false };
    setDragX(0);

    if (nextIndex !== activeIndex) {
      navigate(links[nextIndex].href);
    }

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const onMobileTabClick = (href) => {
    if (suppressClickRef.current) return;
    navigate(href);
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/projects" className="brand">
            제갈민혁 포트폴리오
          </Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            suppressHydrationWarning
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <nav className="desktop-nav" aria-label="페이지 이동">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`desktop-nav-link${pathname.startsWith(link.href) ? " is-active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(link.href);
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div
        className={`bottom-nav-wrap${dragX !== 0 ? " is-dragging" : ""}`}
        aria-label="페이지 이동"
        style={{ "--liquid-x": `${activeIndex * 100}%`, "--drag-x": `${dragX}px` }}
        onPointerDown={onTabPointerDown}
        onPointerMove={onTabPointerMove}
        onPointerUp={endTabDrag}
        onPointerCancel={endTabDrag}
      >
        <span className="bottom-nav-liquid" aria-hidden>
          <LiquidGlassCanvas />
        </span>
        <nav className="bottom-nav">
          {links.map((link, index) => (
            <button
              key={link.href}
              type="button"
              className={`bottom-nav-link${pathname.startsWith(link.href) ? " is-active" : ""}`}
              data-mobile-tab={link.href}
              aria-current={index === activeIndex ? "page" : undefined}
              onClick={() => onMobileTabClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
