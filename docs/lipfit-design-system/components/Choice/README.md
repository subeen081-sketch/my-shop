# Choice

진단 질문의 선택지로, 폭 전체를 쓰는 넓은 상자를 세로로 쌓습니다.

- 높이 `control-choice`(64px), 좌우 안쪽 여백 24px, 모서리 `radius-md`, 사이 `space-3`.
- 기본: `surface` 바탕 + `line-200` 테두리, `choice`(18/500).
- 호버: `page-mid` 바탕 + `line-300` 테두리.
- 선택됨: `rose-500` 채움 + `on-rose` 글자(600) + 오른쪽 흰 원 안 로즈 체크. 선택지마다 다른 색은 쓰지 않습니다.
- 접근성: 묶음은 `role="radiogroup"`, 각 상자는 `role="radio"`와 `aria-checked`.
