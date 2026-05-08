## 📂 프로젝트 구조 (Project Structure)

본 프로젝트는 기존 서비스(`vibekorea`)의 구조적 규칙을 계승하며, `npm/pnpm workspaces`를 통해 앱과 서버를 통합 관리합니다.

```text
vibe-trail/ (Root)
├── apps/
│   ├── admin/              # 웹 기반 운영자 관리 도구
│   └── mobile/             # 모바일 앱 모음
│       └── vibe-trail/     # Expo (React Native) 클라이언트 (이번 프로젝트)
│           ├── assets/     # 이미지 및 폰트 리소스
│           └── src/
│               ├── api/    # Railway 서버 통신 로직
│               ├── hooks/  # GPS 및 센서 제어 커스텀 훅
│               └── components/ # 지도 및 네비게이션 UI
│
├── server/                 # Node.js (Express) 백엔드 서버
│   ├── src/
│   │   ├── controllers/    # GPX 최적화 및 Gemini 분석 로직
│   │   ├── services/       # Supabase 및 AI API 연동
│   │   └── utils/          # Douglas-Peucker 알고리즘 등
│   └── package.json
│
├── packages/
│   └── shared/             # 공용 모듈 및 타입 정의
│       ├── types/          # 서버-앱 공용 TypeScript 인터페이스
│       └── utils/          # 공통 데이터 파싱 로직
│
├── package.json            # 모노레포 워크스페이스 설정
└── PLAN.md                 # 프로젝트 로드맵 및 기술 스택

# 🏃‍♂️ Vibe Trail (AI 기반 트레일러닝 가이드)

트레일러닝 입문자와 숙련자를 위한 **'지능형 GPX 경로 안내 및 코스 분석 서비스'**입니다. AI(Gemini)를 활용해 단순한 좌표 나열인 GPX를 똑똑한 내비게이션 데이터로 변환합니다.

## 🎯 프로젝트 목적
- **안전한 러닝:** 복잡한 산길 갈림길에서 시각적 확인 없이 음성만으로 정확한 경로 안내 제공.
- **데이터 고도화:** 기존 GPX 파일에 결여된 '갈림길', '위험 구간', '보급소' 정보를 AI로 자동 생성.
- **테스트 효율화:** 직접 산에 가지 않아도 가상 시뮬레이션을 통해 코스 가이드를 사전 검증.

## 🛠 주요 기능 (Features)

### 1. Smart GPX Optimizer (Server-side)
- **Path Simplification:** Douglas-Peucker 알고리즘으로 GPX 포인트를 최적화하여 연산 효율 극대화.
- **AI Semantic Analysis:** Gemini Pro/Vision을 사용하여 코스의 주요 지점(갈림길, 급경사 등)을 분석.
- **Enhanced GPX Export:** 분석된 가이드를 웨이포인트(WPT) 태그로 포함시킨 '지능형 GPX' 생성.

### 2. Intelligent Navigation (App-side)
- **Voice Guide (TTS):** 특정 지점 접근 시 "좌측 샛길 진입" 등 상세 음성 안내 트리거.
- **Real-time Monitoring:** 사용자의 실시간 GPS와 최적화된 경로 간의 거리 및 이탈 여부 감시.
- **Simulation Mode:** 사무실에서도 경로 안내 로직을 테스트할 수 있는 가상 위치 주행 기능.

## 🏗 기술 스택 및 아키텍처 (Tech Stack)

### Infrastructure & DevOps
- **Monorepo:** npm/pnpm Workspaces 및 **Turborepo**를 도입한 통합 빌드 시스템 구성 (캐싱 및 스크립트 실행 최적화)
- **Shared Types:** `packages/shared/types`를 활용하여 모바일 앱과 서버 간의 API 응답 및 GPX 데이터 구조 등 TypeScript 인터페이스를 100% 일치시켜 타입 안정성 확보
- **Deployment:** **Railway** (Node.js 서버 호스팅)
- **Database:** **Supabase** (PostgreSQL + **PostGIS** 확장 사용)
    - *PostGIS를 통해 반경 내 지점 검색 등 위치 기반 쿼리 최적화*

### Backend (apps/server)
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express
- **AI Engine:** Google Gemini API (Multimodal)
- **Auth Bridge:** Firebase Admin SDK (사용자 인증 검증)

### Frontend (apps/app)
- **Framework:** React Native (Expo)
- **Auth:** **Firebase Authentication** (Google/Apple Social Login)
- **Map:** React Native Maps (GPX 시각화 및 시뮬레이션)

## 🔄 데이터 흐름 (Data Flow)
1. **Auth:** 사용자가 **Firebase**로 로그인 후 토큰 획득.
2. **Upload:** 사용자가 GPX 파일을 업로드하면 **Railway** 서버로 전달.
3. **Analyze:** 서버에서 알고리즘 최적화 후 **Gemini**가 갈림길 주석 생성.
4. **Store:** 최적화된 경로와 주석 데이터를 **Supabase(PostGIS)**에 저장.
5. **Guide:** 앱에서 실시간 GPS를 바탕으로 DB의 안내 지점을 호출하여 **TTS** 안내 실행.

## 💡 구현 시 고려 및 보완 사항 (Risks & Mitigations)

### 1. AI 분석 비동기 처리 (Asynchronous Processing)
- **이슈:** GPX 최적화 후 Gemini API를 호출하여 결과를 받기까지 수 초~수십 초가 소요될 수 있습니다.
- **해결책:** 클라이언트가 업로드 시 응답을 계속 대기(동기)하게 하지 않고, '처리 중' 상태를 반환합니다. 처리가 완료되면 푸시 알림(FCM)을 보내거나 클라이언트 측에서 상태를 폴링(Polling)하여 받아오도록 비동기 아키텍처를 구성합니다.

### 2. 산악 지형의 GPS 오차 보정 (GPS Bouncing)
- **이슈:** 산속에서는 GPS 신호가 순간적으로 수십 미터씩 튀는 현상이 발생하여, "경로 이탈" 오작동이나 잘못된 TTS 안내를 유발할 수 있습니다.
- **해결책:** 단순 직선거리 측정 외에 오차 허용 반경(예: 30m)을 두거나, 튀는 값을 무시하는 간단한 보정 로직(예: 칼만 필터 등)을 클라이언트의 GPS 제어 훅(`hooks`)에 추가합니다.

### 3. 산악 환경 오프라인 모드 대비 (Off-grid Navigation)
- **이슈:** 트레일러닝 특성상 통신(LTE/5G)이 불가능한 음영 지역에 진입하는 경우가 잦습니다. 
- **해결책:** 매번 가이드를 위해 서버와 실시간으로 통신하는 대신, 러닝 시작 전에 해당 코스의 **'지능형 GPX 데이터(웨이포인트 및 TTS 주석 포함)' 전체를 모바일 기기 내부 스토리지(AsyncStorage 또는 SQLite)에 미리 다운로드**해둡니다. 산속에서는 네트워크 연결 없이 GPS 센서와 로컬 데이터만으로 완벽한 내비게이션 가이드가 가능하도록 오프라인 퍼스트(Offline-First)로 설계합니다.