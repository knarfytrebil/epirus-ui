import { IDetailsState, IError, ITableState } from '../models';
import { filterToCurrentSelectedOptions } from './queries';

export function resolveTableState(tableFetch, params): ITableState<any> {
  // TODO: Make a union type for all table data fetching
  let filterParams: any = params;
  let errorFetching = null;

  if (tableFetch) {
    if (tableFetch.result && tableFetch.result.paging) {
      const { sort, size, direction, filter } = tableFetch.result.paging;
      filterParams = {
        ...{ sort, size, direction, filter },
        ...filterParams,
      };
    }
    errorFetching = tableFetch.error;
  }

  return {
    errorFetching,
    isFetching: false,
    filterParams,
    tableFetch: tableFetch,
    currentFilters: filterParams ? filterToCurrentSelectedOptions(filterParams.filter) : {},
    isRefreshing: false,
  };
}

export function resolveDetailsState(initFetch): IDetailsState<any> {
  // TODO: Make a union type for all details data fetching
  let errorFetching = null;
  let detailsFetch = null;

  if (initFetch && initFetch.error) {
    errorFetching = initFetch as IError;
  } else {
    detailsFetch = initFetch as any;
  }

  return {
    isFetching: false,
    errorFetching,
    detailsFetch,
  };
}
