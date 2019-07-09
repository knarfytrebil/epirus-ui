import * as React from 'react';
import * as classNames from 'classnames';
import { ACTIVE_BUTTON_GREY } from '../../data';
import {
  ARROW_GREY_DISABLED,
  DESKTOP_WIDTH,
  HOVER_BUTTON_GREY,
  MOBILE_LIGHT_GREY,
  MOBILE_TEXT,
} from '../../style-config';
import { defined } from '../../utils';
let timeout;

export interface IInteractiveButtonProps {
  style?: React.CSSProperties;
  isDisabled?: boolean;
  onClick?(): void;
  children: JSX.Element;
}

export function InteractiveButton(props: IInteractiveButtonProps) {
  const { isDisabled, onClick, children, style } = props;
  const [isTapActive, setTapActive] = React.useState(false);

  return (
    <>
      <style jsx>{`
        div.InteractiveButton {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 14px;
          cursor: pointer;
        }
        div.children {
          position: relative;
          z-index: 1;
        }
        div.tap-active-background {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: ${ACTIVE_BUTTON_GREY};
          z-index: 0;
        }
        div.InteractiveButton:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        div.InteractiveButton:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
        div.InteractiveButton.isDisabled,
        div.InteractiveButton.isDisabled:hover {
          color: ${ARROW_GREY_DISABLED};
          background-color: transparent;
          cursor: not-allowed;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.InteractiveButton {
            color: ${MOBILE_TEXT};
          }
          div.InteractiveButton:active,
          div.InteractiveButton:hover {
            background-color: transparent;
          }
          div.InteractiveButton.isDisabled:hover,
          div.InteractiveButton.isDisabled {
            color: ${MOBILE_LIGHT_GREY};
            opacity: 1;
          }
        }
      `}</style>
      <div
        style={defined(style) ? style : null}
        className={classNames('InteractiveButton', { isDisabled })}
        onTouchStart={() => setTapActive(true)}
        onTouchEnd={() => {
          timeout = setTimeout(() => setTapActive(false), 200);
        }}
        onTouchCancel={() => {
          timeout = setTimeout(() => setTapActive(false), 200);
        }}
        onClick={() => !isDisabled && defined(onClick) && onClick()}
      >
        <div className="children">{children}</div>
        {isTapActive ? <div className="tap-active-background" /> : null}
      </div>
    </>
  );
}
