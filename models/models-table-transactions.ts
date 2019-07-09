import { IPaging } from './models-data-general';
import { ETagType } from '../components';
import {
  IMeta,
  IPageNumberConfig,
  IPageNumberValues,
  IRowsDisplayedConfig,
  IRowsDisplayedValues,
} from '.';

export enum ETransactionsHeaderType {
  Type = 'Type',
  Hash = 'Hash',
  State = 'State',
  From = 'From',
  To = 'To',
  Value = 'Value',
  Time = 'Time',
}

export interface ITransactionsData {
  direction: ETransactionsDirection;
  timestamp: number;
  hash: string;
  from: string;
  fromMeta: IMeta;
  to: string;
  toMeta: IMeta;
  value: string;
  timestampISO: string;
  transactionType: ETagType;
  private: boolean;
  ethValue: string;
}

export interface ITransactionsDataResult {
  paging: IPaging;
  data: ITransactionsData[];
}

export interface ITransactionsTableFetch {
  id: string;
  type: string;
  result: ITransactionsDataResult;
}

export enum ETransactionsFetchParamType {
  Sort = 'Sort',
  Filter = 'Filter',
  MobileFilter = 'MobileFilter',
  RowsDisplayed = 'RowsDisplayed',
  PageNumber = 'PageNumber',
}

export enum ETransactionsSortAndFilterType {
  blockNumber = 'blockNumber',
  timestampISO = 'timestampISO',
  from = 'from',
  to = 'to',
  blockHash = 'blockHash',
  transactionType = 'transactionType',
  functionName = 'functionName',
  ethValue = 'ethValue',
  direction = 'direction',
}

export enum ETransactionsTransactionType {
  ContractCall = 'Contract Call',
  ContractCreation = 'Contract Creation',
  Transfer = 'Transfer',
}

export enum ETransactionsDirection {
  In = 'In',
  Out = 'Out',
  Self = 'Self',
}
