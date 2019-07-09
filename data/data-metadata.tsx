import * as React from 'react';
import { IHeaderDictionary, IHeaderItem, EMetadataHeaderType, IMetadataData } from '../models';
import { CellHash } from '../components/table-content/desktop/table/table-data-row';
import { CellContractsCount } from '../components/pages/metadata/metadata-table/cell-contracts-count';
import MetadataOptionDelete from '../components/pages/metadata/metadata-table/cell-contracts-count/metadata-options-control/metadata-option-delete';

export const METADATA_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EMetadataHeaderType.Name,
    headerIconType: null,
    fixedWidth: 248,
  },
  {
    headerType: EMetadataHeaderType.ContractsCount,
    headerIconType: null,
  },
];

export const METADATA_CELL_LOOKUP: IHeaderDictionary<(data: IMetadataData) => JSX.Element> = {
  [EMetadataHeaderType.Name]: (data: IMetadataData) => (
    <CellHash
      contentToCopy={data.swarmHash}
      linkConfig={{
        href: `/metadata?detailsHash=${data.swarmHash}`,
        as: `/metadata/${data.swarmHash}`,
      }}
    >
      {data.name}
    </CellHash>
  ),
  [EMetadataHeaderType.ContractsCount]: (data: IMetadataData) => (
    <CellContractsCount
      count={data.contractCount}
      options={[
        {
          name: 'Delete',
          component: <MetadataOptionDelete swarmHash={data.swarmHash} />,
        },
      ]}
    />
  ),
};
