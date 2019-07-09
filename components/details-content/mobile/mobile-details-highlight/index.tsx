import * as React from 'react';
import { CARD_PURPLE, WHITE } from '../../../../data';
import { MobileDetailsHighlightValue } from './mobile-details-highlight-value';
import { ToolTipContentInline } from '../../../tool-tip';
import { LIGHT_PURPLE_TEXT } from '../../../../style-config';
import { IDetailsHighlightProps } from '../../../../models';

export function MobileDetailsHighlight(props: IDetailsHighlightProps) {
  const { title, value, unit, tooltipContentToCopy } = props;
  return (
    <>
      <style jsx>{`
        div.MobileDetailsHighlight {
          position: relative;
          margin-top: 30px;
          background-color: ${CARD_PURPLE};
          padding: 20px;
        }
        div.title {
          color: ${WHITE};
          font-size: 12px;
          line-height: 16px;
        }
        div.line {
          height: 2px;
          width: 100%;
          margin: 24px 0 4px;
          background-color: ${LIGHT_PURPLE_TEXT};
        }
      `}</style>
      <div className="MobileDetailsHighlight">
        <div className="title">{title}</div>
        {tooltipContentToCopy ? (
          <ToolTipContentInline
            style={{ display: 'inline', width: '100%' }}
            textStyle={{ fontSize: 14, marginTop: 20 }}
            contentToCopy={tooltipContentToCopy}
          >
            <MobileDetailsHighlightValue isTooltip value={value} unit={unit} />
          </ToolTipContentInline>
        ) : (
          <MobileDetailsHighlightValue value={value} unit={unit} />
        )}
        <div className="line" />
      </div>
    </>
  );
}
