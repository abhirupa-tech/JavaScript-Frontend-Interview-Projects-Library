const renderGameCards = () => {
    const container = document.getElementById("grid");
    for(let i = 1; i<=9; i++){
        const child = document.createElement('div');
        const color = colorList[i-1];
        child.className = "bg-neutral-400 w-10 p-16 cursor-pointer hover:shadow-lg rounded-lg border hover:border-neutral-800";
        child.addEventListener("click", ()=>)
        container.appendChild(child);
    }    
}

const colorList = [
    'amber-600',
    'lime-500',
    'cyan-400',
    'indigo-400',
    'neutral-800',
    'amber-600',
    'cyan-400',
    'lime-500',    
    'indigo-400'
]

document.addEventListener("DOMContentLoaded", renderGameCards);