import * as React from 'react';
import { defined, isString } from '../../utils';
import { ToolTip, ToolTipInline, ToolTipCopyButton } from '../tool-tip';
let ref;

export interface ITextTruncateProps {
  style?: React.CSSProperties;
  children: JSX.Element | string;
  isToolTipDisabled?: boolean;
}

export interface ITextTruncateState {
  isEllipsisActive: boolean;
}

class TextTruncate extends React.Component<ITextTruncateProps, ITextTruncateState> {
  state = {
    isEllipsisActive: false,
  };

  private isEllipsisActive = (el) => defined(el) && el.offsetWidth < el.scrollWidth;

  public componentDidMount() {
    this.setState({
      isEllipsisActive: this.isEllipsisActive(ref),
    });
  }

  private recordRef = (el) => {
    if (el) {
      ref = el;
    }
  };

  private isToolTip = () => this.state.isEllipsisActive && !this.props.isToolTipDisabled;

  private renderText = (isToolTip?: boolean) => {
    const { style, children } = this.props;
    return (
      <>
        <style jsx>{`
          div.TextTruncate {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: ${isToolTip ? 'pointer' : 'inherit'};
          }
        `}</style>
        <div ref={this.recordRef} style={defined(style) ? style : null} className="TextTruncate">
          {children}
        </div>
      </>
    );
  };

  private renderToolTip = () => {
    if (isString(this.props.children)) {
      return <ToolTipCopyButton contentToCopy={this.props.children as string} />;
    } else {
      return <ToolTip>{this.props.children}</ToolTip>;
    }
  };

  public render() {
    if (this.isToolTip()) {
      return (
        <ToolTipInline toolTipContent={this.renderToolTip()}>{this.renderText(true)}</ToolTipInline>
      );
    } else {
      return this.renderText();
    }
  }
}

export { TextTruncate };
