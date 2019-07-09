import * as React from 'react';
import { RouterProps } from 'next-server/router';
import {
  defined,
  resolveTableState,
  resolveTableFetch,
  transformFilterArrayToString,
} from '../../../../utils';
import {
  ETokensFetchParamType,
  ETokensSortAndFilterType,
  EPageType,
  IDimensions,
  EDirectionType,
  IFetchParamsValues,
  ISortValues,
  ITableState,
  IFetchConfig,
  ITokensTableFetch,
  IDropdownOption,
} from '../../../../models';
import { TableContent } from '../../../table-content';
import { TOKENS_HEADER_ITEMS } from '../../../../data';
import { ITransactionsTableProps } from '../../transactions';
import { DESKTOP_WIDTH } from '../../../../style-config';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETokensSortAndFilterType.lastExecuted,
};

export interface ITokensTableProps {
  isRefreshing: boolean;
  fetchConfig: IFetchConfig;
  initTokensTableFetch?: ITokensTableFetch;
  dimensionsConfig: IDimensions;
  router: RouterProps;
}

export interface ITokensTableState {
  errorFetching: any;
  isFetching: boolean;
  filterParams: IFetchParamsValues;
  tokensFetch: ITokensTableFetch;
}

export class TokensTable extends React.Component<
  ITokensTableProps,
  ITableState<ITokensTableFetch>
> {
  isMounted = false;
  constructor(props: ITokensTableProps, context?: any) {
    super(props, context);
    const { initTokensTableFetch, router } = props;
    this.state = resolveTableState(initTokensTableFetch, router.query);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initTokensTableFetch) {
      this.fetchData(this.props.fetchConfig.child.params);
    }
  }

  public componentDidUpdate(prevProps: ITransactionsTableProps) {
    if (prevProps.isRefreshing !== this.props.isRefreshing) {
      this.fetchData({});
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private handleChangeFilterParams = (nextFilterParams: Partial<IFetchParamsValues>) => {
    this.fetchData(nextFilterParams).catch(() => {
      if (this.isMounted) {
        this.setState({
          isFetching: false,
        });
      }
    });
  };

  private fetchData = async (nextFilterParams: Partial<IFetchParamsValues>) => {
    const { router, fetchConfig } = this.props;
    this.setState({
      isFetching: true,
    });
    const nextState: ITableState<ITokensTableFetch> = await resolveTableFetch(
      nextFilterParams,
      this.state.filterParams,
      router,
      fetchConfig,
    );
    if (this.isMounted) {
      this.setState(nextState);
    }
  };

  private handlePageNumberChange = (page: number) => {
    this.handleChangeFilterParams({ page });
  };

  private handleSortChange = (sortConfig?: ISortValues) => {
    if (defined(sortConfig)) {
      this.handleChangeFilterParams(sortConfig);
    } else {
      this.handleChangeFilterParams(DEFAULT_SORT_CONFIG);
    }
  };

  private handleRowsDisplayedChange = (selectedOption: IDropdownOption) => {
    const size = parseFloat(selectedOption.value);
    const page = Math.floor((this.state.filterParams.size / size) * this.state.filterParams.page);
    this.handleChangeFilterParams({ size, page });
  };

  private handleTypeFilterChange = (
    type: ETokensSortAndFilterType,
    filter: string[],
    sortValues?: ISortValues,
  ) => {
    this.setState(
      {
        currentFilters: { ...this.state.currentFilters, [type]: filter },
      },
      () => {
        const filterString = transformFilterArrayToString(this.state.currentFilters);
        this.handleChangeFilterParams({ filter: filterString, page: 0, ...(sortValues || {}) });
      },
    );
  };

  private handleMobileFilterChange = (filter: string, sortValues?: ISortValues) => {
    this.handleChangeFilterParams({ filter, page: 0, ...(sortValues || {}) });
  };

  private resolveConfig = (type: ETokensFetchParamType): any => {
    const { filterParams, currentFilters } = this.state;
    switch (type) {
      default:
        return null;
      case ETokensFetchParamType.PageNumber:
        return {
          page: filterParams.page,
          onPageNumberChange: this.handlePageNumberChange,
        };
      case ETokensFetchParamType.Sort:
        return {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: this.handleSortChange,
        };
      case ETokensFetchParamType.RowsDisplayed:
        return {
          size: filterParams.size,
          onRowsDisplayedChange: this.handleRowsDisplayedChange,
        };
      case ETokensFetchParamType.Filter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleTypeFilterChange,
        };
      case ETokensFetchParamType.MobileFilter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleMobileFilterChange,
        };
    }
  };

  public render() {
    const { dimensionsConfig } = this.props;
    const { errorFetching, isFetching, tableFetch } = this.state;
    const filterConfig = this.resolveConfig(ETokensFetchParamType.Filter);

    return (
      <TableContent
        breadcrumbs={[
          {
            name: 'Tokens',
            value: null,
          },
        ]}
        isFilterSet={filterConfig && filterConfig.filter}
        noElementsMessage="There are no tokens to show."
        type={dimensionsConfig.width > DESKTOP_WIDTH ? EPageType.tokens : EPageType.tokensMobile}
        headerItems={TOKENS_HEADER_ITEMS}
        dimensionsConfig={dimensionsConfig}
        fetch={tableFetch}
        tableFetchConfig={{
          errorFetching,
          isFetching,
          pageNumberConfig: this.resolveConfig(ETokensFetchParamType.PageNumber),
          sortRowsConfig: this.resolveConfig(ETokensFetchParamType.Sort),
          filterConfig,
          mobileFilterConfig: this.resolveConfig(ETokensFetchParamType.MobileFilter),
          rowsDisplayedConfig: this.resolveConfig(ETokensFetchParamType.RowsDisplayed),
        }}
      />
    );
  }
}
