import * as React from 'react';
import * as Clipboard from 'clipboard';
let ref, clipboard;

export interface ICopyToClipboardProps {
  contentToCopy: string;
  onClick(isSuccess: boolean): void;
  children: JSX.Element;
}

export function CopyToClipboard(props: ICopyToClipboardProps) {
  const { contentToCopy, children, onClick } = props;

  const handleRef = (el) => {
    if (el) {
      ref = el;
    }
  };

  React.useEffect(() => {
    clipboard = new Clipboard(ref);
    clipboard.on('success', () => onClick(true));
    clipboard.on('error', () => onClick(false));
    return () => clipboard.destroy();
  }, []);

  return (
    <button ref={handleRef} data-clipboard-text={contentToCopy}>
      {children}
    </button>
  );
}
