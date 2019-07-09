import * as React from 'react';
import { HAND_WAVE_DESKTOP_PATH, HAND_WAVE_MOBILE_PATH } from './paths';

export const SPECIAL_PURPOSE = {
  HandWaveMobile: (
    <svg width="154" height="151" viewBox="0 0 154 151" fill="none">
      <path d={HAND_WAVE_MOBILE_PATH} fill="#483AFC" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M114.632 37.2836C112.999 26.593 106.252 17.3894 96.5803 12.6586L98.331 9.0397C109.184 14.3483 116.755 24.6762 118.587 36.6726L118.813 38.1521L114.859 38.7631L114.632 37.2836Z"
        fill="#131E41"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M123.866 37.3925C121.461 22.7951 112.261 10.2343 99.1104 3.59663L100.906 0C115.199 7.2149 125.2 20.8679 127.814 36.7348L128.145 38.7408L124.197 39.3987L123.866 37.3925Z"
        fill="#131E41"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.9067 111.51C18.9394 105.539 13.4581 95.5208 13.241 84.7067L9.24036 84.7882C9.48385 96.9232 15.6347 108.165 25.6972 114.865L26.9383 115.692L29.1476 112.337L27.9067 111.51Z"
        fill="#131E41"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.1344 119.987C11.9638 111.673 4.48025 98.0067 3.99944 83.2188L0 83.3496C0.522637 99.4243 8.65691 114.279 21.8858 123.316L23.5584 124.459L25.807 121.13L24.1344 119.987Z"
        fill="#131E41"
      />
    </svg>
  ),
  HandWaveDesktop: (
    <svg width="162" height="155" viewBox="0 0 162 155" fill="none">
      <path d={HAND_WAVE_DESKTOP_PATH} fill="#483AFC" />
      <path
        d="M105.39 15.637V15.637C115.649 20.6265 122.805 30.3335 124.536 41.6088L124.762 43.0794"
        stroke="#131E41"
        strokeWidth="4"
      />
      <path
        d="M107.941 6.64055V6.64055C121.657 13.5251 131.255 26.5532 133.763 41.6937L134.094 43.6878"
        stroke="#131E41"
        strokeWidth="4"
      />
      <path
        d="M19.2093 89.0909V89.0909C19.4395 100.496 25.2532 111.062 34.7643 117.36L36.0048 118.182"
        stroke="#131E41"
        strokeWidth="4"
      />
      <path
        d="M9.97194 87.6363V87.6363C10.4735 102.975 18.2793 117.149 30.974 125.773L32.646 126.909"
        stroke="#131E41"
        strokeWidth="4"
      />
    </svg>
  ),
  BrokenEther: (
    <svg
      width="236"
      height="342"
      viewBox="0 0 236 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M113.255 13.3314L3.5905 172.522L99.5863 237.471L105.938 133.324L113.255 13.3314Z"
        fill="#483AFC"
      />
      <path
        d="M136.802 5.4641e-06L217.357 175.725L111.595 223.137L123.308 119.456L136.802 5.4641e-06Z"
        fill="#483AFC"
      />
      <path d="M114.288 341.125V259.462L14.5164 200.508L114.288 341.125Z" fill="#483AFC" />
      <path d="M127.926 319.35V237.688L227.697 178.733L127.926 319.35Z" fill="#483AFC" />
    </svg>
  ),
  BrokenEtherSmall: (
    <svg
      width="98"
      height="140"
      viewBox="0 0 98 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.0411 5.47131L1.49131 70.8044L41.3636 97.4597L44.0016 54.717L47.0411 5.47131Z"
        fill="#483AFC"
      />
      <path
        d="M56.8215 -5.06331e-07L90.2801 72.1186L46.3514 91.5768L51.2164 49.0254L56.8215 -5.06331e-07Z"
        fill="#483AFC"
      />
      <path d="M47.4697 140V106.485L6.0293 82.2898L47.4697 140Z" fill="#483AFC" />
      <path d="M53.1345 131.064V97.5486L94.575 73.3533L53.1345 131.064Z" fill="#483AFC" />
    </svg>
  ),
  BrokenEtherExtraSmall: (
    <svg
      width="83"
      height="119"
      viewBox="0 0 83 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.841 4.65061L1.26316 60.1837L35.0325 82.8408L37.2668 46.5095L39.841 4.65061Z"
        fill="#483AFC"
      />
      <path
        d="M48.1244 -5.80988e-07L76.4618 61.3008L39.2569 77.8403L43.3772 41.6716L48.1244 -5.80988e-07Z"
        fill="#483AFC"
      />
      <path d="M40.2042 119V90.5123L5.10669 69.9463L40.2042 119Z" fill="#483AFC" />
      <path d="M45.0018 111.404V82.9163L80.0994 62.3503L45.0018 111.404Z" fill="#483AFC" />
    </svg>
  ),
};
