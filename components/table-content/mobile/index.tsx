import * as React from 'react';
import { ITableContentProps } from '../index';
import { TableMobileItems, TableMobileWrapper } from './table';
import { ErrorMessage } from '../../placeholders';

export type ITableMobileProps = ITableContentProps;

export function TableMobile(props: ITableMobileProps) {
  const {
    isFilterSet,
    displayTitleType,
    noElementsMessage,
    headerItems,
    dimensionsConfig,
    tableFetchConfig,
    type,
    fetch,
  } = props;

  const { data, paging } = fetch.result;
  const isZeroElements = fetch.result.paging.totalElements === 0;
  return (
    <TableMobileWrapper
      displayTitleType={displayTitleType}
      type={type}
      dimensionsConfig={dimensionsConfig}
      paging={paging}
      headerItems={headerItems}
      isZeroElements={isZeroElements}
      isFilterSet={isFilterSet}
      {...tableFetchConfig}
    >
      {!isFilterSet && isZeroElements ? (
        <ErrorMessage>{noElementsMessage}</ErrorMessage>
      ) : (
        <TableMobileItems
          isZeroElements={isZeroElements}
          type={type}
          headerItems={headerItems}
          dataRows={data}
          tableFetchConfig={tableFetchConfig}
        />
      )}
    </TableMobileWrapper>
  );
}

export * from './table';
