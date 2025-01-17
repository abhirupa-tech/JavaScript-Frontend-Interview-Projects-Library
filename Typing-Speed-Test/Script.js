import { TypingText } from './Words.js';

const textContainer = document.getElementById('words');
const time = document.getElementById('time');
const accuracy = document.getElementById('accuracy');

let isTyping = false;
let currentPosition = 0;
let text = "";
let correctKeyStrokes = 0;
let wrongKeyStrokes = 0;
let timeElapsed = 0;
let timer;


const fetchTypingText = () => {
    const randomIndex = Math.floor(Math.random() * 10);
    text = TypingText[randomIndex].content;
    const words =  text.split(' ');
    let index = 0;
    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('flex');

        for (const letter of word) {
            const letterDiv = document.createElement('div');
            letterDiv.innerHTML = letter;   
            letterDiv.classList.add('shadow-md','rounded', 'mx-[1px]', 'w-[15px]', 'text-center');
            letterDiv.id = 'letter-'+index;
            index += 1;
            wordDiv.appendChild(letterDiv);
        }
        textContainer.append(wordDiv);
        
        const spaceDiv = document.createElement('div');
        spaceDiv.innerHTML = "&nbsp";
        spaceDiv.classList.add('shadow-sm','rounded', 'mx-[1px]','w-[15px]');
        spaceDiv.id = 'letter-'+index;
        index += 1;
        textContainer.append(spaceDiv);
    })

}

const OnKeyPress = (e) => {

    console.log(e.key);
    if (e.key === 'Shift') return;

    if(!isTyping){
        isTyping = true;
        startTimer();
    }

    if(isCorrectCharacter(e.key)){
        colorCurrentCharacterSuccess();
        updateAccuracy(true);
        currentPosition += 1;
    } else {
        colorCurrentCharacterFailure();
        updateAccuracy(false);
    }
}

const updateAccuracy = (isCorrect) => {
    if(isCorrect) correctKeyStrokes++;
    else wrongKeyStrokes++;
    const currentAccuracy = Math.ceil((correctKeyStrokes / (correctKeyStrokes + wrongKeyStrokes)) * 100);
    accuracy.textContent = `Accuracy : ${currentAccuracy}%`;

    if(correctKeyStrokes === text.length) {
        document.removeEventListener('keydown', (e) => OnKeyPress(e));
    }

}

const colorCurrentCharacterSuccess = () => {
    const char = document.getElementById(`letter-${currentPosition}`);
    char.classList.remove('bg-red-200');
    char.classList.add('bg-green-200');
}

const colorCurrentCharacterFailure = () => {
    const chars = document.getElementById('letter-'+currentPosition);
    chars.classList.add('bg-red-200');
}

const isCorrectCharacter = (key) =>{
    if(key === text[currentPosition]) return true;
    return false;
}

const startTimer = () => {
    timer = setInterval(() => {
        time.textContent = `Time: ${timeElapsed}s`;
        timeElapsed ++;
    }, 1000);
}


document.addEventListener('DOMContentLoaded', () => fetchTypingText())
document.addEventListener('keydown', (e) => OnKeyPress(e));