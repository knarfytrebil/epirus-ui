import * as React from 'react';
import { formatHash, formatWithCommas, isHash } from './index';
import { IEventsParameter, INameElementValue } from '../models';
import { ToolTipCellCopy } from '../components';
import { ToolTipContentInline } from '../components/tool-tip/tool-tip-content-inline';

export function parametersToInfo(
  parameters: IEventsParameter[],
  isMobile?: boolean,
): INameElementValue[] {
  return parameters.map((parameter: IEventsParameter) => {
    const { name, value, type } = parameter;
    let transformedValue: string | JSX.Element = value;
    if (isHash(value)) {
      if (isMobile) {
        transformedValue = (
          <ToolTipContentInline
            style={{ top: 0 }}
            contentToCopy={value}
            // linkConfig={{ href: `/accounts?detailsHash=${value}`, as: `/accounts/${value}` }} TODO: Broken, add later
          >
            {formatHash(value)}
          </ToolTipContentInline>
        );
      } else {
        transformedValue = (
          <ToolTipCellCopy
            style={{ top: 0 }}
            contentToCopy={value}
            // linkConfig={{ href: `/accounts?detailsHash=${value}`, as: `/accounts/${value}` }} TODO: Broken, add later
          >
            {formatHash(value)}
          </ToolTipCellCopy>
        );
      }
    } else if (type === 'uint256') {
      try {
        transformedValue = formatWithCommas(value);
      } catch (err) {
        transformedValue = value;
      }
    }
    return { name, value: transformedValue };
  });
}
