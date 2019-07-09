import * as React from 'react';
import { INameElementValue } from '../../../../../models';
import { BOTTOM_MENU_GREY } from '../../../../../style-config';
import { flatten } from '../../../../../utils';

export interface IMobileAdditionalDetailsProps {
  config: INameElementValue[][];
}

export function MobileAdditionalDetails(props: IMobileAdditionalDetailsProps) {
  const flatConfig = flatten(props.config);
  return (
    <>
      <style jsx>{`
        ul.MobileAdditionalDetails {
          list-style: none;
        }
        li.pair {
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: pre-wrap;
          margin-top: 8px;
          height: 16px;
        }
        li.pair:first-child {
          margin-top: 0;
        }
        div {
          position: relative;
          font-size: 12px;
          line-height: 16px;
        }
        div.name {
          color: ${BOTTOM_MENU_GREY};
        }
      `}</style>
      <ul className="MobileAdditionalDetails">
        {flatConfig.map((item: INameElementValue) => (
          <li key={item.name} className="pair">
            <div className="name">{item.name}:</div>
            <span> </span>
            <div className="value">{item.value}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export * from './mobile-additional-details-button';
