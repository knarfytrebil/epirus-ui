import * as React from 'react';
import { DARK_PURPLE_TEXT } from '../../../../../data';
import { defined } from '../../../../../utils';
import { INameElementValue } from '../../../../../models';
import { BOTTOM_MENU_GREY } from '../../../../../style-config';

export interface IMobileOverviewInfoItemProps extends INameElementValue {
  style: React.CSSProperties;
  valueStyle: React.CSSProperties;
}

export function MobileOverviewInfoItem(props: IMobileOverviewInfoItemProps) {
  const { name, value, style, valueStyle } = props;

  return (
    <>
      <style jsx>{`
        li.MobileOverviewInfoItem {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: pre-wrap;
          margin-top: 8px;
        }
        li.MobileOverviewInfoItem:first-child {
          margin-top: 0;
        }
        div {
          position: relative;
          top: 0;
          font-size: 14px;
          line-height: 20px;
        }
        div.name {
          color: ${BOTTOM_MENU_GREY};
        }
      `}</style>
      <li style={defined(style) ? style : null} className="MobileOverviewInfoItem" key={name}>
        <div className="name">{name}:</div>
        <span> </span>
        <div style={valueStyle} className="value">
          {value}
        </div>
      </li>
    </>
  );
}
