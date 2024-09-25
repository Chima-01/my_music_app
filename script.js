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
let flag = 1; //used to track if music is playing in background


function updateBtn () {
  if (flag === 1 && audioPlayer.src)  {
    playBtn.className = "bx bxs-right-arrow play-button";
    audioPlayer.pause();
    flag  = 2;
  } else {
    if (audioPlayer.src) {
    playBtn.className = "bx bx-pause play-button";
    playBtn.style.fontSize = '24px';
    audioPlayer.play();
    flag = 1;
    }
  }
}

playBtn.addEventListener('click', function () {
  updateBtn();
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
      const h5 = item.querySelector('.info .details h5');
      const h3 = item.querySelector('.info .details p');

      if (img && h5 && h3) {
        flag = 2;
        image.src = img.getAttribute('src');
        songTitle.innerText = h5.innerText;
        singer.innerText = h3.innerText;
        audioPlayer.src = '../audio/Without Me.mp3';
        updateBtn();
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