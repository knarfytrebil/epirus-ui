import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { defined, fetchData, formatHash, resolveDetailsState } from '../../../../utils';
import {
  EDisplayTitleType,
  IDimensions,
  ITransactionDetailsFetch,
  ITabItem,
  EPageType,
  IDetailsState,
} from '../../../../models';
import { Loading, ErrorMessageFetch } from '../../../placeholders';
import { EventsTable } from '../../events';
import { TabElements } from '../../../tab-elements';
import { transactionOverviewConfig, transactionsHighlightConfig } from './data';
import { DETAILS_HEIGHT, EVENTS_TRANSACTIONS_HEADER_ITEMS } from '../../../../data';
import { DetailsContent } from '../../../details-content';
import { DESKTOP_WIDTH } from '../../../../style-config';

export interface ITransactionDetailsProps {
  initTransactionsDetailsFetch?: ITransactionDetailsFetch;
  dimensionsConfig: IDimensions;
  router: RouterProps;
}

export class TransactionDetails extends React.Component<
  ITransactionDetailsProps,
  IDetailsState<ITransactionDetailsFetch>
> {
  isMounted = false;
  constructor(props: ITransactionDetailsProps, context?: any) {
    super(props, context);
    this.state = resolveDetailsState(props.initTransactionsDetailsFetch);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initTransactionsDetailsFetch) {
      this.fetchTransactionDetails();
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchTransactionDetails = async () => {
    this.setState({ isFetching: true, detailsFetch: null });
    const detailsFetch = await fetchData(`/transactions/${this.props.router.query.detailsHash}`);
    const nextState = resolveDetailsState(detailsFetch);
    if (this.isMounted) {
      this.setState(nextState);
    }
  };

  private tabItems = (): ITabItem[] => {
    const { dimensionsConfig, router } = this.props;
    const { from, to } = this.state.detailsFetch.result;
    const { detailsHash, ...remainingParams } = this.props.router.query;
    return [
      {
        name: 'Events',
        element: (
          <EventsTable
            tablePageType={
              dimensionsConfig.width > DESKTOP_WIDTH
                ? EPageType.eventsTransactions
                : EPageType.eventsTransactionsMobile
            }
            fetchConfig={{
              parent: {
                pathname: '/transactions',
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
            headerItems={EVENTS_TRANSACTIONS_HEADER_ITEMS}
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
    if (defined(errorFetching)) {
      return <ErrorMessageFetch errorMessage={errorFetching.message} />;
    } else if (!defined(detailsFetch)) {
      return <Loading isThrottled style={{ height: DETAILS_HEIGHT }} />;
    } else {
      const { result } = detailsFetch;
      return (
        <DetailsContent
          width={this.props.dimensionsConfig.width}
          breadcrumbs={[
            {
              name: 'Transactions',
              value: '/transactions',
            },
            {
              name: formatHash(result.hash),
              value: null,
            },
          ]}
          overviewConfig={transactionOverviewConfig(result, this.props.dimensionsConfig.width)}
          highlightConfig={transactionsHighlightConfig(result)}
          table={this.renderTabElements()}
        />
      );
    }
  }
}
