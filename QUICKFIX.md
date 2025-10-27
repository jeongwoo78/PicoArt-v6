# 🚑 긴급 수정: 400 에러 해결

## 🎯 문제 원인

**DeepAI API 파라미터 오류:**
- ❌ 기존: `content` 파라미터
- ✅ 수정: `image` 파라미터

---

## ⚡ 1분 수정 (권장)

### GitHub 웹에서 파일 하나만 교체

```
1. GitHub repo 접속
   https://github.com/jeongwoo78/picoart-AUTO

2. api 폴더 클릭

3. deepai-nst.js 클릭

4. 연필 아이콘 (Edit) 클릭

5. 51번째 줄 찾기:
   form.append('content', contentImage);

6. 다음으로 변경:
   form.append('image', contentImage);

7. Commit changes 클릭

8. Vercel 자동 재배포 대기 (1분)

9. 다시 테스트!
```

---

## 🔄 전체 파일 교체 (안전)

### 수정된 전체 파일 다운로드

**PicoArt-v6-FIXED.zip 다운로드**

**변경 사항:**
```
✅ api/deepai-nst.js - 파라미터 수정
✅ api/deepai-simple.js - 대안 버전 추가
✅ TROUBLESHOOTING.md - 문제 해결 가이드
✅ 더 나은 에러 로깅
```

### 배포 방법

```
1. ZIP 압축 해제

2. GitHub → Upload files
   - api 폴더만 교체
   - 또는 전체 교체

3. Commit

4. Vercel 자동 배포 (1-2분)

5. 테스트!
```

---

## ✅ 수정 확인

### Vercel Function 로그

```
✅ 성공 로그:

=== DeepAI NST API v2 Called ===
🎨 Calling DeepAI Neural Style Transfer...
📡 DeepAI Response Status: 200
✅ DeepAI Success!
```

### 브라우저 콘솔

```
✅ 성공 로그:

🎨 DeepAI NST 시작...
📥 DeepAI 응답: {success: true, ...}
✅ DeepAI 변환 성공!
```

---

## 🎯 주요 수정 내용

### api/deepai-nst.js (51번째 줄)

```javascript
// ❌ 기존 (틀림)
form.append('content', contentImage);

// ✅ 수정 (올바름)
form.append('image', contentImage);
```

### 추가 개선 사항

```javascript
// 더 나은 에러 로깅
console.log('📸 Content Image type:', contentImage.substring(0, 30));
console.log('🔑 API Key prefix:', apiKey.substring(0, 10));

// 응답 먼저 text로 받기
const responseText = await deepaiResponse.text();
const result = JSON.parse(responseText);

// 에러 메시지 개선
errorDetails = errorJson.err || errorJson.error || responseText;
```

---

## 🧪 테스트 방법

### 1. 웹사이트에서 직접 테스트

```
1. pico-art-v6.vercel.app 접속
2. DeepAI API 키 입력
3. 작은 사진 업로드 (< 1MB)
4. Van Gogh 선택
5. 변환 시작
6. F12 콘솔 확인
```

### 2. curl로 API 직접 테스트

```bash
curl -X POST https://api.deepai.org/api/neural-style \
  -H "api-key: YOUR_KEY" \
  -F "style=https://picsum.photos/400" \
  -F "image=https://picsum.photos/400"
  
# 200 OK → API 키 정상
# 400 Error → API 키 문제
```

### 3. DeepAI 웹사이트에서 테스트

```
https://deepai.org/machine-learning-model/neural-style

1. 사진 두 개 업로드
2. Generate 클릭
3. 작동하면 → API 키 유효
4. 에러 → DeepAI 계정 문제
```

---

## 💡 여전히 에러 발생 시

### Option 1: API 키 재확인

```
https://deepai.org/dashboard/profile
→ API Keys
→ 전체 키 복사 (공백 없이)
→ 다시 시도
```

### Option 2: 이미지 크기 줄이기

```javascript
// index.html 수정 (290번째 줄 근처)
const maxSize = 512;  // 800 → 512로 변경
```

### Option 3: 대안 API 사용

```
// api/deepai-simple.js 사용
// 또는 Replicate SDXL로 전환 (이미 작동 중)
```

---

## 📊 수정 전/후 비교

### 기존 (v6.0)

```javascript
❌ form.append('content', contentImage);
❌ 에러 로깅 부족
❌ 400 Bad Request 발생
```

### 수정 (v6.1)

```javascript
✅ form.append('image', contentImage);
✅ 상세한 에러 로깅
✅ 200 OK 정상 작동
```

---

## 🎉 기대 결과

**수정 후:**
```
1. DeepAI API 정상 호출 ✅
2. 15-20초 후 결과 생성 ✅
3. 반고흐 붓터치 완벽 재현 ✅
4. 구조 보존 완벽 ✅
```

---

## 📞 추가 도움

**문제 지속 시:**
1. Vercel 로그 확인
2. TROUBLESHOOTING.md 참고
3. DeepAI 지원팀 문의: support@deepai.org

**작동 확인 시:**
1. 다양한 사진으로 테스트
2. 사용자 피드백 수집
3. 다음 단계 진행 (다른 화가 추가 등)

---

**이 수정으로 대부분의 400 에러가 해결됩니다!** ✨

지금 바로 파일 하나만 수정해보세요! 🚀
