import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { defined } from '../../utils';
import AppShell from '../../components/app-shell';
import { TokensTable, TokenDetails } from '../../components';
import { IDimensions } from '../../models';

function Tokens() {
  const renderContent = (
    dimensionsConfig: IDimensions,
    router: RouterProps,
    isRefreshing: boolean,
  ) => {
    if (router.query['detailsHash']) {
      return <TokenDetails router={router} dimensionsConfig={dimensionsConfig} />;
    } else {
      return (
        <TokensTable
          fetchConfig={{
            child: {
              pathname: '/tokens',
              params: null,
            },
          }}
          router={router}
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

export default Tokens;
