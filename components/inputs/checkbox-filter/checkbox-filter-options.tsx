import * as React from 'react';
import { CheckboxFilterOption } from './checkbox-filter-option';
import { removeSpaces } from '../../../utils';
import { IDictionary } from '../../../models';

export interface ICheckboxFilterOptionsProps {
  optionsLabelLookup?: IDictionary<string>;
  selectedOptions: string[];
  options: string[];
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function CheckboxFilterOptions(props: ICheckboxFilterOptionsProps) {
  const { optionsLabelLookup, options, selectedOptions, onChange } = props;
  return (
    <>
      <style jsx>{`
        ul.options {
          list-style: none;
        }
      `}</style>
      <ul className="options">
        {options.map((option: string) => (
          <CheckboxFilterOption
            key={option}
            option={option}
            label={optionsLabelLookup ? optionsLabelLookup[option] : option}
            isChecked={selectedOptions.indexOf(removeSpaces(option)) > -1}
            onChange={onChange}
          />
        ))}
      </ul>
    </>
  );
}
