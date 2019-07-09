import * as React from 'react';
import { ROW_HEIGHT, TextOnly } from '../../../../table-content';
import { MetadataOptionsButton } from './metadata-options-control';
import { defined, formatWithCommas } from '../../../../../utils';
import { IMetadataOption } from '../../../../../models';

export interface ICellContractsCountProps {
  options?: IMetadataOption[];
  count: number;
}
export function CellContractsCount(props: ICellContractsCountProps) {
  const { options, count } = props;
  return (
    <>
      <style jsx>{`
        div.CellContractsCount {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: ${ROW_HEIGHT}px;
        }
      `}</style>
      <div className="CellContractsCount">
        {count === 0 ? <TextOnly>0</TextOnly> : <TextOnly>{formatWithCommas(count)}</TextOnly>}
        {defined(options) && <MetadataOptionsButton options={options} />}
      </div>
    </>
  );
}
