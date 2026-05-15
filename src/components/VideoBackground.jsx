export default function VideoBackground() {
  return (
    <div className="video-container">
      <div
        className="placeholder"
        style={{ backgroundImage: "url('/img/placeholder.png')" }}
      />
      <video autoPlay muted loop playsInline disablePictureInPicture style={{ filter: 'contrast(1.2)' }}>
        <source src="/img/ingame.mp4" type="video/mp4" />
        <source src="/img/ingame.webm" type="video/webm" />
      </video>
    </div>
  )
}
