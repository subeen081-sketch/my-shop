# ProductCard

진단 결과의 추천 상품 카드로, 카드 어디를 눌러도 상품 상세로 갑니다.

- 위에서부터: 헤더 배너(40px, `blush-100`, 배너 문구 `label` + 오른쪽 New 배지) → 상품 이미지(`image-slot`, `radius-md`, 1:1) → 가격(18/700) + 오른쪽 브랜드 배지(`line-200` 테두리, `badge`) → 브랜드명(14, `ink-muted`)·상품명(17/600).
- 이미지 왼쪽 위에 44px 흰 원 찜 버튼(하트). 켜지면 `rose-500` 하트.
- 카드: `surface`, `line-100` 테두리, `radius-lg`, `shadow-card`. 호버 시 2px 떠오르고 `shadow-card-hover`.
- 3열 배치, 사이 `space-6`. 배너 문구·가격·브랜드 배지는 정해지지 않아 대괄호 자리로 둡니다.
- EWG 그린·안전 인증 배지는 넣지 않습니다.
