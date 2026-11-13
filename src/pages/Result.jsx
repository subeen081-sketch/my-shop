import { useState } from 'react'
import FlipCard from '../components/FlipCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { productPages } from '../data/products.js'
import resultImage from '../assets/P03_HEADER.jpg'
import './Result.css'

// S03-1 결과 이미지: 누르거나 옆으로 끌면 뒤집혀 결과 요약이 보임 (React Bits FlipCard)
function ResultFlipCard() {
  return (
    <div className="result-flip rise">
      <FlipCard
        className="result-flip-card"
        ariaLabel="결과 이미지 뒤집기"
        front={<img className="result-flip-img" src={resultImage} alt="여러 립 컬러를 하트 모양으로 겹쳐 바른 이미지. 누르면 결과 요약이 보여요" />}
        back={
          <div className="result-flip-back">
            <span className="result-flip-eyebrow">나의 립 컬러 결과</span>
            <strong className="result-flip-tone">쿨 톤</strong>
            <p className="result-flip-text">푸른빛이 도는 맑은 컬러가 잘 어울려요</p>
            <span className="result-flip-hint">다시 누르면 이미지로 돌아가요</span>
          </div>
        }
        axis="y"
        width={560}
        height={320}
        radius={20}
        tiltMax={6}
        glareOpacity={0.18}
        hoverScale={1.02}
        background="#FFFFFF"
        color="#2A2027"
        shadowColor="#D42A5E"
        shadowOpacity={0.18}
      />
    </div>
  )
}

function PageArrow({ direction, label, onClick, disabled }) {
  const d = direction === 'left' ? 'M10 3.5 5.5 8l4.5 4.5' : 'M6 3.5 10.5 8 6 12.5'
  return (
    <button type="button" className="btn btn-secondary result-page-btn" aria-label={label} onClick={onClick} disabled={disabled}>
      <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
        <path d={d} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// P03 진단 결과
function Result() {
  const [page, setPage] = useState(0)
  const [liked, setLiked] = useState({})

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }))
  const isFirst = page === 0
  const isLast = page === productPages.length - 1

  return (
    <main className="result">
      {/* S03-1 결과 영역 */}
      <section className="result-summary" aria-labelledby="result-title">
        <ResultFlipCard />
        <h1 id="result-title" className="result-title rise">
          나의 립 컬러는 쿨 톤
        </h1>
        <p className="result-desc">로즈, 베리, 플럼처럼 푸른빛이 섞인 컬러가 얼굴을 맑고 화사하게 밝혀 줘요. 아래에서 어울리는 립을 골라 보세요.</p>
      </section>

      {/* S03-2 추천 영역: 첫 화면 6개, ›를 누르면 나머지 3개 */}
      <section className="result-reco" aria-label="추천 상품">
        <PageArrow direction="left" label="이전 추천 상품" onClick={() => setPage(page - 1)} disabled={isFirst} />
        <div key={page} className="result-grid">
          {productPages[page].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              liked={!!liked[product.id]}
              onToggleLike={() => toggleLike(product.id)}
            />
          ))}
        </div>
        <PageArrow direction="right" label="다음 추천 상품" onClick={() => setPage(page + 1)} disabled={isLast} />
      </section>

      {/* S03-3 결과 저장·공유: 동작 [미정] */}
      <section className="result-actions" aria-label="결과 저장과 공유">
        <button type="button" className="btn btn-m btn-secondary result-action">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 11V2.5M5.5 6 9 2.5 12.5 6M3 10v4.5h12V10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          공유하기
        </button>
        <button type="button" className="btn btn-m btn-secondary result-action">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 2.5V11M5.5 7.5 9 11l3.5-3.5M3 10v4.5h12V10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          저장하기
        </button>
      </section>
    </main>
  )
}

export default Result
