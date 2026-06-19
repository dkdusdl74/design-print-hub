# schoolp Next.js App

학교사업팀 웹서비스 개발을 위한 Next.js 시작 파일입니다.

## 사용 방법

학교사업팀 팀원은 제공받은 ZIP을 압축 해제한 뒤 이 폴더를 Codex/Claude에서 엽니다.

팀원은 Git/GitLab을 직접 사용하지 않습니다.

Node.js 20 이상을 사용합니다.

```bash
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 이 프로젝트는 로컬 개발 포트를 3000으로 고정합니다.

Windows에서 Node.js 또는 npm 명령을 찾지 못하면 Node.js LTS를 먼저 설치한 뒤 Codex/PowerShell을 다시 엽니다.

Windows 팀원은 `start-windows.cmd`를 실행합니다. 이 파일은 Node/npm 확인, 설치 안내, 3000번 포트 정리, 의존성 설치, 로컬 실행을 순서대로 진행합니다.

## AI 작업 전 필수

Codex, Claude 등 AI 도구를 사용할 때는 먼저 아래 파일을 읽게 합니다.

- `AI_START_HERE.md`
- `AGENTS.md`
- `CLAUDE.md`
- `schoolp_ai_project_guide.md`
- `docs/API_CONTRACT.md`
- `SANDBOX_WORKFLOW.md`

AI에게 작업을 시작할 때 아래 문장을 전달하는 것을 권장합니다.

```text
AI_START_HERE.md를 먼저 읽고 이 프로젝트 규칙에 맞춰 작업해줘.
이 프로젝트는 Next.js App Router 기반 시작 파일이야.
작업 전에 위험 영역이 있는지 판단하고, 인증/권한/결제/개인정보/DB schema/환경변수/새 패키지/배포 설정이 포함되면 구현하지 말고 개발자 확인 필요로 정리해줘.
```

기존 프로젝트 전환은 리디자인이 아니라 구조 이식 작업입니다. 기본 화면은 원본 메인 화면과 동일해야 하며, 원본에 없던 UI는 실제 앱 화면에 추가하지 않습니다.

기존 프로젝트를 전환할 때는 전환 결과물 안에 보존용 `legacy`, `backup`, `old` 폴더나 중복 원본 파일을 임의로 만들지 않습니다.

## 기본 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 스타일의 기본 UI 컴포넌트
- 필요 시 Prisma + SQLite
- 필요 시 Next.js Route Handler 기반 BFF
- `examples/optional-bff-db` 참고 예시

## 로컬 개발 원칙

팀원 로컬 개발에서는 Docker를 기본 사용하지 않습니다.

Docker, CI/CD, 서버 배포 파일은 개발자가 관리합니다.

팀원 로컬 개발에서는 Git도 기본 사용하지 않습니다.

Git, GitLab, branch, commit, push, merge는 개발자가 관리합니다.

팀원은 FTP/SFTP/rsync/scp로 서버에 직접 전송하지 않습니다. sandbox 결과 반영은 개발자가 처리합니다.

서버 전용 코드는 `src/server`에 둡니다. API route가 필요하면 `src/app/api/.../route.ts`를 사용합니다.

BFF와 로컬 DB는 필수가 아닙니다. 저장/조회/관리자 데이터가 필요한 경우에만 Route Handler, Prisma, SQLite를 사용합니다.

기본 템플릿에는 활성 API route, Prisma schema, DB 연결 코드가 없습니다. 필요할 때만 `examples/optional-bff-db`의 참고 예시를 실제 위치로 옮겨 서비스에 맞게 수정합니다.

공통 API 연동은 `docs/API_CONTRACT.md`에 공식 문서 URL 또는 endpoint 명세가 있을 때만 진행합니다. 문서가 없으면 mock 데이터 기반 화면 시안만 만들 수 있습니다.

## 주요 명령

팀원이 AI와 함께 실행해도 되는 기본 명령:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

로컬 실행 규칙:

- 로컬 주소는 항상 `http://localhost:3000`을 사용합니다.
- 다른 포트로 우회 실행하지 않습니다.
- 3000번 포트가 이미 사용 중이면 기존 dev server를 종료한 뒤 다시 실행합니다.
- Windows에서 실행이 꼬이면 `start-windows.cmd`를 실행합니다.

로컬 DB가 필요한 경우에만 실행하는 명령:

```bash
mkdir -p prisma
cp examples/optional-bff-db/schema.prisma.example prisma/schema.prisma
npm run prisma:generate
npm run db:setup
```

개발자 확인 후에만 실행하는 명령:

```bash
npm run prisma:migrate
npm run prisma:studio
```

## 주의

- `.env`, `.env.local`은 전달 파일에 포함하지 않습니다.
- SQLite DB 파일은 커밋하지 않습니다.
- `node_modules`, `.next`, 다운로드한 시작 ZIP, 중첩 시작 폴더는 전달 파일에 포함하지 않습니다.
- 실제 학생/학부모/학교 정보를 mock 데이터나 AI 프롬프트에 넣지 않습니다.
- API 문서에 없는 endpoint, field, status는 만들지 않습니다.

## 개발 도메인 반영

팀원은 서버나 개발 도메인에 직접 업로드하지 않습니다.

권장 흐름:

```text
팀원 sandbox 작업
-> 로컬에서 화면 확인
-> 개발자에게 반영 요청
-> 개발자가 검토
-> 개발자가 GitLab/서버/개발 도메인에 반영
```

팀원이 전달할 내용:

```text
서비스명:
작업 요약:
확인한 화면:
개발자 확인 필요 항목:
sandbox 폴더 또는 압축 파일:
```

전달 시 `HANDOFF_TO_DEVELOPER.md` 양식을 사용합니다.
