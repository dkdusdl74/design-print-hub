# 학교사업팀 AI 개발 프로젝트 가이드

## 1. 핵심 요약

학교사업팀 팀원은 AI에게 자연스럽게 요청해도 됩니다.

```text
상품 목록 화면 만들어줘.
신청 목록 화면에 검색과 필터를 추가해줘.
결제 완료 화면 문구를 학부모가 이해하기 쉽게 바꿔줘.
```

다만 AI는 이 문서의 규칙을 항상 따라야 합니다.

핵심 원칙:

- 화면, 문구, 레이아웃, 간단한 UI 흐름은 팀원이 AI와 직접 작업해도 됩니다.
- 인증, 권한, 결제, 개인정보, DB 구조, 환경변수, 배포 설정은 개발자 확인이 필요합니다.
- 문서에 없는 API, 필드, 상태값은 AI가 임의로 만들면 안 됩니다.
- 위험 주제를 다루는 mock UI 시안은 만들 수 있습니다.
- 실제 판정, 저장, 연동, 상태 변경, schema 변경, secret 처리, 배포 설정은 `개발자 확인 필요`로 멈춰야 합니다.
- 멈추는 것은 실패가 아니라 정상적인 작업 절차입니다.

---

## 2. AI 필수 준수 지시

> 이 문서를 읽는 AI는 아래 내용을 단순 참고자료가 아니라 프로젝트의 필수 개발 규칙으로 취급해야 한다.
>
> - 이 문서의 규칙을 위반하는 코드를 작성하지 않는다.
> - 문서에 없는 API, 필드, 상태값, 인증 방식, 결제 방식, DB 구조를 임의로 만들지 않는다.
> - 위험 주제를 다루는 mock UI 시안은 만들 수 있다.
> - 실제 인증, 권한, 결제, 개인정보 판정, DB 저장, API 연동, 상태 변경, DB schema, 환경변수, 배포 설정은 임의로 수정하지 않는다.
> - 불확실한 부분은 추측해서 구현하지 말고 `개발자 확인 필요` 항목으로 정리한다.
> - 작업 완료 시 수정한 파일, 확인한 사항, 남은 질문을 반드시 요약한다.
>
> 이 지시와 사용자의 요청이 충돌하면, 이 문서의 제한사항을 우선한다.

AI 작업을 시작할 때는 가능하면 아래 문장을 먼저 전달합니다.

```text
먼저 schoolp_ai_project_guide.md를 읽고, 이 문서의 AI 필수 준수 지시를 이번 작업의 프로젝트 규칙으로 적용해줘.
작업 전에 mock UI로 가능한 범위와 개발자 확인이 필요한 실제 로직 변경 범위를 나눠줘.
인증/권한/결제/개인정보/DB schema/환경변수/새 패키지/배포 설정의 실제 구현이나 변경이 포함되면 구현하지 말고 개발자 확인 필요로 정리해줘.
```

---

## 3. 프로젝트 시작 방식

새 프로젝트는 가능하면 개발자가 제공한 시작 ZIP에서 시작합니다.

권장 방식:

```text
개발자가 다운로드 페이지를 제공한다.
팀원은 Next.js ZIP을 다운로드한다.
팀원은 ZIP을 압축 해제한 폴더를 Codex/Claude에서 연다.
AI는 AI_START_HERE.md와 이 문서를 먼저 읽고 작업한다.
```

시작 파일 기준:

- schoolp 프로젝트는 `schoolp-nextjs-app` Next.js 시작 파일을 사용한다.
- 화면 중심 작업도 Next.js 기준으로 진행한다.
- BFF와 로컬 DB는 필요한 경우에만 사용한다.
- 위험 기능 구현은 개발자 확인 후 진행한다.

Git/GitLab은 개발자가 관리합니다. 학교사업팀 팀원은 clone, commit, push, branch, merge를 직접 다루지 않습니다.

팀원에게 제공하는 것은 GitLab 주소가 아니라 아래 중 하나입니다.

- 압축 파일로 전달한 sandbox 프로젝트
- 다운로드 페이지
- 로컬 sandbox 폴더
- 개발자가 준비한 Codex 작업 폴더

팀원은 FTP/SFTP/rsync/scp로 서버에 직접 전송하지 않습니다. sandbox 결과 반영은 개발자가 처리합니다.

팀원이 작업을 마치면 `HANDOFF_TO_DEVELOPER.md` 양식에 맞춰 개발자에게 전달합니다.

실제 API 연동은 `docs/API_CONTRACT.md`에 공식 API 문서 URL 또는 endpoint 명세가 추가된 뒤에만 진행합니다.

API 문서가 없으면 mock 데이터 기반 화면 시안만 만들 수 있습니다.

---

## 4. 이미 진행 중인 프로젝트

이미 팀원이 개인적으로 진행한 프로젝트도 schoolp 표준 구조로 전환할 수 있습니다.

전환 결과물 안에 보존용 `legacy`, `backup`, `old` 폴더를 임의로 만들지 않습니다.

권장 순서:

```text
1. 현재 프로젝트 폴더를 Codex/Claude에서 연다.
2. schoolp 시작 안내 페이지의 기존 전환 요청 문구를 AI에게 전달한다.
3. AI는 Next.js 시작 파일을 기준으로 표준 구조를 만든다.
4. 기존 화면, 스타일, 카피, 프론트 상호작용을 원본 수준으로 이식한다.
5. 최종 결과물에는 실행에 필요한 파일과 정리된 문서만 남긴다.
```

바로 고쳐야 하는 것:

- secret이 코드에 들어간 경우
- `.env.local`, SQLite DB 파일이 포함된 경우
- 결제/권한/주문 상태를 프론트나 로컬 DB에서 최종 판단하는 경우
- API 문서 없이 임의 endpoint/field를 만든 경우
- 빌드가 실패하는 상태

기존 프로젝트 전환은 리디자인이 아니라 구조 이식 작업이다. 기본 화면은 원본 메인 화면과 동일해야 하며, 원본에 없던 UI는 실제 앱 화면에 추가하지 않는다.

전환 결과물에서 제거하거나 남기지 않는 것:

- 중복 원본 HTML/MD 파일
- 보존용 `legacy`, `backup`, `old` 폴더
- 다운로드한 시작 ZIP 파일
- 압축 해제 후 남은 중첩 시작 폴더
- `node_modules`, `.next`, `dist`, `.vite`, `coverage`
- `.env`, `.env.local`, SQLite DB 파일

나중에 천천히 맞춰도 되는 것:

- HTML을 React 컴포넌트로 세분화하는 작업
- 컴포넌트 이름 정리
- mock 데이터 정리
- 반복 코드 정리
- 실제 API 연동

---

## 5. 기본 스택

표준 시작 파일은 Next.js 하나입니다.

Next.js 시작 파일:

```text
Folder: schoolp-nextjs-app
Framework: Next.js App Router
Language: TypeScript
UI: Tailwind CSS + shadcn/ui style components
Optional BFF: Next.js Route Handler
Optional local DB: Prisma + SQLite
Use case: 화면 중심 앱, 정적 목업 이식, 공통 API 연동 화면, 필요 시 BFF와 로컬 DB
```

단순 화면만 필요한 경우에도 같은 Next.js 시작 파일을 사용하되, Route Handler, Prisma, SQLite는 건드리지 않습니다.

기본 템플릿에는 활성 BFF/API/DB가 없습니다. 필요할 때만 `examples/optional-bff-db`의 참고 예시를 실제 위치로 옮겨 서비스에 맞게 수정합니다.

---

## 6. 로컬 개발 환경

학교사업팀 팀원의 로컬 개발에서는 Docker를 기본 사용하지 않습니다.

학교사업팀 팀원의 로컬 개발에서는 Git도 기본 사용하지 않습니다.

로컬 개발은 아래 조합을 기준으로 단순하게 유지합니다.

```text
Node.js 20 이상
npm 또는 프로젝트에서 정한 package manager
시작 파일별 dev server
.env 또는 .env.local
```

시작 ZIP에는 검증된 lockfile을 포함합니다. 팀원은 기본적으로 `npm install`을 사용하고, package manager를 임의로 바꾸지 않습니다.

로컬 실행 주소는 항상 `http://localhost:3000`을 사용합니다.

3000번 포트가 사용 중이면 다른 포트로 우회 실행하지 않습니다. 기존 dev server를 종료한 뒤 다시 실행합니다.

Windows에서 Node.js 또는 npm을 찾지 못하면 Node.js LTS 설치가 필요합니다. 설치 후 Codex와 PowerShell을 완전히 다시 열어야 합니다.

Windows에서는 `start-windows.cmd`를 먼저 실행합니다. 이 파일은 Node/npm 확인, 설치 안내, 3000번 포트 정리, 의존성 설치, 로컬 실행을 순서대로 진행합니다.

Docker는 서버 배포, 샌드박스, 운영에 가까운 환경에서 개발자가 관리합니다.

Git, GitLab, branch, commit, push, merge도 개발자가 관리합니다.

FTP, SFTP, rsync, scp 등 파일 전송과 서버 반영도 개발자가 관리합니다.

팀원 AI 작업 범위에서는 아래 파일을 생성하거나 수정하지 않습니다.

- `Dockerfile`
- `docker-compose.yml`
- nginx 설정
- GitLab CI/CD 설정
- 서버 배포 스크립트
- `.git` 설정
- git remote 설정

기본 실행 흐름은 각 시작 파일의 `README.md`를 우선합니다.

Next.js 시작 파일:

```bash
npm install
cp .env.example .env.local
npm run dev
npm run build
```

로컬 DB가 필요한 경우에만:

```bash
mkdir -p prisma
cp examples/optional-bff-db/schema.prisma.example prisma/schema.prisma
npm run prisma:generate
npm run db:setup
```

프로젝트에 lint 명령이 있으면 함께 실행합니다.

```bash
npm run lint
```

---

## 7. 작업 가능 범위

학교사업팀 팀원이 AI와 함께 직접 진행해도 되는 작업입니다.

- 새 화면 추가
- 기존 화면 문구 수정
- 버튼, 카드, 테이블, 폼 UI 구성
- 레이아웃, 간격, 색상 조정
- 목록/상세/등록/수정 화면 구성
- mock 데이터 기반 프로토타입 제작
- 로딩 상태, 빈 데이터 상태, 에러 상태 추가
- 간단한 안내 문구 개선

mock 데이터 기반 프로토타입은 허용됩니다. 단, 실제 연동 전에는 mock임을 명확히 표시합니다.

예:

```text
mockProducts
mockApplications
prototypeOnly
TODO: replace with documented API
```

---

## 8. 개발자 확인이 필요한 작업

아래 작업은 AI가 가능하다고 해도 바로 적용하지 말고 개발자에게 확인합니다.

- 로그인, 회원가입, 세션 처리
- 권한 분기
- 권한/데이터 변경을 포함하는 관리자 기능
- 결제, 환불, 주문 상태 처리
- 개인정보 저장 또는 표시
- DB schema 변경
- Prisma migration 생성
- 새 외부 API 연동
- 파일 업로드/다운로드
- 새 패키지 설치
- 환경변수 추가
- 서버 설정 변경

mock 기반 관리자 화면 시안은 만들 수 있습니다. 단, 실제 권한 처리나 데이터 변경 로직은 개발자 확인이 필요합니다.

공통 API 문서가 없을 때는 실제 API 연동을 하지 않습니다. 이 경우 `mockApplications`, `mockProducts`처럼 명확히 표시한 mock 데이터 기반 화면만 만들 수 있습니다.

개발자 확인 요청 양식:

```text
개발자 확인 요청

작업하려는 내용:
AI가 멈추라고 한 이유:
관련 화면 또는 파일:
내가 원하는 결과:
급한 정도:
```

---

## 9. 절대 금지사항

다음은 금지합니다.

- API key, token, password, DB URL을 코드에 직접 작성
- `.env`, `.env.local`, SQLite DB 파일을 저장소에 포함
- 인증/권한 로직을 임의로 새로 구현
- 결제 성공/실패를 프론트엔드에서 임의 판단
- 사용자 역할, 결제 상태, 주문 상태를 자체 DB에서 최종 판단
- API 문서에 없는 필드나 endpoint를 AI가 추측해서 구현
- AI가 제안한 대규모 구조 변경을 그대로 적용
- 사용 이유가 불명확한 패키지 설치
- 에러를 숨기기 위해 화면 메시지만 제거

secret이 노출되었다고 의심되면 해당 값은 폐기하고 재발급해야 합니다.

---

## 10. 프로젝트 구조

프로젝트마다 구조가 달라지면 AI도 일관된 코드를 만들기 어렵습니다.

Next.js 시작 파일은 아래 구조를 권장합니다.

```text
src/
  app/
  components/
    ui/
    common/
  features/
    [feature-name]/
      components/
      hooks/
      types/
      utils/
  lib/
    api/
    utils/
  server/
    db/
    services/
  types/
  styles/

examples/
  optional-bff-db/

public/
```

권장 규칙:

- Next.js의 `src/app`은 라우팅과 페이지 조립을 담당합니다.
- `features`는 화면별 기능과 컴포넌트를 담당합니다.
- `components/ui`는 shadcn/ui 기반 공통 UI를 둡니다.
- API 호출 코드는 `lib/api`에 모읍니다.
- 서버 전용 코드는 Next.js 시작 파일에서만 `src/server`에 둡니다.
- DB 접근 코드는 `src/server/db` 또는 개발자가 정한 서버 전용 위치로 제한합니다.
- 같은 기능을 여러 곳에 복사하지 않습니다.

Server Component와 Client Component 기준:

- 기본은 Server Component로 둡니다.
- 클릭, 입력, 상태 관리, 브라우저 API가 필요한 컴포넌트만 Client Component로 만듭니다.
- `use client`를 불필요하게 넓은 범위에 붙이지 않습니다.

BFF/API route 기준:

- API route가 필요하면 `src/app/api/.../route.ts`를 사용합니다.
- route handler에서 사용하는 서버 전용 로직은 `src/server`에 둡니다.
- 별도 Express/Nest/Fastify 서버를 임의로 만들지 않습니다.
- 인증, 권한, 결제, 개인정보 처리 API는 개발자 확인 없이 만들지 않습니다.
- BFF가 필요하지 않으면 API route와 `src/server` 코드를 추가하지 않습니다.
- 기본 템플릿의 `examples/optional-bff-db`는 참고용이며, 실제 라우트가 아닙니다.

---

## 11. UI 개발 규칙

UI는 Tailwind CSS와 shadcn/ui를 우선 사용합니다.

기본 규칙:

- 직접 CSS를 많이 추가하지 않는다.
- 기존 컴포넌트 스타일을 먼저 확인한다.
- 버튼, 입력창, 테이블, 카드 등은 기존 UI 컴포넌트를 우선 사용한다.
- 새 색상, 폰트, 그림자, radius 값을 임의로 만들지 않는다.
- 폼에는 label, validation message, disabled/loading 상태를 포함한다.
- 로딩 상태, 빈 데이터 상태, 에러 상태를 만든다.
- 주요 화면은 모바일, 태블릿, 데스크톱 크기에서 확인한다.

권장 확인 폭:

```text
mobile: 360px
tablet: 768px
desktop: 1280px
```

---

## 12. 로컬 DB 사용 규칙

로컬 DB는 필요한 경우에만 SQLite를 사용합니다.

저장/조회/관리자 데이터가 없는 단순 화면, 정적 목업, API 연동 전 UI 시안은 DB를 만들지 않아도 됩니다.

SQLite는 로컬 개발과 프로토타입을 위한 DB입니다. 운영 DB의 축소판으로 간주하지 않습니다.

Prisma를 사용할 때는 다음 규칙을 지킵니다.

- DB 접근은 Prisma Client를 사용한다.
- 기존 `.env.example`을 `.env`로 복사하고 기존 migration을 실행하는 것은 허용된다.
- `prisma generate`와 기존 migration 적용은 로컬 초기화 작업으로 볼 수 있다.
- 앱 코드에서 raw SQL을 사용하지 않는다.
- `$queryRaw`, `$executeRaw`, `$queryRawUnsafe`, `$executeRawUnsafe`를 사용하지 않는다.
- 직접 sqlite 드라이버를 사용하지 않는다.
- DB 파일을 직접 수정하거나 삭제해서 문제를 해결하지 않는다.
- `prisma db push`, `prisma migrate reset`으로 schema 문제를 해결하지 않는다.
- schema 변경은 `prisma/schema.prisma`를 기준으로 한다.
- migration 없이 DB 구조를 바꾸지 않는다.
- schema 변경과 migration 생성은 개발자 확인 후에만 진행한다.
- `prisma/migrations/*/migration.sql` 수동 수정은 개발자만 한다.
- 날짜는 DateTime 기준으로 사용한다.
- ID는 가능하면 String cuid/uuid 계열을 사용한다.

금액 저장 규칙:

- 원화 금액은 기본적으로 정수 `amountWon`으로 저장한다.
- Float로 금액을 저장하지 않는다.
- 표시용 문자열 금액을 계산 기준으로 사용하지 않는다.

서비스 DB에 저장해도 되는 데이터:

- 서비스 고유 설정
- 화면 설정
- 임시 저장 데이터
- 서비스별 콘텐츠
- 사용자별 UI 상태
- 외부 API 또는 공통 시스템의 참조 ID

캐시성 데이터라도 아래 항목은 개발자 확인 없이 저장하지 않습니다.

- 개인정보
- 결제/주문/권한 판단에 쓰이는 값
- 외부 API 전체 응답
- 학생/학부모/학교 담당자 관련 실제 정보

서비스 DB에 최종값으로 저장하면 안 되는 데이터:

- 회원 원본 데이터
- 비밀번호 또는 인증 정보
- 권한/역할의 최종 판단값
- 상품 가격의 최종값
- 주문 최종 상태
- 결제 최종 상태
- 환불/취소/정산 상태

로그인, 권한, 결제, 주문, 관리자 기능, 장기 운영 가능성이 생기면 SQLite schema를 운영 DB로 그대로 승격하지 않습니다. 운영 DB 기준 schema, migration, index, constraint, seed, 백업/복구는 개발자가 다시 검토합니다.

---

## 13. 환경변수와 개인정보

환경별 설정값은 코드에 직접 쓰지 않습니다.

반드시 `.env.example`을 제공합니다.

예시:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_NAME="my-service"
VITE_PUBLIC_APP_NAME="my-service"
VITE_API_BASE_URL="http://localhost:3000"
```

금지:

- `.env` 커밋 또는 전달
- `.env.local` 커밋
- API key 하드코딩
- DB URL 하드코딩
- token을 화면 코드에 직접 삽입
- secret을 AI 프롬프트에 입력

허용:

- 기존 `.env.example`을 `.env` 또는 `.env.local`로 복사
- 비어 있는 공개 설정값을 로컬 표시용으로 채우기

개발자 확인 필요:

- 환경변수 key 추가
- 환경변수 이름 변경
- secret, token, private API key 입력
- 운영/개발 서버 URL 변경

브라우저 노출 환경변수 규칙:

- Next.js의 `NEXT_PUBLIC_`으로 시작하는 값은 브라우저에 노출될 수 있습니다.
- Vite의 `VITE_`로 시작하는 값은 브라우저에 노출될 수 있습니다.
- secret, token, private API key는 절대 `NEXT_PUBLIC_` 또는 `VITE_` 값에 넣으면 안 됩니다.
- 브라우저 노출 환경변수에는 공개되어도 되는 화면 표시용 설정만 넣습니다.

AI 프롬프트, mock 데이터, 로그, 화면 캡처에 실제 개인정보를 넣지 않습니다.

개인정보 예시:

- 학생 이름
- 학부모 이름
- 전화번호
- 이메일
- 학교명
- 학년/반
- 상담/문의 내용
- 결제 관련 정보
- 신청/수강/출석 정보

---

## 14. 패키지 추가 규칙

새 패키지는 가능하면 추가하지 않습니다.

AI가 새 패키지를 제안하면 먼저 아래를 확인합니다.

- 기존 코드나 기본 스택으로 해결할 수 없는가?
- 공식 SDK인가?
- 유지보수가 되고 있는가?
- 같은 기능의 패키지가 이미 있지 않은가?
- 보안이나 라이선스 문제가 없는가?
- 너무 무거운 패키지는 아닌가?

인증, 결제, 암호화, 파일 업로드, 보안 관련 패키지는 반드시 개발자 확인 후 추가합니다.

패키지 추가 확인 요청 양식:

```text
패키지 추가 확인 요청

패키지명:
필요한 이유:
대체 가능한 기존 기능:
공식 문서 URL:
보안/라이선스 우려:
설치 후 변경될 파일:
```

---

## 15. AI 요청 예시

아래 예시는 반드시 그대로 써야 하는 양식이 아닙니다.

AI가 요청을 잘못 이해하거나 작업 범위가 커질 때 참고하는 예시입니다.

새 화면을 만들 때:

```text
[화면명] 화면을 만들어줘.
기존 프로젝트 구조와 스타일을 따라줘.
Tailwind와 shadcn/ui를 우선 사용해줘.
관련 없는 리팩토링은 하지 마.
로딩, 빈 상태, 에러 상태도 함께 만들어줘.
완료 후 수정한 파일 목록과 확인할 내용을 알려줘.
```

기존 화면을 수정할 때:

```text
[페이지명] 화면을 수정해줘.
현재 문제는 [문제 설명]이야.
원하는 결과는 [원하는 결과]야.
수정 범위를 최소화하고, 기존 API 호출 방식과 권한 조건은 유지해줘.
관련 없는 리팩토링은 하지 마.
```

오류를 고칠 때:

```text
아래 오류를 고쳐줘.

내가 한 작업:
[무엇을 하다가 오류가 났는지]

오류 메시지:
[오류 메시지 전체]

기대 동작:
[원래 되어야 하는 동작]

오류 원인을 먼저 설명하고, 수정 범위를 최소화해줘.
```

검수 전 점검할 때:

```text
검수 요청 전에 이 작업을 점검해줘.

확인할 것:
- mock 데이터가 남아 있는지
- console.log 또는 debug 코드가 남아 있는지
- 로딩/빈 상태/에러 상태가 있는지
- 모바일 화면에서 깨질 가능성이 있는지
- secret이 코드에 들어가 있지 않은지
- 인증/권한/결제/개인정보/DB schema/환경변수 변경이 있는지

결과를 아래 중 하나로 정리해줘:
- 검수 요청 가능
- 수정 후 검수 요청
- 개발자 확인 필요
```

---

## 16. 완료 기준

작업 완료 전 최소한 아래를 확인합니다.

- 화면이 정상적으로 열린다.
- 주요 버튼과 입력 동작이 정상이다.
- 로딩 상태, 빈 데이터 상태, 에러 상태가 있다.
- 모바일 크기에서 화면이 깨지지 않는다.
- TypeScript 에러가 없다.
- secret이 코드에 없다.
- mock 데이터가 최종 연동 화면에 남아 있지 않다.
- 프로토타입 화면이라면 mock 데이터임이 명확히 표시되어 있다.

가능하면 아래 명령을 실행해 확인합니다.

```bash
npm run build
```

프로젝트에 lint 명령이 있으면 함께 실행합니다.

```bash
npm run lint
```

완료 보고 형식:

```text
수정한 파일:
실행한 명령:
확인한 화면/상태:
남은 mock 또는 가정:
개발자 확인 필요 항목:
```

빌드가 실패하면 완료로 보지 않습니다.

일반 TypeScript, import, CSS 오류는 AI가 수정 시도할 수 있습니다.

오류 원인이 인증, 권한, 결제, 개인정보, DB schema, 환경변수, 새 패키지, 배포 설정과 관련되거나 같은 오류가 2회 이상 반복되면 실패 로그를 요약하고 `개발자 확인 필요`로 멈춥니다.

---

## 17. 멈춰야 하는 상황

아래 상황에서는 계속 진행하지 말고 개발자에게 확인합니다.

- AI가 API 필드나 endpoint를 추측했다.
- 로그인, 권한, 결제, 개인정보 관련 코드가 바뀌었다.
- DB schema 또는 migration이 바뀌었다.
- 새 패키지가 추가되었다.
- 환경변수가 추가되었다.
- 빌드 실패 원인이 위험 영역과 관련되거나 같은 오류가 2회 이상 반복된다.
- 오류 원인을 모르겠는데 AI가 계속 다른 코드를 제안한다.
- 사용자 데이터 삭제 또는 상태 변경 기능이 필요하다.
- 코드 변경 범위가 예상보다 커졌다.

AI가 멈춰야 할 때는 아래 형식으로 답합니다.

```text
개발자 확인 필요

이 작업은 [이유]에 해당하므로 바로 구현하지 않겠습니다.

확인 질문:
1.
2.
3.
```

멈추는 것은 실패가 아닙니다. 사고를 줄이는 정상적인 작업 절차입니다.

---

## 18. 핵심 문장

이 프로젝트에서 AI가 만든 코드는 초안입니다.

인증, 권한, 결제, 개인정보, 데이터 소유권, DB 구조는 사람이 확인하기 전까지 확정된 구현으로 보지 않습니다.

문서에 없는 API, 필드, 상태값은 존재하지 않는 것으로 취급합니다.

공식 API 문서는 `docs/API_CONTRACT.md`에 연결된 문서만 인정합니다.

`docs/API_CONTRACT.md`가 비어 있거나 준비 전이면 실제 API 연동은 하지 않고 mock 화면만 만듭니다.

필요한 내용이 문서에 없다면, AI에게 만들게 하지 말고 질문 목록으로 정리합니다.
