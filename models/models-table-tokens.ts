import { IPaging } from './models-data-general';
import {
  IPageNumberConfig,
  IRowsDisplayedConfig,
  IRowsDisplayedValues,
  IPageNumberValues,
} from '.';
import { ETagType } from '../components';

export enum ETokensHeaderType {
  Type = 'Type',
  Name = 'Name',
  TotalSupply = 'Total Supply',
  TransactionCount = 'Transaction Count',
  LastExecution = 'Last Execution',
}

export interface ITokensData {
  address: string;
  contractType: ETagType;
  decimals: number;
  lastExecutedTimestampISO: string;
  name?: string;
  symbol?: string;
  totalSupply: number;
  transactionCount: number;
}

export interface ITokensDataResult {
  paging: IPaging;
  data: ITokensData[];
}

export interface ITokensTableFetch {
  id: string;
  type: string;
  result: ITokensDataResult;
}

export enum ETokensFetchParamType {
  Sort = 'Sort',
  Filter = 'Filter',
  MobileFilter = 'MobileFilter',
  RowsDisplayed = 'RowsDisplayed',
  PageNumber = 'PageNumber',
}

export enum ETokensSortAndFilterType {
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
}

export enum ETokensContractType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}
