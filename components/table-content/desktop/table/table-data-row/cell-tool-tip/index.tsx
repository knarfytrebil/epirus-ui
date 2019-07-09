import * as React from 'react';
import { defined } from '../../../../../../utils';
import { LONG_TOOLTIP_DELAY } from '../../../../../../data';
import { ROW_HEIGHT } from '../index';
let timeout1;

export interface IToolTipCell {
  style?: React.CSSProperties;
  toolTipContent: JSX.Element;
  children: string | JSX.Element;
}

export function ToolTipCell(props: IToolTipCell) {
  const [isHovering, setHovering] = React.useState(false);
  const { children, toolTipContent, style } = props;
  React.useEffect(() => () => clearTimeout(timeout1), []);

  return (
    <>
      <style jsx>{`
        div.ToolTipCell {
          display: inline-block;
          position: absolute;
          left: 0;
          top: ${ROW_HEIGHT * 0.5 - 13}px;
          z-index: ${isHovering ? 2 : 0};
        }
        div.children {
          position: relative;
          left: 0;
        }
      `}</style>
      <div
        style={defined(style) ? style : null}
        className="ToolTipCell"
        onMouseEnter={() => {
          timeout1 = setTimeout(() => setHovering(true), LONG_TOOLTIP_DELAY);
        }}
        onMouseLeave={() => {
          clearTimeout(timeout1);
          setHovering(false);
        }}
      >
        <div className="children">
          {children}
          {isHovering && toolTipContent}
        </div>
      </div>
    </>
  );
}
