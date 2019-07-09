import * as React from 'react';
import Link from 'next/link';
import { ICON } from '../../../svg';
import { IMenuItem } from '../../../../models';
import { defined } from '../../../../utils';
import { FONT_WEIGHT_TITLE } from '../../../../data';
import { BOTTOM_MENU_GREY, MOBILE_TEXT } from '../../../../style-config';

export interface IMenuBottomMobileItemProps extends IMenuItem {
  isSelected: boolean;
  onRefresh(): void;
}

export function MenuBottomMobileItem(props: IMenuBottomMobileItemProps) {
  const { isSelected, name, externalPath, iconType, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        a.MenuBottomMobileItem {
          display: flex;
          width: 100%;
          height: 100%;
          font-size: 10px;
          line-height: 14px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: ${isSelected ? MOBILE_TEXT : BOTTOM_MENU_GREY};
          font-weight: ${FONT_WEIGHT_TITLE};
        }
      `}</style>
      <Link href={externalPath || `/${name.toLowerCase()}`}>
        <a
          className="MenuBottomMobileItem"
          target={defined(externalPath) ? '_blank' : '_self'}
          onClick={() => {
            if (isSelected) {
              if (onRefresh) {
                onRefresh();
              }
              if (defined(window)) {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }
            }
          }}
        >
          {ICON[iconType]}
          <span>{name}</span>
        </a>
      </Link>
    </>
  );
}
