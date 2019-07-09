import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { defined } from '../../utils';
import AppShell from '../../components/app-shell';
import { BlockDetails, BlocksTable } from '../../components';
import { IDimensions } from '../../models';

function Blocks() {
  const renderContent = (
    dimensionsConfig: IDimensions,
    router: RouterProps,
    isRefreshing: boolean,
  ) => {
    if (router.query['detailsHash']) {
      return <BlockDetails router={router} dimensionsConfig={dimensionsConfig} />;
    } else {
      return (
        <BlocksTable
          fetchConfig={{
            child: {
              pathname: '/blocks',
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

export default Blocks;
