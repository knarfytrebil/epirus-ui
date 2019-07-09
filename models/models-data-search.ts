import { ILinkItem } from './models-general';

export interface ISearchFetch {
  type: string;
  links: ILinkItem[];
  result: any;
}
