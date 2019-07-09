import * as React from 'react';
import {
  EPageType,
  EDisplayTitleType,
  IHeaderItem,
  ITableFetchConfig,
  TTableFetch,
  IError,
  INameValuePair,
  IDimensions,
} from '../../models';
import { isDesktop } from '../../utils';
import { TableDesktop } from './desktop';
import { ErrorMessage, Loading } from '../placeholders';
import { TableMobile } from './mobile';

export interface ITableContentProps {
  dimensionsConfig: IDimensions;
  breadcrumbs?: INameValuePair[];
  isFilterSet: boolean;
  displayTitleType?: EDisplayTitleType;
  type: EPageType;
  headerItems: IHeaderItem[];
  fetch: Partial<TTableFetch & IError>;
  noElementsMessage: string;
  tableFetchConfig: ITableFetchConfig;
}

export function TableContent(props: ITableContentProps) {
  const { fetch, type } = props;
  if (fetch && fetch.error) {
    return <ErrorMessage>Something went wrong. No results from data.</ErrorMessage>;
  } else if (fetch && fetch.result && fetch.result.paging) {
    if (isDesktop(props.dimensionsConfig.width)) {
      return <TableDesktop {...props} />;
    } else {
      return <TableMobile {...props} />;
    }
  } else if (
    (type === EPageType.contracts && fetch && fetch['data'] && fetch['paging']) ||
    (type === EPageType.contractsMobile && fetch && fetch['data'] && fetch['paging']) ||
    (type === EPageType.metadata && fetch && fetch['data'] && fetch['paging']) ||
    (type === EPageType.metadataMobile && fetch && fetch['data'] && fetch['paging'])
  ) {
    //TODO: Ask Antony to update database so that there is a 'result' prop
    fetch.result = {
      data: fetch['data'],
      paging: fetch['paging'],
    };
    if (isDesktop(props.dimensionsConfig.width)) {
      return <TableDesktop {...props} />;
    } else {
      return <TableMobile {...props} />;
    }
  } else {
    return <Loading isThrottled style={{ margin: '50px 0' }} />;
  }
}

export * from './desktop';
export * from './mobile';
export * from './table-pagination';
export * from './parameters-pair-list';
