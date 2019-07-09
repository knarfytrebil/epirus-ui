import * as React from 'react';
import Link from 'next/link';
import { defined } from '../../../../../utils';
import { ILinkConfig } from '../../../../../models';
import { TextTruncate } from '../../../../text-truncate';

export interface ITextLinkProps extends ILinkConfig {
  children: string | JSX.Element;
  style?: React.CSSProperties;
}

export function TextLink(props: ITextLinkProps) {
  const { style, children, ...remainingProps } = props;
  return (
    <>
      <style jsx>{`
        a.TextLink {
          display: block;
          position: relative;
          font-size: 12px;
          line-height: 22px;
          width: 130px;
          cursor: pointer;
        }
      `}</style>
      <Link {...remainingProps}>
        <a style={defined(style) ? style : null} className="TextLink --text-link">
          <TextTruncate isToolTipDisabled>{children}</TextTruncate>
        </a>
      </Link>
    </>
  );
}
