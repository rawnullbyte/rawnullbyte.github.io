import { useEffect, useRef } from 'react'

export function useRainAudio(isUnlocked) {
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const bufferRef = useRef(null)
  const sourceRef = useRef(null)

  // Load buffer once on mount
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    ctxRef.current = ctx
    gainRef.current = gain

    fetch('/img/rain.mp3')
      .then(r => r.arrayBuffer())
      .then(b => ctx.decodeAudioData(b))
      .then(decoded => { bufferRef.current = decoded })
      .catch(() => {})

    return () => { try { ctx.close() } catch {} }
  }, [])

  function startLoop() {
    const ctx = ctxRef.current
    const gain = gainRef.current
    const buffer = bufferRef.current
    if (!ctx || !gain || !buffer) return
    if (sourceRef.current) { try { sourceRef.current.stop() } catch {} }

    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 3)
    src.connect(gain)
    src.start(0)
    sourceRef.current = src
  }

  // Start playing after unlock
  useEffect(() => {
    if (!isUnlocked) return
    const ctx = ctxRef.current
    if (!ctx) return
    ctx.resume().then(startLoop).catch(() => {})
  }, [isUnlocked])

  // Keep alive on visibility/focus change
  useEffect(() => {
    const keepAlive = async () => {
      const ctx = ctxRef.current
      if (!isUnlocked || !ctx || ctx.state === 'running') return
      await ctx.resume().catch(() => {})
      startLoop()
    }
    document.addEventListener('visibilitychange', keepAlive)
    window.addEventListener('focus', keepAlive)
    return () => {
      document.removeEventListener('visibilitychange', keepAlive)
      window.removeEventListener('focus', keepAlive)
    }
  }, [isUnlocked])
}
