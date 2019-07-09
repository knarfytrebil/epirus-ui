import * as React from 'react';
import { IHeaderItem, TSortAndFilterType } from '../../../models';
import { addToArrayIfNotThere, removeFromArrayIfThere, removeSpaces } from '../../../utils';
import { CheckboxFilterOptions } from '../checkbox-filter';

export interface INextFilter {
  type: TSortAndFilterType;
  filterValue: string[];
}

export interface IMobileCheckboxFilterProps {
  item: IHeaderItem;
  selectedOptions: string[];
  onChange(nextFilter: INextFilter): void;
}

export function MobileCheckboxFilter(props: IMobileCheckboxFilterProps) {
  const { item, selectedOptions, onChange } = props;
  const { type, options, optionsLabelLookup } = item;

  return (
    <CheckboxFilterOptions
      optionsLabelLookup={optionsLabelLookup}
      options={options}
      selectedOptions={selectedOptions}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = e.currentTarget;
        if (checked) {
          onChange({
            type,
            filterValue: addToArrayIfNotThere(selectedOptions, removeSpaces(name)),
          });
        } else {
          onChange({
            type,
            filterValue: removeFromArrayIfThere(selectedOptions, removeSpaces(name)),
          });
        }
      }}
    />
  );
}
