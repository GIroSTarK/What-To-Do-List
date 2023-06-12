"use strict";

const inputForm = document.querySelector("form");
const taskList = document.getElementById("taskList");
const emptyPar = document.getElementById("emptyParagraph");
const favoriteList = document.getElementById("favoriteList");
const emptyFavPar = document.getElementById("emptyFavParagraph");

const checkEmpty = (list, p) => {
  if (list.children.length > 0) p.classList.add("hide");
  else p.classList.remove("hide");
};

const createButton = (type, title) => {
  const button = document.createElement("button");
  button.classList.add("btn", type);
  button.setAttribute("title", title);
  return button;
};

const moveTask = (list, task) => {
  if (!task.classList.contains("completed")) list.prepend(task);
  else list.appendChild(task);
};

const deleteTask = (event) => {
  const task = event.target.closest("li");
  task.remove();
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

const completeTask = (event) => {
  const task = event.target.closest("li");
  if (taskList.contains(task)) moveTask(taskList, task);
  if (favoriteList.contains(task)) moveTask(favoriteList, task);
  task.classList.toggle("completed");
};

const addFavoriteTask = (event) => {
  const task = event.target.closest("li");
  const favoriteButton = event.target;
  const removeFavButton = createButton(
    "remove-favorite-btn",
    "Видалити з обраних"
  );
  if (task.classList.contains("completed")) favoriteList.prepend(task);
  else favoriteList.appendChild(task);
  task.classList.add("favorite-task");
  task.replaceChild(removeFavButton, favoriteButton);
  removeFavButton.addEventListener("click", () => {
    if (task.classList.contains("completed")) taskList.prepend(task);
    else taskList.appendChild(task);
    task.classList.remove("favorite-task");
    task.replaceChild(favoriteButton, removeFavButton);
    checkEmpty(taskList, emptyPar);
    checkEmpty(favoriteList, emptyFavPar);
  });
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

const editTask = (event) => {
  const task = event.target.closest("li");
  const editButton = event.target;
  const buttonArray = Array.from(task.children);
  const stopEditButton = createButton("edit-btn", "Закрити");
  const termInput = document.createElement("input");
  termInput.classList.add("term-input");
  termInput.value = task.textContent;
  const termButton = document.createElement("button");
  termButton.classList.add("main-button", "term-button");
  termButton.textContent = "Змінити";
  task.replaceChild(stopEditButton, editButton);
  stopEditButton.addEventListener("click", () => {
    termButton.remove();
    termInput.remove();
    task.replaceChild(editButton, stopEditButton);
  });
  const edit = () => {
    task.textContent = termInput.value;
    for (const button of buttonArray) task.appendChild(button);
  };
  termButton.addEventListener("click", () => {
    if (termInput.value.trim() !== "") {
      edit();
    }
  });
  termInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && termInput.value.trim() !== "") {
      edit();
    }
  });
  task.appendChild(termInput);
  termInput.focus();
  task.appendChild(termButton);
};

const saveTasksToStorage = () => {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.textContent,
    completed: task.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const favoriteTasks = Array.from(favoriteList.children).map((task) => ({
    text: task.textContent,
    completed: task.classList.contains("completed"),
  }));
  localStorage.setItem("favoriteTasks", JSON.stringify(favoriteTasks));
};

const loadTasksFromStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const favTasks = JSON.parse(localStorage.getItem("favoriteTasks"));
  if (tasks) {
    for (const task of tasks) {
      const newTask = document.createElement("li");
      newTask.textContent = task.text;
      if (task.completed) {
        newTask.classList.add("completed");
      }

      const deleteButton = createButton("delete-btn", "Видалити");
      const completeButton = createButton(
        "complete-btn",
        "Відмітити як виконане"
      );
      const favoriteButton = createButton("favorite-btn", "Додати до обраних");
      const editButton = createButton("edit-btn", "Редагувати");

      deleteButton.addEventListener("click", deleteTask);
      completeButton.addEventListener("click", completeTask);
      favoriteButton.addEventListener("click", addFavoriteTask);
      editButton.addEventListener("click", editTask);

      newTask.appendChild(deleteButton);
      newTask.appendChild(completeButton);
      newTask.appendChild(favoriteButton);
      newTask.appendChild(editButton);
      taskList.appendChild(newTask);
    }
  }
  if (favTasks) {
    for (const task of favTasks) {
      const newTask = document.createElement("li");
      newTask.textContent = task.text;
      if (task.completed) {
        newTask.classList.add("completed");
      }
      newTask.classList.add("favorite-task");

      const deleteButton = createButton("delete-btn", "Видалити");
      const completeButton = createButton(
        "complete-btn",
        "Відмітити як виконане"
      );
      const favoriteButton = createButton("favorite-btn", "Додати до обраних");
      const removeFavButton = createButton(
        "remove-favorite-btn",
        "Видалити з обраних"
      );
      const editButton = createButton("edit-btn", "Редагувати");

      deleteButton.addEventListener("click", deleteTask);
      completeButton.addEventListener("click", completeTask);
      favoriteButton.addEventListener("click", addFavoriteTask);
      removeFavButton.addEventListener("click", () => {
        if (newTask.classList.contains("completed")) taskList.prepend(newTask);
        else taskList.appendChild(newTask);
        newTask.classList.remove("favorite-task");
        newTask.replaceChild(favoriteButton, removeFavButton);
        checkEmpty(taskList, emptyPar);
        checkEmpty(favoriteList, emptyFavPar);
      });
      editButton.addEventListener("click", editTask);

      newTask.appendChild(deleteButton);
      newTask.appendChild(completeButton);
      newTask.appendChild(removeFavButton);
      newTask.appendChild(editButton);
      favoriteList.appendChild(newTask);
    }
  }
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

const createTask = (event) => {
  event.preventDefault();
  const inputField = inputForm.querySelector("input");
  if (inputField.value.trim() === "") return;
  const newTask = document.createElement("li");
  newTask.textContent = inputField.value;

  const deleteButton = createButton("delete-btn", "Видалити");
  const completeButton = createButton("complete-btn", "Відмітити як виконане");
  const favoriteButton = createButton("favorite-btn", "Додати до обраних");
  const editButton = createButton("edit-btn", "Редагувати");

  deleteButton.addEventListener("click", deleteTask);
  completeButton.addEventListener("click", completeTask);
  favoriteButton.addEventListener("click", addFavoriteTask);
  editButton.addEventListener("click", editTask);

  newTask.appendChild(deleteButton);
  newTask.appendChild(completeButton);
  newTask.appendChild(favoriteButton);
  newTask.appendChild(editButton);
  taskList.appendChild(newTask);
  inputField.value = "";
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

inputForm.addEventListener("submit", createTask);
window.addEventListener("beforeunload", saveTasksToStorage);
window.addEventListener("load", loadTasksFromStorage);
