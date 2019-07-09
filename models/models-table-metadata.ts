import { IPaging } from './models-data-general';
import {
  IPageNumberConfig,
  IRowsDisplayedConfig,
  IPageNumberValues,
  IRowsDisplayedValues,
} from '.';
import { ILinkItem } from './models-general';

export enum EMetadataHeaderType {
  Name = 'Name',
  ContractsCount = 'Contracts Count',
}

export interface IMetadataData {
  contractCount?: number;
  links: ILinkItem[];
  metadata?: string; //stringified json
  name: string;
  swarmHash?: string;
}

export interface IMetadataDataResult {
  paging: IPaging;
  data: IMetadataData[];
}

export interface IMetadataTableFetch {
  type: string;
  result: IMetadataDataResult;
}

export enum EMetadataFetchParamType {
  Sort = 'Sort',
  RowsDisplayed = 'RowsDisplayed',
  PageNumber = 'PageNumber',
}

export enum EMetadataSortAndFilterType {
  created = 'created', // "created.blockNumber" - default
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
  contractCreator = 'contractCreator',
}

export interface IMetadataOption {
  name: string;
  component: JSX.Element;
}
