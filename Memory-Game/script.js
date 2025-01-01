const cardHideColor = 'bg-neutral-400';
const isShown = 'isShown';
let isSecondCardFlipped = false;
let lastCardClicked = -1;
let gameStatusMessage = document.getElementById('finalMessage');
let gameStatus;

const GameStatus = Object.freeze({
    START: 'You are yet to begin!',
    IN_PROGRESS: 'Every move counts. Do not stop now!',
    WIN: 'Victory is yours! Time to bask in the glory.',
    LOSE: 'Sorry! Game Over!'
})

const renderGameCards = () => {
    const container = document.getElementById("grid");
    for(let i = 0; i<9; i++){
        const child = document.createElement('div');
        const cardId = 'card_'+i;
        child.className = "card bg-neutral-400 w-10 p-16 cursor-pointer hover:shadow-lg rounded-lg border hover:border-neutral-800";
        child.id = cardId;
        child.addEventListener("click", () => handleCardClick(child, i));
        container.appendChild(child);
    }    
}

const handleCardClick = (child, i) => {
    console.log("handleCardClick() BEGIN");
    const color = colorList[i];
    gameStatusMessage.textContent = GameStatus.IN_PROGRESS;
    const unMatchedCard = lastCardClicked !== -1 ? document.getElementById('card_'+ lastCardClicked ) : null;
    const lastCardColor = unMatchedCard && unMatchedCard.classList.contains(isShown) ? colorList[lastCardClicked] : null;

    child.classList.add(color, isShown);
    child.classList.remove(cardHideColor);
    console.log('color:'+color);
    //If Black Card is Opened

    if(color === 'bg-neutral-600') {
        console.log("Game End");
        // location.reload();
        gameStatus = GameStatus.LOSE;
        Object.freeze(document.querySelector('.main'));
        //Block Game and Display Message
        blockClicksOnCards();
        gameStatusMessage.textContent = GameStatus.LOSE;
        return;
    }
    //Do nothing if Color matches
    if(color === lastCardColor || (lastCardColor) == null) {
        lastCardClicked = i;        
        isSecondCardFlipped = !isSecondCardFlipped;
        return;
    }




    if(isSecondCardFlipped
        && (unMatchedCard && unMatchedCard.classList.contains(isShown))
        && color !== lastCardColor
        && lastCardClicked!==-1){
            
        //Flip back both cards in 1 second, disable click back on current card for the time

        setTimeout(() => {
            //Flip back Card when timeout is Over;            
            child.classList.add(cardHideColor);
            child.classList.remove(color, isShown);
            
            unMatchedCard.classList.add(cardHideColor);
            unMatchedCard.classList.remove(lastCardColor, isShown);
        }, 1000);
    }
    lastCardClicked = i;
    isSecondCardFlipped = !isSecondCardFlipped;
    console.log("handleCardClick() END");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const blockClicksOnCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.pointerEvents = 'none';
    });
}
let colorList = [
    'bg-amber-600',
    'bg-lime-500',
    'bg-cyan-400',
    'bg-yellow-400',
    'bg-neutral-600',
    'bg-amber-600',
    'bg-cyan-400',
    'bg-lime-500',    
    'bg-yellow-400'
]

const init = () => {
    colorList = shuffleArray(colorList);
    gameStatusMessage.textContent = GameStatus.START;
    renderGameCards();
}

document.addEventListener("DOMContentLoaded", init);