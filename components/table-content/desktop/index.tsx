import * as React from 'react';
import { Table, TableDesktopWrapper } from './table';
import { ErrorMessage } from '../../placeholders';
import { ITableContentProps } from '../index';
import { tableHeight } from '../../../utils';

export type ITableDesktopProps = ITableContentProps;

export function TableDesktop(props: ITableDesktopProps) {
  const {
    breadcrumbs,
    isFilterSet,
    displayTitleType,
    headerItems,
    dimensionsConfig,
    tableFetchConfig,
    type,
    noElementsMessage,
    fetch,
  } = props;

  const { data, paging } = fetch.result;
  const isZeroElements = fetch.result.paging.totalElements === 0;
  return (
    <TableDesktopWrapper
      breadcrumbs={breadcrumbs}
      displayTitleType={displayTitleType}
      type={type}
      tableHeight={tableHeight(dimensionsConfig)}
      paging={paging}
      isZeroElements={isZeroElements}
      isFilterSet={isFilterSet}
      {...tableFetchConfig}
    >
      {!isFilterSet && isZeroElements ? (
        <ErrorMessage>{noElementsMessage}</ErrorMessage>
      ) : (
        <Table
          isZeroElements={isZeroElements}
          type={type}
          headerItems={headerItems}
          dataRows={data}
          tableFetchConfig={tableFetchConfig}
        />
      )}
    </TableDesktopWrapper>
  );
}

export * from './table/index';
