import { IDictionary } from '../models';

export function renderSwitch(
  key: string | number,
  callbacks: IDictionary<() => JSX.Element>,
  defaultCallback?: () => JSX.Element,
): JSX.Element | null {
  if (callbacks[key]) {
    return callbacks[key]();
  } else {
    if (defaultCallback) {
      return defaultCallback();
    } else {
      return null;
    }
  }
}
