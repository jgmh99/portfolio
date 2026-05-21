import { resumeItems } from "@/data/projects";

export const metadata = {
  title: "Resume | Jegal Minhyuk",
};

export default function ResumePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resumeDocx = `${basePath}/files/resume_제갈민혁.docx`;
  const resumePdf = `${basePath}/files/resume_제갈민혁.pdf`;

  return (
    <section className="page-shell">
      <header className="page-head">
        <p className="label">RESUME</p>
        <div className="resume-title-row">
          <h1 className="page-title">경력기술서</h1>
          <div className="resume-actions" aria-label="경력기술서 파일">
            <a className="resume-action-link" href={resumePdf} target="_blank" rel="noreferrer">
              미리보기
            </a>
            <a className="resume-action-link" href={resumeDocx} download>
              DOCX 다운로드
            </a>
            <a className="resume-action-link" href={resumePdf} download>
              PDF 다운로드
            </a>
          </div>
        </div>
        {/* <p className="page-subtitle">프로젝트 기간, 개발환경, 인원구성, 핵심 구현과 성과를 상세 정리했습니다.</p> */}
      </header>

      <section className="block resume-overview">
        <p><strong>직무</strong> 프론트엔드 개발자</p>
        <p><strong>경력</strong> 2024.09 ~ 현재</p>
        <p><strong>핵심역량</strong> 복잡한 화면/상태/라우팅 구현, 운영 이슈 신속 대응, 백오피스·CRM 도구 구조화</p>
      </section>

      <div className="resume-list">
        {resumeItems.map((item) => (
          <article key={item.id} className="resume-item">
            <div className="row">
              <h2>{item.project}</h2>
              <span className="period">{item.period}</span>
            </div>
            <p><strong>소속/역할</strong> {item.company} · {item.role}</p>
            <p><strong>개발환경</strong> {item.environment}</p>
            <p><strong>인원구성</strong> {item.team}</p>
            <p><strong>주요 구현</strong></p>
            <ul className="resume-bullets">
              {item.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p><strong>성과/개선</strong></p>
            <ul className="resume-bullets resume-outcomes">
              {item.outcomes.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
