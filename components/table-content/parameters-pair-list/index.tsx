import * as React from 'react';
import { INameElementValue } from '../../../models';
import { ParametersPairItem } from './parameters-pair-item';
import { DESKTOP_WIDTH } from '../../../style-config';

export const PARAMETERS_SORT_ORDER = ['to', 'from', 'value'];

export interface IParametersPairListProps {
  info: INameElementValue[];
}

export function ParametersPairList(props: IParametersPairListProps) {
  let { info } = props;
  const [orderedItems, setItems] = React.useState([]);
  React.useEffect(() => {
    const sortedInfoItems = [];
    const notInSort = info.filter(
      (item: INameElementValue) => PARAMETERS_SORT_ORDER.indexOf(item.name) === -1,
    );
    PARAMETERS_SORT_ORDER.map((key: string) => {
      let found = false;
      info = info.filter((item: INameElementValue) => {
        if (!found && item.name === key) {
          sortedInfoItems.push(item);
          found = true;
          return false;
        } else {
          return true;
        }
      });
    });
    setItems([...notInSort, ...sortedInfoItems]);
  }, []);

  return (
    <>
      <style jsx>{`
        ul.ParametersPairList {
          position: relative;
          list-style: none;
          margin: 17px 0;
          z-index: 1;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          ul.ParametersPairList {
            margin: 4px 0 0;
            padding: 0 0 0 12px;
            border-left: 4px solid rgba(184, 184, 195, 0.7);
          }
        }
      `}</style>
      <ul className="ParametersPairList">
        {orderedItems.length > 0 &&
          orderedItems.map((infoItem: INameElementValue, index: number) => (
            <ParametersPairItem
              key={`${infoItem.name}-${index}`}
              {...infoItem}
              zIndex={info.length - index - 1}
            />
          ))}
      </ul>
    </>
  );
}
