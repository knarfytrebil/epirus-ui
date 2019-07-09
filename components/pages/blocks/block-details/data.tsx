import * as React from 'react';
import { formatDateDiffFromNow, formatHash, formatWithCommas } from '../../../../utils';
import { IBlockDetailsResult, IDetailsHighlightProps } from '../../../../models';
import { DESKTOP_WIDTH, MAIN_TABLE_PADDING } from '../../../../style-config';
import { ToolTipContentInline } from '../../../tool-tip';

export function blockOverviewConfig(result: IBlockDetailsResult, width: number) {
  const {
    size,
    miner,
    parentHash,
    hash,
    timestampISO,
    difficulty,
    totalDifficulty,
    nonce,
    gasLimit,
    gasUsed,
  } = result;
  return {
    titleConfig: {
      label: 'Block Details',
    },
    subtitleConfig: {
      value: result.number.toString(),
      label: result.number.toString(),
    },
    info: [
      [
        {
          name: 'Hash',
          value: formatHash(hash),
        },
        {
          name: 'Parent Hash',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14, lineHeight: width < DESKTOP_WIDTH ? '20px' : '22px' }}
              contentToCopy={parentHash}
              linkConfig={{
                href: `/blocks?detailsHash=${parentHash}`,
                as: `/blocks/${parentHash}`,
              }}
            >
              {formatHash(parentHash)}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Mined By',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14, lineHeight: width < DESKTOP_WIDTH ? '20px' : '22px' }}
              contentToCopy={miner}
              linkConfig={{
                href: `/accounts?detailsHash=${miner}`,
                as: `/accounts/${miner}`,
              }}
            >
              {formatHash(miner)}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'Size',
          value: `${formatWithCommas(size)} Bytes`,
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
          name: 'Difficulty',
          value: formatWithCommas(difficulty),
        },
      ],
      [
        {
          name: 'Total Difficulty',
          value: formatWithCommas(totalDifficulty),
        },
      ],
      [
        {
          name: 'Nonce',
          value: nonce,
        },
        {
          name: 'Gas Limit',
          value: formatWithCommas(gasLimit),
        },
        {
          name: 'Gas Used',
          value: formatWithCommas(gasUsed),
        },
      ],
    ],
  };
}

export function blockHighlightConfig(transactionCount: number): IDetailsHighlightProps {
  return {
    style: { height: `calc(298px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Transaction Count',
    value: formatWithCommas(transactionCount),
  };
}
