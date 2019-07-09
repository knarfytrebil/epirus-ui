import * as React from 'react';
import { formatHash, parametersToInfo } from '../utils';
import {
  IHeaderDictionary,
  IHeaderItem,
  EEventsHeaderType,
  IEventsData,
  EHeaderIconType,
  EEventsSortAndFilterType,
} from '../models';
import { ParametersPairList, CellHash, CellTime, TextOnly } from '../components';

export const EVENTS_CONTRACTS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EEventsHeaderType.TransactionHash,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.Name,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.Parameters,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: EEventsSortAndFilterType.timestampISO,
  },
];

export const EVENTS_TOKENS_HEADER_ITEMS = EVENTS_CONTRACTS_HEADER_ITEMS;

export const EVENTS_CONTRACTS_CELL_LOOKUP: IHeaderDictionary<(data: IEventsData) => JSX.Element> = {
  [EEventsHeaderType.TransactionHash]: (data: IEventsData) => (
    <CellHash
      contentToCopy={data.transactionHash}
      linkConfig={{
        href: `/transactions?detailsHash=${data.transactionHash}`,
        as: `/transactions/${data.transactionHash}`,
      }}
    >
      {formatHash(data.transactionHash)}
    </CellHash>
  ),
  [EEventsHeaderType.Name]: (data: IEventsData) => <TextOnly>{data.eventName}</TextOnly>,
  [EEventsHeaderType.Parameters]: (data: IEventsData) => (
    <ParametersPairList info={parametersToInfo(data.parameters)} />
  ),
  [EEventsHeaderType.Time]: (data: IEventsData) => <CellTime>{data.timestampISO}</CellTime>,
};
