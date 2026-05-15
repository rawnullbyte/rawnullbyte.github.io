import { useEffect } from 'react'

const SPARKLES = 7
const LIFETIME = 30
const STAR_SIZE = 10
const COLORS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFDDD']
const STAR_PATH = 'M502.842,225.679c14.769-14.769,6.892-40.369-13.785-43.323l-119.138-17.723c-7.877-0.985-15.754-6.892-18.708-13.785L298.042,42.54c-8.862-18.708-36.431-18.708-45.292,0L199.58,150.848c-3.938,7.877-10.831,12.8-18.708,13.785L60.749,182.356c-20.677,2.954-29.538,28.554-13.785,43.323l85.662,83.692c5.908,5.908,8.862,13.785,6.892,22.646l-20.677,118.154c-1.969,14.769,6.892,26.585,19.692,29.538c0.985-2.954,2.954-5.908,6.892-6.892c41.354-9.846,73.846-35.446,107.323-61.046c6.892-5.908,13.785,0.985,14.769,7.877c5.908-1.969,12.8-0.985,18.708,1.969l106.338,56.123c18.708,9.846,40.369-5.908,36.431-26.585l-20.677-118.154c-0.985-7.877,0.985-16.738,6.892-22.646L502.842,225.679z'

export function useCursorSparkles() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `@keyframes twinkle{0%{opacity:0.9}50%{opacity:0.36}100%{opacity:0.9}}`
    document.head.appendChild(style)

    const stars = [], starX = [], starY = [], starRot = [], starTicks = []
    const dots = [], dotX = [], dotY = [], dotTicks = []
    let vH = window.innerHeight
    let vW = window.innerWidth
    let rafId = null
    let bgInterval = null

    const svgNS = 'http://www.w3.org/2000/svg'

    for (let i = 0; i < SPARKLES; i++) {
      const dot = document.createElement('div')
      Object.assign(dot.style, {
        position: 'fixed', top: '0', left: '0',
        height: '3px', width: '3px', overflow: 'hidden',
        visibility: 'hidden', zIndex: '999',
        borderRadius: '50%', pointerEvents: 'none',
      })
      document.body.appendChild(dot)
      dots[i] = dot; dotTicks[i] = null

      const wrap = document.createElement('div')
      Object.assign(wrap.style, {
        position: 'fixed', top: '0', left: '0',
        height: STAR_SIZE + 'px', width: STAR_SIZE + 'px',
        overflow: 'visible', visibility: 'hidden',
        zIndex: '999', pointerEvents: 'none',
      })
      const svg = document.createElementNS(svgNS, 'svg')
      svg.setAttribute('height', STAR_SIZE + 'px'); svg.setAttribute('width', STAR_SIZE + 'px')
      svg.setAttribute('viewBox', '0 0 511.45 511.45'); svg.style.overflow = 'visible'
      const path = document.createElementNS(svgNS, 'path')
      path.setAttribute('d', STAR_PATH)
      svg.appendChild(path); wrap.appendChild(svg)
      document.body.appendChild(wrap)
      stars[i] = wrap; starRot[i] = 0; starTicks[i] = null
    }

    function randColor() { return COLORS[Math.floor(Math.random() * COLORS.length)] }

    function starToTiny(i) {
      if (starTicks[i] === null) return
      const color = stars[i].querySelector('path').getAttribute('fill') || '#fff'
      if (starY[i] + STAR_SIZE / 2 < vH && starX[i] + STAR_SIZE / 2 < vW) {
        dotTicks[i] = LIFETIME * 2
        dotY[i] = starY[i] + STAR_SIZE / 2
        dotX[i] = starX[i] + STAR_SIZE / 2
        Object.assign(dots[i].style, {
          transform: `translate(${dotX[i]}px,${dotY[i]}px)`,
          width: '2px', height: '2px',
          backgroundColor: color, boxShadow: `0 0 3px ${color}`,
          opacity: '0.72', visibility: 'visible',
        })
      }
      starTicks[i] = null
      stars[i].style.visibility = 'hidden'
    }

    function createStar(x, y, prob = 1) {
      if (x + STAR_SIZE >= vW || y + STAR_SIZE >= vH) return
      if (Math.random() > prob) return
      let minLife = LIFETIME * 2 + 1, minIdx = NaN
      for (let i = 0; i < SPARKLES; i++) {
        if (!starTicks[i]) { minLife = null; minIdx = i; break }
        else if (starTicks[i] < minLife) { minLife = starTicks[i]; minIdx = i }
      }
      if (minLife) starToTiny(minIdx)
      if (isNaN(minIdx)) return
      const color = randColor()
      const scale = 0.5 + Math.random() * 0.5
      starRot[minIdx] = Math.random() * 360
      stars[minIdx].querySelector('path').setAttribute('fill', color)
      stars[minIdx].firstChild.style.transform = `scale(${scale})`
      stars[minIdx].style.filter = `drop-shadow(0 0 3px ${color})`
      stars[minIdx].style.animation = `twinkle ${1 + Math.random()}s infinite alternate`
      stars[minIdx].style.transform = `translate(${x}px,${y}px) rotate(${starRot[minIdx]}deg)`
      stars[minIdx].style.visibility = 'visible'
      starX[minIdx] = x; starY[minIdx] = y
      starTicks[minIdx] = LIFETIME * 2
    }

    function updateStar(i) {
      if (starTicks[i] === null) return
      starTicks[i]--
      if (starTicks[i] === 0) { starToTiny(i); return }
      starY[i] += 0.5 + Math.random()
      starX[i] += (i % 5 - 2) / 6
      starRot[i] += (Math.random() - 0.5) * 2
      if (starY[i] + STAR_SIZE < vH && starX[i] + STAR_SIZE < vW) {
        stars[i].style.transform = `translate(${starX[i]}px,${starY[i]}px) rotate(${starRot[i]}deg)`
      } else {
        starTicks[i] = null
        stars[i].style.visibility = 'hidden'
      }
    }

    function updateDot(i) {
      if (dotTicks[i] === null) return
      dotTicks[i]--
      if (dotTicks[i] === 0) { dots[i].style.visibility = 'hidden'; return }
      dotY[i] += 0.7 + Math.random()
      dotX[i] += (i % 4 - 2) / 5
      if (dotY[i] + 3 < vH && dotX[i] + 3 < vW) {
        dots[i].style.transform = `translate(${dotX[i]}px,${dotY[i]}px)`
      } else {
        dotTicks[i] = null
        dots[i].style.visibility = 'hidden'
      }
    }

    function loop() {
      for (let i = 0; i < SPARKLES; i++) { updateStar(i); updateDot(i) }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const onMove = (e) => {
      if (e.buttons) return
      const dist = Math.sqrt(e.movementX ** 2 + e.movementY ** 2)
      if (dist < 1) return
      if (dist > 5) {
        for (let i = 0; i < 3; i++) createStar(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20, 0.7)
      }
      let mx = e.clientX, my = e.clientY
      const safeD = Math.max(dist, 0.1)
      const dx = e.movementX * 10000 * 2 / safeD, dy = e.movementY * 10000 * 2 / safeD
      let cx = 0
      const prob = dist / 10000
      while (Math.abs(cx) < Math.abs(e.movementX)) {
        createStar(mx, my, prob)
        const d = Math.random(); mx -= dx * d; my -= dy * d; cx += dx * d
        if (Math.abs(dx * d) < 0.001) break
      }
    }

    bgInterval = setInterval(() => createStar(Math.random() * vW, Math.random() * vH, 0.3), 500)

    const onResize = () => { vH = window.innerHeight; vW = window.innerWidth }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(bgInterval)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      stars.forEach(el => el.remove())
      dots.forEach(el => el.remove())
      style.remove()
    }
  }, [])
}
