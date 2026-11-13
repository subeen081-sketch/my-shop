import { Link } from 'react-router-dom'
import introImage from '../assets/P01.jpg'
import './Main.css'

// 히어로 양옆 장식 (화면 읽기 프로그램에서 숨김)
const LIP_CHIPS = [
  'var(--lip-petal)',
  'var(--lip-pink)',
  'var(--lip-peach)',
  'var(--lip-coral)',
  'var(--lip-red)',
  'var(--lip-mauve)',
  'var(--lip-berry)',
  'var(--lip-plum)',
]

const STEPS = ['질문에 답하기', '내 톤 확인', '추천 립 보기']

function Lipstick({ color, className }) {
  return (
    <svg className={`chip chip-deco ${className}`} width="44" height="92" viewBox="0 0 44 92">
      <path d="M10 34V15Q10 7 22 2L34 8V34Z" style={{ fill: color }} />
      <rect x="6" y="34" width="32" height="12" rx="3" style={{ fill: 'var(--lipstick-case)' }} />
      <rect x="4" y="46" width="36" height="44" rx="7" strokeWidth="1.5" style={{ fill: '#FFFFFF', stroke: 'var(--lipstick-case)' }} />
    </svg>
  )
}

function StepArrow() {
  return (
    <li aria-hidden="true" className="main-steps-arrow">
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M5 3l4 4-4 4" style={{ stroke: 'var(--line-300)' }} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </li>
  )
}

// P01 메인
function Main() {
  return (
    <main>
      {/* S01-1 첫 화면 소개 */}
      <section className="main-hero" aria-labelledby="hero-title">
        <div className="main-deco" aria-hidden="true">
          <Lipstick color="var(--lip-red)" className="deco-lipstick-l" />
          <div className="chip chip-deco deco-1" />
          <div className="chip chip-deco deco-2" />
          <div className="chip chip-deco deco-3" />
          <Lipstick color="var(--lip-coral)" className="deco-lipstick-r" />
          <div className="chip chip-deco deco-4" />
          <div className="chip chip-deco deco-5" />
          <div className="chip chip-deco deco-6" />
        </div>

        <h1 id="hero-title" className="main-title rise">
          나에게 어울리는 립 컬러,
          <br />
          립핏에서 찾아보세요
        </h1>
        <p className="main-lead rise delay-1">몇 가지 질문에 답하고, 나의 톤에 어울리는 립 상품을 만나보세요.</p>

        {/* B01-1 진단 시작하기 → P02 */}
        <Link to="/diagnosis" className="btn btn-l btn-primary main-start rise delay-2">
          진단 시작하기
          <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <ol className="main-steps rise delay-3" aria-label="진단 진행 단계">
          {STEPS.map((step, i) => (
            <StepItem key={step} n={i + 1} label={step} last={i === STEPS.length - 1} />
          ))}
        </ol>

        <div className="main-chipband" aria-hidden="true">
          {LIP_CHIPS.map((color) => (
            <span key={color} className="chip" style={{ background: color }} />
          ))}
        </div>
      </section>

      {/* S01-2 소개 이미지 */}
      <section className="main-intro" aria-label="소개 이미지">
        <img src={introImage} alt="여러 립 컬러를 나란히 발라 본 발색 모음" className="main-intro-image" />
      </section>
    </main>
  )
}

function StepItem({ n, label, last }) {
  return (
    <>
      <li className="main-steps-item">
        <span className="main-steps-num" aria-hidden="true">
          {n}
        </span>
        {label}
      </li>
      {!last && <StepArrow />}
    </>
  )
}

export default Main
