# Dialog

구매하기를 누르면 상품 상세 위에 뜨는 구매완료 팝업입니다.

- 뒤를 `overlay`로 덮고, 가운데 480px 다이얼로그(`surface`, `radius-lg`, `shadow-dialog`, 안쪽 48px 40px 40px).
- 56px `rose-500` 원 안 흰 체크 → 제목(26/700) → 안내 문구(17, `ink-muted`).
- 안내 문구와 닫기 방식은 정해지지 않아 대괄호 자리와 점선 상자로 둡니다. 캔버스에서는 바깥을 누르면 닫히게 임시로 만들어 두었습니다.
- 접근성: `role="dialog"`, `aria-modal`, 제목에 `aria-labelledby`.
