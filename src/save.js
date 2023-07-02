import { checkEmpty } from "./manage.js";
import {
  addTask,
  taskList,
  favoriteList,
  emptyPar,
  emptyFavPar,
} from "./app.js";

const grabTasks = (list) => {
  const tasks = Array.from(list.children).map((task) => ({
    text: task.textContent,
    completed: task.classList.contains("completed"),
  }));
  return tasks;
};

const renewTask = (task) => {
  const newTask = document.createElement("li");
  newTask.textContent = task.text;
  if (task.completed) newTask.classList.add("completed");
  return newTask;
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

window.addEventListener("beforeunload", saveTasksToStorage);
window.addEventListener("load", loadTasksFromStorage);
