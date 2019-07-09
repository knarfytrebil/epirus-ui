import { fetchData } from './queries';
import * as React from 'react';
import { defined } from './variable-evaluation';
import { EFetchState, IFetchDataState } from '../models/models-async';
import { IMetadataData } from '../models';

export const success = (res, fetchingCallback) => {
  fetchingCallback({ data: res, fetchState: EFetchState.Success });
};

export const error = (res, fetchingCallback) => {
  fetchingCallback({ data: res, fetchState: EFetchState.Error });
};

export async function handleFileChange(
  event: React.ChangeEvent<HTMLInputElement>,
  fetchingCallback: (fetchState: IFetchDataState<IMetadataData>) => void,
) {
  fetchingCallback({ fetchState: EFetchState.Fetching });
  const files: FileList = event.target.files;
  if (defined(files[0]) && files.length > 0) {
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'application/json');
    await fetchData('/metadata', {
      method: 'POST',
      body: formData,
      headers: {
        accept: '*/*',
      },
    })
      .then((res) => success(res, fetchingCallback))
      .catch((res) => error(res, fetchingCallback));
  }
}

export async function handleDeleteClick(
  swarmHash: string,
  fetchingCallback: (fetchState: IFetchDataState<IMetadataData>) => void,
) {
  fetchingCallback({ fetchState: EFetchState.Fetching });
  await fetchData(`/metadata/${swarmHash}`, {
    method: 'DELETE',
  })
    .then((res) => success(res, fetchingCallback))
    .catch((res) => error(res, fetchingCallback));
}
