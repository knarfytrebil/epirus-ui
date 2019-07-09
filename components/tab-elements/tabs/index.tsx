import * as React from 'react';
import { Tab } from './tab';
import { DESKTOP_WIDTH, MAIN_TABLE_PADDING } from '../../../style-config';

export interface ITabsProps {
  activeIndex: number;
  items: string[];
  onSelectTab(index: number): void;
}

export function Tabs(props: ITabsProps) {
  const { activeIndex, items, onSelectTab } = props;
  return (
    <>
      <style jsx>{`
        div.Tabs {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          position: relative;
          left: -${MAIN_TABLE_PADDING}px;
          top: -${MAIN_TABLE_PADDING}px;
          height: 62px;
          width: calc(100% + ${MAIN_TABLE_PADDING * 2}px);
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.Tabs {
            left: 0;
            top: 0;
            height: 48px;
            width: 100%;
          }
        }
      `}</style>
      <div className="Tabs">
        {items.map((item: string, index: number) => (
          <Tab key={item} isActive={activeIndex === index} onClick={() => onSelectTab(index)}>
            {item}
          </Tab>
        ))}
      </div>
    </>
  );
}
