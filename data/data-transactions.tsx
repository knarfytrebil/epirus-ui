import * as React from 'react';
import { formatHash, formatWithCommas, isHash } from '../utils';
import { TypeTag, CellTime, CellHash, ETagType, CellValue, ECellUnitType } from '../components';
import {
  IHeaderDictionary,
  IHeaderItem,
  ETransactionsHeaderType,
  ETransactionsSortAndFilterType,
  ITransactionsData,
  EHeaderIconType,
  ETransactionsTransactionType,
  ETransactionsDirection,
} from '../models';

export const TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ETransactionsHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: ETransactionsSortAndFilterType.transactionType,
    options: Object.keys(ETransactionsTransactionType).map(
      (type: string) => ETransactionsTransactionType[type],
    ),
  },
  {
    headerType: ETransactionsHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.From,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.To,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.Value,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.ethValue,
  },
  {
    headerType: ETransactionsHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.timestampISO,
  },
];

const TRANSACTIONS_HEADER_ITEMS_WITH_STATE = [
  ...TRANSACTIONS_HEADER_ITEMS.slice(0, 2),
  {
    headerType: ETransactionsHeaderType.State,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: ETransactionsSortAndFilterType.direction,
    options: Object.keys(ETransactionsDirection).map(
      (type: string) => ETransactionsDirection[type],
    ),
  },
  ...TRANSACTIONS_HEADER_ITEMS.slice(2, TRANSACTIONS_HEADER_ITEMS.length),
];

export const TRANSACTIONS_ACCOUNT_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS_WITH_STATE;
export const TRANSACTIONS_CONTRACT_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS_WITH_STATE;
export const TRANSACTIONS_TOKENS_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS_WITH_STATE;

export const TRANSACTIONS_NESTED_HEADER_ITEMS: IHeaderItem[] = [
  ...TRANSACTIONS_HEADER_ITEMS.slice(0, TRANSACTIONS_HEADER_ITEMS.length - 1),
  {
    headerType: ETransactionsHeaderType.Time,
    headerIconType: null,
  },
];

export const TRANSACTIONS_BLOCK_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_NESTED_HEADER_ITEMS;

export const TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<
  (data: ITransactionsData) => JSX.Element
> = {
  [ETransactionsHeaderType.Type]: (data: ITransactionsData) => (
    <TypeTag isPrivate={data.private} tagType={ETagType[data.transactionType]} />
  ),
  [ETransactionsHeaderType.State]: (data: ITransactionsData) => (
    <TypeTag tagType={ETagType[data.direction]} />
  ),
  [ETransactionsHeaderType.Hash]: (data: ITransactionsData) => (
    <CellHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/transactions?detailsHash=${data.hash}`,
        as: `/transactions/${data.hash}`,
      }}
    >
      {formatHash(data.hash)}
    </CellHash>
  ),
  [ETransactionsHeaderType.From]: (data: ITransactionsData) => (
    <CellHash
      contentToCopy={data.from}
      isContract={data.fromMeta.contract}
      linkConfig={{
        href: `/${data.fromMeta.contract ? 'contracts' : 'accounts'}?detailsHash=${data.from}`,
        as: `/${data.fromMeta.contract ? 'contracts' : 'accounts'}/${data.from}`,
      }}
    >
      {isHash(data.fromMeta.display) ? formatHash(data.fromMeta.display) : data.fromMeta.display}
    </CellHash>
  ),
  [ETransactionsHeaderType.To]: (data: ITransactionsData) => (
    <CellHash
      contentToCopy={data.to}
      isToHash
      isContract={data.toMeta.contract}
      linkConfig={{
        href: `/${data.toMeta.contract ? 'contracts' : 'accounts'}?detailsHash=${data.to}`,
        as: `/${data.toMeta.contract ? 'contracts' : 'accounts'}/${data.to}`,
      }}
    >
      {isHash(data.toMeta.display) ? formatHash(data.toMeta.display) : data.toMeta.display}
    </CellHash>
  ),
  [ETransactionsHeaderType.Value]: (data: ITransactionsData) => (
    <CellValue
      contentToCopy={`${formatWithCommas(parseFloat(data.value), 0, 0)} Wei`}
      unit={ECellUnitType.Eth}
    >
      {formatWithCommas(parseFloat(data.ethValue))}
    </CellValue>
  ),
  [ETransactionsHeaderType.Time]: (data: ITransactionsData) => (
    <CellTime>{data.timestampISO}</CellTime>
  ),
};
