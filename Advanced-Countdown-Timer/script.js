const toggleButton = document.getElementById('toggleButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const refreshIcon = document.getElementById('refreshButton');

let isTimerInProgress = false;
let seconds = 0; //5 Minutes Initially;
let minutes = 5 
let intervalId;
let timeoutId;

toggleButton.addEventListener('click', () => {
    toggleButtonStates();
    if(!isTimerInProgress){   
        console.log("Clicked - PLAY");
        startCountDown();
    } else{
        clearInterval(intervalId);
        clearTimeout(timeoutId)
        console.log("Clicked - PAUSE") ;
    }
    
    isTimerInProgress = !isTimerInProgress;
});

refreshIcon.addEventListener('click', () => {
    minutes = 5;
    seconds = 0;
    stopTimer();
    updateTimeOnTimerCard();
})

const stopTimer = () => {    
    if(isTimerInProgress){
        toggleButtonStates();
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        isTimerInProgress = false;
    }
}

const toggleButtonStates = () => {
    playIcon.classList.toggle('hidden');
    pauseIcon.classList.toggle('hidden');
}

// Define the handleOnClickSubmit function properly
export const handleOnClickSubmit = () => {
    console.log("Custom Time Set!");
    stopTimer();
    fetchTime();
    updateTimeOnTimerCard();
};

const fetchTime = () => {
    console.log("Minutes:"+document.getElementById("minutes").value + " seconds"+ document.getElementById("seconds").value);
    minutes = parseInt(document.getElementById("minutes").value) || 0;
    seconds = parseInt(document.getElementById("seconds").value) || 0;

    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
}

const updateTimeOnTimerCard = () => {
    console.log("Setting timer to" + typeof minutes + "min "+ seconds + "sec");
    document.getElementById("minutes_1").textContent = Math.floor(minutes/10);
    document.getElementById("minutes_0").textContent = (minutes % 10);
    document.getElementById("seconds_1").textContent = Math.floor(seconds/10);
    document.getElementById("seconds_0").textContent = (seconds%10);

}



const startCountDown = () => {
    console.log("Starting timer");
    const timeOutSeconds = ( minutes * 60 + seconds ) * 1000;
    intervalId = setInterval(()=>{
        if(seconds === 0) {
            minutes--;
            seconds = 59;
        } else seconds--;
        console.log("Time: "+minutes + "min  " + seconds + "sec");
        updateTimeOnTimerCard();
    }, 1000);

    timeoutId = setTimeout(() => {
       clearInterval(intervalId);
       toggleButtonStates();
       isTimerInProgress = false;
    }, timeOutSeconds);
}

const init = () => {
    console.log("Starting timer");
    updateTimeOnTimerCard();
}

document.addEventListener("DOMContentLoaded", init);
document.getElementById("submit").addEventListener("click", handleOnClickSubmit);

