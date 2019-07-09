import { defined } from './variable-evaluation';

export function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

export function addToArrayIfNotThere(arr, val) {
  if (arr.indexOf(val) === -1) {
    return [...arr, val];
  } else {
    return arr;
  }
}

export function removeFromArrayIfThere(arr, val) {
  if (arr.indexOf(val) > -1) {
    return arr.filter((arrItem) => arrItem !== val);
  } else {
    return arr;
  }
}

export function findArrayIndex(array, predicateFunction) {
  const length = !defined(array) ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = -1;
  for (let i = 0; i < array.length; ++i) {
    if (predicateFunction(array[i])) {
      index = i;
      break;
    }
  }
  return index;
}
