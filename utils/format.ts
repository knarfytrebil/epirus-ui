import * as moment from 'moment';
export const MAX_DP = 10;
import { defined } from './variable-evaluation';
const Big = require('big.js');

export function roundToDp(x: number, dp: number): number {
  return parseFloat(x.toFixed(dp));
}

export function commafy(x: string): string {
  // ie. add commas
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatWithCommas(x: any, aboveZeroDp?: number, belowZeroDp?: number): string {
  if (defined(x)) {
    x = Big(x);
    if (x.eq(0)) {
      return x.toFixed(defined(aboveZeroDp) ? aboveZeroDp : 2);
    } else if (x.gt(1)) {
      return commafy(x.toFixed(defined(aboveZeroDp) ? aboveZeroDp : 0));
    } else {
      if (belowZeroDp) {
        const limitedStr: string = x.toFixed(belowZeroDp);
        const limitedNum: number = parseFloat(limitedStr);
        return limitedNum.toString();
      } else {
        return x.toFixed();
      }
    }
  } else {
    return '-';
  }
}

export function formatHash(hash: string) {
  if (defined(hash)) {
    return `${hash.substr(0, 5)}...${hash.substr(hash.length - 5, hash.length)}`;
  } else {
    return '-';
  }
}

export function formatHashLong(x: string) {
  if (defined(x)) {
    return `${x.substr(0, 21)}...${x.substr(x.length - 21, x.length)}`;
  } else {
    return '-';
  }
}

export function formatDateDiffFromNow(iso: string): string {
  const secondsFromNow = moment().diff(moment(iso)) / 1000;

  if (secondsFromNow >= 20 && secondsFromNow < 60) {
    return 'less than a minute ago';
  } else {
    return moment(iso).fromNow();
  }
}

export function formatIsoToDate(iso: string) {
  return moment(iso).format('Do MMMM YYYY');
}

export function formatIsoToToolTipDate(iso: string) {
  return moment(iso).format('MMMM Do YYYY, h:mm:ss a');
}

export function pathToName(path: string) {
  const pathBlocks = path.split('/');
  if (pathBlocks.length > 0) {
    return capitalize(pathBlocks[1]);
  }
}

export function capitalize(text: string) {
  if (defined(text) && text.length > 0) {
    return text[0].toUpperCase() + text.slice(1, text.length);
  } else {
    return text;
  }
}
