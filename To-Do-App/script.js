import { Task, Priority } from './Task.js';

const cellStyleCheckBoxCell = 'px-4 py-2 border-b w-[10%]';
const cellStyleCheckBox = 'w-10 text-[#D2B48C] hover:cursor-pointer';
const cellStyleTaskDescription = 'px-4 py-2 border-b w-[50%] text-left';
const cellStylePriority = 'px-4 py-2 border-b w-[20%] text-left'
const completedTaskCellStyle = 'line-through';
const rowStyle = 'px-4 border-b rounded-full text-center';
const priorityCellStyle = 'px-4 py-1 border-b rounded-full text-center text-sm';

const pendingTasks = [
    Task.createTask("Complete your JavaScript Assignment", Priority.P1, '2025-01-10'), // Adding a Dummy Data
    Task.createTask("Build your Travel Itinerary", Priority.P0, '2025-01-10'), // Adding a Dummy Data
];

const completedTasks = [
    Task.createTask("LinkedIn Post on Creating a Github Repo of Frontend Projects", Priority.P1, '2025-01-10'), // Adding a Dummy Data
];
completedTasks[0].isCompleted = true;

/** Util Function to Populate Tasks within the element */
const buildTable = (table_id, tasks) => {
    const table = document.getElementById(table_id);
    tasks.forEach(task => {
        table.appendChild(buildTableCell(task));
    });
}

/** Util to format and add content to a table cell */
const buildTableCell = (cellContent) => {

    // Create a table row element
    const taskRow = document.createElement('tr');

    // Create and append the checkbox cell
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    observer.observe(checkbox, { attributes: true });
    checkbox.checked = cellContent.isCompleted;
    checkbox.onclick = function() { handleCheckboxClick(this); };
    checkbox.className = cellStyleCheckBox;
    checkboxCell.className = cellStyleCheckBoxCell;
    checkboxCell.appendChild(checkbox);
    taskRow.appendChild(checkboxCell);

    // Create and append the description cell
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = cellContent.description;
    descriptionCell.className = cellContent.isCompleted ? cellStyleTaskDescription + " " + completedTaskCellStyle : cellStyleTaskDescription;
    taskRow.appendChild(descriptionCell);

    // Create and append the priority cell
    const priorityCell = document.createElement('td');
    const priorityChunk = document.createElement('span');
    priorityChunk.textContent = cellContent.priority;
    priorityChunk.className= priorityCellStyle + " " + stylePriorityCell(priorityChunk, cellContent.priority);
    priorityCell.appendChild(priorityChunk);
    priorityCell.className = cellStylePriority;
    taskRow.appendChild(priorityCell);

    // Create and append the due date cell
    const dueDateCell = document.createElement('td');
    dueDateCell.textContent = cellContent.due;
    taskRow.appendChild(dueDateCell);
    taskRow.className = rowStyle;

    return taskRow;
}

/** Function to handle checkbox click */
function handleCheckboxClick(checkbox) {
    const taskRow = checkbox.closest('tr');
    const descriptionCell = taskRow.querySelector('td:nth-child(2)');
    const taskDescription = descriptionCell.textContent;

    // Find the task in pendingTasks or completedTasks
    let task = pendingTasks.find(t => t.description === taskDescription) ;

    if (task) {
        task.isCompleted = checkbox.checked;
        descriptionCell.className = task.isCompleted ? cellStyleTaskDescription + " " + completedTaskCellStyle : cellStyleTaskDescription;
    }
    console.log(task.isCompleted ? 'Checkbox is checked' : 'Checkbox is unchecked');
}

const addSingleTask = (task) => {
    buildTable("pending-tasks", [task]);
}

const stylePriorityCell = (cell, priority) => {
    switch(priority) {
        case Priority.P0:
            return 'bg-red-100 border border-red-700';
        case Priority.P1:
            return 'bg-orange-100 border border-orange-700';
        case Priority.P2:
            return 'bg-yellow-100 border border-yellow-700';
        case Priority.P3:
            return 'bg-green-100 border border-green-700';
        default:
            return 'bg-gray-500 border border-gray-700';
    }
}

/** MutationObserver to observe changes to checkbox attributes */
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log("Mutation detected");
        if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
            const checkbox = mutation.target;
            handleCheckboxClick(checkbox);
        }
    });
});

const handleOnSubmitClick = () => {
    console.log("Submit Clicked");
    
    const taskDescription = document.getElementById('task-input').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;

    const newTask = Task.createTask(taskDescription, priority, dueDate)
    addSingleTask(newTask);
    pendingTasks.push(newTask);
}

const init = () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority');
    const dueDateInput = document.getElementById('due-date');
    const submitButton = document.getElementById('submit-button');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); 
    
    
    buildTable("pending-tasks", pendingTasks);

    const checkInputs = () => {
        console.log("Checking state")
        if (taskInput.value && prioritySelect.value && dueDateInput.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    };
    
    taskInput.addEventListener('input', checkInputs);
    prioritySelect.addEventListener('change', checkInputs);
    dueDateInput.addEventListener('input', checkInputs);
    document.getElementById('submit-button').addEventListener('click', handleOnSubmitClick);
    submitButton.disabled = true;

    checkboxes.forEach(checkbox => {
        observer.observe(checkbox, { attributes: true });
    });
}

document.addEventListener('DOMContentLoaded', init);
