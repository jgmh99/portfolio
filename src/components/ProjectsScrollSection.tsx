"use client";

import { useMemo, useState } from "react";

function ProjectTextBlock({ title, paragraphs }) {
  if (!paragraphs?.length) return null;

  return (
    <section className="case-text-block">
      <h3>{title}</h3>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

function ProjectListBlock({ title, items, variant = "default" }) {
  if (!items?.length) return null;

  return (
    <section className={`case-list-block case-list-${variant}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectsScrollSection({ projects, filter = "all" }) {
  const [active, setActive] = useState(0);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const category = project.category || "company";
        return filter === "all" || category === filter;
      }),
    [projects, filter],
  );

  const project = filteredProjects[active];
  const total = filteredProjects.length;
  const goPrev = () => setActive((prev) => (prev - 1 + total) % total);
  const goNext = () => setActive((prev) => (prev + 1) % total);

  if (!project) {
    return (
      <section className="portfolio-case-empty">
        <p>해당 유형의 프로젝트를 준비 중입니다.</p>
      </section>
    );
  }

  return (
    <section className="portfolio-case-study" data-project={project.id}>
      <aside className="case-index-panel" aria-label="프로젝트 목록">
        <p className="case-index-kicker">CASE STUDIES</p>
        <div className="case-index-list" role="tablist" aria-label="프로젝트 선택">
          {filteredProjects.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={idx === active}
              className={`case-index-button${idx === active ? " is-active" : ""}`}
              onClick={() => setActive(idx)}
            >
              <span>{item.number || String(idx + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </button>
          ))}
        </div>
      </aside>

      <article className="case-detail-panel">
        <header className="case-hero">
          <div className="case-hero-meta">
            <span>{project.number}</span>
            <span>{project.kind}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{project.subtitle}</p>
          <dl className="case-meta-grid">
            <div>
              <dt>기간</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>역할</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>구분</dt>
              <dd>{project.kind}</dd>
            </div>
          </dl>
        </header>

        <div className="case-body">
          <ProjectTextBlock title="프로젝트 개요" paragraphs={project.overview} />

          <section className="case-tech-block">
            <h3>사용 기술</h3>
            <div className="case-tech-list">
              {project.tech.map((tech) => (
                <span key={`${project.id}-${tech}`}>{tech}</span>
              ))}
            </div>
          </section>

          {project.serviceStructure?.length ? (
            <section className="case-service-block">
              <h3>서비스 구조</h3>
              <div className="case-service-grid">
                {project.serviceStructure.map((service) => (
                  <article key={service.title}>
                    <strong>{service.title}</strong>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <div className="case-split-grid">
            <ProjectTextBlock title="문제 상황" paragraphs={project.problem} />
            <ProjectTextBlock title="해결 방식" paragraphs={project.solution} />
          </div>

          <div className="case-bottom-grid">
            <ProjectListBlock title="핵심 구현" items={project.implementations} />
            <ProjectListBlock title="성과" items={project.outcomes} variant="outcomes" />
          </div>

          {project.links?.length ? (
            <div className="case-link-row">
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      {total > 1 ? (
        <div className="case-pager" aria-label="프로젝트 이동">
          <button type="button" onClick={goPrev} aria-label="이전 프로젝트">
            이전
          </button>
          <span>
            {active + 1} / {total}
          </span>
          <button type="button" onClick={goNext} aria-label="다음 프로젝트">
            다음
          </button>
        </div>
      ) : null}
    </section>
  );
}
