import { EDirectionType, THeaderType, TSortAndFilterType, IRadioSortItem } from '../models';
import { SORT_DIRECTION_LOOKUP } from '../data';

export function radioSortItem(
  headerType: THeaderType,
  sort: TSortAndFilterType,
  direction: EDirectionType,
): IRadioSortItem {
  return {
    value: radioSortValue(headerType, direction),
    sort,
    direction,
  };
}

export function radioSortValue(headerType: THeaderType, direction: EDirectionType) {
  return `${headerType} - ${SORT_DIRECTION_LOOKUP[headerType][direction]}`;
}
