import * as React from 'react';
import { CardView } from '../../../card-view';
import { CARD_PURPLE, WHITE } from '../../../../data';
import { CARD_GAP } from '..';
import { DesktopDetailsHighlightValue } from './desktop-details-highlight-value';
import { ToolTipContentInline } from '../../../tool-tip';
import { MAIN_TABLE_PADDING } from '../../../../style-config';
import { IDetailsHighlightProps } from '../../../../models';

export function DesktopDetailsHighlight(props: IDetailsHighlightProps) {
  const { style, title, value, unit, tooltipContentToCopy } = props;
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsHighlight {
          position: relative;
          width: calc(40% - ${CARD_GAP * 0.5}px);
          z-index: 0;
        }
        div.title {
          color: ${WHITE};
          font-size: 22px;
          line-height: 26px;
        }
        div.line {
          height: 2px;
          width: 100%;
          margin-top: 48px;
          background-color: ${WHITE};
          opacity: 0.2;
        }
      `}</style>
      <div className="DesktopDetailsHighlight">
        <CardView
          style={{
            backgroundColor: CARD_PURPLE,
            height: `calc(100% - ${MAIN_TABLE_PADDING * 2}px)`,
            ...style,
          }}
        >
          <div className="title">{title}</div>
          {tooltipContentToCopy ? (
            <ToolTipContentInline
              style={{ display: 'inline', width: '100%' }}
              textStyle={{ fontSize: 14 }}
              contentToCopy={tooltipContentToCopy}
            >
              <DesktopDetailsHighlightValue isTooltip value={value} unit={unit} />
            </ToolTipContentInline>
          ) : (
            <DesktopDetailsHighlightValue value={value} unit={unit} />
          )}
          <div className="line" />
        </CardView>
      </div>
    </>
  );
}
