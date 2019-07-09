import * as React from 'react';
import { ICON } from '../../../../svg';
import { CopyToClipboard, InteractiveButton } from '../../../../widgets';
import { ToolTip } from '../../../../tool-tip';
import { ISubtitleConfig } from '.';
import { RESET_CLIPBOARD_DELAY } from '../../../../../style-config';
let timeout;

export interface IMobileOverviewContentCopyIconProps {
  subtitleConfig: ISubtitleConfig;
}

export function MobileOverviewContentCopyIcon(props: IMobileOverviewContentCopyIconProps) {
  const [isCopiedTooltip, setCopyTooltip] = React.useState(false);
  React.useEffect(() => () => clearTimeout(timeout), []);
  return (
    <>
      <style jsx>{`
        div.MobileOverviewContentCopyIcon {
          position: relative;
          width: 34px;
          height: 34px;
          z-index: 1;
        }
      `}</style>
      <div className="MobileOverviewContentCopyIcon">
        <CopyToClipboard
          contentToCopy={props.subtitleConfig.value}
          onClick={(isCopiedSuccess: boolean) => {
            setCopyTooltip(isCopiedSuccess);
            timeout = setTimeout(() => setCopyTooltip(false), RESET_CLIPBOARD_DELAY);
          }}
        >
          <InteractiveButton style={{ width: 34, height: 34, borderRadius: 17 }}>
            {ICON.Copy}
          </InteractiveButton>
        </CopyToClipboard>
        {isCopiedTooltip && (
          <ToolTip style={{ marginTop: 12, display: 'inline-flex' }}>Copied!</ToolTip>
        )}
      </div>
    </>
  );
}
