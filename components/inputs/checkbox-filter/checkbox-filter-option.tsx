import * as React from 'react';
import { ICON } from '../../svg';
import { MOBILE_INPUT_GREY_TEXT, HI_BLUE, WHITE } from '../../../data';
import { IDictionary } from '../../../models';
import { DESKTOP_WIDTH, MOBILE_INPUT_GREY_BOX } from '../../../style-config';

export interface ICheckboxFilterOptionProps {
  optionsLabelLookup?: IDictionary<string>;
  isChecked: boolean;
  label: string;
  option: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function CheckboxFilterOption(props: ICheckboxFilterOptionProps) {
  const { isChecked, option, label, onChange } = props;
  const id = `CheckboxFilterOption-${option}`;

  return (
    <>
      <style jsx>{`
        li.option:first-child label {
          padding: 16px 0 8px 16px;
        }
        li.option label {
          padding: 8px 0 8px 16px;
        }
        li.option:last-child label {
          padding: 8px 0 16px 16px;
        }
        label {
          position: relative;
          display: block;
          text-align: left;
          width: calc(100% - 16px);
          color: ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_TEXT};
          font-size: 14px;
          line-height: 18px;
          cursor: pointer;
        }
        input {
          display: none;
        }
        div.box {
          float: left;
          position: relative;
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
          margin-right: 16px;
          border: 1px solid ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_BOX};
          background-color: transparent;
          border-radius: 2px;
        }
        div.icon {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          color: ${WHITE};
          opacity: 0;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        li.option input:checked + div.box {
          background-color: ${HI_BLUE};
        }
        li.option input:checked + div.box div.icon {
          opacity: 1;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          li.option:first-child label {
            padding: 16px 0 0 0;
          }
          li.option label {
            padding: 12px 0 0 0;
          }
          li.option:last-child label {
            padding: 12px 0 0 0;
          }
          div.box {
            border: 2px solid ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_BOX};
            margin-right: 12px;
            border-radius: 4px;
          }
          label {
            line-height: 20px;
            width: 100%;
          }
        }
      `}</style>
      <li className="option">
        <label htmlFor={id}>
          {label}
          <input id={id} name={option} checked={isChecked} type="checkbox" onChange={onChange} />
          <div className="box">
            <div className="icon">{ICON.CheckCheckbox}</div>
          </div>
        </label>
      </li>
    </>
  );
}
