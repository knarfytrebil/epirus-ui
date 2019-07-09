import * as React from 'react';
import { resolveTableState, resolveTableFetch } from '../../../../utils';
import {
  EContractsFetchParamType,
  IMetadataTableFetch,
  EPageType,
  IDimensions,
  IFetchParamsValues,
  IFetchConfig,
  ITableState,
  IError,
  IDropdownOption,
} from '../../../../models';
import { TableContent } from '../../../table-content';
import { RouterProps } from 'next-server/router';
import { METADATA_HEADER_ITEMS } from '../../../../data/data-metadata';
import { ITransactionsTableProps } from '../../transactions';
import { DESKTOP_WIDTH } from '../../../../style-config';

export interface IMetadataTableProps {
  isRefreshing: boolean;
  fetchConfig: IFetchConfig;
  initMetadataTableFetch?: Partial<IMetadataTableFetch & IError>;
  dimensionsConfig: IDimensions;
  router: RouterProps;
}

export class MetadataTable extends React.Component<
  IMetadataTableProps,
  ITableState<IMetadataTableFetch>
> {
  isMounted = false;
  constructor(props: IMetadataTableProps, context?: any) {
    super(props, context);
    const { initMetadataTableFetch, router } = props;
    this.state = resolveTableState(initMetadataTableFetch, router.query);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initMetadataTableFetch) {
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
    const nextState: ITableState<IMetadataTableFetch> = await resolveTableFetch(
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

  private handleRowsDisplayedChange = (selectedOption: IDropdownOption) => {
    const size = parseFloat(selectedOption.value);
    const page = Math.floor((this.state.filterParams.size / size) * this.state.filterParams.page);
    this.handleChangeFilterParams({ size, page });
  };

  private resolveConfig = (type: EContractsFetchParamType): any => {
    const { filterParams } = this.state;
    switch (type) {
      default:
        return null;
      case EContractsFetchParamType.PageNumber:
        return {
          page: filterParams.page,
          onPageNumberChange: this.handlePageNumberChange,
        };
      case EContractsFetchParamType.RowsDisplayed:
        return {
          size: filterParams.size,
          onRowsDisplayedChange: this.handleRowsDisplayedChange,
        };
    }
  };

  public render() {
    const { dimensionsConfig } = this.props;
    const { errorFetching, isFetching, tableFetch } = this.state;
    const filterConfig = this.resolveConfig(EContractsFetchParamType.Filter);
    return (
      <TableContent
        breadcrumbs={[
          {
            name: 'Metadata',
            value: null,
          },
        ]}
        type={
          dimensionsConfig.width > DESKTOP_WIDTH ? EPageType.metadata : EPageType.metadataMobile
        }
        isFilterSet={filterConfig && filterConfig.filter}
        noElementsMessage="There are no entries to show."
        headerItems={METADATA_HEADER_ITEMS}
        dimensionsConfig={dimensionsConfig}
        fetch={tableFetch as any}
        tableFetchConfig={{
          errorFetching,
          isFetching,
          pageNumberConfig: this.resolveConfig(EContractsFetchParamType.PageNumber),
          mobileFilterConfig: this.resolveConfig(EContractsFetchParamType.MobileFilter),
          rowsDisplayedConfig: this.resolveConfig(EContractsFetchParamType.RowsDisplayed),
        }}
      />
    );
  }
}
