import document from "document";
import { addGestureListener } from "../utils/gestureHandler";

export const taskList = [
  { title: "Milk", done: false },
  { title: "Eggs", done: true },
  { title: "Bread", done: false },
  { title: "Butter", done: false },
  { title: "Apples", done: true },
  { title: "Bananas", done: false },
  { title: "Orange juice", done: true },
  { title: "Chicken breast", done: false },
  { title: "Rice", done: true },
  { title: "Pasta", done: false },
  { title: "Tomato sauce", done: true },
  { title: "Cheddar cheese", done: false },
  { title: "Yogurt", done: true },
  { title: "Cereal", done: false },
  { title: "Toilet paper", done: true },

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

  let currentY = 0; // Initialize currentY to 0
  let maxHeight = 0;
  // Add gesture detection
  addGestureListener(tap, (action, { deltaX, deltaY }) => {
    switch (action) {
      case "tap":
        console.log(`Tapped on task ${index}: ${task.title}`);
        // Handle tap action (e.g., toggle task done state)
        task.done = !task.done;
        text.text = `${task.done ? "✔" : "---"} ${task.title}`;
        break;
      case "hold":
        // Handle hold action (e.g., show options menu)
        break;
      case "swipe":
        console.log(`Swiped ${deltaY}`);
        maxHeight = taskListContainer.getBBox().height; // Get the height of the task list container
        currentY += deltaY; // Adjust the current position based on deltaY
        taskListContainer.style.transform = `translateY(${currentY}px)`;
        break; // Handle swipe action (e.g., delete task)
      default:
        break;
    }
  });
}
