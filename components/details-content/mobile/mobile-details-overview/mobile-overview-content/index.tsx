import * as React from 'react';
import { IOverviewContentProps } from '../../../../../models';
import { MobileAdditionalDetailsButton } from '../mobile-additional-details';
import { MobileOverviewInfo } from '../mobile-overview-info';
import { TypeTag } from '../../../../type-tags';
import { MobileOverviewContentTitle } from './mobile-overview-content-title';
import { defined } from '../../../../../utils';
import { MOBILE_LIGHT_GREY } from '../../../../../style-config';

export interface ITitleConfig {
  label: string;
  tag?: string;
}

export interface ISubtitleConfig {
  isNoCopyIcon?: boolean;
  value: string;
  label: string;
}

export function MobileOverviewContent(props: IOverviewContentProps) {
  const {
    isAdditionalDetailsOpen,
    titleConfig,
    subtitleConfig,
    info,
    additionalDetails,
    onAdditionalDetailsClick,
  } = props;
  const { tag } = titleConfig;
  return (
    <>
      <style jsx>{`
        div.tag {
          margin-top: 8px;
        }
        div.top {
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="top">
        <MobileOverviewContentTitle
          zIndex={info ? info.length + 2 : 1}
          subtitleConfig={subtitleConfig}
        />
        {defined(tag) && (
          <div className="tag">
            <TypeTag tagType={tag} />
          </div>
        )}
      </div>
      {defined(info) && <MobileOverviewInfo info={info} />}
      {additionalDetails && (
        <MobileAdditionalDetailsButton
          isAdditionalDetailsOpen={isAdditionalDetailsOpen}
          onClick={onAdditionalDetailsClick}
        />
      )}
    </>
  );
}
