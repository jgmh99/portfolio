# 제갈민혁 포트폴리오

Next.js App Router 기반으로 만든 개인 포트폴리오 사이트입니다. 프로젝트 소개와 경력기술서 페이지를 분리했고, GitHub Pages에 정적 사이트로 배포할 수 있도록 구성했습니다.

배포 주소:

```text
https://jgmh99.github.io/portfolio/
```

## 기술 스택

- `Next.js 16`: App Router, Static Export 기반 페이지 구성
- `React 19`: 컴포넌트 기반 UI 구현
- `CSS`: 전역 CSS와 반응형 레이아웃 직접 구성
- `html2canvas`: 모바일 하단 탭의 Liquid Glass 효과를 만들기 위한 화면 캡처
- `WebGL Canvas`: 캡처된 배경을 굴절/블러 처리하는 Liquid Glass 렌더링
- `GitHub Actions`: GitHub Pages 자동 배포
- `python-docx`, `reportlab`: 경력기술서 DOCX/PDF 생성 스크립트 작성에 사용

## 주요 구성

```text
src/app/
  layout.js              전체 레이아웃, 공통 배경/내비게이션 적용
  page.js                홈 화면, 포트폴리오 섹션 렌더링
  projects/page.js       프로젝트 포트폴리오 페이지
  resume/page.js         경력기술서 페이지, 미리보기/다운로드 버튼 제공

src/components/
  Nav.js                 상단 헤더, 모바일 하단 탭, 다크모드 토글
  LiquidGlassCanvas.js   모바일 하단 탭 Liquid Glass WebGL 효과
  StarfieldBackground.js 배경 캔버스 효과
  PortfolioSections.js  소개/기술/프로젝트 섹션
  ProjectsScrollSection.js 프로젝트 탭/상세 패널

src/data/
  projects.js            프로젝트와 경력기술서 데이터

public/files/
  resume_제갈민혁.docx    경력기술서 DOCX
  resume_제갈민혁.pdf     경력기술서 PDF

scripts/
  generate_resume_docx.py 경력 데이터 기반 DOCX/PDF 생성 스크립트

.github/workflows/
  deploy-pages.yml       GitHub Pages 배포 workflow
```

## 페이지 구조

`/`와 `/projects`는 포트폴리오 메인 화면입니다. 소개, 기술 스택, 프로젝트를 한 흐름으로 보여주며, 프로젝트 영역은 탭 기반 상세 패널로 구성했습니다.

`/resume`은 경력기술서 화면입니다. 웹 페이지에는 경력 요약과 프로젝트별 주요 구현/성과를 보여주고, 상단 버튼으로 PDF 미리보기와 DOCX/PDF 다운로드를 제공합니다.

## UI 구현 포인트

- 데스크톱에서는 상단 헤더에 페이지 이동과 다크모드 토글을 배치했습니다.
- 모바일에서는 하단에 포트폴리오/경력기술서 탭을 고정했습니다.
- 하단 탭의 선택 영역은 단순 색상 오버레이가 아니라 `html2canvas`로 현재 화면을 캡처한 뒤 WebGL shader로 굴절시키는 방식으로 구현했습니다.
- 페이지 전환에는 브라우저가 지원하는 경우 `document.startViewTransition`을 사용해 부드럽게 이동합니다.
- 정적 배포 환경을 고려해 `next.config.mjs`에서 `output: "export"`, `trailingSlash`, `basePath`, `assetPrefix`를 설정했습니다.

## 경력기술서 생성

경력기술서는 `src/data/projects.js`의 `resumeItems` 데이터를 기준으로 생성합니다. 양식 파일을 바탕으로 DOCX를 만들고, 웹 미리보기/다운로드용 PDF도 함께 생성합니다.

```bash
python3 scripts/generate_resume_docx.py
```

생성 결과:

```text
public/files/resume_제갈민혁.docx
public/files/resume_제갈민혁.pdf
```

## 개발

```bash
npm install
npm run dev
```

로컬 기본 주소:

```text
http://localhost:3000
```

## 검사

```bash
npm run lint
npm run build
```

## 라우팅

- `/`: 포트폴리오 메인
- `/projects`: 포트폴리오 메인
- `/resume`: 경력기술서
