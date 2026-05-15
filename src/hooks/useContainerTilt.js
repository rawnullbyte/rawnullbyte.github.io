import { useEffect, useRef } from 'react'

export function useContainerTilt(refs, intensity = 10) {
  const stateRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, lastTime: 0 })
  const rafRef = useRef(null)
  const runningRef = useRef(false)

  useEffect(() => {
    const elements = refs.map(r => r.current).filter(Boolean)
    if (!elements.length) return

    function schedule() {
      if (runningRef.current) return
      runningRef.current = true
      elements.forEach(el => { el.style.willChange = 'transform' })
      stateRef.current.lastTime = performance.now()
      rafRef.current = requestAnimationFrame(animate)
    }

    function onMove(e) {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      stateRef.current.targetX = x * intensity
      stateRef.current.targetY = y * intensity
      schedule()
    }

    function onLeave() {
      stateRef.current.targetX = 0
      stateRef.current.targetY = 0
      schedule()
    }

    elements.forEach(el => {
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
    })

    function animate(now) {
      const s = stateRef.current
      const delta = Math.min(now - s.lastTime, 50)
      s.lastTime = now
      const factor = 1 - Math.pow(0.88, delta / 16.67)
      s.currentX += (s.targetX - s.currentX) * factor
      s.currentY += (s.targetY - s.currentY) * factor

      elements.forEach(el => {
        el.style.transform = `perspective(1000px) rotateX(${-s.currentY}deg) rotateY(${s.currentX}deg)`
      })

      const atRest = Math.abs(s.currentX) < 0.01 && Math.abs(s.currentY) < 0.01
                  && Math.abs(s.targetX) < 0.01 && Math.abs(s.targetY) < 0.01
      if (atRest) {
        elements.forEach(el => { el.style.transform = ''; el.style.willChange = '' })
        runningRef.current = false
        return
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        el.style.willChange = ''
      })
      cancelAnimationFrame(rafRef.current)
      runningRef.current = false
    }
  }, [intensity])
}
