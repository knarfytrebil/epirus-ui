import * as React from 'react';
import { ToolTipInline, ToolTipCopyButton } from '../../../../tool-tip';
import { TextTruncate } from '../../../../text-truncate';

export interface IInlineValueProps {
  style?: React.CSSProperties;
  contentToCopy: string;
  children: string | JSX.Element;
}

export function InlineValue(props: IInlineValueProps) {
  const { style, contentToCopy, children } = props;

  return (
    <>
      <style jsx>{`
        div.InlineValue {
          position: relative;
        }
        div.cell {
          display: flex;
          flex-direction: row;
          position: relative;
          top: 2px;
          max-width: 100px;
          line-height: 19px;
          cursor: pointer;
        }
      `}</style>
      <div className="InlineValue">
        <ToolTipInline
          style={style}
          toolTipContent={<ToolTipCopyButton contentToCopy={contentToCopy} />}
        >
          <TextTruncate>{children}</TextTruncate>
        </ToolTipInline>
      </div>
    </>
  );
}
