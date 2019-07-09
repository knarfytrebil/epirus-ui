import * as React from 'react';
import AppShell from '../../components/app-shell';
import { ErrorMessage } from '../../components';

export default function SearchNotFound() {
  return (
    <>
      <style jsx>{`
        div.SearchNotFound {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <AppShell
        render={() => (
          <div className="SearchNotFound">
            <ErrorMessage>Your search did not match any results.</ErrorMessage>
          </div>
        )}
      />
    </>
  );
}
