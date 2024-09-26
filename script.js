// const close = document.querySelector('.container .sidebar ,logo .return-btn')
// const container = document.querySelector('.container');
// const sidebar = document.querySelector('.container .sidebar');
// menuBar = document.querySelector('.container .main-page .menu-bar')
// const open = document.querySelector('.container .main-page .menu-bar .bx-menu');



// open.addEventListener('click', function() {
//     sidebar.style.display = 'flex';
//     container.style.gridTemplateColumns = sidebar.style.display === 'none' ? '0fr 1fr' : '1fr 6fr';
//     menuBar.style.display = 'none';
// });

// close.addEventListener('click', () => {
// sidebar.style.display = 'none';
// menuBar.style.display = 'block';
// });



const playSong = document.querySelector('.container main .playlist .music-list .items');
const image = document.querySelector('.container .right-section .music-player .top-section .song-info img');
const songTitle = document.querySelector('.container .right-section .music-player .top-section .song-info .description h3');
const singer = document.querySelector('.container .right-section .music-player .top-section .song-info .description h5');
const songSlider = document.querySelector('.container .right-section .music-player .top-section .song-info .progress .slider_container .song_slider');
const volumeSlider = document.querySelector('.container .right-section .music-player .top-section .song-info .progress .slider_container .volume_slider');
const currentTimeDisplay = document.querySelector('.container .right-section .music-player .top-section .song-info .progress .slider_container .current-time');
const totalDurationDisplay = document.querySelector('.container .right-section .music-player .top-section .song-info .progress .slider_container .total-duration');
const playBtn = document.querySelector('.container .right-section .music-player .player-actions .buttons .play-button');
const prev = document.querySelector('.container .right-section .music-player .player-actions .buttons .prev');
const next = document.querySelector('.container .right-section .music-player .player-actions .buttons .next');
const audioPlayer = document.createElement('audio');
document.body.appendChild(audioPlayer);
let flag = 0; //used to track if music is playing in background
let first = 0;
let index = 0;
// let compare = "";
let monitor = null; //monitors query selector play in playBtn

const songsData = [  
  { 
    image: "./images/eminem.webp",
    singer: "Eminem",
    title:  "Without Me",
    audio: "./audio/Without Me.mp3"
  },
  { 
    image: "./images/adele.webp",
    singer: "Adele",
    title:  "When We Were Young",
    audio: "./audio/When_We_Were_Young.mp3"
  },
  { 
    image: "./images/NF.webp",
    singer: "NF",
    title:  "let you down",
    audio: "./audio/Let_You_Down.mp3"
  },
  { 
    image: "./images/Burna Boy ♡.jpg",
    singer: "Burna boy",
    title:  "Tested aproved & Trusted",
    audio: "./audio/Tested-Approved-and-Trusted.mp3"
  },
  { 
    image: "./images/Fave.jpg",
    singer: "Fave",
    title:  "Belong to you",
    audio: "./audio/FAVE-Belong-To-You.mp3"
  },

]


audioPlayer.addEventListener('play', function() {
  if (first === 0) { monitor.className = "bx bx-pause", first = 1;}
  playBtn.className = "bx bx-pause play-button";
  flag = 0;
});

audioPlayer.addEventListener('pause', function() {
  if (first === 1) { monitor.className = "bx bxs-right-arrow", first = 0;}
  playBtn.className = "bx bxs-right-arrow play-button";
  flag = 1;
});


playBtn.addEventListener('click', function () {
  if (flag === 0 && first === 1) {
    audioPlayer.pause(); 
  } else if (flag === 1) {audioPlayer.play();}
});

audioPlayer.addEventListener('ended', function () {
  playBtn.className = "bx bxs-right-arrow play-button";
  monitor.className = "bx bxs-right-arrow";
});

playSong.addEventListener('click', function (e) {
  const clickedElement = e.target;
  // Check if the clicked element or its parent is the .info div or the .icon class
  const isInfoClicked = clickedElement.classList.contains('info') || clickedElement.closest('.info');
  const isIconClicked = clickedElement.classList.contains('icon') || clickedElement.closest('.icon');

  if (isInfoClicked || isIconClicked) {
    const item = clickedElement.closest('.item');
    
    if (item) {
      const img = item.querySelector('.info img');
      const artiste = item.querySelector('.info .details h5');
      const title = item.querySelector('.info .details p');
      const play = item.querySelector('.actions .icon i');

      // if (h5.innerText != compare && count !== 0) {
      //   monitor.className = "bx bx-pause";
      //   count = 0;
      // } else {
      //   compare = h5.innerText;
      //   count = 1;
      // }

      monitor = play;
      if (first === 0) {
      // image.src = img.getAttribute('src');
      songTitle.innerText = title.innerText;

      for (let i = 0; i < songsData.length; i++) {
        if (songsData[i].title === title.innerText) {
        image.src = songsData[i].image;
        singer.innerText = songsData[i].singer;
        audioPlayer.src = songsData[i].audio;
        index = i;
        break;
        }
      }
      audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
  }
  }
});

// Event listener for song slider to update song time
songSlider.addEventListener('input', function() {
  const seekTime = (audioPlayer.duration * songSlider.value) / 100;
  audioPlayer.currentTime = seekTime;
});

// Event listener for volume slider to update volume
volumeSlider.addEventListener('input', function() {
  audioPlayer.volume = volumeSlider.value / 100;
});

// Update the time displays and progress bar as the song plays
audioPlayer.addEventListener('timeupdate', function() {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;

  currentTimeDisplay.textContent = formatTime(currentTime);
  totalDurationDisplay.textContent = formatTime(duration);

  // Update the song slider position
  const progress = (currentTime / duration) * 100;
  songSlider.value = progress;
});

// Helper function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


prev.addEventListener('click', function () {
  let data = 0;
  if (index === 0) {data = (songsData.length - 1)}
  else { data = (index - 1) }
  index = data;
  image.src = songsData[data].image;
  singer.innerText = songsData[data].singer;
  audioPlayer.src = songsData[data].audio;
  songTitle.innerText = songsData[data].title;
  audioPlayer.play();
});

next.addEventListener('click', function () {
let data = 0;
if (index === (songsData.length - 1)) { data  = 0}
else {data = index + 1;}
index = data;
image.src = songsData[data].image;
singer.innerText = songsData[data].singer;
audioPlayer.src = songsData[data].audio;
songTitle.innerText = songsData[data].title;
audioPlayer.play();
});