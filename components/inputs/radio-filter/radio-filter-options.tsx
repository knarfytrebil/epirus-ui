import * as React from 'react';
import { RadioFilterOption } from './radio-filter-option';
import { removeSpaces } from '../../../utils';

export interface IRadioFilterOptionsProps {
  selectedOptions: string[];
  options: string[];
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function RadioFilterOptions(props: IRadioFilterOptionsProps) {
  const { options, selectedOptions, onChange } = props;
  return (
    <>
      <style jsx>{`
        ul.options {
          list-style: none;
        }
      `}</style>
      <ul className="options">
        {options.map((option: string) => (
          <RadioFilterOption
            key={option}
            option={option}
            isChecked={selectedOptions.indexOf(removeSpaces(option)) > -1}
            onChange={onChange}
          />
        ))}
      </ul>
    </>
  );
}
