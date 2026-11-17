import p1 from '../assets/P03-1.jpg'
import p2 from '../assets/P03-2.jpg'
import p3 from '../assets/P03-3.jpg'
import p4 from '../assets/P03-4.jpg'
import p5 from '../assets/P03-5.jpg'
import p6 from '../assets/P03-6.jpg'
import p7 from '../assets/P03-7.jpg'
import p8 from '../assets/P03-8.jpg'
import p9 from '../assets/P03-9.jpg'
import w1 from '../assets/P03-warm-1.jpg'
import w2 from '../assets/P03-warm-2.jpg'
import w3 from '../assets/P03-warm-3.jpg'
import w4 from '../assets/P03-warm-4.jpg'
import w5 from '../assets/P03-warm-5.jpg'
import w6 from '../assets/P03-warm-6.jpg'
import w7 from '../assets/P03-warm-7.jpg'
import w8 from '../assets/P03-warm-8.jpg'
import w9 from '../assets/P03-warm-9.jpg'

// 추천 상품 (가상). 문구·가격은 실습용 예시

// 쿨 톤 9개
const COOL = [
  { image: p1, banner: '쿨 톤 1위', price: '18,000원', brandBadge: 'BEST', name: '벨벳 매트 립스틱 모브 로즈' },
  { image: p2, banner: '데일리 추천', price: '18,000원', brandBadge: 'BEST', name: '벨벳 매트 립스틱 로지 누드' },
  { image: p3, banner: '가을 신상', price: '19,000원', brandBadge: '단독', name: '벨벳 매트 립스틱 와인 베리' },
  { image: p4, banner: '한정 컬러', price: '19,000원', brandBadge: '한정', name: '벨벳 매트 립스틱 라벤더 밀크' },
  { image: p5, banner: '맑은 생기', price: '18,000원', brandBadge: 'BEST', name: '벨벳 매트 립스틱 베이비 핑크' },
  { image: p6, banner: '선명한 포인트', price: '18,000원', brandBadge: '단독', name: '벨벳 매트 립스틱 푸시아 핑크' },
  { image: p7, banner: '반짝이는 밤', price: '16,000원', brandBadge: '한정', name: '샤인 글로스 플럼 글리터' },
  { image: p8, banner: '촉촉한 광택', price: '16,000원', brandBadge: 'BEST', name: '샤인 글로스 라즈베리' },
  { image: p9, banner: '쨍한 발색', price: '16,000원', brandBadge: '단독', name: '샤인 글로스 마젠타' },
]

// P04 상품 상세에 쓰는 내용: 제형별 공통 문구 + 색마다 한 문장
const LINES = {
  matte: { texture: '매트 (부드러운 벨벳 질감)', sentence: '한 번만 발라도 선명하게 발색되고, 가볍게 밀착되어 오래 유지돼요.' },
  gloss: { texture: '글로스 (촉촉한 광택)', sentence: '촉촉한 광택이 오래 남고, 끈적임 없이 가볍게 발려요.' },
}
const COOL_COLORS = [
  '회색빛이 살짝 도는 차분한 로즈 컬러예요.',
  '장밋빛이 은은하게 도는 누드 컬러예요.',
  '깊고 진한 와인빛 베리 컬러예요.',
  '우유를 섞은 듯 부드러운 라벤더 컬러예요.',
  '맑고 여린 베이비 핑크 컬러예요.',
  '푸른빛이 도는 선명한 푸시아 핑크 컬러예요.',
  '잘게 반짝이는 펄이 들어간 깊은 플럼 컬러예요.',
  '생기 있는 라즈베리 레드 컬러예요.',
  '쨍하게 발색되는 마젠타 컬러예요.',
]
const WARM_COLORS = [
  '로즈에 코랄을 더한 따뜻한 컬러예요.',
  '복숭아빛이 은은하게 도는 누드 컬러예요.',
  '벽돌처럼 깊고 따뜻한 레드 컬러예요.',
  '우유를 섞은 듯 부드러운 살구 컬러예요.',
  '맑고 여린 피치 컬러예요.',
  '생기 있는 오렌지빛 코랄 컬러예요.',
  '잘게 반짝이는 펄이 들어간 브론즈 컬러예요.',
  '따뜻하고 깊은 칠리 레드 컬러예요.',
  '쨍하게 발색되는 탠저린 오렌지 컬러예요.',
]
// 1~6번은 벨벳 매트 립스틱, 7~9번은 샤인 글로스
const lineOf = (i) => (i < 6 ? LINES.matte : LINES.gloss)
const detail = (i, colorSentence, toneLabel) => ({
  texture: lineOf(i).texture,
  desc: `${colorSentence} ${lineOf(i).sentence}`,
  toneLabel,
})

const COOL_ITEMS = COOL.map((item, i) => ({ id: `cool-${i + 1}`, brand: '립핏', ...item, ...detail(i, COOL_COLORS[i], '쿨 톤') }))

// 웜 톤 9개: 쿨 톤 이미지에서 립 색만 웜 톤으로 바꾼 이미지(P03-warm-N), 같은 자리의 상품과 문구·가격은 그대로 두고 색 이름만 바꿈
const WARM_NAMES = ['코랄 로즈', '피치 누드', '브릭 레드', '애프리콧 밀크', '베이비 피치', '오렌지 코랄', '브론즈 글리터', '칠리 레드', '탠저린']
const WARM_IMAGES = [w1, w2, w3, w4, w5, w6, w7, w8, w9]
const WARM = COOL_ITEMS.map((item, i) => ({
  ...item,
  ...detail(i, WARM_COLORS[i], '웜 톤'),
  id: `warm-${i + 1}`,
  image: WARM_IMAGES[i],
  banner: i === 0 ? '웜 톤 1위' : item.banner,
  name: `${i < 6 ? '벨벳 매트 립스틱' : '샤인 글로스'} ${WARM_NAMES[i]}`,
}))

// 뉴트럴 톤 9개: 너무 노랗거나 푸르지 않은 부드러운 컬러 위주로 쿨·웜에서 골라 섞음
const pick = (list, n) => list[n - 1]
const NEUTRAL = [
  { ...pick(COOL_ITEMS, 2), banner: '뉴트럴 톤 1위' },
  pick(WARM, 2),
  pick(COOL_ITEMS, 1),
  pick(WARM, 1),
  pick(COOL_ITEMS, 5),
  pick(WARM, 5),
  pick(COOL_ITEMS, 3),
  pick(WARM, 3),
  pick(COOL_ITEMS, 8),
]

const BY_TONE = { cool: COOL_ITEMS, warm: WARM, neutral: NEUTRAL }

// 첫 화면에 6개, ›를 누르면 나머지 3개
export function productPagesFor(tone) {
  const list = Object.hasOwn(BY_TONE, tone) ? BY_TONE[tone] : COOL_ITEMS
  return [list.slice(0, 6), list.slice(6)]
}

// P04: 카드에서 넘어온 상품 id(cool-1 ~ cool-9, warm-1 ~ warm-9)로 상품을 찾음. 없으면 undefined
const ALL = [...COOL_ITEMS, ...WARM]
export const getProduct = (id) => ALL.find((p) => p.id === id)
