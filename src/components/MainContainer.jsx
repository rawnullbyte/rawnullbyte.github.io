import { useRef, useEffect, useState } from 'react'
import { useContainerTilt } from '../hooks/useContainerTilt'
import { useTyping } from '../hooks/useTyping'
import Badges from './Badges'
import DiscordPresence from './DiscordPresence'
import SocialLinks from './SocialLinks'

function FadeEl({ delay, isVisible, children, className = '' }) {
  return (
    <div
      className={`fade-in-element ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function MainContainer({ isVisible, onDiaryToggle }) {
  const cardRef = useRef(null)
  useContainerTilt([cardRef])
  const bio = useTyping()

  return (
    <div
      ref={cardRef}
      className="profile-card"
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      {/* Diary toggle button */}
      <FadeEl delay={500} isVisible={isVisible}>
        <button className="diary-anchor" onClick={onDiaryToggle} aria-label="Open diary">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 432 512">
            <path
              fill="currentColor"
              d="M67 512h362v-43H67q-22 0-22-21t22-21h362V0H67Q39 0 21 18.5T3 64v363h4q-4 12-4 21q0 27 18 45.5T67 512zM45 64q0-21 22-21h320v341H67q-8 0-22 4V64zm86 107h192v42H131v-42zm0-86h192v43H131V85z"
            />
          </svg>
        </button>
      </FadeEl>

      {/* Avatar */}
      <FadeEl delay={700} isVisible={isVisible}>
        <img className="profile-avatar" src="/img/pfp.png" alt="avatar" />
      </FadeEl>

      {/* Profile layout */}
      <div className="flex flex-col items-center max-w-[27rem] text-center">
        <FadeEl delay={1000} isVisible={isVisible}>
          <h1 className="profile-username" style={{ color: '#ffffff', textShadow: '0 0 20px #ffffff' }}>
            N<span>ull</span>B<span>yte</span>
          </h1>
        </FadeEl>

        <FadeEl delay={1500} isVisible={isVisible}>
          <Badges />
        </FadeEl>

        <FadeEl delay={1600} isVisible={isVisible}>
          <h3 className="profile-bio">{bio}</h3>
        </FadeEl>
      </div>

      {/* Discord presence */}
      <FadeEl delay={1700} isVisible={isVisible}>
        <DiscordPresence />
      </FadeEl>

      {/* Social links */}
      <FadeEl delay={1800} isVisible={isVisible}>
        <SocialLinks />
      </FadeEl>
    </div>
  )
}
