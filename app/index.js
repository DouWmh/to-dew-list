import { taskList, enableTaskSlot } from "./components/Task";
import document from "document";

function renderTasks(tasks) {
  for (let i = 0; i < 100; i++) {
    const bg = document.getElementById(`bg${i}`);
    const text = document.getElementById(`task${i}`);
    const tap = document.getElementById(`tap${i}`);

    const task = tasks[i];

    if (!bg || !text || !tap) continue;

    if (task) {
      enableTaskSlot(task, i); // show and bind
    } else {
      // Hide unused slot
      bg.style.display = "none";
      text.style.display = "none";
      tap.style.display = "none";
    }
  }
}

renderTasks(taskList);
