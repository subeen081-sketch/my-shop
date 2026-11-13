import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Diagnosis.css'

// 진단 질문 12개 (예시 문항: 퍼스널컬러 간이 진단 + 립 취향)
const QUESTIONS = [
  { q: '연령대를 선택해 주세요', options: ['10대', '20대', '30대', '40대', '50대 이상'] },
  { q: '손목 안쪽 핏줄은 어떤 색으로 보이나요?', options: ['초록빛', '파란빛이나 보랏빛', '두 색이 섞여 보여요', '잘 모르겠어요'] },
  { q: '햇볕을 오래 쬐면 피부가 어떻게 되나요?', options: ['쉽게 그을려요', '붉어졌다가 금방 돌아와요', '둘 다 비슷해요'] },
  { q: '더 잘 어울린다고 느끼는 액세서리는 무엇인가요?', options: ['골드', '실버', '둘 다 잘 어울려요', '잘 모르겠어요'] },
  { q: '내 피부 톤과 가장 가까운 것을 골라 주세요', options: ['노란빛이 도는 편', '붉은빛이나 분홍빛이 도는 편', '어느 쪽도 아닌 중간'] },
  { q: '아무것도 바르지 않은 입술 색은 어떤가요?', options: ['연한 분홍색', '진한 분홍색이나 붉은색', '살구색이나 베이지색', '어두운 편'] },
  { q: '머리카락과 눈동자 색은 어느 쪽에 가까운가요?', options: ['밝은 갈색', '진한 갈색', '검은색'] },
  { q: '얼굴이 더 환해 보이는 흰옷은 무엇인가요?', options: ['아이보리처럼 부드러운 흰색', '새하얀 흰색', '둘 다 비슷해요'] },
  { q: '다른 사람에게 자주 듣는 인상은 무엇인가요?', options: ['부드럽고 따뜻해요', '맑고 시원해요', '또렷하고 강해요', '차분하고 우아해요'] },
  { q: '평소 즐겨 쓰는 립 질감은 무엇인가요?', options: ['촉촉한 글로시', '보송한 매트', '가벼운 틴트', '은은한 립밤'] },
  { q: '어떤 자리에서 바를 립을 찾고 있나요?', options: ['매일 바를 데일리 립', '회사나 학교', '약속이나 모임', '특별한 날'] },
  { q: '원하는 발색 정도를 골라 주세요', options: ['맨입술처럼 자연스럽게', '생기 있게 은은하게', '선명하고 또렷하게'] },
]
const TOTAL = QUESTIONS.length

function ArrowIcon({ direction }) {
  const d = direction === 'left' ? 'M10 3.5 5.5 8l4.5 4.5' : 'M6 3.5 10.5 8 6 12.5'
  return (
    <svg className={direction === 'right' ? 'btn-arrow' : undefined} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// P02 진단
function Diagnosis() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({}) // 단계별 선택값 (이전으로 돌아가도 유지)
  const { q: question, options } = QUESTIONS[step - 1]
  const picked = answers[step] ?? null
  const setPicked = (label) => setAnswers((prev) => ({ ...prev, [step]: label }))

  const hasPick = picked !== null
  const isLast = step === TOTAL
  const pct = Math.round((step / TOTAL) * 100)

  const goNext = () => {
    if (!hasPick) return
    if (isLast) {
      navigate('/result') // B02-2 결과 보기 → P03
      return
    }
    setStep(step + 1)
  }

  const goPrev = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <main className="diag">
      {/* S02-1 진행 상태 */}
      <section className="diag-progress" aria-label="진행 상태">
        <div className="diag-progress-text">
          <span>
            <strong>{step}</strong> / {TOTAL}
          </span>
          <span>{pct}%</span>
        </div>
        <div
          className="diag-progress-track"
          role="progressbar"
          aria-label="진단 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="diag-progress-bar" style={{ width: `${pct}%` }} />
        </div>
      </section>

      {/* S02-2 질문 화면 (key로 질문이 바뀔 때마다 밀려 들어오는 움직임 재생) */}
      <section key={step} className="diag-card" aria-labelledby="q-title">
        <h1 id="q-title" className="diag-question">
          {question}
        </h1>
        <div className="diag-options" role="radiogroup" aria-labelledby="q-title">
          {options.map((label) => {
            const on = picked === label
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={on}
                className={`diag-option${on ? ' is-checked' : ''}`}
                onClick={() => setPicked(label)}
              >
                {label}
                {on && (
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                    <circle cx="11" cy="11" r="10" fill="#FFFFFF" />
                    <path d="M6.5 11.2l3 3 6-6.2" stroke="#D42A5E" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <nav className="diag-nav" aria-label="질문 이동">
        {/* B02-3 이전 */}
        <button type="button" className="btn btn-m btn-text" onClick={goPrev}>
          <ArrowIcon direction="left" />
          이전
        </button>
        {/* B02-1 다음 / 마지막 질문에서는 B02-2 결과 보기 */}
        <button
          type="button"
          className={`btn btn-m diag-next${hasPick ? ' btn-primary' : ''}`}
          disabled={!hasPick}
          onClick={goNext}
        >
          {isLast ? '결과 보기' : '다음'}
          <ArrowIcon direction="right" />
        </button>
      </nav>
    </main>
  )
}

export default Diagnosis
