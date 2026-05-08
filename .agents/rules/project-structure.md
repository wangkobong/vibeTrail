---
trigger: always_on
---

# Project Directory Rules

Turborepo 기반 모노레포 구조를 정의합니다. 모든 코드는 이 구조를 준수합니다.

## Structure
- **Root:** `vibe-trail/` — Turborepo 기반 모노레포 루트 (빌드·린트·타입체크 오케스트레이션)
- **Server:** `vibe-trail/server/` — Express.js 백엔드 API (Railway 배포)
- **Admin:** `vibe-trail/apps/admin/` — 관리자 웹 대시보드 (TODO: 기술 스택 정의 필요)
- **Mobile:** `vibe-trail/apps/mobile/vibe-trail/` — Expo 모바일 클라이언트
- **Shared:** `vibe-trail/packages/shared/` — 서버·클라이언트 공유 타입 및 유틸리티

## Cross-Reference Rules
- 패키지 간 참조는 루트 `package.json`의 workspaces 설정을 활용합니다.
- shared 패키지의 타입·유틸은 `@vibe-trail/shared`로 import합니다.
- 서버와 클라이언트가 공유하는 인터페이스(API 응답 타입 등)는 반드시 `packages/shared/`에 정의합니다.
- 각 앱·서버는 자체 `tsconfig.json`을 보유하되, 루트 설정을 extends합니다.