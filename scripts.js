const todoList = [];

const todoListElement = document.querySelector("#myUL");

document.querySelector("#addButton").addEventListener("click", addTodo);
document.querySelector("#enterInput").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    addTodo();
  }
});

function addTodo() {
  const todoText = document.querySelector("#enterInput").value;

  if (todoText == "") {
    alert("Please enter a task to be done");
  } else {
    const todoObject = {
      id: todoList.length,
      todoText: todoText,
      isDone: false,
    };

    todoList.push(todoObject);
    displayTodos();
  }
}

function doneTodo(todoId) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

  if (todoList[selectedTodoIndex].isDone) {
    todoList[selectedTodoIndex].isDone = false;
  } else {
    todoList[selectedTodoIndex].isDone = true;
  }
  displayTodos();
}

// deleting items
function deleteItem(x) {
  todoList.splice(
    todoList.findIndex((item) => item.id == x),
    1
  );
  displayTodos();
}

function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#enterInput").value = "";

  todoList.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);

    delBtn.setAttribute("data-id", item.id);
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    delBtn.setAttribute("data-id", item.id);

    if (item.isDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    todoListElement.appendChild(listElement);
    listElement.appendChild(delBtn);
  });
}
