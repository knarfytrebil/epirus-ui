import * as React from 'react';
import { FAINT_GREY } from '../../data';
import { defined } from '../../utils';

export interface IErrorMessageProps {
  style?: React.CSSProperties;
  children: string;
}

export function ErrorMessage(props: IErrorMessageProps) {
  const { style, children } = props;
  return (
    <>
      <style jsx>{`
        div.ErrorMessage {
          color: ${FAINT_GREY};
          width: 100%;
          font-size: 22px;
          line-height: 22px;
          padding: 42px 0;
          text-align: center;
        }
      `}</style>
      <div style={defined(style) ? style : null} className="ErrorMessage">
        {children}
      </div>
    </>
  );
}
