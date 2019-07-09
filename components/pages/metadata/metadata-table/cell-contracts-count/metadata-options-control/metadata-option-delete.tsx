import * as React from 'react';
import { DESKTOP_WIDTH, MOBILE_TEXT } from '../../../../../../style-config';
import { ACTIVE_BUTTON_GREY, HOVER_BUTTON_GREY } from '../../../../../../data';
import { handleDeleteClick } from '../../../../../../utils/metadata';
import { EFetchState } from '../../../../../../models/models-async';
import { renderSwitch } from '../../../../../../utils/conditional-rendering';
import { RouterProps } from 'next-server/router';
import { withRouter } from 'next/router';

let timeout;

export interface IMetadataOptionDeleteProps {
  onClose?(): void;
  router: RouterProps;
  swarmHash: string;
}

function MetadataOptionDelete(props: IMetadataOptionDeleteProps) {
  const { onClose, router, swarmHash } = props;
  const [deleteDataState, setDeleteState] = React.useState({ fetchState: EFetchState.None });

  React.useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setDeleteState({ fetchState: EFetchState.None }), 2000);
    if (
      deleteDataState.fetchState === EFetchState.Error ||
      deleteDataState.fetchState === EFetchState.Success
    ) {
      router.push('/metadata?state=refreshing', '/metadata/refreshing');
      setDeleteState({ fetchState: EFetchState.None });
      if (onClose) {
        onClose();
      }
    }
    return () => clearTimeout(timeout);
  }, [deleteDataState.fetchState]);

  return (
    <>
      <style jsx>{`
        button.MetadataOptionDelete {
          padding: 8px 16px;
          text-align: left;
          width: 100%;
        }
        button.MetadataOptionDelete:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        button.MetadataOptionDelete:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
        span {
          font-size: 14px;
          line-height: 16px;
          color: ${MOBILE_TEXT};
          cursor: pointer;
        }
      `}</style>
      <button
        onClick={() => handleDeleteClick(swarmHash, setDeleteState)}
        className="MetadataOptionDelete"
      >
        {renderSwitch(deleteDataState.fetchState, {
          [EFetchState.None]: () => <span>Delete</span>,
          [EFetchState.Fetching]: () => <span>Deleting...</span>,
          [EFetchState.Success]: () => <span>Deleted</span>,
          [EFetchState.Error]: () => <span>Error</span>,
        })}
      </button>
    </>
  );
}

export default withRouter(MetadataOptionDelete);
