import { useCallback, useEffect, useRef, useState } from 'react'

// 잠깐 보였다 사라지는 안내 문구(토스트) 상태
export function useToast(duration = 2400) {
  const [message, setMessage] = useState(null)
  const timer = useRef(null)

  const show = useCallback(
    (text) => {
      if (!text) return
      clearTimeout(timer.current)
      setMessage(text)
      timer.current = setTimeout(() => setMessage(null), duration)
    },
    [duration],
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  return { message, show }
}
