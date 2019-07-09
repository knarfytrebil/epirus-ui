import * as React from 'react';
import { formatHash, isHash, parametersToInfo } from '../utils';
import { IHeaderDictionary, EEventsHeaderType, IEventsData } from '../models';
import { TextTruncate, ParametersPairList, InlineHash, InlineTime } from '../components';

export const EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP: IHeaderDictionary<
  (data: IEventsData) => JSX.Element
> = {
  [EEventsHeaderType.TransactionHash]: (data: IEventsData) => (
    <InlineHash
      contentToCopy={data.transactionHash}
      linkConfig={{
        href: `/transactions?detailsHash=${data.transactionHash}`,
        as: `/transactions/${data.transactionHash}`,
      }}
    >
      {formatHash(data.transactionHash)}
    </InlineHash>
  ),
  [EEventsHeaderType.Name]: (data: IEventsData) => {
    if (isHash(data.eventName)) {
      return <span>{formatHash(data.eventName)}</span>;
    } else {
      return <TextTruncate>{data.eventName}</TextTruncate>;
    }
  },
  [EEventsHeaderType.Parameters]: (data: IEventsData) => (
    <ParametersPairList info={parametersToInfo(data.parameters, true)} />
  ),
  [EEventsHeaderType.Time]: (data: IEventsData) => <InlineTime>{data.timestampISO}</InlineTime>,
};
