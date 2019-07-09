import * as React from 'react';
import { CardView } from '../../../card-view';
import { CARD_GAP } from '../index';

export interface IDesktopDetailsTableProps {
  children: JSX.Element;
}

export function DesktopDetailsTable(props: IDesktopDetailsTableProps) {
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsTable {
          margin-top: ${CARD_GAP}px;
          padding-bottom: 60px;
        }
      `}</style>
      <div className="DesktopDetailsTable">
        <CardView>{props.children}</CardView>
      </div>
    </>
  );
}
