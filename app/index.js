//App index.js
import document from "document";
import * as messaging from "messaging";

// Watch-side message handler
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data && evt.data.type === "todo-list") {
    displayTasks(evt.data.items);
  }
};

function displayTasks(tasks) {
  const colors = ["blue", "red", "green", "yellow", "purple", "orange"];

  tasks.forEach((task, index) => {
    let textElement = document.getElementById(`task${index}`);
    let bgElement = document.getElementById(`bg${index}`);

    if (textElement) {
      textElement.text = `${task.done ? "✔" : "      "} ${task.title}`;
    }

    if (bgElement) {
      bgElement.style.fill = colors[index % colors.length];
    }
  });
}
