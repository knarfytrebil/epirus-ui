import * as React from 'react';
import { IMetadataOption } from '../../../../../../models';

export interface IMetadataOptionsMenuProps {
  options: IMetadataOption[];
  onClose(): void;
}

export function MetadataOptionsMenu(props: IMetadataOptionsMenuProps) {
  const { options, onClose } = props;
  return (
    <>
      <style jsx>{`
        div.MetadataOptionsMenu {
          position: absolute;
          right: 17px;
          top: calc(50% + 15px);
          min-width: 160px;
          background: #fff;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }
        ul {
          list-style-type: none;
        }
        li {
          padding: 16px 0;
        }
      `}</style>
      <div className="MetadataOptionsMenu">
        <ul>
          {options.map((option: IMetadataOption) => (
            <li key={option.name}>{React.cloneElement(option.component, { onClose })}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
