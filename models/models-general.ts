import { EIconType } from '.';

export interface IDictionary<T> {
  [key: string]: T;
}

export interface INameIconPair {
  name: string;
  iconType: EIconType;
}

export interface INameValuePair {
  name: string;
  value: string;
}

export interface INameElementValue {
  name: string;
  value: string | JSX.Element;
}

export enum EPageType {
  contracts = 'contracts',
  contractsMobile = 'contractsMobile',
  tokens = 'tokens',
  tokensMobile = 'tokensMobile',
  transactions = 'transactions',
  transactionsMobile = 'transactionsMobile',
  blocks = 'blocks',
  blocksMobile = 'blocksMobile',
  // other
  metadata = 'metadata',
  metadataMobile = 'metadataMobile',
  eventsContracts = 'eventsContracts',
  eventsTransactions = 'eventsTransactions',
  eventsContractsMobile = 'eventsContractsMobile',
  eventsTransactionsMobile = 'eventsTransactionsMobile',
}

export interface IDimensions {
  width: number;
  height: number;
  heightScreen: number;
  isWidthResizing: boolean;
  isHeightResizing: boolean;
}

export interface ILinkItem {
  href: string;
  rel: string;
}

export enum ELinkType {
  Self = 'self',
  Metadata = 'metadata',
}
