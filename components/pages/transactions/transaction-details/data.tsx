import * as React from 'react';
import {
  formatDateDiffFromNow,
  formatHash,
  formatHashLong,
  isHash,
  formatWithCommas,
} from '../../../../utils';
import { ETagType } from '../../../type-tags';
import { TextViewerWrapper } from '../../../inputs/text-viewer-modal';
import { DESKTOP_WIDTH, MAIN_TABLE_PADDING } from '../../../../style-config';
import { ToolTipContentInline } from '../../../tool-tip';
import {
  EDetailsHighlightUnitType,
  IDetailsHighlightProps,
  IOverviewContentProps,
} from '../../../../models';

export function transactionOverviewConfig(data, width: number): IOverviewContentProps {
  const {
    transactionType,
    hash,
    input,
    from,
    fromMeta,
    to,
    toMeta,
    status,
    timestampISO,
    blockNumber,
    blockHash,
    cumulativeGasUsed,
    transactionIndex,
    nonce,
    gas,
    gasUsed,
    gasPrice,
    ethValue,
    value,
  } = data;

  return {
    titleConfig: {
      label: 'Transaction Details',
      tag: ETagType[transactionType],
    },
    subtitleConfig: {
      value: hash,
      label: width > DESKTOP_WIDTH ? formatHashLong(hash) : formatHash(hash),
    },
    info: [
      [
        {
          name: 'From',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={from}
              linkConfig={{
                href: `/${fromMeta.contract ? 'contracts' : 'accounts'}?detailsHash=${from}`,
                as: `/${fromMeta.contract ? 'contracts' : 'accounts'}/${from}`,
              }}
            >
              {isHash(fromMeta.display) ? formatHash(fromMeta.display) : fromMeta.display}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'To',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={to}
              linkConfig={{
                href: `/${toMeta.contract ? 'contracts' : 'accounts'}?detailsHash=${to}`,
                as: `/${toMeta.contract ? 'contracts' : 'accounts'}/${to}`,
              }}
            >
              {isHash(toMeta.display) ? formatHash(toMeta.display) : toMeta.display}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Status',
          value: status,
        },
        {
          name: 'Time',
          value: formatDateDiffFromNow(timestampISO),
        },
      ],
    ],
    additionalDetails: [
      [
        {
          name: 'Input Bytecode',
          value: <TextViewerWrapper title="Input Bytecode">{input}</TextViewerWrapper>,
        },
        {
          name: 'Block',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={blockNumber.toString()}
              linkConfig={{
                href: `/blocks?detailsHash=${blockHash}`,
                as: `/blocks/${blockHash}`,
              }}
            >
              {`#${blockNumber}`}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Transaction Fee',
          value: `${formatWithCommas(cumulativeGasUsed, 0, 0)} Wei`,
        },
      ],
      [
        {
          name: 'Position',
          value: transactionIndex.toString(),
        },
        {
          name: 'Nonce',
          value: nonce,
        },
      ],
      [
        {
          name: 'Gas Used',
          value: `${formatWithCommas(gasUsed)} (${((gasUsed * 100) / gas).toFixed(2)}%)`,
        },
        {
          name: 'Gas Price',
          value: `${formatWithCommas(gasPrice, 0, 0)} Wei`,
        },
      ],
      [
        {
          name: 'Value',
          value: `${formatWithCommas(ethValue)} ETH / ${formatWithCommas(value, 0, 0)} Wei`,
        },
      ],
    ],
  };
}

export function transactionsHighlightConfig({ ethValue, value }): IDetailsHighlightProps {
  return {
    style: { height: `calc(298px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Value',
    value: formatWithCommas(parseFloat(ethValue)),
    unit: EDetailsHighlightUnitType.Eth,
    tooltipContentToCopy: `${formatWithCommas(value, 0, 0)} Wei`,
  };
}
