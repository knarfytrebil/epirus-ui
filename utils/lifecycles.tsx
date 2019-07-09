import * as React from 'react';

export function useAsyncEffect(effect: () => Promise<void | (() => void)>, dependencies?: any[]) {
  return React.useEffect(() => {
    const cleanupPromise = effect();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
}
