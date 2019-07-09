import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { defined } from '../../utils';
import AppShell from '../../components/app-shell';
import { WipPage, AccountDetails } from '../../components';
import { IDimensions } from '../../models';

function Accounts() {
  const renderContent = (dimensionsConfig: IDimensions, router: RouterProps) => {
    if (router.query['detailsHash']) {
      return <AccountDetails router={router} dimensionsConfig={dimensionsConfig} />;
    } else {
      return <WipPage />;
    }
  };

  return (
    <AppShell
      render={({ dimensionsConfig, router }) => {
        if (defined(dimensionsConfig)) {
          return renderContent(dimensionsConfig, router);
        } else {
          return null;
        }
      }}
    />
  );
}

export default Accounts;
