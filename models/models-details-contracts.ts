import { ILinkItem } from './models-general';

export interface IContractDetailsResult {
  balance: number;
  ethBalance: string;
  contractAddress: string;
  contractCreator: string;
  contractType: string;
  createdBlockHash: string;
  createdBlockNumber: number;
  createdTimstampISO: string;
  createdTransactionHash: string;
  private: boolean;
  swarmHash: string;
  transactionCount: number;
  metadataName?: string;
  links: ILinkItem[];
}

export interface IContractDetailsFetch {
  id: string;
  result: IContractDetailsResult;
  type: string;
}
