import * as React from 'react';
import { MOBILE_LIGHT_GREY, WHITE } from '../../../../../../style-config';
import { ITableMobileFiltersProps } from '..';
import {
  EDirectionType,
  EHeaderIconType,
  IDimensions,
  IHeaderItem,
  IRadioSortItem,
} from '../../../../../../models';
import { MobileCheckboxFilter, MobileRadioFilter } from '../../../../../inputs';
import { SORT_NAME_LOOKUP } from '../../../../../../data';
import { TableMobileModalApply } from './table-mobile-modal-apply';
import { TableMobileModalReset } from './table-mobile-modal-reset';
import { TableMobileModalHeader } from './table-mobile-modal-header';
import { TableMobileModalMask } from './table-mobile-modal-mask';
import { TableMobileModalWrapper } from './table-mobile-modal-wrapper';
import {
  defined,
  radioSortItem,
  radioSortValue,
  transformFilterArrayToString,
} from '../../../../../../utils';
let initFilterBy = {};

export interface ITableMobileModalProps extends ITableMobileFiltersProps {
  dimensionsConfig: IDimensions;
  resetFilterConfig: any;
  onCloseModal(): void;
}

export function TableMobileModal(props: ITableMobileModalProps) {
  const {
    onCloseModal,
    mobileFilterConfig,
    filters,
    sortRowsConfig,
    dimensionsConfig,
    resetFilterConfig,
  } = props;
  const { sort, direction, onSortChange } = sortRowsConfig;

  React.useEffect(() => {
    document.getElementById('__next').style.display = 'none';
    window.scrollTo(0, 0);
    return () => {
      document.getElementById('__next').style.display = 'block';
    };
  }, []);

  if (mobileFilterConfig) {
    initFilterBy = mobileFilterConfig.currentFilters;
  }

  const [allFilters, setAllFilters] = React.useState({
    filterBy: { ...initFilterBy },
    sortBy: { sort, direction },
  });

  const checkboxFilterKeys =
    filters && Object.keys(filters).filter((key: string) => key === EHeaderIconType.CheckboxFilter);
  const sortFilterKeys =
    filters && Object.keys(filters).filter((key: string) => key === EHeaderIconType.Sort);

  const isFilters = defined(mobileFilterConfig) && checkboxFilterKeys.length > 0;

  return (
    <>
      <style jsx>{`
        h3.subtitle {
          font-size: 16px;
          line-height: 20px;
          font-weight: 600;
        }
        div.checkbox:first-child {
          margin-top: 28px;
        }
        div.checkbox {
          margin-top: 16px;
        }
        div.radio {
          margin-top: 16px;
          padding-top: 16px;
          border-top: ${isFilters ? `1px solid ${MOBILE_LIGHT_GREY}` : 'none'};
        }
      `}</style>
      <TableMobileModalMask style={{ backgroundColor: WHITE, width: 272 + 48 }} />
      <TableMobileModalWrapper dimensionsConfig={dimensionsConfig}>
        <div>
          <TableMobileModalHeader onCloseModal={onCloseModal} />
          {isFilters && (
            <div>
              {checkboxFilterKeys.map((key: string) => (
                <React.Fragment key={key}>
                  {filters[key].map((item: IHeaderItem) => (
                    <div key={item.headerType} className="checkbox">
                      <h3 className="subtitle">{item.headerType}</h3>
                      <MobileCheckboxFilter
                        selectedOptions={allFilters.filterBy[item.type] || []}
                        item={item}
                        onChange={(nextFilter) => {
                          setAllFilters({
                            ...allFilters,
                            filterBy: {
                              ...allFilters.filterBy,
                              [nextFilter.type]: nextFilter.filterValue,
                            },
                          });
                        }}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          )}
          {sortFilterKeys.length > 0 && (
            <div className="radio">
              <h3 className="subtitle">Sort by</h3>
              <MobileRadioFilter
                items={filters[EHeaderIconType.Sort].reduce(
                  (a: IRadioSortItem[], c: IHeaderItem) => {
                    a = [
                      ...a,
                      radioSortItem(c.headerType, c.type, EDirectionType.ASC),
                      radioSortItem(c.headerType, c.type, EDirectionType.DESC),
                    ];
                    return a;
                  },
                  [],
                )}
                selectedItem={
                  allFilters.sortBy.sort && allFilters.sortBy.sort
                    ? radioSortValue(
                        SORT_NAME_LOOKUP[allFilters.sortBy.sort],
                        allFilters.sortBy.direction,
                      )
                    : null
                }
                onChange={(selectedItem: IRadioSortItem) => {
                  setAllFilters({
                    ...allFilters,
                    sortBy: { sort: selectedItem.sort, direction: selectedItem.direction },
                  });
                }}
              />
            </div>
          )}
        </div>
        <div>
          <TableMobileModalReset
            onClick={() => {
              const { resetFilterBy, resetSortBy } = resetFilterConfig;
              setAllFilters({
                filterBy: {},
                sortBy: resetSortBy,
              });
              mobileFilterConfig.onFilterChange('', resetSortBy);
              onCloseModal();
            }}
          />
          <TableMobileModalApply
            onClick={() => {
              const { sortBy, filterBy } = allFilters;
              if (defined(mobileFilterConfig)) {
                const currentFilters = {};
                Object.keys(filterBy).forEach((type: string) => {
                  currentFilters[type] = filterBy[type];
                });
                mobileFilterConfig.onFilterChange(
                  transformFilterArrayToString(currentFilters),
                  sortBy,
                );
              } else {
                onSortChange(sortBy);
              }
              onCloseModal();
            }}
          />
        </div>
      </TableMobileModalWrapper>
    </>
  );
}

export * from './table-mobile-modal-apply';
export * from './table-mobile-modal-cross';
export * from './table-mobile-modal-header';
export * from './table-mobile-modal-mask';
export * from './table-mobile-modal-reset';
export * from './table-mobile-modal-wrapper';
