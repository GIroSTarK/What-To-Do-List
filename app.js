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

const deleteTask = (event) => {
  const task = event.target.closest("li");
  task.remove();
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

const completeTask = (event) => {
  const task = event.target.closest("li");
  if (taskList.contains(task)) {
    if (task.classList.contains("completed") !== true) taskList.prepend(task);
    else taskList.appendChild(task);
  }
  if (favoriteList.contains(task)) {
    if (task.classList.contains("completed") !== true)
      favoriteList.prepend(task);
    else favoriteList.appendChild(task);
  }
  task.classList.toggle("completed");
};

const addFavoriteTask = (event) => {
  const task = event.target.closest("li");
  const removeFavButton = createButton(
    "remove-favorite-btn",
    "Видалити з обраних"
  );
  if (task.classList.contains("completed")) favoriteList.prepend(task);
  else favoriteList.appendChild(task);
  task.classList.add("favorite-task");
  task.replaceChild(removeFavButton, event.target);
  removeFavButton.addEventListener("click", () => {
    if (task.classList.contains("completed")) taskList.prepend(task);
    else taskList.appendChild(task);
    task.classList.remove("favorite-task");
    task.replaceChild(event.target, removeFavButton);
    checkEmpty(taskList, emptyPar);
    checkEmpty(favoriteList, emptyFavPar);
  });
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

  editButton.addEventListener("click", () => {
    const buttonArray = Array.from(newTask.children);
    const noEditButton = createButton("edit-btn", "Закрити");
    const termInput = document.createElement("input");
    termInput.classList.add("term-input");
    termInput.value = newTask.textContent;
    const termButton = document.createElement("button");
    termButton.classList.add("main-button", "term-button");
    termButton.textContent = "Змінити";
    newTask.replaceChild(noEditButton, editButton);
    noEditButton.addEventListener("click", () => {
      termButton.remove();
      termInput.remove();
      newTask.replaceChild(editButton, noEditButton);
    });
    termButton.addEventListener("click", () => {
      if (termInput.value !== "") {
        newTask.textContent = termInput.value;
        for (const button of buttonArray) {
          newTask.appendChild(button);
        }
      }
    });
    termInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && termInput.value !== "") {
        newTask.textContent = termInput.value;
        for (const button of buttonArray) {
          newTask.appendChild(button);
        }
      }
    });
    newTask.appendChild(termInput);
    termInput.focus();
    newTask.appendChild(termButton);
  });

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
