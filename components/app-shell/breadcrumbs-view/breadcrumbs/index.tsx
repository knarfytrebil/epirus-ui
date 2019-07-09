import * as React from 'react';
import Link from 'next/link';
import { ACTIVE_BUTTON_GREY, GREY, HOVER_BUTTON_GREY, LIGHT_GREY_SLASH } from '../../../../data';
import { INameValuePair } from '../../../../models';
import { defined } from '../../../../utils';
export const TABLE_BREADCRUMBS_HEIGHT = 60;

export interface IBreadcrumbsProps {
  breadcrumbs: INameValuePair[];
}

export function Breadcrumbs(props: IBreadcrumbsProps) {
  return (
    <>
      <style jsx>{`
        div.Breadcrumbs {
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 34px;
          width: calc(100% - 68px);
          height: 60px;
        }
        a.text,
        span.text,
        span.slash {
          color: ${GREY};
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          padding: 0 8px;
        }
        a.text {
          display: inline-block;
        }
        a.text:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        a.text:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
        span:last-child {
          margin-right: 0;
        }
        span.slash {
          padding: 0;
          color: ${LIGHT_GREY_SLASH};
          margin: 0 4px;
        }
      `}</style>
      <div className="Breadcrumbs">
        {props.breadcrumbs.map((crumb: INameValuePair, i: number) => {
          const slash = i === 0 ? null : <span className="slash">/</span>;
          return (
            <React.Fragment key={`${crumb.name} ${i}`}>
              {slash}
              {defined(crumb.value) ? (
                <Link key={`${crumb.name} ${i}`} href={crumb.value}>
                  <a className="text">{crumb.name}</a>
                </Link>
              ) : (
                <span key={`${crumb.name} ${i}`} className="text">
                  {crumb.name}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
