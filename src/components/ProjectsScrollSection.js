"use client";

import { useState } from "react";

export default function ProjectsScrollSection({ projects }) {
  const [active, setActive] = useState(0);

  const project = projects[active];

  return (
    <section className="scroll-scene">
      <div className="scroll-sticky ncloud-block">
        <div className="ncloud-tabs" role="tablist" aria-label="Project categories">
          {projects.map((item, idx) => (
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

      </div>
    </section>
  );
}
