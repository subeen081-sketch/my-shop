import { useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FlipCard from '../components/FlipCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { productPagesFor } from '../data/products.js'
import { TONES, toTone } from '../data/tones.js'
import { loadLikes, saveLikes } from '../utils/likes.js'
import { shareLink, shareMessage } from '../utils/share.js'
import { downloadResultImage } from '../utils/resultImage.js'
import { useToast } from '../hooks/useToast.js'
import Toast from '../components/Toast.jsx'
import logo from '../assets/logo.jpg'
import resultImage from '../assets/P03_HEADER.jpg'
import './Result.css'

// S03-1 결과 이미지: 누르거나 옆으로 끌면 뒤집혀 결과 요약이 보임 (React Bits FlipCard)
function ResultFlipCard({ tone }) {
  return (
    <div className="result-flip rise">
      <FlipCard
        className="result-flip-card"
        ariaLabel="결과 이미지 뒤집기"
        front={<img className="result-flip-img" src={resultImage} alt="여러 립 컬러를 하트 모양으로 겹쳐 바른 이미지. 누르면 결과 요약이 보여요" />}
        back={
          <div className="result-flip-back">
            <span className="result-flip-eyebrow">나의 립 컬러 결과</span>
            <strong className="result-flip-tone">{tone.label}</strong>
            <p className="result-flip-text">{tone.back}</p>
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

// 이 거리(px)보다 짧게 밀면 넘기지 않음(카드 누르기와 구분)
const SWIPE_MIN = 50

// ‹ › 넘김 슬라이드 시간(ms). Result.css의 0.45s와 맞춤
const SLIDE_MS = 450

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// P03 진단 결과
function Result() {
  // 진단에서 넘어온 톤 (?tone=warm|cool|neutral). 없으면 쿨 톤
  const [params] = useSearchParams()
  const toneKey = toTone(params.get('tone'))
  const tone = TONES[toneKey]
  const productPages = productPagesFor(toneKey)

  const [page, setPage] = useState(0)
  const [liked, setLiked] = useState(loadLikes) // 찜은 브라우저에 저장돼 새로고침해도 유지
  // 넘기는 중일 때만 값이 있음: { from: 이전 화면 번호, dir: 'next' | 'prev', fromH: 이전 높이 }
  const [slide, setSlide] = useState(null)
  const sliderRef = useRef(null)
  const gridRef = useRef(null)

  const toast = useToast()
  const [saving, setSaving] = useState(false)

  // B03-6 공유하기: 지금 결과 주소(?tone= 포함)를 공유하거나 복사
  const onShare = async () => {
    const result = await shareLink({ title: '립핏 진단 결과', text: `${tone.title}. 립핏에서 나에게 어울리는 립 컬러를 찾아보세요.` })
    toast.show(shareMessage(result))
  }

  // B03-7 저장하기: 결과를 이미지로 그려 내려받음 (추천 립은 첫 화면 앞 3개)
  const onSave = async () => {
    setSaving(true)
    try {
      await downloadResultImage({ tone, toneKey, headerImage: resultImage, logoImage: logo, products: productPages[0].slice(0, 3) })
      toast.show('결과 이미지를 저장했어요')
    } catch {
      toast.show('이미지를 저장하지 못했어요. 다시 시도해 주세요')
    } finally {
      setSaving(false)
    }
  }

  const toggleLike = (id) =>
    setLiked((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      saveLikes(next)
      return next
    })
  const isFirst = page === 0
  const isLast = page === productPages.length - 1

  // ‹ ›와 손가락 밀기가 함께 씀. 지금 화면은 옆으로 밀려 나가고 다음 화면이 반대쪽에서 들어옴
  const goTo = (next) => {
    if (next < 0 || next >= productPages.length || next === page || slide) return
    if (prefersReducedMotion()) {
      setPage(next) // 동작 줄이기 설정이면 움직임 없이 바로 바꿈
      return
    }
    setSlide({ from: page, dir: next > page ? 'next' : 'prev', fromH: gridRef.current.offsetHeight })
    setPage(next)
  }

  const endSlide = () => {
    if (sliderRef.current) sliderRef.current.style.height = ''
    setSlide(null)
  }

  // 카드 줄 수가 달라(6개 ↔ 3개) 높이도 이전 높이에서 새 높이로 부드럽게 바꿈
  useLayoutEffect(() => {
    if (!slide) return
    const el = sliderRef.current
    el.style.height = `${slide.fromH}px`
    el.getBoundingClientRect() // 시작 높이를 먼저 적용
    el.style.height = `${gridRef.current.offsetHeight}px`
    const fallback = setTimeout(endSlide, SLIDE_MS + 150) // animationend를 놓쳐도 끝나게
    return () => clearTimeout(fallback)
  }, [slide])

  const renderCards = (items) =>
    items.map((product) => (
      <ProductCard key={product.id} product={product} liked={!!liked[product.id]} onToggleLike={() => toggleLike(product.id)} />
    ))

  // 터치 기기 전용: 추천 목록을 손가락으로 옆으로 밀어 넘김 (‹ › 버튼과 같은 동작)
  // 터치 이벤트만 쓰므로 마우스(데스크톱)에서는 동작하지 않음
  const swipe = useRef(null)
  const onTouchStart = (e) => {
    const t = e.touches[0]
    swipe.current = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null
  }
  const onTouchEnd = (e) => {
    const start = swipe.current
    swipe.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) <= Math.abs(dy)) return
    if (dx < 0) goTo(page + 1)
    if (dx > 0) goTo(page - 1)
  }

  return (
    <main className="result">
      {/* S03-1 결과 영역 */}
      <section className="result-summary" aria-labelledby="result-title">
        <ResultFlipCard tone={tone} />
        <h1 id="result-title" className="result-title rise">
          {tone.title}
        </h1>
        <p className="result-desc">{tone.desc}</p>
      </section>

      {/* S03-2 추천 영역: 첫 화면 6개, ›를 누르면 나머지 3개 */}
      <section className="result-reco" aria-label="추천 상품">
        <PageArrow direction="left" label="이전 추천 상품" onClick={() => goTo(page - 1)} disabled={isFirst} />
        <div
          ref={sliderRef}
          className={`result-slider${slide ? ' is-sliding' : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* 밀려 나가는 이전 화면 (넘기는 동안만 보임) */}
          {slide && (
            <div className={`result-grid result-grid-out slide-out-${slide.dir}`} aria-hidden="true" inert>
              {renderCards(productPages[slide.from])}
            </div>
          )}
          <div
            ref={gridRef}
            className={`result-grid${slide ? ` slide-in-${slide.dir}` : ''}`}
            onAnimationEnd={(e) => {
              if (slide && e.target === e.currentTarget) endSlide()
            }}
          >
            {renderCards(productPages[page])}
          </div>
        </div>
        <PageArrow direction="right" label="다음 추천 상품" onClick={() => goTo(page + 1)} disabled={isLast} />
      </section>

      {/* S03-3 결과 저장·공유 (회원 기능 없이): 공유는 링크, 저장은 결과 이미지 내려받기 */}
      <section className="result-actions" aria-label="결과 저장과 공유">
        <button type="button" className="btn btn-m btn-secondary result-action" onClick={onShare}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 11V2.5M5.5 6 9 2.5 12.5 6M3 10v4.5h12V10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          공유하기
        </button>
        <button type="button" className="btn btn-m btn-secondary result-action" onClick={onSave} disabled={saving} aria-busy={saving}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 2.5V11M5.5 7.5 9 11l3.5-3.5M3 10v4.5h12V10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {saving ? '저장하는 중' : '저장하기'}
        </button>
      </section>
      <Toast message={toast.message} />
    </main>
  )
}

export default Result
