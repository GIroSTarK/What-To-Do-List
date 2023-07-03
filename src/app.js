import {
  checkEmpty,
  moveTask,
  createButton,
  createTermInput,
  createTermButton,
  close,
  checkHidden,
} from "./manage.js";
import "./save.js";
import "./search.js";

export const inputForm = document.querySelector("form");
export const taskList = document.getElementById("taskList");
export const emptyPar = document.getElementById("emptyParagraph");
export const favoriteList = document.getElementById("favoriteList");
export const emptyFavPar = document.getElementById("emptyFavParagraph");

const deleteTask = (event) => {
  const task = event.target.closest("li");
  task.remove();
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
  checkHidden(taskList, emptyPar);
  checkHidden(favoriteList, emptyFavPar);
};

const completeTask = (event) => {
  const task = event.target.closest("li");
  if (taskList.contains(task)) moveTask(taskList, task);
  if (favoriteList.contains(task)) moveTask(favoriteList, task);
  task.classList.toggle("completed");
};

const removeFromFavorite = (task, favoriteBtn, removeFavBtn) => {
  if (task.classList.contains("completed")) taskList.prepend(task);
  else taskList.appendChild(task);
  task.classList.remove("favorite-task");
  task.replaceChild(favoriteBtn, removeFavBtn);
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
  checkHidden(taskList, emptyPar);
  checkHidden(favoriteList, emptyFavPar);
};

const addToFavorite = (event) => {
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
  removeFavButton.addEventListener("click", () =>
    removeFromFavorite(task, favoriteButton, removeFavButton)
  );
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
  checkHidden(taskList, emptyPar);
  checkHidden(favoriteList, emptyFavPar);
};

const editTask = (event) => {
  const task = event.target.closest("li");
  const editButton = event.target;
  const buttonArray = Array.from(task.children);
  const stopEditButton = createButton("edit-btn", "Закрити");
  const termInput = createTermInput("Введіть нову назву");
  termInput.value = task.textContent;
  const termButton = createTermButton("Замінити", "term-button");
  task.replaceChild(stopEditButton, editButton);
  stopEditButton.addEventListener("click", () =>
    close(task, termInput, termButton, editButton, stopEditButton)
  );
  const edit = () => {
    task.textContent = termInput.value;
    for (const button of buttonArray) task.appendChild(button);
  };
  termButton.addEventListener("click", () => {
    if (termInput.value.trim() !== "") edit();
  });
  termInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && termInput.value.trim() !== "") edit();
  });
  task.appendChild(termInput);
  termInput.focus();
  task.appendChild(termButton);
};

export const addTask = (task, list) => {
  list.appendChild(task);
  const deleteButton = createButton("delete-btn", "Видалити");
  const completeButton = createButton("complete-btn", "Відмітити як виконане");
  const favoriteButton = createButton("favorite-btn", "Додати до обраних");
  const removeFavButton = createButton(
    "remove-favorite-btn",
    "Видалити з обраних"
  );
  const editButton = createButton("edit-btn", "Редагувати");

  deleteButton.addEventListener("click", deleteTask);
  completeButton.addEventListener("click", completeTask);
  favoriteButton.addEventListener("click", addToFavorite);
  removeFavButton.addEventListener("click", () =>
    removeFromFavorite(task, favoriteButton, removeFavButton)
  );
  editButton.addEventListener("click", editTask);

  task.appendChild(deleteButton);
  task.appendChild(completeButton);
  if (taskList.contains(task)) task.appendChild(favoriteButton);
  else task.appendChild(removeFavButton);
  task.appendChild(editButton);
};

const createTask = (event) => {
  event.preventDefault();
  const inputField = inputForm.querySelector("input");
  if (inputField.value.trim() === "") return;
  const newTask = document.createElement("li");
  newTask.textContent = inputField.value;
  addTask(newTask, taskList);
  inputField.value = "";
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
  checkHidden(taskList, emptyPar);
  checkHidden(favoriteList, emptyFavPar);
};

inputForm.addEventListener("submit", createTask);
