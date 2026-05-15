import { useState, useEffect, useRef } from 'react'
import { marked } from 'marked'

export default function DiaryWindow({ isOpen, onClose }) {
  const [entries, setEntries] = useState([])
  const [loaded, setLoaded] = useState(false)
  const windowRef = useRef(null)
  const headerRef = useRef(null)
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 })
  const posRef = useRef({ x: 100, y: 100 })

  // Load diary.md once
  useEffect(() => {
    if (loaded) return
    setLoaded(true)
    fetch('/diary.md')
      .then(r => { if (!r.ok) throw new Error('not found'); return r.text() })
      .then(text => {
        const chunks = text.split(/^---$/m).map(c => c.trim()).filter(Boolean)
        const parsed = []
        for (let i = 0; i < chunks.length; i += 2) {
          const meta = chunks[i]
          const body = chunks[i + 1]
          if (!body) continue
          const dateMatch = meta.match(/date:\s*(.*)/i)
          parsed.unshift({ date: dateMatch ? dateMatch[1] : 'Undated', html: marked.parse(body) })
        }
        setEntries(parsed)
      })
      .catch(() => setEntries([{ date: '', html: '<p style="color:gray;padding:20px">Error loading diary.</p>' }]))
  }, [])

  // Dragging
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    function onDown(e) {
      const win = windowRef.current
      if (!win) return
      const rect = win.getBoundingClientRect()
      dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, origX: rect.left, origY: rect.top }
      posRef.current = { x: rect.left, y: rect.top }
      win.style.transition = 'none'
    }

    function onMove(e) {
      const d = dragRef.current
      if (!d.dragging) return
      const win = windowRef.current
      const dx = e.clientX - d.startX
      const dy = e.clientY - d.startY
      const nx = d.origX + dx
      const ny = d.origY + dy
      posRef.current = { x: nx, y: ny }
      win.style.left = nx + 'px'
      win.style.top = ny + 'px'
      // Skew effect during drag
      const skew = Math.max(-15, Math.min(15, dx / 10))
      win.style.transform = `scale(1) translateY(0) skewX(${skew}deg)`
    }

    function onUp() {
      if (!dragRef.current.dragging) return
      dragRef.current.dragging = false
      const win = windowRef.current
      if (!win) return
      win.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'
      win.style.transform = 'scale(1) translateY(0) skewX(0deg)'
      setTimeout(() => { if (windowRef.current) windowRef.current.style.transition = '' }, 350)
    }

    header.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      header.removeEventListener('mousedown', onDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div
      ref={windowRef}
      className={`diary-window ${isOpen ? 'active' : ''}`}
      style={{ left: posRef.current.x, top: posRef.current.y }}
    >
      <div ref={headerRef} className="diary-header">
        <span>Diary</span>
        <div className="close-diary" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>

      <div className="diary-content-area">
        {entries.map((entry, i) => (
          <div key={i} className="mb-[30px] border-b border-white/[0.08] pb-5">
            <div className="font-bold text-[#dfdfdf] mb-2">{entry.date}</div>
            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
          </div>
        ))}
      </div>
    </div>
  )
}
