import * as React from 'react';
import {
  defined,
  formatHash,
  formatWithCommas,
  resolveTokenName,
  tokenTableTagLookup,
} from '../utils';
import { ETagType, TypeTag, InlineHash, InlineTime, TextTruncate } from '../components';
import { IHeaderDictionary, ITokensData, ETokensHeaderType } from '../models';

export const TOKENS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(data: ITokensData) => JSX.Element> = {
  [ETokensHeaderType.Type]: (data: ITokensData) => (
    <TypeTag tagType={ETagType[tokenTableTagLookup(data.contractType)]} />
  ),
  [ETokensHeaderType.Name]: (data: ITokensData) => (
    <InlineHash
      style={{
        fontSize: 16,
        lineHeight: '20px',
      }}
      contentToCopy={data.address}
      linkConfig={{
        href: `/tokens?detailsHash=${data.address}`,
        as: `/tokens/${data.address}`,
      }}
    >
      {resolveTokenName({ ...data, address: formatHash(data.address) })}
    </InlineHash>
  ),
  [ETokensHeaderType.TotalSupply]: (data: ITokensData) => {
    if (data.totalSupply === 0) {
      return <TextTruncate>0</TextTruncate>;
    } else if (defined(data.totalSupply)) {
      return <TextTruncate>{formatWithCommas(data.totalSupply)}</TextTruncate>;
    } else {
      return <TextTruncate>Unknown</TextTruncate>;
    }
  },
  [ETokensHeaderType.TransactionCount]: (data: ITokensData) => (
    <TextTruncate>{formatWithCommas(data.transactionCount)}</TextTruncate>
  ),
  [ETokensHeaderType.LastExecution]: (data: ITokensData) => (
    <InlineTime>{data.lastExecutedTimestampISO}</InlineTime>
  ),
};
