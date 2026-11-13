import p1 from '../assets/P03-1.jpg'
import p2 from '../assets/P03-2.jpg'
import p3 from '../assets/P03-3.jpg'
import p4 from '../assets/P03-4.jpg'
import p5 from '../assets/P03-5.jpg'
import p6 from '../assets/P03-6.jpg'
import p7 from '../assets/P03-7.jpg'
import p8 from '../assets/P03-8.jpg'
import p9 from '../assets/P03-9.jpg'

// 쿨 톤 추천 상품 (가상). 문구·가격은 실습용 예시
const ITEMS = [
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

export const products = ITEMS.map((item, i) => ({ id: i + 1, brand: '립핏', ...item }))

// 첫 화면에 6개, ›를 누르면 나머지 3개
export const productPages = [products.slice(0, 6), products.slice(6)]
