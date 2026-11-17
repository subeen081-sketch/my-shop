import { useEffect, useState } from 'react'

// 마우스를 올리는 효과(호버)를 써도 되는 환경인지: 마우스가 있고 화면 폭 768px 이상
// 터치 기기와 모바일 폭(767px 이하)에서는 false → 호버 대신 누르는 동안의 모션만 씀 (CSS의 같은 기준과 맞춤)
const QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)'

export function useCanHover() {
  const [canHover, setCanHover] = useState(() => window.matchMedia?.(QUERY).matches ?? true)

  useEffect(() => {
    const mq = window.matchMedia?.(QUERY)
    if (!mq) return
    const sync = () => setCanHover(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return canHover
}
