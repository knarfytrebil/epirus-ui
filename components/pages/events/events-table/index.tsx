import * as React from 'react';
import { RouterProps } from 'next-server/router';
import {
  IDimensions,
  EDisplayTitleType,
  IFetchConfig,
  IHeaderItem,
  EPageType,
  ITableState,
  IEventsTableFetch,
  ISortValues,
  ETransactionsSortAndFilterType,
  EEventsFetchParamType,
  IFetchParamsValues,
  EDirectionType,
  IDropdownOption,
} from '../../../../models';
import {
  defined,
  resolveTableState,
  resolveTableFetch,
  transformFilterArrayToString,
} from '../../../../utils';
import { TableContent } from '../../../table-content';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETransactionsSortAndFilterType.timestampISO,
};

export interface IEventsTableProps {
  tablePageType: EPageType;
  headerItems: IHeaderItem[];
  fetchConfig: IFetchConfig;
  dimensionsConfig: IDimensions;
  displayTitleType?: EDisplayTitleType;
  noElementsMessage?: string;
  initEventsTableFetch?: IEventsTableFetch;
  router: RouterProps;
}

export class EventsTable extends React.Component<
  IEventsTableProps,
  ITableState<IEventsTableFetch>
> {
  isMounted = false;

  constructor(props: IEventsTableProps, context?: any) {
    super(props, context);
    const { initEventsTableFetch, router } = props;
    this.state = resolveTableState(initEventsTableFetch, router.query);
  }

  private handleChangeFilterParams = (nextFilterParams: Partial<IFetchParamsValues>) => {
    this.fetchData(nextFilterParams);
  };

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initEventsTableFetch) {
      this.fetchData(this.props.fetchConfig.child.params);
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchData = async (nextFilterParams: Partial<IFetchParamsValues>) => {
    this.setState({
      isFetching: true,
    });
    const nextState: ITableState<IEventsTableFetch> = await resolveTableFetch(
      nextFilterParams,
      this.state.filterParams,
      this.props.router,
      this.props.fetchConfig,
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

  private handleTypeFilterChange = (type: ETransactionsSortAndFilterType, filter: string[]) => {
    this.setState(
      {
        currentFilters: { ...this.state.currentFilters, [type]: filter },
      },
      () => {
        const filterString = transformFilterArrayToString(this.state.currentFilters);
        this.handleChangeFilterParams({ filter: filterString, page: 0 });
      },
    );
  };

  private handleMobileFilterChange = (filter: string, sortValues?: ISortValues) => {
    this.handleChangeFilterParams({ filter, page: 0, ...(sortValues || {}) });
  };

  private resolveConfig = (type: EEventsFetchParamType): any => {
    const { filterParams, currentFilters } = this.state;
    switch (type) {
      default:
        return null;
      case EEventsFetchParamType.PageNumber:
        return {
          page: filterParams.page,
          onPageNumberChange: this.handlePageNumberChange,
        };
      case EEventsFetchParamType.RowsDisplayed:
        return {
          size: filterParams.size,
          onRowsDisplayedChange: this.handleRowsDisplayedChange,
        };
      case EEventsFetchParamType.Sort:
        return {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: this.handleSortChange,
        };
      case EEventsFetchParamType.Filter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleTypeFilterChange,
        };
      case EEventsFetchParamType.MobileFilter:
        return {
          filter: filterParams.filter,
          currentFilters,
          onFilterChange: this.handleMobileFilterChange,
        };
    }
  };

  public render() {
    const { dimensionsConfig, displayTitleType, tablePageType, headerItems } = this.props;
    const { errorFetching, isFetching, tableFetch } = this.state;
    const filterConfig = this.resolveConfig(EEventsFetchParamType.Filter);

    return (
      <TableContent
        isFilterSet={false}
        noElementsMessage="There are no events to show."
        displayTitleType={displayTitleType}
        type={tablePageType}
        headerItems={headerItems}
        dimensionsConfig={dimensionsConfig}
        fetch={tableFetch}
        tableFetchConfig={{
          errorFetching,
          isFetching,
          pageNumberConfig: this.resolveConfig(EEventsFetchParamType.PageNumber),
          sortRowsConfig: this.resolveConfig(EEventsFetchParamType.Sort),
          filterConfig,
          mobileFilterConfig: this.resolveConfig(EEventsFetchParamType.MobileFilter),
          rowsDisplayedConfig: this.resolveConfig(EEventsFetchParamType.RowsDisplayed),
        }}
      />
    );
  }
}
