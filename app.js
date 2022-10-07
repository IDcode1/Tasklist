
// DEFINE UI VARS
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listerner
loadEventListeners();

// Load all event listeners 
function loadEventListeners(){
    // DOM Load Event 
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task evnt 
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTask);

    // Filter tasks event
    filter.addEventListener('keyup', fliterTasks);
}

// Get task in LS 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create li Element 
        const li = document.createElement('li');
        // Add className
        li.className = 'collection-item'
        // create text node and append 
        li.appendChild(document.createTextNode(task));

        // create link element 
        const link = document.createElement('a');
        // Add class 
        link.className = 'delete-item secondary-content';
        // Add icon html 
        link.innerHTML = '<i class = "fa fa-remove" ></i>';
        
        // Append link to li 
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li)
    })
}

// Add Task 
function addTask(e){
    if(taskInput.value === '') {
        alert('Add a task');
    }
    if(taskInput.value != ''){
        // create li Element 
        const li = document.createElement('li');
        // Add className
        li.className = 'collection-item'
        // create text node and append 
        li.appendChild(document.createTextNode(taskInput.value))

        // create link element 
        const link = document.createElement('a');
        // Add class 
        link.className = 'delete-item secondary-content';
        // Add icon html 
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        
        // Append link to li 
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li)

        // Store in LS 
        storeTaskInLocalStorage(taskInput.value);
        
        // clear input 
        taskInput.value = '';

        e.preventDefault();
    }
}

// Store Task 
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task 
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm ('Are you sure')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       } 
    }
}

// Remove task from LS 
function removeTaskFromLocalStorage(taskItems){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItems.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task 
function clearTask(){
    // taskList.innerHTML = '';

    // faster
    if(taskList.innerHTML != ''){
        if(confirm('Are you sure')) {
            while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild);
            }

            // clear Task from LS 
            clearTaskFromLocalStorage();
        }
    }
}

// Clear Task from LS 
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filter tasks 
function fliterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) === -1) {
                task.style.display = 'none';
            } else {
                task.style.display = 'block';
            }
        }
    );
}