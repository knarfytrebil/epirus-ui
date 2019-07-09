import * as React from 'react';
import { fetchData, useAsyncEffect } from '../../utils';
import { ESyncStatus, ISyncStatus } from '../../models';

export interface IStatusConnectRenderedProps {
  status: ESyncStatus;
}

export interface IStatusConnectProps {
  render(props: IStatusConnectRenderedProps): JSX.Element;
}

let isMounted = false;

export function StatusConnect(props: IStatusConnectProps) {
  const [status, setStatus] = React.useState(null);

  useAsyncEffect(async () => {
    isMounted = true;
    const statusInfo: ISyncStatus = await fetchData('/actuator/health');
    if (isMounted) {
      setStatus(statusInfo.status);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{props.render({ status })}</div>;
}
