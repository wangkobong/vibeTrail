---
trigger: always_on
---

# Tech Stack Settings

프로젝트 전체 기술 스택의 마스터 문서입니다. 각 레이어별 규칙은 개별 rules 파일을 참조하세요.

## Monorepo
- **Build System:** Turborepo
- **Package Manager:** npm (workspaces)
- **Language:** TypeScript (Strict Mode)

## Client (Mobile)
- **Framework:** Expo (React Native) — Managed Workflow
- **Styling:** Nativewind (Tailwind CSS for React Native)
- **State Management:** Zustand
- **Navigation:** Expo Router (File-based Routing)
- **Data Fetching:** React Query (권장)
- **Icons:** @expo/vector-icons

## Server
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL + PostGIS)
- **Auth:** Firebase Admin SDK
- **AI Engine:** Google Gemini API (Vertex AI)

## Shared (`packages/shared/`)
- 서버·클라이언트 공유 타입 정의 및 공통 유틸리티

## Deployment
- **Server:** Railway
- **Mobile:** EAS Build (예정)

## Offline & Storage
- GPX 및 가이드 데이터의 로컬 캐싱 (MMKV 또는 AsyncStorage 활용 예정)