import * as React from 'react';
import { IDropdownOption } from '../../../models';
import { Dropdown } from './dropdown';
import { ICON } from '../../svg';
import { DESKTOP_WIDTH, GREY, MOBILE_TEXT, TEXT_GREY_LIGHT } from '../../../style-config';

export interface IDropdownControlProps {
  options: string[];
  value: string;
  onChange(option: IDropdownOption): void;
}

export function DropdownControl(props: IDropdownControlProps) {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <style jsx>{`
        button.DropdownControl {
          display: flex;
          align-items: center;
          flex-direction: row;
          color: ${GREY};
        }
        div.placeholder {
          color: inherit;
          font-size: 14px;
          line-height: 22px;
          border: none;
          background-color: transparent;
          margin-right: 4px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          button.DropdownControl {
            color: ${MOBILE_TEXT};
          }
          div.placeholder {
            line-height: 16px;
            margin-right: 5px;
          }
        }
      `}</style>
      <button className="DropdownControl" onClick={() => setOpen(!isOpen)}>
        <div className="placeholder">{props.value.toString()}</div>
        {isOpen ? ICON.CaretUp : ICON.CaretDown}
      </button>
      {isOpen && <Dropdown {...props} onClose={() => setOpen(false)} />}
    </>
  );
}
