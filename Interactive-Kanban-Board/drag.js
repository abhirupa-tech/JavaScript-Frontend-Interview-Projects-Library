const newTasks = document.getElementById('new');
const ongoingTasks = document.getElementById('ongoing');
const closedTasks = document.getElementById('closed');
const draggableElements = document.querySelectorAll('.task');
const droppableElements = document.querySelectorAll('.lane');

// Function to add event listeners to a task
const addDragEventListeners = (task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("bg-neutral-200", "border", "is-dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("bg-neutral-200", "border", "is-dragging");
    });
};

// Add event listeners to existing tasks
draggableElements.forEach(draggable => {
    addDragEventListeners(draggable);
});

droppableElements.forEach(droppable => {
    droppable.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(droppable, e.clientY);
        const currentTask = document.querySelector('.is-dragging');

        if (!bottomTask) {
            droppable.appendChild(currentTask);
        } else {
            droppable.insertBefore(currentTask, bottomTask);
        }
    });
});

const insertAboveTask = (lane, mouseY) => {
    const tasks = lane.querySelectorAll('.task:not(.is-dragging)');
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    tasks.forEach((task) => {
        const top = task.getBoundingClientRect().top;
        const offset = mouseY - top;
        if (offset > 0 && offset < closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the task description value
    const taskDesc = document.getElementById('task-desc').value;

    // Create a new task card
    const taskCard = document.createElement('div');
    taskCard.classList.add('p-1', 'task', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'items-start', 'm-2');
    taskCard.setAttribute('draggable', 'true');

    // Add SVG to the task card
    const svgContainer = document.createElement('div');
    svgContainer.classList.add('flex-shrink-0', 'p-1', 'cursor-pointer');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke-width', '1.5');
    svg.setAttribute('stroke', 'currentColor');
    svg.classList.add('size-6');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', 'M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5');
    svg.appendChild(path);

    svgContainer.appendChild(svg);
    taskCard.appendChild(svgContainer);

    // Add description to the task card
    const desc = document.createElement('p');
    desc.classList.add('task-description', 'text-sm', 'font-light', 'line-clamp-3', 'p-1');
    desc.textContent = taskDesc;
    taskCard.appendChild(desc);

    // Append the task card to the task list
    newTasks.appendChild(taskCard);

    // Add event listeners to the new task card
    addDragEventListeners(taskCard);

    // Clear the form
    document.getElementById('task-form').reset();
});
