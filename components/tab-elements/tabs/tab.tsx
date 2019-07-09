import * as React from 'react';
import * as classNames from 'classnames';

import { HEADER_ICON_PURPLE, UNSELECTED_TAB_GREY } from '../../../data';
import { BOTTOM_MENU_GREY, DESKTOP_WIDTH } from '../../../style-config';

export interface ITabsProps {
  isActive: boolean;
  onClick(): void;
  children: string;
}

export function Tab(props: ITabsProps) {
  const { isActive, onClick, children } = props;
  return (
    <>
      <style jsx>{`
        button.Tab {
          position: relative;
          display: flex;
          align-content: center;
          justify-content: center;
          height: 58px;
          padding: 0 40px;
          text-align: center;
        }
        div.text {
          color: ${UNSELECTED_TAB_GREY};
          font-size: 14px;
          line-height: 22px;
        }
        div.line {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100%;
          display: none;
          height: 4px;
          background-color: ${HEADER_ICON_PURPLE};
        }
        button.Tab.isActive div.text {
          color: ${HEADER_ICON_PURPLE};
        }
        button.Tab.isActive div.line {
          display: block;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          button.Tab {
            height: 44px;
            padding: 0 14px;
          }
          div.text {
            color: ${BOTTOM_MENU_GREY};
            font-size: 14px;
            line-height: 16px;
          }
        }
      `}</style>
      <button className={classNames('Tab', { isActive: isActive })} onClick={onClick}>
        <div className="text">{children}</div>
        <div className="line" />
      </button>
    </>
  );
}
