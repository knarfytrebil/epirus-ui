import * as React from 'react';
import { TableHeader } from './table-data-header';
import { TableData } from './table-data';
import { IHeaderItem, EPageType, ITableFetchConfig } from '../../../../models';
import { ErrorMessage } from '../../../placeholders';
import { defined } from '../../../../utils';

export interface ITableProps {
  isZeroElements: boolean;
  type: EPageType;
  headerItems: IHeaderItem[];
  dataRows: any[];
  tableFetchConfig: ITableFetchConfig;
}

export function Table(props: ITableProps) {
  const { isZeroElements, headerItems, dataRows, tableFetchConfig, type } = props;
  return (
    <>
      <style jsx>{`
        table.Table {
          width: 100%;
          font-weight: 400;
          margin-top: ${isZeroElements ? 0 : 36}px;
          table-layout: fixed;
        }
      `}</style>
      <table className="Table">
        <colgroup>
          {headerItems.map((headerItem: IHeaderItem) => (
            <col
              key={headerItem.headerType}
              width={defined(headerItem.fixedWidth) ? headerItem.fixedWidth : null}
            />
          ))}
        </colgroup>
        <TableHeader tableFetchConfig={tableFetchConfig} items={headerItems} />
        {!isZeroElements && <TableData type={type} dataRows={dataRows} headerItems={headerItems} />}
      </table>
      {isZeroElements && <ErrorMessage>No results found for current filters.</ErrorMessage>}
    </>
  );
}

export * from './table-data-row';
export * from './table-info-footer';
export * from './table-data-header';
export * from './table-data';
export * from './table-info-header/index';
export * from './table-wrapper';
