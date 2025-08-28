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

    // Function to format time
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Variable to control the first click
    let firstClickHappened = false;

    // Function for automatic playback with delay
    function autoPlayWithDelay() {
        if (!firstClickHappened) return;
        
        // 2-second delay after the first click
        setTimeout(() => {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }, 2000);
    }

    // Add site click event to enable autoplay
    document.addEventListener('click', () => {
        if (!firstClickHappened) {
            firstClickHappened = true;
            autoPlayWithDelay();
        }
    });

    // Function to skip forward or backward
    function skipTime(direction) {
        const skipAmount = 5; // 5 seconds
        if (direction === 'forward') {
            // Skip forward, but don't go past the end of the music
            audio.currentTime = Math.min(audio.currentTime + skipAmount, audio.duration);
        } else {
            // Skip backward, but don't go before the start of the music
            audio.currentTime = Math.max(audio.currentTime - skipAmount, 0);
        }
    }

    // Add skip events for prev and next
    prevButton.addEventListener('click', () => skipTime('backward'));
    nextButton.addEventListener('click', () => skipTime('forward'));

    // Load metadata
    audio.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(audio.duration);
    });

    // Play/pause toggle function
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Events on icons
    playIcon.addEventListener('click', togglePlayPause);
    pauseIcon.addEventListener('click', togglePlayPause);

    // Update progress
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        timelineProgress.style.width = `${progress}%`;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    // Increase clickable area without modifying appearance
    // Modify existing timeline to have a larger clickable area
    timeline.style.cursor = 'pointer';
    timeline.style.position = 'relative';
    
    // Create an invisible element to expand the clickable area
    const clickableArea = document.createElement('div');
    clickableArea.style.position = 'absolute';
    clickableArea.style.top = '-10px';  // Extends 10px upward
    clickableArea.style.bottom = '-10px'; // Extends 10px downward
    clickableArea.style.left = '0';
    clickableArea.style.right = '0';
    clickableArea.style.cursor = 'pointer';
    
    // Add the invisible element to the timeline
    timeline.appendChild(clickableArea);

    // Function to handle clicks anywhere in the clickable area
    function handleTimelineClick(e) {
        const rect = timeline.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    }

    // Add click event to the larger invisible element
    clickableArea.addEventListener('click', handleTimelineClick);
    
    // Keep the click event on the original timeline for compatibility
    timeline.addEventListener('click', handleTimelineClick);

    // Reset when finished
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('.audioPlayer');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeIcon = document.querySelector('.volume-icon');
    let lastVolume = 1; // Default volume set to 1 (100%)

    // Set initial volume
    audioPlayer.volume = lastVolume;
    volumeSlider.value = lastVolume;

    // Update initial volume icon
    volumeIcon.innerHTML = `<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77"></path>`;

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        audioPlayer.volume = volume;
        lastVolume = volume;

        // Update volume icon
        if (volume == 0) {
            volumeIcon.innerHTML = `<path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63m2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71M4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21L21 19.73l-9-9zM12 4L9.91 6.09L12 8.18z"></path>`;
        } else if (volume < 0.1) {
            volumeIcon.innerHTML = `<path fill="currentColor" d="M7 9v6h4l5 5V4l-5 5z"></path>`;
        } else {
            volumeIcon.innerHTML = `<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77"></path>`;
        }
    });

    // Clickable volume icon for mute/unmute
    volumeIcon.addEventListener('click', () => {
        if (audioPlayer.volume > 0) {
            lastVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.innerHTML = `<path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63m2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71M4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21L21 19.73l-9-9zM12 4L9.91 6.09L12 8.18z"></path>`;
        } else {
            audioPlayer.volume = lastVolume || 1; // Return to last volume or 100%
            volumeSlider.value = lastVolume || 1;
            
            // Restore icon based on volume
            if (lastVolume < 0.2) {
                volumeIcon.innerHTML = `<path fill="currentColor" d="M7 9v6h4l5 5V4l-5 5z"></path>`;
            } else {
                volumeIcon.innerHTML = `<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77"></path>`;
            }
        }
    });
});