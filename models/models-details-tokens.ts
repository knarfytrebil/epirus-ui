import { ETagType } from '../components';

export interface ITokenDetailsResult {
  address: string;
  contractType: ETagType;
  decimals: number;
  lastExecutedTimestampISO: string;
  name?: string;
  symbol?: string;
  totalSupply?: number;
  transactionCount: number;
}

export interface ITokenDetailsFetch {
  id: string;
  result: ITokenDetailsResult;
  type: string;
}
