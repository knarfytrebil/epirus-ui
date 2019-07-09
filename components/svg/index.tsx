import * as React from 'react';
import { AVATAR_1, AVATAR_2, COG_PATH, QR_CODE_PATH } from './paths';
import { SIDE_MENU_BOTTOM } from './side-menu-bottom';
import { SIDE_MENU_TOP } from './side-menu-top';
import { SPECIAL_PURPOSE } from './special-purpose';
import { FILTERS } from './filters';
import { TOOLTIP } from './tooltip';
import { ARROWS } from './arrows';
import { INPUTS } from './inputs';
import { IDictionary } from '../../models';
import { BUTTONS } from './buttons';
import { LOGO } from './branding';

export const ICON: IDictionary<JSX.Element> = {
  ...BUTTONS,
  ...FILTERS,
  ...SPECIAL_PURPOSE,
  ...SIDE_MENU_TOP,
  ...SIDE_MENU_BOTTOM,
  ...TOOLTIP,
  ...ARROWS,
  ...INPUTS,
  Logo: LOGO,
  Avatar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#DDDDDD" />
      <path fillRule="evenodd" clipRule="evenodd" d={AVATAR_1} fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d={AVATAR_2} fill="white" />
    </svg>
  ),
  AvatarLarge: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#DDDDDD" />
      <path fillRule="evenodd" clipRule="evenodd" d={AVATAR_1} fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d={AVATAR_2} fill="white" />
    </svg>
  ),
  Cog: (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={COG_PATH} fill="#483AFC" />
    </svg>
  ),
  QrCode: (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d={QR_CODE_PATH} />
    </svg>
  ),
  Copy: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Cross: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Search: (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Lock: (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  ContractSmallIcon: (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
};
