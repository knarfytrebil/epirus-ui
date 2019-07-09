import { IMeta } from './models-table-general';

export interface ITransactionDetailsLog {
  address: string;
  data: string;
  decodedEventAbi: string;
  logIndex: number;
  topics: string[];
}

export interface ITransactionDetailsResult {
  blockHash: string;
  blockNumber: number;
  cumulativeGasUsed: number;
  ethValue: string;
  from: string;
  fromMeta: IMeta;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  hash: string;
  input: string;
  logs: ITransactionDetailsLog[];
  logsBloom: string;
  nonce: string;
  private: boolean;
  r: string;
  s: string;
  status: string;
  timestamp: number;
  timestampISO: string;
  to: string;
  toMeta: IMeta;
  transactionIndex: number;
  transactionType: string;
  v: number;
  value: number;
  verifiedTimestamp: number;
  verifiedTimestampISO: string;
}

export interface ITransactionDetailsFetch {
  id: string;
  result: ITransactionDetailsResult;
  type: string;
}
