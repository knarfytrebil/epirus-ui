import * as React from 'react';
import { RouterProps } from 'next-server/router';
import AppShell from '../../components/app-shell';
import { IDimensions } from '../../models';
import { defined } from '../../utils';
import { ContractsTable, ContractDetails } from '../../components';
import { CONTRACTS_HEADER_ITEMS } from '../../data';

function Contracts() {
  const renderContent = (
    dimensionsConfig: IDimensions,
    router: RouterProps,
    isRefreshing: boolean,
  ) => {
    if (router.query['detailsHash']) {
      return <ContractDetails router={router} dimensionsConfig={dimensionsConfig} />;
    } else {
      return (
        <ContractsTable
          isRefreshing={isRefreshing}
          fetchConfig={{
            child: {
              pathname: '/contracts',
              params: null,
            },
          }}
          headerItems={CONTRACTS_HEADER_ITEMS}
          dimensionsConfig={dimensionsConfig}
          router={router}
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

export default Contracts;
