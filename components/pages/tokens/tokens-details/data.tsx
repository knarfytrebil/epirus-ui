import * as React from 'react';
import {
  defined,
  formatHash,
  formatWithCommas,
  resolveTokenName,
  tokenDetailsTagLookup,
} from '../../../../utils';
import { ToolTipContentInline } from '../../../tool-tip';
import { IDetailsHighlightProps, ITokenDetailsResult } from '../../../../models';
import { MAIN_TABLE_PADDING } from '../../../../style-config';
import { ETagType } from '../../../index';

export function tokenOverviewConfig(tokenDetails: ITokenDetailsResult) {
  const { address, contractType, symbol, decimals } = tokenDetails;
  let infoSecondLine = [
    {
      name: 'Symbol',
      value: defined(symbol) ? symbol : 'Unknown',
    },
  ];
  if (contractType !== ETagType.ERC721) {
    infoSecondLine = [
      ...infoSecondLine,
      {
        name: 'Decimals',
        value: defined(decimals) ? decimals.toString() : 'Unknown',
      },
    ];
  }
  return {
    titleConfig: {
      label: 'Token Details',
      tag: tokenDetailsTagLookup(contractType),
    },
    subtitleConfig: {
      value: tokenDetails.address,
      label: resolveTokenName(tokenDetails),
      isNoCopyIcon: true,
    },
    info: [
      [
        {
          name: 'Contract Address',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={address}
              linkConfig={{
                href: `/contracts?detailsHash=${address}`,
                as: `/contracts/${address}`,
              }}
            >
              {formatHash(address)}
            </ToolTipContentInline>
          ),
        },
      ],
      infoSecondLine,
    ],
  };
}

export function tokenHighlightConfig(totalSupply: number): IDetailsHighlightProps {
  let value;
  if (totalSupply === 0) {
    value = 0;
  } else if (defined(totalSupply)) {
    value = formatWithCommas(totalSupply);
  } else {
    value = 'Unknown';
  }
  return {
    style: { height: `calc(230px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Total Supply',
    value,
    tooltipContentToCopy: defined(totalSupply) ? formatWithCommas(totalSupply) : null,
  };
}
