import { TABLE_BREADCRUMBS_HEIGHT } from '../components';
import { HEADER_HEIGHT } from '../data';
import { IDimensions } from '../models';
import { MAIN_TABLE_PADDING } from '../style-config';

export const containerHeight = (dimensionsConfig: IDimensions) =>
  dimensionsConfig.height - HEADER_HEIGHT;
export const tableHeight = (dimensionsConfig: IDimensions) =>
  dimensionsConfig.height - HEADER_HEIGHT - MAIN_TABLE_PADDING * 2 - TABLE_BREADCRUMBS_HEIGHT;

let width, height, isWidthResizing, isHeightResizing;

export const measureViewport = (): IDimensions => {
  const nextWidth = window.innerWidth;
  const nextHeight = window.innerHeight;
  isWidthResizing = nextWidth !== width;
  isHeightResizing = nextHeight !== height;
  width = nextWidth;
  height = nextHeight;
  const heightScreen = window.screen.height;
  // document.body.style.height = `${nextHeight}px`; // This is to keep body size of viewport so mobile menus change page size
  return { width, height, heightScreen, isWidthResizing, isHeightResizing };
};
