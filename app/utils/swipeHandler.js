export function addSwipeListener(element, callback) {
  let startX = 0;
  let startY = 0;
  let mouseStartTime = 0;
  let holdTimeout = null;
  let isDragging = false;

  function onMouseMove(event) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    // Cancel hold detection if the user moves the mouse
    clearTimeout(holdTimeout);

    // Trigger dragging if vertical movement is detected
    if (Math.abs(deltaY) > 10) {
      isDragging = true;
      callback("drag", { deltaX, deltaY });
    }
  }

  function onMouseUp(event) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const mouseDuration = Date.now() - mouseStartTime;

    // Clear the hold timeout
    clearTimeout(holdTimeout);

    if (isDragging) {
      callback("drag-end", { deltaX, deltaY });
    } else {
      // Detect swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) {
          callback("right");
        } else if (deltaX < -30) {
          callback("left");
        }
      } else if (Math.abs(deltaY) > 30) {
        if (deltaY > 30) {
          callback("down");
        } else if (deltaY < -30) {
          callback("up");
        }
      } else {
        // Detect click or hold
        if (mouseDuration < 1000) {
          callback("tap"); // Regular tap (click)
        } else if (mouseDuration < 2000) {
          callback("hold-1s"); // Hold for 1 second
        }
      }
    }

    // Remove event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  element.addEventListener("mousedown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    mouseStartTime = Date.now();
    isDragging = false;

    // Set timeout for hold detection
    holdTimeout = setTimeout(() => {
      callback("hold-2s");
    }, 2000); // 2 seconds for long hold

    // Attach mousemove and mouseup to the document
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}
