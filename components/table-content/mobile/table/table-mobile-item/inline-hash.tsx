import * as React from 'react';
import { ILinkConfig } from '../../../../../models';
import { TextLink } from '../../../desktop';
import { ToolTipInline, ToolTipCopyButton } from '../../../../tool-tip';
import { InlineContractIcon } from './inline-contract-icon';
import { defined } from '../../../../../utils';

export interface IInlineHashProps {
  style?: React.CSSProperties;
  linkConfig: ILinkConfig;
  contentToCopy: string;
  children: string;
  isContract?: boolean;
  isToHash?: boolean;
}

export function InlineHash(props: IInlineHashProps) {
  const { style, isContract, linkConfig, contentToCopy, children } = props;

  return (
    <>
      <style jsx>{`
        div.InlineHash {
          display: flex;
          position: relative;
        }
      `}</style>
      <div className="InlineHash">
        {isContract && (
          <div style={{ marginRight: 4 }}>
            <InlineContractIcon />
          </div>
        )}
        <ToolTipInline
          style={defined(style) ? style : null}
          toolTipContent={<ToolTipCopyButton contentToCopy={contentToCopy} />}
        >
          <TextLink
            style={{
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }}
            {...linkConfig}
          >
            {children}
          </TextLink>
        </ToolTipInline>
      </div>
    </>
  );
}
