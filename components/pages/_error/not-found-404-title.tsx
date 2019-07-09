import * as React from 'react';
import { FONT_WEIGHT_TITLE, HI_BLUE, TABLET_WIDTH } from '../../../style-config';

export function NotFound404Title() {
  return (
    <>
      <style jsx>{`
        h2.NotFound404Title {
          font-size: 36px;
          line-height: 44px;
          color: ${HI_BLUE};
          font-weight: ${FONT_WEIGHT_TITLE};
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          h2.NotFound404Title {
            font-size: 24px;
            line-height: 32px;
            width: 235px;
          }
        }
      `}</style>
      <h2 className="NotFound404Title">Your page got lost in the Ether :(</h2>
    </>
  );
}
