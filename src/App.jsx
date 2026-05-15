import { useState, useEffect, useRef } from 'react'
import Lockscreen from './components/Lockscreen'
import VideoBackground from './components/VideoBackground'
import VolumeControl from './components/VolumeControl'
import MainContainer from './components/MainContainer'
import MusicPlayer from './components/MusicPlayer'
import ViewCounter from './components/ViewCounter'
import { useRainAudio } from './hooks/useRainAudio'
import { useCursorSparkles } from './hooks/useCursorSparkles'
import { useContainerTilt } from './hooks/useContainerTilt'

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showMusic, setShowMusic] = useState(false)

  const profileRef = useRef(null)
  const musicRef = useRef(null)
  useContainerTilt([profileRef, musicRef])

  useRainAudio(isUnlocked)
  useCursorSparkles()

  function handleUnlock() {
    setIsUnlocked(true)
    setTimeout(() => setShowContent(true), 100)
    setTimeout(() => setShowMusic(true), 1200)
  }

  useEffect(() => {
    const block = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) e.preventDefault()
    }
    const blockCtx = (e) => e.preventDefault()
    document.addEventListener('keydown', block)
    document.addEventListener('contextmenu', blockCtx)
    return () => {
      document.removeEventListener('keydown', block)
      document.removeEventListener('contextmenu', blockCtx)
    }
  }, [])

  return (
    <>
      <Lockscreen isUnlocked={isUnlocked} onUnlock={handleUnlock} />
      <VideoBackground />
      <VolumeControl />

      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex flex-col items-center" style={{ marginTop: '-20px' }}>
          <MainContainer cardRef={profileRef} isVisible={showContent} />
          <MusicPlayer cardRef={musicRef} isVisible={showMusic} isUnlocked={isUnlocked} />
        </div>
      </div>

      <ViewCounter />
    </>
  )
}
