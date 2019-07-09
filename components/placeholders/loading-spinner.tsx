import * as React from 'react';
import { defined } from '../../utils';
import { HI_BLUE, LO_PURPLE } from '../../data';
import { MAIN_TABLE_PADDING, PURPLE_WHITE, WHITE } from '../../style-config';

export interface ILoadingSpinnerColor {
  circle: string;
  path: string;
}

export enum ELoadingSpinnerType {
  White = 'White',
}

function colorLookUp(type?: ELoadingSpinnerType): ILoadingSpinnerColor {
  switch (type) {
    default:
      return {
        circle: LO_PURPLE,
        path: HI_BLUE,
      };
    case ELoadingSpinnerType.White:
      return {
        circle: WHITE,
        path: PURPLE_WHITE,
      };
  }
}

export interface ILoadingSpinnerProps {
  type?: ELoadingSpinnerType;
  style?: React.CSSProperties;
}

export function LoadingSpinner(props: ILoadingSpinnerProps) {
  const { style, type } = props;
  const inlineStyle = defined(style) ? style : null;
  return (
    <svg
      width={MAIN_TABLE_PADDING}
      height={MAIN_TABLE_PADDING}
      style={inlineStyle}
      viewBox="-1 -1 22 22"
      fill="none"
    >
      <circle
        cx="10"
        cy="10"
        r="10"
        stroke={colorLookUp(type).circle}
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0"
        stroke={colorLookUp(type).path}
        strokeWidth="2"
        strokeMiterlimit="5.75877"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 10 10"
          to="360 10 10"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
