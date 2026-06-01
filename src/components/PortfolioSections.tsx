"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectsScrollSection from "@/components/ProjectsScrollSection";

const PROJECT_FILTERS = [
  { label: "전체", value: "all" },
  { label: "사내", value: "company" },
  { label: "Toy", value: "toy" },
];

const PROJECT_TITLES = {
  all: "진행한 전체 프로젝트",
  company: "진행한 사내 프로젝트",
  toy: "진행한 Toy 프로젝트",
};

export default function PortfolioSections({ projects }) {
  const SECTION_DURATIONS = [8000, 8000, 60000];
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [repeatMode, setRepeatMode] = useState("all");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const sectionRefs = useRef([]);
  const rootRef = useRef(null);
  const autoScrollRef = useRef(false);
  const dragStateRef = useRef({ dragging: false });
  const SECTION_COUNT = 3;
  const activeDuration = SECTION_DURATIONS[active] ?? 8000;
  const safeElapsed = Math.min(Math.max(elapsedMs, 0), activeDuration);
  const safeProgress = (safeElapsed / activeDuration) * 100;

  function moveSection(nextIndex) {
    autoScrollRef.current = true;
    sectionRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setElapsedMs(0);
    window.setTimeout(() => {
      autoScrollRef.current = false;
    }, 900);
  }

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
            setElapsedMs(0);
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
    const timer = window.setInterval(() => {
      setElapsedMs((prev) => {
        const nextElapsed = prev + tickMs;
        if (nextElapsed < activeDuration) return nextElapsed;
        const nextSection =
          repeatMode === "one" ? active : (active + 1) % SECTION_COUNT;
        moveSection(nextSection);
        return 0;
      });
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [active, isAutoPlaying, repeatMode, activeDuration]);

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

  const formatTime = (ms) => {
    const sec = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const calcProgressFromClientX = (clientX) => {
    const bar = rootRef.current?.querySelector(".media-progress");
    if (!bar) return safeProgress;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return ratio * 100;
  };

  const applySeek = (nextProgress) => {
    const ratio = Math.min(Math.max(nextProgress / 100, 0), 1);
    setElapsedMs(Math.round(activeDuration * ratio));
  };

  const onProgressPointerDown = (event) => {
    dragStateRef.current.dragging = true;
    applySeek(calcProgressFromClientX(event.clientX));
  };

  const toggleRepeatMode = () => {
    const nextMode = repeatMode === "all" ? "one" : "all";
    setRepeatMode(nextMode);
    setToastMessage(
      nextMode === "one" ? "현재 섹션 반복으로 변경되었습니다." : "전체 섹션 반복으로 변경되었습니다.",
    );
  };

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = window.setTimeout(() => setToastMessage(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const onMove = (event) => {
      if (!dragStateRef.current.dragging) return;
      applySeek(calcProgressFromClientX(event.clientX));
    };
    const onUp = () => {
      dragStateRef.current.dragging = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  });

  return (
    <div className="portfolio-sections" ref={rootRef}>
      <div className="mobile-section-nav" aria-label="모바일 섹션 네비게이션">
        {[
          { label: "소개" },
          { label: "기술" },
          { label: "프로젝트" },
        ].map((item, idx) => (
          <button
            key={`mobile-${item.label}`}
            type="button"
            className={`mobile-section-pill${active === idx ? " is-active" : ""}`}
            aria-label={`${item.label} 섹션으로 이동`}
            onClick={() =>
              sectionRefs.current[idx]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            {item.label}
          </button>
        ))}
      </div>

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
        ref={(el) => { sectionRefs.current[0] = el; }}
        data-section-index={0}
        className={`portfolio-section${active === 0 ? " is-active" : ""}`}
      >
        <div className="section-inner intro-block">
          <p className="label">ABOUT</p>
          <h1 className="page-title">안녕하세요, 프론트엔드 개발자 제갈민혁입니다.</h1>
          <p className="page-subtitle">
            사용자 화면과 관리자 도구를 구현해온 프론트엔드 개발자입니다.<br />
            예약 플로우, 지도 탐색, 검색/필터, 엑셀 다운로드 등 실서비스 화면에서 필요한 기능을 개발했습니다.
          </p>
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current[1] = el; }}
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
        ref={(el) => { sectionRefs.current[2] = el; }}
        data-section-index={2}
        className={`portfolio-section${active === 2 ? " is-active" : ""}`}
      >
        <div className="section-inner project-block">
          <p className="label">PROJECTS</p>
          <div className="project-title-row">
            <h2 className="page-title">{PROJECT_TITLES[projectFilter]}</h2>
            <div className="project-type-filter" aria-label="프로젝트 유형 필터">
              {PROJECT_FILTERS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`project-type-filter-button${projectFilter === option.value ? " is-active" : ""}`}
                  aria-pressed={projectFilter === option.value}
                  onClick={() => {
                    setProjectFilter(option.value);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <ProjectsScrollSection key={projectFilter} projects={projects} filter={projectFilter} />
        </div>
      </section>

      <div className="autoplay-wrap is-visible">
        <div
          className="media-progress"
          onPointerDown={onProgressPointerDown}
          role="slider"
          aria-label="섹션 자동 이동 진행도"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(safeProgress)}
        >
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
        <div className="media-time-row">
          <p className="media-time">{formatTime(safeElapsed)}</p>
          <p className="media-time">{formatTime(activeDuration - safeElapsed)}</p>
        </div>
        <div className="media-controls-row">
          <button
            type="button"
            className={`media-btn media-btn-repeat${repeatMode === "one" ? " is-one" : " is-all"}`}
            aria-label={repeatMode === "one" ? "현재 섹션 반복" : "전체 섹션 반복"}
            onClick={toggleRepeatMode}
          >
            <svg viewBox="0 0 24 24" className="media-icon" aria-hidden>
              <path d="M7 7h9.2l-1.8-1.9a1 1 0 0 1 1.5-1.3l3.4 3.6-3.4 3.6a1 1 0 1 1-1.5-1.3l1.8-1.9H7a3 3 0 0 0-3 3v1a1 1 0 1 1-2 0v-1a5 5 0 0 1 5-5Zm10 10H7.8l1.8 1.9a1 1 0 0 1-1.5 1.3L4.7 16.5l3.4-3.6a1 1 0 0 1 1.5 1.3L7.8 16H17a3 3 0 0 0 3-3v-1a1 1 0 1 1 2 0v1a5 5 0 0 1-5 5Z" />
            </svg>
            {repeatMode === "one" ? <span className="repeat-badge">1</span> : null}
          </button>
          <div className="media-controls">
            <button
              type="button"
              className="media-btn"
              onClick={() => moveSection((active - 1 + SECTION_COUNT) % SECTION_COUNT)}
              aria-label="이전 섹션"
            >
              <svg viewBox="0 0 24 24" className="media-icon-solid" aria-hidden>
                <path d="M6.2 12a1 1 0 0 1 .5-.86l8.6-4.98A1 1 0 0 1 16.8 7v10a1 1 0 0 1-1.5.86l-8.6-4.98A1 1 0 0 1 6.2 12Zm10.2-5.2a1 1 0 1 1 2 0v10.4a1 1 0 1 1-2 0Z" />
              </svg>
            </button>
            <button
              type="button"
              className="media-btn media-btn-play"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-pressed={isAutoPlaying}
              aria-label={isAutoPlaying ? "자동 이동 일시정지" : "자동 이동 재생"}
            >
              {isAutoPlaying ? (
                <svg viewBox="0 0 24 24" className="media-icon-play" aria-hidden>
                  <rect x="6.4" y="5.4" width="3.8" height="13.2" rx="1" />
                  <rect x="13.8" y="5.4" width="3.8" height="13.2" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="media-icon-play" aria-hidden>
                  <path d="m8 5.2 10.8 6.8L8 18.8Z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="media-btn"
              onClick={() => moveSection((active + 1) % SECTION_COUNT)}
              aria-label="다음 섹션"
            >
              <svg viewBox="0 0 24 24" className="media-icon-solid" aria-hidden>
                <path d="M17.8 12a1 1 0 0 1-.5.86l-8.6 4.98A1 1 0 0 1 7.2 17V7a1 1 0 0 1 1.5-.86l8.6 4.98a1 1 0 0 1 .5.88ZM5.6 6.8a1 1 0 1 1 2 0v10.4a1 1 0 1 1-2 0Z" />
              </svg>
            </button>
          </div>
          <div className="media-controls-spacer" />
        </div>
      </div>
      {toastMessage ? <p className="media-toast-global">{toastMessage}</p> : null}
    </div>
  );
}
