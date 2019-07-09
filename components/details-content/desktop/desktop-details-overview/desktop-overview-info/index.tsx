import * as React from 'react';
import { INameElementValue } from '../../../../../models';
import { DesktopOverviewInfoItem } from './desktop-overview-info-item';

export interface IDesktopOverviewInfoProps {
  info: INameElementValue[][];
}

export function DesktopOverviewInfo(props: IDesktopOverviewInfoProps) {
  const { info } = props;
  return (
    <>
      <style jsx>{`
        ul.DesktopOverviewInfo {
          position: relative;
          margin-top: 12px;
          list-style: none;
        }
        ul.OverviewInfo.--secondRow {
          margin-top: 0;
          z-index: 0;
        }
      `}</style>
      {info.map((row: INameElementValue[], rowIndex: number) => (
        <ul
          key={`row-${rowIndex}`}
          className="DesktopOverviewInfo"
          style={{ zIndex: info.length - rowIndex + 1, marginTop: rowIndex > 0 ? 0 : 12 }}
        >
          {row.map((infoItem: INameElementValue, itemIndex: number) => (
            <DesktopOverviewInfoItem
              key={infoItem.name}
              {...infoItem}
              style={{
                zIndex: row.length - itemIndex + 1,
              }}
              valueStyle={{
                marginRight: itemIndex === row.length - 1 ? 0 : 24,
              }}
            />
          ))}
        </ul>
      ))}
    </>
  );
}
