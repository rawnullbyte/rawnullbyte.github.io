const tracks = [{
	title: "waqs - sakura",
	src: "/assets/music/song1.mp3",
	cover: "/assets/music/song1img.png"
}, {
	title: "waqs - Pump Up The Volume Genocide",
	src: "/assets/music/song2.mp3",
	cover: "/assets/music/song2img.png"
}, {
	title: "kattmynta - whatever",
	src: "/assets/music/song3.mp3",
	cover: "/assets/music/song3img.jpg"
}, {
	title: "waqs - Tears",
	src: "/assets/music/song4.mp3",
	cover: "/assets/music/song4img.png"
}];

let currentTrackIndex = 0;
let isPreloaded = false;
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

// Preload next track while current track is playing
audioPlayer.addEventListener('play', () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    const nextTrack = tracks[nextIndex];
    
    // Create a new audio element for preloading
    const preloadAudio = new Audio(nextTrack.src);
    preloadAudio.preload = 'auto';
    preloadAudio.addEventListener('canplaythrough', () => {
        isPreloaded = true;
    });
});

// Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (!img.src) {
            img.dataset.src = img.src;
            img.src = '';
            imageObserver.observe(img);
        }
    });
};

// Add resource hints for better loading
const addResourceHints = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'audio';
    link.href = tracks[currentTrackIndex].src;
    document.head.appendChild(link);
};

// Initialize resource hints
addResourceHints();

// Update resource hints when track changes
const updateResourceHints = (index) => {
    const link = document.querySelector('link[rel="preload"][as="audio"]');
    if (link) {
        link.href = tracks[index].src;
    }
};
const trackCover = document.getElementById('track-cover');
const trackName = document.getElementById('track-name');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.querySelector('.progress-fill');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const progressBar = document.querySelector('.progress-bar');
const landingPage = document.querySelector('.landing');
const clickToEnter = document.querySelector('.click-to-enter');

function loadTrack(index) {
    const track = tracks[index];
    trackName.textContent = track.title;
    trackCover.src = track.cover;
    audioSource.src = track.src;
    audioPlayer.load();
    updateResourceHints(index);
    progressFill.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function togglePlay() {
	if (audioPlayer.paused) {
		audioPlayer.play();
		playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	} else {
		audioPlayer.pause();
		playBtn.innerHTML = '<i class="fas fa-play"></i>';
	}
}

function nextTrack() {
	currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
	loadTrack(currentTrackIndex);
	audioPlayer.play();
	playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function prevTrack() {
	currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
	loadTrack(currentTrackIndex);
	audioPlayer.play();
	playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

audioPlayer.addEventListener('timeupdate', () => {
	const {
		currentTime,
		duration
	} = audioPlayer;
	if (duration) {
		const progressPercent = (currentTime / duration) * 100;
		progressFill.style.width = `${progressPercent}%`;
		currentTimeEl.textContent = formatTime(currentTime);
		durationEl.textContent = formatTime(duration);
	}
});

progressBar.addEventListener('click', (e) => {
	const rect = progressBar.getBoundingClientRect();
	const clickX = e.clientX - rect.left;
	const totalWidth = rect.width;
	const clickRatio = clickX / totalWidth;
	if (audioPlayer.duration) {
		audioPlayer.currentTime = clickRatio * audioPlayer.duration;
	}
});

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
loadTrack(currentTrackIndex);

clickToEnter.addEventListener('click', () => {
	landingPage.classList.add('fade-out');
	setTimeout(() => {
		landingPage.style.display = 'none';
		audioPlayer.play();
		playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	}, 1000);
});

audioPlayer.addEventListener('ended', () => {
	nextTrack();
});

