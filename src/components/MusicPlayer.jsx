import { useMusicPlayer } from '../hooks/useMusicPlayer'

function PrevIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" transform="rotate(180 12 12)" d="m7.58 16.89 5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82M16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="m7.58 16.89 5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82M16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2" />
    </svg>
  )
}

export default function MusicPlayer({ cardRef, isVisible, isUnlocked }) {
  const { title, playing, currentTime, totalTime, progress, prev, next, togglePlay, seek } =
    useMusicPlayer(isUnlocked)

  function handleTimelineClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    seek((e.clientX - rect.left) / rect.width)
  }

  return (
    <div
      ref={cardRef}
      className="music-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        transitionDelay: isVisible ? '0ms' : '0ms',
      }}
    >
      <div className="music-player">
        <div className="song-info text-center text-white mb-1 font-bold">
          <span className="song-title">{title}</span>
        </div>

        <div className="player-timeline">
          <span className="text-xs mr-1" style={{ opacity: 0.9 }}>{currentTime}</span>
          <div className="timeline-track" onClick={handleTimelineClick}>
            <div className="timeline-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs ml-1" style={{ opacity: 0.9 }}>{totalTime}</span>
        </div>

        <div className="player-controls">
          <span className="ctrl-prev" onClick={prev}><PrevIcon /></span>
          <span className="ctrl-play" onClick={togglePlay}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </span>
          <span className="ctrl-next" onClick={next}><NextIcon /></span>
        </div>
      </div>
    </div>
  )
}
