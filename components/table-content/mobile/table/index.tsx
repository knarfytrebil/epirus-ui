import * as React from 'react';
import { ErrorMessage } from '../../../placeholders';
import { EPageType, IHeaderItem, ITableFetchConfig } from '../../../../models';
import { TableMobileItem } from './table-mobile-item';

export interface ITableMobileItemsProps {
  isZeroElements: boolean;
  type: EPageType;
  headerItems: IHeaderItem[];
  dataRows: any[];
  tableFetchConfig: ITableFetchConfig;
}

export function TableMobileItems(props: ITableMobileItemsProps) {
  const { isZeroElements, headerItems, dataRows, type } = props;
  return (
    <>
      <style jsx>{`
        ul.TableMobileItems {
          width: 100%;
          list-style-type: none;
          margin: 24px 0 54px;
        }
      `}</style>
      {isZeroElements && <ErrorMessage>No results found for current filters.</ErrorMessage>}
      <ul className="TableMobileItems">
        {dataRows.map((row: any, index: number) => (
          <TableMobileItem
            key={`${row.hash || row.address}-${index}`}
            isFirstRow={index === 0}
            type={type}
            row={row}
            headerItems={headerItems}
          />
        ))}
      </ul>
    </>
  );
}

export * from './table-mobile-item';
export * from './table-mobile-filters/index';
export * from './table-mobile-info-header';
export * from './table-mobile-filters/table-mobile-modal/index';
export * from './table-mobile-wrapper';
