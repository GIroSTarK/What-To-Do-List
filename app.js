"use strict";

const inputForm = document.querySelector("form");
const taskList = document.getElementById("taskList");
const emptyPar = document.getElementById("emptyParagraph");
const favoriteList = document.getElementById("favoriteList");

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
  });

  const completeButton = document.createElement("button");
  completeButton.classList.add("btn", "complete-btn");
  completeButton.setAttribute("title", "Відмітити як виконане");
  completeButton.addEventListener("click", () => {
    if (newTask.classList.contains("completed") !== true) {
      newTask.classList.add("completed");
      taskList.prepend(newTask);
    } else {
      newTask.classList.remove("completed");
      taskList.appendChild(newTask);
    }
  });

  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("btn", "favorite-btn");
  favoriteButton.setAttribute("title", "Додати до обраних");
  favoriteButton.addEventListener("click", () => {
    if (newTask.classList.contains("completed")) favoriteList.prepend(newTask);
    else favoriteList.appendChild(newTask);
    newTask.classList.add("favorite-task");
    checkEmpty(taskList, emptyPar);
  });

  newTask.appendChild(deleteButton);
  newTask.appendChild(completeButton);
  newTask.appendChild(favoriteButton);
  taskList.appendChild(newTask);
  inputField.value = "";
  checkEmpty(taskList, emptyPar);
};

inputForm.addEventListener("submit", createTask);
