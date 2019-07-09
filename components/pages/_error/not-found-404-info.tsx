import * as React from 'react';
import { TABLET_WIDTH } from '../../../style-config';
import { NotFound404Links } from './not-found-404-links';
import { NotFound404Title } from './not-found-404-title';
import { NotFound404Content } from './not-found-404-content';

export function NotFound404Info() {
  return (
    <>
      <style jsx>{`
        div.NotFound404Info {
          margin: 0 84px 0 0;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404Info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 48px 0 0 0;
            width: calc(100% - 24px);
          }
        }
      `}</style>
      <div className="NotFound404Info">
        <NotFound404Title />
        <NotFound404Content />
        <NotFound404Links />
      </div>
    </>
  );
}
