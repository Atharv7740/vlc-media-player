###video element dom function
*currentTime()- give you the current time.
** duration()- give the total duration of video
-- video.duration()
** play();
** pause();
** playbackRate();
**defaultPlaybackRate();
**controls
---controls=true;

### Toast -> Use to pop up information for small time interval
ex-> 
<main id="main">
        <div id="volumeToast"></div>
</main>

volumeToast.innerText=Math.round(videoElement.volume*100)+"%";
        volumeToast.style.display="block";
        setTimeout(()=>{
            volumeToast.style.display="none"
        },3000);

#volumeToast{
  background-color: rgb(211, 203, 203);
  color: black;
  width: 4rem;
  height: 2rem;
  display:none;
  position:absolute;
}


###  keyboard Event Listner

document.addEventlistner("keydown"(event)=>{
    if(event.key==="ArrowUp"){
        volumeUpHandler();

    }
})

###




