import { useState, useEffect } from 'react'
import Lockscreen from './components/Lockscreen'
import VideoBackground from './components/VideoBackground'
import VolumeControl from './components/VolumeControl'
import MainContainer from './components/MainContainer'
import MusicPlayer from './components/MusicPlayer'
import DiaryWindow from './components/DiaryWindow'
import ViewCounter from './components/ViewCounter'
import { useRainAudio } from './hooks/useRainAudio'
import { useCursorSparkles } from './hooks/useCursorSparkles'

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showMusic, setShowMusic] = useState(false)
  const [isDiaryOpen, setDiaryOpen] = useState(false)

  useRainAudio(isUnlocked)
  useCursorSparkles()

  function handleUnlock() {
    setIsUnlocked(true)
    // Sequence matches original: container first, then music player after 1s
    setTimeout(() => setShowContent(true), 100)
    setTimeout(() => setShowMusic(true), 1100)
  }

  // Block devtools (matching original blockDevTools.js)
  useEffect(() => {
    const block = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault()
      }
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

      <div className="fixed inset-0 flex flex-col items-center justify-center gap-0 pointer-events-none">
        <div className="pointer-events-auto w-full flex flex-col items-center gap-0">
          <MainContainer
            isVisible={showContent}
            onDiaryToggle={() => setDiaryOpen(d => !d)}
          />
          <MusicPlayer isVisible={showMusic} isUnlocked={isUnlocked} />
        </div>
      </div>

      <DiaryWindow isOpen={isDiaryOpen} onClose={() => setDiaryOpen(false)} />
      <ViewCounter />
    </>
  )
}
