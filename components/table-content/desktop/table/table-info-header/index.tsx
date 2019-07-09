import * as React from 'react';
import { DARK_PURPLE, TYPE_LOOKUP } from '../../../../../data';
import { capitalize, formatWithCommas } from '../../../../../utils';
import {
  EPageType,
  EDisplayTitleType,
  IPaging,
  IPageNumberConfig,
  IRowsDisplayedConfig,
} from '../../../../../models';
import { TablePagination } from '../../../table-pagination';

export interface ITableDesktopInfoHeaderProps {
  displayTitleType?: EDisplayTitleType;
  type: EPageType;
  paging: IPaging;
  pageNumberConfig: IPageNumberConfig;
  rowsDisplayedConfig: IRowsDisplayedConfig;
}

function resolveTitle(type: EPageType) {
  if (type === EPageType.metadata) {
    return 'Contract Metadata Registry';
  } else {
    return capitalize(type);
  }
}

export function TableDesktopInfoHeader(props: ITableDesktopInfoHeaderProps) {
  const { displayTitleType, type, pageNumberConfig, rowsDisplayedConfig, paging } = props;
  const isTab = EDisplayTitleType.Tab === displayTitleType;

  return (
    <>
      <style jsx>{`
        h2 {
          color: ${DARK_PURPLE};
          font-size: 28px;
          line-height: 34px;
        }
        div.bottom {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          min-height: 44px;
          margin-top: ${isTab ? -9 : 24}px;
          z-index: 2;
        }
        div.info {
          color: ${DARK_PURPLE};
          font-size: 14px;
          line-height: 22px;
        }
      `}</style>
      <>
        {!isTab && <h2>{resolveTitle(type)}</h2>}
        {paging && (
          <div className="bottom">
            {paging.totalElements > 0 && (
              <div className="info">{`Showing ${formatWithCommas(paging.totalElements)} ${
                TYPE_LOOKUP[type] ? TYPE_LOOKUP[type] : type
              }`}</div>
            )}
            <TablePagination
              paging={paging}
              pageNumberConfig={pageNumberConfig}
              rowsDisplayedConfig={rowsDisplayedConfig}
            />
          </div>
        )}
      </>
    </>
  );
}
