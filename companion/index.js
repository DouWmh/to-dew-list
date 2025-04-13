//Companion index.js
import * as messaging from "messaging";

function sendMockTasks() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      type: "todo-list",
      items: [
        { id: 1, title: "Buy milk", done: true },
        { id: 2, title: "Walk the dog", done: false },
        { id: 3, title: "Test", done: true },
      ],
    });
  } else {
    console.log("⚠️ Peer socket not open");
  }
}

messaging.peerSocket.onopen = () => {
  console.log("✅ Companion socket open");
  sendMockTasks(); // send tasks when the app starts
};

messaging.peerSocket.onerror = (err) => {
  console.log("❌ Companion socket error: " + err);
};
