import { useDiscord } from '../hooks/useDiscord'

export default function DiscordPresence() {
  const { displayName, username, avatarUrl, statusImg } = useDiscord()

  return (
    <div className="flex justify-center max-w-[28rem] w-full">
      <div className="mt-5 max-[480px]:mt-[50px] flex items-center bg-white/[0.07] border-2 border-white/[0.05] rounded-[25px] max-w-fit">
        <div className="flex gap-[10px] justify-start p-[10px] whitespace-nowrap">
          <div className="flex relative flex-shrink-0">
            {avatarUrl
              ? <img className="rounded-full h-[70px] w-[70px] object-cover" src={avatarUrl} alt="Discord Avatar" crossOrigin="anonymous" />
              : <div className="rounded-full h-[70px] w-[70px] bg-white/10" />
            }
            <img className="absolute bottom-0.5 right-0.5 h-[17px] w-[17px] object-cover" src={statusImg} alt="status" />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-0.5 justify-center">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xl text-white">{displayName}</span>
              </div>
              <h3 className="text-[13.5px] text-white/70 italic text-left">{username}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
