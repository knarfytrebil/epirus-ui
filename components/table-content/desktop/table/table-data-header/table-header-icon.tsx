import * as React from 'react';
import { TableHeaderIconButton } from './table-header-icon-button';
import { EHeaderIconType, ITableFetchConfig, IHeaderItem } from '../../../../../models';

export interface ITableHeaderIconProps {
  tableFetchConfig: ITableFetchConfig;
  item?: IHeaderItem;
}

export function TableHeaderIcon(props: ITableHeaderIconProps) {
  const { item, tableFetchConfig } = props;

  return (
    <>
      <style jsx>{`
        div.TableHeaderIcon {
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: space-between;
          flex-direction: ${item.headerIconType === EHeaderIconType.CheckboxFilter
            ? 'row'
            : 'column'};
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      `}</style>
      <div className="TableHeaderIcon">
        <TableHeaderIconButton item={item} tableFetchConfig={tableFetchConfig} />
      </div>
    </>
  );
}
