const cardHideColor = 'bg-neutral-400';
const isShown = 'isShown';
let lastCardClicked = -1;

const renderGameCards = () => {
    const container = document.getElementById("grid");
    for(let i = 0; i<9; i++){
        const child = document.createElement('div');
        const cardId = 'card_'+i;
        const color = colorList[i];
        child.className = "bg-neutral-400 w-10 p-16 cursor-pointer hover:shadow-lg rounded-lg border hover:border-neutral-800";
        child.id = cardId;
        child.addEventListener("click", ()=>{
            console.log("Clicked");
            console.log("color:"+color+" last Color:"+colorList[lastCardClicked]);
            //Disable repeated clicks

            child.classList.add(color, isShown);
            child.classList.remove(cardHideColor);

            if(!child.classList.contains(isShown) && color !== colorList[lastCardClicked] && lastCardClicked!==-1){
                //Flip back both cards in 1 second, disable click back on current card for the time
                child.style.pointerEvents = 'none';
                setTimeout(() => {
                    //Flip back Card when timeout is Over;                    
                    child.classList.add(cardHideColor);
                    child.classList.remove(color, isShown);

                    //Flip back previous card too
                    const unMatchedCard = document.getElementById('card_'+lastCardClicked);
                    unMatchedCard.classList.add(cardHideColor);
                    unMatchedCard.classList.remove(colorList[lastCardClicked], isShown);

                    
                    //Enable Clicks
                    child.style.pointerEvents = 'auto';
                }, 1000);
            }
            lastCardClicked = i;
            console.log("Last Card clicked:"+i);
        });

        container.appendChild(child);
    }    
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