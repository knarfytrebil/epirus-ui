import * as React from 'react';
import {
  DESKTOP_WIDTH,
  HEADER_ICON_PURPLE,
  HI_BLUE,
  HOVER_PURPLE_TEXT,
  HOVER_PURPLE_TEXT_MOBILE,
  LIGHT_PURPLE_TEXT,
  LO_PURPLE,
} from '../../../style-config';

export const BUTTONS = (
  <>
    <style global jsx>
      {`
        /* BLUE SQUARE */
        .--blue-square {
          color: #fff;
          background-color: ${HI_BLUE};
          box-shadow: 0px 2px 8px rgba(72, 58, 252, 0.25);
        }
        .--blue-square:hover {
          background-color: ${HOVER_PURPLE_TEXT};
        }
        .--blue-square:active {
          background-color: ${HEADER_ICON_PURPLE};
        }
        .--blue-square:disabled {
          background-color: ${LO_PURPLE};
        }
        /* LINK */
        .--text-link {
          color: ${LIGHT_PURPLE_TEXT};
        }
        .--text-link:hover {
          color: ${HOVER_PURPLE_TEXT};
          text-decoration: underline;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          .--text-link:hover {
            color: ${HOVER_PURPLE_TEXT_MOBILE};
            text-decoration: underline;
          }
        }
      `}
    </style>
  </>
);
