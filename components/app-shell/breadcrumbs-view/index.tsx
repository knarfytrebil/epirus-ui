import * as React from 'react';
import { Breadcrumbs } from './breadcrumbs';
import { INameValuePair } from '../../../models';

export interface IBreadcrumbsViewProps {
  breadcrumbs: INameValuePair[];
  children: JSX.Element | JSX.Element[];
}

export function BreadcrumbsView(props: IBreadcrumbsViewProps) {
  const { breadcrumbs, children } = props;

  return (
    <>
      <style jsx>{`
        div.BreadcrumbsView {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="BreadcrumbsView">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {children}
      </div>
    </>
  );
}

export * from './breadcrumbs';
