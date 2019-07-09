import * as React from 'react';
import { INameElementValue } from '../../../../../models';
import { DARK_PURPLE_TEXT_2, LIGHT_GREY_TEXT } from '../../../../../data';

export interface IDesktopAdditionalDetailsProps {
  config: INameElementValue[][];
}

export function DesktopAdditionalDetails(props: IDesktopAdditionalDetailsProps) {
  return (
    <>
      <style jsx>{`
        div.DesktopAdditionalDetails {
        }
        ul.row {
          list-style: none;
        }
        li.pair {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
        }
        li.pairRow {
          display: flex;
        }
        div {
          position: relative;
          font-size: 12px;
          line-height: 32px;
        }
        div.name {
          margin-right: 12px;
          color: ${LIGHT_GREY_TEXT};
        }
        div.value {
          margin-right: 24px;
          color: ${DARK_PURPLE_TEXT_2};
        }
      `}</style>
      <div className="DesktopAdditionalDetails">
        {props.config.map((row: INameElementValue[], i: number) => (
          <ul key={`row-${i}`} className="row">
            {row.map((item: INameElementValue) => (
              <li key={item.name} className="pair">
                <div className="name">{item.name}:</div>
                <div className="value">{item.value}</div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
}

export * from './desktop-additional-details-button';
