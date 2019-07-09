import * as React from 'react';
import { DesktopAdditionalDetailsButton } from '../desktop-additional-details';
import { DesktopOverviewInfo } from '../desktop-overview-info';
import { DARK_PURPLE } from '../../../../../data';
import { TypeTag } from '../../../../type-tags';
import { DesktopOverviewContentSubtitle } from './desktop-overview-content-subtitle';
import { IOverviewContentProps } from '../../../../../models';

export function DesktopOverviewContent(props: IOverviewContentProps) {
  const {
    isAdditionalDetailsOpen,
    titleConfig,
    subtitleConfig,
    info,
    additionalDetails,
    onAdditionalDetailsClick,
  } = props;
  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContent {
          display: flex;
          align-items: center;
          color: ${DARK_PURPLE};
          font-size: 22px;
          line-height: 26px;
          height: 26px;
        }
        div.DesktopOverviewContent span {
          margin-right: ${titleConfig.tag ? 20 : 0}px;
        }
      `}</style>
      <>
        <div className="DesktopOverviewContent">
          <span>{titleConfig.label}</span>
          {titleConfig.tag && <TypeTag tagType={titleConfig.tag} />}
        </div>
        <DesktopOverviewContentSubtitle
          zIndex={info ? info.length + 2 : 1}
          subtitleConfig={subtitleConfig}
        />
        {info && <DesktopOverviewInfo info={info} />}
        {additionalDetails && (
          <DesktopAdditionalDetailsButton
            isAdditionalDetailsOpen={isAdditionalDetailsOpen}
            onClick={onAdditionalDetailsClick}
          />
        )}
      </>
    </>
  );
}
