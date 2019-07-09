import * as React from 'react';
import { ICON } from '../../../../../svg';
import { MOBILE_TEXT } from '../../../../../../style-config';
import { InteractiveButton } from '../../../../../widgets';

export interface ITableMobileModalCrossProps {
  onClick(): void;
}

export function TableMobileModalCross(props: ITableMobileModalCrossProps) {
  return (
    <>
      <style jsx>{`
        button.cross {
          position: absolute;
          top: -3px;
          right: 0;
          width: 24px;
          height: 24px;
          color: ${MOBILE_TEXT};
          cursor: pointer;
        }
      `}</style>
      <button className="cross" onClick={props.onClick}>
        <InteractiveButton style={{ width: 34, height: 34, borderRadius: 17 }}>
          {ICON.Cross}
        </InteractiveButton>
      </button>
    </>
  );
}
