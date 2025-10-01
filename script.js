



document.querySelector('a[href="#songs"]').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#songs').scrollIntoView({ behavior: 'smooth' });
});




// Track currently playing audio globally
let currentAudio = null;
let currentPlayBtn = null;

document.querySelectorAll('.player').forEach(player => {
    const audio = player.querySelector('.audio');
    const playBtn = player.querySelector('.playPause');
    const progress = player.querySelector('.progress');
    const time = player.querySelector('.time');

    // Play/Pause toggle
    playBtn.addEventListener('click', () => {
        // Pause any other audio
        if(currentAudio && currentAudio !== audio){
            currentAudio.pause();
            if(currentPlayBtn) currentPlayBtn.textContent = '▶️';
        }

        // Play or pause current audio
        if(audio.paused){
            audio.play();
            playBtn.textContent = '⏸️';
            currentAudio = audio;
            currentPlayBtn = playBtn;
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
            currentAudio = null;
            currentPlayBtn = null;
        }
    });

    // Update progress bar & time
    audio.addEventListener('timeupdate', () => {
        if(audio.duration){
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.value = percent;
        }
        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        if(seconds < 10) seconds = '0' + seconds;
        time.textContent = `${minutes}:${seconds}`;
    });

    // Seek audio with slider
    progress.addEventListener('input', () => {
        if(audio.duration){
            audio.currentTime = (progress.value / 100) * audio.duration;
        }
    });

    // Reset when audio ends
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶️';
        progress.value = 0;
        if(currentAudio === audio) currentAudio = null;
        if(currentPlayBtn === playBtn) currentPlayBtn = null;
    });
});





document.querySelectorAll('.player').forEach(player => {
    const audio = player.querySelector('.audio');
    const playBtn = player.querySelector('.playPause');

    playBtn.addEventListener('click', () => {
        // Pause any other playing audio
        document.querySelectorAll('.player .audio').forEach(a => {
            if(a !== audio) {
                a.pause();
                a.closest('.player').querySelector('.playPause').classList.remove('glow');
                a.closest('.player').querySelector('.playPause').textContent = '▶️';
            }
        });

        // Toggle play/pause
        if(audio.paused){
            audio.play();
            playBtn.textContent = '⏸️';
            playBtn.classList.add('glow');
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
            playBtn.classList.remove('glow');
        }
    });

    // Remove glow when song ends
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶️';
        playBtn.classList.remove('glow');
    });
});








