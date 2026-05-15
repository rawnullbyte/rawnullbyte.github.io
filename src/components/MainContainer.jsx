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

export default function MainContainer({ cardRef, isVisible }) {
  const bio = useTyping()

  return (
    <div
      ref={cardRef}
      className="profile-card"
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <FadeEl delay={700} isVisible={isVisible}>
        <img className="profile-avatar" src="/img/pfp.png" alt="avatar" />
      </FadeEl>

      <div className="flex flex-col items-center max-w-[27rem] text-center">
        <FadeEl delay={1000} isVisible={isVisible}>
          <h1 className="profile-username">
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

      <FadeEl delay={1700} isVisible={isVisible}>
        <DiscordPresence />
      </FadeEl>

      <FadeEl delay={1800} isVisible={isVisible}>
        <SocialLinks />
      </FadeEl>
    </div>
  )
}
