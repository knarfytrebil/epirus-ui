import * as React from 'react';
import {
  DESKTOP_WIDTH,
  FONT_FAMILY,
  FONT_MOBILE_FAMILY,
  FONT_WEIGHT_TEXT,
  LO_WHITE,
  MOBILE_TEXT,
  WHITE,
} from '../../../style-config';
import { INPUT_PLACEHOLDER } from './input-placeholder';
import { BUTTONS } from './buttons';

export const GLOBAL_STYLES = (
  <>
    <style global jsx>
      {`
        @import url('https://rsms.me/inter/inter.css');
        * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        html,
        body {
          margin: 0;
          padding: 0;
          font-weight: ${FONT_WEIGHT_TEXT};
          max-width: 100%;
          background-color: ${LO_WHITE};
          font-family: ${FONT_FAMILY};
          overflow-x: hidden;
        }
        #__next {
          height: 100%;
        }
        button {
          background-color: transparent;
          margin: 0;
          padding: 0;
          font-family: inherit;
          font-weight: inherit;
          border: none;
          cursor: pointer;
        }
        button:focus {
          outline: none;
        }
        a {
          text-decoration: none;
        }
        a:focus,
        a:active {
          outline: none;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          padding: 0;
          font-weight: ${FONT_WEIGHT_TEXT};
        }
        p {
          margin: 0;
        }
        svg {
          display: block;
        }
        ul {
          padding: 0;
          margin: 0;
        }
        textarea {
          font-family: inherit;
          font-weight: inherit;
        }
        input {
          background-color: transparent;
          width: 100%;
          height: 100%;
          font-family: inherit;
          font-weight: inherit;
          margin: 0;
          padding: 0;
          border: none;
          color: ${WHITE};
        }
        input:focus {
          outline: none;
        }
        table {
          border-collapse: collapse;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          html,
          body {
            font-feature-settings: 'calt' 0;
            background-color: ${WHITE};
            font-family: ${FONT_MOBILE_FAMILY};
          }
          html,
          body,
          #__next {
            min-height: auto;
          }
          body {
            color: ${MOBILE_TEXT};
          }
        }
      `}
    </style>
    {BUTTONS}
    {INPUT_PLACEHOLDER}
  </>
);
