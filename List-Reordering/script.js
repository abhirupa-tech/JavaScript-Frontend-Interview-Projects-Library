;import {People} from "./People.js";

const peopleCardContainer = document.getElementById("people-card-container");

const populatePeopleCards = () => {
    const peopleCards = People.map(people => {
        const card = document.createElement('div');
        card.className = 'my-2 cursor-pointer rounded-2xl border-2 border-neutral-100 hover:shadow-md width-full p-4 flex flex-row';
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content flex flex-col';

        const img = document.createElement('div');
        const imgContainer = document.createElement('div');
        imgContainer.className = 'flex items-center justify-center'
        img.className = `bg-cover bg-center bg-[url(${people.img})] p-1 mx-3 h-12 w-12 rounded-full`;
        imgContainer.appendChild(img);

        const name = document.createElement('div');
        name.textContent = people.name;

        const designation = document.createElement('div');
        designation.className = 'font-light';
        designation.textContent = people.position;
        designation.className = 'line-clamp-2';
        
        card.appendChild(imgContainer);
        cardContent.appendChild(name);
        cardContent.appendChild(designation);
        card.appendChild(cardContent)

        peopleCardContainer.appendChild(card);
    })
};

document.addEventListener('DOMContentLoaded',() => populatePeopleCards());