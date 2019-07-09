import { DESKTOP_WIDTH } from '../style-config';
import { defined } from './variable-evaluation';

export const isDesktop = (width: number) => DESKTOP_WIDTH < width;

export function bodyScroll(): number {
  if (defined(window) && defined(window.pageYOffset)) {
    //most browsers except IE before #9
    return window.pageYOffset;
  } else {
    const B = document.body; //IE 'quirks'
    let D = document.documentElement; //IE with doctype
    D = D.clientHeight ? D : B;
    return D.scrollTop;
  }
}
