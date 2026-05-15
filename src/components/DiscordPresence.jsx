import { useDiscord } from '../hooks/useDiscord'

export default function DiscordPresence() {
  const { displayName, username, avatarUrl, statusImg } = useDiscord()

  return (
    <div className="presence-wrapper">
      <div className="presence-card">
        <div className="discord-infos">
          <div className="discord-avatar-wrap">
            {avatarUrl && (
              <img
                className="avatar-img"
                src={avatarUrl}
                alt="Discord Avatar"
                crossOrigin="anonymous"
              />
            )}
            {!avatarUrl && (
              <div
                className="avatar-img"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              />
            )}
            <img className="status-dot" src={statusImg} alt="status" />
          </div>

          <div className="discord-activity">
            <div className="discord-user">
              <div className="flex items-center gap-1">
                <span className="discord-display-name">{displayName}</span>
              </div>
              <h3 className="discord-username">{username}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
