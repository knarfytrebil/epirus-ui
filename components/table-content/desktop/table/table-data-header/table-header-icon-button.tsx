import * as React from 'react';
import { ICON } from '../../../../svg';
import { HEADER_ICON_GREY, HEADER_ICON_PURPLE } from '../../../../../data';
import {
  EDirectionType,
  EHeaderIconType,
  ITableFetchConfig,
  IHeaderItem,
  EIconType,
} from '../../../../../models';
import { CellCheckboxFilter, CellRadioFilter } from '../../../../inputs';

function sortLookup(sortType: string) {
  // this is necessary as not all properties that come back in the paging object match the params that request them
  switch (sortType) {
    default:
      return sortType;
    case 'timestampISO':
      return 'timestamp';
  }
}

export interface ITableHeaderIconButtonProps {
  item: IHeaderItem;
  tableFetchConfig: ITableFetchConfig;
}

export function TableHeaderIconButton(props: ITableHeaderIconButtonProps) {
  const { item, tableFetchConfig } = props;
  const { sortRowsConfig, filterConfig } = tableFetchConfig;
  const { headerIconType, type } = item;

  if (item.headerIconType === EHeaderIconType.RadioFilter && filterConfig) {
    return <CellRadioFilter filterConfig={filterConfig} item={item} />;
  } else if (headerIconType === EHeaderIconType.CheckboxFilter && filterConfig) {
    return <CellCheckboxFilter filterConfig={filterConfig} item={item} />;
  } else if (headerIconType === EHeaderIconType.Sort && sortRowsConfig) {
    const { direction, sort, onSortChange } = sortRowsConfig;
    const colorTop =
      direction === EDirectionType.ASC && sortLookup(sort) === sortLookup(type)
        ? HEADER_ICON_PURPLE
        : HEADER_ICON_GREY;
    const colorBottom =
      direction === EDirectionType.DESC && sortLookup(sort) === sortLookup(type)
        ? HEADER_ICON_PURPLE
        : HEADER_ICON_GREY;
    return (
      <>
        <style jsx>{`
          button.top {
            color: ${colorTop};
          }
          button.bottom {
            color: ${colorBottom};
          }
          button:hover {
            color: ${HEADER_ICON_PURPLE};
          }
        `}</style>
        <button
          className="top"
          onClick={() => onSortChange({ sort: type, direction: EDirectionType.ASC })}
        >
          {ICON[EIconType.CaretUp]}
        </button>
        <button
          className="bottom"
          onClick={() => onSortChange({ sort: type, direction: EDirectionType.DESC })}
        >
          {ICON[EIconType.CaretDown]}
        </button>
      </>
    );
  } else {
    return null;
  }
}
