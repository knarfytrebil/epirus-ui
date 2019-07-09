import * as React from 'react';
import { EBlocksHeaderType, IBlocksData, IHeaderDictionary } from '../models';
import { formatHash } from '../utils';
import { TextTruncate, ETagType, TypeTag, InlineHash, InlineTime } from '../components';

export const BLOCKS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(data: IBlocksData) => JSX.Element> = {
  [EBlocksHeaderType.Type]: () => <TypeTag tagType={ETagType['Block']} />,
  [EBlocksHeaderType.Hash]: (data: IBlocksData) => (
    <InlineHash
      contentToCopy={data.hash}
      linkConfig={{ href: `/blocks?detailsHash=${data.hash}`, as: `/blocks/${data.hash}` }}
    >
      {formatHash(data.hash)}
    </InlineHash>
  ),
  [EBlocksHeaderType['Block Number']]: (data: IBlocksData) => (
    <InlineHash
      contentToCopy={data.number.toString()}
      linkConfig={{
        href: `/blocks?detailsHash=${data.hash}`,
        as: `/blocks/${data.hash}`,
      }}
    >
      {data.number.toString()}
    </InlineHash>
  ),
  [EBlocksHeaderType['Transaction Count']]: (data: IBlocksData) => (
    <TextTruncate>{data.transactionCount.toString()}</TextTruncate>
  ),
  [EBlocksHeaderType.Time]: (data: IBlocksData) => <InlineTime>{data.timestampISO}</InlineTime>,
};
