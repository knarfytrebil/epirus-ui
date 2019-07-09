import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { fetchData, defined, resolveDetailsState, formatHash } from '../../../../utils';
import {
  IDimensions,
  IBlockDetailsFetch,
  EDisplayTitleType,
  ITabItem,
  IError,
  IDetailsState,
} from '../../../../models';
import { Loading, ErrorMessageFetch } from '../../../placeholders';
import { TransactionsTable } from '../../transactions';
import { TabElements } from '../../../tab-elements';
import { blockHighlightConfig, blockOverviewConfig } from './data';
import { TRANSACTIONS_BLOCK_HEADER_ITEMS } from '../../../../data';
import { DetailsContent } from '../../../details-content';

export interface IBlockDetailsProps {
  router: RouterProps;
  dimensionsConfig: IDimensions;
  initBlockDetailsFetch?: IBlockDetailsFetch | IError;
}

export class BlockDetails extends React.Component<
  IBlockDetailsProps,
  IDetailsState<IBlockDetailsFetch>
> {
  isMounted = false;
  constructor(props: IBlockDetailsProps, context?: any) {
    super(props, context);
    this.state = resolveDetailsState(props.initBlockDetailsFetch);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initBlockDetailsFetch) {
      this.fetchBlockDetails();
    }
  }

  public componentDidUpdate(prevProps: IBlockDetailsProps) {
    if (this.props.router.query.detailsHash !== prevProps.router.query.detailsHash) {
      this.fetchBlockDetails();
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchBlockDetails = async () => {
    this.setState({ isFetching: true, detailsFetch: null });
    const detailsFetch = await fetchData(
      `/blocks/${this.props.router.query.detailsHash as string}`,
    );
    const nextState = resolveDetailsState(detailsFetch);
    if (this.isMounted) {
      this.setState(nextState);
    }
  };

  private tabItems = (): ITabItem[] => {
    const { detailsHash, ...remainingParams } = this.props.router.query;

    return [
      {
        name: 'Transactions',
        element: (
          <TransactionsTable
            fetchConfig={{
              parent: {
                pathname: '/blocks',
                params: {
                  detailsHash: detailsHash as string,
                },
              },
              child: {
                pathname: '/transactions',
                params: {
                  ...remainingParams,
                  blockHash: detailsHash as string,
                },
              },
              excluded: ['blockHash'],
            }}
            router={this.props.router}
            headerItems={TRANSACTIONS_BLOCK_HEADER_ITEMS}
            noElementsMessage="There are no transactions in this block."
            displayTitleType={EDisplayTitleType.Tab}
            dimensionsConfig={this.props.dimensionsConfig}
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

    if (defined(errorFetching)) {
      return <ErrorMessageFetch errorMessage={errorFetching.message} />;
    } else if (!defined(detailsFetch)) {
      return <Loading isThrottled style={{ height: 298 }} />;
    } else {
      const width = this.props.dimensionsConfig.width;
      const result = detailsFetch.result;
      return (
        <DetailsContent
          width={width}
          breadcrumbs={[
            {
              name: 'Blocks',
              value: '/blocks',
            },
            {
              name: formatHash(result.hash),
              value: null,
            },
          ]}
          overviewConfig={blockOverviewConfig(result, width)}
          highlightConfig={blockHighlightConfig(result.transactionCount)}
          table={this.renderTabElements()}
        />
      );
    }
  }
}
