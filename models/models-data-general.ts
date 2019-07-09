import { IDictionary } from './models-general';
import {
  EHeaderIconType,
  IFilterConfig,
  IFilterValue,
  IPageNumberConfig,
  IPageNumberValues,
  IRowsDisplayedConfig,
  IRowsDisplayedValues,
  ISortConfig,
  ISortValues,
} from './models-table-general';
import {
  EBlocksHeaderType,
  EBlocksSortAndFilterType,
  IBlocksDataResult,
  IBlocksTableFetch,
} from './models-table-blocks';
import {
  EContractsHeaderType,
  EContractsSortAndFilterType,
  IContractsDataResult,
  IContractsTableFetch,
} from './models-table-contracts';
import {
  ETransactionsHeaderType,
  ETransactionsSortAndFilterType,
  ITransactionsDataResult,
  ITransactionsTableFetch,
} from './models-table-transactions';
import {
  ETokensHeaderType,
  ETokensSortAndFilterType,
  ITokensDataResult,
  ITokensTableFetch,
} from './models-table-tokens';
import {
  EEventsHeaderType,
  EEventsSortAndFilterType,
  IEventsTableFetch,
  IEventsTableResult,
} from './models-table-events';
import { EMetadataHeaderType, EMetadataSortAndFilterType } from './models-table-metadata';

export enum EDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type THeaderType =
  | EContractsHeaderType
  | ETokensHeaderType
  | ETransactionsHeaderType
  | EBlocksHeaderType
  | EEventsHeaderType
  | EMetadataHeaderType;
export type TSortAndFilterType =
  | EContractsSortAndFilterType
  | ETokensSortAndFilterType
  | ETransactionsSortAndFilterType
  | EBlocksSortAndFilterType
  | EEventsSortAndFilterType
  | EMetadataSortAndFilterType;
export type IFetchParamsValues = IPageNumberValues &
  ISortValues &
  IRowsDisplayedValues &
  IFilterValue;
export type IFetchParamsConfig =
  | IPageNumberConfig
  | ISortConfig
  | IRowsDisplayedConfig
  | IFilterConfig;

export interface IHeaderItem {
  headerType: THeaderType;
  headerIconType?: EHeaderIconType;
  type?: TSortAndFilterType;
  options?: any[];
  optionsLabelLookup?: IDictionary<string>;
  fixedWidth?: number;
}

export interface IHeaderDictionary<T> {
  [key: string]: T;
}

export enum EDisplayTitleType {
  Normal = 'Normal',
  Tab = 'Tab',
}

export type TTableFetch =
  | IContractsTableFetch
  | ITokensTableFetch
  | IBlocksTableFetch
  | ITransactionsTableFetch
  | IEventsTableFetch;
export type TTableResult =
  | IContractsDataResult
  | ITokensDataResult
  | IBlocksDataResult
  | ITransactionsDataResult
  | IEventsTableResult;

export interface IPaging {
  page: number;
  size: number;
  sort: TSortAndFilterType;
  direction: EDirectionType;
  totalElements: number;
  totalPages: number;
  filter?: string;
}

export interface IUrlConfig {
  pathname: string;
  params: IDictionary<string>;
}

export interface IFetchConfig {
  parent?: IUrlConfig;
  excluded?: string[];
  fetchUrlIsAsPath?: boolean;
  child: IUrlConfig;
}

export interface IHashLinkConfig {
  rootUrl: string;
  hash: string;
}

export interface ILinkConfig {
  href: string;
  as?: string;
}

export interface IError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export enum ESyncStatus {
  DOWN = 'Down',
  SYNCING = 'Syncing',
  UP = 'Synced',
}

export interface ISyncStatusDetails {
  node: any;
  mongo: any;
}

export interface ISyncStatus {
  details: ISyncStatusDetails;
  status: ESyncStatus;
}
