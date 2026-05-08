---
trigger: always_on
---

# Server Development Rules (Node.js / Express)

이 문서는 `server/` 프로젝트의 백엔드 개발 원칙을 정의합니다. 데이터의 정확성과 AI 연산 효율성을 최우선으로 합니다.
전체 기술 스택은 `tech-stack.md`를 참조하세요.

## 📂 Directory Structure Convention
`server/src/` 내부 구조를 엄격히 준수합니다.
- `config/`: Supabase, Firebase Admin SDK 등 외부 서비스 초기화
- `controllers/`: HTTP 요청 핸들링 및 응답 전송 (비즈니스 로직의 진입점)
- `services/`: 핵심 비즈니스 로직 (GPX 분석, Gemini API 호출, DB 쿼리)
- `middleware/`: Firebase 토큰 검증, 에러 핸들러, 로깅
- `utils/`: **GPX 최적화 알고리즘 (Douglas-Peucker)**, 수학적 계산 함수
- `types/`: TypeScript 인터페이스 (서버·클라이언트 공유 타입은 `packages/shared/` 활용)
- `routes/`: API 경로 정의

## 📏 Coding Standards
1. **Response Format:** 모든 응답은 일관된 형태를 유지합니다.
   - 성공: `{ "success": true, "data": { ... } }`
   - 실패: `{ "success": false, "error": "Error Message", "code": 400 }`
2. **Layered Architecture:**
   - DB에 직접 접근하는 로직은 반드시 `services/`에서만 수행합니다.
   - Controller는 Service를 호출하고 결과만 리턴하는 얇은 계층(Thin Controller)을 유지합니다.
3. **GPX Data Handling:**
   - 대용량 GPX 파일 처리 시 메모리 부족을 방지하기 위해 스트림(Stream) 또는 최적화 후 가공 방식을 채택합니다.
   - 모든 좌표 연산은 정확도를 위해 `number` 타입을 유지하며, 필요한 경우 `decimal.js`를 사용합니다.

## 🔐 Environment Variables
- 모든 시크릿은 `.env` 파일로 관리하며 **절대 커밋하지 않습니다.**
- 필수 환경변수: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `FIREBASE_*` 관련 키
- 환경변수 접근은 `config/` 내 초기화 파일에서 일괄 검증합니다.

## 🚨 Error Handling
- 커스텀 에러 클래스(`AppError`)를 사용하여 HTTP 상태 코드와 에러 메시지를 표준화합니다.
- 전역 에러 핸들러 미들웨어에서 모든 예외를 캐치하여 일관된 응답 포맷을 보장합니다.
- 예상 가능한 에러(400, 401, 404)와 서버 에러(500)를 명확히 구분합니다.

## 📍 Special Rules for Vibe Trail
1. **PostGIS First:** 거리 계산, 반경 내 검색 등 공간 연산은 서버 로직보다 DB(Supabase PostGIS) 함수 사용을 우선합니다.
2. **AI Prompt Management:**
   - Gemini에 던지는 프롬프트는 `src/services/prompts.ts`에 상수로 관리하여 버전 관리를 용이하게 합니다.
   - 토큰 소모를 줄이기 위해 GPX 데이터를 다이어트(Simplify)한 후 AI에게 전달합니다.
3. **Security:** 모든 API는 Firebase Auth 미들웨어를 거쳐야 하며, 요청 헤더의 `Authorization: Bearer <Token>`을 검증합니다.

## 🤖 AI Interaction Guide
- 새로운 엔드포인트를 만들 때 `routes` → `controller` → `service` 순서로 뼈대를 먼저 제안하라.
- GPX 처리 알고리즘 작성 시 가독성보다 연산 속도와 메모리 효율을 우선하여 코드를 짜라.
- 에러 응답은 반드시 위 Response Format의 실패 형식을 따르라.