import { resumeItems } from "@/data/projects";

export const metadata = {
  title: "Career Description | Jegal Minhyuk",
};

export default function ResumePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resumeDocx = `${basePath}/files/resume_제갈민혁.docx`;
  const resumePdf = `${basePath}/files/resume_제갈민혁.pdf`;

  return (
    <section className="page-shell">
      <header className="page-head">
        <p className="label">경력기술서</p>
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
        <p><strong>요약</strong> React와 Next.js 기반의 사용자 서비스와 관리자 도구 개발 경험이 있습니다. 예약 플로우, 지도 기반 탐색, 회원 관리, 검색/필터, 엑셀 다운로드처럼 실제 서비스 운영에 필요한 화면 기능을 구현했습니다.</p>
      </section>

      <div className="resume-list">
        {resumeItems.map((item) => (
          <article key={item.id} className="resume-item">
            <div className="row">
              <h2>{item.project}</h2>
              <span className="period">{item.period}</span>
            </div>
            {item.projectType ? <p className="resume-project-type">{item.projectType}</p> : null}
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
