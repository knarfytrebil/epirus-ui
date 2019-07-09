import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { defined, resolveTableFetch, resolveTableState } from '../../../../utils';
import { TableContent } from '../../../table-content';
import { BLOCKS_HEADER_ITEMS } from '../../../../data';
import {
  EBlocksFetchParamType,
  EBlocksSortAndFilterType,
  IBlocksTableFetch,
  EPageType,
  IDimensions,
  EDirectionType,
  IFetchParamsValues,
  ISortValues,
  IFetchConfig,
  ITableState,
  IError,
  IDropdownOption,
} from '../../../../models';
import { DESKTOP_WIDTH } from '../../../../style-config';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: EBlocksSortAndFilterType.number,
};

export interface IBlocksTableProps {
  isRefreshing: boolean;
  fetchConfig: IFetchConfig;
  initBlocksTableFetch?: Partial<IBlocksTableFetch & IError>;
  dimensionsConfig: IDimensions;
  router: RouterProps;
}

export class BlocksTable extends React.Component<
  IBlocksTableProps,
  ITableState<IBlocksTableFetch>
> {
  isMounted = false;
  constructor(props: IBlocksTableProps, context?: any) {
    super(props, context);
    const { initBlocksTableFetch, router } = props;
    this.state = resolveTableState(initBlocksTableFetch, router.query);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initBlocksTableFetch) {
      this.fetchData(this.props.fetchConfig.child.params);
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  public componentDidUpdate(prevProps: IBlocksTableProps) {
    if (prevProps.isRefreshing !== this.props.isRefreshing) {
      if (this.props.isRefreshing) {
        this.fetchData({});
      }
    }
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
    const nextState: ITableState<IBlocksTableFetch> = await resolveTableFetch(
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

  private resolvePagingConfig = (type: EBlocksFetchParamType): any => {
    const { filterParams } = this.state;
    switch (type) {
      default:
        return null;
      case EBlocksFetchParamType.PageNumber:
        return {
          page: filterParams.page,
          onPageNumberChange: this.handlePageNumberChange,
        };
      case EBlocksFetchParamType.Sort:
        return {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: this.handleSortChange,
        };
      case EBlocksFetchParamType.RowsDisplayed:
        return {
          size: filterParams.size,
          onRowsDisplayedChange: this.handleRowsDisplayedChange,
        };
    }
  };

  public render() {
    const { dimensionsConfig } = this.props;
    const { errorFetching, isFetching, tableFetch } = this.state;
    const filterConfig = this.resolvePagingConfig(EBlocksFetchParamType.Filter);
    return (
      <TableContent
        breadcrumbs={[
          {
            name: 'Blocks',
            value: null,
          },
        ]}
        isFilterSet={filterConfig && filterConfig.filter}
        noElementsMessage="There are no blocks to show."
        type={dimensionsConfig.width > DESKTOP_WIDTH ? EPageType.blocks : EPageType.blocksMobile}
        headerItems={BLOCKS_HEADER_ITEMS}
        dimensionsConfig={dimensionsConfig}
        fetch={tableFetch}
        tableFetchConfig={{
          errorFetching,
          isFetching,
          pageNumberConfig: this.resolvePagingConfig(EBlocksFetchParamType.PageNumber),
          sortRowsConfig: this.resolvePagingConfig(EBlocksFetchParamType.Sort),
          rowsDisplayedConfig: this.resolvePagingConfig(EBlocksFetchParamType.RowsDisplayed),
        }}
      />
    );
  }
}
