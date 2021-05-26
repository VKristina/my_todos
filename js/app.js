// Select DOM
const todoInput    = document.querySelector(".todo-input");
const todoButton   = document.querySelector(".todo-button");
const todoList     = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(e) {
  // Prevent natural behaviour
  e.preventDefault();
  
  // Створення div та todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  // Створити елемент li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  
  // Зберегти в local
  saveLocalTodos(todoInput.value);
  
  // Додати клас todo-item 
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  
  // створитии кнопку завершено
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  
  // Створитии кнопку видалити
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  
  // Додати фінальне Todo
  todoList.appendChild(todoDiv);
}

// Видалити Справу
function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");
    // at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

// Фільтер: Всі, Виконано, Виконується 
function filterTodo(e) {
  const todos = todoList.childNodes;
  
  // Метод *.forEach дозволяє запускати функцію function(todo) для кожного елемента масиву.
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// Зберегти в Local Storage
function saveLocalTodos(todo) {
  let todos;
  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Видалити з Local Storage
function removeLocalTodos(todo) {
  let todos;
  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Функція Список справ Local Storage
function getTodos() {
  let todos;
  
  // Перевірка умов
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  // Метод *.forEach дозволяє запускати функцію function(todo) для кожного елемента масиву.
  todos.forEach(function(todo) {
  
    // Створення todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    // Ствоерння списку
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    
    // Створення кнопки + додати
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    // Створення кнопки видалити
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    // Прикріпити остаточний Todo
    todoList.appendChild(todoDiv);
  });
}