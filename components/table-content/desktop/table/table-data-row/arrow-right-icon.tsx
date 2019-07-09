import * as React from 'react';
import { TABLE_ICON_GREY } from '../../../../../data';
import { ICON } from '../../../../svg';

export function ArrowRightIcon() {
  return (
    <>
      <style jsx>{`
        div.arrowRight {
          position: absolute;
          top: 50%;
          left: -34px;
          transform: translate(-100%, -50%);
          color: ${TABLE_ICON_GREY};
        }
      `}</style>
      <div className="arrowRight">{ICON.ArrowRight}</div>
    </>
  );
}
