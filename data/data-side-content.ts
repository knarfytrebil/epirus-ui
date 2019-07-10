import { IMenuItem, EIconType } from '../models';

export const ITEMS_MAIN: IMenuItem[] = [
  {
    name: 'Monitor',
    iconType: EIconType.Contracts,
  },
  {
    name: 'Contracts',
    iconType: EIconType.Contracts,
  },
  {
    name: 'Tokens',
    iconType: EIconType.Tokens,
    isPaid: true,
  },
  {
    name: 'Transactions',
    iconType: EIconType.Transactions,
  },
  {
    name: 'Blocks',
    iconType: EIconType.Blocks,
  },
].filter(
  (x) => x.isPaid === undefined || x.isPaid === (process.env.ENABLE_PAID_FEATURES === 'enabled'),
);

export const MENU_SIDE_DESKTOP_ITEMS_TOP: IMenuItem[] = ITEMS_MAIN;

export const MENU_SIDE_DESKTOP_ITEMS_BOTTOM: IMenuItem[] = [];

/*[
  {
    name: 'Contact / Support',
    iconType: EIconType.Support,
    externalPath: 'mailto:hi@web3labs.com',
  },
  {
    name: 'Web3 Labs',
    iconType: EIconType.Web,
    externalPath: 'https://www.web3labs.com',
  },
];*/

export const MENU_SIDE_MOBILE_ITEMS_TOP: IMenuItem[] = [
  ...ITEMS_MAIN,
  {
    name: 'Profile',
    iconType: EIconType.Profile,
  },
];
