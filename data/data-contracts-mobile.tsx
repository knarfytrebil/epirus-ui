import * as React from 'react';
import { IHeaderDictionary, IContractsData, EContractsHeaderType, ELinkType } from '../models';
import { formatHash, formatWithCommas, resolveLink } from '../utils';
import { TypeTag, InlineHash, InlineTime, TextTruncate, TextLink } from '../components';

export const CONTRACTS_MOBILE_CELL_LOOKUP: IHeaderDictionary<
  (data: IContractsData) => JSX.Element
> = {
  [EContractsHeaderType.Type]: (data: IContractsData) => <TypeTag tagType={data.contractType} />,
  [EContractsHeaderType.Name]: (data: IContractsData) => {
    const link = resolveLink(data.links, ELinkType.Metadata);
    if (link && link.href) {
      if (data.metadataName) {
        return (
          <InlineHash contentToCopy={data.metadataName} linkConfig={{ href: link.href }}>
            {data.metadataName}
          </InlineHash>
        );
      } else {
        return <TextLink href={link.href}>View</TextLink>;
      }
    } else {
      return null;
    }
  },
  [EContractsHeaderType.Hash]: (data: IContractsData) => (
    <InlineHash
      style={{
        fontSize: 16,
        lineHeight: '20px',
      }}
      contentToCopy={data.address}
      linkConfig={{
        href: `/contracts?detailsHash=${data.address}`,
        as: `/contracts/${data.address}`,
      }}
    >
      {formatHash(data.address)}
    </InlineHash>
  ),
  [EContractsHeaderType['Transaction Count']]: (data: IContractsData) => (
    <TextTruncate>{formatWithCommas(data.transactionCount)}</TextTruncate>
  ),
  [EContractsHeaderType['Creation Date']]: (data: IContractsData) => (
    <InlineTime>{data.createdTimestampISO}</InlineTime>
  ),
  [EContractsHeaderType['Last Execution']]: (data: IContractsData) => (
    <InlineTime>{data.lastExecutedTimestampISO}</InlineTime>
  ),
};
