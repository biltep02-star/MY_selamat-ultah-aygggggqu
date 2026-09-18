/* ===========================================
   ELEMENT
=========================================== */

const openButton = document.getElementById("openBtn");
const cover = document.querySelector(".cover");
const home = document.getElementById("home");
const music = document.getElementById("bgMusic");

const galleryMusic = document.getElementById("galleryMusic");
const specialMusic = document.getElementById("specialMusic");

const playlistMusic = document.getElementById("playlistMusic");
/* ===========================================
   SETTING MUSIC
=========================================== */

music.volume = 0.4;


/* ===========================================
   OPEN SURPRISE
=========================================== */

openButton.addEventListener("click", () => {

    // Musik
    music.play();

    // Confetti
    confetti({

        particleCount: 250,
        spread: 180,
        startVelocity: 45,
        origin: { y: 0.6 }

    });

    // Hilangkan cover
    cover.classList.add("hide");

    setTimeout(() => {

        cover.style.display = "none";

        home.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }, 300);

});

/* ===========================================
   VIDEO & MUSIC
=========================================== */

// Saat video diputar

/* ===========================================
   LIGHTBOX
=========================================== */

const galleryImages = document.querySelectorAll(".gallery-container img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const close = document.getElementById("close");

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=img.src;

    });

});

close.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});
/* ===========================================
   AOS
=========================================== */

AOS.init({

    duration: 500,
    offset: 80,
    easing: "ease-out",
    once: true

});

function openGallery(){

    hideAllPages();

    stopAllMusic();

    galleryMusic.play();

    document.getElementById("galleryPage").style.display="block";

    document.getElementById("galleryPage").scrollIntoView({
        behavior:"smooth"
    });

}

function openVideo(){

    stopAllMusic();

    hideAllPages();

    document.getElementById("videoPage").style.display = "block";

    document.getElementById("videoPage").scrollIntoView({
        behavior:"smooth"
    });

}

function openSpecial(){

    stopAllMusic();

    specialMusic.play();

    hideAllPages();

    document.getElementById("specialPage").style.display="block";

    document.getElementById("specialPage").scrollIntoView({
        behavior:"smooth"
    });

}


function stopAllMusic(){

    music.pause();
    galleryMusic.pause();
    specialMusic.pause();
    playlistMusic.pause();

    music.currentTime = 0;
    galleryMusic.currentTime = 0;
    specialMusic.currentTime = 0;
    playlistMusic.currentTime = 0;

}

function backMenu(){

    stopAllMusic();

    music.play();

    hideAllPages();

    document.body.classList.remove("no-scroll");

    document.getElementById("menu").scrollIntoView({
        behavior:"smooth"
    });

}

const popup = document.getElementById("videoPopup");
const popupVideo = document.getElementById("popupVideo");
const closeVideo = document.getElementById("closeVideo");

popupVideo.addEventListener("play", () => {

    stopAllMusic();

});

popupVideo.addEventListener("pause", () => {

    music.play();

});

popupVideo.addEventListener("ended", () => {

    music.play();

    confetti({

        particleCount:200,
        spread:120,
        origin:{y:0.6}

    });

});

function playVideo(src){

    stopAllMusic();

    popup.style.display="flex";

    popupVideo.src=src;

    popupVideo.play();

}

closeVideo.onclick=function(){

    popupVideo.pause();

    popupVideo.currentTime=0;

    popup.style.display="none";

    music.play();

}



function openPlaylist(){

    stopAllMusic();

    document.getElementById("galleryPage").style.display="none";
    document.getElementById("videoPage").style.display="none";
    document.getElementById("specialPage").style.display="none";
    document.getElementById("playlistPage").style.display="block";

    document.getElementById("playlistPage").scrollIntoView({
        behavior:"smooth"
    });

}

const songs = [
{
    src:"music/sempurnaPL.mp3",
    title:"Sempurna",
    artist:"Andra and The Backbone"
},
{
    src:"music/untukperempuanyangsedangdipelukannkuPL.mp3",
    title:"Untuk Perempuanku",
    artist:"Payung Teduh"
},
{
    src:"music/foreverinyoureyesPL.mp3",
    title:"Forever In Your Eyes",
    artist:"Brian Rahmattio"
},
{
    src:"music/bermuaraPL.mp3",
    title:"Bermuara",
    artist:"Rizky Febian"
},
{
    src:"music/kitausahakanrumahituPL.mp3",
    title:"Kita Usahakan Rumah Itu",
    artist:"Sal Priadi"
},
{
    src:"music/langitfavoritPL.mp3",
    title:"Langit Favorit",
    artist:"Luthfi Aulia"
},
{
    src:"music/kecil-kecilanduluPL.mp3",
    title:"Kecil-Kecilan Dulu",
    artist:"Sal Priadi"
}
];

let currentSong = 0;

function playSong(src,title,artist){

    stopAllMusic();

    playlistMusic.src = src;

    playlistMusic.play();
    
    document.getElementById("playBtn").innerHTML = "⏸";

    document.getElementById("nowTitle").innerHTML = title;
    document.getElementById("nowArtist").innerHTML = artist;

    currentSong = songs.findIndex(song => song.src === src);
    

}

function hideAllPages(){

    document.getElementById("galleryPage").style.display = "none";
    document.getElementById("videoPage").style.display = "none";
    document.getElementById("specialPage").style.display = "none";
    document.getElementById("playlistPage").style.display = "none";

}

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    const song = songs[currentSong];

    playSong(song.src,song.title,song.artist);

}

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    const song = songs[currentSong];

    playSong(song.src,song.title,song.artist);

}

function togglePlay(){

    const playBtn = document.getElementById("playBtn");

    if(playlistMusic.paused){

        playlistMusic.play();
        playBtn.innerHTML = "⏸";

    }else{

        playlistMusic.pause();
        playBtn.innerHTML = "▶";

    }

}

playlistMusic.addEventListener("ended",()=>{

    nextSong();

});

playlistMusic.addEventListener("timeupdate",()=>{

    if(playlistMusic.duration){

        let percent =
        (playlistMusic.currentTime/playlistMusic.duration)*100;

        document.getElementById("progress").style.width =
        percent+"%";

    }

});
