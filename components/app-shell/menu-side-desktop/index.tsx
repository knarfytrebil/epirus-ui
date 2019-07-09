import * as React from 'react';
import { MenuSideDesktopItems } from './menu-side-desktop-items';
import {
  HEADER_HEIGHT,
  MIN_CONTENT_WIDTH,
  MENU_SIDE_DESKTOP_WIDTH,
  VERTICAL_PADDING,
  MENU_SIDE_DESKTOP_ITEMS_TOP,
  MENU_SIDE_DESKTOP_ITEMS_BOTTOM,
} from '../../../data';
import { IDimensions } from '../../../models';
import { containerHeight } from '../../../utils';
import { MAIN_TABLE_PADDING } from '../../../style-config';

export interface IMenuSideDesktopProps {
  dimensionsConfig: IDimensions;
  currentName: string;
  onRefresh(): void;
}

export function MenuSideDesktop(props: IMenuSideDesktopProps) {
  const { dimensionsConfig, currentName, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        div.MenuSideDesktop {
          position: fixed;
          top: ${HEADER_HEIGHT + VERTICAL_PADDING}px;
          left: 0;
          display: flex;
          width: ${MENU_SIDE_DESKTOP_WIDTH}px;
          height: ${containerHeight(dimensionsConfig) -
            (VERTICAL_PADDING + MAIN_TABLE_PADDING) * 2}px;
          padding-bottom: ${MAIN_TABLE_PADDING}px;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.MenuSideDesktop {
            left: ${(dimensionsConfig.width - MIN_CONTENT_WIDTH) * 0.5}px;
          }
        }
      `}</style>
      <div className="MenuSideDesktop">
        <MenuSideDesktopItems
          items={MENU_SIDE_DESKTOP_ITEMS_TOP}
          currentName={currentName}
          onRefresh={onRefresh}
        />
        <MenuSideDesktopItems items={MENU_SIDE_DESKTOP_ITEMS_BOTTOM} />
      </div>
    </>
  );
}
