import * as React from 'react';
import { RouterProps } from 'next-server/router';
import { ITabItem } from '../../models';
import { Tabs } from './tabs';
import { bodyScroll, defined, findArrayIndex } from '../../utils';
import { BOTTOM_MENU_GREY, DESKTOP_WIDTH } from '../../style-config';

export interface ITabElementsProps {
  tabItems: ITabItem[];
  router: RouterProps;
}

export interface ITabElementsState {
  activeIndex: number;
}

export class TabElements extends React.Component<ITabElementsProps, ITabElementsState> {
  lastScrollY;
  timeout;
  constructor(props: ITabElementsProps, context?: any) {
    super(props, context);
    this.state = this.resolveInitTab();
  }

  public componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  private tabNames = () =>
    this.props.tabItems.map((tabItem: ITabItem) => tabItem.name.toLowerCase());

  private resolveInitTab = () => {
    let activeIndex = 0;
    const tabUrl = this.props.router.query.tab;
    const index = findArrayIndex(this.tabNames(), (tabName: string) => tabName === tabUrl);
    if (index > -1) {
      activeIndex = index;
    } else {
      activeIndex = 0;
    }
    return { activeIndex };
  };

  private handleSelectTab = (activeIndex: number) => {
    this.lastScrollY = bodyScroll();
    this.setState({ activeIndex }, () => {
      if (defined(window)) {
        this.timeout = setTimeout(() => window.scrollTo(0, this.lastScrollY), 0);
      }
    });
  };

  public render() {
    const { activeIndex } = this.state;
    const { tabItems } = this.props;

    return (
      <>
        <style jsx>{`
          div.TabElements {
            min-height: 100%;
            width: 100%;
          }
          @media (max-width: ${DESKTOP_WIDTH}px) {
            div.TabElements {
              min-height: 100vh;
            }
          }
        `}</style>
        <div className="TabElements">
          <Tabs
            activeIndex={activeIndex}
            items={tabItems.map((item: ITabItem) => item.name)}
            onSelectTab={this.handleSelectTab}
          />
          {tabItems[activeIndex].element}
        </div>
      </>
    );
  }
}

export * from './tabs';
