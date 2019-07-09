import * as React from 'react';
import { DARK_PURPLE_TEXT, LIGHT_GREY_TEXT } from '../../../../../data';
import { defined } from '../../../../../utils';
import { INameElementValue } from '../../../../../models';

export interface IDesktopOverviewInfoItemProps extends INameElementValue {
  style: React.CSSProperties;
  valueStyle: React.CSSProperties;
}

export function DesktopOverviewInfoItem(props: IDesktopOverviewInfoItemProps) {
  const { name, value, style, valueStyle } = props;

  return (
    <>
      <style jsx>{`
        li.DesktopOverviewInfoItem {
          position: relative;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
        }
        div {
          position: relative;
          top: 0;
          font-size: 14px;
          line-height: 32px;
          color: ${DARK_PURPLE_TEXT};
        }
        div.name {
          margin-right: 12px;
          color: ${LIGHT_GREY_TEXT};
        }
      `}</style>
      <li style={defined(style) ? style : null} className="DesktopOverviewInfoItem" key={name}>
        <div className="name">{name}:</div>
        <div style={valueStyle} className="value">
          {value}
        </div>
      </li>
    </>
  );
}
