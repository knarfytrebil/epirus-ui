import { IError, INameElementValue } from './index';
import * as React from 'react';

export interface IDetailsState<T> {
  errorFetching: any;
  isFetching: boolean;
  detailsFetch: Partial<T & IError>;
}

export enum EDetailsHighlightUnitType {
  Eth = 'ETH',
}

export interface ITitleConfig {
  label: string;
  tag?: string;
}

export interface ISubtitleConfig {
  isNoCopyIcon?: boolean;
  value: string;
  label: string;
}

export interface IDetailsHighlightProps {
  title: string;
  value: string;
  additionalDetailsLength?: number;
  style?: React.CSSProperties;
  unit?: EDetailsHighlightUnitType;
  tooltipContentToCopy?: string;
}

export interface IOverviewContentProps {
  titleConfig: ITitleConfig;
  subtitleConfig: ISubtitleConfig;
  info?: INameElementValue[][];
  additionalDetails?: INameElementValue[][];
  isAdditionalDetailsOpen?: boolean;
  onAdditionalDetailsClick?(): void;
}
