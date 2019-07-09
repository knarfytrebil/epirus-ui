import * as React from 'react';
import { IMenuItem } from '../../../../models';
import { MenuBottomMobileItem } from './MenuBottomMobileItem';
import { MENU_BOTTOM_MOBILE_HEIGHT, WHITE } from '../../../../style-config';

export interface IMenuBottomMobileItemsProps {
  items: IMenuItem[];
  currentName?: string;
  onRefresh?(): void;
}

export function MenuBottomMobileItems(props: IMenuBottomMobileItemsProps) {
  const { items, currentName, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        ul.MenuBottomMobileItems {
          display: flex;
          width: 100%;
          height: ${MENU_BOTTOM_MOBILE_HEIGHT}px;
          flex-direction: row;
          justify-content: space-evenly;
          list-style-type: none;
          background-color: ${WHITE};
        }
      `}</style>
      <ul className="MenuBottomMobileItems">
        {items.map((item: IMenuItem) => (
          <li key={item.name}>
            <MenuBottomMobileItem
              isSelected={currentName === item.name}
              {...item}
              onRefresh={onRefresh}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
