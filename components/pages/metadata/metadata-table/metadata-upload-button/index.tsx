import * as React from 'react';
import { ICON } from '../../../../svg';
import {
  HEADER_ICON_PURPLE,
  HI_BLUE,
  HOVER_PURPLE_TEXT,
  MAIN_TABLE_PADDING,
} from '../../../../../style-config';
import { ELoadingSpinnerType, LoadingSpinner } from '../../../../placeholders';
import { handleFileChange } from '../../../../../utils/metadata';
import { EFetchState } from '../../../../../models/models-async';
import { renderSwitch } from '../../../../../utils/conditional-rendering';
import { RouterProps } from 'next-server/router';
import { withRouter } from 'next/router';
const id = 'MetadataUploadButton';
let timeout;

export interface IMetadataUploadButtonProps {
  router: RouterProps;
}

function MetadataUploadButton(props: IMetadataUploadButtonProps) {
  const [uploadDataState, setUploadState] = React.useState({ fetchState: EFetchState.None });
  React.useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setUploadState({ fetchState: EFetchState.None }), 2000);
    if (
      uploadDataState.fetchState === EFetchState.Error ||
      uploadDataState.fetchState === EFetchState.Success
    ) {
      props.router.push('/metadata?state=refreshing', '/metadata/refreshing');
    }
    return () => clearTimeout(timeout);
  }, [uploadDataState.fetchState]);
  const isDisabled = uploadDataState.fetchState === EFetchState.Fetching;
  return (
    <>
      <style jsx>{`
        label.MetadataUploadButton {
          position: absolute;
          right: ${MAIN_TABLE_PADDING}px;
          top: ${MAIN_TABLE_PADDING}px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 12px;
          height: 40px;
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
        }
        span.text {
          margin-left: 8px;
        }
        label + input[name='file'] {
          display: none;
        }
      `}</style>
      <label className="MetadataUploadButton --blue-square" htmlFor={id}>
        {renderSwitch(uploadDataState.fetchState, {
          [EFetchState.None]: () => (
            <>
              {ICON.Plus}
              <span className="text">Upload Metadata</span>
            </>
          ),
          [EFetchState.Fetching]: () => (
            <>
              <LoadingSpinner type={ELoadingSpinnerType.White} style={{ width: 18, height: 18 }} />
              <span className="text">Upload Metadata</span>
            </>
          ),
          [EFetchState.Success]: () => (
            <>
              {ICON.Tick}
              <span className="text">Upload Metadata</span>
            </>
          ),
          [EFetchState.Error]: () => (
            <>
              {ICON.ErrorCross}
              <span className="text">Something went wrong</span>
            </>
          ),
        })}
      </label>
      <input
        name="file"
        type="file"
        disabled={isDisabled}
        id={id}
        onChange={(e) => handleFileChange(e, setUploadState)}
      />
    </>
  );
}

export default withRouter(MetadataUploadButton);
