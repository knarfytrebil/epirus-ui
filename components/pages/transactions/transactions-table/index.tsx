import * as React from 'react';
import { RouterProps } from 'next-server/router';
import {
  defined,
  resolveTableState,
  resolveTableFetch,
  transformFilterArrayToString,
} from '../../../../utils';
import {
  EDirectionType,
  EDisplayTitleType,
  IHeaderItem,
  EPageType,
  IDimensions,
  ETransactionsFetchParamType,
  ETransactionsSortAndFilterType,
  ITransactionsTableFetch,
  IFetchConfig,
  IFetchParamsValues,
  ISortValues,
  IError,
  ITableState,
  IDropdownOption,
} from '../../../../models';
import { TableContent } from '../../../table-content';
import { DESKTOP_WIDTH } from '../../../../style-config';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETransactionsSortAndFilterType.timestampISO,
};

export interface ITransactionsTableProps {
  isRefreshing: boolean;
  fetchConfig: IFetchConfig;
  router: RouterProps;
  headerItems: IHeaderItem[];
  noElementsMessage?: string;
  displayTitleType?: EDisplayTitleType;
  initTransactionsTableFetch?: Partial<ITransactionsTableFetch & IError>;
  dimensionsConfig: IDimensions;
}

export class TransactionsTable extends React.Component<
  ITransactionsTableProps,
  ITableState<ITransactionsTableFetch>
> {
  isMounted = false;
  constructor(props: ITransactionsTableProps, context?: any) {
    super(props, context);
    const { initTransactionsTableFetch, router } = props;
    this.state = resolveTableState(initTransactionsTableFetch, router.query);
  }

  private handleChangeFilterParams = (nextFilterParams: Partial<IFetchParamsValues>) => {
    this.fetchData(nextFilterParams);
  };

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initTransactionsTableFetch) {
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

  private fetchData = async (nextFilterParams: Partial<IFetchParamsValues>) => {
    const { router, fetchConfig } = this.props;
    this.setState({
      isFetching: true,
    });
    const nextState: ITableState<ITransactionsTableFetch> = await resolveTableFetch(
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

  private handleSortChange = (sortValues?: ISortValues) => {
    if (defined(sortValues)) {
      this.handleChangeFilterParams(sortValues);
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
    type: ETransactionsSortAndFilterType,
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

  private resolveConfig = (type: ETransactionsFetchParamType): any => {
    const { filterParams, currentFilters } = this.state;
    switch (type) {
      default:
        return null;
      case ETransactionsFetchParamType.PageNumber:
        return {
          page: filterParams.page,
          onPageNumberChange: this.handlePageNumberChange,
        };
      case ETransactionsFetchParamType.RowsDisplayed:
        return {
          size: filterParams.size,
          onRowsDisplayedChange: this.handleRowsDisplayedChange,
        };
      case ETransactionsFetchParamType.Sort:
        return {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: this.handleSortChange,
        };
      case ETransactionsFetchParamType.Filter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleTypeFilterChange,
        };
      case ETransactionsFetchParamType.MobileFilter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleMobileFilterChange,
        };
    }
  };

  public render() {
    const { dimensionsConfig, displayTitleType, noElementsMessage, headerItems } = this.props;
    const { errorFetching, isFetching, tableFetch } = this.state;
    const filterConfig = this.resolveConfig(ETransactionsFetchParamType.Filter);

    return (
      <TableContent
        breadcrumbs={[
          {
            name: 'Transactions',
            value: null,
          },
        ]}
        isFilterSet={filterConfig && filterConfig.filter}
        headerItems={headerItems}
        noElementsMessage={noElementsMessage || 'There are no transactions to show.'}
        displayTitleType={displayTitleType}
        type={
          dimensionsConfig.width > DESKTOP_WIDTH
            ? EPageType.transactions
            : EPageType.transactionsMobile
        }
        dimensionsConfig={dimensionsConfig}
        fetch={tableFetch}
        tableFetchConfig={{
          errorFetching,
          isFetching,
          pageNumberConfig: this.resolveConfig(ETransactionsFetchParamType.PageNumber),
          sortRowsConfig: this.resolveConfig(ETransactionsFetchParamType.Sort),
          filterConfig,
          mobileFilterConfig: this.resolveConfig(ETransactionsFetchParamType.MobileFilter),
          rowsDisplayedConfig: this.resolveConfig(ETransactionsFetchParamType.RowsDisplayed),
        }}
      />
    );
  }
}
