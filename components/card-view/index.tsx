import * as React from 'react';
import { defined } from '../../utils';
import { WHITE } from '../../data';
import { MAIN_TABLE_PADDING } from '../../style-config';

export interface ICardViewProps {
  style?: React.CSSProperties;
  children: JSX.Element | JSX.Element[];
}

export function CardView(props: ICardViewProps) {
  const { style, children } = props;
  return (
    <>
      <style jsx>{`
        div.CardView {
          position: relative;
          padding: ${MAIN_TABLE_PADDING}px;
          background-color: ${WHITE};
          box-shadow: 0px 2px 10px 0 rgba(50, 64, 77, 0.1);
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
      <div style={defined(style) ? style : null} className="CardView">
        {children}
      </div>
    </>
  );
}
