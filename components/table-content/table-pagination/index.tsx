import * as React from 'react';
import { RowsSelecter } from './rows-selecter';
import { RowsDisplayedInfo } from './rows-displayed-info';
import { ArrowsPaginationNav } from './arrows-pagination-nav';
import { IPaging, IPageNumberConfig, IRowsDisplayedConfig } from '../../../models';
import { DESKTOP_WIDTH, GREY, MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../style-config';

export enum EPaginationType {
  Arrows = 'Arrows',
  Numbers = 'Numbers',
}

export interface ITablePaginationProps {
  paging: IPaging;
  pageNumberConfig: IPageNumberConfig;
  rowsDisplayedConfig: IRowsDisplayedConfig;
}

export function TablePagination(props: ITablePaginationProps) {
  const { paging, rowsDisplayedConfig, pageNumberConfig } = props;
  const { onPageNumberChange } = pageNumberConfig;
  const { onRowsDisplayedChange } = rowsDisplayedConfig;
  const { totalPages, totalElements } = paging;

  const pageFromConfig: any = pageNumberConfig.page;
  const pageFromPaging = paging.page;
  const page = parseFloat(pageFromConfig) || pageFromPaging;

  const sizeFromConfig = rowsDisplayedConfig.size;
  const sizeFromPaging = paging.size;
  const size = sizeFromConfig || sizeFromPaging;

  const isArrows = paging.totalElements > paging.size;

  const isRowsSelecter = totalElements > 10;

  return (
    <>
      <style jsx>{`
        div.TablePagination {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: row;
          color: ${GREY};
        }
        div.pagination-control {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TablePagination {
            align-items: flex-start;
            flex-direction: column;
            color: ${MOBILE_GREY_TEXT};
          }
          div.pagination-control {
            color: ${MOBILE_TEXT};
          }
          div.pagination-control {
            margin-top: ${isRowsSelecter ? 12 : 0}px;
          }
        }
      `}</style>
      <div className="TablePagination">
        {isRowsSelecter && <RowsSelecter value={size} onChange={onRowsDisplayedChange} />}
        <div className="pagination-control">
          {totalElements !== 0 && (
            <RowsDisplayedInfo
              min={page * size}
              max={page * size + size}
              totalRows={totalElements}
              isArrows={isArrows}
            />
          )}
          {isArrows && (
            <ArrowsPaginationNav
              totalPages={totalPages}
              currentPage={page}
              onPageNumberChange={onPageNumberChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
