# Optional BFF And Local DB Example

이 폴더는 참고용 예시입니다. 기본 앱에 자동으로 적용하지 않습니다.

필요한 경우:

- 화면 저장/조회가 필요할 때만 BFF를 만듭니다.
- 로컬 저장 데이터가 필요할 때만 Prisma + SQLite를 사용합니다.
- 인증, 권한, 결제, 개인정보, 주문 상태 변경은 개발자 확인 전까지 구현하지 않습니다.

사용 방식:

1. 개발자 확인이 필요한 영역인지 먼저 판단합니다.
2. 필요한 파일만 실제 위치로 복사합니다.
3. 서비스에 맞게 이름, 모델, 필드를 수정합니다.
4. `docs/API_CONTRACT.md`에 없는 공통 API 연동은 mock으로 둡니다.

예시 파일:

- `route.ts.example`: Next.js Route Handler 예시
- `prisma.ts.example`: Prisma Client 싱글턴 예시
- `schema.prisma.example`: SQLite schema 예시
