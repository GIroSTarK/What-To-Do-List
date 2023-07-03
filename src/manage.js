export const createButton = (type, title) => {
  const button = document.createElement("button");
  button.classList.add("btn", type);
  button.setAttribute("title", title);
  return button;
};

export const createTermButton = (name, ...btnClass) => {
  const termButton = document.createElement("button");
  termButton.classList.add("main-button", ...btnClass);
  termButton.textContent = name;
  return termButton;
};

export const createTermInput = (placeholder, ...inputClass) => {
  const termInput = document.createElement("input");
  termInput.classList.add("term-input", ...inputClass);
  termInput.placeholder = placeholder;
  return termInput;
};

export const checkEmpty = (list, p) => {
  if (list.children.length > 0) p.classList.add("hide");
  else p.classList.remove("hide");
};

export const moveTask = (list, task) => {
  if (!task.classList.contains("completed")) list.prepend(task);
  else list.appendChild(task);
};

export const close = (target, termInput, termBtn, firstBtn, secondBtn) => {
  termBtn.remove();
  termInput.remove();
  target.replaceChild(firstBtn, secondBtn);
};

export const checkHidden = (list, p) => {
  if (list.getElementsByClassName("hide").length === list.children.length)
    p.classList.remove("hide");
  else p.classList.add("hide");
};
