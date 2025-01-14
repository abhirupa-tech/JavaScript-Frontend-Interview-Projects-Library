const petEmotion = Object.freeze({
    ANGRY: 'ANGRY',
    HAPPY: 'HAPPY',
    SLEEPY: 'SLEEPY'
});

const petAction = Object.freeze({
    FEED: 'FEED',
    SLEEP: 'SLEEP',
    PLAY: 'PLAY'
});

const petStatus = {
    SLEEP: "Niko is snoring like a tiny chainsaw. Wait for Niko to wake up!",
    FEED: "Niko is munching like a hungry hippo. Niko loves Cheetos!",
    PLAY: "Niko is bouncing around like a rubber ball. Niko's got today's exercise",
};

const petState = {
    ENERGY: 50,
    HUNGER: 50,
    HAPPY: 50,
}


// Make eyes move based on mouse position
const pet = document.getElementById('pet');
const leftPupil = document.getElementById('left-pupil');
const rightPupil = document.getElementById('right-pupil');

const playButton = document.getElementById('play-button');
const feedButton = document.getElementById('feed-button');
const sleepButton = document.getElementById('sleep-button');
const notification =  document.getElementById('notification');

//Emotions
const happyFace = document.getElementById('happy-face')
const angryFace = document.getElementById('angry-face');
const sleepyFace = document.getElementById('sleepy-face');
const sleepyEyes = document.getElementById('sleepy-eyes');
const normalEyes = document.getElementById('normal-eyes');

//Loading Bars
const happyBar = document.getElementById('happy-bar');
const hungerBar = document.getElementById('hunger-bar');
const energyBar = document.getElementById('energy-bar');


happyBar.style.transition = "width 5s ease";
hungerBar.style.transition = "width 5s ease";
energyBar.style.transition = "width 5s ease";

let timeoutId;


// String 

const eyeMovement = (e) => {
  const rect = pet.getBoundingClientRect();
  const mouseX = e.clientX - rect.left - rect.width / 2;
  const mouseY = e.clientY - rect.top - rect.height / 2;
  const angle = Math.atan2(mouseY, mouseX);
  const distance = Math.min(4, Math.sqrt(mouseX ** 2 + mouseY ** 2) / 20);
  const offsetX = Math.cos(angle) * distance;
  const offsetY = Math.sin(angle) * distance;

  gsap.to(leftPupil, { x: offsetX, y: offsetY, duration: 0.1 });
  gsap.to(rightPupil, { x: offsetX, y: offsetY, duration: 0.1 });
};

// Pet Bop Animation
gsap.fromTo(
  pet,
  { y: -5 },
  {
    y: 5,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  }
);

const action = (petAction) => {
    console.log("Niko State: "+petAction);
    disableButtons();
    showNotification(petAction).then(() => {
        console.log("Pet Action Over");
        enableButtons();
    });    
}

const showNotification = (action) => {
    //Show Notification
    notification.textContent = (() => {        
        switch(action){
            case petAction.SLEEP: return petStatus.SLEEP;
            case petAction.FEED: return petStatus.FEED;
            case petAction.PLAY: return petStatus.PLAY;
        }
    })();

    notification.classList.remove('hidden');
    modifyEmotion();   
    return new Promise(async (resolve, reject) => {
            clearTimeout(timeoutId);

            //Special case for Sleeping
            if(action === petAction.SLEEP) nikoSleeps();

            //Start Timeout
            timeoutId = setTimeout(() => {
                notification.classList.add('hidden');
                if(action === petAction.SLEEP) nikoWakes();
                resolve();

            }, (action === petAction.sleep) ? 10000 : 5000)
    });
}

const nikoSleeps = () => {
    normalEyes.classList.add("hidden");
    sleepyEyes.classList.remove("hidden");
}

const nikoWakes = () => {
    normalEyes.classList.remove("hidden");
    sleepyEyes.classList.add("hidden");
}

const progressLoadingBars = () => {
    console.log("Progressing");
    modifyEmotion();
    happyBar.style.transition = "width 5s ease";
    happyBar.style.width = `${petState.HAPPY}%`;  // Corrected: Template literal with backticks
    energyBar.style.width = `${petState.ENERGY}%`;  // Corrected: Template literal with backticks
    hungerBar.style.width = `${petState.HUNGER}%`;  // Corrected: Template literal with backticks
}

const modifyEmotion = () => {
    if (petState.ENERGY <= 40 && petState.HAPPY <=40){
        happyFace.classList.add("hidden");
        angryFace.classList.add("hidden");
        sleepyFace.classList.remove("hidden");
        return;
    }    
    if (petState.ENERGY <= 30 || petState.HAPPY <= 60 || petState.HUNGER >=80){
        happyFace.classList.add("hidden");
        angryFace.classList.remove("hidden");
        sleepyFace.classList.add("hidden");
        return;
    }
    happyFace.classList.remove("hidden");
    angryFace.classList.add("hidden");
    sleepyFace.classList.add("hidden");
}

const disableButtons = () => {
    const buttons =document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.remove('hover:bg-neutral-600', 'hover:shadow-lg');
    })
}

const enableButtons = () => {
    const buttons =document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.add('hover:bg-neutral-600', 'hover:shadow-lg');
    })
}

const init = () => {
    console.log("Init")
    progressLoadingBars();
}

// Attach mousemove event
window.addEventListener('mousemove', eyeMovement);
document.addEventListener('DOMContentLoaded', () => {init()});
feedButton.addEventListener('click', () => {
    petState.HUNGER = (petState.HUNGER > 20 ) ? petState.HUNGER - 20 : 0;
    petState.ENERGY = (petState.ENERGY < 90 ) ? petState.ENERGY + 10 : 100;
    progressLoadingBars();
    action(petAction.FEED)
});
sleepButton.addEventListener('click', () => {    
    petState.ENERGY = (petState.ENERGY < 70 ) ? petState.ENERGY + 30 : 100;
    petState.HAPPY = (petState.HAPPY < 85 ) ? petState.HAPPY + 15 : 100;
    progressLoadingBars();
    action(petAction.SLEEP)
});
playButton.addEventListener('click', () => {
    petState.ENERGY = (petState.ENERGY > 20 ) ? petState.ENERGY - 20 : 0;
    petState.HAPPY = (petState.HAPPY < 80 ) ? petState.HAPPY + 20 : 100;    
    petState.HUNGER = (petState.HUNGER < 85 ) ? petState.HUNGER + 15 : 100;
    progressLoadingBars();
    action(petAction.PLAY);
});