import { useState } from 'react'
import PurchaseDialog from '../components/PurchaseDialog.jsx'
import productImage from '../assets/P04.jpg'
import './Product.css'

// 상품 정보 (가상 상품 예시. 용량은 시안에서 뺌)
const INFO = [
  { label: '가격', value: '19,000원', strong: true },
  { label: '제형', value: '매트 (부드러운 벨벳 질감)' },
  { label: '추천 톤', value: '쿨 톤' },
]

// P04 상품 상세
function Product() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <main className="product">
        <section className="product-section" aria-labelledby="pd-section">
          <h1 id="pd-section" className="product-heading">
            마음에 드는 립 컬러를 자세히 살펴보세요
          </h1>

          <div className="product-body">
            <img src={productImage} alt="딥 플럼 색 립스틱과 발색 자국" className="product-image" />

            <div className="product-info">
              <div className="product-intro">
                <span className="product-virtual">실제로 판매하지 않는 가상 상품이에요</span>
                <h2 className="product-name">립핏 벨벳 매트 립스틱 딥 플럼</h2>
                <p className="product-desc">푸른빛이 감도는 깊은 플럼 컬러예요. 한 번만 발라도 선명하게 발색되고, 가볍게 밀착되어 오래 유지돼요.</p>
              </div>

              <dl className="product-spec">
                {INFO.map((row) => (
                  <div key={row.label} className="product-spec-row">
                    <dt>{row.label}</dt>
                    <dd className={row.strong ? 'is-strong' : undefined}>{row.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="product-notice">실습용 가상 상품이라 실제 결제와 배송은 진행되지 않아요. 구매하기를 누르면 구매 완료 화면을 볼 수 있어요.</p>

              <div className="product-buttons">
                {/* B04-1 구매하기 → PU-01 */}
                <button type="button" className="btn btn-l btn-primary product-buy" onClick={() => setOpen(true)}>
                  구매하기
                </button>
                {/* B04-2 공유하기: 동작 [미정] */}
                <button type="button" className="btn btn-l btn-secondary product-share">
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M9 11V2.5M5.5 6 9 2.5 12.5 6M3 10v4.5h12V10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {open && <PurchaseDialog onClose={() => setOpen(false)} />}
    </>
  )
}

export default Product
