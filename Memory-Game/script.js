const cardHideColor = 'bg-neutral-400';
const isShown = 'isShown';
let isSecondCardFlipped = false;
let lastCardClicked = -1;

const renderGameCards = () => {
    const container = document.getElementById("grid");
    for(let i = 0; i<9; i++){
        const child = document.createElement('div');
        const cardId = 'card_'+i;
        child.className = "bg-neutral-400 w-10 p-16 cursor-pointer hover:shadow-lg rounded-lg border hover:border-neutral-800";
        child.id = cardId;
        child.addEventListener("click", () => handleCardClick(child, i));
        container.appendChild(child);
    }    
}

const handleCardClick = (child, i) => {
    console.log("handleCardClick() BEGIN");
    const color = colorList[i];
    const unMatchedCard = lastCardClicked !== -1 ? document.getElementById('card_'+ lastCardClicked ) : null;
    const lastCardColor = unMatchedCard && unMatchedCard.classList.contains(isShown) ? colorList[lastCardClicked] : null;

    child.classList.add(color, isShown);
    child.classList.remove(cardHideColor);
    
    
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
        child.style.pointerEvents = 'none';

        setTimeout(() => {
            //Flip back Card when timeout is Over;            
            child.classList.add(cardHideColor);
            child.classList.remove(color, isShown);
            
            unMatchedCard.classList.add(cardHideColor);
            unMatchedCard.classList.remove(lastCardColor, isShown);
            
            //Enable Clicks
            child.style.pointerEvents = 'auto';
        }, 1000);
    }
    lastCardClicked = i;
    isSecondCardFlipped = !isSecondCardFlipped;
    console.log("Last Card clicked:"+i);    
    console.log("handleCardClick() END");
}

const colorList = [
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

document.addEventListener("DOMContentLoaded", renderGameCards);