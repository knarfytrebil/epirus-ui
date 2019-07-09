import * as React from 'react';
import { withRouter } from 'next/router';
import { CustomHead } from './custom-head';
import { HeaderDesktop } from './header-desktop';
import { GLOBAL_STYLES } from './styles';
import { IDimensions, IUser, IUserProfile } from '../../models';
import { MenuSideDesktop } from './menu-side-desktop';
import { NoScript } from './no-script';
import { RouterProps } from 'next-server/router';
import { throttle, pathToName, defined, isDesktop, measureViewport } from '../../utils';
import { HEADER_HEIGHT, MIN_CONTENT_WIDTH, MENU_SIDE_DESKTOP_WIDTH } from '../../data';
import { Authentication } from '../auth';
import { MenuBottomMobile } from './menu-bottom-mobile';
import { HeaderMobile } from './header-mobile';
import { DESKTOP_WIDTH, MOBILE_SMALL_WIDTH } from '../../style-config';

export interface IAppShellRenderedProps {
  dimensionsConfig: IDimensions;
  router: RouterProps;
  userProfile: IUserProfile;
  isRefreshing: boolean;
}

export interface IAppShellProps {
  render(props: IAppShellRenderedProps): JSX.Element;
}

export interface IAppShellState {
  dimensionsConfig: IDimensions;
  user: IUser;
  isRefreshing: boolean;
}

class AppShell extends React.Component<IAppShellProps, IAppShellState> {
  auth;
  state = {
    dimensionsConfig: null,
    user: null,
    isRefreshing: false,
  };

  public async componentDidMount() {
    this.auth = new Authentication();
    const user: IUser = await this.auth.getUser();
    if (user) {
      this.setState({ user });
    }
    this.setViewport();
    window.addEventListener('resize', this.setViewport);
  }

  public componentDidUpdate(prevProps: IAppShellProps) {
    if (prevProps['router'].query.state !== this.props['router'].query.state) {
      this.handleRefresh();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.setViewport);
  }

  private handleRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => this.setState({ isRefreshing: false }), 0);
  };

  private setViewport = () => {
    const dimensionsConfig = measureViewport();
    this.setState({ dimensionsConfig });
    throttle(
      () =>
        this.setState({
          dimensionsConfig: {
            ...dimensionsConfig,
            isHeightResizing: false,
            isWidthResizing: false,
          },
        }),
      200,
    );
  };

  public render() {
    const { dimensionsConfig, user, isRefreshing } = this.state;
    const router: RouterProps = this.props['router'];

    return (
      <>
        {GLOBAL_STYLES}
        <CustomHead />
        <NoScript />
        <style jsx>{`
          div.AppShell {
            position: relative;
            display: flex;
            flex-direction: row;
            width: 100%;
            height: calc(100% - ${HEADER_HEIGHT}px);
            margin-right: auto;
            margin-left: auto;
          }
          div.mainContentDesktop {
            position: relative;
            left: ${MENU_SIDE_DESKTOP_WIDTH}px;
            width: calc(100% - 300px);
            min-height: ${dimensionsConfig
              ? `${dimensionsConfig.height - HEADER_HEIGHT}px`
              : 'auto'};
            margin: 0 30px 45px;
          }
          div.mainContentMobile {
            width: calc(100% - 48px);
            min-height: 100%;
            margin: 0 24px;
          }
          @media (min-width: ${MIN_CONTENT_WIDTH}px) {
            div.AppShell {
              width: ${MIN_CONTENT_WIDTH}px;
              height: auto;
            }
          }
          @media (max-width: ${DESKTOP_WIDTH}px) {
            div.AppShell {
              height: auto;
            }
          }
          @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
            div.mainContentMobile {
              width: calc(100% - 40px);
              margin: 0 20px;
            }
          }
        `}</style>
        {dimensionsConfig && !dimensionsConfig.isWidthResizing && (
          <>
            {isDesktop(dimensionsConfig.width) ? (
              <>
                <HeaderDesktop userProfile={defined(user) ? user.profile : null} router={router} />
                <div className="AppShell">
                  <MenuSideDesktop
                    dimensionsConfig={dimensionsConfig}
                    currentName={pathToName(router.pathname)}
                    onRefresh={this.handleRefresh}
                  />
                  <div className="mainContentDesktop">
                    {this.props.render({
                      dimensionsConfig,
                      router,
                      isRefreshing,
                      userProfile: defined(user) ? user.profile : null,
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <HeaderMobile
                  isDetails={defined(router.query['detailsHash'])}
                  pageName={pathToName(router.pathname)}
                />
                <div className="AppShell" onTouchStart={() => false}>
                  <MenuBottomMobile
                    dimensionsConfig={dimensionsConfig}
                    currentName={pathToName(router.pathname)}
                    onRefresh={this.handleRefresh}
                  />
                  <div className="mainContentMobile">
                    {this.props.render({
                      dimensionsConfig,
                      router,
                      isRefreshing,
                      userProfile: defined(user) ? user.profile : null,
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default withRouter(AppShell);
export * from './breadcrumbs-view';
export * from './custom-head';
export * from './header-desktop';
export * from './no-script';
export * from './menu-side-desktop';
export * from './styles';
