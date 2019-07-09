import * as React from 'react';
import { ISubtitleConfig } from './index';
import { MobileOverviewContentCopyIcon } from './mobile-overview-content-copy-icon';
import { TextTruncate } from '../../../../text-truncate';
import { FONT_WEIGHT_TITLE } from '../../../../../style-config';

export interface IMobileOverviewContentTitleProps {
  zIndex: number;
  subtitleConfig: ISubtitleConfig;
}

export function MobileOverviewContentTitle(props: IMobileOverviewContentTitleProps) {
  const { subtitleConfig, zIndex } = props;
  return (
    <>
      <style jsx>{`
        div.MobileOverviewContentTitle {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
          z-index: ${zIndex};
        }
        div.label {
          font-size: 24px;
          line-height: 28px;
          margin-right: 12px;
          max-width: 100%;
        }
      `}</style>
      <div className="MobileOverviewContentTitle">
        <div className="label">
          <TextTruncate isToolTipDisabled>{subtitleConfig.label}</TextTruncate>
        </div>
        {!subtitleConfig.isNoCopyIcon && (
          <MobileOverviewContentCopyIcon subtitleConfig={subtitleConfig} />
        )}
      </div>
    </>
  );
}
