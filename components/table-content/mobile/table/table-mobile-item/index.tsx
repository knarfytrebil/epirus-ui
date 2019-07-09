import * as React from 'react';
import * as classNames from 'classnames';
import { EPageType, IDictionary, IHeaderItem, THeaderType } from '../../../../../models';
import { BOTTOM_MENU_GREY, MOBILE_LIGHT_GREY } from '../../../../../style-config';
import { COMBINED_LOOKUP } from '../../../../../data';
import { TextTruncate } from '../../../../text-truncate';
import { defined } from '../../../../../utils';
const TEXT_TRUNCATE_WIDTH = 150;

export enum ERowTypes {
  Title = 'Title',
  Tag = 'Tag',
  Pair = 'Pair',
}

export interface ITableMobileItemProps {
  headerItems: IHeaderItem[];
  isFirstRow: boolean;
  type: EPageType;
  row: any;
}

function isTag(headerType) {
  return headerType === 'Type' || headerType === 'State';
}

function isTitle(headerType, pageType: EPageType) {
  if (
    pageType === EPageType.eventsTransactionsMobile ||
    pageType === EPageType.eventsContractsMobile
  ) {
    return headerType === 'Transaction Hash';
  } else if (pageType === EPageType.contractsMobile) {
    return headerType === 'Hash';
  } else {
    return headerType === 'Hash' || headerType === 'Name';
  }
}

function transformItems(headerItems: IHeaderItem[], pageType: EPageType) {
  const INIT_ROW_TYPES = {
    [ERowTypes.Title]: [],
    [ERowTypes.Tag]: [],
    [ERowTypes.Pair]: [],
  };
  return headerItems.reduce((a: IDictionary<IHeaderItem[]>, item: IHeaderItem, index: number) => {
    if (isTitle(item.headerType, pageType)) {
      a[ERowTypes.Title].push(item);
    } else if (isTag(item.headerType)) {
      a[ERowTypes.Tag].push(item);
    } else {
      a[ERowTypes.Pair].push(item);
    }
    if (index === headerItems.length - 1) {
      const emptyKeys: string[] = Object.keys(a).filter((key) => a[key].length === 0);
      emptyKeys.forEach((key) => {
        delete a[key];
      });
    }
    return a;
  }, INIT_ROW_TYPES);
}

export function formatName(name: string) {
  if (name === 'Parameters') {
    return name;
  } else {
    return `${name}:`;
  }
}

export function TableMobileItem(props: ITableMobileItemProps) {
  const { headerItems, row, type } = props;
  const transformedItems: IDictionary<IHeaderItem[]> = transformItems(headerItems, type);
  const resolveRow = (headerType: THeaderType) => COMBINED_LOOKUP[type][headerType](row);
  return (
    <>
      <style jsx>{`
        li.TableMobileItem {
          position: relative;
          padding: 24px 0;
          border-top: 1px solid ${MOBILE_LIGHT_GREY};
        }
        li.TableMobileItem:last-child {
          border-bottom: 1px solid ${MOBILE_LIGHT_GREY};
        }
        div.title {
          display: inline-block;
          vertical-align: top;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
        div.tags {
          position: absolute;
          top: 23px;
          right: 0;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-end;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
        div.tag-item {
          font-size: 0;
          margin-top: 4px;
        }
        div.tag-item:first-child {
          margin-top: 0;
        }
        div.pair {
          display: flex;
          flex-direction: row;
          white-space: pre-wrap;
          margin-top: 8px;
          width: 100%;
        }
        div.pair.--first {
          margin-top: 12px;
        }
        div.pair.--parameters {
          flex-direction: column;
        }
        div.pair.--parameters span {
          display: none;
        }
        div.name {
          font-size: 14px;
          line-height: 20px;
          color: ${BOTTOM_MENU_GREY};
          white-space: nowrap;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
        div.value {
          font-size: 14px;
          line-height: 20px;
          white-space: nowrap;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
      `}</style>
      <li className="TableMobileItem">
        {Object.keys(transformedItems).map((key: string) => {
          if (key === ERowTypes.Title) {
            return (
              <div key={key} className="title">
                {transformedItems[ERowTypes.Title].map((item: IHeaderItem) => (
                  <React.Fragment key={item.headerType}>
                    {resolveRow(item.headerType)}
                  </React.Fragment>
                ))}
              </div>
            );
          } else if (key === ERowTypes.Tag) {
            return (
              <div key={key} className="tags">
                {transformedItems[ERowTypes.Tag].map((item: IHeaderItem) => (
                  <div key={item.headerType} className="tag-item">
                    {resolveRow(item.headerType)}
                  </div>
                ))}
              </div>
            );
          } else {
            return transformedItems[ERowTypes.Pair].map((item: IHeaderItem, index: number) => {
              if (defined(resolveRow(item.headerType))) {
                return (
                  <div
                    key={item.headerType}
                    className={classNames('pair', {
                      '--first': index === 0,
                      '--parameters': item.headerType === 'Parameters',
                    })}
                  >
                    <div className="name">
                      <TextTruncate>{formatName(item.headerType)}</TextTruncate>
                    </div>
                    <span> </span>
                    <div className="value">{resolveRow(item.headerType)}</div>
                  </div>
                );
              } else {
                return null;
              }
            });
          }
        })}
      </li>
    </>
  );
}

export * from './inline-contract-icon';
export * from './inline-hash';
export * from './inline-time';
export * from './inline-value';
