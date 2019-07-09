import * as React from 'react';
import { formatWithCommas, isEmptyObject } from '../../../../utils';
import {
  EPageType,
  EDisplayTitleType,
  IPaging,
  IPageNumberConfig,
  IRowsDisplayedConfig,
  IHeaderItem,
  IDictionary,
  EHeaderIconType,
  ISortConfig,
  IDimensions,
  IMobileFilterConfig,
} from '../../../../models';
import { TablePagination } from '../../table-pagination';
import { DESKTOP_WIDTH, MOBILE_GREY_TEXT } from '../../../../style-config';
import { TableMobileFilters } from './table-mobile-filters';
import { TYPE_LOOKUP } from '../../../../data';

export interface ITableMobileInfoHeaderProps {
  isZeroElements: boolean;
  dimensionsConfig: IDimensions;
  headerItems: IHeaderItem[];
  displayTitleType?: EDisplayTitleType;
  type: EPageType;
  paging: IPaging;
  pageNumberConfig: IPageNumberConfig;
  rowsDisplayedConfig: IRowsDisplayedConfig;
  mobileFilterConfig: IMobileFilterConfig;
  sortRowsConfig?: ISortConfig;
}

function headerItemsToFilters(headerItems: IHeaderItem[]): IDictionary<IHeaderItem[]> {
  return headerItems.reduce((a: IDictionary<IHeaderItem[]>, c: IHeaderItem) => {
    if (c.headerIconType === EHeaderIconType.CheckboxFilter) {
      if (a[EHeaderIconType.CheckboxFilter]) {
        a[EHeaderIconType.CheckboxFilter].push(c);
      } else {
        a[EHeaderIconType.CheckboxFilter] = [c];
      }
    } else if (c.headerIconType === EHeaderIconType.Sort) {
      if (a[EHeaderIconType.Sort]) {
        a[EHeaderIconType.Sort].push(c);
      } else {
        a[EHeaderIconType.Sort] = [c];
      }
    }
    return a;
  }, {});
}

export function TableMobileInfoHeader(props: ITableMobileInfoHeaderProps) {
  const {
    isZeroElements,
    dimensionsConfig,
    displayTitleType,
    type,
    pageNumberConfig,
    rowsDisplayedConfig,
    paging,
    headerItems,
    mobileFilterConfig,
    sortRowsConfig,
  } = props;
  const isTab = EDisplayTitleType.Tab === displayTitleType;
  const filters = headerItemsToFilters(headerItems);

  return (
    <>
      <style jsx>{`
        div.TableMobileInfoHeader {
          position: relative;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          margin-top: ${isTab ? -9 : 24}px;
          z-index: 1;
        }
        div.info {
          color: ${MOBILE_GREY_TEXT};
          font-size: 14px;
          line-height: 16px;
        }
        div.pagination {
          margin-top: 18px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TableMobileInfoHeader {
            margin-top: 32px;
          }
          div.pagination {
            margin-top: 16px;
          }
        }
      `}</style>
      <div className="TableMobileInfoHeader">
        {!isZeroElements && (
          <>
            {paging.totalElements > 0 && (
              <div className="info">{`Showing ${formatWithCommas(paging.totalElements)} ${
                TYPE_LOOKUP[type] ? TYPE_LOOKUP[type] : type
              }`}</div>
            )}
            <div className="pagination">
              <TablePagination
                paging={paging}
                pageNumberConfig={pageNumberConfig}
                rowsDisplayedConfig={rowsDisplayedConfig}
              />
            </div>
          </>
        )}
        {!isEmptyObject(filters) && (
          <TableMobileFilters
            isZeroElements={isZeroElements}
            dimensionsConfig={dimensionsConfig}
            filters={filters}
            mobileFilterConfig={mobileFilterConfig}
            sortRowsConfig={sortRowsConfig}
          />
        )}
      </div>
    </>
  );
}
