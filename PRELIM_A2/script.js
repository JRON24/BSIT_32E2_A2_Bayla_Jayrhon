document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (task === '') return;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-warning edit-button">Edit</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;

        taskList.appendChild(listItem);
        taskInput.value = '';
        saveTasks();
    }

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.closest('li');

        if (e.target.classList.contains('delete-button')) {
            listItem.remove();
        } else if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
        } else if (e.target.classList.contains('edit-button')) {
            const taskText = listItem.querySelector('span');
            const newTask = prompt('Edit your task:', taskText.textContent);
            if (newTask) taskText.textContent = newTask;
        }

        saveTasks();
    });

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }
});