import { useEffect, useRef } from 'react'

export function useRainAudio(isUnlocked, volume = 1) {
  const r = useRef({ ctx: null, gain: null, buffer: null, source: null, unlocked: false, volume: 1 })

  function start() {
    const s = r.current
    if (!s.ctx || !s.gain || !s.buffer || !s.unlocked) return
    if (s.source) { try { s.source.stop() } catch {} }
    const src = s.ctx.createBufferSource()
    src.buffer = s.buffer
    src.loop = true
    s.gain.gain.setValueAtTime(0, s.ctx.currentTime)
    s.gain.gain.linearRampToValueAtTime(s.volume, s.ctx.currentTime + 3)
    src.connect(s.gain)
    src.start(0)
    s.source = src
  }

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    r.current.ctx = ctx
    r.current.gain = gain

    fetch('/img/rain.mp3')
      .then(res => res.arrayBuffer())
      .then(buf => ctx.decodeAudioData(buf))
      .then(decoded => {
        r.current.buffer = decoded
        // If user already clicked unlock before buffer finished loading, start now
        if (r.current.unlocked) ctx.resume().then(start).catch(() => {})
      })
      .catch(() => {})

    const keepAlive = async () => {
      const s = r.current
      if (!s.unlocked || !s.ctx || s.ctx.state === 'running') return
      await s.ctx.resume().catch(() => {})
      start()
    }
    document.addEventListener('visibilitychange', keepAlive)
    window.addEventListener('focus', keepAlive)

    return () => {
      document.removeEventListener('visibilitychange', keepAlive)
      window.removeEventListener('focus', keepAlive)
      try { ctx.close() } catch {}
    }
  }, [])

  useEffect(() => {
    if (!isUnlocked) return
    r.current.unlocked = true
    const ctx = r.current.ctx
    if (ctx) ctx.resume().then(start).catch(() => {})
  }, [isUnlocked])

  useEffect(() => {
    r.current.volume = volume
    const s = r.current
    if (!s.gain || !s.ctx) return
    s.gain.gain.cancelScheduledValues(s.ctx.currentTime)
    s.gain.gain.setValueAtTime(volume, s.ctx.currentTime)
  }, [volume])
}
