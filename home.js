const plusIconBtn = document.getElementById('plus-icon-btn');
const inputContainer = document.getElementById('input-container');
const taskInput = document.getElementById('task-input');
const submitTaskBtn = document.getElementById('submit-task-btn');
const taskList = document.getElementById('task-list');
const downloadCardBtn = document.getElementById('download-card-btn');

// Load stored array systems
let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

document.addEventListener('DOMContentLoaded', renderTasks);

plusIconBtn.addEventListener('click', () => {
    inputContainer.classList.toggle('hidden');
    if (!inputContainer.classList.contains('hidden')) {
        taskInput.focus();
    }
});

function handleAddTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a valid task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveAndRefresh();
    taskInput.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";
    
    if (tasks.length > 0) {
        downloadCardBtn.classList.remove('hidden');
    } else {
        downloadCardBtn.classList.add('hidden');
    }
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        // Combined custom wrapper item block
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('task-content');
        
        const checkbox = document.createElement('div');
        checkbox.classList.add('task-checkbox');
        checkbox.innerHTML = task.completed ? '<i class="fa-solid fa-check"></i>' : '';

        const textNode = document.createElement('span');
        textNode.textContent = task.text;

        contentWrapper.appendChild(checkbox);
        contentWrapper.appendChild(textNode);
        
        contentWrapper.addEventListener('click', () => {
            task.completed = !task.completed;
            saveAndRefresh();
        });

        // Icon Trash Button Transformation Update
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('aria-label', 'Delete item');

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            saveAndRefresh();
        });

        li.appendChild(contentWrapper);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveAndRefresh() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
    renderTasks();
}

// Extract document and execute clean data wipe sequence
// Extract document and execute print layout
downloadCardBtn.addEventListener('click', () => {
    window.print();
    
    // REMOVED the clear tasks lines so the items stay on the screen!
});

submitTaskBtn.addEventListener('click', handleAddTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddTask();
});