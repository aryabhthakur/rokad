import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rokadOrder(a: any, b: any) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}

export function triggerCtrlK() {
  const eventTarget = document.body; // Target the whole document body or a specific element (e.g., an input field)

  // Define the event properties including the 'K' key and the 'Ctrl' modifier
  const eventProperties = {
    key: 'k',       // The actual key value
    code: 'KeyK',   // The physical key code
    ctrlKey: true,  // Important: set the control key modifier to true
    bubbles: true,  // Allows the event to bubble up the DOM
    cancelable: true // Allows the default action to be prevented
  };

  // Create two events to simulate the press and release cycle
  const keydownEvent = new KeyboardEvent('keydown', eventProperties);
  const keyupEvent = new KeyboardEvent('keyup', eventProperties);

  // Dispatch the events
  eventTarget.dispatchEvent(keydownEvent);
  eventTarget.dispatchEvent(keyupEvent);

}
