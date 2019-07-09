import * as React from 'react';
import { LIGHT_GREY } from '../../../../../data';

export interface ICellTableDataProps {
  isFirstRow?: boolean;
  children: JSX.Element;
}

export function CellTableData(props: ICellTableDataProps) {
  return (
    <>
      <style jsx>{`
        td.isFirstRow {
          border-top: 1px solid ${LIGHT_GREY};
          border-bottom: 1px solid ${LIGHT_GREY};
        }
        td {
          border-bottom: 1px solid ${LIGHT_GREY};
        }
      `}</style>
      <td className={props.isFirstRow ? 'isFirstRow' : ''}>{props.children}</td>
    </>
  );
}
