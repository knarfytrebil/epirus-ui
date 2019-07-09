import * as React from 'react';
import { DARK_PURPLE } from '../../../../data';
import { TableDataRow } from './table-data-row';
import { IHeaderItem, EPageType } from '../../../../models';

export interface ITableDataProps {
  type: EPageType;
  dataRows: any[];
  headerItems: IHeaderItem[];
}

export function TableData(props: ITableDataProps) {
  const { dataRows, headerItems, type } = props;
  return (
    <>
      <style jsx>{`
        tbody.TableData {
          display: table-row-group;
          position: relative;
          margin-top: 16px;
          z-index: 0;
        }
        h2 {
          color: ${DARK_PURPLE};
          font-size: 28px;
          line-height: 34px;
        }
        div {
          color: ${DARK_PURPLE};
          font-size: 14px;
          line-height: 22px;
          margin-top: 24px;
        }
        table {
          font-weight: 400;
          margin-top: 36px;
        }
      `}</style>
      <tbody className="TableData">
        {dataRows.map((row: any, index: number) => (
          <TableDataRow
            key={`${row.hash || row.address}-${index}`}
            isFirstRow={index === 0}
            type={type}
            data={row}
            headerItems={headerItems}
          />
        ))}
      </tbody>
    </>
  );
}
