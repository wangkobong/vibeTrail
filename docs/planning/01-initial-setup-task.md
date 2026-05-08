# 프로젝트 초기 세팅 태스크 (Initial Setup Tasks)

본 문서는 Vibe Trail 프로젝트의 초기 모노레포 아키텍처 및 클라이언트/서버 기본 환경 구성을 위한 체크리스트입니다.

## 1. Monorepo 및 Turborepo 설정
- [x] 루트 `package.json`에 워크스페이스(workspaces) 영역 설정 (`apps/*`, `packages/*`, `server`)
- [x] 전역(Root) 개발 의존성으로 Turborepo(`turbo`) 및 TypeScript 설치
- [x] 루트에 `turbo.json` 파이프라인 파일 생성 (`build`, `lint`, `dev` 등 캐싱 규칙 정의)
- [x] 패키지 매니저(npm/pnpm)에 맞춘 환경 설정 파일 구성

## 2. 기본 폴더 구조 스캐폴딩
- [x] `apps/admin` (어드민용), `apps/mobile` (앱용) 디렉토리 생성
- [x] `packages/shared` 디렉토리 생성 및 하위에 `types`, `utils` 폴더 구성
- [x] `packages/shared` 내에 공통으로 쓰일 기본 `package.json` 및 `tsconfig.json` 설정

## 3. Expo (React Native) 클라이언트 세팅
- [x] `apps/mobile/vibe-trail` 경로에 Expo 프로젝트 뼈대 생성 (`npx create-expo-app`)
- [x] 생성된 Expo 프로젝트가 모노레포 워크스페이스의 일부로 정상 인식되는지 확인
- [x] Expo 내 기본 구조 셋업 (`src/api`, `src/hooks`, `src/components`, `assets`)

## 4. Node.js (Express) 서버 세팅
- [x] `server/` 폴더 내에 `package.json` 초기화 및 워크스페이스 이름 지정
- [x] TypeScript, Express, `ts-node-dev` 등 서버 구동에 필요한 기본 패키지 설치
- [x] 서버 전용 `tsconfig.json` 세팅
- [x] 서버 폴더 뼈대 구성 (`src/controllers`, `src/services`, `src/utils`)
- [x] `src/index.ts`를 생성하고 정상 작동을 확인하는 Health Check 엔드포인트 작성

## 5. 공통 모듈 (Shared) 연동 및 구동 테스트
- [x] `packages/shared`에 모바일과 서버가 공통으로 쓸 샘플 인터페이스(Type) 작성
- [x] 모바일 앱과 서버 각각에서 공용 타입을 `import` 할 수 있도록 경로 세팅 (Path Aliases 등)
- [x] 루트 디렉토리에서 `turbo run dev` 명령어를 통해 앱과 서버가 동시에 구동되는지 테스트 및 검증
