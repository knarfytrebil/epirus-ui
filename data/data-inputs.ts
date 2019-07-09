import { EDirectionType } from '../models';

export const SORT_DIRECTION_LOOKUP = {
  'Transaction Count': {
    [EDirectionType.DESC]: 'Highest',
    [EDirectionType.ASC]: 'Lowest',
  },
  'Creation Date': {
    [EDirectionType.DESC]: 'Most Recent',
    [EDirectionType.ASC]: 'Oldest',
  },
  'Last Execution': {
    [EDirectionType.DESC]: 'Most Recent',
    [EDirectionType.ASC]: 'Oldest',
  },
  'Last Transaction Date': {
    [EDirectionType.DESC]: 'Most Recent',
    [EDirectionType.ASC]: 'Oldest',
  },
  Value: {
    [EDirectionType.DESC]: 'Highest',
    [EDirectionType.ASC]: 'Lowest',
  },
  Time: {
    [EDirectionType.DESC]: 'Most Recent',
    [EDirectionType.ASC]: 'Oldest',
  },
};

export const SORT_NAME_LOOKUP = {
  created: 'Creation Date',
  lastExecuted: 'Last Execution',
  transactionCount: 'Transaction Count',
  timestampISO: 'Time',
  ethValue: 'Value',
};
