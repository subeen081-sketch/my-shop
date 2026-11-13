import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import './ArrowCursor.css'

// 립핏 화살표 커서: 움직이는 방향으로 화살촉이 돌아가고, 멈추면 기본 방향(왼쪽 위)으로 돌아옴
// - 마우스(정밀 포인터)에서만 켜지고, 터치 기기에서는 기본 커서를 그대로 씀
// - 입력창과 data-cursor="native" 영역에서는 기본 커서로 바뀜

const REST_ANGLE = -135 // 화살촉이 왼쪽 위를 향하는 기본 방향
const MIN_MOVE = 4 // 이 거리(px)보다 작게 움직이면 방향을 바꾸지 않음
const INTERACTIVE = 'a, button, [role="button"], label, select, summary'
const NATIVE =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"], [data-cursor="native"]'

// 현재 각도에서 목표 각도까지 가장 짧게 도는 값
const nearest = (from, to) => from + ((((to - from) % 360) + 540) % 360) - 180

export default function ArrowCursor({ size = 36, idleDelay = 700 }) {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default') // default | hover | native
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rotate = useSpring(REST_ANGLE, { stiffness: 260, damping: 20, mass: 0.6 })
  const scale = useSpring(1, { stiffness: 420, damping: 26 })

  const angle = useRef(REST_ANGLE)
  const last = useRef(null)
  const idle = useRef(null)

  // 마우스가 있는 환경에서만 켬
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-arrow-cursor')

    const turnTo = (deg) => {
      angle.current = nearest(angle.current, deg)
      rotate.set(angle.current)
    }

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const el = e.target instanceof Element ? e.target : null
      const next = el?.closest(NATIVE) ? 'native' : el?.closest(INTERACTIVE) ? 'hover' : 'default'
      setMode((prev) => (prev === next ? prev : next))

      if (reduce) return
      const p = last.current
      if (!p) {
        last.current = { x: e.clientX, y: e.clientY }
        return
      }
      const dx = e.clientX - p.x
      const dy = e.clientY - p.y
      if (dx * dx + dy * dy < MIN_MOVE * MIN_MOVE) return
      last.current = { x: e.clientX, y: e.clientY }
      turnTo((Math.atan2(dy, dx) * 180) / Math.PI)

      clearTimeout(idle.current)
      idle.current = setTimeout(() => turnTo(REST_ANGLE), idleDelay)
    }
    const onDown = (e) => {
      if (e.button === 0) setDown(true)
    }
    const onUp = () => setDown(false)
    const onLeave = (e) => {
      if (!e.relatedTarget) {
        setVisible(false)
        last.current = null
      }
    }
    const onBlur = () => {
      setVisible(false)
      setDown(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseout', onLeave)
    window.addEventListener('blur', onBlur)
    return () => {
      root.classList.remove('has-arrow-cursor')
      clearTimeout(idle.current)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseout', onLeave)
      window.removeEventListener('blur', onBlur)
    }
  }, [enabled, reduce, idleDelay, x, y, rotate])

  // 누르면 작게, 버튼·링크 위에서는 크게
  useEffect(() => {
    scale.set(down ? 0.82 : mode === 'hover' ? 1.18 : 1)
  }, [down, mode, scale])

  if (!enabled) return null

  // 화살촉 끝(32x32 기준 28,16)이 실제 포인터 위치에 오도록 배치
  const svgStyle = { width: size, height: size, left: -(28 / 32) * size, top: -size / 2 }

  return createPortal(
    <motion.div
      className="arrow-cursor"
      aria-hidden="true"
      data-visible={visible && mode !== 'native' ? '' : undefined}
      data-hover={mode === 'hover' ? '' : undefined}
      style={{ x, y }}
    >
      <motion.div className="arrow-cursor__rotor" style={{ rotate, scale }}>
        <svg className="arrow-cursor__svg" viewBox="0 0 32 32" style={svgStyle}>
          <path d="M28 16 4.5 4.5 10.5 16 4.5 27.5Z" />
        </svg>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
