import * as React from 'react';
import { MobileRadioFilterOption } from './mobile-radio-filter-option';
import { IRadioSortItem } from '../../../models';

export interface IMobileRadioFilterProps {
  items: IRadioSortItem[];
  selectedItem: string;
  onChange(selectedItem: IRadioSortItem): void;
}

export function MobileRadioFilter(props: IMobileRadioFilterProps) {
  const { items, selectedItem, onChange } = props;
  return (
    <>
      <style jsx>{`
        ul.options {
          list-style: none;
        }
      `}</style>
      <ul className="options">
        {items.map((item: IRadioSortItem) => (
          <MobileRadioFilterOption
            key={item.value}
            item={item}
            isChecked={item.value === selectedItem}
            onChange={(e) =>
              onChange({ value: e.currentTarget.value, sort: item.sort, direction: item.direction })
            }
          />
        ))}
      </ul>
    </>
  );
}
