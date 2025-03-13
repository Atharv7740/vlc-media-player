const openbtn= document.querySelector("#openfile");
const inputbtn=document.querySelector("#videoinput");
const videoPlayer=document.querySelector("#main");
const speedUp= document.querySelector("#speedUp");
const speedDown=document.querySelector("#speedDown");



const openhandler=()=>{
    console.log("input clicked")
    inputbtn.click();
}
const inputChangeHandler=(obj)=>{
    const selectedFiles=obj.target.files[0];
    const videoLink=URL.createObjectURL(selectedFiles);
    const video=document.createElement("video");
    video.src=videoLink;
    videoPlayer.appendChild(video);
    video.play();
    video.setAttribute("class","video");
}

const speedUpHandler=()=>{
    console.log("speed up clicked");

    const videoElement=document.querySelector("#main .video");

  
        videoElement.playbackRate+=0.5;
    
    
}

const speedDownHandler=()=>{
    const videoElement=document.querySelector("#main .video");
    videoElement.playbackRate-=0.5;

}

openbtn.addEventListener('click',openhandler);
inputbtn.addEventListener('change',inputChangeHandler)
speedUp.addEventListener("click",speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);