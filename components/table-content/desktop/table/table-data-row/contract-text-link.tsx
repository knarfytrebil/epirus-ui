import * as React from 'react';
import { ITextLinkProps, TextLink } from './text-link';
import { CellContractIcon } from './cell-contract-icon';

export interface IContractTextLinkProps extends ITextLinkProps {
  isContract: boolean;
}

export function ContractTextLink(props: IContractTextLinkProps) {
  const { children, isContract, ...textLinkProps } = props;
  return (
    <TextLink {...textLinkProps}>
      <>
        {isContract && <CellContractIcon />}
        {children}
      </>
    </TextLink>
  );
}
