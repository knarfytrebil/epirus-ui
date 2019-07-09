import * as React from 'react';
import AppShell from '../../components/app-shell';
import { defined } from '../../utils';
import { TransactionsTable, TransactionDetails } from '../../components';
import { IDimensions } from '../../models';
import { TRANSACTIONS_HEADER_ITEMS } from '../../data';
import { RouterProps } from 'next-server/router';

function Transactions() {
  const renderContent = (
    dimensionsConfig: IDimensions,
    router: RouterProps,
    isRefreshing: boolean,
  ) => {
    if (router.query['detailsHash']) {
      return <TransactionDetails router={router} dimensionsConfig={dimensionsConfig} />;
    } else {
      return (
        <TransactionsTable
          router={router}
          fetchConfig={{
            child: {
              pathname: '/transactions',
              params: null,
            },
          }}
          headerItems={TRANSACTIONS_HEADER_ITEMS}
          dimensionsConfig={dimensionsConfig}
          isRefreshing={isRefreshing}
        />
      );
    }
  };
  return (
    <AppShell
      render={({ dimensionsConfig, router, isRefreshing }) => {
        if (defined(dimensionsConfig)) {
          return renderContent(dimensionsConfig, router, isRefreshing);
        } else {
          return null;
        }
      }}
    />
  );
}

export default Transactions;
