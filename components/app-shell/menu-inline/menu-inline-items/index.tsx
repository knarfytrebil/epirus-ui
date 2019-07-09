import * as React from 'react';
import { IMenuItem } from '../../../../models';
import { MENU_SIDE_DESKTOP_WIDTH } from '../../../../data';
import { MenuInlineItem } from './MenuInlineItem';
import { defined } from '../../../../utils';

export interface IMenuInlineItemsProps {
  items: IMenuItem[];
  currentName?: string;
  onRefresh?(): void;
}

export function MenuInlineItems(props: IMenuInlineItemsProps) {
  const { items, currentName, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        ul.MenuInlineItems {
          display: flex;
          width: ${MENU_SIDE_DESKTOP_WIDTH}px;
          flex-direction: column;
          list-style-type: none;
        }
      `}</style>
      <ul className="MenuInlineItems">
        {items.map((item: IMenuItem) => (
          <li key={item.name}>
            <MenuInlineItem
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
