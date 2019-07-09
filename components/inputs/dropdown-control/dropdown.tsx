import * as React from 'react';
import { ACTIVE_BUTTON_GREY } from '../../../data';
import { IDropdownControlProps } from './index';
import { DESKTOP_WIDTH, HOVER_BUTTON_GREY, MOBILE_TEXT } from '../../../style-config';

export interface IDropdownProps extends IDropdownControlProps {
  onClose(): void;
}

export function Dropdown(props: IDropdownProps) {
  const { options, onChange, onClose } = props;
  const handleWindowClick = () => {
    onClose();
  };
  React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);
  const handleChange = (option: string) => {
    onChange({
      label: option,
      value: option,
    });
    onClose();
  };
  return (
    <>
      <style jsx>{`
        ul.Dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          list-style-type: none;
          background-color: #fff;
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 0 8px 0 rgba(0, 0, 0, 0.05);
          padding: 8px 0;
          width: 112px;
        }
        li {
          display: flex;
          align-items: center;
          height: 33px;
          padding: 0 16px;
        }
        li:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        li:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          li {
            height: 32px;
          }
          li:hover {
            background-color: ${ACTIVE_BUTTON_GREY};
          }
        }
      `}</style>
      <ul className="Dropdown" onClick={(e) => e.stopPropagation()}>
        {options.map((option: string) => (
          <li
            key={option}
            onMouseUp={() => handleChange(option)}
            onTouchEnd={() => handleChange(option)}
            onTouchCancel={() => handleChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </>
  );
}
