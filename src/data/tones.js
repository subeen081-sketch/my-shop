// 진단 결과 톤별 문구 (P03 S03-1)
export const TONES = {
  cool: {
    label: '쿨 톤',
    title: '나의 립 컬러는 쿨 톤',
    desc: '로즈, 베리, 플럼처럼 푸른빛이 섞인 컬러가 얼굴을 맑고 화사하게 밝혀 줘요. 아래에서 어울리는 립을 골라 보세요.',
    back: '푸른빛이 도는 맑은 컬러가 잘 어울려요',
  },
  warm: {
    label: '웜 톤',
    title: '나의 립 컬러는 웜 톤',
    desc: '코랄, 피치, 브릭처럼 노란빛이 섞인 컬러가 얼굴을 생기 있고 따뜻하게 밝혀 줘요. 아래에서 어울리는 립을 골라 보세요.',
    back: '노란빛이 도는 따뜻한 컬러가 잘 어울려요',
  },
  neutral: {
    label: '뉴트럴 톤',
    title: '나의 립 컬러는 뉴트럴 톤',
    desc: '노란빛과 푸른빛이 고르게 섞여 있어, 로즈 누드나 피치처럼 너무 진하지 않은 컬러가 자연스럽게 잘 어울려요. 아래에서 어울리는 립을 골라 보세요.',
    back: '노란빛과 푸른빛 사이, 부드러운 컬러가 잘 어울려요',
  },
}

// 주소의 ?tone= 값이 없거나 잘못되면 쿨 톤(기존 기본 화면)
export const toTone = (value) => (value && Object.hasOwn(TONES, value) ? value : 'cool')

// 진단 답 → 톤. 웜 +1 / 쿨 +1 / 나머지 0점, 같으면 뉴트럴 톤
// scoring: { [문항 번호]: { [선택지]: 'warm' | 'cool' } }
export function judgeTone(answers, scoring) {
  let warm = 0
  let cool = 0
  for (const [step, picked] of Object.entries(answers)) {
    const side = scoring[step]?.[picked]
    if (side === 'warm') warm += 1
    if (side === 'cool') cool += 1
  }
  if (warm > cool) return 'warm'
  if (cool > warm) return 'cool'
  return 'neutral'
}
