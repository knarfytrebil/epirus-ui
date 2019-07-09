import * as React from 'react';

export interface ITableMobileModalMaskProps {
  style: React.CSSProperties;
}

export function TableMobileModalMask(props: ITableMobileModalMaskProps) {
  return (
    <>
      <style jsx>{`
        div.mask {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
      `}</style>
      <div style={props.style} className="mask" />
    </>
  );
}
