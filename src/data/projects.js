export const projects = [
  {
    id: "asdf",
    name: "ASDF (LinkService) 리뉴얼",
    period: "2025.03 - 2026.05",
    summary:
      "링크 서비스 관리자/운영 기능을 리뉴얼한 Next.js 기반 프로젝트. 다국어 처리, 에디터, 드래그 정렬 등 운영 효율 중심 기능을 구현했습니다.",
    stack: ["Next.js 16", "React 19", "next-intl", "Zustand", "Tailwind CSS"],
    role: "프론트엔드 개발",
    highlights: [
      "다국어 라우팅과 국제화 구조 설계",
      "콘텐츠 편집/배치 관리 UX 고도화",
      "컴포넌트 재사용성 중심 구조 정리",
    ],
    commitBasedWork: [
      "2026-05-13 회원 CRM 통계 페이지 공개 유무 추가",
      "2026-05-13 회원 로그 페이지 생성",
      "2026-05-12 회원 차단내역 모달 내부 스크롤 적용",
    ],
    repoPath: "/Users/jegalminhyuk/Desktop/bvdev/ASDF/asdf",
    image: null,
  },
  {
    id: "dongne-flower-vender",
    name: "동네꽃집 벤더",
    period: "2025.11 - 2026.05",
    summary:
      "플라워샵 벤더용 주문/상품/운영 관리 웹 서비스. 결제 연동과 일정/주소/상품 편집 등의 실무 흐름을 제품화했습니다.",
    stack: ["Next.js 14", "React 18", "Zustand", "SWR", "Tailwind CSS", "PHP API"],
    role: "프론트엔드 개발",
    highlights: [
      "벤더 운영에 필요한 주문 및 상품 워크플로우 구현",
      "결제 위젯 연동 및 예외 케이스 대응",
      "상태 관리 표준화로 화면 간 데이터 일관성 확보",
    ],
    commitBasedWork: [
      "2026-04-03 상품 카테고리 옵션 변경",
      "2026-02-26 메인페이지 영업 상태 API 연결",
      "2026-02-24 제안서 작성 후 뒤로가기 동작 수정",
    ],
    repoPath: "/Users/jegalminhyuk/Desktop/bvdev/dongne-flower-vender",
    image: null,
  },
  {
    id: "dongne-flower-admin",
    name: "동네꽃집 어드민",
    period: "2025.12 - 2026.05",
    summary:
      "서비스 운영자를 위한 백오피스. 카테고리/이미지 라이브러리/콘텐츠 관리 기능 중심의 관리자 UI를 구축했습니다.",
    stack: ["Next.js 14", "React 18", "Zustand", "Playwright", "Tailwind CSS"],
    role: "프론트엔드 개발",
    highlights: [
      "어드민 정보 구조를 고려한 화면/네비게이션 설계",
      "운영 도구 생산성을 높이는 편집 및 목록 UX 적용",
      "E2E 테스트 기반 핵심 플로우 회귀 검증",
    ],
    commitBasedWork: [
      "2026-05-06 벤더 상세 지번 주소 예외 처리",
      "2026-05-06 벤더 주소/CRM 주소 수정",
      "2026-05-06 꽃집 관리 주소 수정",
    ],
    repoPath: "/Users/jegalminhyuk/Desktop/bvdev/dongne-flower-admin",
    image: null,
  },
  {
    id: "dongne-flower",
    name: "동네꽃집 사용자 서비스",
    period: "2025.10 - 2026.05",
    summary:
      "최종 사용자 대상 꽃 주문 서비스. 위치/주소/알림/검색/주문 단계 UX를 개선하며 서비스 사용성을 높였습니다.",
    stack: ["Next.js 14", "React 18", "Zustand", "Swiper", "Tailwind CSS", "PHP API"],
    role: "프론트엔드 개발",
    highlights: [
      "주문 전환율을 고려한 탐색/상세/결제 흐름 개선",
      "모바일 중심 상호작용 최적화",
      "공용 UI 패턴과 상태 로직 재사용 구조화",
    ],
    commitBasedWork: [
      "2026-05-11 AI 오더 샘플 이미지 lazy 적용",
      "2026-05-11 주변 꽃집 클릭 이벤트 수정",
      "2026-05-06 주변 꽃집 지도/타일/필터 동작 수정",
    ],
    repoPath: "/Users/jegalminhyuk/Desktop/bvdev/dongne-flower",
    image: null,
  },
  {
    id: "theme-sidiz",
    name: "theme-sidiz (Shopify 테마)",
    period: "2025.06 - 2025.10",
    summary:
      "Shopify 스토어 테마 커스터마이징 프로젝트. 상품/이벤트/브랜드/고객지원 섹션을 비즈니스 요구에 맞게 구현했습니다.",
    stack: ["Shopify Liquid", "JavaScript", "SCSS/CSS", "Theme Sections"],
    role: "프론트엔드 개발",
    highlights: [
      "다양한 섹션 템플릿 구성 및 운영 편의성 강화",
      "브랜드/프로모션 페이지의 표현력과 유지보수성 개선",
      "다국어 locale 구조 기반 글로벌 대응",
    ],
    commitBasedWork: [
      "2025-10-21 1:1 문의 답변 레이아웃 디자인 수정",
      "2025-10-21 s-culture 신청/리뷰 내역 로드 조건 수정",
      "2025-09-23 모달 작업 브랜치 기준 PR 머지",
    ],
    repoPath: "/Users/jegalminhyuk/Desktop/bvdev/theme-sidiz",
    image: null,
  },
  {
    id: "wowcruise",
    name: "wowcruise",
    period: "2025.08 - 2025.10",
    summary:
      "크루즈 상품 탐색/상세/프로모션 중심 서비스. 프론트엔드와 PHP API 연동 구조에서 리스트/상세 성능과 운영 흐름을 다뤘습니다.",
    stack: ["React", "PHP", "MySQL", "Legacy + Migration"],
    role: "프론트엔드 개발",
    highlights: [
      "상품 리스트/상세 화면 구성 및 API 연동",
      "프로모션/메인 배너 데이터 노출 구조 개선",
      "구버전(project_old)과 신규(project) 병행 운영 대응",
    ],
    commitBasedWork: [
      "현재 로컬 폴더 기준으로는 git 커밋 이력이 없어 push 기준 자동 추출 불가",
      "필요 시 원격 저장소 URL 기준으로 작업 이력 연결 가능",
    ],
    repoPath: "/Users/jegalminhyuk/Desktop/bvdev/wowcruise",
    image: null,
  },
];

export const resumeItems = [...projects].sort((a, b) =>
  b.period.localeCompare(a.period),
);
