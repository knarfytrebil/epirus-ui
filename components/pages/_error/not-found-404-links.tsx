import * as React from 'react';
import Link from 'next/link';
import { LIGHT_PURPLE_TEXT, MOBILE_SMALL_WIDTH, TABLET_WIDTH } from '../../../style-config';
import { ITEMS_MAIN } from '../../../data';
import { IMenuItem } from '../../../models';

export function NotFound404Links() {
  return (
    <>
      <style jsx>{`
        div.NotFound404Links {
          margin-top: 16px;
        }
        p {
          font-size: 14px;
          line-height: 20px;
        }
        ul.items {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          list-style-type: none;
          width: 100%;
          margin-top: 4px;
        }
        li a.item {
          font-size: 14px;
          line-height: 20px;
          color: ${LIGHT_PURPLE_TEXT};
        }
        li {
          margin-right: 12px;
        }
        li:last-child {
          margin-right: 0;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404Links {
            margin-top: 16px;
          }
          p {
            font-size: 12px;
            line-height: 16px;
          }
          ul.items {
            margin-top: 4px;
            width: auto;
          }
          li a.item {
            font-size: 12px;
            line-height: 16px;
          }
          li {
            margin-right: 8px;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          div.NotFound404Links {
            margin-top: 17px;
          }
        }
      `}</style>
      <div className="NotFound404Links">
        <p>Here are a few links that may be also helpful:</p>
        <ul className="items">
          {ITEMS_MAIN.map((item: IMenuItem) => (
            <li key={item.name} className={item.name}>
              <Link href={`/${item.name.toLowerCase()}`}>
                <a className="item">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
