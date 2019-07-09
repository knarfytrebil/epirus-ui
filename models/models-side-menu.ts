import { INameIconPair } from './models-general';

export interface IMenuItem extends INameIconPair {
  externalPath?: string;
  isPaid?: boolean;
}
