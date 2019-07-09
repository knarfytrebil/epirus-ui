import * as React from 'react';
import { ROW_HEIGHT } from './index';
import { ToolTipCellCopy } from './cell-tool-tip-copy';
import { CellContractIcon } from './cell-contract-icon';
import { ILinkConfig } from '../../../../../models';
import { ArrowRightIcon } from './arrow-right-icon';

export interface ICellHashProps {
  linkConfig: ILinkConfig;
  contentToCopy: string;
  children: string;
  isContract?: boolean;
  isToHash?: boolean;
}

export function CellHash(props: ICellHashProps) {
  const { isContract, linkConfig, contentToCopy, children, isToHash } = props;

  return (
    <>
      <style jsx>{`
        div.CellHash {
          position: relative;
          height: ${ROW_HEIGHT - 3}px;
          width: 100%;
        }
      `}</style>
      <div className="CellHash">
        {isToHash && <ArrowRightIcon />}
        {isContract && <CellContractIcon />}
        <ToolTipCellCopy linkConfig={linkConfig} contentToCopy={contentToCopy}>
          {children}
        </ToolTipCellCopy>
      </div>
    </>
  );
}
