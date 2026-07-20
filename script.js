/* =========================================
   SONG LIST
========================================= */

const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        src: "assets/songs/song1.mp3",
        cover: "assets/images/cover1.jpg"
    },
    {
        title: "Song Two",
        artist: "Artist Two",
        src: "assets/songs/song2.mp3",
        cover: "assets/images/cover2.jpg"
    },
    {
        title: "Song Three",
        artist: "Artist Three",
        src: "assets/songs/song3.mp3",
        cover: "assets/images/cover3.jpg"
    },
    {
        title: "Song Four",
        artist: "Artist Four",
        src: "assets/songs/song4.mp3",
        cover: "assets/images/cover4.jpg"
    }
];

/* =========================================
   SELECT ELEMENTS
========================================= */

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.querySelectorAll("#playlist li");

/* =========================================
   VARIABLES
========================================= */

let songIndex = 0;
let isPlaying = false;

/* =========================================
   LOAD SONG
========================================= */

function loadSong(index){

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    cover.src = songs[index].cover;

    audio.src = songs[index].src;

    highlightSong();

}

/* =========================================
   PLAY SONG
========================================= */

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

}

/* =========================================
   PAUSE SONG
========================================= */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

}

/* =========================================
   PLAY / PAUSE BUTTON
========================================= */

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

/* =========================================
   NEXT SONG
========================================= */

function nextSong(){

    songIndex++;

    if(songIndex>=songs.length){

        songIndex=0;

    }

    loadSong(songIndex);

    playSong();

}

nextBtn.addEventListener("click",nextSong);

/* =========================================
   PREVIOUS SONG
========================================= */

function prevSong(){

    songIndex--;

    if(songIndex<0){

        songIndex=songs.length-1;

    }

    loadSong(songIndex);

    playSong();

}

prevBtn.addEventListener("click",prevSong);

/* =========================================
   UPDATE PROGRESS BAR
========================================= */

audio.addEventListener("timeupdate",()=>{

    const progressPercent =
        (audio.currentTime/audio.duration)*100;

    progress.value = progressPercent || 0;

    current.textContent =
        formatTime(audio.currentTime);

});

/* =========================================
   SONG DURATION
========================================= */

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent =
        formatTime(audio.duration);

});

/* =========================================
   SEEK BAR
========================================= */

progress.addEventListener("input",()=>{

    audio.currentTime =
        (progress.value/100)*audio.duration;

});

/* =========================================
   FORMAT TIME
========================================= */

function formatTime(time){

    const minutes = Math.floor(time/60);

    const seconds = Math.floor(time%60);

    return minutes + ":" +
        (seconds<10?"0":"") + seconds;

}

/* =========================================
   VOLUME CONTROL
========================================= */

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

/* =========================================
   AUTOPLAY NEXT SONG
========================================= */

audio.addEventListener("ended",()=>{

    nextSong();

});

/* =========================================
   PLAYLIST CLICK
========================================= */

playlist.forEach(item=>{

    item.addEventListener("click",()=>{

        songIndex = Number(item.dataset.index);

        loadSong(songIndex);

        playSong();

    });

});

/* =========================================
   HIGHLIGHT CURRENT SONG
========================================= */

function highlightSong(){

    playlist.forEach(item=>{

        item.classList.remove("active");

    });

    playlist[songIndex].classList.add("active");

}

/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(isPlaying){

            pauseSong();

        }

        else{

            playSong();

        }

    }

    if(e.key==="ArrowRight"){

        nextSong();

    }

    if(e.key==="ArrowLeft"){

        prevSong();

    }

});

/* =========================================
   INITIALIZE PLAYER
========================================= */

loadSong(songIndex);