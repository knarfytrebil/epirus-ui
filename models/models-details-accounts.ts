export interface IAccountDetailsResult {
  address: string;
  balance: number;
  ethBalance: string;
  transactions: number;
}

export interface IAccountDetailsFetch {
  id: string;
  result: IAccountDetailsResult;
}
