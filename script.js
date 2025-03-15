// Element Selection 
const openbtn= document.querySelector("#openfile");
const inputbtn=document.querySelector("#videoinput");
const videoPlayer=document.querySelector("#main");
const speedUp= document.querySelector("#speedUp");
const speedDown=document.querySelector("#speedDown");
const playbtn =document.querySelector("#play");
const pausebtn = document.querySelector("#pause");
const playbackBox=document.querySelector("#playbackBox");
const videoMain=document.querySelector("video");

//main 

playbackBox.innerText="1x";


// fuctions 


const openhandler=()=>{
    console.log("input clicked")
    inputbtn.click();
}
const inputChangeHandler=(obj)=>{
    const selectedFiles=obj.target.files[0];
    const videoLink=URL.createObjectURL(selectedFiles);
    const video=document.createElement("video");
    video.src=videoLink;
    video.defaultPlaybackRate=1;
    videoPlayer.appendChild(video);
    
    video.setAttribute("class","video");
}

const speedUpHandler=()=>{
    console.log("speed up clicked");

    const videoElement=document.querySelector("#main .video");

    if(videoElement==null){
        console.log("There is no video")
        return ;
    }
    let speed = videoElement.playbackRate;
    if(speed <3){
        videoElement.playbackRate+=0.25;
        console.log(videoElement.playbackRate);
        
        playbackBox.innerText=videoElement.playbackRate + "x";
    }
    else{
        console.log("Max playback Speed reached " + speed+"x ");
    }

}

const speedDownHandler=()=>{
    const videoElement=document.querySelector("#main .video");
    console.log("speedDown clicked")
    let speed = videoElement.playbackRate;
    if(speed>0.25){
        videoElement.playbackRate-=0.25;
        console.log(videoElement.playbackRate);
        playbackBox.innerText=videoElement.playbackRate+"x";
    } 
    else{
        console.log("Min playback Speed reached "+ speed+"x" )
    } 
}
const playHandler=()=>{
    const videoElement=document.querySelector("#main .video");
    
    videoElement.play();
}
const pauseHandler=()=>{
    const videoElement=document.querySelector("#main .video");
    videoElement.pause();
}






// Event Handler 

openbtn.addEventListener('click',openhandler);
inputbtn.addEventListener('change',inputChangeHandler)
speedUp.addEventListener("click",speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);
playbtn.addEventListener("click",playHandler);
pausebtn.addEventListener("click",pauseHandler);