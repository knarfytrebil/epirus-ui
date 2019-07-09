import * as React from 'react';
import { ToolTipContentInline } from '../../..';
import { defined, formatHash, formatWithCommas } from '../../../../utils';
import { DESKTOP_WIDTH, MAIN_TABLE_PADDING } from '../../../../style-config';
import {
  EDetailsHighlightUnitType,
  IContractDetailsResult,
  IDetailsHighlightProps,
  IMetadataData,
  IOverviewContentProps,
} from '../../../../models';
import { InlineUploadButton } from './inline-upload-button';
import { EFetchState, IFetchDataState } from '../../../../models/models-async';

function metadata(name, links): IFetchDataState<IMetadataData> {
  if (defined(name)) {
    return {
      fetchState: EFetchState.Success,
      data: {
        links,
        name,
        swarmHash: null,
      },
    };
  } else {
    return {
      fetchState: EFetchState.None,
    };
  }
}

export function contractOverviewConfig(data, width): IOverviewContentProps {
  const {
    contractType,
    ethBalance,
    balance,
    contractAddress,
    createdBlockNumber,
    createdBlockHash,
    createdTransactionHash,
    contractCreator,
    metadataName,
    links,
  }: IContractDetailsResult = data;
  return {
    titleConfig: {
      label: 'Contract Details',
      tag: contractType,
    },
    subtitleConfig: {
      value: contractAddress.toString(),
      label: width > DESKTOP_WIDTH ? contractAddress.toString() : formatHash(contractAddress),
    },
    info: [
      [
        {
          name: 'Created at block',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={createdBlockNumber.toString()}
              linkConfig={{
                href: `/blocks?detailsHash=${createdBlockHash}`,
                as: `/blocks/${createdBlockHash}`,
              }}
            >
              {`#${createdBlockNumber}`}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'On',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={createdTransactionHash} // should be createdTransaction, TODO change when value is available
              linkConfig={{
                href: `/transactions?detailsHash=${createdTransactionHash}`,
                as: `/transactions/${createdTransactionHash}`,
              }}
            >
              {formatHash(createdTransactionHash)}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'By',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={contractCreator}
              linkConfig={{
                href: `/accounts?detailsHash=${contractCreator}`,
                as: `/accounts/${contractCreator}`,
              }}
            >
              {formatHash(contractCreator)}
            </ToolTipContentInline>
          ),
        },
      ],
    ],
    additionalDetails: [
      [
        {
          name: 'Balance',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={`${formatWithCommas(balance, 0, 0)} Wei`}
            >
              {`${formatWithCommas(ethBalance)} ETH`}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Contract Metadata',
          value: <InlineUploadButton initialFetchDataState={metadata(metadataName, links)} />,
        },
      ],
    ],
  };
}

export function contractHighlightConfig({ ethBalance, balance }): IDetailsHighlightProps {
  return {
    style: { height: `calc(266px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Balance',
    value: formatWithCommas(parseFloat(ethBalance)),
    unit: EDetailsHighlightUnitType.Eth,
    tooltipContentToCopy: `${formatWithCommas(balance, 0, 0)} Wei`,
  };
}
