import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HEADER_ICON_PURPLE, WHITE } from '../../../../../style-config';
import { ICON } from '../../../../svg';
import {
  EHeaderIconType,
  IDictionary,
  IDimensions,
  IHeaderItem,
  IMobileFilterConfig,
  ISortConfig,
} from '../../../../../models';
import { TableMobileModal } from './table-mobile-modal';
import { bodyScroll, defined } from '../../../../../utils';
let resetFilterBy, lastScrollY, timeout;

export interface ITableMobileFiltersProps {
  isZeroElements?: boolean;
  dimensionsConfig: IDimensions;
  filters: IDictionary<IHeaderItem[]>;
  mobileFilterConfig: IMobileFilterConfig;
  sortRowsConfig?: ISortConfig;
}

export function TableMobileFilters(props: ITableMobileFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [resetFilterConfig, setResetFilter] = React.useState({});
  const { isZeroElements, mobileFilterConfig, filters, sortRowsConfig, dimensionsConfig } = props;
  const { sort, direction } = sortRowsConfig;

  if (defined(mobileFilterConfig)) {
    const { filter, currentFilters } = mobileFilterConfig;
    resetFilterBy = {
      type: filter,
      filterValue: currentFilters[EHeaderIconType.CheckboxFilter] || [],
    };
  }

  const resetSortBy = { sort, direction };

  React.useEffect(() => {
    setResetFilter({ resetSortBy, resetFilterBy });
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <style jsx>{`
        button.filters {
          display: flex;
          align-items: center;
          flex-direction: row;
          background-color: #483afc;
          font-size: 14px;
          line-height: 16px;
          color: ${WHITE};
          padding: 8px;
          border-radius: 4px;
          margin-top: ${isZeroElements ? 0 : 24}px;
        }
        button.filters span {
          margin-right: 8px;
        }
        button.filters:active {
          background-color: ${HEADER_ICON_PURPLE};
        }
      `}</style>
      <>
        {isOpen &&
          ReactDOM.createPortal(
            <TableMobileModal
              resetFilterConfig={resetFilterConfig}
              dimensionsConfig={dimensionsConfig}
              filters={filters}
              mobileFilterConfig={mobileFilterConfig}
              sortRowsConfig={sortRowsConfig}
              onCloseModal={() => {
                setIsOpen(false);
                if (defined(window)) {
                  timeout = setTimeout(() => window.scrollTo(0, lastScrollY), 0);
                }
              }}
            />,
            document.body,
          )}
        <button
          className="filters"
          onClick={() => {
            setIsOpen(true);
            lastScrollY = bodyScroll();
          }}
        >
          <span>Filters</span>
          {ICON.Sliders}
        </button>
      </>
    </>
  );
}
