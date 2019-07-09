import { IPaging } from './models-data-general';

export enum EBlocksHeaderType {
  Type = 'Type',
  Hash = 'Hash',
  'Block Number' = 'Block Number',
  'Transaction Count' = 'Transaction Count',
  Time = 'Time',
  From = 'From',
  Value = 'Value',
}

export interface IBlocksData {
  number: number;
  hash: string;
  timestampISO: string;
  transactionCount: number;
}

export interface IBlocksDataResult {
  paging: IPaging;
  data: IBlocksData[];
}

export interface IBlocksTableFetch {
  type: string;
  result: IBlocksDataResult;
}

export enum EBlocksFetchParamType {
  Sort = 'Sort',
  RowsDisplayed = 'RowsDisplayed',
  PageNumber = 'PageNumber',
  Filter = 'Filter',
}

export enum EBlocksSortAndFilterType {
  number = 'number',
  timestampISO = 'timestampISO',
  transactionCount = 'transactionCount',
}
