import * as React from 'react';
import AppShell from '../../components/app-shell';
import { defined } from '../../utils';
import { MONITOR_URL } from '../../data';
import Iframe from 'react-iframe';
function Monitor() {
  const renderContent = (
  ) => {
        // return this.transferPropTo(<><iframe src={MONITOR_URL}  width="740"
        //              frameborder="0" scrolling="no" /></>);
    return (<Iframe url={MONITOR_URL}
            width="100%"
            height="100%"
            id="monitor_frame"
            className=""
            display="block"
            position="relative"
            frameBorder={0}
    />);
  };
  return (
    <AppShell
      render={({ dimensionsConfig}) => {
        if (defined(dimensionsConfig)) {
          return renderContent();
        } else {
          return null;
        }
      }}
    />
  );
}

export default Monitor;
