# ProgressBar

진단 진행 상태로, 왼쪽에 현재/전체 문항, 오른쪽에 진행률, 그 아래 막대를 둡니다.

- 숫자는 `caption`(15/500) `ink-subtle`, 현재 문항 숫자만 `ink` 600.
- 막대 높이 6px, `radius-pill`, 바탕 `line-100`, 채움 `rose-500`. 문항이 바뀌면 0.3초에 걸쳐 늘어남.
- 접근성: `role="progressbar"`와 `aria-valuenow`.
- 전체 문항 수 12는 와이어프레임의 예시이며 아직 확정되지 않았습니다.
