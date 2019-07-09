import * as React from 'react';
import { LIGHT_PURPLE_TEXT, RESET_CLIPBOARD_DELAY } from '../../../../../../data';
import { ToolTipCell } from '../cell-tool-tip';
import { defined, isString } from '../../../../../../utils';
import { ICON } from '../../../../../svg';
import { TextLink } from '../text-link';
import { ToolTip } from '../../../../../tool-tip';
import { TextOnly } from '../text-only';
import { ILinkConfig } from '../../../../../../models';
import { CopyToClipboard } from '../../../../../widgets';
let timeout;

export interface IToolTipCellCopyProps {
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  linkConfig?: ILinkConfig;
  contentToCopy: string;
  children: string | JSX.Element;
}

export function ToolTipCellCopy(props: IToolTipCellCopyProps) {
  const [isCopied, setIsCopied] = React.useState(null);
  const { style, textStyle, linkConfig, contentToCopy, children } = props;
  React.useEffect(() => () => clearTimeout(timeout), []);

  return (
    <>
      <style jsx>{`
        div.icon {
          margin-right: 10px;
          color: ${LIGHT_PURPLE_TEXT};
          cursor: pointer;
        }
      `}</style>
      <ToolTipCell
        style={style}
        toolTipContent={
          <ToolTip style={{ marginTop: 12 }}>
            <>
              <CopyToClipboard
                contentToCopy={contentToCopy}
                onClick={(isSuccess: boolean) => {
                  setIsCopied(isSuccess);
                  timeout = setTimeout(() => setIsCopied(false), RESET_CLIPBOARD_DELAY);
                }}
              >
                <div className="icon">{isCopied ? ICON.CheckToolTip : ICON.CopyToolTip}</div>
              </CopyToClipboard>
              {contentToCopy}
            </>
          </ToolTip>
        }
      >
        <>
          {defined(linkConfig) ? (
            <TextLink style={textStyle} {...linkConfig}>
              {children}
            </TextLink>
          ) : isString(children) ? (
            <TextOnly style={{ cursor: 'pointer' }}>{children as string}</TextOnly>
          ) : (
            children
          )}
        </>
      </ToolTipCell>
    </>
  );
}
