import { EPageType, IDictionary, IHeaderDictionary } from '../models';
import { BLOCKS_CELL_LOOKUP } from './data-blocks';
import { CONTRACTS_CELL_LOOKUP } from './data-contracts';
import { TRANSACTIONS_CELL_LOOKUP } from './data-transactions';
import { TOKENS_CELL_LOOKUP } from './data-tokens';
import { EVENTS_CONTRACTS_CELL_LOOKUP } from './data-events-contracts';
import { EVENTS_TRANSACTIONS_CELL_LOOKUP } from './data-events-transactions';
import { TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-transactions-mobile';
import { CONTRACTS_MOBILE_CELL_LOOKUP } from './data-contracts-mobile';
import { TOKENS_MOBILE_CELL_LOOKUP } from './data-tokens-mobile';
import { BLOCKS_MOBILE_CELL_LOOKUP } from './data-blocks-mobile';
import { EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP } from './data-events-contracts-mobile';
import { EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-events-transactions-mobile';
import { METADATA_CELL_LOOKUP } from './data-metadata';
import { METADATA_MOBILE_CELL_LOOKUP } from './data-metadata-mobile';

export const COMBINED_LOOKUP: IDictionary<IHeaderDictionary<(data: any) => JSX.Element>> = {
  [EPageType.metadata]: METADATA_CELL_LOOKUP,
  [EPageType.metadataMobile]: METADATA_MOBILE_CELL_LOOKUP,
  [EPageType.contracts]: CONTRACTS_CELL_LOOKUP,
  [EPageType.contractsMobile]: CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.tokens]: TOKENS_CELL_LOOKUP,
  [EPageType.tokensMobile]: TOKENS_MOBILE_CELL_LOOKUP,
  [EPageType.transactions]: TRANSACTIONS_CELL_LOOKUP,
  [EPageType.transactionsMobile]: TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.blocks]: BLOCKS_CELL_LOOKUP,
  [EPageType.blocksMobile]: BLOCKS_MOBILE_CELL_LOOKUP,
  [EPageType.eventsContracts]: EVENTS_CONTRACTS_CELL_LOOKUP,
  [EPageType.eventsTransactions]: EVENTS_TRANSACTIONS_CELL_LOOKUP,
  [EPageType.eventsContractsMobile]: EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.eventsTransactionsMobile]: EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP,
};

export const TYPE_LOOKUP = {
  metadata: 'results',
  metadataMobile: 'results',
  contracts: 'contracts',
  contractsMobile: 'contracts',
  tokens: 'tokens',
  tokensMobile: 'tokens',
  transactions: 'transactions',
  transactionsMobile: 'transactions',
  blocks: 'blocks',
  blocksMobile: 'blocks',
  eventsContracts: 'events',
  eventsTransactions: 'events',
  eventsContractsMobile: 'events',
  eventsTransactionsMobile: 'events',
};
