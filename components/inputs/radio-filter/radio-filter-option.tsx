import * as React from 'react';
import { ICON } from '../../svg';
import { MOBILE_INPUT_GREY_TEXT } from '../../../data/index';
import { ACTIVE_BUTTON_GREY, HOVER_BUTTON_GREY } from '../../../data';

export interface IRadioFilterOptionProps {
  isChecked: boolean;
  option: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function RadioFilterOption(props: IRadioFilterOptionProps) {
  const { isChecked, option, onChange } = props;
  const id = `RadioFilterOption-${option}`;

  return (
    <>
      <style jsx>{`
        li.option label {
          padding: 16px;
        }
        label {
          position: relative;
          display: block;
          text-align: left;
          width: calc(100% - 32px);
          color: ${MOBILE_INPUT_GREY_TEXT};
          font-size: 14px;
          line-height: 17px;
          cursor: pointer;
        }
        input {
          display: none;
        }
        div.box {
          float: right;
          position: relative;
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
        }
        div.icon {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          color: ${MOBILE_INPUT_GREY_TEXT};
          opacity: 0;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        li.option input:checked + div.box div.icon {
          opacity: 1;
        }
        li.option label:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        li.option label:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
      `}</style>
      <li className="option">
        <label htmlFor={id}>
          <input id={id} name={option} checked={isChecked} type="checkbox" onChange={onChange} />
          <div className="box">
            <div className="icon">{ICON.CheckRadio}</div>
          </div>
          {option}
        </label>
      </li>
    </>
  );
}
