import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects | Jegal Minhyuk",
};

export default function ProjectsPage() {
  return (
    <section className="page-shell">
      <header className="page-hero">
        <p className="hero-kicker">Selected Work</p>
        <h1 className="page-title">실무 프로젝트</h1>
        <p className="page-subtitle">
          실제 push 이력을 근거로, 무엇을 만들고 어떻게 개선했는지 정리했습니다.
        </p>
      </header>

      <div className="grid">
        {projects.map((project) => (
          <article key={project.id} className="card">
            <div className="card-top">
              <h2>{project.name}</h2>
              <span className="period">{project.period}</span>
            </div>

            <p className="summary">{project.summary}</p>

            <p className="meta">
              <strong>역할</strong> {project.role}
            </p>

            <p className="meta">
              <strong>스택</strong> {project.stack.join(" · ")}
            </p>

            <p className="meta">
              <strong>What I Did</strong>
            </p>
            <ul className="highlights">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="meta">
              <strong>Push-based Evidence</strong>
            </p>
            <ul className="highlights is-evidence">
              {project.commitBasedWork.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="repo-path">{project.repoPath}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
