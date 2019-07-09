import * as React from 'react';
import { MENU_SIDE_MOBILE_ITEMS_TOP } from '../../../data';
import { IDimensions } from '../../../models';
import { MenuBottomMobileItems } from './menu-bottom-mobile-items';

export interface IMenuBottomMobileProps {
  dimensionsConfig: IDimensions;
  currentName: string;
  onRefresh(): void;
}

export function MenuBottomMobile(props: IMenuBottomMobileProps) {
  const { currentName, onRefresh } = props;
  return (
    <>
      <style jsx>{`
        div.MenuBottomMobile {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 2;
        }
      `}</style>
      <div className="MenuBottomMobile">
        <MenuBottomMobileItems
          items={MENU_SIDE_MOBILE_ITEMS_TOP}
          currentName={currentName}
          onRefresh={onRefresh}
        />
      </div>
    </>
  );
}
