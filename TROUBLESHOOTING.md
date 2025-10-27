# 🔧 DeepAI 400 에러 해결 가이드

## 📸 스크린샷 에러 분석

**에러:** `DeepAI API request failed` (400 Bad Request)

**원인:** DeepAI API 파라미터 또는 데이터 형식 문제

---

## ✅ 즉시 해결 방법

### Step 1: 수정된 파일 교체

**문제:** 기존 코드의 파라미터명 오류
- ❌ 잘못: `content` 파라미터
- ✅ 올바름: `image` 파라미터

**해결:**
```bash
# 새로운 api/deepai-nst.js 사용
# (이미 수정됨 - v2 버전)

주요 변경사항:
- form.append('content', ...) → form.append('image', ...)
- 더 나은 에러 로깅 추가
- 응답 파싱 개선
```

### Step 2: API 키 확인

**확인 사항:**
```
✓ API 키가 올바른지
✓ 전체 키 복사 (공백 없이)
✓ DeepAI 계정에 크레딧이 있는지
```

**API 키 받는 곳:**
```
https://deepai.org/dashboard/profile
→ API Keys 섹션
→ 전체 키 복사
```

### Step 3: 재배포

```bash
1. 새로운 api/deepai-nst.js 파일 업로드
2. GitHub commit & push
3. Vercel 자동 재배포 대기 (1-2분)
4. 다시 테스트
```

---

## 🧪 테스트 방법들

### 방법 1: 브라우저에서 직접 테스트

```
1. 사이트 접속
2. DeepAI 키 입력
3. 작은 사진으로 테스트 (500KB 이하)
4. F12 콘솔 확인
```

**성공 로그:**
```javascript
✅ 이렇게 나와야 함:

📡 DeepAI Response Status: 200
✅ DeepAI Success!
   ID: abc123...
   Output URL: https://...
```

### 방법 2: Vercel CLI로 로컬 테스트

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로컬 실행
cd your-project
vercel dev

# 3. 브라우저
http://localhost:3000

# 4. 로그 실시간 확인
```

### 방법 3: curl로 API 직접 테스트

```bash
curl -X POST https://api.deepai.org/api/neural-style \
  -H "api-key: YOUR_API_KEY" \
  -F "style=https://raw.githubusercontent.com/jeongwoo78/picoart-AUTO/main/artworks/vangogh/01_starry_night.jpg" \
  -F "image=https://picsum.photos/400"

# 200 OK + JSON 응답 → API 키 정상
# 400 Error → API 키 또는 형식 문제
```

---

## 🔍 상세 디버깅

### Vercel Function 로그 확인

```
1. https://vercel.com/dashboard 접속
2. 프로젝트 선택
3. Deployments → 최신 배포 클릭
4. Functions → api/deepai-nst 클릭
5. Logs 확인

예상 로그:
=== DeepAI NST API v2 Called ===
📸 Style Image URL: https://...
📸 Content Image type: data:image/jpeg;base64,...
🔑 API Key prefix: cdbc6030-c...
🎨 Calling DeepAI Neural Style Transfer...
📡 DeepAI Response Status: 200 (또는 400)
```

### 브라우저 Network 탭 확인

```
F12 → Network → api/deepai-nst 클릭

Request:
- Method: POST
- Payload: {styleImageUrl, contentImage, apiKey}

Response:
- Status: 400 (에러 발생)
- Body: {error: "...", details: "..."}
```

---

## 💡 대안 솔루션

### Option A: 간단한 URL 버전 사용

**더 안정적인 방법:**

```javascript
// api/deepai-simple.js 사용
// base64 대신 이미지 URL 전달

장점:
- FormData 문제 없음
- 더 빠른 처리
- 디버깅 쉬움

단점:
- 사용자 사진을 먼저 URL로 변환해야 함
```

**사용법:**
```javascript
// index.html 수정
// 1. 사용자 사진을 imgur 같은 곳에 업로드
// 2. URL 받아오기
// 3. deepai-simple.js 호출

const uploadedImageUrl = await uploadToImgur(image);
const res = await fetch('/api/deepai-simple', {
  body: JSON.stringify({
    styleImageUrl: '...',
    contentImageUrl: uploadedImageUrl,
    apiKey: '...'
  })
});
```

### Option B: Replicate로 대체 사용

**임시 해결책:**

```
DeepAI가 계속 400 에러 발생 시:
→ Replicate SDXL로 전환 (이미 작동 중)
→ 품질은 약간 낮지만 안정적
```

### Option C: 다른 NST API 사용

**대안 API들:**

```
1. Replicate Neural Style Transfer
   - 모델: cjwbw/neural-style-tf
   - 비용: $0.02/image
   - 품질: 좋음

2. Hugging Face Inference API
   - 모델: arbitrary-image-stylization
   - 비용: 무료 (제한적)
   - 속도: 느림

3. RunwayML
   - 품질: 최고
   - 비용: 비쌈 ($0.05/image)
```

---

## 📋 체크리스트

### 배포 전 확인

```
□ api/deepai-nst.js 파일 업데이트
□ package.json에 node-fetch, form-data 있음
□ vercel.json 설정 확인
□ GitHub에 모든 파일 push
```

### 배포 후 확인

```
□ Vercel 배포 성공 (초록 체크)
□ Function 로그에서 코드 실행 확인
□ 브라우저 콘솔 에러 없음
□ Network 탭에서 요청/응답 확인
```

### API 테스트

```
□ DeepAI 웹사이트에서 직접 테스트
   https://deepai.org/machine-learning-model/neural-style
   → 여기서 작동하면 API 키 정상

□ curl로 직접 API 호출 테스트

□ 작은 이미지로 먼저 테스트 (< 500KB)
```

---

## 🚨 여전히 400 에러 발생 시

### 최종 해결책들:

**1. API 키 재발급**
```
https://deepai.org/dashboard/profile
→ "Generate New API Key"
→ 새 키로 재시도
```

**2. 이미지 크기 줄이기**
```javascript
// index.html에서 maxSize 줄이기
const maxSize = 512;  // 800 → 512
```

**3. 이미지 형식 확인**
```javascript
// JPEG만 사용
canvas.toDataURL('image/jpeg', 0.8);
```

**4. DeepAI 지원 문의**
```
support@deepai.org
또는 Discord: https://discord.gg/deepai
```

**5. 다른 API로 전환**
```
→ Replicate Neural Style Transfer
→ 코드 거의 동일
→ 5분 안에 전환 가능
```

---

## 📞 추가 도움말

### Vercel Logs 보는 법

```bash
# CLI로 실시간 로그
vercel logs YOUR_PROJECT_URL --follow

# 또는 웹에서
https://vercel.com/dashboard
→ Project → Deployments → Logs
```

### DeepAI API 테스트 사이트

```
https://deepai.org/machine-learning-model/neural-style

여기서 직접 테스트:
1. 사진 업로드
2. 스타일 이미지 선택
3. Generate 클릭
4. 작동하면 → API 키 유효
5. 에러 발생 → DeepAI 서비스 문제
```

---

## 🎯 권장 순서

1. ✅ **먼저 시도:** 수정된 api/deepai-nst.js 배포
2. ✅ **여전히 400:** API 키 재확인 + 이미지 크기 줄이기
3. ✅ **계속 실패:** curl로 직접 테스트
4. ✅ **DeepAI 문제:** Replicate로 임시 전환
5. ✅ **장기 해결:** Replicate NST 모델 사용

---

**대부분의 경우 Step 1 (파일 교체)만으로 해결됩니다!** ✨

업데이트된 파일로 다시 시도해보세요! 🚀
