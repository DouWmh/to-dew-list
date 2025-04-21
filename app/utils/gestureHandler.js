// This function adds a gesture listener to an element that detects tap, hold, and swipe gestures.
import document from "document";

export function addGestureListener(element, callback) {
  let pressX = 0; // Mouse down X coordinate
  let pressY = 0; // Mouse down Y coordinate
  let startX = 0; // Beginning X coordinate of frame gesture
  let startY = 0; // Beginning Y coordinate of frame gesture
  let endX = 0; // Ending X coordinate of frame gesture
  let endY = 0; // Ending Y coordinate of frame gesture
  let distX = 0; // Distance in X coordinate of gesture
  let distY = 0; // Distance in Y coordinate of gesture
  let deltaX = 0; // Change in X coordinate of frame gesture
  let deltaY = 0; // Change in Y coordinate of frame gesture
  let holdStartTime = 0; // Time when the hold gesture started
  let isHolding = false; // Flag to indicate if a hold gesture is in progress
  let isMovingX = false; // Flag to indicate if a swipe gesture is in progress in the X direction
  let isMovingY = false; // Flag to indicate if a swipe gesture is in progress in the Y direction
  let holdTimeout = null; // Timeout ID for the hold gesture
  const HOLD_THRESHOLD = 1500; // Time in ms to consider a hold gesture
  const MOVE_THRESHOLD = 10; // Distance in pixels to consider a move gesture
  const TAP_DURATION_THRESHOLD = 100; // Time in ms to consider a tap gesture

  function onMouseDown(event) {
    pressX = event.screenX; // Set the X coordinate of the mouse down event
    pressY = event.screenY; // Set the Y coordinate of the mouse down event
    startX = event.screenX; // Set the starting X coordinate of the frame gesture
    startY = event.screenY; // Set the starting Y coordinate of the frame gesture

    holdStartTime = Date.now();
    isHolding = true;
    holdTimeout = setTimeout(() => {
      callback("hold", { deltaX, deltaY });
    }, HOLD_THRESHOLD); // Hold duration threshold
  }

  function onMouseMove(event) {
    endX = event.screenX;
    endY = event.screenY;
    distX = Math.abs(endX - pressX); // Calculate the absolute distance in X direction
    distY = Math.abs(endY - pressY); // Calculate the absolute distance in Y direction

    isMovingX = distX > MOVE_THRESHOLD && !isMovingY; // Check if the swipe is in the X direction
    isMovingY = distY > MOVE_THRESHOLD && !isMovingX; // Check if the swipe is in the Y direction

    if (isMovingX) {
      // If moving in X direction, set deltaX and reset deltaY
      deltaX = endX - startX; // Calculate the change in X coordinate
      deltaY = 0; // Reset deltaY to 0
    } else if (isMovingY) {
      // If moving in Y direction, set deltaY and reset deltaX
      deltaY = endY - startY; // Calculate the change in Y coordinate
      deltaX = 0; // Reset deltaX to 0
    } else {
      // If not moving in either direction, reset both deltas
      deltaX = 0;
      deltaY = 0;
    }
    startX = endX; // Update startX to the current position
    startY = endY; // Update startY to the current position
    Move({ deltaX, deltaY }); // Call Move function with current deltas
  }

  function Move({ deltaX, deltaY }) {
    if (isHolding) {
      clearTimeout(holdTimeout);
      isHolding = false;
    }
    callback("swipe", { deltaX, deltaY }); // Update startY to the current position
  }

  function onMouseUp(event) {
    const duration = Date.now() - holdStartTime; // Calculate the duration of the hold gesture

    clearTimeout(holdTimeout); // Clear the hold timeout
    isHolding = false; // Reset holding state
    isMovingX = false; // Reset moving state
    isMovingY = false; // Reset moving state
    deltaX = 0; // Reset deltaX
    deltaY = 0; // Reset deltaY
    distX = 0; // Reset distX
    distY = 0; // Reset distY
    // Detect tap (no significant movement and short duration)
    if (
      distX < MOVE_THRESHOLD &&
      distY < MOVE_THRESHOLD &&
      duration < TAP_DURATION_THRESHOLD
    ) {
      console.log("Tap detected");
      callback("tap", { deltaX, deltaY });
    }
  }

  element.addEventListener("mousedown", onMouseDown);
  element.addEventListener("mouseup", onMouseUp);
  element.addEventListener("mousemove", onMouseMove);
}
