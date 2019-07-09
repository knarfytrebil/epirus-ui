import * as React from 'react';
import { DARK_PURPLE } from '../../../../../data';
import { DesktopOverviewContentCopyIcon } from './desktop-overview-content-copy-icon';
import { TextTruncate } from '../../../../text-truncate';
import { ISubtitleConfig } from '../../../../../models';

export interface IDesktopOverviewContentSubtitleProps {
  zIndex: number;
  subtitleConfig: ISubtitleConfig;
}

export function DesktopOverviewContentSubtitle(props: IDesktopOverviewContentSubtitleProps) {
  const { subtitleConfig, zIndex } = props;
  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentSubtitle {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 38px;
          height: 22px;
          z-index: ${zIndex};
        }
        div.label {
          color: ${DARK_PURPLE};
          font-size: 18px;
          line-height: 22px;
          margin-right: 16px;
          max-width: 100%;
        }
      `}</style>
      <div className="DesktopOverviewContentSubtitle">
        <div className="label">
          <TextTruncate isToolTipDisabled>{subtitleConfig.label}</TextTruncate>
        </div>
        {!subtitleConfig.isNoCopyIcon && (
          <DesktopOverviewContentCopyIcon subtitleConfig={subtitleConfig} />
        )}
      </div>
    </>
  );
}
