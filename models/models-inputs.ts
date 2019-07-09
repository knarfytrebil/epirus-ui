import { EDirectionType, TSortAndFilterType } from './index';
import * as React from 'react';

export interface IRadioSortItem {
  value: string;
  sort: TSortAndFilterType;
  direction: EDirectionType;
}

export interface IDropdownOption {
  label: React.ReactNode;
  value: string;
  className?: string;
}
