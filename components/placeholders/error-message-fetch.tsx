import * as React from 'react';
import { FAINT_GREY } from '../../data';
import { defined } from '../../utils';

export interface IErrorMessageFetchProps {
  style?: React.CSSProperties;
  errorMessage?: string;
}

export function ErrorMessageFetch(props: IErrorMessageFetchProps) {
  const { style, errorMessage } = props;
  return (
    <>
      <style jsx>{`
        div.ErrorMessageFetch {
          color: ${FAINT_GREY};
          width: 100%;
          font-size: 22px;
          line-height: 22px;
          padding: 42px 0;
          text-align: center;
        }
      `}</style>

      <div style={defined(style) ? style : null} className="ErrorMessageFetch">
        {errorMessage ? errorMessage : 'Something went wrong'}
      </div>
    </>
  );
}
