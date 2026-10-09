const songs = [
    {
        title: "Peaceful Music",
        artist: "Relaxing Sounds",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Beautiful Melody",
        artist: "Music World",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Dream Music",
        artist: "Melody Studio",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const status = document.getElementById("status");

let songIndex = 0;

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    status.textContent = "Ready to play";
}

function playSong() {
    audio.play()
        .then(() => {
            playBtn.textContent = "⏸";
            status.textContent = "Now playing 🎵";
        })
        .catch(() => {
            status.textContent = "Unable to play. Check your internet connection.";
        });
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
    status.textContent = "Music paused";
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration && Number.isFinite(audio.duration)) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
    }
});

progress.addEventListener("input", () => {
    if (audio.duration && Number.isFinite(audio.duration)) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
});

audio.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
});

audio.addEventListener("error", () => {
    status.textContent = "Audio unavailable. Try again later.";
    playBtn.textContent = "▶";
});

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

audio.volume = Number(volume.value);
loadSong(songIndex);
