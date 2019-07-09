import * as React from 'react';
import { DARK_PURPLE, FONT_WEIGHT_TITLE } from '../../../../../../style-config';
import { TableMobileModalCross } from './table-mobile-modal-cross';

export interface ITableMobileModalHeaderProps {
  onCloseModal(): void;
}

export function TableMobileModalHeader(props: ITableMobileModalHeaderProps) {
  return (
    <>
      <style jsx>{`
        div.header {
        }
        h2.title {
          font-size: 24px;
          line-height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
        }
      `}</style>
      <div className="header">
        <h2 className="title">Refine By</h2>
        <TableMobileModalCross onClick={props.onCloseModal} />
      </div>
    </>
  );
}
