import * as React from 'react';
import { THREE_DOTS } from './paths';

export const BUTTONS = {
  Plus: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 3C9.41421 3 9.75 3.33579 9.75 3.75V14.25C9.75 14.6642 9.41421 15 9 15C8.58579 15 8.25 14.6642 8.25 14.25V3.75C8.25 3.33579 8.58579 3 9 3Z"
        fill="currentColor"
      />
      <path
        d="M3 9C3 8.58579 3.33579 8.25 3.75 8.25H14.25C14.6642 8.25 15 8.58579 15 9C15 9.41421 14.6642 9.75 14.25 9.75H3.75C3.33579 9.75 3 9.41421 3 9Z"
        fill="currentColor"
      />
    </svg>
  ),
  ThreeDots: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={THREE_DOTS} fill="currentColor" />
    </svg>
  ),
  Tick: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ErrorCross: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};
