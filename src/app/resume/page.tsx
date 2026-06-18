import { resumeItems } from "@/data/projects";

export const metadata = {
  title: "Career Description | Jegal Minhyuk",
};

function ResumeDetail({ label, children }) {
  return (
    <div className="resume-detail">
      <strong>{label}</strong>
      <p>{children}</p>
    </div>
  );
}

export default function ResumePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resumeDocx = `${basePath}/files/resume_제갈민혁.docx`;
  const resumePdf = `${basePath}/files/resume_제갈민혁.pdf`;

  return (
    <section className="page-shell">
      <header className="page-head">
        <p className="label">CAREER DESCRIPTION</p>
        <div className="resume-title-row">
          <h1 className="page-title">프로젝트 상세 경력기술서</h1>
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
      </header>

      <section className="block resume-overview">
        <p><strong>경력 요약</strong></p>
        <p>(주)방배동밸리 소속으로 사용자 온보딩, 구매자·판매자 서비스, 관리자 백오피스, 예약 전환 플로우, 고객센터·마이페이지 개선을 담당해온 프론트엔드 개발자입니다.</p>
        <p>Next.js, React, TypeScript 기반의 서비스 화면과 운영 도구를 구현하며 상태 관리, API 연동, 입력 검증, 예외 처리, 공통 훅·유틸 구조화를 중심으로 기능 안정성과 재사용성을 높여왔습니다.</p>
        <p>지도 기반 탐색, 비회원 주문 진입, 엑셀 다운로드, 사이드바, 모달, 탭 구조 등 반복되는 사용자·운영자 흐름을 공통화해 개발 효율과 서비스 사용성을 함께 개선했습니다.</p>
      </section>

      <section className="block resume-key-block">
        <p><strong>핵심 역량 · 핵심 성과</strong></p>
        <div className="resume-key-section">
          <p><strong>핵심 역량</strong></p>
          <ul className="resume-bullets">
            <li>Next.js/React 기반 사용자 서비스와 관리자 백오피스 화면을 구현합니다.</li>
            <li>Zustand, React Hook Form, axios를 활용해 복합 상태와 API 흐름을 정리합니다.</li>
            <li>온보딩, 주문, 예약, 고객센터, 마이페이지 등 사용자 흐름의 예외 케이스를 처리합니다.</li>
            <li>사이드바, 모달, 엑셀 다운로드, 탭 화면처럼 반복되는 기능을 공통 구조로 분리합니다.</li>
            <li>운영 데이터 조회·필터·페이지네이션·다운로드 흐름을 사용자 작업 기준으로 개선합니다.</li>
          </ul>
        </div>
        <div className="resume-key-section">
          <p><strong>핵심 성과</strong></p>
          <ul className="resume-bullets resume-outcomes">
            <li>공통 사이드바 구조로 유사 사이드바 기능 개발 시간을 약 30% 단축했습니다.</li>
            <li>공통 엑셀 다운로드 구조로 관리자 다운로드 기능 개발 시간을 최대 약 40% 단축했습니다.</li>
            <li>주변 꽃집 탐색 API 중복 호출을 줄여 API 호출량을 약 35% 감소시켰습니다.</li>
            <li>지도 재조회 및 주변 꽃집 탐색 흐름 개선으로 Lighthouse 점수를 45점에서 78점으로 향상시켰습니다.</li>
            <li>예약 단계 이탈률을 약 18% 줄이고, 예약 재진입 성공률을 약 20% 개선했습니다.</li>
          </ul>
        </div>
      </section>

      <div className="resume-list">
        {resumeItems.map((item) => (
          <article key={item.id} className="resume-item">
            <div className="row">
              <h2>{item.project} / {item.projectType}</h2>
              <span className="period">{item.period}</span>
            </div>
            <p><strong>소속/역할</strong> {item.company} · {item.role}</p>
            <ResumeDetail label="개발환경">{item.environment}</ResumeDetail>
            {item.description ? <ResumeDetail label="서비스 설명">{item.description}</ResumeDetail> : null}
            <ResumeDetail label="사용 기술">
              {(item.tech || item.environment.split(",")).map((tech) => `• ${tech.trim()}`).join("  ")}
            </ResumeDetail>
            <ResumeDetail label="Situation">{item.situation}</ResumeDetail>
            <ResumeDetail label="Task">{item.task}</ResumeDetail>
            <ResumeDetail label="Action">{item.action}</ResumeDetail>
            <ResumeDetail label="Result">{item.result}</ResumeDetail>
          </article>
        ))}
      </div>
    </section>
  );
}
