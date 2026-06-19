# Handoff To Developer

학교사업팀 팀원이 sandbox 작업을 마친 뒤 개발자에게 전달할 때 사용하는 양식입니다.

## 전달 양식

```text
서비스명:
작업자:
작업 요약:

확인한 화면:
-

주요 변경:
-

변경 파일 목록:
-

AI가 남긴 개발자 확인 필요 항목:
-

실행한 명령:
- npm run dev
- npm run build
- npm run lint
- npm run typecheck

남아 있는 mock 데이터:
- 없음 / 있음

공통 API 문서 사용 여부:
- 없음 / 있음

secret/env/실데이터 노출 의심:
- 없음 / 있음

전달 파일:
- sandbox zip 또는 sandbox 폴더
```

secret, 환경변수, 실제 개인정보가 노출되었다고 의심되면 전달 전에 개발자에게 먼저 알립니다. 노출된 값은 폐기와 재발급이 필요할 수 있습니다.

## 전달 ZIP 포함 금지

아래 파일과 폴더는 전달 ZIP에 포함하지 않습니다.

```text
.env
.env.local
.env.*.local
*.db
*.db-journal
*.sqlite
*.sqlite3
node_modules
.next
dist
.vite
coverage
.git
schoolp-nextjs-app.zip
schoolp-nextjs-app/
legacy
backup
old
*.log
.DS_Store
```

`.gitignore`는 Git에만 적용됩니다. 폴더를 직접 압축하면 위 파일들이 들어갈 수 있으므로 전달 전 반드시 확인합니다.

## 개발자 확인 항목

개발자는 전달받은 sandbox를 바로 배포하지 않고 아래를 먼저 확인합니다.

- secret, token, password, DB URL이 포함되어 있지 않은지
- `.env`, `.env.local`, SQLite DB 파일이 포함되어 있지 않은지
- `node_modules`, `.next`, `dist`, `.vite`, `.git`, 로그 파일이 포함되어 있지 않은지
- API 문서에 없는 endpoint/field/status를 만들지 않았는지
- 인증/권한/결제/개인정보/DB schema 변경이 있는지
- API route 목록이 의도치 않게 늘지 않았는지
- `prisma/schema.prisma` 또는 `prisma/migrations` 변경이 있는지
- 보존용 `legacy`, `backup`, `old` 폴더나 중복 원본 파일이 불필요하게 포함되어 있지 않은지
- 다운로드한 시작 ZIP이나 압축 해제 후 남은 중첩 시작 폴더가 포함되어 있지 않은지
- `package.json` 또는 lockfile 변경이 있는지
- 새 패키지의 필요성, 보안, 라이선스 문제가 없는지
- `.env.example` 변경이 있는지
- `npm run build`가 통과하는지
- 가능한 경우 `npm run lint`, `npm run typecheck`가 통과하는지
- mock 데이터가 실제 연동 화면에 남아 있지 않은지

## 개발 도메인 반영

개발 도메인 반영은 개발자가 처리합니다.

팀원은 FTP, SFTP, Git push, 서버 접속을 하지 않습니다.

개발 도메인 반영 시 개발자는 아래를 기록합니다.

```text
서비스명:
작업자:
승인자:
preview URL:
반영 범위:
반영 시간:
롤백 가능 여부:
preview 만료일:
```
