// Lista de tareas: las tareas se guardan en localStorage del navegador.
const STORAGE_KEY = "jmnhello-tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

// Carga las tareas guardadas; si no hay nada o el JSON está roto, empieza vacío.
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Dibuja la lista completa a partir del array de tareas.
function render(tasks) {
  list.innerHTML = "";
  emptyMessage.hidden = tasks.length > 0;

  tasks.forEach((task) => {
    const item = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${task.id}`;
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = task.text;
    if (task.done) label.classList.add("done");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Borrar";
    deleteBtn.setAttribute("aria-label", `Borrar tarea: ${task.text}`);
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, label, deleteBtn);
    list.appendChild(item);
  });
}

function addTask(text) {
  const tasks = loadTasks();
  tasks.push({ id: Date.now(), text, done: false });
  saveTasks(tasks);
  render(tasks);
}

function toggleTask(id) {
  const tasks = loadTasks().map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks(tasks);
  render(tasks);
}

function deleteTask(id) {
  const tasks = loadTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
  render(tasks);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = "";
  input.focus();
});

render(loadTasks());
