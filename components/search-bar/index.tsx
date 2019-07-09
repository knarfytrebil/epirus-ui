import * as React from 'react';
import * as classNames from 'classnames';
import { withRouter } from 'next/router';
import { RouterProps } from 'next-server/router';
import { LO_PURPLE, PURPLE_WHITE } from '../../data';
import { ICON } from '../svg';
import { defined, fetchData } from '../../utils';
import { ISearchFetch, ILinkItem, ELinkType } from '../../models';
import { LoadingSpinner } from '../placeholders';
import { INPUT_GREY, INPUT_TEXT_GREY, MOBILE_SMALL_WIDTH, TABLET_WIDTH } from '../../style-config';
import { handleAndResolveLinks } from '../../utils/navigation';

export interface ISearchBarProps {
  style?: React.CSSProperties;
  isHeader?: boolean;
  router: RouterProps;
}

function SearchBar(props: ISearchBarProps) {
  const { router, isHeader, style } = props;
  const [searchText, setSearchText] = React.useState(router.query.searchText || '');
  const [isLoading, setLoading] = React.useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.currentTarget.value);
  const renderNotFound = () =>
    props.router.push(
      `/search-not-found?searchText=${searchText}`,
      `/search-not-found/${searchText}`,
    );
  const submitSearchText = async () => {
    if (searchText) {
      setLoading(true);
      const search: ISearchFetch = await fetchData(`/search?query=${searchText}`);
      handleAndResolveLinks(search.links, router, renderNotFound, ELinkType.Self);
      setLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitSearchText();
    }
  };
  const handleClick = () => {
    submitSearchText();
  };
  return (
    <>
      <style jsx>{`
        div.SearchBar {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          width: calc(100% - 23px);
          padding: 0 12px 0 11px;
          height: 100%;
          background-color: ${INPUT_GREY};
          color: ${INPUT_TEXT_GREY};
        }
        button {
          color: inherit;
        }
        input {
          height: 22px;
          font-size: 12px;
          line-height: 16px;
          margin-left: 11px;
          width: calc(100% - 11px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: inherit;
        }
        input.isHeader {
          color: #fff;
        }
        div.SearchBar.isHeader {
          width: calc(100% - 43px);
          padding: 0 27px 0 16px;
          background-color: ${LO_PURPLE};
          color: ${PURPLE_WHITE};
        }
        div.SearchBar.isHeader input {
          line-height: 22px;
          width: calc(100% - 4px);
          margin-left: 4px;
        }
        input:focus ~ button {
          color: #fff;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.SearchBar {
            width: calc(100% - 17px);
            padding: 0 9px 0 8px;
          }
          input {
            margin-left: 8px;
            width: calc(100% - 8px);
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          div.SearchBar {
            width: calc(100% - 13px);
            padding: 0 7px 0 6px;
          }
        }
      `}</style>
      <div className={classNames('SearchBar', { isHeader })} style={defined(style) ? style : null}>
        <input
          className={classNames({ isHeader })}
          type="text"
          placeholder="Search by address, token, transaction hash, or block number..."
          value={searchText}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          name="search-bar"
        />
        <button onClick={handleClick}>
          {isLoading ? <LoadingSpinner style={{ width: 18, height: 18 }} /> : ICON.Search}
        </button>
      </div>
    </>
  );
}

export default withRouter(SearchBar);
