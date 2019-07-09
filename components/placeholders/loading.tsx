import * as React from 'react';
import { defined } from '../../utils';
import { LoadingSpinner } from './loading-spinner';

export interface ILoadingProps {
  isThrottled?: boolean;
  style?: React.CSSProperties;
}

export function Loading(props: ILoadingProps) {
  const { isThrottled, style } = props;
  return (
    <>
      <style jsx>{`
        div.Loading {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: black;
        }
      `}</style>
      <div style={defined(style) ? style : null} className="Loading">
        {isThrottled ? <ThrottledLoadingSpinner /> : <LoadingSpinner />}
      </div>
    </>
  );
}

let timeout;

export function ThrottledLoadingSpinner() {
  const [isShown, setShown] = React.useState(false);
  React.useEffect(() => {
    timeout = setTimeout(() => setShown(true), 200);
    return () => clearTimeout(timeout);
  });
  if (isShown) {
    return <LoadingSpinner />;
  } else {
    return null;
  }
}
