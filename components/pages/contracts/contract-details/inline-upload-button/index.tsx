import * as React from 'react';
import { LIGHT_PURPLE_TEXT } from '../../../../../style-config';
import { handleFileChange, renderSwitch, resolveLink } from '../../../../../utils';
import { HOVER_PURPLE_TEXT } from '../../../../../data';
import { EFetchState, IFetchDataState } from '../../../../../models/models-async';
import { TextLink, TextOnly } from '../../../../table-content/desktop/table/table-data-row';
import { ELinkType, IMetadataData } from '../../../../../models';
const id = 'InlineUploadButton';

export interface IInlineUploadButtonProps {
  initialFetchDataState: IFetchDataState<IMetadataData>;
}

export function InlineUploadButton(props: IInlineUploadButtonProps) {
  const [uploadDataState, setUploadState] = React.useState(props.initialFetchDataState);
  const renderSuccess = () => {
    if (uploadDataState.data) {
      const data: IMetadataData = uploadDataState.data;
      const link = resolveLink(data.links, ELinkType.Metadata);
      if (link) {
        return (
          <TextLink style={{ fontSize: 12, width: 'auto' }} href={link.href}>
            {uploadDataState.data.name || 'View'}
          </TextLink>
        );
      } else {
        return (
          <TextOnly style={{ fontSize: 12, width: 'auto' }}>
            {uploadDataState.data.name || '-'}
          </TextOnly>
        );
      }
    }
  };
  return (
    <>
      <style jsx>{`
        label.InlineUploadButton {
          color: ${LIGHT_PURPLE_TEXT};
          cursor: pointer;
        }
        span {
          color: ${LIGHT_PURPLE_TEXT};
          font-size: 12px;
          line-height: 16px;
        }
        span.InlineUploadButton:hover {
          color: ${HOVER_PURPLE_TEXT};
          text-decoration: underline;
        }
        input[name='file'] {
          display: none;
        }
      `}</style>
      {renderSwitch(uploadDataState.fetchState, {
        [EFetchState.None]: () => (
          <label className="InlineUploadButton" htmlFor={id}>
            <span>Upload</span>
          </label>
        ),
        [EFetchState.Fetching]: () => <span>Uploading...</span>,
        [EFetchState.Success]: renderSuccess,
        [EFetchState.Error]: () => (
          <label className="InlineUploadButton" htmlFor={id}>
            <span>Error (Click to try again)</span>
          </label>
        ),
      })}
      <input
        name="file"
        type="file"
        id={id}
        onChange={(e) => handleFileChange(e, setUploadState)}
      />
    </>
  );
}
