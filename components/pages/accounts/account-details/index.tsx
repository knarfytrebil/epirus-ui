import * as React from 'react';
import { RouterProps } from 'next-server/router';
import {
  fetchData,
  containerHeight,
  defined,
  resolveDetailsState,
  formatHash,
} from '../../../../utils';
import {
  IDimensions,
  IAccountDetailsFetch,
  EDisplayTitleType,
  ITabItem,
  IError,
  IDetailsState,
} from '../../../../models';
import { Loading, ErrorMessageFetch } from '../../../placeholders';
import { accountHighlightConfig, accountOverviewConfig } from './data';
import { TabElements } from '../../../tab-elements';
import { TransactionsTable } from '../../transactions';
import { TRANSACTIONS_ACCOUNT_HEADER_ITEMS } from '../../../../data';
import { IBlockDetailsProps } from '../../blocks/block-details';
import { DetailsContent } from '../../../details-content';

export interface IAccountDetailsProps {
  router: RouterProps;
  dimensionsConfig: IDimensions;
  initAccountDetailsFetch?: IAccountDetailsFetch | IError;
}

export class AccountDetails extends React.Component<
  IAccountDetailsProps,
  IDetailsState<IAccountDetailsFetch>
> {
  isMounted = false;
  constructor(props: IAccountDetailsProps, context?: any) {
    super(props, context);
    this.state = resolveDetailsState(props.initAccountDetailsFetch);
  }

  public componentDidMount() {
    this.isMounted = true;
    if (!this.props.initAccountDetailsFetch) {
      this.fetchData();
    }
  }

  public componentDidUpdate(prevProps: IBlockDetailsProps) {
    if (this.props.router.query.detailsHash !== prevProps.router.query.detailsHash) {
      this.fetchAccountDetails();
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  private fetchData() {
    this.setState({ isFetching: true, detailsFetch: null });
    this.fetchAccountDetails();
  }

  private fetchAccountDetails = async () => {
    this.setState({ isFetching: true, detailsFetch: null });
    const detailsFetch = await fetchData(
      `/accounts/${this.props.router.query.detailsHash as string}`,
    );
    const nextState = resolveDetailsState(detailsFetch);
    if (this.isMounted) {
      this.setState(nextState);
    }
  };

  private tabItems = (): ITabItem[] => {
    const { detailsHash } = this.props.router.query;
    return [
      {
        name: 'Transactions',
        element: (
          <TransactionsTable
            fetchConfig={{
              parent: {
                pathname: '/accounts',
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
            router={this.props.router}
            headerItems={TRANSACTIONS_ACCOUNT_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this account."
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
    const { dimensionsConfig } = this.props;
    const { detailsFetch, errorFetching } = this.state;

    if (defined(errorFetching)) {
      return <ErrorMessageFetch errorMessage={errorFetching.message} />;
    } else if (!defined(detailsFetch)) {
      return <Loading isThrottled style={{ height: containerHeight(dimensionsConfig) }} />;
    } else {
      return (
        <DetailsContent
          width={dimensionsConfig.width}
          breadcrumbs={[
            {
              name: 'Accounts',
              value: null,
            },
            {
              name: formatHash(detailsFetch.result.address),
              value: null,
            },
          ]}
          overviewConfig={accountOverviewConfig(detailsFetch.result, dimensionsConfig.width)}
          highlightConfig={accountHighlightConfig(detailsFetch.result)}
          table={this.renderTabElements()}
        />
      );
    }
  }
}
