import * as React from 'react';
import { IDimensions } from '../../../../../../models';
import { defined } from '../../../../../../utils';
let ref;
const PADDING_X = 32;
const PADDING_Y = 24;

export interface ITableMobileModalWrapperProps {
  dimensionsConfig: IDimensions;
  children: JSX.Element[];
}

export function TableMobileModalWrapper(props: ITableMobileModalWrapperProps) {
  const { dimensionsConfig, children } = props;
  const [contentHeight, setContentHeight] = React.useState('auto');

  const handleContentRef = (el) => {
    if (defined(el)) {
      ref = el;
    }
  };

  React.useEffect(() => {
    if (ref.clientHeight < dimensionsConfig.height) {
      setContentHeight(`${dimensionsConfig.height - PADDING_Y * 2}`);
    }
  }, [dimensionsConfig.height]);

  return (
    <>
      <style jsx>{`
        div.modal {
          position: relative;
          width: calc(100% - ${PADDING_X * 2}px);
          height: ${contentHeight}px;
          padding: ${PADDING_Y}px ${PADDING_X}px;
          z-index: 3;
        }
        div.text {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          z-index: 1;
        }
      `}</style>
      <div className="modal" ref={handleContentRef} onClick={(e) => e.stopPropagation()}>
        <div className="text">{children}</div>
      </div>
    </>
  );
}
