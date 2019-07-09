import * as React from 'react';
import { formatHash, formatWithCommas } from '../../../../utils';
import { DESKTOP_WIDTH, MAIN_TABLE_PADDING } from '../../../../style-config';
import { ToolTipContentInline } from '../../../tool-tip';
import { EDetailsHighlightUnitType, IDetailsHighlightProps } from '../../../../models';

export function accountOverviewConfig({ address, ethBalance, balance }, width) {
  return {
    titleConfig: {
      label: 'Account Details',
    },
    subtitleConfig: {
      value: address.toString(),
      label: width > DESKTOP_WIDTH ? address.toString() : formatHash(address),
    },
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
    ],
  };
}

export function accountHighlightConfig({ ethBalance, balance }): IDetailsHighlightProps {
  return {
    style: { height: `calc(222px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Balance',
    value: formatWithCommas(parseFloat(ethBalance)),
    unit: EDetailsHighlightUnitType.Eth,
    tooltipContentToCopy: `${formatWithCommas(balance, 0, 0)} Wei`,
  };
}
