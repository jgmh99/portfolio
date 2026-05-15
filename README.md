# Portfolio (Next.js Static Export)

이 프로젝트는 GitHub Pages 정적 배포용 포트폴리오입니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드 (로컬)

```bash
npm run build
```

## GitHub Pages 배포

프로젝트 페이지(`https://<user>.github.io/<repo>/`)로 배포할 경우:

```bash
BASE_PATH=/<repo-name> npm run build
```

빌드 결과물은 `out/` 폴더에 생성됩니다.

## 라우팅

- `/projects`: 실무 프로젝트 요약
- `/resume`: 최신순 경력기술서
