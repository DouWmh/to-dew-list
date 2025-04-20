import document from "document";
import { addSwipeListener } from "../utils/swipeHandler";

export const taskList = [
  { title: "Buy milk", done: false },
  { title: "Walk the dog", done: true },
  { title: "Write JavaScript", done: false },
  { title: "Upload to GitHub", done: false },
  { title: "Plan dinner", done: true },
  { title: "Read a book", done: false },
  { title: "Go for a run", done: true },
  { title: "Call mom", done: false },
  { title: "Finish project", done: true },
  { title: "Clean the house", done: false },
  { title: "Buy groceries", done: true },
  { title: "Pay bills", done: false },
  { title: "Schedule appointment", done: true },
  { title: "Organize files", done: false },
  { title: "Plan vacation", done: true },
  // add more if needed
];

const colors = [
  "blue",
  "red",
  "green",
  "purple",
  "orange",
  "turquoise",
  "brown",
  "pink",
];

/**
 * Configures an existing slot in the view to show a task.
 */
export function enableTaskSlot(task, index) {
  const bg = document.getElementById(`bg${index}`);
  const text = document.getElementById(`task${index}`);
  const tap = document.getElementById(`tap${index}`);
  const taskListContainer = document.getElementById("taskListContainer"); // The container for the task list

  if (!bg || !text || !tap || !taskListContainer) return;

  // Ensure visibility
  bg.style.display = "inline";
  text.style.display = "inline";
  tap.style.display = "inline";

  // Style
  bg.style.fill = colors[index % colors.length];
  text.text = `${task.done ? "✔" : "---"} ${task.title}`;

  // Add swipe and drag detection
  let currentY = 0; // Track the current Y position of the task list
  addSwipeListener(tap, (action, data) => {
    switch (action) {
      case "drag":
        // Update the position of the task list container based on deltaY
        taskListContainer.style.transform = `translateY(${currentY + data.deltaY}px)`;
        break;
      case "drag-end":
        // Finalize the drag and update the current position
        currentY += data.deltaY;
        console.log("Drag ended. Final Y position:", currentY);
        break;
      case "tap":
        // Handle click (tap) event
        task.done = !task.done;
        text.text = `${task.done ? "✔" : "---"} ${task.title}`;
        console.log(`Task ${task.title} toggled.`);
        break;
      case "hold-1s":
        console.log(`Task ${task.title} held for 1 second.`);
        break;
      case "hold-2s":
        console.log(`Task ${task.title} held for 2 seconds.`);
        break;
      case "left":
        console.log(`Task ${task.title} swiped left.`);
        break;
      case "right":
        console.log(`Task ${task.title} swiped right.`);
        break;
    }
  });
}


