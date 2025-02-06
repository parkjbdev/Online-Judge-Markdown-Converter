# Online Judge Markdown Converter

**Online Judge Markdown Converter**는 여러 온라인 저지(Online Judge) 사이트의 문제 페이지에서 문제 내용을 추출하여 Markdown 형식으로 변환해 주는 Chrome 확장 프로그램입니다.

## 개요

이 확장 프로그램은 온라인 저지 문제 페이지(예: `https://acmicpc.net/problem/1000` 등)에서
문제 본문을 추출하고, [Turndown](https://github.com/domchristie/turndown) 라이브러리를 사용해 HTML을 Markdown으로 변환합니다.
변환된 Markdown은 팝업창에 표시되며, 복사 버튼을 통해 클립보드에 쉽게 복사할 수 있습니다.

- **지원 URL (예시):**
  - `https://acmicpc.net/problem/[숫자]` (Baekjoon Online Judge)
  - 추후 다른 온라인 저지 사이트 확장도 고려 가능
- **특징:**
  - 페이지 내에서 숨겨진 요소(예: `display: none` 처리된 요소)는 제외
  - 각 섹션 내부의 불필요한 요소(예: button 등)는 제거
  - 변환 결과를 팝업창에서 확인하고, 복사 버튼을 통해 Markdown을 클립보드로 복사

## 기능

- **HTML 추출:**
  온라인 저지 문제 페이지의 문제 본문 영역(예: `div#problem-body` 내의 section 요소)에서 내용을 추출합니다.

- **Markdown 변환:**
  [Turndown](https://github.com/domchristie/turndown) 및 [turndown-plugin-gfm](https://github.com/domchristie/turndown-plugin-gfm)을 사용하여 HTML을 Markdown으로 변환합니다.

- **복사 기능:**
  팝업창 내의 "Markdown 복사" 버튼을 클릭하면, 변환된 Markdown 텍스트가 클립보드에 복사됩니다.
  복사 성공/실패 상태는 버튼 옆에 간단한 메시지로 표시됩니다.

- **URL 검증:**
  팝업이 열릴 때 활성 탭의 URL을 확인하여, 지정된 온라인 저지 문제 페이지 형식(예: `https://acmicpc.net/problem/숫자`)인지 정규표현식을 통해 검증합니다.

## 사용 방법

1. **온라인 저지 문제 페이지**에 접속합니다.
   예: `https://acmicpc.net/problem/1000` (Baekjoon Online Judge)

2. 브라우저 툴바의 확장 프로그램 아이콘을 클릭합니다.
   - 팝업창이 열리면서 현재 페이지의 내용을 자동으로 Markdown으로 변환합니다.

3. 변환된 Markdown 결과가 팝업창에 표시됩니다.
4. **"Markdown 복사"** 버튼을 클릭하면, 변환된 Markdown 텍스트가 클립보드에 복사됩니다.
   - 복사 상태 메시지는 버튼 옆에 표시됩니다.

## 개인정보 처리 방침

이 확장 프로그램은 사용자의 개인정보를 수집하거나 저장하지 않습니다.
활성 탭의 URL과 문제 페이지의 내용을 읽어 Markdown 변환 기능을 제공할 뿐입니다.
자세한 내용은 [개인정보 처리방침](./PRIVACY_POLICY.md)을 참고하세요.

## 기여 방법

- 개선 사항, 버그 리포트, 기능 추가 제안 등은 [이슈](https://github.com/parkjbdev/Online-Judge-Markdown-Converter/issues)를 통해 남겨주세요.
- Pull Request도 환영합니다!

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

## 연락처

문의 사항이 있으면 [dev@parkjb.com](mailto:dev@parkjb.com)으로 연락 주세요.
