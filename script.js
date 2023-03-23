// JS Code

// Multiple const Variables
const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");

// Varables for edit function
let editId; 
let isEditableTask = false;


// Initially getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list")); // Dynamically getting todo-list to add multiple data

// Step-7(function for filters)
filters.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDoList(btn.id); 
    })
})

// Step-2(Function to show the ToDoList dynamically in the app)
function showToDoList(filter) {
    let liTag = ""; 
    if (todos) {
        todos.forEach((todo, id) => { 

            let isCompleted = todo.status == "completed" ? "checked" : "";

            if(filter == todo.status || filter == "all"){ 
                // Using Template Literals
                liTag += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}> 
                        <p class="${isCompleted}">${todo.name}</p> 
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id},"${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }
            
        });
    }
    // If li isn't empty, insert this value inside taskbox else insert span
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
}
showToDoList("all"); 

// Step-4(This function will show menu that is delete and update options)
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show"); 

    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show"); 
        }
    })
}


// Step-6
function editTask(taskId, taskName) {
    editId = taskId; 
    isEditableTask = true; 
    taskInput.value = taskName; 
}


// Step-5
function deleteTask(deleteId, filter) {
    // removing selected task from array/todos
    todos.splice(deleteId, 1); 
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDoList(filter); 
}


// Step-3(Function to run checkbox dynamically)
function updateStatus(selectedTask) { // selectedTask is parameter
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked"); 
        todos[selectedTask.id].status = "completed"; 
    } else {
        taskName.classList.remove("checked"); 
        todos[selectedTask.id].status = "pending"; 
    }

    localStorage.setItem("todo-list", JSON.stringify(todos)); 
}

// Step-7(Function for Clear All btn)
clearAll.addEventListener("click", ()=>{
    todos.splice(0, todos.length); // Removing all items of array/todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDoList("all");
})

// Step-1(Function to add tasks in ToDoList)
taskInput.addEventListener("keyup", e => {
    // Taking the value of user input
    let userTask = taskInput.value.trim();

    // If key pressed is Enter and we have its value, only then execute the below code
    if (e.key == "Enter" && userTask) {

        if (!isEditableTask) { // If isEditableTask isn't true 
            // If Todos isn't exist(that means !todos), pass an empty array to todos, otherwise append the new todos
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" }; 
            todos.push(taskInfo); 
        } else {
            isEditableTask = false;
            todos[editId].name = userTask; 
        }

        taskInput.value = ""; 

        // Setting(Storing) the data(input) in local storage(setting the value of todos in todo-list)
        localStorage.setItem("todo-list", JSON.stringify(todos));

        showToDoList("all");
    }
})











