import * as React from 'react';
import { ICON } from '../../../../../svg';
import { DESKTOP_WIDTH, MOBILE_GREY_TEXT } from '../../../../../../style-config';
import { ROW_HEIGHT } from '../../../../../table-content';
import { MetadataOptionsMenu } from './metadata-options-menu';
import { IMetadataOption } from '../../../../../../models';

export interface IMetadataOptionsButtonProps {
  options: IMetadataOption[];
}

export function MetadataOptionsButton(props: IMetadataOptionsButtonProps) {
  const [isOpen, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);
  return (
    <>
      <style jsx>{`
        div.MetadataOptionsButton {
          display: block;
          position: relative;
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${ROW_HEIGHT}px;
          height: ${ROW_HEIGHT}px;
          color: ${MOBILE_GREY_TEXT};
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.MetadataOptionsButton {
            display: none;
          }
        }
      `}</style>
      <div className="MetadataOptionsButton" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(!isOpen)}>{ICON.ThreeDots}</button>
        {isOpen && <MetadataOptionsMenu onClose={handleClose} options={props.options} />}
      </div>
    </>
  );
}
