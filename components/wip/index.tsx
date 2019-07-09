import * as React from 'react';
import { ErrorMessage } from '../placeholders';

export interface IWipPage {
  name?: string;
}

export function WipPage(props: IWipPage) {
  return (
    <>
      <style jsx>{`
        div.WipPage {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="WipPage">
        {props.name ? (
          <ErrorMessage>{`This section (${
            props.name
          }) is currently under construction`}</ErrorMessage>
        ) : (
          <ErrorMessage>This section is currently under construction</ErrorMessage>
        )}
      </div>
    </>
  );
}
