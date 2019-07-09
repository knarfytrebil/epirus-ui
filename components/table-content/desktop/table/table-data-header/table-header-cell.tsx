import * as React from 'react';
import { FADED_BLACK } from '../../../../../data';
import { TableHeaderIcon } from './table-header-icon';
import { IHeaderItem, ITableFetchConfig } from '../../../../../models';

export interface ITableHeaderProps {
  item?: IHeaderItem;
  tableFetchConfig: ITableFetchConfig;
}

export function TableHeaderCell(props: ITableHeaderProps) {
  const { item, tableFetchConfig } = props;
  return (
    <>
      <style jsx>{`
        th {
          position: relative;
          color: ${FADED_BLACK};
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          text-align: left;
          padding: 10px 0;
          z-index: 1;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          opacity: 0.8;
        }
      `}</style>
      <th>
        <span>{item.headerType}</span>
        {tableFetchConfig && item.headerIconType && (
          <TableHeaderIcon item={item} tableFetchConfig={tableFetchConfig} />
        )}
      </th>
    </>
  );
}
