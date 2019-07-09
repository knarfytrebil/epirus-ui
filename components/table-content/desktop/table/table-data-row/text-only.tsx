import * as React from 'react';
import { TEXT_GREY } from '../../../../../data';
import { defined } from '../../../../../utils';
import { TextTruncate } from '../../../../text-truncate';

export interface ITextOnlyProps {
  style?: React.CSSProperties;
  children: string;
}

export function TextOnly(props: ITextOnlyProps) {
  const { style, children } = props;
  return (
    <>
      <style jsx>{`
        div.TextOnly {
          color: ${TEXT_GREY};
          font-size: 12px;
          line-height: 22px;
          width: 135px;
        }
      `}</style>
      <div style={defined(style) ? style : null} className="TextOnly">
        <TextTruncate>{children}</TextTruncate>
      </div>
    </>
  );
}
