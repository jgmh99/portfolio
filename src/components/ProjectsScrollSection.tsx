"use client";

import { useState } from "react";

export default function ProjectsScrollSection({ projects, filter = "all" }) {
  const [active, setActive] = useState(0);

  const filteredProjects = projects.filter((project) => {
    const category = project.category || "company";
    return filter === "all" || category === filter;
  });
  const project = filteredProjects[active];
  const total = filteredProjects.length;
  const goPrev = () => setActive((prev) => (prev - 1 + total) % total);
  const goNext = () => setActive((prev) => (prev + 1) % total);

  return (
    <section className="scroll-scene">
      <div className="scroll-sticky ncloud-block">
        <div className="ncloud-project-nav">
          <div className="ncloud-tabs" role="tablist" aria-label="Project categories">
            {filteredProjects.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === active}
                className={`ncloud-tab${idx === active ? " is-active" : ""}`}
                onClick={() => {
                  setActive(idx);
                }}
              >
                <span className="tab-index">{String(idx + 1).padStart(2, "0")}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {project ? (
          <div key={project.id} className="ncloud-panel is-switching" data-theme={project.id}>
          <aside className="ncloud-visual">
            <span className="visual-orb orb-a" />
            <span className="visual-orb orb-b" />
            <p className="ncloud-kicker">PROJECT</p>
            <h2>{project.title}</h2>
            <p>{project.period}</p>
          </aside>

          <article className="ncloud-detail">
            <p className="summary summary-banner">{project.oneLiner}</p>

            <div className="ncloud-grid">
              <section className="info-card info-context">
                <h3>Context</h3>
                <p>{project.context}</p>
              </section>
              <section className="info-card info-tech">
                <h3>Tech</h3>
                <p>{project.tech.join(", ")}</p>
              </section>
              <section className="info-card info-scope">
                <h3>Key Implementation</h3>
                <ul>
                  {project.myScope.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
              <section className="info-card info-outcomes">
                <h3>Impact</h3>
                <ul>
                  {project.outcomes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
            </div>

            {project.links.length > 0 ? (
              <div className="link-row link-row-panel">
                {project.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="btn-link">
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </article>
          </div>
        ) : (
          <div className="ncloud-empty">
            <p>해당 유형의 프로젝트를 준비 중입니다.</p>
          </div>
        )}

        {total > 1 ? (
          <>
            <button
              type="button"
              className="project-edge-nav project-edge-nav-prev"
              onClick={goPrev}
              aria-label="이전 프로젝트"
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M14.5 6 8.5 12l6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="project-edge-nav project-edge-nav-next"
              onClick={goNext}
              aria-label="다음 프로젝트"
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="m9.5 6 6 6-6 6" />
              </svg>
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}
