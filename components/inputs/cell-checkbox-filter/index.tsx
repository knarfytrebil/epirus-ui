import * as React from 'react';
import { ICON } from '../../svg';
import { HEADER_ICON_GREY, HEADER_ICON_PURPLE, WHITE } from '../../../data';
import { IFilterConfig, IHeaderItem, EIconType } from '../../../models';
import { CheckboxFilterOptions, CheckboxFilterControls } from '../checkbox-filter';
import { addToArrayIfNotThere, removeFromArrayIfThere, removeSpaces } from '../../../utils';

export interface ICellCheckboxFilterProps {
  item: IHeaderItem;
  filterConfig: IFilterConfig;
}

export function CellCheckboxFilter(props: ICellCheckboxFilterProps) {
  const { filterConfig, item } = props;
  const { type, options, optionsLabelLookup } = item;
  const { onFilterChange, currentFilters } = filterConfig;
  const currentSelectedOptions = currentFilters[type] || [];
  const [isFilterOpen, toggleFilter] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState(currentSelectedOptions);

  const handleClose = () => {
    toggleFilter(false);
  };

  React.useEffect(() => {
    setSelectedOptions(currentSelectedOptions);
  }, [isFilterOpen]);

  React.useEffect(() => {
    window.addEventListener('click', handleClose);
    const otherInputs: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'toggle-checkbox',
    );
    if (otherInputs && otherInputs.length > 1) {
      for (let i = 0; i < otherInputs.length; i++) {
        const value = otherInputs.item(i)['value'];
        if (value !== type) {
          otherInputs.item(i).addEventListener('click', handleClose);
        }
      }
    }
    return () => {
      window.removeEventListener('click', handleClose);
      if (otherInputs && otherInputs.length > 1) {
        for (let i = 0; i < otherInputs.length; i++) {
          const value = otherInputs.item(i)['value'];
          if (value !== type) {
            otherInputs.item(i).removeEventListener('click', handleClose);
          }
        }
      }
    };
  }, []);

  const isFilterActivated = selectedOptions.some(
    (option: string) =>
      (currentSelectedOptions && currentSelectedOptions.indexOf(option) > -1) || option === 'All',
  );

  return (
    <>
      <style jsx>{`
        div.CellCheckboxFilter {
          position: relative;
        }
        button.toggle-checkbox {
          color: ${isFilterOpen || isFilterActivated ? HEADER_ICON_PURPLE : HEADER_ICON_GREY};
        }
        div.filter {
          position: absolute;
          top: 100%;
          left: 0;
          width: 180px;
          background-color: ${WHITE};
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 0 8px 0 rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <div className="CellCheckboxFilter" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          value={type}
          className="toggle-checkbox"
          onClick={() => {
            if (isFilterOpen) {
              handleClose();
            } else {
              toggleFilter(true);
            }
          }}
        >
          {ICON[EIconType.Filter]}
        </button>
        {isFilterOpen && (
          <div className="filter">
            <CheckboxFilterOptions
              optionsLabelLookup={optionsLabelLookup}
              options={options}
              selectedOptions={selectedOptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { checked, name } = e.currentTarget;
                if (checked) {
                  setSelectedOptions(addToArrayIfNotThere(selectedOptions, removeSpaces(name)));
                } else {
                  setSelectedOptions(removeFromArrayIfThere(selectedOptions, removeSpaces(name)));
                }
              }}
            />
            <CheckboxFilterControls
              onOkClick={() => {
                onFilterChange(type, selectedOptions);
                setSelectedOptions(selectedOptions);
                handleClose();
              }}
              onResetClick={() => {
                onFilterChange(type, null);
                setSelectedOptions([]);
                handleClose();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
