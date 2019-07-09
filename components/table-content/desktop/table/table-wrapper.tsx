import * as React from 'react';
import { TableDesktopInfoHeader } from './table-info-header';
import { CardView } from '../../../card-view';
import {
  EPageType,
  EDisplayTitleType,
  IPaging,
  ITableFetchConfig,
  INameValuePair,
} from '../../../../models';
import { LoadingSpinner } from '../../../placeholders';
import { TableFooter } from './table-info-footer';
import { BreadcrumbsView } from '../../../app-shell/breadcrumbs-view';
import { MAIN_TABLE_PADDING } from '../../../../style-config';
import MetadataUploadButton from '../../../pages/metadata/metadata-table/metadata-upload-button';
let timeout1, timeout2;

export interface ITableDesktopWrapperProps extends ITableFetchConfig {
  isZeroElements: boolean;
  isFilterSet: boolean;
  breadcrumbs?: INameValuePair[];
  displayTitleType?: EDisplayTitleType;
  type: EPageType;
  tableHeight: number;
  paging: IPaging;
  children: JSX.Element;
}

export function TableDesktopWrapper(props: ITableDesktopWrapperProps) {
  const [isThrottledLoading, setLoading] = React.useState(false);
  const {
    isZeroElements,
    isFilterSet,
    breadcrumbs,
    displayTitleType,
    type,
    isFetching,
    rowsDisplayedConfig,
    pageNumberConfig,
    paging,
  } = props;

  React.useEffect(() => {
    if (isFetching) {
      clearTimeout(timeout2);
      timeout1 = setTimeout(() => setLoading(true), 200);
    } else {
      clearTimeout(timeout1);
      timeout2 = setTimeout(() => setLoading(false), 200);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isFetching]);

  const renderTitle = (displayType?: EDisplayTitleType) => {
    if (isZeroElements) {
      return null;
    } else {
      return (
        <TableDesktopInfoHeader
          displayTitleType={displayType}
          type={type}
          pageNumberConfig={pageNumberConfig}
          rowsDisplayedConfig={rowsDisplayedConfig}
          paging={paging}
        />
      );
    }
  };

  const renderFooter = () => {
    if (paging && paging.totalElements > paging.size) {
      return (
        <TableFooter
          paging={paging}
          pageNumberConfig={pageNumberConfig}
          rowsDisplayedConfig={rowsDisplayedConfig}
        />
      );
    } else {
      return null;
    }
  };

  const renderLoader = (displayType?: EDisplayTitleType) => {
    if (isThrottledLoading) {
      return (
        <LoadingSpinner
          style={{
            position: 'absolute',
            top: displayType === EDisplayTitleType.Tab ? 14 : MAIN_TABLE_PADDING,
            right: MAIN_TABLE_PADDING,
          }}
        />
      );
    } else if (type === EPageType.metadata) {
      return <MetadataUploadButton />;
    }
  };

  const renderContent = (displayType?: EDisplayTitleType) => (
    <>
      {renderLoader(displayType)}
      {renderTitle(displayType)}
      {props.children}
      {renderFooter()}
    </>
  );

  if (displayTitleType === EDisplayTitleType.Tab) {
    return renderContent(displayTitleType);
  } else {
    return (
      <BreadcrumbsView breadcrumbs={breadcrumbs}>
        <CardView>{renderContent(EDisplayTitleType.Normal)}</CardView>
      </BreadcrumbsView>
    );
  }
}
