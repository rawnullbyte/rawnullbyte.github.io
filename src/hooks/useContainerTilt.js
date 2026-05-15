import { useEffect, useRef } from 'react'

export function useContainerTilt(refs, intensity = 10) {
  const stateRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const elements = refs.map(r => r.current).filter(Boolean)
    if (!elements.length) return

    function onMove(e) {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      stateRef.current.targetX = x * intensity
      stateRef.current.targetY = y * intensity
    }

    function onLeave() {
      stateRef.current.targetX = 0
      stateRef.current.targetY = 0
    }

    elements.forEach(el => {
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
    })

    function animate() {
      const s = stateRef.current
      s.currentX += (s.targetX - s.currentX) * 0.1
      s.currentY += (s.targetY - s.currentY) * 0.1

      elements.forEach(el => {
        el.style.transform = `perspective(1000px) rotateX(${-s.currentY}deg) rotateY(${s.currentX}deg)`
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
      cancelAnimationFrame(rafRef.current)
    }
  }, [intensity])
}
