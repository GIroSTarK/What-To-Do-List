"use strict";

const inputForm = document.querySelector("form");
const taskList = document.getElementById("taskList");
const emptyPar = document.getElementById("emptyParagraph");
const favoriteList = document.getElementById("favoriteList");
const emptyFavPar = document.getElementById("emptyFavParagraph");
const searchBlock = document.getElementById("searchBlock");
const searchButton = document.querySelector(".search-btn");

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

const removeFromFavorite = (task, favoriteBtn, removeFavBtn) => {
  if (task.classList.contains("completed")) taskList.prepend(task);
  else taskList.appendChild(task);
  task.classList.remove("favorite-task");
  task.replaceChild(favoriteBtn, removeFavBtn);
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
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
};

const createTermButton = (name, ...btnClass) => {
  const termButton = document.createElement("button");
  termButton.classList.add("main-button", ...btnClass);
  termButton.textContent = name;
  return termButton;
};

const createTermInput = (placeholder, ...inputClass) => {
  const termInput = document.createElement("input");
  termInput.classList.add("term-input", ...inputClass);
  termInput.placeholder = placeholder;
  return termInput;
};

const close = (target, termInput, termBtn, firstBtn, secondBtn) => {
  termBtn.remove();
  termInput.remove();
  target.replaceChild(firstBtn, secondBtn);
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

const addTask = (task, list) => {
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

const renewTask = (task) => {
  const newTask = document.createElement("li");
  newTask.textContent = task.text;
  if (task.completed) newTask.classList.add("completed");
  return newTask;
};

const grabTasks = (list) => {
  const tasks = Array.from(list.children).map((task) => ({
    text: task.textContent,
    completed: task.classList.contains("completed"),
  }));
  return tasks;
};

const saveTasksToStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(grabTasks(taskList)));
  localStorage.setItem(
    "favoriteTasks",
    JSON.stringify(grabTasks(favoriteList))
  );
};

const loadTasksFromStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const favTasks = JSON.parse(localStorage.getItem("favoriteTasks"));
  if (tasks) {
    for (const task of tasks) {
      const renewedTask = renewTask(task);
      addTask(renewedTask, taskList);
    }
  }
  if (favTasks) {
    for (const task of favTasks) {
      const renewedTask = renewTask(task);
      renewedTask.classList.add("favorite-task");
      addTask(renewedTask, favoriteList);
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
  addTask(newTask, taskList);
  inputField.value = "";
  checkEmpty(taskList, emptyPar);
  checkEmpty(favoriteList, emptyFavPar);
};

const search = (inputField) => {
  const searchText = inputField.value.toLowerCase();
  const tasks = document.getElementsByTagName("li");
  for (const task of tasks) {
    const taskText = task.textContent.toLowerCase();
    if (!taskText.includes(searchText)) task.classList.add("hide");
    else task.classList.remove("hide");
  }
};

searchButton.addEventListener("click", () => {
  const tasks = document.getElementsByTagName("li");
  const closeSearchButton = createButton("search-btn", "Закрити");
  const termInput = createTermInput("Пошук завдання", "term-search");
  const termButton = createTermButton(
    "Пошук",
    "term-search-btn",
    "term-search"
  );
  searchBlock.replaceChild(closeSearchButton, searchButton);
  closeSearchButton.addEventListener("click", () => {
    close(searchBlock, termInput, termButton, searchButton, closeSearchButton);
    for (const task of tasks) task.classList.remove("hide");
  });
  termButton.addEventListener("click", () => search(termInput));
  termInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") search(termInput);
  });
  searchBlock.insertBefore(termInput, closeSearchButton);
  termInput.focus();
  searchBlock.insertBefore(termButton, closeSearchButton);
});

inputForm.addEventListener("submit", createTask);
window.addEventListener("beforeunload", saveTasksToStorage);
window.addEventListener("load", loadTasksFromStorage);
