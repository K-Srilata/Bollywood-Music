console.log("Welcome to Spotify")

//Initilize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Besabriyaan (MS Dhoni) [Songspk.GURU]",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Jab Tak [Songspk.GURU]",filePath:"songs/2.mp3",coverPath:"covers/1.jpg"},
    {songName:"Kala Chashma [Songs.PK] (1)",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Kaun Tujhe (M.S. Dhoni - The Untold Story) [Songspk.GURU]",filePath:"songs/4.mp3",coverPath:"covers/1.jpg"},
    {songName:"Lo Maan Liya - Raaz Reboot [Songs.PK]",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Phir Kabhi [Songspk.GURU]",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Raaz Aankhein Teri - Raaz Reboot [Songs.PK] (2)",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Sau Aasmaan [Songs.PK]",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName:"(webmusic.in)_Behti-Hawa-Sa-Tha-Woh",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songName:"(webmusic.in)_Give-Me-Some-Sunshine",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
]

songItems.forEach((element ,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }

})

//Listen to Events
audioElement.addEventListener('timeupdate' , ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' ,(e)=>{
        if(audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            mastersongname.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            e.target.classList.add('fa-circle-play');                         
            e.target.classList.remove('fa-circle-pause');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause'); 
        }
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

