import * as React from 'react';
import { formatHash, formatWithCommas, isHash } from '../utils';
import { TypeTag, ETagType, InlineHash, InlineValue, InlineTime } from '../components';
import { IHeaderDictionary, ITransactionsData, ETransactionsHeaderType } from '../models';

export const TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<
  (data: ITransactionsData) => JSX.Element
> = {
  [ETransactionsHeaderType.Type]: (data: ITransactionsData) => (
    <TypeTag isPrivate={data.private} tagType={ETagType[data.transactionType]} />
  ),
  [ETransactionsHeaderType.Hash]: (data: ITransactionsData) => (
    <InlineHash
      style={{
        fontSize: 16,
        lineHeight: '20px',
      }}
      contentToCopy={data.hash}
      isContract={data.fromMeta.contract}
      linkConfig={{
        href: `/transactions?detailsHash=${data.hash}`,
        as: `/transactions/${data.hash}`,
      }}
    >
      {formatHash(data.hash)}
    </InlineHash>
  ),
  [ETransactionsHeaderType.State]: (data: ITransactionsData) => (
    <TypeTag tagType={ETagType[data.direction]} />
  ),
  [ETransactionsHeaderType.From]: (data: ITransactionsData) => (
    <InlineHash
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
      contentToCopy={data.from}
      isContract={data.fromMeta.contract}
      linkConfig={{
        href: `/${data.fromMeta.contract ? 'contracts' : 'accounts'}?detailsHash=${data.from}`,
        as: `/${data.fromMeta.contract ? 'contracts' : 'accounts'}/${data.from}`,
      }}
    >
      {isHash(data.fromMeta.display) ? formatHash(data.fromMeta.display) : data.fromMeta.display}
    </InlineHash>
  ),
  [ETransactionsHeaderType.To]: (data: ITransactionsData) => (
    <InlineHash
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
      contentToCopy={data.to}
      isContract={data.toMeta.contract}
      linkConfig={{
        href: `/${data.toMeta.contract ? 'contracts' : 'accounts'}?detailsHash=${data.to}`,
        as: `/${data.toMeta.contract ? 'contracts' : 'accounts'}/${data.to}`,
      }}
    >
      {isHash(data.toMeta.display) ? formatHash(data.toMeta.display) : data.toMeta.display}
    </InlineHash>
  ),
  [ETransactionsHeaderType.Value]: (data: ITransactionsData) => (
    <InlineValue
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
      contentToCopy={`${formatWithCommas(parseFloat(data.value), 0, 0)} Wei`}
    >
      {`${formatWithCommas(parseFloat(data.ethValue))} ETH`}
    </InlineValue>
  ),
  [ETransactionsHeaderType.Time]: (data: ITransactionsData) => (
    <InlineTime>{data.timestampISO}</InlineTime>
  ),
};
