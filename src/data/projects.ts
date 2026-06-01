export const projectShowcases = [
  {
    id: "asdf",
    title: "ASDF",
    period: "2026.04 - 진행중",
    oneLiner: "관리센터 언어설정 바텀시트/쿠키 · CRM 통계 공개 여부 · 관리자 로그 검색 API · 로그 엑셀 다운로드",
    context:
      "관리센터와 관리자 화면에서 설정 저장, 통계 노출 옵션, 로그 검색과 엑셀 다운로드 기능을 구현했습니다.",
    myScope: [
      "관리센터 언어설정 바텀시트 적용 및 쿠키 저장 처리",
      "CRM 통계 페이지 공개 여부 옵션 반영",
      "관리자 회원 로그 검색 API 연동",
      "관리자 로그 엑셀 다운로드 기능 추가",
    ],
    actions: [
      "언어설정 UI를 바텀시트로 구성하고 쿠키로 설정을 유지했습니다.",
      "통계 탭에 공개 여부 옵션을 반영해 노출 제어가 가능하도록 구성했습니다.",
      "로그 검색 API와 엑셀 다운로드를 버튼/훅/유틸 구조로 연결했습니다.",
    ],
    outcomes: [
      "언어 설정 유지, CRM 공개 옵션, 로그 검색, 로그 엑셀 다운로드 기능을 구현했습니다.",
      "관리자 화면의 검색과 다운로드 작업 흐름을 분리해 구성했습니다.",
    ],
    tech: ["Next.js", "React", "JavaScript", "next-intl", "Zustand"],
    links: [{ label: "서비스 바로가기", url: "https://asdf.my/login" }],
  },
  {
    id: "dongne-flower-admin",
    title: "플로비 어드민",
    period: "2025.11 - 2026.04",
    oneLiner: "회원 관리 페이지군 · 회원 검색 store 분리 · 회원 정보 엑셀 다운로드 · 버튼/훅/유틸 모듈화",
    context:
      "관리자 회원 관리 화면에서 검색 상태를 분리하고, 엑셀 다운로드 흐름을 컴포넌트와 훅/유틸로 나눠 구성했습니다.",
    myScope: [
      "회원 관리 페이지 구현 및 회원 검색 결과 컴포넌트 구성",
      "회원 검색 상태 store 분리",
      "회원 정보 엑셀 다운로드 기능 추가",
      "ExcelBtn, useExcelDownload, exportUtils, excelPayload 구조로 분리",
      "엑셀 다운로드 기능 컴포넌트화",
    ],
    actions: [
      "검색 조건과 결과 상태를 store로 분리해 화면 간 재사용이 가능하도록 구성했습니다.",
      "엑셀 다운로드는 버튼 UI/요청 처리/payload 구성/파일 내보내기 역할로 분리했습니다.",
      "기능 단위를 모듈화해 다른 관리자 화면에 적용 가능한 형태로 정리했습니다.",
    ],
    outcomes: [
      "회원 관리 페이지군과 검색 상태 관리, 엑셀 다운로드 기능을 구현했습니다.",
      "다운로드 흐름을 컴포넌트/훅/유틸 구조로 분리했습니다.",
    ],
    tech: ["Next.js", "React", "JavaScript", "Zustand"],
    links: [],
  },
  {
    id: "dongne-flower",
    title: "플로비 서비스",
    period: "2025.11 - 2026.04",
    oneLiner: "적립금 내역 API · 무한스크롤 · 바텀시트 정렬/필터 · 위치 기반 지도 마커 · 벤더 마커 선택 동작",
    context:
      "꽃집 탐색과 마이페이지 기능에서 지도/리스트/위치/필터 상태를 함께 맞추고, 적립금 내역 조회 화면에 무한스크롤을 적용했습니다.",
    myScope: [
      "마이페이지 적립금 내역 API 연동 및 무한스크롤 적용",
      "바텀시트 기반 정렬/필터 UI 구현",
      "사용자 위치 기반 주변 꽃집 지도 마커 연동",
      "주변 꽃집 리스트/지도 필터·정렬 수정",
      "벤더 마커 선택 동작 수정",
    ],
    actions: [
      "적립금 내역 데이터는 API 연동 후 순차 로드 방식으로 구현했습니다.",
      "정렬/필터는 바텀시트 UI와 store/hook 상태를 연결해 관리했습니다.",
      "지도 마커 선택 시 리스트 상태가 함께 반영되도록 동작을 수정했습니다.",
    ],
    outcomes: [
      "적립금 내역 조회와 무한스크롤, 지도 기반 탐색 기능을 구현했습니다.",
      "필터/정렬/마커 선택 시 리스트와 지도 상태가 함께 반영되도록 정리했습니다.",
    ],
    tech: ["Next.js", "React", "Zustand", "JavaScript"],
    links: [],
  },
  {
    id: "dongne-flower-vender",
    title: "플로비 벤더",
    period: "2025.11 - 2026.04",
    oneLiner: "상품 상세 수정 플로우 · 수정 전 확인 모달 · 리스트/상세 미리보기 · 무료견적 필터 스와이프 · 영업상태 API",
    context:
      "입점사 화면에서 상품 수정 전 확인부터 API 반영, 미리보기, 필터 인터랙션, 영업상태 연동까지 연결했습니다.",
    myScope: [
      "상품 수정 전 확인 모달 적용",
      "상품 상세 수정 로직 및 API 연결",
      "상품 리스트/상세 미리보기 적용",
      "무료견적 필터 스와이프 동작 수정",
      "메인페이지 영업상태 API 연동",
    ],
    actions: [
      "수정 전 확인 모달과 상세 수정 API 요청 흐름을 연결했습니다.",
      "리스트/상세 미리보기를 반영해 수정 내용 확인 단계를 추가했습니다.",
      "필터 스와이프와 영업상태 버튼 API 동작을 화면에 맞게 수정했습니다.",
    ],
    outcomes: [
      "입점사 상품 수정, 미리보기, 필터 UI, 영업상태 API 연동 기능을 구현했습니다.",
      "상품 수정 과정의 입력/확인/반영 흐름을 화면 단위로 구성했습니다.",
    ],
    tech: ["Next.js", "React", "JavaScript", "next-intl", "Zustand"],
    links: [],
  },
  {
    id: "wowcruise",
    title: "WOWCRUISE",
    period: "2025.07 - 2025.10",
    oneLiner: "예약 단계 화면 · 객실 선택 플로우 · 홀드 타이머/세션 유지 · 검색 키보드 이벤트 · 시니어 할인 분기",
    context:
      "크루즈 예약 서비스의 예약 화면과 객실 선택 플로우를 구현했습니다. 예약 단계에서 선택값/객실 상태/세션 유지/홀드 시간이 함께 맞물리는 구조를 다뤘습니다.",
    myScope: [
      "예약 1단계 화면 구현 및 모달 연동",
      "객실 선택 플로우 구현",
      "예약 플로우 정리 및 홀드 타이머 관련 세션 로직 수정",
      "검색 드롭다운 키보드 방향키 이벤트 처리 및 검색 아코디언 영역 수정",
      "시니어 할인 조건 분기 적용",
    ],
    actions: [
      "예약 단계 화면을 분리해 선택값과 화면 흐름을 연결했습니다.",
      "홀드 시간과 세션 유지 로직을 수정해 예약 중 상태가 유지되도록 구성했습니다.",
      "검색 드롭다운에 방향키 이동 이벤트를 추가하고 할인 조건 분기를 객실 선택 로직에 반영했습니다.",
    ],
    outcomes: [
      "예약 단계 화면, 객실 선택, 세션 유지, 검색 인터랙션, 할인 분기 기능을 구현했습니다.",
      "예약 흐름에서 필요한 상태/입력/분기 처리를 화면 단위로 정리했습니다.",
    ],
    tech: ["React", "JavaScript", "PHP API", "MySQL"],
    links: [{ label: "서비스 바로가기", url: "https://www.wowcruise.kr/" }],
  },
  {
    id: "sidiz",
    title: "SIDIZ",
    period: "2024.09 - 2025.05",
    oneLiner: "Shopify Liquid 리뷰 섹션 · 배송일 변경 모달 · 1:1 문의 챗봇 스크립트 · 파일 첨부명 난수화",
    context:
      "브랜드몰에서 상품 상세/마이페이지/고객문의 영역 기능을 보완하고, 파일 첨부 처리 시 파일명 충돌 가능성을 줄였습니다.",
    myScope: [
      "상품 상세 리뷰 섹션(Liquid/JS/CSS) 구현",
      "배송일 변경 모달 추가",
      "1:1 문의 챗봇 스크립트 수정",
      "파일 첨부명 난수화 처리 적용",
    ],
    actions: [
      "Liquid section과 JS/CSS를 연결해 리뷰 섹션을 구성했습니다.",
      "주문 관련 모달과 문의 스크립트를 화면 동작에 맞게 수정했습니다.",
      "첨부 파일명에 난수 처리를 적용해 파일명 충돌 가능성을 줄였습니다.",
    ],
    outcomes: [
      "상품 리뷰, 주문 모달, 고객문의, 파일 첨부 처리 기능을 구현했습니다.",
      "Liquid 기반 화면에서 기능 추가/수정이 가능한 구조로 정리했습니다.",
    ],
    tech: ["Shopify Liquid", "JavaScript", "CSS"],
    links: [{ label: "서비스 바로가기", url: "https://kr.sidiz.com" }],
  },
];

export const resumeItems = [
  {
    id: "asdf",
    project: "ASDF",
    company: "(주)방배동밸리",
    period: "2026.04 - 진행중",
    role: "Frontend Developer",
    environment: "Next.js, React, JavaScript",
    team: "PM 1 / DE 1 / FE 4 / BE 2",
    highlights: [
      "관리센터 언어설정 바텀시트를 적용하고 쿠키 저장을 처리했습니다.",
      "CRM 통계 페이지 공개 여부 옵션을 반영했습니다.",
      "관리자 회원 로그 검색 API를 연동했습니다.",
      "관리자 로그 엑셀 다운로드 기능을 추가했습니다.",
    ],
    outcomes: [
      "설정 저장, 통계 노출 제어, 로그 검색/다운로드 기능을 운영 화면에 반영했습니다.",
    ],
  },
  {
    id: "dongne-flower-admin",
    project: "플로비 어드민",
    company: "(주)방배동밸리",
    period: "2025.11 - 2026.04",
    role: "Frontend Developer",
    environment: "Next.js, React, JavaScript",
    team: "PM 1 / DE 1 / FE 3 / BE 2",
    highlights: [
      "회원 관리 페이지와 회원 검색 결과 컴포넌트를 구현했습니다.",
      "회원 검색 상태를 store로 분리했습니다.",
      "회원 정보 엑셀 다운로드 기능을 추가했습니다.",
      "ExcelBtn, useExcelDownload, exportUtils, excelPayload 구조로 모듈화했습니다.",
    ],
    outcomes: [
      "회원 관리/검색/엑셀 다운로드 흐름을 컴포넌트와 훅/유틸 단위로 분리했습니다.",
    ],
  },
  {
    id: "dongne-flower",
    project: "플로비 서비스",
    company: "(주)방배동밸리",
    period: "2025.11 - 2026.04",
    role: "Frontend Developer",
    environment: "Next.js, React, JavaScript, Zustand",
    team: "PM 1 / DE 1 / FE 3 / BE 2",
    highlights: [
      "마이페이지 적립금 내역 API 연동과 무한스크롤을 적용했습니다.",
      "바텀시트 기반 정렬/필터 UI를 구현했습니다.",
      "사용자 위치 기반 지도 마커와 위치 store/hook를 연동했습니다.",
      "주변 꽃집 리스트/지도 필터·정렬 및 벤더 마커 선택 동작을 수정했습니다.",
    ],
    outcomes: [
      "적립금 내역 조회와 지도 기반 탐색 기능을 구현했습니다.",
    ],
  },
  {
    id: "dongne-flower-vender",
    project: "플로비 벤더",
    company: "(주)방배동밸리",
    period: "2025.11 - 2026.04",
    role: "Frontend Developer",
    environment: "Next.js, React, JavaScript",
    team: "PM 1 / DE 1 / FE 3 / BE 2",
    highlights: [
      "상품 수정 전 확인 모달을 적용했습니다.",
      "상품 상세 수정 로직과 API를 연결했습니다.",
      "리스트/상세 미리보기를 적용했습니다.",
      "무료견적 필터 스와이프 동작 수정과 영업상태 API 연동을 진행했습니다.",
    ],
    outcomes: [
      "상품 수정 플로우, 미리보기, 필터 인터랙션, 영업상태 API 연동 기능을 구현했습니다.",
    ],
  },
  {
    id: "wowcruise",
    project: "WOWCRUISE",
    company: "(주)방배동밸리",
    period: "2025.07 - 2025.10",
    role: "Frontend Developer",
    environment: "React, JavaScript, PHP API, MySQL",
    team: "DE 1 / FE 1 / BE 1",
    highlights: [
      "예약 1단계 화면 구현 및 객실 선택 플로우를 구성했습니다.",
      "예약 플로우 정리와 홀드 타이머 관련 세션 유지 로직을 수정했습니다.",
      "검색 드롭다운 키보드 방향키 이벤트와 검색 아코디언 영역을 수정했습니다.",
      "시니어 할인 조건 분기를 객실 선택 로직에 반영했습니다.",
    ],
    outcomes: [
      "예약 단계 화면, 객실 선택, 세션 유지, 검색 인터랙션, 할인 분기 기능을 구현했습니다.",
    ],
  },
  {
    id: "sidiz",
    project: "SIDIZ",
    company: "(주)방배동밸리",
    period: "2024.09 - 2025.05",
    role: "Frontend Developer",
    environment: "Shopify Liquid, JavaScript, CSS",
    team: "PM 1 / FE 4 / BE 1",
    highlights: [
      "상품 상세 리뷰 섹션(Liquid/JS/CSS)을 구현했습니다.",
      "배송일 변경 모달을 추가했습니다.",
      "1:1 문의 챗봇 스크립트를 수정했습니다.",
      "파일 첨부명 난수화 처리를 적용했습니다.",
    ],
    outcomes: [
      "리뷰 섹션, 주문 모달, 문의 스크립트, 첨부 처리 기능을 구현했습니다.",
    ],
  },
];
