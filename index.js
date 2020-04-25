// GENERAL SELECTORS
const player = document.querySelector(".player");
const cdCover = document.querySelector(".cd img");
const btnBackward = document.querySelector(".backward");
const btnPlay = document.querySelector(".play");
const btnForward = document.querySelector(".forward");
const songName = document.querySelector(".song-name");
const audio = document.querySelector(".audio");
const background = document.querySelector(".background");
const genBackground = document.querySelector(".general-background");
const progress = document.querySelector(".progress");

// SONGS AND AUDIOS
const songs = ["song-1", "song-2", "song-3"];
const imgs = ["img-1", "img-2", "img-3"];
const songNames = ["The Weeknd - Blinding Lights", "The Weeknd - Heartless", "The Weeknd - Starboy"];

// SPECIFICATIONS
let index = 0;
let isRunning = false;

// LOAD SONGS, IMAGES, TITLES
loadSong(songs[index]);
function loadSong(song) {
  audio.src = `songs/${song}.mp3`;
}

loadImgs(imgs[index]);
function loadImgs(img) {
  cdCover.src = `img/${img}.jpg`;
  background.style.backgroundImage = `url(img/${img}.jpg)`;
  genBackground.style.backgroundImage = `url(img/${img}.jpg)`;
}

loadTitle(songNames[index]);
function loadTitle(title) {
  songName.innerText = title;
}

// PLAY AND PAUSE
function playSong() {
  btnPlay.classList.remove("fa-play");
  btnPlay.classList.add("fa-pause");
  player.classList.add("active");
  audio.play();
  isRunning = true;
}

function pauseSong() {
  btnPlay.classList.remove("fa-pause");
  btnPlay.classList.add("fa-play");
  player.classList.remove("active");
  audio.pause();
  isRunning = false;
}

// LAST SONG
function prevSong() {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }
  loadSong(songs[index]);
  loadImgs(imgs[index]);
  loadTitle(songNames[index]);

  playSong();
}

// NEXT SONG
function nextSong() {
  index++;
  if (index > songs.length - 1) {
    index = 0;
  }
  loadSong(songs[index]);
  loadImgs(imgs[index]);
  loadTitle(songNames[index]);

  playSong();
}

// PROGRESS BAR
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// // EVENT LISTENERS
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

btnBackward.addEventListener("click", prevSong);
btnForward.addEventListener("click", nextSong);
btnPlay.addEventListener("click", () => {
  if (isRunning === false) {
    playSong();
  } else {
    pauseSong();
  }
});
