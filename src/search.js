import {
  createButton,
  createTermInput,
  createTermButton,
  close,
  checkHidden,
} from "./manage.js";
import { taskList, favoriteList, emptyPar, emptyFavPar } from "./app.js";

const searchBlock = document.getElementById("searchBlock");
const searchButton = document.querySelector(".search-btn");

const search = (inputField) => {
  const searchText = inputField.value.toLowerCase();
  const tasks = document.getElementsByTagName("li");
  for (const task of tasks) {
    const taskText = task.textContent.toLowerCase();
    if (!taskText.includes(searchText)) task.classList.add("hide");
    else task.classList.remove("hide");
  }
  checkHidden(taskList, emptyPar);
  checkHidden(favoriteList, emptyFavPar);
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
    checkHidden(taskList, emptyPar);
    checkHidden(favoriteList, emptyFavPar);
  });
  termButton.addEventListener("click", () => search(termInput));
  termInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") search(termInput);
  });
  searchBlock.insertBefore(termInput, closeSearchButton);
  termInput.focus();
  searchBlock.insertBefore(termButton, closeSearchButton);
});
