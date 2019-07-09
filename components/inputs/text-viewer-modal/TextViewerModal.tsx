import * as React from 'react';
import {
  DARK_PURPLE,
  LIGHT_PURPLE_TEXT,
  RESET_CLIPBOARD_DELAY,
  TEXTBOX_BACKGROUND,
  TEXTBOX_BORDER,
  WHITE,
} from '../../../data';
import { DESKTOP_WIDTH, MOBILE_GREY_TEXT, MOBILE_TEXT } from '../../../style-config';
import { CopyToClipboard } from '../../widgets';
let timeout;

export interface ITextViewerModalProps {
  title: string;
  children: string;
  onOkClick(): void;
}
export function TextViewerModal(props: ITextViewerModalProps) {
  const [message, setMessage] = React.useState('Copy');
  const { title, children, onOkClick } = props;
  const handleWindowClick = () => {
    onOkClick();
  };
  React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <style jsx>{`
        div.TextViewerModal {
          position: absolute;
          left: 50%;
          top: 50%;
          background-color: ${WHITE};
          box-shadow: 0 2px 15px 0 rgba(50, 64, 77, 0.25);
          min-width: 431px;
          min-height: 232px;
          transform: translate(-50%, -50%);
          z-index: 4;
        }
        h2.title {
          font-size: 14px;
          line-height: 17px;
          padding: 12px 16px;
          color: ${DARK_PURPLE};
        }
        textarea {
          margin: 0 16px;
          color: #77838f;
          background: ${TEXTBOX_BACKGROUND};
          min-width: 365px;
          min-height: 111px;
          padding: 16px;
          border: 1px solid ${TEXTBOX_BORDER};
          border-radius: 4px;
        }
        div.controls {
          display: flex;
          justify-content: space-between;
        }
        div.controls button,
        div.copy {
          padding: 12px 16px;
          font-size: 14px;
          line-height: 22px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TextViewerModal {
            position: fixed;
            min-width: 278px;
            min-height: 255px;
          }
          h2.title {
            padding: 16px;
            line-height: 20px;
            color: ${MOBILE_TEXT};
          }
          textarea {
            display: block;
            min-width: 214px;
            min-height: 134px;
            font-size: 12px;
            line-height: 20px;
            resize: none;
          }
          div.controls button,
          div.copy {
            padding: 16px;
            line-height: 16px;
          }
        }
      `}</style>
      <div className="TextViewerModal" onClick={(e) => e.stopPropagation()}>
        <h2 className="title">{title}</h2>
        <textarea readOnly value={children} />
        <div className="controls">
          <CopyToClipboard
            contentToCopy={children}
            onClick={(isCopiedSuccess: boolean) => {
              setMessage(isCopiedSuccess ? 'Copied!' : 'Copy to clipboard not supported');
              timeout = setTimeout(() => setMessage('Copy'), RESET_CLIPBOARD_DELAY);
            }}
          >
            <div className="copy --text-link">{message}</div>
          </CopyToClipboard>
          <button className="--text-link" onClick={onOkClick}>
            Ok
          </button>
        </div>
      </div>
    </>
  );
}
