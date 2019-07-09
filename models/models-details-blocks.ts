export interface IBlockDetailsResult {
  dateVerified: number;
  difficulty: number;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: number;
  parentHash: string;
  receiptRoot: string;
  sha3Uncles: string;
  size: number;
  stateRoot: string;
  timestamp: number;
  timestampISO: string;
  timestampVerifiedISO: string;
  totalDifficulty: number;
  transactionCount: number;
  transactionsRoot: string;
  uncles: string[];
}

export interface IBlockDetailsFetch {
  id: string;
  result: IBlockDetailsResult;
}
