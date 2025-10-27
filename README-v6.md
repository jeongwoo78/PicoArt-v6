# 🎨 PicoArt v6.0 - DeepAI Neural Style Transfer

## ✨ 새로운 기능

### 진짜 NST (Neural Style Transfer) 구현!

**v5 (SDXL) vs v6 (DeepAI NST):**

| 특징 | v5 SDXL | v6 DeepAI NST |
|------|---------|---------------|
| 방식 | 범용 AI 생성 | 진짜 NST 알고리즘 |
| 붓터치 | 유사한 느낌 | 명화 실제 재현 |
| 구조 보존 | 보통 | 완벽 |
| 색감 정확도 | 보통 | 매우 높음 |
| 비용 | $0.055/image | $0.01/image |

---

## 🚀 빠른 시작

### 1. DeepAI API 키 받기 (무료!)

```
1. https://deepai.org/ 접속
2. 회원가입 (무료)
3. https://deepai.org/machine-learning-model/neural-style 접속
4. "Try it out" 버튼 클릭
5. 페이지 하단에 API key 표시
   → quickstart-QUdJIGlzIGNvbWluZ... 형식
```

**무료 티어:**
- 가입 시 $5 크레딧 제공
- NST 1회당 $0.01
- 즉, 500장 무료!

### 2. GitHub에 배포

```bash
# 1. 이 폴더의 모든 파일을 GitHub repo에 업로드
git add .
git commit -m "PicoArt v6 - DeepAI NST"
git push

# 2. Vercel 자동 배포 (1-2분)
```

### 3. 테스트

```
1. 사이트 접속
2. 🎨 DeepAI NST 선택 (기본값)
3. API 키 입력
4. 사진 업로드
5. Van Gogh 선택
6. 변환 시작!
```

---

## 🔧 기술 상세

### 파일 구조

```
picoart-deepai/
├── index.html              # 메인 UI (v6 업그레이드)
├── package.json            # Node.js dependencies
├── vercel.json            # Vercel 설정
├── api/
│   ├── deepai-nst.js      # ✨ 새로 추가! DeepAI NST API
│   ├── convert.js         # Replicate API (기존)
│   └── status.js          # Replicate 상태 확인
└── artworks/vangogh/
    └── 01~07.jpg          # 반고흐 7작품
```

### DeepAI NST 작동 원리

```javascript
// 1. 브라우저 → Vercel 서버 (CORS OK)
fetch('/api/deepai-nst', {
  styleImageUrl: 'https://.../vangogh/starry_night.jpg',
  contentImage: 'data:image/jpeg;base64,...',
  apiKey: 'your-key'
})

// 2. Vercel 서버 → DeepAI (서버 간 통신 = CORS 없음!)
fetch('https://api.deepai.org/api/neural-style', {
  style: styleImageUrl,    // 명화 URL
  content: userPhoto       // 사용자 사진
})

// 3. DeepAI Neural Style Transfer:
//    - Content 추출: 사진의 구조/형태
//    - Style 추출: 명화의 붓터치/색감
//    - 합성: 사진 구조 + 명화 스타일

// 4. 결과 반환
return { outputUrl: 'https://...' }
```

---

## 🎯 API 선택 가이드

### DeepAI NST (권장) 👍

**사용 조건:**
- ✅ 고품질 NST 원할 때
- ✅ 비용 절감 원할 때
- ✅ 명화 스타일 정확히 재현

**장점:**
- 🎨 진짜 NST 알고리즘
- 💰 매우 저렴 ($0.01/image)
- 🔒 안정적인 결과
- 📐 구조 완벽 보존

**단점:**
- ⏱️ 약간 느림 (15-20초)

### Replicate SDXL (기존)

**사용 조건:**
- ⚡ 빠른 처리 원할 때
- 🎲 실험적인 결과 원할 때

**장점:**
- ⚡ 빠름 (~10초)
- 🎨 창의적인 변형

**단점:**
- 💰 비쌈 ($0.055/image)
- ⚠️ 구조 변형 가능

---

## 📊 비용 비교

### DeepAI
```
무료 크레딧: $5
1회 비용: $0.01
무료로: 500장

이후:
100장: $1
1,000장: $10
10,000장: $100
```

### Replicate SDXL
```
1회 비용: $0.055
100장: $5.5
1,000장: $55
10,000장: $550
```

**→ DeepAI가 5.5배 저렴!** 💰

---

## 🐛 문제 해결

### DeepAI API 오류

**증상:** "API key is required"
**해결:**
1. DeepAI 사이트에서 키 다시 확인
2. 전체 키 복사 (quickstart-로 시작)
3. 공백 없이 붙여넣기

**증상:** "CORS error"
**해결:**
1. 이미 해결됨! (서버사이드 처리)
2. 혹시 에러 발생 시 → GitHub 코드 재확인
3. Vercel 로그 확인

**증상:** "변환 실패"
**해결:**
1. 사진 크기 확인 (800px 이하로 자동 조정됨)
2. API 크레딧 잔액 확인
3. 다른 사진으로 재시도

### Replicate API 오류

**증상:** "prediction timeout"
**해결:**
1. API 토큰 재확인
2. 네트워크 연결 확인
3. 잠시 후 재시도

---

## 🔄 v5에서 v6로 업그레이드

### 방법 1: 전체 교체 (권장)

```bash
1. 기존 GitHub repo 백업
2. 새 v6 파일 전체 업로드
3. Vercel 자동 재배포
```

### 방법 2: 파일별 업데이트

```bash
1. index.html 교체
2. api/deepai-nst.js 추가
3. package.json 추가/업데이트
4. 배포
```

---

## 🚀 다음 단계

### 단기 (1-2주)
- [ ] 다른 화가 추가 (Matisse, Picasso, Munch, Klimt)
- [ ] 스타일 강도 조절 기능
- [ ] 전/후 비교 슬라이더

### 중기 (1-2개월)
- [ ] 사용자 피드백 수집
- [ ] 스마트 매칭 알고리즘 (98개 작품 DB 활용)
- [ ] 변환 기록 저장

### 장기 (3-6개월)
- [ ] Custom NST 모델 (비용 최소화)
- [ ] 모바일 앱
- [ ] 소셜 공유 기능

---

## 💡 FAQ

**Q: DeepAI와 Replicate 중 뭐가 더 좋나요?**
A: DeepAI NST를 추천합니다. 품질이 더 좋고 5배 저렴합니다.

**Q: CORS 문제 정말 해결됐나요?**
A: 네! 서버사이드에서 처리해서 완벽히 해결했습니다.

**Q: 무료로 몇 장까지 가능한가요?**
A: DeepAI 가입 시 $5 크레딧으로 약 500장 무료입니다.

**Q: 다른 화가는 언제 추가되나요?**
A: v7에서 Matisse, Picasso, Munch, Klimt 추가 예정입니다.

---

## 📝 변경 이력

### v6.0 (2025-10-27)
- ✨ DeepAI Neural Style Transfer 통합
- ✨ API 선택 기능 (DeepAI/Replicate)
- 🐛 CORS 문제 완벽 해결
- 💰 비용 80% 절감
- 🎨 스타일 전달 품질 대폭 개선

### v5.0 (2025-10-26)
- ✨ Replicate SDXL 모델
- 🎨 Van Gogh 7작품 DB
- ⚡ Vercel 서버리스

---

## 🎉 성공 확인

**DeepAI NST가 제대로 작동하면:**

1. 콘솔에 이렇게 표시:
```
🎨 DeepAI NST 시작...
🎨 선택된 작품: 별이 빛나는 밤
📥 DeepAI 응답: { success: true, outputUrl: "..." }
✅ DeepAI 변환 성공!
```

2. 결과 이미지:
- 원본 사진의 구도 유지
- 반고흐의 실제 붓터치
- 명화의 색감 정확히 반영

**진짜 PicoArt가 완성되었습니다!** 🎉✨

---

## 📞 문제 발생 시

1. **Vercel 로그 확인:**
   ```
   https://vercel.com/dashboard
   → 프로젝트 → Deployments → Logs
   ```

2. **브라우저 콘솔 확인:**
   ```
   F12 → Console 탭
   에러 메시지 확인
   ```

3. **테스트 API 호출:**
   ```bash
   curl -X POST https://your-site.vercel.app/api/deepai-nst \
     -H "Content-Type: application/json" \
     -d '{"styleImageUrl":"test","contentImage":"test","apiKey":"test"}'
   ```

---

**Happy style transferring!** 🎨✨
