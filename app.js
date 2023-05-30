"use strict";

const inputForm = document.querySelector("form");
const taskList = document.getElementById("taskList");

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
  });

  newTask.appendChild(deleteButton);
  taskList.appendChild(newTask);
  inputField.value = "";
};

inputForm.addEventListener("submit", createTask);
