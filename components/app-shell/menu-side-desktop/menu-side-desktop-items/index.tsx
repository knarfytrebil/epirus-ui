import * as React from 'react';
import { IMenuItem } from '../../../../models';
import { MENU_SIDE_DESKTOP_WIDTH } from '../../../../data';
import { MenuSideDesktopItem } from './MenuSideDesktopItem';
import { defined } from '../../../../utils';

export interface IMenuSideDesktopItemsProps {
  items: IMenuItem[];
  currentName?: string;
  onRefresh?(): void;
}

export function MenuSideDesktopItems(props: IMenuSideDesktopItemsProps) {
  const { items, currentName, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        ul.MenuSideDesktopItems {
          display: flex;
          width: ${MENU_SIDE_DESKTOP_WIDTH}px;
          flex-direction: column;
          list-style-type: none;
        }
      `}</style>
      <ul className="MenuSideDesktopItems">
        {items.map((item: IMenuItem) => (
          <li key={item.name}>
            <MenuSideDesktopItem
              isSelected={currentName === item.name}
              {...item}
              onRefresh={defined(onRefresh) ? onRefresh : null}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
