import * as React from 'react';
import { ICON } from '../../svg';
import { HEADER_ICON_GREY, HEADER_ICON_PURPLE, WHITE } from '../../../data';
import { IFilterConfig, IHeaderItem, EIconType } from '../../../models';
import { RadioFilterOptions } from '../radio-filter';

export interface ICellRadioFilterProps {
  item: IHeaderItem;
  filterConfig: IFilterConfig;
}

export function CellRadioFilter(props: ICellRadioFilterProps) {
  const { filterConfig, item } = props;
  const { type, options } = item;
  const { onFilterChange, currentFilters } = filterConfig;
  const currentSelectedOptions = currentFilters[type] || [];
  const [isFilterOpen, toggleFilter] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState(currentSelectedOptions);

  const handleWindowClick = () => {
    toggleFilter(false);
  };

  React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const isFilterActivated = selectedOptions.some(
    (option: string) =>
      (currentSelectedOptions && currentSelectedOptions.indexOf(option) > -1) || option === 'All',
  );

  return (
    <>
      <style jsx>{`
        div.CellRadioFilter {
          position: relative;
        }
        button.toggle {
          color: ${isFilterOpen || isFilterActivated ? HEADER_ICON_PURPLE : HEADER_ICON_GREY};
        }
        div.filter {
          position: absolute;
          top: 100%;
          left: 0;
          width: 142px;
          padding: 16px 0;
          background-color: ${WHITE};
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 0 8px 0 rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <div className="CellRadioFilter" onClick={(e) => e.stopPropagation()}>
        <button className="toggle" onClick={() => toggleFilter(!isFilterOpen)}>
          {ICON[EIconType.Filter]}
        </button>
        {isFilterOpen && (
          <div className="filter">
            <RadioFilterOptions
              options={options}
              selectedOptions={selectedOptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { checked, name } = e.currentTarget;
                if (checked) {
                  setSelectedOptions([name]);
                  onFilterChange(type, [name]);
                  toggleFilter(false);
                } else {
                  setSelectedOptions([]);
                  onFilterChange(type, []);
                  toggleFilter(false);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
