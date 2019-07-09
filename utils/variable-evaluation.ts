export const exists = (x) => Boolean(x);

export const defined = (x) => typeof x !== 'undefined' && x !== null;

export const isString = (x) => typeof x === 'string';

export const isNumber = (x) => typeof x === 'number';

export const isArray = (x) => x.constructor === Array;

export function isHash(x: any) {
  return isString(x) && x.substr(0, 2) === '0x' && (x.length === 42 || x.length === 66);
}

export function isEmptyObject(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
