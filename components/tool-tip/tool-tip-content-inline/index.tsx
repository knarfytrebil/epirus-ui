import * as React from 'react';
import { ToolTipInline } from '../tool-tip-inline';
import { TextLink } from '../..';
import { ToolTipCopyButton } from './tool-tip-copy-button';
import { ILinkConfig } from '../../../models';
import { defined } from '../../../utils';

export interface IToolTipContentInlineProps {
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  contentToCopy: string;
  children: string | JSX.Element;
  linkConfig?: ILinkConfig;
}

export function ToolTipContentInline(props: IToolTipContentInlineProps) {
  const { style, textStyle, linkConfig, contentToCopy, children } = props;

  return (
    <ToolTipInline
      style={defined(style) ? style : null}
      toolTipContent={<ToolTipCopyButton contentToCopy={contentToCopy} />}
    >
      {linkConfig ? (
        <TextLink style={{ ...textStyle, width: 'auto' }} href={linkConfig.href} as={linkConfig.as}>
          {children}
        </TextLink>
      ) : (
        <div style={{ ...textStyle, cursor: 'pointer' }}>{children}</div>
      )}
    </ToolTipInline>
  );
}

export * from './tool-tip-copy-button';
