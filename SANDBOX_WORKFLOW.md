# Sandbox Workflow

학교사업팀 팀원은 Git, FTP, 배포 작업을 직접 하지 않는다.

팀원은 AI에게도 Git push, FTP 업로드, 서버 접속, 배포 반영을 요청하지 않는다.

## 시작 방식

표준 방식:

```text
팀원이 다운로드 페이지에서 ZIP 다운로드
압축 해제
압축 해제한 폴더를 Codex/Claude에서 열기
AI_START_HERE.md를 먼저 읽게 한 뒤 개발 시작
```

통제 운영 방식:

```text
개발자가 팀원별 sandbox 폴더 생성
개발자가 필요한 환경 파일과 안내 제공
팀원은 제공받은 sandbox 폴더를 Codex/Claude에서 열기
```

시작 파일 기준:

- schoolp 프로젝트는 `schoolp-nextjs-app` Next.js 시작 파일을 사용한다.
- 화면 중심 작업도 Next.js 기준으로 진행한다.
- BFF와 로컬 DB는 필요한 경우에만 사용한다.
- 위험 기능 구현은 개발자 확인 후 진행한다.

예시 sandbox 이름:

```text
schoolp-sc01-sandbox
schoolp-sc02-sandbox
schoolp-sc03-sandbox
```

## 팀원이 하는 것

팀원은 제공받은 폴더 또는 압축 해제한 폴더를 Codex/Claude에서 연다.

팀원은 AI에게 이렇게 말한다.

```text
AI_START_HERE.md를 먼저 읽고 이 프로젝트 규칙에 맞춰 작업해줘.
```

팀원은 Git/GitLab/FTP/SFTP/배포 작업을 요청하지 않는다.

## 로컬 실행

로컬 주소는 항상 `http://localhost:3000`을 사용한다.

AI에게 실행을 요청할 때는 3000번 포트로만 실행하게 한다. 3000번 포트가 사용 중이면 다른 포트로 우회 실행하지 않고 기존 dev server를 종료한 뒤 다시 실행한다.

Windows에서 Node.js 또는 npm을 찾지 못하면 Node.js LTS 설치가 필요하다. 설치 후 Codex와 PowerShell을 완전히 다시 열어야 한다.

Windows에서는 `start-windows.cmd`를 먼저 실행한다. 이 파일은 Node/npm 확인, 설치 안내, 3000번 포트 정리, 의존성 설치, 로컬 실행을 순서대로 진행한다.

## 결과 반영

팀원이 sandbox에서 화면과 기능을 확인한 뒤 개발자에게 전달한다.

권장:

- 변경 파일 목록과 작업 요약 전달
- 화면 캡처 전달
- sandbox 폴더 또는 정리된 sandbox zip 전달
- `HANDOFF_TO_DEVELOPER.md` 양식 사용

비추천:

- 팀원이 FTP로 서버에 직접 업로드
- 팀원이 GitLab에 직접 push
- 팀원이 운영 서버에 직접 접속

개발자는 전달받은 결과를 검토한 뒤 GitLab, 서버, 배포 환경에 반영한다.

## 전달 ZIP 포함 금지

팀원이 sandbox를 ZIP으로 전달할 때 아래 파일과 폴더는 포함하지 않는다.

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

`.gitignore`는 Git에만 적용된다. 폴더를 직접 압축하면 위 파일들이 들어갈 수 있으므로 전달 전 반드시 확인한다.

## 개발 도메인 반영 방식

개발 도메인 반영은 팀원이 직접 하지 않는다.

권장 1단계 방식:

```text
팀원이 sandbox zip 또는 폴더 전달
개발자가 압축 해제
개발자가 변경 파일/빌드/보안 확인
개발자가 GitLab 또는 서버에 반영
```

반복 작업이 많아지면 업로드 포털을 만들 수 있다.

```text
팀원이 웹페이지에 zip 업로드
서버가 안전한 임시 공간에 압축 해제
자동 검사 실행
성공 시 preview 도메인에 배포
실패 시 오류 리포트 표시
개발자는 최종 반영 여부 검토
```

업로드 포털을 만들 때 최소 기준:

- 인증된 팀원만 업로드 가능
- 파일 크기와 파일 개수 제한
- zip entry 경로 검증
- symlink, nested zip 거부
- 격리된 임시 디렉터리에만 압축 해제
- production secret 없는 빌드 환경 사용
- preview 자동 만료/삭제
- 업로드 작업자, 시간, 파일 hash 기록
- 개발자 승인 전 운영 반영 금지

초기에는 팀원이 3명이고 서비스 수가 적은 동안 개발자 수동 검토가 더 안전하다.
