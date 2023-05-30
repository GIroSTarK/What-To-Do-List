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

const createTask = (event) => {
  event.preventDefault();
  const inputField = inputForm.querySelector("input");
  if (inputField.value.trim() === "") return;
  const newTask = document.createElement("li");
  newTask.textContent = inputField.value;

  const deleteButton = createButton("delete-btn", "Видалити");
  const completeButton = createButton("complete-btn", "Відмітити як виконане");
  const favoriteButton = createButton("favorite-btn", "Додати до обраних");
  const removeFavButton = createButton(
    "remove-favorite-btn",
    "Видалити з обраних"
  );
  const editButton = createButton("edit-btn", "Редагувати");
  const noEditButton = createButton("edit-btn", "Закрити");

  deleteButton.addEventListener("click", deleteTask);

  completeButton.addEventListener("click", () => {
    if (taskList.contains(newTask)) {
      if (newTask.classList.contains("completed") !== true) {
        newTask.classList.add("completed");
        taskList.prepend(newTask);
      } else {
        newTask.classList.remove("completed");
        taskList.appendChild(newTask);
      }
    }
    if (favoriteList.contains(newTask)) {
      if (newTask.classList.contains("completed") !== true) {
        newTask.classList.add("completed");
        favoriteList.prepend(newTask);
      } else {
        newTask.classList.remove("completed");
        favoriteList.appendChild(newTask);
      }
    }
  });

  favoriteButton.addEventListener("click", () => {
    if (newTask.classList.contains("completed")) favoriteList.prepend(newTask);
    else favoriteList.appendChild(newTask);
    newTask.classList.add("favorite-task");
    favoriteButton.remove();
    newTask.appendChild(removeFavButton);
    newTask.appendChild(editButton);
    removeFavButton.addEventListener("click", () => {
      if (newTask.classList.contains("completed")) taskList.prepend(newTask);
      else taskList.appendChild(newTask);
      removeFavButton.remove();
      newTask.classList.remove("favorite-task");
      newTask.appendChild(favoriteButton);
      newTask.appendChild(editButton);
      checkEmpty(taskList, emptyPar);
      checkEmpty(favoriteList, emptyFavPar);
    });
    checkEmpty(taskList, emptyPar);
    checkEmpty(favoriteList, emptyFavPar);
  });

  editButton.addEventListener("click", () => {
    const termInput = document.createElement("input");
    termInput.classList.add("term-input");
    termInput.value = newTask.textContent;
    const termButton = document.createElement("button");
    termButton.classList.add("main-button", "term-button");
    termButton.textContent = "Змінити";
    editButton.remove();
    noEditButton.addEventListener("click", () => {
      termButton.remove();
      termInput.remove();
      noEditButton.remove();
      newTask.appendChild(editButton);
    });
    newTask.appendChild(noEditButton);
    termButton.addEventListener("click", () => {
      if (termInput.value !== "") {
        newTask.textContent = termInput.value;
        newTask.appendChild(deleteButton);
        newTask.appendChild(completeButton);
        if (taskList.contains(newTask)) newTask.appendChild(favoriteButton);
        else newTask.appendChild(removeFavButton);
        newTask.appendChild(editButton);
      }
    });
    termInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && termInput.value !== "") {
        newTask.textContent = termInput.value;
        newTask.appendChild(deleteButton);
        newTask.appendChild(completeButton);
        if (taskList.contains(newTask)) newTask.appendChild(favoriteButton);
        else newTask.appendChild(removeFavButton);
        newTask.appendChild(editButton);
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
