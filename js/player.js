document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('.audioPlayer');
    const playIcon = document.querySelector('.play-pause');
    const pauseIcon = document.querySelector('.pause-icon');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');
    const currentTime = document.querySelector('.current-time');
    const totalTime = document.querySelector('.total-time');
    const songTitleElement = document.querySelector('.song-title');
    const volumeSlider = document.querySelector('.volume-slider');

    // Store the original song title
    let originalTitle = '';

    // Playlist
    const playlist = [
        "songs/mayoi namekuji - my muse readth.mp3",
        "songs/stillveil - I'm tired of my life.mp3",
        "songs/stillveil, Mempty - Please forget me.mp3",
        "songs/losing contact 道 - I want to stop having nightmares when I go to bed..mp3",
        "songs/lolipushing - choker.mp3",
        "songs/Ashen Blood - a distant memory (ft. sovietico).mp3",
        "songs/Ashen Blood - as i watch everything fall.mp3",
        "songs/Ashen Blood - losing myself.mp3",
        "songs/Ashen Blood - nothing feels real anymore.mp3",
        "songs/Ashen Blood - please... be quiet.mp3",
        "songs/i don't really feel like eating anymore - for you.mp3",
        "songs/i want to throw up - i want to throw up.mp3",
        "songs/Loli in early 20s - Da Da Is Tape To And U U U.mp3",
        "songs/cyygnil - 081125.mp3",
        "songs/redeath - i need you.mp3"
    ];

    let currentIndex = 0;

    function loadTrack(index) {
        const track = playlist[index];
        audio.src = track;
        audio.load();

        // Display filename as title without .mp3
        const fileName = track.split('/').pop().replace(/\.mp3$/i, '');
        originalTitle = fileName; // Store the original title
        songTitleElement.textContent = fileName;
    }

    loadTrack(currentIndex);

    // Update icons and title
    function updateIcons() {
        if (audio.paused) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            // Change title to "so quiet..." when paused
            songTitleElement.textContent = 'so quiet...';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            // Restore original title when playing
            songTitleElement.textContent = originalTitle;
        }
    }

    // Also update when track loads to ensure title is correct
    audio.addEventListener('loadedmetadata', () => {
        // Make sure original title is shown when track loads
        songTitleElement.textContent = originalTitle;
        totalTime.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('play', updateIcons);
    audio.addEventListener('pause', updateIcons);

    // Play/pause toggle
    function togglePlayPause() {
        audio.paused ? audio.play() : audio.pause();
    }
    playIcon.addEventListener('click', togglePlayPause);
    pauseIcon.addEventListener('click', togglePlayPause);

    // Previous / next
    prevButton?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentIndex);
        audio.play();
    });
    nextButton?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadTrack(currentIndex);
        audio.play();
    });

    // Timeline seek
    timeline?.addEventListener('click', e => {
        const rect = timeline.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    // Timeline update
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            timelineProgress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
            currentTime.textContent = formatTime(audio.currentTime);
        }
    });

    // Auto-play next track when current track ends
    audio.addEventListener('ended', () => {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadTrack(currentIndex);
        audio.play();
    });

    function formatTime(time) {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // Volume control
    volumeSlider?.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });

    // Auto-play after unlock
    document.addEventListener('unlock', () => {
        audio.play().catch(err => console.log('Audio play blocked:', err));
    });
});
