import * as React from 'react';
import { LIGHT_PURPLE_TEXT, RESET_CLIPBOARD_DELAY } from '../../../data';
import { ToolTip } from '../index';
import { ICON } from '../../svg';
import { CopyToClipboard } from '../../widgets';
let timeout;

export interface IToolTipCopyButtonProps {
  contentToCopy: string;
}

export function ToolTipCopyButton(props: IToolTipCopyButtonProps) {
  const [isCopied, setIsCopied] = React.useState(null);

  React.useEffect(() => () => clearTimeout(timeout), []);

  return (
    <>
      <style jsx>{`
        div.icon {
          margin-right: 10px;
          color: ${LIGHT_PURPLE_TEXT};
        }
      `}</style>
      <ToolTip>
        <>
          <CopyToClipboard
            contentToCopy={props.contentToCopy}
            onClick={(isSuccessful: boolean) => {
              setIsCopied(isSuccessful);
              timeout = setTimeout(() => setIsCopied(false), RESET_CLIPBOARD_DELAY);
            }}
          >
            <div className="icon">{isCopied ? ICON.CheckToolTip : ICON.CopyToolTip}</div>
          </CopyToClipboard>
          {props.contentToCopy}
        </>
      </ToolTip>
    </>
  );
}
