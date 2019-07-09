import * as React from 'react';
import {
  defined,
  resolveTableState,
  resolveTableFetch,
  transformFilterArrayToString,
} from '../../../../utils';
import {
  EContractsFetchParamType,
  EContractsSortAndFilterType,
  IContractsTableFetch,
  EPageType,
  IDimensions,
  EDirectionType,
  IFetchParamsValues,
  ISortValues,
  ETransactionsSortAndFilterType,
  IFetchConfig,
  ITableState,
  IError,
  IHeaderItem,
  EDisplayTitleType,
  IDropdownOption,
} from '../../../../models';
import { TableContent } from '../../../table-content';
import { RouterProps } from 'next-server/router';
import { ITransactionsTableProps } from '../../transactions';
import { DESKTOP_WIDTH } from '../../../../style-config';

export interface IContractsTableProps {
  isRefreshing: boolean;
  fetchConfig: IFetchConfig;
  router: RouterProps;
  headerItems: IHeaderItem[];
  noElementsMessage?: string;
  displayTitleType?: EDisplayTitleType;
  initContractsTableFetch?: Partial<IContractsTableFetch & IError>;
  dimensionsConfig: IDimensions;
}

export class ContractsTable extends React.Component<
  IContractsTableProps,
  ITableState<IContractsTableFetch>
> {
  isMounted = false;
  constructor(props: IContractsTableProps, context?: any) {
    super(props, context);
    const { initContractsTableFetch, router } = props;
    this.state = resolveTableState(initContractsTableFetch, router.query);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initContractsTableFetch) {
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
    const nextState: ITableState<IContractsTableFetch> = await resolveTableFetch(
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
      this.handleChangeFilterParams({
        direction: EDirectionType.DESC,
        sort: EContractsSortAndFilterType.transactionCount,
      });
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

  private resolveConfig = (type: EContractsFetchParamType): any => {
    const { filterParams, currentFilters } = this.state;
    switch (type) {
      default:
        return null;
      case EContractsFetchParamType.PageNumber:
        return {
          page: filterParams.page,
          onPageNumberChange: this.handlePageNumberChange,
        };
      case EContractsFetchParamType.Sort:
        return {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: this.handleSortChange,
        };
      case EContractsFetchParamType.RowsDisplayed:
        return {
          size: filterParams.size,
          onRowsDisplayedChange: this.handleRowsDisplayedChange,
        };
      case EContractsFetchParamType.Filter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleTypeFilterChange,
        };
      case EContractsFetchParamType.MobileFilter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleMobileFilterChange,
        };
    }
  };

  public render() {
    const { dimensionsConfig, headerItems, displayTitleType } = this.props;
    const { errorFetching, isFetching, tableFetch } = this.state;
    const filterConfig = this.resolveConfig(EContractsFetchParamType.Filter);
    return (
      <TableContent
        breadcrumbs={[
          {
            name: 'Contracts',
            value: null,
          },
        ]}
        isFilterSet={filterConfig && filterConfig.filter}
        noElementsMessage="There are no contracts to show."
        type={
          dimensionsConfig.width > DESKTOP_WIDTH ? EPageType.contracts : EPageType.contractsMobile
        }
        displayTitleType={displayTitleType}
        headerItems={headerItems}
        dimensionsConfig={dimensionsConfig}
        fetch={tableFetch}
        tableFetchConfig={{
          errorFetching,
          isFetching,
          pageNumberConfig: this.resolveConfig(EContractsFetchParamType.PageNumber),
          sortRowsConfig: this.resolveConfig(EContractsFetchParamType.Sort),
          filterConfig: this.resolveConfig(EContractsFetchParamType.Filter),
          mobileFilterConfig: this.resolveConfig(EContractsFetchParamType.MobileFilter),
          rowsDisplayedConfig: this.resolveConfig(EContractsFetchParamType.RowsDisplayed),
        }}
      />
    );
  }
}
