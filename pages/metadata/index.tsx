import * as React from 'react';
import AppShell, { IAppShellRenderedProps } from '../../components/app-shell';
import { MetadataTable } from '../../components/pages/metadata/metadata-table';
import { defined } from '../../utils';
import { MetadataDetails } from '../../components/pages/metadata/metadata-details';

function MetadataRegistryContent(props: IAppShellRenderedProps) {
  const { dimensionsConfig, router, isRefreshing } = props;
  React.useEffect(() => {
    if (!(process.env.ENABLE_PAID_FEATURES === 'enabled')) {
      router.push('/not-found');
    }
  }, []);
  if (router.query['detailsHash']) {
    return <MetadataDetails router={router} dimensionsConfig={dimensionsConfig} />;
  } else {
    return (
      <MetadataTable
        isRefreshing={isRefreshing}
        fetchConfig={{
          child: {
            pathname: '/metadata',
            params: null,
          },
        }}
        dimensionsConfig={dimensionsConfig}
        router={router}
      />
    );
  }
}

function MetadataRegistryPage() {
  return (
    <AppShell
      render={(props: IAppShellRenderedProps) => {
        if (defined(props.dimensionsConfig)) {
          return <MetadataRegistryContent {...props} />;
        } else {
          return null;
        }
      }}
    />
  );
}

export default MetadataRegistryPage;
