import * as React from 'react';
import { ITablePaginationProps, TablePagination } from '../../../table-pagination';
export const TABLE_FOOTER_HEIGHT = 78;

export type ITableFooterProps = ITablePaginationProps;

export function TableFooter(props: ITableFooterProps) {
  return (
    <>
      <style jsx>{`
        div.TableFooter {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 44px;
          padding-top: 28px;
        }
      `}</style>
      <div className="TableFooter">
        <TablePagination {...props} />
      </div>
    </>
  );
}
