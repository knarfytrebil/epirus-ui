import * as React from 'react';
import { RouterProps } from 'next-server/router';
import {
  fetchData,
  defined,
  resolveDetailsState,
  formatHash,
  resolveTokenName,
} from '../../../../utils';
import {
  IDimensions,
  EDisplayTitleType,
  ITabItem,
  IError,
  IDetailsState,
  ITokenDetailsFetch,
  EPageType,
} from '../../../../models';
import { Loading, ErrorMessageFetch } from '../../../placeholders';
import { TransactionsTable } from '../../transactions';
import { TabElements } from '../../../tab-elements';
import { tokenHighlightConfig, tokenOverviewConfig } from './data';
import { EVENTS_TOKENS_HEADER_ITEMS, TRANSACTIONS_TOKENS_HEADER_ITEMS } from '../../../../data';
import { EventsTable } from '../../events';
import { DetailsContent } from '../../../details-content';
import { DESKTOP_WIDTH } from '../../../../style-config';

export interface ITokenDetailsProps {
  router: RouterProps;
  dimensionsConfig: IDimensions;
  initTokenDetailsFetch?: ITokenDetailsFetch | IError;
}

export class TokenDetails extends React.Component<
  ITokenDetailsProps,
  IDetailsState<ITokenDetailsFetch>
> {
  isMounted = false;
  constructor(props: ITokenDetailsProps, context?: any) {
    super(props, context);
    this.state = resolveDetailsState(props.initTokenDetailsFetch);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initTokenDetailsFetch) {
      this.fetchTokenDetails();
    }
  }

  public componentDidUpdate(prevProps: ITokenDetailsProps) {
    if (this.props.router.query.detailsHash !== prevProps.router.query.detailsHash) {
      this.fetchTokenDetails();
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchTokenDetails = async () => {
    this.setState({ isFetching: true, detailsFetch: null });
    const detailsFetch = await fetchData(
      `/tokens/${this.props.router.query.detailsHash as string}`,
    );
    const nextState = resolveDetailsState(detailsFetch);
    if (this.isMounted) {
      this.setState(nextState);
    }
  };

  private tabItems = (): ITabItem[] => {
    const { router, dimensionsConfig } = this.props;
    const { detailsHash } = router.query;

    return [
      {
        name: 'Transactions',
        element: (
          <TransactionsTable
            fetchConfig={{
              parent: {
                pathname: '/tokens',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'transactions',
                },
              },
              child: {
                pathname: `/tokens/${detailsHash}/transactions`,
                params: {
                  tab: 'transactions',
                },
              },
            }}
            router={router}
            headerItems={TRANSACTIONS_TOKENS_HEADER_ITEMS}
            noElementsMessage="There are no tokens to show."
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
                pathname: '/tokens',
                params: {
                  detailsHash: detailsHash as string,
                  tab: 'events',
                },
              },
              child: {
                pathname: `/tokens/${detailsHash}/events`,
                params: {
                  tab: 'events',
                },
              },
            }}
            router={router}
            headerItems={EVENTS_TOKENS_HEADER_ITEMS}
            noElementsMessage="There are no events for this token."
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
    const width = this.props.dimensionsConfig.width;

    if (defined(errorFetching)) {
      return <ErrorMessageFetch errorMessage={errorFetching.message} />;
    } else if (!defined(detailsFetch)) {
      return <Loading isThrottled style={{ height: 298 }} />;
    } else {
      const { result } = detailsFetch;
      return (
        <DetailsContent
          width={width}
          breadcrumbs={[
            {
              name: 'Tokens',
              value: '/tokens',
            },
            {
              name: resolveTokenName({ ...result, address: formatHash(result.address) }),
              value: null,
            },
          ]}
          overviewConfig={tokenOverviewConfig(result)}
          highlightConfig={tokenHighlightConfig(result.totalSupply)}
          table={this.renderTabElements()}
        />
      );
    }
  }
}
