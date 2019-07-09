import * as React from 'react';
import { CARD_GAP } from '..';
import { LIGHT_GREY } from '../../../../data';
import { CardView } from '../../..';
import { MAIN_TABLE_PADDING } from '../../../../style-config';
import { DesktopOverviewContent } from './desktop-overview-content';
import { DesktopAdditionalDetails } from './desktop-additional-details';
import { IOverviewContentProps } from '../../../../models';

export interface IDesktopDetailsOverviewProps {
  isHighlight: boolean;
  config: IOverviewContentProps;
}

export function DesktopDetailsOverview(props: IDesktopDetailsOverviewProps) {
  const [isAdditionalDetailsOpen, setAdditionalDetailsOpen] = React.useState(false);
  const handleOpenAdditionalDetails = () => setAdditionalDetailsOpen(!isAdditionalDetailsOpen);
  const width = props.isHighlight ? `calc(60% - ${CARD_GAP * 0.5}px)` : '100%';
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsOverview {
          position: relative;
          width: ${width};
          z-index: 1;
        }
        div.additionalDetails {
          position: relative;
          padding-top: ${MAIN_TABLE_PADDING}px;
          margin-top: ${MAIN_TABLE_PADDING}px;
        }
        div.line {
          position: absolute;
          left: -${MAIN_TABLE_PADDING}px;
          top: 0;
          width: calc(100% + ${MAIN_TABLE_PADDING * 2}px);
          height: 1px;
          background-color: ${LIGHT_GREY};
        }
      `}</style>
      <div className="DesktopDetailsOverview">
        <CardView>
          <DesktopOverviewContent
            {...props.config}
            isAdditionalDetailsOpen={isAdditionalDetailsOpen}
            onAdditionalDetailsClick={handleOpenAdditionalDetails}
          />
          {isAdditionalDetailsOpen && (
            <div className="additionalDetails">
              <div className="line" />
              <DesktopAdditionalDetails config={props.config.additionalDetails} />
            </div>
          )}
        </CardView>
      </div>
    </>
  );
}

export * from './desktop-additional-details';
export * from './desktop-overview-content';
export * from './desktop-overview-info';
