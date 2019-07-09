import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TextViewerModal } from './TextViewerModal';

export interface ITextViewerWrapperProps {
  title: string;
  children: string;
}
export function TextViewerWrapper(props: ITextViewerWrapperProps) {
  const [isOpen, toggleOpen] = React.useState(false);
  const { title, children } = props;
  return (
    <>
      <style jsx>{`
        button.toggle {
          font-size: 12px;
          line-height: 32px;
        }
      `}</style>
      <button className="toggle --text-link" onClick={() => toggleOpen(!isOpen)}>
        View
      </button>
      {isOpen &&
        ReactDOM.createPortal(
          <TextViewerModal title={title} onOkClick={() => toggleOpen(!isOpen)}>
            {children}
          </TextViewerModal>,
          document.body,
        )}
    </>
  );
}
