



document.querySelector('a[href="#songs"]').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#songs').scrollIntoView({ behavior: 'smooth' });
});




const players = document.querySelectorAll('.player');

let currentAudio = null;      // tracks currently playing audio
let currentPlayBtn = null;    // tracks the button of currently playing audio

players.forEach(player => {
    const audio = player.querySelector('.audio');
    const playBtn = player.querySelector('.playPause');
    const progress = player.querySelector('.progress');
    const time = player.querySelector('.time');

    // Play/Pause button
    playBtn.addEventListener('click', () => {
        // If another audio is playing, pause it
        if(currentAudio && currentAudio !== audio){
            currentAudio.pause();
            if(currentPlayBtn) currentPlayBtn.textContent = '▶️';
        }

        // Toggle current audio
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

    // Update progress bar and time
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100 || 0;
        progress.value = percent;

        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        if(seconds < 10) seconds = '0'+seconds;
        time.textContent = `${minutes}:${seconds}`;
    });

    // Seek audio
    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    // Reset when audio ends
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶️';
        progress.value = 0;
        if(currentAudio === audio) currentAudio = null;
        if(currentPlayBtn === playBtn) currentPlayBtn = null;
    });
});















