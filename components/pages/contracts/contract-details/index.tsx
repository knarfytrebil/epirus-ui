import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { fetchData, defined, resolveDetailsState, formatHash } from '../../../../utils';
import {
  IDimensions,
  IContractDetailsFetch,
  EDisplayTitleType,
  ITabItem,
  IError,
  EPageType,
  IDetailsState,
} from '../../../../models';
import { Loading, ErrorMessageFetch } from '../../../placeholders';
import {
  TRANSACTIONS_CONTRACT_HEADER_ITEMS,
  DETAILS_HEIGHT,
  EVENTS_CONTRACTS_HEADER_ITEMS,
} from '../../../../data';
import { TransactionsTable } from '../../transactions';
import { EventsTable } from '../../events';
import { TabElements } from '../../../tab-elements';
import { contractHighlightConfig, contractOverviewConfig } from './data';
import { IBlockDetailsProps } from '../../blocks/block-details';
import { DetailsContent } from '../../../details-content';
import { DESKTOP_WIDTH } from '../../../../style-config';

export interface IContractDetailsProps {
  initContractsDetailsFetch?: IContractDetailsFetch | IError;
  router: RouterProps;
  dimensionsConfig: IDimensions;
}

export class ContractDetails extends React.Component<
  IContractDetailsProps,
  IDetailsState<IContractDetailsFetch>
> {
  isMounted = false;
  constructor(props: IContractDetailsProps, context?: any) {
    super(props, context);
    this.state = resolveDetailsState(props.initContractsDetailsFetch);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initContractsDetailsFetch) {
      this.fetchContractDetails();
    }
  }

  public componentDidUpdate(prevProps: IBlockDetailsProps) {
    if (this.props.router.query.detailsHash !== prevProps.router.query.detailsHash) {
      this.fetchContractDetails();
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchContractDetails = async () => {
    this.setState({ isFetching: true, detailsFetch: null });
    const detailsFetch = await fetchData(`/contracts/${this.props.router.query.detailsHash}`);
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
        name: 'Transactions',
        element: (
          <TransactionsTable
            fetchConfig={{
              parent: {
                pathname: '/contracts',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'transactions',
                },
              },
              child: {
                pathname: '/transactions',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'transactions',
                },
              },
              fetchUrlIsAsPath: true,
            }}
            router={router}
            headerItems={TRANSACTIONS_CONTRACT_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this contract."
            displayTitleType={EDisplayTitleType.Tab}
            dimensionsConfig={dimensionsConfig}
            isRefreshing={false}
          />
        ),
      },
      {
        name: 'Events',
        element: (
          <EventsTable
            tablePageType={
              dimensionsConfig.width > DESKTOP_WIDTH
                ? EPageType.eventsContracts
                : EPageType.eventsContractsMobile
            }
            fetchConfig={{
              parent: {
                pathname: '/contracts',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'events',
                },
              },
              child: {
                pathname: '/transactions',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'events',
                },
              },
              fetchUrlIsAsPath: true,
            }}
            router={router}
            headerItems={EVENTS_CONTRACTS_HEADER_ITEMS}
            noElementsMessage="There are no events for this transaction."
            displayTitleType={EDisplayTitleType.Tab}
            dimensionsConfig={dimensionsConfig}
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
      const { result } = detailsFetch;
      return (
        <DetailsContent
          width={width}
          breadcrumbs={[
            {
              name: 'Contracts',
              value: '/contracts',
            },
            {
              name: formatHash(result.contractAddress),
              value: null,
            },
          ]}
          overviewConfig={contractOverviewConfig(result, width)}
          highlightConfig={contractHighlightConfig(result)}
          table={this.renderTabElements()}
        />
      );
    }
  }
}
