import * as React from 'react';
import { WHITE } from '../../../../data';
import { ICON } from '../../../svg';
import { TextTruncate } from '../../../text-truncate';

export interface IAccountInfoControlProps {
  name: string;
  isOpen: boolean;
  onClick(): void;
}

export function AccountInfoControl(props: IAccountInfoControlProps) {
  const { name, onClick, isOpen } = props;

  return (
    <>
      <style jsx>{`
        button.control {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
        div.name {
          font-size: 14px;
          line-height: 19px;
          margin-right: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: ${WHITE};
        }
        div.icon {
          color: ${WHITE};
        }
      `}</style>
      <button className="control" onClick={onClick}>
        <div className="name">
          <TextTruncate>{name}</TextTruncate>
        </div>
        <div className="icon">{isOpen ? ICON.ChevronUp : ICON.ChevronDown}</div>
      </button>
    </>
  );
}
