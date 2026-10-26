// Lista de tareas: guarda las tareas en localStorage para que persistan al recargar.
const STORAGE_KEY = "jmnhello-tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

// Lee las tareas guardadas; si el JSON está corrupto, empieza con una lista vacía.
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

// Dibuja la lista completa a partir del estado. Es simple y suficiente para pocas tareas.
function render(tasks) {
  list.replaceChildren();

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Marcar como hecha: " + task.text);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Borrar";
    deleteBtn.setAttribute("aria-label", "Borrar tarea: " + task.text);
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, text, deleteBtn);
    list.appendChild(li);
  });

  emptyMessage.hidden = tasks.length > 0;
}

function addTask(text) {
  const tasks = loadTasks();
  tasks.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2), text, done: false });
  saveTasks(tasks);
  render(tasks);
}

function toggleTask(id) {
  const tasks = loadTasks().map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks(tasks);
  render(tasks);
}

function deleteTask(id) {
  const tasks = loadTasks().filter((t) => t.id !== id);
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
