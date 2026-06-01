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
        <p className="label">CAREER DESCRIPTION</p>
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
        {/* <p className="page-subtitle">프로젝트 기간, 개발환경, 인원구성, 핵심 구현과 성과를 상세 정리함.</p> */}
      </header>

      <section className="block resume-overview">
        <p><strong>경력 요약</strong></p>
        <p>(주)방배동밸리 소속으로 사용자 서비스와 운영 도구를 아우르는 프로젝트에서 신규 기능 개발 · 기존 기능 고도화 · 운영 안정화를 담당해온 프론트엔드 개발자입니다.</p>
        <p>Next.js/React 기반으로 회원 관리, 검색/필터, 로그 조회, 엑셀 다운로드, 지도 기반 탐색 등 실사용 빈도가 높은 핵심 기능을 직접 설계·구현·운영했으며,<br/> 외부 API 연동과 상태 동기화, 예외 처리 구조화를 통해 서비스 전반의 품질과 안정성을 높여왔습니다.</p>
        <p>현재는 공통 훅·유틸 모듈화와 화면/로직 분리 설계를 중심으로 유지보수성과 확장성을 강화하고 있으며, Node.js/Express 기반 백엔드 영역도 함께 학습하고 있습니다.</p>
      </section>

      <section className="block resume-key-block">
        <p><strong>핵심 역량 · 핵심 성과</strong></p>
        <div className="resume-key-section">
          <p><strong>핵심 역량</strong></p>
          <ul className="resume-bullets">
            <li>운영/관리 도메인 중심의 API 연동 및 화면 로직을 설계합니다.</li>
            <li>회원 관리, 로그 조회, 다운로드 등 핵심 운영 플로우를 구현합니다.</li>
            <li>외부 연동과 상태 동기화 과정의 예외 케이스를 분리해 처리합니다.</li>
            <li>공통 훅·유틸을 분리해 재사용 가능한 모듈 구조를 설계합니다.</li>
            <li>운영자 작업 흐름을 기준으로 관리자 기능을 개선합니다.</li>
          </ul>
        </div>
        <div className="resume-key-section">
          <p><strong>핵심 성과</strong></p>
          <ul className="resume-bullets resume-outcomes">
            <li>로그 조회·검색·엑셀 다운로드를 하나의 운영 흐름으로 통합했습니다.</li>
            <li>언어 설정 유지와 공개 옵션 제어를 적용해 운영 연속성을 높였습니다.</li>
            <li>다운로드 기능을 공통화해 중복 개발 부담을 줄였습니다.</li>
            <li>지도/리스트/필터 상태 동기화를 보완해 탐색 안정성을 강화했습니다.</li>
          </ul>
        </div>
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
            <p><strong>서비스 설명</strong> {item.projectType}</p>
            <p><strong>개발환경</strong> {item.environment}</p>
            <p><strong>사용 기술</strong></p>
            <ul className="resume-bullets">
              {item.environment.split(",").map((tech) => (
                <li key={`${item.id}-${tech.trim()}`}>{tech.trim()}</li>
              ))}
            </ul>
            <p><strong>인원구성</strong> {item.team}</p>
            <p><strong>역할과 책임</strong></p>
            <ul className="resume-bullets">
              {(item.responsibilities || item.highlights).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p><strong>문제 상황</strong></p>
            <ul className="resume-bullets">
              {(item.problems || []).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p><strong>해결 방법</strong></p>
            <ul className="resume-bullets">
              {(item.solutions || []).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p><strong>결과·성과</strong></p>
            <ul className="resume-bullets resume-outcomes">
              {(item.results || item.outcomes).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
