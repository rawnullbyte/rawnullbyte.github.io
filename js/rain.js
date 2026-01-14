(() => {
    console.log('[audio] init');

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    console.log('[audio] AudioContext state:', ctx.state);

    let buffer = null;
    let source = null;
    let gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    let unlocked = false;

    function startLoop() {
        console.log('[audio] startLoop() called');
        console.log('[audio] unlocked:', unlocked, 'buffer:', !!buffer, 'ctx.state:', ctx.state);

        if (!unlocked) {
            console.log('[audio] blocked: not unlocked yet');
            return;
        }
        if (!buffer) {
            console.log('[audio] blocked: buffer not ready');
            return;
        }

        if (source) {
            console.log('[audio] stopping previous source');
            try { source.stop(); } catch { }
        }

        source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        // Reset gain for fade-in
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 3); // 3s fade-in

        source.connect(gainNode);
        source.start(0);

        console.log('[audio] source started with fade-in');
    }

    // Load audio
    console.log('[audio] fetching rain.mp3');
    fetch('img/rain.mp3')
        .then(r => {
            console.log('[audio] fetch response:', r.status);
            return r.arrayBuffer();
        })
        .then(b => {
            console.log('[audio] decoding audio');
            return ctx.decodeAudioData(b);
        })
        .then(decoded => {
            console.log('[audio] decode complete');
            buffer = decoded;
            startLoop();
        })
        .catch(err => {
            console.error('[audio] load/decode error:', err);
        });

    // Unlock event
    document.addEventListener('unlock', async () => {
        console.log('[audio] unlock event received');
        unlocked = true;

        console.log('[audio] ctx.state before resume:', ctx.state);
        try {
            await ctx.resume();
            console.log('[audio] ctx.state after resume:', ctx.state);
        } catch (e) {
            console.error('[audio] resume failed:', e);
        }

        startLoop();
    });

    // Keep alive
    const keepAlive = async () => {
        console.log('[audio] keepAlive fired, ctx.state:', ctx.state);
        if (unlocked && ctx.state !== 'running') {
            try {
                await ctx.resume();
                console.log('[audio] ctx resumed in keepAlive');
                startLoop();
            } catch (e) {
                console.error('[audio] keepAlive resume failed:', e);
            }
        }
    };

    document.addEventListener('visibilitychange', keepAlive);
    window.addEventListener('focus', keepAlive);
})();
