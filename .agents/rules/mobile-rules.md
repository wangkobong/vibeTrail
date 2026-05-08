---
trigger: always_on
---

# Mobile Development Rules (Expo / React Native)

이 문서는 `apps/mobile/vibe-trail` 프로젝트의 클라이언트 개발 원칙을 정의합니다. 모든 AI 어시스턴트와 개발자는 이 규칙을 준수해야 합니다.
전체 기술 스택은 `tech-stack.md`를 참조하세요.

## 📂 Directory Structure Convention
모든 소스 코드는 아래 구조를 따릅니다.
- `app/`: Expo Router 파일 기반 라우팅 (스크린 정의)
- `src/api/`: Axios 인스턴스 및 Railway 서버 통신 로직 (React Query 사용 권장)
- `src/components/`: 재사용 가능한 UI 컴포넌트 (Atomic Design 지향)
- `src/hooks/`: **커스텀 훅 중심의 로직 분리** (GPS 추적, 센서 데이터 등)
- `src/store/`: Zustand를 이용한 전역 상태 관리
- `src/utils/`: 거리 계산, 날짜 포맷 등 순수 함수
- `src/constants/`: 색상 코드, API Endpoint 등 상수
- `src/types/`: 클라이언트 전용 타입 정의

## 📏 Coding Standards
1. **Component Pattern:**
   - 모든 컴포넌트는 함수형 컴포넌트(`const`)와 화살표 함수를 사용합니다.
   - UI와 비즈니스 로직을 분리하기 위해 복잡한 로직은 반드시 `hooks/`로 추출합니다.
2. **Styling (Nativewind):**
   - 인라인 스타일 대신 `className` 속성을 우선적으로 사용합니다.
   - 복잡한 조건부 스타일링은 `clsx` 또는 `nativewind`의 유틸리티를 활용합니다.
3. **State Management (Zustand):**
   - 전역 상태는 최소화하며, GPX 경로 데이터, 사용자 위치 정보, 인증 상태 등에만 사용합니다.
   - Store 파일은 `use` 접두사를 붙여 명명합니다 (예: `useGpxStore.ts`).
4. **Data Fetching (React Query):**
   - 서버 상태(API 응답)는 React Query로 관리하고, 클라이언트 상태(UI)는 Zustand로 관리합니다.
   - 캐싱·리페치·에러 핸들링은 React Query에 위임합니다.
5. **Custom Hooks:**
   - 위치 추적(`useLocation`), TTS(`useVoice`), 시뮬레이션 로직 등은 독립된 훅으로 관리하여 재사용성을 높입니다.

## 📍 Special Rules for Vibe Trail
- **GPS Logic:** 위치 정보 권한 요청 및 실시간 좌표 갱신 로직은 `src/hooks/useLocation.ts`에 집중시킵니다.
- **Performance:** GPX 경로 시각화 시 점(Point)이 너무 많으면 성능이 저하되므로, 렌더링 시에는 `shared/utils`의 최적화 로직을 거친 데이터를 사용합니다.
- **Offline Cache:** 트레일러닝 특성상 오프라인 상태를 고려하여, 한 번 불러온 GPX와 가이드는 로컬에 캐싱합니다. (MMKV 또는 AsyncStorage 활용)

## 🎨 UI Rendering Pattern
1. **Sectional Rendering:**
   - 메인 `return` 구문은 전체적인 구조(Layout)만 한눈에 파악할 수 있도록 작성합니다.
   - 각 UI 블록은 스크린 파일 내부에서 `renderTopSection`, `renderBalanceInfo`와 같은 별도의 렌더링 함수나 별도 컴포넌트로 분리합니다.
   - **예시:**
     ```tsx
     return (
       <ScreenWrapper>
         <ScrollView>
           {renderHeaderSection()}
           {renderMapSection()}
           {renderInfoSection()}
         </ScrollView>
         <BottomButton />
       </ScreenWrapper>
     )
     ```
2. **Atomic Components:**
   - 3번 이상 재사용되거나 로직이 복잡한 섹션은 `src/components/`로 추출하여 독립된 파일로 관리합니다.

## 🤖 AI Interaction Guide
- 새로운 화면을 만들 때는 먼저 `app/` 디렉토리의 Expo Router 라우팅 구조를 확인하고, 필요한 컴포넌트를 `src/components/`에 생성하라.
- API 연동이 필요한 경우 `src/api/`에 정의된 베이스 인스턴스를 활용하라.
- 새로운 전역 상태가 필요하면 React Query(서버 상태)와 Zustand(클라이언트 상태) 중 적합한 것을 선택하라.