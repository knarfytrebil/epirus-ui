import { ESyncStatus } from '../models';

export const INDICATOR_COLOR_LOOKUP = {
  [ESyncStatus.DOWN]: '#F95E45',
  [ESyncStatus.SYNCING]: '#F8D755',
  [ESyncStatus.UP]: '#04D238',
};
