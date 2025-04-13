📱 Fitbit To-Do List App
A simple Fitbit smartwatch app that displays and manages a to-do list synced from your phone. Built using the Fitbit SDK, with gesture support and a colorful, responsive layout.

🚀 Features
✅ Checkmarks for completed tasks

📱 Phone-to-watch syncing via Companion API

🖐️ Gesture controls (tap/swipe)

🎨 Alternating colored task rows (blue, red, green, yellow)

🛠 Project Structure
bash
Copy
Edit
.
├── app/             # Watch app logic
├── companion/       # Phone companion code
├── resources/       # Images, fonts, views
├── settings/        # Optional app settings UI
├── package.json     # Project config and dependencies
└── README.md        # You're here!
⚙️ Getting Started
1. Install dependencies
bash
Copy
Edit
npm install
2. Build the app
bash
Copy
Edit
fitbit build
3. (Optional) Install on a device
bash
Copy
Edit
fitbit install
🧾 Sample Task Format (Sent from Companion)
js
Copy
Edit
[
  { id: 1, title: "Buy milk", done: true },
  { id: 2, title: "Walk the dog", done: false },
  { id: 3, title: "Code awesome stuff", done: true }
]
🧼 .gitignore
gitignore
Copy
Edit
node_modules/
build/
*.fba
build-log.txt
📜 License
MIT — Free to use and modify.

