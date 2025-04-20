// This function adds a gesture listener to an element that detects tap, hold, and swipe gestures.
import document from "document";

export function addGestureListener(element, callback) {
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let startTime = 0;
  let isHolding = false;
  let isMovingX = false;
  let isMovingY = false;
  let holdTimeout = null;
  const HOLD_THRESHOLD = 1500; // Time in ms to consider a hold gesture
  const TAP_DISTANCE_THRESHOLD = 10; // Distance in pixels to consider a tap gesture
  const TAP_DURATION_THRESHOLD = 500; // Time in ms to consider a tap gesture
  const SWIPE_THRESHOLD = 20; // Distance in pixels to consider a swipe gesture

  function onMouseDown(event) {
    startX = event.screenX;
    startY = event.screenY;
    startTime = Date.now();
    console.log(`Mouse Down - X: ${startX}, Y: ${startY}`);

    holdTimeout = setTimeout(() => {
      console.log(`Hold detected - X: ${deltaX}, Y: ${deltaY}`);
      isHolding = true;
      callback("hold", { deltaX, deltaY });
    }, HOLD_THRESHOLD); // Hold duration threshold
  }

  function onMouseMove(event) {
    deltaX = !isMovingY ? event.screenX - startX : 0;
    deltaY = !isMovingX ? event.screenY - startY : 0;
    console.log(`Mouse Move - X: ${deltaX}, Y: ${deltaY}`);
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && !isMovingY) {
      isMovingX = true; // Reset deltaY to avoid confusion
      Move();
    } else if (Math.abs(deltaY) > SWIPE_THRESHOLD && !isMovingX) {
      isMovingY = true; // Reset deltaX to avoid confusion
      Move();
    }
  }

  function Move() {
    callback("swipe", { deltaX, deltaY });
    if (isHolding) {
      clearTimeout(holdTimeout); 
      isHolding = false;
    }
  }

  function onMouseUp(event) {
    deltaX = event.screenX - startX;
    deltaY = event.screenY - startY;
    const duration = Date.now() - startTime;

    console.log(`moved - X: ${deltaX}, Y: ${deltaY} duration: ${duration}`);

    clearTimeout(holdTimeout); // Clear the hold timeout
    isHolding = false; // Reset holding state
    isMovingX = false; // Reset moving state
    isMovingY = false; // Reset moving state

    // Detect tap (no significant movement and short duration)
    if (
      Math.abs(deltaX) < TAP_DISTANCE_THRESHOLD &&
      Math.abs(deltaY) < TAP_DISTANCE_THRESHOLD &&
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
