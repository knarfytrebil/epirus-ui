import * as React from 'react';
import { TableHeaderCell } from './table-header-cell';
import { IHeaderItem, ITableFetchConfig } from '../../../../../models';

export interface ITableHeaderProps {
  items: IHeaderItem[];
  tableFetchConfig: ITableFetchConfig;
}

export function TableHeader(props: ITableHeaderProps) {
  const { items, tableFetchConfig } = props;
  return (
    <>
      <style jsx>{`
        thead.TableHeader {
        }
      `}</style>
      <thead className="TableHeader">
        <tr>
          {items.map((item: IHeaderItem) => (
            <TableHeaderCell
              key={item.headerType}
              item={item}
              tableFetchConfig={tableFetchConfig}
            />
          ))}
        </tr>
      </thead>
    </>
  );
}

export * from './table-header-cell';
export * from './table-header-icon';
export * from './table-header-icon-button';
