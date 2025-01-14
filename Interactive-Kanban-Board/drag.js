const newTasks = document.getElementById('new');
const ongoingTasks = document.getElementById('ongoing');
const closedTasks = document.getElementById('closed');
const draggableElements = document.querySelectorAll('.task');
const droppableElements = document.querySelectorAll('.lane');

// Styles to be applied to Dragged Tasks While Dragging
draggableElements.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("bg-neutral-200","border");
    });
    
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("bg-neutral-200", "border");
    });
})

droppableElements.forEach( droppable => {
    droppable.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
})

document.addEventListener('DOMContentLoaded', () => init());


const init = () =>{
    initSortable();
}


const initSortable = () => {
    console.log("Initializing Sortable...")
    new Sortable(newTasks, {
        group: 'kanban',
        animation: 150
    });

    new Sortable(ongoingTasks, {
        group: 'kanban',
        animation: 150
    });

    new Sortable(closedTasks, {
        group: 'kanban',
        animation: 150
    });
}