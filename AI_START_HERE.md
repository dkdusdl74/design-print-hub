# AI Start Here

이 프로젝트에서 작업하는 AI는 먼저 아래 파일을 읽고 따른다.

읽기 순서와 우선순위:

1. `AI_START_HERE.md`
2. `schoolp_ai_project_guide.md`
3. `docs/API_CONTRACT.md`
4. `AGENTS.md` 또는 `CLAUDE.md`
5. `README.md`
6. `SANDBOX_WORKFLOW.md`

문서 내용이 충돌하면 더 제한적인 규칙을 따른다.

## 작업 시작 규칙

팀원이 짧게 요청해도 AI는 먼저 위험 영역을 판단한다.

```text
작업 유형:
위험 영역 포함 여부:
바로 진행 가능한 범위:
개발자 확인 필요 항목:
```

## 로컬 실행 규칙

- 이 프로젝트의 로컬 주소는 항상 `http://localhost:3000`이다.
- `npm run dev`는 3000번 포트로만 실행한다.
- 3000번 포트가 사용 중이면 다른 포트로 우회 실행하지 말고 기존 dev server를 종료한 뒤 다시 실행한다.
- Windows에서 Node.js 또는 npm을 찾지 못하면 Node.js LTS 설치가 필요하다고 안내하고, 설치 후 Codex/PowerShell을 다시 열게 한다.
- Windows에서는 `start-windows.cmd`를 먼저 실행한다. 이 파일은 Node/npm 확인, 설치 안내, 3000번 포트 정리, 의존성 설치, 로컬 실행을 순서대로 진행한다.
- 실행 후 팀원에게는 `http://localhost:3000` 주소만 안내한다.

## 기존 프로젝트 이식 규칙

기존 프로젝트에서 이 시작 파일로 전환하는 경우, 구조는 schoolp 기준으로 맞추되 기존 UI, 스타일, 레이아웃, 카피, 프론트 상호작용은 원본 수준으로 보존한다.

- 다운로드/안내 페이지는 프로젝트 구조와 개발 규칙 안내로만 사용한다.
- 기존 프로젝트 전환은 리디자인이 아니라 구조 이식 작업이다. 기본 화면은 원본 메인 화면과 동일해야 하며, 원본에 없던 UI는 실제 앱 화면에 추가하지 않는다.
- 전환 결과물 안에 보존용 `legacy`, `backup`, `old` 폴더를 임의로 만들지 않는다.
- 기존 HTML/MD/static mockup은 최종 Next.js 화면과 문서에 필요한 내용만 이식하고, 중복 원본 파일은 결과물에 남기지 않는다.
- 기존 화면의 정보 구조, CTA, 입력 흐름, mock 상호작용을 새 구조로 이식한다.
- HTML/MD 정적 목업과 화면 중심 프로젝트도 이 Next.js 시작 파일을 사용한다.
- 사용자가 별도로 요청하기 전까지 포팅 과정에서 디자인을 재구성하지 않는다.
- 반응형 수정은 기존 UI를 보존하거나 깨짐을 고치는 범위에서만 진행한다.
- 기존 파일만 조금 수정하거나 메모 파일만 추가하고 완료하지 않는다.
- BFF와 로컬 DB는 필수가 아니다. 저장/조회/관리자 데이터가 필요한 경우에만 Route Handler, Prisma, SQLite를 사용한다.
- 기본 템플릿에는 활성 BFF/API/DB가 없다. 필요할 때만 `examples/optional-bff-db`를 참고해 실제 위치에 새로 만든다.

위험 주제를 다루는 mock UI 시안은 만들 수 있다.

실제 판정, 저장, 연동, 상태 변경, schema 변경, secret 처리, 배포 설정이 포함되면 구현하지 않고 `개발자 확인 필요`로 멈춘다.

기존 `.env.example`을 `.env`로 복사하는 것과 기존 migration을 실행하는 것은 허용된다. 환경변수 key 추가/이름 변경/secret 입력, DB schema 변경, migration 생성은 개발자 확인이 필요하다.

위험 영역:

- 인증
- 권한
- 결제
- 개인정보
- DB schema
- Prisma migration
- 환경변수
- 새 패키지
- 실제 API 연동
- Git/GitLab
- Docker/배포/서버 설정

## 금지

- git clone, commit, push, branch, merge, remote 설정
- FTP, SFTP, rsync, scp 등 전송 작업
- Docker, CI/CD, nginx, 서버 배포 파일 수정
- API 문서에 없는 endpoint, field, status 생성
- secret, token, password, DB URL 하드코딩
- package.json dependency 임의 추가

## API 연동

실제 API 연동은 `docs/API_CONTRACT.md`에 공식 API 문서 URL 또는 endpoint 명세가 있을 때만 진행한다.

API 문서가 없으면 mock 데이터 기반 화면 시안만 만든다.

## 빌드 오류 대응

일반 TypeScript, import, CSS 오류는 수정 시도한다.

오류 원인이 인증, 권한, 결제, 개인정보, DB schema, 환경변수, 새 패키지, 배포 설정과 관련되거나 같은 오류가 2회 이상 반복되면 `개발자 확인 필요`로 멈춘다.

팀원 sandbox 안에서 코드 수정과 로컬 실행만 수행한다.
