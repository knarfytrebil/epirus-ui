import { Option } from 'react-dropdown';
import { EDirectionType, TSortAndFilterType } from './models-data-general';
import { IError, IFetchParamsValues } from './index';
import { IDictionary } from './models-general';

export interface IPageNumberValues {
  page: number;
}

export interface IPageNumberConfig extends IPageNumberValues {
  onPageNumberChange(page: number): void;
}

export interface IRowsDisplayedValues {
  size: number;
}

export interface IRowsDisplayedConfig extends IRowsDisplayedValues {
  onRowsDisplayedChange(selectedOption: Option): void;
}

export interface IFilterValue {
  filter: string;
}

export interface IFilterConfig extends IFilterValue {
  currentFilters: string[];
  onFilterChange(type: TSortAndFilterType, filterValue: string[], sortValues?: ISortValues): void;
}

export interface IMobileFilterConfig extends IFilterValue {
  currentFilters: string[];
  onFilterChange(filterString: string, sortValues?: ISortValues): void;
}

export interface ISortValues {
  sort: TSortAndFilterType;
  direction: EDirectionType;
}

export interface ISortConfig extends ISortValues {
  onSortChange(sortValues: ISortValues): void;
}

export interface IMeta {
  display: string;
  contract: boolean;
}

export enum EHeaderIconType {
  CheckboxFilter = 'CheckboxFilter',
  RadioFilter = 'RadioFilter',
  Sort = 'Sort',
}

export interface ITableFetchConfig {
  errorFetching: any;
  isFetching: boolean;
  pageNumberConfig?: IPageNumberConfig;
  sortRowsConfig?: ISortConfig;
  rowsDisplayedConfig?: IRowsDisplayedConfig;
  filterConfig?: IFilterConfig;
  mobileFilterConfig?: IMobileFilterConfig;
}

export interface ITabItem {
  name: string;
  element: JSX.Element;
}

export interface ITableState<T> {
  errorFetching: any;
  isFetching: boolean;
  filterParams: IFetchParamsValues;
  tableFetch: Partial<T & IError>;
  currentFilters: IDictionary<string[]>;
  isRefreshing: boolean;
}
