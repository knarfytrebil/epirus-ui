import * as React from 'react';
import { defined } from '../../../utils';
import { LONG_TOOLTIP_DELAY } from '../../../data';
let timeout1, timeout2;
let isMounted = false;

export interface IToolTipInline {
  style?: React.CSSProperties;
  toolTipStyle?: React.CSSProperties;
  toolTipContent: string | JSX.Element;
  children: string | JSX.Element;
}

export function ToolTipInline(props: IToolTipInline) {
  const [isHovering, setHovering] = React.useState(false);
  const { children, toolTipContent, style, toolTipStyle } = props;
  React.useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        div.ToolTipInline {
          display: block;
          position: relative;
          left: 0;
          top: 0;
          height: 100%;
          z-index: ${isHovering ? 1 : 0};
        }
        div.tooltip {
          position: absolute;
          top: calc(100% + 12px);
        }
      `}</style>
      <div
        style={defined(style) ? style : null}
        className="ToolTipInline"
        onMouseEnter={() => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          timeout1 = setTimeout(() => {
            if (isMounted) {
              setHovering(true);
            }
          }, LONG_TOOLTIP_DELAY);
        }}
        onMouseOver={() => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          timeout1 = setTimeout(() => {
            if (isMounted) {
              setHovering(true);
            }
          }, LONG_TOOLTIP_DELAY);
        }}
        onMouseMove={() => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          timeout1 = setTimeout(() => {
            if (isMounted) {
              setHovering(true);
            }
          }, LONG_TOOLTIP_DELAY);
        }}
        onMouseLeave={() => {
          clearTimeout(timeout1);
          timeout2 = setTimeout(() => isMounted && setHovering(false), LONG_TOOLTIP_DELAY * 2);
        }}
        onMouseOut={() => {
          clearTimeout(timeout1);
          timeout2 = setTimeout(() => isMounted && setHovering(false), LONG_TOOLTIP_DELAY * 2);
        }}
      >
        {children}
        {isHovering && (
          <div
            className="tooltip"
            style={defined(toolTipStyle) ? toolTipStyle : null}
            onMouseEnter={() => {
              clearTimeout(timeout2);
              if (isMounted) {
                setHovering(true);
              }
            }}
            onMouseOver={() => {
              clearTimeout(timeout2);
              if (isMounted) {
                setHovering(true);
              }
            }}
            onMouseMove={() => {
              clearTimeout(timeout2);
              if (isMounted) {
                setHovering(true);
              }
            }}
            onMouseLeave={() => {
              clearTimeout(timeout1);
              clearTimeout(timeout2);
              if (isMounted) {
                setHovering(false);
              }
            }}
          >
            {toolTipContent}
          </div>
        )}
      </div>
    </>
  );
}
