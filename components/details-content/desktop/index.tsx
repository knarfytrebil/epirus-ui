import * as React from 'react';
import { DesktopDetailsTable } from './desktop-details-table';
import { DesktopDetailsOverview } from './desktop-details-overview';
import { BreadcrumbsView } from '../../app-shell/breadcrumbs-view';
import { IDetailsContentProps } from '..';
import { defined } from '../../../utils';
import { DesktopDetailsHighlight } from './desktop-details-highlight';
export const CARD_GAP = 24;

export type IDetailsDesktopProps = IDetailsContentProps;

export function DetailsDesktop(props: IDetailsDesktopProps) {
  const { breadcrumbs, overviewConfig, highlightConfig, table } = props;
  const isHighlight = defined(highlightConfig);
  return (
    <>
      <style jsx>{`
        div.DetailsDesktop {
          width: 100%;
          padding-bottom: 10px;
        }
        div.row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      `}</style>
      <BreadcrumbsView breadcrumbs={breadcrumbs}>
        <div className="DetailsDesktop">
          <div className="row">
            <DesktopDetailsOverview isHighlight={isHighlight} config={overviewConfig} />
            {isHighlight && <DesktopDetailsHighlight {...highlightConfig} />}
          </div>
          {table && <DesktopDetailsTable>{table}</DesktopDetailsTable>}
        </div>
      </BreadcrumbsView>
    </>
  );
}

export * from './desktop-details-overview';
export * from './desktop-details-highlight';
export * from './desktop-details-table/index';
