import * as React from 'react';
import { IHeaderDictionary, EMetadataHeaderType, IMetadataData } from '../models';
import { InlineHash, TextTruncate } from '../components';
import { formatWithCommas } from '../utils';

export const METADATA_MOBILE_CELL_LOOKUP: IHeaderDictionary<
  (data: IMetadataData) => JSX.Element
> = {
  [EMetadataHeaderType.Name]: (data: IMetadataData) => (
    <InlineHash
      contentToCopy={data.swarmHash}
      linkConfig={{
        href: `/metadata?detailsHash=${data.swarmHash}`,
        as: `/metadata/${data.swarmHash}`,
      }}
    >
      {data.name}
    </InlineHash>
  ),
  [EMetadataHeaderType.ContractsCount]: (data: IMetadataData) => (
    <TextTruncate>
      {data.contractCount === 0 ? '0' : formatWithCommas(data.contractCount)}
    </TextTruncate>
  ),
};
