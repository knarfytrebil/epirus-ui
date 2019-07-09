import * as React from 'react';
import { isDesktop } from '../../utils';
import { DetailsDesktop } from './desktop';
import { IDetailsHighlightProps, INameValuePair, IOverviewContentProps } from '../../models';
import { DetailsMobile } from './mobile';
export const CARD_GAP = 24;

export interface IDetailsContentProps {
  breadcrumbs: INameValuePair[];
  width: number;
  overviewConfig: IOverviewContentProps;
  highlightConfig: IDetailsHighlightProps;
  table?: JSX.Element;
}

export function DetailsContent(props: IDetailsContentProps) {
  if (isDesktop(props.width)) {
    return <DetailsDesktop {...props} />;
  } else {
    return <DetailsMobile {...props} />;
  }
}

export * from './desktop';
export * from './mobile';
