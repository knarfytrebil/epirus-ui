import { IPaging } from './models-data-general';

export enum EEventsHeaderType {
  Address = 'Address',
  Name = 'Name',
  Parameters = 'Parameters',
  TransactionHash = 'Transaction Hash',
  Time = 'Time',
}
export interface IEventsParameter {
  name: string;
  value: string;
  type: string;
}

export interface IEventsData {
  blockNumber: number;
  eventName: string;
  parameters: IEventsParameter[];
  length: number;
  timestampISO: string;
  transactionHash: string;
}

export interface IEventsTableResult {
  data: IEventsData[];
  paging: IPaging;
}

export interface IEventsTableFetch {
  id: string;
  type: string;
  result: IEventsTableResult;
}

export enum EEventsFetchParamType {
  Sort = 'Sort',
  Filter = 'Filter',
  MobileFilter = 'MobileFilter',
  RowsDisplayed = 'RowsDisplayed',
  PageNumber = 'PageNumber',
}

export enum EEventsSortAndFilterType {
  blockNumber = 'blockNumber',
  timestampISO = 'timestampISO',
  paramIndex = 'paramIndex',
  paramType = 'paramType',
  paramValue = 'paramValue',
  paramName = 'paramName',
}
