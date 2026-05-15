import { useState, useEffect, useRef } from 'react'

const PLAYLIST = [
  "losing contact 道 - I want to stop having nightmares when I go to bed.",
  "mayoi namekuji - my muse readth",
  "stillveil - I'm tired of my life",
  "stillveil, Mempty - Please forget me",
  "lolipushing - choker",
  "Ashen Blood - a distant memory (ft. sovietico)",
  "Ashen Blood - as i watch everything fall",
  "Ashen Blood - losing myself",
  "Ashen Blood - nothing feels real anymore",
  "Ashen Blood - please... be quiet",
  "i don't really feel like eating anymore - for you",
  "i want to throw up - i want to throw up",
  "Loli in early 20s - Da Da Is Tape To And U U U",
  "cyygnil - 081125",
  "redeath - i need you",
]

function trackSrc(name) {
  return `/songs/${name}.mp3`
}

function fmt(t) {
  if (!t || isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export function useMusicPlayer(isUnlocked, volume = 1) {
  const audioRef = useRef(null)
  const playingRef = useRef(false)
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Init audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.volume = 1
    audioRef.current = audio

    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onPlay = () => { setPlaying(true); playingRef.current = true }
    const onPause = () => { setPlaying(false); playingRef.current = false }
    const onEnd = () => setIdx(i => (i + 1) % PLAYLIST.length)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnd)

    // Spacebar toggles play/pause
    function onKey(e) {
      if (e.code !== 'Space') return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
      e.preventDefault()
      audio.paused ? audio.play().catch(() => {}) : audio.pause()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnd)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // Load track when idx changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = trackSrc(PLAYLIST[idx])
    audio.load()
    setCurrentTime(0)
    setDuration(0)
    if (playingRef.current) audio.play().catch(() => {})
  }, [idx])

  // Auto-play on unlock
  useEffect(() => {
    if (!isUnlocked) return
    audioRef.current?.play().catch(() => {})
  }, [isUnlocked])

  // Sync volume from parent
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Media Session (MPRIS) — lets OS/browser control play/pause/skip
  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({ title: PLAYLIST[idx], artist: 'nullbyte.rip' })
    navigator.mediaSession.setActionHandler('play', () => audioRef.current?.play().catch(() => {}))
    navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause())
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      playingRef.current = true
      setIdx(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
    })
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      playingRef.current = true
      setIdx(i => (i + 1) % PLAYLIST.length)
    })
  }, [idx])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    audio.paused ? audio.play().catch(() => {}) : audio.pause()
  }

  function prev() {
    playingRef.current = true
    setIdx(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  function next() {
    playingRef.current = true
    setIdx(i => (i + 1) % PLAYLIST.length)
  }

  function seek(pos) {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = pos * audio.duration
  }

  return {
    title: playing ? PLAYLIST[idx] : 'so quiet...',
    playing,
    currentTime: fmt(currentTime),
    totalTime: fmt(duration),
    progress: duration ? (currentTime / duration) * 100 : 0,
    togglePlay,
    prev,
    next,
    seek,
  }
}
