import * as React from 'react';
import { TOOLTIP_GREY } from '../../data';
import { defined } from '../../utils';
import { DESKTOP_WIDTH } from '../../style-config';

export interface IToolTip {
  style?: React.CSSProperties;
  children: string | JSX.Element;
}

export function ToolTip(props: IToolTip) {
  const { style, children } = props;
  return (
    <>
      <style jsx>{`
        div.ToolTip {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          left: 0;
          white-space: nowrap;
          opacity: 0.95;
          border-radius: 4px;
          font-size: 12px;
          line-height: 14px;
          background-color: ${TOOLTIP_GREY};
          padding: 5px 12px;
          color: #fff;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.ToolTip {
            display: none;
          }
        }
      `}</style>
      <div style={defined(style) ? style : null} className="ToolTip">
        {children}
      </div>
    </>
  );
}

export * from './tool-tip-content-inline';
export * from './tool-tip-inline';
