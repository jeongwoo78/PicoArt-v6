# 🚀 PicoArt v6 빠른 시작 (5분 완료!)

## Step 1: DeepAI API 키 받기 (2분)

1. **DeepAI 가입**
   ```
   https://deepai.org/ 
   → Sign Up (무료)
   ```

2. **API 키 확인**
   ```
   https://deepai.org/machine-learning-model/neural-style
   → "Try it out" 클릭
   → 하단에 API key 표시
   
   예시: quickstart-QUdJIGlzIGNvbWluZ...
   ```

3. **복사하기**
   ```
   전체 키 복사 (quickstart- 포함)
   ```

---

## Step 2: GitHub 업로드 (2분)

### 방법 A: 웹에서 직접

```
1. GitHub repo 접속 (picoart-AUTO)
2. "Add file" → "Upload files"
3. 이 폴더의 모든 파일 드래그
4. "Commit changes" 클릭
```

### 방법 B: Git 명령어

```bash
git add .
git commit -m "PicoArt v6 - DeepAI NST 추가"
git push
```

---

## Step 3: Vercel 자동 배포 (1분)

```
1. GitHub push 완료 → Vercel 자동 감지
2. https://vercel.com/dashboard 접속
3. 배포 진행 확인 (1-2분)
4. ✅ 초록 체크 표시 → 완료!
```

---

## Step 4: 테스트! (1분)

```
1. 사이트 접속
   https://picoart-auto-xxxxx.vercel.app

2. API 선택
   ☑️ DeepAI NST (기본값)

3. API 키 입력
   복사한 DeepAI 키 붙여넣기

4. 사진 업로드
   테스트 사진 선택

5. Van Gogh 클릭

6. "🎨 스타일 변환 시작" 클릭

7. 15-20초 대기

8. ✨ 완성!
```

---

## ✅ 성공 확인

### 브라우저 콘솔 (F12)

```
✅ 이렇게 나와야 성공:

🎨 PicoArt v6 시작! (DeepAI NST)
🚀 변환 시작! API: deepai
🎨 DeepAI NST 시작...
🎨 선택된 작품: 별이 빛나는 밤
📥 DeepAI 응답: { success: true, ... }
✅ DeepAI 변환 성공!
```

### Vercel 로그

```
✅ 이렇게 나와야 성공:

=== DeepAI NST API Called ===
📸 Style Image: https://...vangogh/01_starry_night.jpg
📸 Content Image length: 12345
🎨 Calling DeepAI Neural Style Transfer...
📡 DeepAI Response Status: 200
✅ DeepAI Success!
```

---

## ❌ 문제 발생 시

### "API key is required"

```
→ DeepAI 키 전체 복사했는지 확인
→ quickstart-로 시작하는지 확인
```

### "Cannot find module 'form-data'"

```
→ package.json이 제대로 업로드됐는지 확인
→ Vercel이 자동으로 npm install 실행 (30초 대기)
```

### "CORS error"

```
→ 이미 해결됨! 재배포 필요
→ Vercel → Redeploy 클릭
```

### 변환이 안 됨

```
→ F12 콘솔 에러 메시지 확인
→ DeepAI 크레딧 잔액 확인
→ 다른 사진으로 재시도
```

---

## 🎉 완료!

**이제 무료로 500장까지 고품질 NST 가능합니다!**

더 많은 기능을 원하시면 `README-v6.md` 참고하세요.

---

## 📞 도움이 필요하면

1. **Vercel 로그 확인**
   ```
   https://vercel.com/dashboard
   → 프로젝트 선택
   → Deployments 탭
   → 최신 배포 클릭
   → Function Logs 확인
   ```

2. **브라우저 콘솔 확인**
   ```
   F12 → Console 탭
   → 에러 메시지 캡처
   ```

3. **테스트 호출**
   ```bash
   curl https://your-site.vercel.app/api/deepai-nst
   ```

Happy creating! 🎨✨
