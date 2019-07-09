import * as React from 'react';
import {
  EBlocksHeaderType,
  EBlocksSortAndFilterType,
  EHeaderIconType,
  IBlocksData,
  IHeaderDictionary,
  IHeaderItem,
} from '../models';
import { formatHash } from '../utils';
import { TextOnly, ETagType, TypeTag, CellTime, CellHash } from '../components';

export const BLOCKS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EBlocksHeaderType.Type,
    headerIconType: null,
  },
  {
    headerType: EBlocksHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: EBlocksHeaderType['Block Number'],
    headerIconType: null,
  },
  {
    headerType: EBlocksHeaderType['Transaction Count'],
    headerIconType: EHeaderIconType.Sort,
    type: EBlocksSortAndFilterType.transactionCount,
  },
  {
    headerType: EBlocksHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: EBlocksSortAndFilterType.timestampISO,
  },
];

export const BLOCKS_CELL_LOOKUP: IHeaderDictionary<(data: IBlocksData) => JSX.Element> = {
  [EBlocksHeaderType.Type]: () => <TypeTag tagType={ETagType['Block']} />,
  [EBlocksHeaderType.Hash]: (data: IBlocksData) => (
    <CellHash
      contentToCopy={data.hash}
      linkConfig={{ href: `/blocks?detailsHash=${data.hash}`, as: `/blocks/${data.hash}` }}
    >
      {formatHash(data.hash)}
    </CellHash>
  ),
  [EBlocksHeaderType['Block Number']]: (data: IBlocksData) => (
    <CellHash
      contentToCopy={data.number.toString()}
      linkConfig={{
        href: `/blocks?detailsHash=${data.hash}`,
        as: `/blocks/${data.hash}`,
      }}
    >
      {data.number.toString()}
    </CellHash>
  ),
  [EBlocksHeaderType['Transaction Count']]: (data: IBlocksData) => (
    <TextOnly>{data.transactionCount.toString()}</TextOnly>
  ),
  [EBlocksHeaderType.Time]: (data: IBlocksData) => <CellTime>{data.timestampISO}</CellTime>,
};
