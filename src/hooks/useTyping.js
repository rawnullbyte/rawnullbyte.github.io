import { useState, useEffect, useRef } from 'react'

const STRINGS = ['.', '..', '...', 'Never / ever_Whatever... forever']
const TYPE_SPEED = 185
const ERASE_SPEED = 40
const LOOP_DELAY = 1000
const START_DELAY = 500

export function useTyping() {
  const [text, setText] = useState('')
  const state = useRef({ strIdx: 0, charIdx: 0, erasing: false })

  useEffect(() => {
    let timer

    function tick() {
      const s = state.current
      const current = STRINGS[s.strIdx]

      if (!s.erasing) {
        if (s.charIdx < current.length) {
          setText(current.slice(0, ++s.charIdx))
          timer = setTimeout(tick, TYPE_SPEED)
        } else {
          s.erasing = true
          timer = setTimeout(tick, LOOP_DELAY)
        }
      } else {
        if (s.charIdx > 0) {
          setText(current.slice(0, --s.charIdx))
          timer = setTimeout(tick, ERASE_SPEED)
        } else {
          s.erasing = false
          s.strIdx = (s.strIdx + 1) % STRINGS.length
          timer = setTimeout(tick, START_DELAY)
        }
      }
    }

    timer = setTimeout(tick, START_DELAY)
    return () => clearTimeout(timer)
  }, [])

  return text
}
