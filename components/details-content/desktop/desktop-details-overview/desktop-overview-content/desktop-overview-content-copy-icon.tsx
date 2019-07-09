import * as React from 'react';
import { RESET_CLIPBOARD_DELAY } from '../../../../../data';
import { ICON } from '../../../../svg';
import { CopyToClipboard, InteractiveButton } from '../../../../widgets';
import { ToolTip } from '../../../../tool-tip';
import { ISubtitleConfig } from '../../../../../models';
let timeout;

export interface IDesktopOverviewContentCopyIconProps {
  subtitleConfig: ISubtitleConfig;
}

export function DesktopOverviewContentCopyIcon(props: IDesktopOverviewContentCopyIconProps) {
  const [isCopiedTooltip, setCopyTooltip] = React.useState(false);
  const [isHovered, setHover] = React.useState(false);
  React.useEffect(() => () => clearTimeout(timeout), []);
  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentCopyIcon {
          position: relative;
          width: 32px;
          height: 32px;
          z-index: 1;
        }
      `}</style>
      <div
        className="DesktopOverviewContentCopyIcon"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CopyToClipboard
          contentToCopy={props.subtitleConfig.value}
          onClick={(isCopiedSuccess: boolean) => {
            setCopyTooltip(isCopiedSuccess);
            timeout = setTimeout(() => setCopyTooltip(false), RESET_CLIPBOARD_DELAY);
          }}
        >
          <InteractiveButton style={{ width: 32, height: 32, borderRadius: 16 }}>
            {ICON.Copy}
          </InteractiveButton>
        </CopyToClipboard>
        {(isCopiedTooltip || isHovered) && (
          <ToolTip style={{ marginTop: 12 }}>{isCopiedTooltip ? 'Copied!' : 'Copy?'}</ToolTip>
        )}
      </div>
    </>
  );
}
