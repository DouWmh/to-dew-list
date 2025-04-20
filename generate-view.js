const fs = require("fs");

const TASK_HEIGHT = 40;
const MARGIN = 10;
const WIDTH = 320;
const X_PADDING = 10;
const Y_PADDING = 60;
const TASKS = 100; // Number of tasks
const TASKS_HEIGHT = TASK_HEIGHT * TASKS + MARGIN * (TASKS - 1) + Y_PADDING * 2; // Total height of tasks
const TASKS_WIDTH = WIDTH + X_PADDING * 2; // Total width of tasks

// Create the SVG file with the specified dimensions
let svg = `<svg id="root" width="${TASKS_WIDTH}" height="${TASKS_HEIGHT}" pointer-events="visible">\n
<g id="taskListContainer" pointer-events="visible">\n`;

for (let i = 0; i < TASKS; i++) {
  const y = Y_PADDING + i * (TASK_HEIGHT + MARGIN);
  svg += `
  <rect id="bg${i}" x="${X_PADDING}" y="${y}" width="${WIDTH}" height="${TASK_HEIGHT}" rx="8" ry="8" fill="#444444" />
  <text id="task${i}" x="${X_PADDING * 2}" y="${
    y + 28
  }" font-size="24" fill="white" text-length="250" />
  <rect id="tap${i}" x="0" y="${y}" width="348" height="${TASK_HEIGHT}" fill="white" fill-opacity="0.01" pointer-events="visible" />\n`;
}

svg += `</g>\n</svg>\n`;

fs.writeFileSync("resources\\index.view", svg, "utf-8");
console.log("✅ index.view generated!");
