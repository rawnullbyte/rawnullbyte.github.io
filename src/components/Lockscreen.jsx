export default function Lockscreen({ isUnlocked, onUnlock }) {
  return (
    <div
      className={`lockscreen ${isUnlocked ? 'unlocking' : ''}`}
      onClick={isUnlocked ? undefined : onUnlock}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="click-text">[ click to unlock ]</div>
      </div>
    </div>
  )
}
