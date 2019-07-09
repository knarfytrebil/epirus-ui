import * as React from 'react';
import {
  IHeaderDictionary,
  IHeaderItem,
  EContractsHeaderType,
  EContractsSortAndFilterType,
  IContractsData,
  EHeaderIconType,
  EContractsContractType,
  ELinkType,
} from '../models';
import { formatHash, formatWithCommas, resolveLink } from '../utils';
import { TypeTag, TextOnly, CellTime, CellHash } from '../components';
import { TextLink } from '../components/table-content/desktop/table/table-data-row';

export const CONTRACTS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EContractsHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: EContractsSortAndFilterType.contractType,
    options: Object.keys(EContractsContractType).map(
      (type: string) => EContractsContractType[type],
    ),
  },
  {
    headerType: EContractsHeaderType.Name,
    headerIconType: null,
  },
  {
    headerType: EContractsHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: EContractsHeaderType['Transaction Count'],
    headerIconType: EHeaderIconType.Sort,
    type: EContractsSortAndFilterType.transactionCount,
  },
  {
    headerType: EContractsHeaderType['Creation Date'],
    headerIconType: EHeaderIconType.Sort,
    type: EContractsSortAndFilterType.created,
  },
  {
    headerType: EContractsHeaderType['Last Execution'],
    headerIconType: EHeaderIconType.Sort,
    type: EContractsSortAndFilterType.lastExecuted,
  },
];

export const CONTRACTS_CELL_LOOKUP: IHeaderDictionary<(data: IContractsData) => JSX.Element> = {
  [EContractsHeaderType.Type]: (data: IContractsData) => <TypeTag tagType={data.contractType} />,
  [EContractsHeaderType.Name]: (data: IContractsData) => {
    const link = resolveLink(data.links, ELinkType.Metadata);
    if (link && link.href) {
      if (data.metadataName) {
        return (
          <CellHash linkConfig={{ href: link.href }} contentToCopy={data.metadataName}>
            {data.metadataName}
          </CellHash>
        );
      } else {
        return <TextLink href={link.href}>View</TextLink>;
      }
    } else {
      return null;
    }
  },
  [EContractsHeaderType.Hash]: (data: IContractsData) => (
    <CellHash
      contentToCopy={data.address}
      linkConfig={{
        href: `/contracts?detailsHash=${data.address}`,
        as: `/contracts/${data.address}`,
      }}
    >
      {formatHash(data.address)}
    </CellHash>
  ),
  [EContractsHeaderType['Transaction Count']]: (data: IContractsData) => (
    <TextOnly>{formatWithCommas(data.transactionCount)}</TextOnly>
  ),
  [EContractsHeaderType['Creation Date']]: (data: IContractsData) => (
    <CellTime>{data.createdTimestampISO}</CellTime>
  ),
  [EContractsHeaderType['Last Execution']]: (data: IContractsData) => (
    <CellTime>{data.lastExecutedTimestampISO}</CellTime>
  ),
};
