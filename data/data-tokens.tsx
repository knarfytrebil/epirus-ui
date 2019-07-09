import * as React from 'react';
import {
  defined,
  formatHash,
  formatWithCommas,
  resolveTokenName,
  tokenTableTagLookup,
} from '../utils';
import { ETagType, TypeTag, TextOnly, CellHash, CellTime } from '../components';
import {
  IHeaderDictionary,
  IHeaderItem,
  ETokensHeaderType,
  ETokensSortAndFilterType,
  ITokensData,
  EHeaderIconType,
  ETokensContractType,
} from '../models';

export const TOKENS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ETokensHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: ETokensSortAndFilterType.contractType,
    options: Object.keys(ETokensContractType).map((type: string) => ETokensContractType[type]),
    optionsLabelLookup: {
      ERC20: 'Fungible',
      ERC721: 'Non-Fungible',
      ERC1155: 'Hybrid',
    },
  },
  {
    headerType: ETokensHeaderType.Name,
    headerIconType: null,
  },
  {
    headerType: ETokensHeaderType.TotalSupply,
    headerIconType: null,
  },
  {
    headerType: ETokensHeaderType.TransactionCount,
    headerIconType: EHeaderIconType.Sort,
    type: ETokensSortAndFilterType.transactionCount,
  },
  {
    headerType: ETokensHeaderType.LastExecution,
    headerIconType: EHeaderIconType.Sort,
    type: ETokensSortAndFilterType.lastExecuted,
  },
];

export const TOKENS_CELL_LOOKUP: IHeaderDictionary<(data: ITokensData) => JSX.Element> = {
  [ETokensHeaderType.Type]: (data: ITokensData) => (
    <TypeTag tagType={ETagType[tokenTableTagLookup(data.contractType)]} />
  ),
  [ETokensHeaderType.Name]: (data: ITokensData) => (
    <CellHash
      contentToCopy={data.address}
      linkConfig={{
        href: `/tokens?detailsHash=${data.address}`,
        as: `/tokens/${data.address}`,
      }}
    >
      {resolveTokenName({ ...data, address: formatHash(data.address) })}
    </CellHash>
  ),
  [ETokensHeaderType.TotalSupply]: (data: ITokensData) => {
    if (data.totalSupply === 0) {
      return <TextOnly>0</TextOnly>;
    } else if (defined(data.totalSupply)) {
      return <TextOnly>{formatWithCommas(data.totalSupply)}</TextOnly>;
    } else {
      return <TextOnly>Unknown</TextOnly>;
    }
  },
  [ETokensHeaderType.TransactionCount]: (data: ITokensData) => (
    <TextOnly>{formatWithCommas(data.transactionCount)}</TextOnly>
  ),
  [ETokensHeaderType.LastExecution]: (data: ITokensData) => (
    <CellTime>{data.lastExecutedTimestampISO}</CellTime>
  ),
};
