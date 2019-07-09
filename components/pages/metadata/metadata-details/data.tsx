import * as React from 'react';
import { formatHash } from '../../../../utils';
import { IMetadataData, IOverviewContentProps } from '../../../../models';

export function metadataOverviewConfig(detailsFetch: IMetadataData): IOverviewContentProps {
  const { name, swarmHash } = detailsFetch;
  return {
    titleConfig: {
      label: 'Contract Metadata Details',
    },
    subtitleConfig: {
      value: swarmHash,
      label: name,
      isNoCopyIcon: true,
    },
    info: [
      [
        {
          name: 'Swarmhash',
          value: formatHash(swarmHash),
        },
      ],
    ],
  };
}
