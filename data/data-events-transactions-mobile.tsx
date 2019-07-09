import * as React from 'react';
import { IHeaderDictionary, EEventsHeaderType, IEventsData } from '../models';
import { ParametersPairList, TextTruncate } from '../components';
import { formatHash, isHash, parametersToInfo } from '../utils';

export const EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<
  (data: IEventsData) => JSX.Element
> = {
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
};
