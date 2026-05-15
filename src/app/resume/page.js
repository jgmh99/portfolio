import { resumeItems } from "@/data/projects";

export const metadata = {
  title: "Resume | Jegal Minhyuk",
};

export default function ResumePage() {
  return (
    <section className="page-shell">
      <header className="page-hero">
        <p className="hero-kicker">Career Timeline</p>
        <h1 className="page-title">경력기술서</h1>
        <p className="page-subtitle">
          최신 프로젝트부터, 성과와 개선 내역을 push 이력 기준으로 정리했습니다.
        </p>
      </header>

      <ol className="timeline">
        {resumeItems.map((item, index) => (
          <li key={item.id} className="timeline-item">
            <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="timeline-head">
              <h2>{item.name}</h2>
              <span className="period">{item.period}</span>
            </div>

            <p>{item.summary}</p>
            <p className="meta">
              <strong>역할</strong> {item.role}
            </p>
            <p className="meta">
              <strong>주요 기술</strong> {item.stack.join(" · ")}
            </p>
            <p className="meta">
              <strong>푸시 기반 주요 작업</strong>
            </p>
            <ul className="highlights is-evidence">
              {item.commitBasedWork.map((work) => (
                <li key={work}>{work}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
