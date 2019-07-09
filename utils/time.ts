import { defined } from './variable-evaluation';

let throttleTimeoutId;

export function throttle(fn: () => void, ms?: number) {
  if (defined(throttleTimeoutId)) {
    clearTimeout(throttleTimeoutId);
  }
  throttleTimeoutId = setTimeout(
    () => {
      fn();
      clearTimeout(throttleTimeoutId);
    },
    defined(ms) ? ms : 1000,
  );
}
