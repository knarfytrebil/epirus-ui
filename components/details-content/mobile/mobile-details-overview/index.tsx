import * as React from 'react';
import * as classNames from 'classnames';
import { MobileAdditionalDetails } from './mobile-additional-details';
import { MobileOverviewContent } from './mobile-overview-content';
import { MOBILE_LIGHT_GREY } from '../../../../style-config';
import { IOverviewContentProps } from '../../../../models';

export interface IMobileDetailsOverviewProps {
  config: IOverviewContentProps;
}

export function MobileDetailsOverview(props: IMobileDetailsOverviewProps) {
  const [isAdditionalDetailsOpen, setAdditionalDetailsOpen] = React.useState(false);
  const handleOpenAdditionalDetails = () => setAdditionalDetailsOpen(!isAdditionalDetailsOpen);
  return (
    <>
      <style jsx>{`
        div.MobileDetailsOverview {
          position: relative;
        }
        div.additionalDetails {
          position: relative;
          padding-top: 0;
          margin-top: 30px;
          border-top: none;
        }
        div.additionalDetails.isAdditionalDetailsOpen {
          padding-top: 24px;
          margin-top: 24px;
          border-top: 1px solid ${MOBILE_LIGHT_GREY};
        }
      `}</style>
      <div className="MobileDetailsOverview">
        <MobileOverviewContent
          {...props.config}
          isAdditionalDetailsOpen={isAdditionalDetailsOpen}
          onAdditionalDetailsClick={handleOpenAdditionalDetails}
        />
        {isAdditionalDetailsOpen && (
          <div
            className={classNames('additionalDetails', {
              isAdditionalDetailsOpen: isAdditionalDetailsOpen,
            })}
          >
            <MobileAdditionalDetails config={props.config.additionalDetails} />
          </div>
        )}
      </div>
    </>
  );
}

export * from './mobile-additional-details';
export * from './mobile-overview-content';
export * from './mobile-overview-info';
