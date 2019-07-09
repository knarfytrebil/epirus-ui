import * as React from 'react';
import { MOBILE_SMALL_WIDTH, TABLET_WIDTH } from '../../../style-config';
import SearchBar from '../../search-bar';

export function NotFound404Content() {
  return (
    <>
      <style jsx>{`
        div.NotFound404Content {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
        }
        p.text {
          font-size: 16px;
          line-height: 24px;
          width: 560px;
          margin-top: 32px;
        }
        div.search-bar {
          margin-top: 36px;
          border-radius: 4px;
          width: 399px;
          height: 42px;
          overflow: hidden;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404Content {
            align-items: center;
          }
          p.text {
            margin-top: 28px;
            font-size: 14px;
            line-height: 20px;
            width: 327px;
          }
          div.search-bar {
            width: 327px;
            margin-top: 42px;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          p.text {
            width: 256px;
          }
          div.search-bar {
            width: 272px;
          }
        }
      `}</style>
      <div className="NotFound404Content">
        <p className="text">
          Check that you typed the address correctly, go back to your previous page or try using the
          search box below to find something specific.
        </p>
        <div className="search-bar">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
