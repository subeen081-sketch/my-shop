import { Link } from 'react-router-dom'
import './ProductCard.css'

// P03 S03-2 추천 상품 카드. 카드 전체가 P04 링크 (B03-1)
function ProductCard({ product, liked, onToggleLike }) {
  return (
    <div className="pcard">
      <Link to="/product" className="pcard-link" aria-label={`${product.name} 상세 보기`}>
        <div className="pcard-banner">
          <span>{product.banner}</span>
          <span className="pcard-new">New</span>
        </div>
        <img src={product.image} alt="" className="pcard-image" />
        <div className="pcard-info">
          <div className="pcard-row">
            <span className="pcard-price">{product.price}</span>
            <span className="pcard-badge">{product.brandBadge}</span>
          </div>
          <div className="pcard-names">
            <span className="pcard-brand">{product.brand}</span>
            <span className="pcard-name">{product.name}</span>
          </div>
        </div>
      </Link>
      {/* B03-5 찜: 실제 동작은 [미정], 하트 모양만 켜고 끔 */}
      <button
        type="button"
        className="btn pcard-like"
        aria-label={`${product.name} 찜하기`}
        aria-pressed={liked}
        onClick={onToggleLike}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 16.5s-6-3.6-6-8.1A3.4 3.4 0 0 1 10 6.3a3.4 3.4 0 0 1 6 2.1c0 4.5-6 8.1-6 8.1z"
            stroke={liked ? '#D42A5E' : '#2A2027'}
            fill={liked ? '#D42A5E' : 'none'}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default ProductCard
