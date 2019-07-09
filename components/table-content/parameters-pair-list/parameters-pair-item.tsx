import * as React from 'react';
import { DARK_PURPLE_TEXT, LIGHT_GREY_TEXT } from '../../../data';
import { INameElementValue } from '../../../models';
import { capitalize } from '../../../utils';
import { TextTruncate } from '../../text-truncate';
import { DESKTOP_WIDTH } from '../../../style-config';

export interface IParametersPairItemProps extends INameElementValue {
  zIndex: number;
}

export interface IParametersPairItemState {
  nameWidth: number;
}

export class ParametersPairItem extends React.Component<
  IParametersPairItemProps,
  IParametersPairItemState
> {
  state = {
    nameWidth: 0,
  };
  nameRef;
  private handleRef = (el) => {
    if (el) {
      this.nameRef = el;
    }
  };
  public componentDidMount() {
    this.setState({
      nameWidth: this.nameRef.clientWidth,
    });
  }
  public render() {
    const { name, value, zIndex } = this.props;
    return (
      <>
        <style jsx>{`
          li.ParametersPairItem {
            position: relative;
            display: flex;
            height: 22px;
            flex-direction: row;
            align-items: center;
            white-space: pre-wrap;
            z-index: ${zIndex};
          }
          div {
            font-size: 12px;
            line-height: 22px;
          }
          div.name {
            color: ${LIGHT_GREY_TEXT};
          }
          div.value {
            position: relative;
            color: ${DARK_PURPLE_TEXT};
            width: calc(145px - ${this.state.nameWidth}px);
            height: 22px;
          }
          @media (max-width: ${DESKTOP_WIDTH}px) {
            li.ParametersPairItem {
              height: 16px;
              margin-top: 8px;
            }
            li.ParametersPairItem:first-child {
              margin-top: 0;
            }
            div {
              font-size: 12px;
              line-height: 16px;
            }
            div.name {
              color: #b8b8c3;
            }
            div.value {
              color: #5a627a;
              height: 16px;
            }
          }
        `}</style>
        <li className="ParametersPairItem">
          <div ref={this.handleRef} className="name">
            {capitalize(name)}:
          </div>
          <span> </span>
          {this.state.nameWidth > 0 && (
            <div className="value">
              <TextTruncate>{value}</TextTruncate>
            </div>
          )}
        </li>
      </>
    );
  }
}
