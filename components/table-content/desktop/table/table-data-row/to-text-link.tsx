import * as React from 'react';
import { FONT_WEIGHT_TEXT, HOVER_PURPLE_TEXT, LIGHT_PURPLE_TEXT } from '../../../../../data';
import { ITextLinkProps } from './text-link';
import { ContractTextLink } from './contract-text-link';
import { ArrowRightIcon } from './arrow-right-icon';

export interface IToTextLinkProps extends ITextLinkProps {
  isContract: boolean;
}

export function ToTextLink(props: IToTextLinkProps) {
  const { children, ...textLinkProps } = props;
  return (
    <>
      <style jsx>{`
        a.TextLink {
          color: ${LIGHT_PURPLE_TEXT};
          font-size: 12px;
          line-height: 22px;
          font-weight: ${FONT_WEIGHT_TEXT};
        }
        a.TextLink:hover {
          color: ${HOVER_PURPLE_TEXT};
          text-decoration: underline;
        }
      `}</style>
      <ContractTextLink {...textLinkProps}>
        <>
          <ArrowRightIcon />
          {children}
        </>
      </ContractTextLink>
    </>
  );
}
