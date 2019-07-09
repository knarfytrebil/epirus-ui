import * as React from 'react';
import { MobileOverviewInfoItem } from './mobile-overview-info-item';
import { INameElementValue } from '../../../../../models';
import { flatten } from '../../../../../utils';

export interface IMobileOverviewInfoProps {
  info: INameElementValue[][];
}

export function MobileOverviewInfo(props: IMobileOverviewInfoProps) {
  const { info } = props;
  const flatInfo = flatten(info);
  return (
    <>
      <style jsx>{`
        ul.MobileOverviewInfo {
          position: relative;
          margin-bottom: 30px;
          list-style: none;
          z-index: 0;
        }
        ul.MobileOverviewInfo.--secondRow {
          margin-top: 0;
          z-index: 0;
        }
      `}</style>
      <ul className="MobileOverviewInfo">
        {flatInfo.map((infoItem: INameElementValue, itemIndex: number) => (
          <MobileOverviewInfoItem
            key={infoItem.name}
            {...infoItem}
            style={{
              zIndex: flatInfo.length - itemIndex - 1,
            }}
            valueStyle={{
              lineHeight: '20px',
            }}
          />
        ))}
      </ul>
    </>
  );
}
