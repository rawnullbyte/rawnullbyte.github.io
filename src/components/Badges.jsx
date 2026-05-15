import { useState } from 'react'

const BADGE_DEFS = [
  {
    key: 'dev',
    label: 'Developer',
    svg: (
      <path d="m21.58 11.4-4.28-7.39-.35-.6h-9.91l-.35.6-4.27 7.39-.35.6.35.6 4.27 7.39.35.6h9.92l.35-.6 4.28-7.39.35-.6zm-13.07-1.03-1.63 1.63 1.63 1.63v2.73l-4.36-4.36 4.37-4.37v2.74zm3.12 6.93-2.04-.63 3.1-9.98 2.04.64zm3.86-.93v-2.73l1.63-1.64-1.63-1.63v-2.74l4.36 4.37z" />,
    ),
    vb: '0 0 24 24',
    w: '1.3em',
    h: '1.3em',
  },
  {
    key: 'certif',
    label: 'Certified',
    svg: (
      <path d="m8.6 22.5-1.9-3.2-3.6-.8.35-3.7L1 12l2.45-2.8-.35-3.7 3.6-.8 1.9-3.2L12 2.95l3.4-1.45 1.9 3.2 3.6.8-.35 3.7L23 12l-2.45 2.8.35 3.7-3.6.8-1.9 3.2-3.4-1.45-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45-4.25 4.25-2.15-2.1L7.4 12l3.55 3.55Z" />,
    ),
    vb: '1 1.5 22 21',
    w: '1em',
    h: '1em',
  },
  {
    key: 'premium',
    label: 'Premium',
    svg: (
      <path d="M396.31 32H264l84.19 112.26L396.31 32zm-280.62 0l48.12 112.26L248 32H115.69zM256 74.67L192 160h128l-64-85.33zm166.95-23.61L376.26 160H488L422.95 51.06zm-333.9 0L23 160h112.74L89.05 51.06zM146.68 192H24l222.8 288h.53L146.68 192zm218.64 0L264.67 480h.53L488 192H365.32zm-35.93 0H182.61L256 400l73.39-208z" />,
    ),
    vb: '23 32 465 448',
    w: '1.3em',
    h: '1em',
  },
  {
    key: 'staff',
    label: 'Staff',
    svg: (
      <path d="m16.06 13.09 5.63 5.59-3.32 3.28-5.59-5.59v-.92l2.36-2.36h.92m.91-2.53L16 9.6l-4.79 4.8v1.97L5.58 22 2.3 18.68l5.59-5.59h1.97l.78-.78L6.8 8.46H5.5L2.69 5.62 5.31 3l2.8 2.8v1.31L12 10.95l2.66-2.66-.96-1.01L15 5.97h-2.66l-.65-.65L15 2l.66.66v2.66L16.97 4l3.28 3.28c1.09 1.1 1.09 2.89 0 3.98l-1.97-2.01-1.31 1.31Z" />,
    ),
    vb: '1 1.5 22 21',
    w: '1em',
    h: '1em',
  },
]

export default function Badges() {
  const [tooltip, setTooltip] = useState({ label: '', x: 0, y: 0, visible: false })

  function showTip(e, label) {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({ label, x: rect.left + rect.width / 2, y: rect.top - 10, visible: true })
  }

  function hideTip() {
    setTooltip(t => ({ ...t, visible: false }))
  }

  return (
    <>
      <div className="profile-badges">
        {BADGE_DEFS.map(({ key, label, svg, vb, w, h }) => (
          <div
            key={key}
            className="profile-badge"
            onMouseEnter={e => showTip(e, label)}
            onMouseLeave={hideTip}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={w}
              height={h}
              viewBox={vb}
              style={{ fill: '#ffffff', filter: 'drop-shadow(0 0 1.5px #ffffff)' }}
            >
              {svg}
            </svg>
          </div>
        ))}
      </div>

      {tooltip.visible && (
        <div
          className="badge-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            opacity: 1,
            visibility: 'visible',
          }}
        >
          {tooltip.label}
        </div>
      )}
    </>
  )
}
