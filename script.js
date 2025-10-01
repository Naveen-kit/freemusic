// Select all players
const players = document.querySelectorAll('.player');

players.forEach(player => {
    const audio = player.querySelector('.audio');
    const playBtn = player.querySelector('.playPause');
    const progress = player.querySelector('.progress');
    const time = player.querySelector('.time');

    // Play/pause button
    playBtn.addEventListener('click', () => {
        if(audio.paused){
            audio.play();
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
        }
    });

    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent || 0;

        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        if(seconds < 10) seconds = '0'+seconds;
        time.textContent = `${minutes}:${seconds}`;
    });

    // Seek audio when slider is changed
    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    // Reset when audio ends
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶️';
        progress.value = 0;
    });
});
