import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { withRouter } from 'next/router';
import AppShell from '../components/app-shell';
import { Loading } from '../components';
const initPath = '/monitor';

export interface IIndexProps {
  router: RouterProps;
}

function Index(props: IIndexProps) {
  const { asPath } = props.router;
  React.useEffect(() => {
    props.router.replace(initPath);
  }, [asPath]);
  return <AppShell render={() => <Loading />} />;
}

export default withRouter(Index);
