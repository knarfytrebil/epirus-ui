import * as React from 'react';
import { IHeaderDictionary, IHeaderItem, EEventsHeaderType, IEventsData } from '../models';
import { ParametersPairList, TextOnly } from '../components';
import { parametersToInfo } from '../utils';

export const EVENTS_TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EEventsHeaderType.Name,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.Parameters,
    headerIconType: null,
  },
];

export const EVENTS_TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<
  (data: IEventsData) => JSX.Element
> = {
  [EEventsHeaderType.Name]: (data: IEventsData) => <TextOnly>{data.eventName}</TextOnly>,
  [EEventsHeaderType.Parameters]: (data: IEventsData) => (
    <ParametersPairList info={parametersToInfo(data.parameters)} />
  ),
};
