"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectsScrollSection from "@/components/ProjectsScrollSection";

export default function PortfolioSections({ projects }) {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef([]);
  const rootRef = useRef(null);
  const autoScrollRef = useRef(false);
  const SECTION_COUNT = 3;
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  const skillsTable = useMemo(
    () => [
      {
        category: "Language",
        strong: ["JavaScript", "TypeScript"],
        experienced: ["Java"],
      },
      {
        category: "Backend",
        strong: [],
        experienced: ["JSP", "Spring", "Express.js"],
      },
      {
        category: "Frontend",
        strong: ["React", "Next.js", "Tailwind CSS"],
        experienced: ["Shopify Liquid", "Vue"],
      },
      {
        category: "RDBMS",
        strong: [],
        experienced: ["MySQL", "Oracle", "Firebase"],
      },
      {
        category: "DevOps",
        strong: ["Git"],
        experienced: ["Docker", "Nginx"],
      },
    ],
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-section-index"));
          if (!Number.isNaN(idx)) {
            setActive(idx);
            setProgress(0);
          }
        });
      },
      { threshold: 0.6 },
    );

    sectionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateScrollVars = () => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = Math.max(rect.height - viewport, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      root.style.setProperty("--scene-progress", progress.toFixed(4));

      const projectEl = sectionRefs.current[2];
      if (projectEl) {
        const pRect = projectEl.getBoundingClientRect();
        const start = viewport;
        const end = -pRect.height;
        const range = Math.max(start - end, 1);
        const pProgress = Math.min(Math.max((start - pRect.top) / range, 0), 1);
        root.style.setProperty("--project-progress", pProgress.toFixed(4));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollVars);
    };

    updateScrollVars();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const tickMs = 100;
    const step = (tickMs / 10000) * 100;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + step;
        if (nextProgress < 100) return nextProgress;

        const nextSection = (active + 1) % SECTION_COUNT;
        autoScrollRef.current = true;
        sectionRefs.current[nextSection]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.setTimeout(() => {
          autoScrollRef.current = false;
        }, 900);
        return 0;
      });
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [active, isAutoPlaying]);

  useEffect(() => {
    const stopAutoPlayOnUserScroll = () => {
      if (autoScrollRef.current) return;
      setIsAutoPlaying(false);
    };

    window.addEventListener("wheel", stopAutoPlayOnUserScroll, { passive: true });
    window.addEventListener("touchmove", stopAutoPlayOnUserScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", stopAutoPlayOnUserScroll);
      window.removeEventListener("touchmove", stopAutoPlayOnUserScroll);
    };
  }, []);

  const moveSection = (nextIndex) => {
    autoScrollRef.current = true;
    sectionRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setProgress(0);
    window.setTimeout(() => {
      autoScrollRef.current = false;
    }, 900);
  };

  return (
    <div className="portfolio-sections" ref={rootRef}>
      <aside className="section-rail" aria-label="섹션 네비게이션">
        <div className="section-rail-track">
          <span className="section-rail-line" />
          <span
            className="section-rail-thumb"
            style={{ top: `${15 + active * 44}px` }}
          />
          {[
            { label: "소개" },
            { label: "기술" },
            { label: "프로젝트" },
          ].map((item, idx) => (
            <button
              key={item.label}
              type="button"
              className={`section-nav-item${active === idx ? " is-active" : ""}`}
              aria-label={`${item.label} 섹션으로 이동`}
              title={item.label}
              onClick={() =>
                sectionRefs.current[idx]?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <span className="section-dot" aria-hidden />
              <span className="section-name">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section-index={0}
        className={`portfolio-section${active === 0 ? " is-active" : ""}`}
      >
        <div className="section-inner intro-block">
          <p className="label">ABOUT</p>
          <h1 className="page-title">안녕하세요, 프론트엔드 개발자 제갈민혁입니다.</h1>
          <p className="page-subtitle">
            운영형 서비스에서 사용자 경험과 운영 효율을 동시에 개선하는 프론트엔드 개발을 하고 있습니다.
          </p>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section-index={1}
        className={`portfolio-section${active === 1 ? " is-active" : ""}`}
      >
        <div className="section-inner skills-block">
          <p className="label">SKILLS</p>
          <h2 className="page-title">사용 가능한 기술</h2>
          <div className="skills-table">
            <div className="skills-head">구분</div>
            <div className="skills-head">많이 사용해왔어요</div>
            <div className="skills-head">사용해본 적 있어요</div>

            {skillsTable.map((row) => (
              <div className="skills-row" key={row.category}>
                <div className="skills-category">{row.category}</div>
                <div className="skills-cell">
                  {row.strong.map((s) => (
                    <span key={`${row.category}-${s}`} className="skill-chip strong">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="skills-cell">
                  {row.experienced.map((s) => (
                    <span
                      key={`${row.category}-${s}`}
                      className="skill-chip experienced"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section-index={2}
        className={`portfolio-section${active === 2 ? " is-active" : ""}`}
      >
        <div className="section-inner project-block">
          <p className="label">PROJECTS</p>
          <h2 className="page-title">진행한 프로젝트</h2>
          <ProjectsScrollSection projects={projects} />
        </div>
      </section>

      <div className="autoplay-wrap is-visible">
        <div className="media-progress" aria-hidden>
          <span
            className="media-progress-left"
            style={{ width: `${safeProgress}%` }}
          />
          <span
            className="media-progress-right"
            style={{ left: `${safeProgress}%`, width: `${100 - safeProgress}%` }}
          />
          <span
            className="media-progress-thumb"
            style={{ left: `${safeProgress}%` }}
          />
        </div>
        <div className="media-controls">
          <button
            type="button"
            className="media-btn"
            onClick={() => moveSection((active - 1 + SECTION_COUNT) % SECTION_COUNT)}
            aria-label="이전 섹션"
          >
            ◀◀
          </button>
          <button
            type="button"
            className="media-btn media-btn-play"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-pressed={isAutoPlaying}
            aria-label={isAutoPlaying ? "자동 이동 일시정지" : "자동 이동 재생"}
          >
            {isAutoPlaying ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            className="media-btn"
            onClick={() => moveSection((active + 1) % SECTION_COUNT)}
            aria-label="다음 섹션"
          >
            ▶▶
          </button>
        </div>
      </div>
    </div>
  );
}
