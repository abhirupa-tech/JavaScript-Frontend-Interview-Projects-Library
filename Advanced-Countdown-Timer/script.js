const initTimer = () => {
    // const [min, sec] = getTimeSet();
    startCountDown(20, 0);
    // startCountDown
}

const startCountDown = (min, sec) => {
    console.log("Starting timer");
    const timeOutSeconds = min*60 + sec;
    setTimeout(() => {
        setInterval(()=>{
        if(sec == 0) {
            min--;
            sec = 59;
        } else sec--;
        console.log("Time: "+min + "min  " + sec + "sec");
        // updateTimeInCountDownUX();
    }, 1000)},
    timeOutSeconds);
}

const init = () => {
    console.log("Starting timer");
  initTimer();
}

document.addEventListener("DOMContentLoaded", init());