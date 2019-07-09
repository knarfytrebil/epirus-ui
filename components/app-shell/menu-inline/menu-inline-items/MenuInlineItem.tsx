import * as React from 'react';
import Link from 'next/link';
import { ICON } from '../../../svg';
import { IMenuItem } from '../../../../models';
import { defined } from '../../../../utils';
import {
  BUTTON_GREY,
  FONT_WEIGHT_TEXT,
  FONT_WEIGHT_TITLE,
  GREY,
  HOVER_LINK_GREY,
} from '../../../../data';

export interface IMenuSideDesktopItemProps extends IMenuItem {
  isSelected: boolean;
  onRefresh(): void;
}

export function MenuInlineItem(props: IMenuSideDesktopItemProps) {
  const { isSelected, name, externalPath, iconType, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        a.MenuSideDesktopItem {
          display: flex;
          width: calc(100% - 28px);
          height: 48px;
          font-size: 14px;
          padding-left: 28px;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          color: ${GREY};
          opacity: ${isSelected ? 1 : 0.6};
          background-color: ${isSelected ? BUTTON_GREY : 'transparent'};
          font-weight: ${isSelected ? FONT_WEIGHT_TITLE : FONT_WEIGHT_TEXT};
        }
        a.MenuSideDesktopItem:hover {
          background-color: ${HOVER_LINK_GREY};
          opacity: 1;
        }
        a.MenuSideDesktopItem:active {
          background-color: ${BUTTON_GREY};
          opacity: 1;
        }
        span {
          margin-left: 28px;
        }
      `}</style>
      <Link href={externalPath || `/${name.toLowerCase()}`}>
        <a
          className="MenuSideDesktopItem"
          target={defined(externalPath) ? '_blank' : '_self'}
          onClick={() => isSelected && onRefresh && onRefresh()}
        >
          {ICON[iconType]}
          <span>{name}</span>
        </a>
      </Link>
    </>
  );
}
