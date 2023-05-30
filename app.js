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

const createTask = (event) => {
  event.preventDefault();
  const inputField = inputForm.querySelector("input");
  if (inputField.value.trim() === "") return;
  const newTask = document.createElement("li");
  newTask.textContent = inputField.value;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "delete-btn");
  deleteButton.setAttribute("title", "Видалити");
  deleteButton.addEventListener("click", () => {
    newTask.remove();
    checkEmpty(taskList, emptyPar);
    checkEmpty(favoriteList, emptyFavPar);
  });

  const completeButton = document.createElement("button");
  completeButton.classList.add("btn", "complete-btn");
  completeButton.setAttribute("title", "Відмітити як виконане");
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

  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("btn", "favorite-btn");
  favoriteButton.setAttribute("title", "Додати до обраних");
  const removeFavButton = document.createElement("button");
  removeFavButton.classList.add("btn", "remove-favorite-btn");
  removeFavButton.setAttribute("title", "Видалити з обраних");
  favoriteButton.addEventListener("click", () => {
    if (newTask.classList.contains("completed")) favoriteList.prepend(newTask);
    else favoriteList.appendChild(newTask);
    newTask.classList.add("favorite-task");
    favoriteButton.remove();
    newTask.appendChild(removeFavButton);
    removeFavButton.addEventListener("click", () => {
      if (newTask.classList.contains("completed")) taskList.prepend(newTask);
      else taskList.appendChild(newTask);
      removeFavButton.remove();
      newTask.classList.remove("favorite-task");
      newTask.appendChild(favoriteButton);
      checkEmpty(taskList, emptyPar);
      checkEmpty(favoriteList, emptyFavPar);
    });
    checkEmpty(taskList, emptyPar);
    checkEmpty(favoriteList, emptyFavPar);
  });

  newTask.appendChild(deleteButton);
  newTask.appendChild(completeButton);
  newTask.appendChild(favoriteButton);
  taskList.appendChild(newTask);
  inputField.value = "";
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

inputForm.addEventListener("submit", createTask);
