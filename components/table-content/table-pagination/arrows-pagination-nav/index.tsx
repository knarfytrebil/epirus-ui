import * as React from 'react';
import { ICON } from '../../../svg';
import { InteractiveButton } from '../../../widgets';
import { DESKTOP_WIDTH, MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../../style-config';

export interface IArrowsPaginationNavProps {
  totalPages: number;
  currentPage: number;
  onPageNumberChange(page: number): void;
}

export function ArrowsPaginationNav(props: IArrowsPaginationNavProps) {
  const { totalPages, currentPage, onPageNumberChange } = props;
  const min = 0;
  const max = totalPages - 1;

  return (
    <>
      <style jsx>{`
        nav.ArrowsPaginationNav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          height: 44px;
        }
        div.group {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        div.group:first-child {
          margin-right: 12px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          nav.ArrowsPaginationNav {
            height: 16px;
          }
        }
      `}</style>
      <nav className="ArrowsPaginationNav">
        <div className="group">
          <InteractiveButton
            isDisabled={currentPage === min}
            onClick={() => onPageNumberChange(min)}
          >
            {ICON.DoubleChevronLeft}
          </InteractiveButton>
          <InteractiveButton
            isDisabled={currentPage === min}
            onClick={() => onPageNumberChange(Math.max(min, currentPage - 1))}
          >
            {ICON.ChevronLeft}
          </InteractiveButton>
        </div>
        <div className="group">
          <InteractiveButton
            isDisabled={currentPage === max}
            onClick={() => onPageNumberChange(Math.min(max, currentPage + 1))}
          >
            {ICON.ChevronRight}
          </InteractiveButton>
          <InteractiveButton
            isDisabled={currentPage === max}
            onClick={() => onPageNumberChange(max)}
          >
            {ICON.DoubleChevronRight}
          </InteractiveButton>
        </div>
      </nav>
    </>
  );
}
