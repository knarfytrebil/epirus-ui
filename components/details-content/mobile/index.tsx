import * as React from 'react';
import { MobileDetailsOverview } from './mobile-details-overview';
import { MobileDetailsTable } from './mobile-details-table';
import { MobileDetailsHighlight } from './mobile-details-highlight';
import { IDetailsContentProps } from '../index';
import { defined } from '../../../utils';

export type IMobileDetailsMobileProps = IDetailsContentProps;

export function DetailsMobile(props: IMobileDetailsMobileProps) {
  const { overviewConfig, highlightConfig, table } = props;
  const isHighlight = defined(highlightConfig);
  return (
    <>
      <style jsx>{`
        div.DetailsMobile {
          width: 100%;
          margin-top: 42px;
        }
      `}</style>
      <div className="DetailsMobile">
        <MobileDetailsOverview config={overviewConfig} />
        {isHighlight && <MobileDetailsHighlight {...highlightConfig} />}
        {table && <MobileDetailsTable>{table}</MobileDetailsTable>}
      </div>
    </>
  );
}

export * from './mobile-details-overview';
export * from './mobile-details-highlight';
export * from './mobile-details-table';
