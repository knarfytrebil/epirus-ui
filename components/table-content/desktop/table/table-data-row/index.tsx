import * as React from 'react';
import { CellTableData } from './cell-table-data';
import { IHeaderItem, EPageType } from '../../../../../models';
import { COMBINED_LOOKUP } from '../../../../../data';
export const ROW_HEIGHT = 58;

export interface ITableDataRowProps {
  isFirstRow: boolean;
  type: EPageType;
  data: any;
  headerItems: IHeaderItem[];
}

export function TableDataRow(props: ITableDataRowProps) {
  const { data, headerItems, type, isFirstRow } = props;
  return (
    <>
      <style jsx>{`
        tr.TableDataRow {
          height: ${ROW_HEIGHT}px;
          width: 100%;
        }
      `}</style>
      <tr className="TableDataRow">
        {headerItems.map((item: IHeaderItem) => (
          <CellTableData key={item.headerType} isFirstRow={isFirstRow}>
            {COMBINED_LOOKUP[type][item.headerType](data)}
          </CellTableData>
        ))}
      </tr>
    </>
  );
}

export * from '../../../parameters-pair-list';
export * from './cell-tool-tip';
export * from './cell-tool-tip-copy';
export * from './arrow-right-icon';
export * from './cell-contract-icon';
export * from './contract-text-link';
export * from './cell-hash';
export * from './cell-time';
export * from './cell-value';
export * from './cell-table-data';
export * from './text-link';
export * from './text-only';
export * from './to-text-link';
