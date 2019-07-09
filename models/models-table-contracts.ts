import { IPaging } from './models-data-general';
import { ETagType } from '../components';
import {
  IPageNumberConfig,
  IRowsDisplayedConfig,
  IPageNumberValues,
  IRowsDisplayedValues,
} from '.';
import { ILinkItem } from './models-general';

export enum EContractsHeaderType {
  Type = 'Type',
  Name = 'Name',
  Hash = 'Hash',
  'Transaction Count' = 'Transaction Count',
  'Creation Date' = 'Creation Date',
  'Last Execution' = 'Last Execution',
}

export interface IContractsData {
  address: string;
  contractType: ETagType;
  createdTimestampISO: string;
  createdTransaction: string;
  lastExecutedTimestampISO: string;
  lastExecutedTransaction: string;
  transactionCount: number;
  metadataName?: string;
  links?: ILinkItem[];
}

export interface IContractsDataResult {
  paging: IPaging;
  data: IContractsData[];
}

export interface IContractsTableFetch {
  type: string;
  result: IContractsDataResult;
}

export enum EContractsFetchParamType {
  Sort = 'Sort',
  Filter = 'Filter',
  MobileFilter = 'MobileFilter',
  RowsDisplayed = 'RowsDisplayed',
  PageNumber = 'PageNumber',
}

export enum EContractsSortAndFilterType {
  created = 'created', // "created.blockNumber" - default
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
  contractCreator = 'contractCreator',
}

export enum EContractsContractType {
  Custom = 'Custom',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}
