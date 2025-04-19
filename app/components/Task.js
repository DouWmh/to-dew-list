import document from "document";

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

  if (!bg || !text || !tap) return;

  // Make elements visible
  bg.style.display = "inline";
  text.style.display = "inline";
  tap.style.display = "inline";

  // Style and content
  bg.style.fill = colors[index % colors.length];
  text.text = `${task.done ? "✔" : "---"} ${task.title}`;

  // Tap interaction
  tap.onclick = () => {
    task.done = !task.done;
    text.text = `${task.done ? "✔" : "---"} ${task.title}`;
    console.log(`Toggled: ${task.title}`);
  };
}
