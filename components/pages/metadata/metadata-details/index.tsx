import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { fetchData, defined, resolveDetailsState } from '../../../../utils';
import {
  IDimensions,
  IMetadataDetailsFetch,
  EDisplayTitleType,
  ITabItem,
  IError,
  IDetailsState,
} from '../../../../models';
import { Loading, ErrorMessageFetch } from '../../../placeholders';
import { DETAILS_HEIGHT, CONTRACTS_HEADER_ITEMS } from '../../../../data';
import { TabElements } from '../../../tab-elements';
import { IBlockDetailsProps } from '../../blocks/block-details';
import { DetailsContent } from '../../../details-content';
import { metadataOverviewConfig } from './data';
import { ContractsTable } from '../../contracts/contracts-table';

export interface IMetadataDetailsProps {
  initContractsDetailsFetch?: IMetadataDetailsFetch | IError;
  router: RouterProps;
  dimensionsConfig: IDimensions;
}

export class MetadataDetails extends React.Component<
  IMetadataDetailsProps,
  IDetailsState<IMetadataDetailsFetch>
> {
  isMounted = false;
  constructor(props: IMetadataDetailsProps, context?: any) {
    super(props, context);
    this.state = resolveDetailsState(props.initContractsDetailsFetch);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initContractsDetailsFetch) {
      this.fetchMetadataDetails();
    }
  }

  public componentDidUpdate(prevProps: IBlockDetailsProps) {
    if (this.props.router.query.detailsHash !== prevProps.router.query.detailsHash) {
      this.fetchMetadataDetails();
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchMetadataDetails = async () => {
    this.setState({ isFetching: true, detailsFetch: null });
    const detailsFetch = await fetchData(`/metadata/${this.props.router.query.detailsHash}`);
    const nextState = resolveDetailsState(detailsFetch);
    if (this.isMounted) {
      this.setState(nextState);
    }
  };

  private tabItems = (): ITabItem[] => {
    const { router, dimensionsConfig } = this.props;
    const { detailsHash, tab } = router.query;
    return [
      {
        name: 'Contracts',
        element: (
          <ContractsTable
            fetchConfig={{
              parent: {
                pathname: '/metadata',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'contracts',
                },
              },
              child: {
                pathname: '/metadata',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'contracts',
                },
              },
              fetchUrlIsAsPath: true,
            }}
            router={router}
            headerItems={CONTRACTS_HEADER_ITEMS}
            noElementsMessage="There are no contracts for this metadata entry."
            displayTitleType={EDisplayTitleType.Tab}
            dimensionsConfig={dimensionsConfig}
            isRefreshing={false}
          />
        ),
      },
    ];
  };

  private renderTabElements() {
    return <TabElements tabItems={this.tabItems()} router={this.props.router} />;
  }

  public render() {
    const { detailsFetch, errorFetching } = this.state;
    const { width } = this.props.dimensionsConfig;

    if (defined(errorFetching)) {
      return <ErrorMessageFetch errorMessage={errorFetching.message} />;
    } else if (!defined(detailsFetch)) {
      return <Loading isThrottled style={{ height: DETAILS_HEIGHT }} />;
    } else {
      return (
        <DetailsContent
          width={width}
          breadcrumbs={[
            {
              name: 'Metadata',
              value: '/metadata',
            },
            {
              name: detailsFetch.name,
              value: null,
            },
          ]}
          overviewConfig={metadataOverviewConfig(detailsFetch as any)}
          highlightConfig={null}
          table={this.renderTabElements()}
        />
      );
    }
  }
}
