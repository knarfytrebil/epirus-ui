import * as React from 'react';

export interface IMobileDetailsTableProps {
  children: JSX.Element;
}

export function MobileDetailsTable(props: IMobileDetailsTableProps) {
  return (
    <>
      <style jsx>{`
        div.MobileDetailsTable {
          position: relative;
          margin-top: 40px;
        }
      `}</style>
      <div className="MobileDetailsTable">{props.children}</div>
    </>
  );
}
