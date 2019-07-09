export enum EFetchState {
  None = 'None',
  Fetching = 'Fetching',
  Success = 'Success',
  Error = 'Error',
}

export interface IFetchDataState<D> {
  data?: D;
  fetchState: EFetchState;
}
