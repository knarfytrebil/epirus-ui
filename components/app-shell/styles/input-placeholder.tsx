import * as React from 'react';
import { INPUT_TEXT_GREY, PURPLE_WHITE } from '../../../style-config';

export const INPUT_PLACEHOLDER = (
  <>
    <style global jsx>
      {`
        input::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: ${INPUT_TEXT_GREY};
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: ${INPUT_TEXT_GREY};
          opacity: 1;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: ${INPUT_TEXT_GREY};
          opacity: 1;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: ${INPUT_TEXT_GREY};
        }
        input::-ms-input-placeholder {
          /* Microsoft Edge */
          color: ${INPUT_TEXT_GREY};
        }
        input::placeholder {
          /* Most modern browsers support this now. */
          color: ${INPUT_TEXT_GREY};
        }

        /* Header input */

        input.isHeader::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: ${PURPLE_WHITE};
        }
        input.isHeader:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: ${PURPLE_WHITE};
          opacity: 1;
        }
        input.isHeader::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: ${PURPLE_WHITE};
          opacity: 1;
        }
        input.isHeader:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: ${PURPLE_WHITE};
        }
        input.isHeader::-ms-input-placeholder {
          /* Microsoft Edge */
          color: ${PURPLE_WHITE};
        }
        input.isHeader::placeholder {
          /* Most modern browsers support this now. */
          color: ${PURPLE_WHITE};
        }

        /* Header input focus */

        input:focus.isHeader::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: ${PURPLE_WHITE};
          opacity: 0.8;
        }
        input:focus.isHeader:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: ${PURPLE_WHITE};
          opacity: 0.8;
        }
        input:focus.isHeader::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: ${PURPLE_WHITE};
          opacity: 0.8;
        }
        input:focus.isHeader:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: ${PURPLE_WHITE};
          opacity: 0.8;
        }
        input:focus.isHeader::-ms-input-placeholder {
          /* Microsoft Edge */
          color: ${PURPLE_WHITE};
          opacity: 0.8;
        }
        input:focus.isHeader::placeholder {
          /* Most modern browsers support this now. */
          color: ${PURPLE_WHITE};
          opacity: 0.8;
        }
      `}
    </style>
  </>
);
