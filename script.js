// Element Selection
const openbtn = document.querySelector("#openfile");
const inputbtn = document.querySelector("#videoinput");
const videoPlayer = document.querySelector("#main");
const speedUp = document.querySelector("#speedUp");
const speedDown = document.querySelector("#speedDown");
const playbtn = document.querySelector("#play");
const pausebtn = document.querySelector("#pause");
const playbackBox = document.querySelector("#playbackBox");
const seekBar = document.querySelector("#seek-bar");
const currentTimeDisplay = document.querySelector("#current-time");
const totalTimeDisplay = document.querySelector("#total-time");
const volumeIcon = document.querySelector("#volume-icon");
const muteIcon = document.querySelector("#mute-icon");

//main
playbackBox.innerText = "1x";

// functions
const openhandler = () => {
  console.log("input clicked");
  inputbtn.click();
};

const inputChangeHandler = (obj) => {
  const selectedFiles = obj.target.files[0];
  const videoLink = URL.createObjectURL(selectedFiles);
  const video = document.createElement("video");
  video.src = videoLink;
  video.defaultPlaybackRate = 1;
  videoPlayer.appendChild(video);
  video.play();
  video.volume = 0.5;
  video.setAttribute("class", "video");
  
  // Add event listeners for the video element
  video.addEventListener("timeupdate", updateSeekBar);
  video.addEventListener("loadedmetadata", setupVideo);
  
  // Toggle play button to pause when video is loaded
  togglePlayPauseButtons();
};

// Format time to HH:MM:SS
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  
  return [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':');
};

// Setup video initial state
const setupVideo = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  // Update total duration
  totalTimeDisplay.textContent = formatTime(video.duration);
  currentTimeDisplay.textContent = formatTime(0);
  
  // Setup seek bar max value with video duration
  seekBar.max = Math.floor(video.duration);
  seekBar.value = 0;
};

// Update seek bar and time display as video plays
const updateSeekBar = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  // Update current time display
  currentTimeDisplay.textContent = formatTime(video.currentTime);
  
  // Update seek bar position without triggering the change event
  seekBar.value = video.currentTime;
};

// Seek the video when the seek bar is changed
const seekHandler = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  video.currentTime = seekBar.value;
};

const speedUpHandler = () => {
  console.log("speed up clicked");

  const videoElement = document.querySelector("#main .video");

  if (videoElement == null) {
    console.log("There is no video");
    return;
  }
  let speed = videoElement.playbackRate;
  if (speed < 3) {
    videoElement.playbackRate += 0.25;
    console.log(videoElement.playbackRate);

    playbackBox.innerText = videoElement.playbackRate + "x";
  } else {
    console.log("Max playback Speed reached " + speed + "x ");
  }
};

const speedDownHandler = () => {
  const videoElement = document.querySelector("#main .video");
  console.log("speedDown clicked");
  let speed = videoElement.playbackRate;
  if (speed > 0.25) {
    videoElement.playbackRate -= 0.25;
    console.log(videoElement.playbackRate);
    playbackBox.innerText = videoElement.playbackRate + "x";
  } else {
    console.log("Min playback Speed reached " + speed + "x");
  }
};

// Toggle display of play/pause buttons
const togglePlayPauseButtons = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  if (video.paused) {
    playbtn.style.display = "inline";
    pausebtn.style.display = "none";
  } else {
    playbtn.style.display = "none";
    pausebtn.style.display = "inline";
  }
};

const playHandler = () => {
  const videoElement = document.querySelector("#main .video");
  if (!videoElement) return;
  
  videoElement.play();
  togglePlayPauseButtons();
};

const pauseHandler = () => {
  const videoElement = document.querySelector("#main .video");
  if (!videoElement) return;
  
  videoElement.pause();
  togglePlayPauseButtons();
};

// Toggle play/pause with spacebar
const togglePlayPause = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  togglePlayPauseButtons();
};

// Seek forward/backward with arrow keys
const seekForward = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  video.currentTime = Math.min(video.duration, video.currentTime + 5);
};

const seekBackward = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  video.currentTime = Math.max(0, video.currentTime - 5);
};

// Toggle mute function
const toggleMute = () => {
  const video = document.querySelector("#main .video");
  if (!video) return;
  
  video.muted = !video.muted;
  
  // Toggle volume icons
  if (video.muted) {
    volumeIcon.style.display = "none";
    muteIcon.style.display = "inline";
  } else {
    volumeIcon.style.display = "inline";
    muteIcon.style.display = "none";
  }
};

//volume control
const volumeUp = document.querySelector("#volume-up");
const volumeDown = document.querySelector('#volume-down');  
const volumeToast = document.querySelector("#volumeToast");

const volumeUpHandler = () => {
    console.log("volumeUp clicked");
    const videoElement = document.querySelector('video');
    if (videoElement == null) {
        console.log("No video");
        return;
    }
    let currentVolume = videoElement.volume;
    console.log('volume before increase: ', currentVolume);
    if (currentVolume < 1) {
        currentVolume += 0.01;
        videoElement.volume = currentVolume;
        volumeToast.innerText = Math.round(currentVolume * 100) + "%";
        volumeToastHandler();
        console.log("volume after increase: ", currentVolume);
    }
    
    // If unmuted while increasing volume, update icons
    if (videoElement.muted) {
        videoElement.muted = false;
        volumeIcon.style.display = "inline";
        muteIcon.style.display = "none";
    }
};

const volumeDownHandler = () => {
    console.log("volumeDown clicked");
    const videoElement = document.querySelector('video');
    if (videoElement == null) {
        console.log("No video");
        return;
    }
    let currentVolume = videoElement.volume;
    console.log('volume before decrease: ', currentVolume);
    if (currentVolume > 0) {
        currentVolume -= 0.01;
        videoElement.volume = currentVolume;
        volumeToast.innerText = Math.round(currentVolume * 100) + "%";
        volumeToastHandler();
        console.log("volume after decrease: ", currentVolume);
    }
};

const volumeToastHandler = () => {
    console.log("volumehandler clicked, toast will be shown");
    volumeToast.style.display = "block";
    setTimeout(() => {
        volumeToast.style.display = "none";
    }, 4000);
};

// Full screen
const fullScreenBtn = document.querySelector("#fullScreen");
const fullScreenHandler = () => {
    videoPlayer.requestFullscreen();
};

// Event Handlers for video controls
openbtn.addEventListener("click", openhandler);
inputbtn.addEventListener("change", inputChangeHandler);
speedUp.addEventListener("click", speedUpHandler);
speedDown.addEventListener("click", speedDownHandler);
playbtn.addEventListener("click", playHandler);
pausebtn.addEventListener("click", pauseHandler);
volumeUp.addEventListener('click', volumeUpHandler);
volumeDown.addEventListener('click', volumeDownHandler);
fullScreenBtn.addEventListener('click', fullScreenHandler);

// New event handlers for seek bar
seekBar.addEventListener('input', seekHandler);

// Volume icon handlers
volumeIcon.addEventListener('click', toggleMute);
muteIcon.addEventListener('click', toggleMute);

// Keyboard event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    console.log('arrow up pressed');
    volumeUpHandler();
  }
  else if (event.key === "ArrowDown") {
    volumeDownHandler();
  }
  else if (event.key === "ArrowRight") {
    seekForward();
  }
  else if (event.key === "ArrowLeft") {
    seekBackward();
  }
  else if (event.key === " ") { // Spacebar
    event.preventDefault(); // Prevent page scrolling
    togglePlayPause();
  }
});

// Check if video ends to reset play/pause buttons
document.addEventListener('ended', function() {
  if (document.querySelector("#main .video")) {
    togglePlayPauseButtons();
  }
}, true);