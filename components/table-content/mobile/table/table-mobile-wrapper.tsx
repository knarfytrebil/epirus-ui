import * as React from 'react';
import {
  EPageType,
  EDisplayTitleType,
  IPaging,
  ITableFetchConfig,
  IHeaderItem,
  IDimensions,
} from '../../../../models';
import { LoadingSpinner } from '../../../placeholders';
import { TableMobileInfoHeader } from './table-mobile-info-header';
import { MAIN_TABLE_PADDING } from '../../../../style-config';
let timeout1, timeout2;

export interface ITableMobileWrapperProps extends ITableFetchConfig {
  isZeroElements: boolean;
  isFilterSet: boolean;
  displayTitleType?: EDisplayTitleType;
  headerItems: IHeaderItem[];
  type: EPageType;
  dimensionsConfig: IDimensions;
  paging: IPaging;
  children: JSX.Element;
}

export function TableMobileWrapper(props: ITableMobileWrapperProps) {
  const [isThrottledLoading, setLoading] = React.useState(false);
  const {
    isZeroElements,
    isFilterSet,
    headerItems,
    type,
    isFetching,
    rowsDisplayedConfig,
    pageNumberConfig,
    paging,
    mobileFilterConfig,
    sortRowsConfig,
    dimensionsConfig,
  } = props;

  React.useEffect(() => {
    if (isFetching) {
      clearTimeout(timeout2);
      timeout1 = setTimeout(() => setLoading(true), 200);
    } else {
      clearTimeout(timeout1);
      timeout2 = setTimeout(() => setLoading(false), 200);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isFetching]);

  return (
    <>
      {isThrottledLoading && (
        <LoadingSpinner
          style={{
            position: 'absolute',
            top: MAIN_TABLE_PADDING,
            right: MAIN_TABLE_PADDING,
          }}
        />
      )}
      {!(isZeroElements && !isFilterSet) && (
        <TableMobileInfoHeader
          isZeroElements={isZeroElements}
          headerItems={headerItems}
          type={type}
          pageNumberConfig={pageNumberConfig}
          rowsDisplayedConfig={rowsDisplayedConfig}
          paging={paging}
          dimensionsConfig={dimensionsConfig}
          mobileFilterConfig={mobileFilterConfig}
          sortRowsConfig={sortRowsConfig}
        />
      )}
      {props.children}
    </>
  );
}
