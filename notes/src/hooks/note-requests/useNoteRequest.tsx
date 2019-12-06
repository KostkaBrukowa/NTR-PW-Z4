import { NoteModel } from '../../data/models/NoteModel';
import useFetch from 'react-fetch-hook';
import { NoteDTO } from '../../data/contracts/NoteContract';
import { fromResponse, toResponse } from '../../data/mappers/NoteMapper';
import { useContext, useEffect, useState } from 'react';
import { GlobalStateStore } from '../../data/state/GlobalStateContext';

const ADRESS = 'http://localhost:5000/api';

function useTriggerableFetch<T>(
  query: string,
  options: useFetch.HookOptions | useFetch.HookOptionsWithFormatter<T>
): [() => void, useFetch.FetchResult<T>] {
  const [requestSent, setRequestSent] = useState(false);
  const fetchValues = useFetch<T>(query, {
    depends: [requestSent, ...(options.depends ? options.depends : [])],
    ...options
  });

  useEffect(() => {
    setRequestSent(false);
  }, [requestSent]);

  const trigger = (): void => setRequestSent(true);

  return [trigger, fetchValues];
}

function useTriggerableStatusFetch(
  query: string,
  expectedStatusCode: number,
  callback?: () => void,
  options?: useFetch.HookOptions | useFetch.HookOptionsWithFormatter<number>
): [() => void, boolean, number | undefined, any] {
  const [callbackCalled, setCallbackCalled] = useState(!callback);
  const [trigger, fetchValues] = useTriggerableFetch<number>(query, {
    formatter(response: Response): Promise<number> {
      if (!response.ok) throw Error(response.statusText);
      return Promise.resolve(response.status);
    },
    ...options
  });
  const { data: statusCode, isLoading, error } = fetchValues;

  const requestSucceed = statusCode === expectedStatusCode;

  useEffect(() => {
    if (requestSucceed && !callbackCalled) {
      if (callback) {
        callback();
      }

      setCallbackCalled(true);
    }
  }, [requestSucceed, callback]);

  return [trigger, isLoading, statusCode, error];
}

export function useFetchAllNotes(): [boolean, NoteModel[] | undefined, () => void] {
  const [callCount, setCallCount] = useState(1);
  const { state } = useContext(GlobalStateStore);
  const { data, isLoading } = useFetch<NoteDTO[]>(`${ADRESS}/values?${state.filters.toQueryParams()}`, {
    depends: [callCount]
  });

  const reload = (): void => {
    // console.log('reload');
    setCallCount(callCount + 1);
  };
  console.log('callCount: ', callCount);

  return [isLoading, data && data.map(fromResponse), reload];
}

export function useFetchNote(id: string | undefined): [boolean, NoteModel | undefined] {
  const { data, isLoading } = useFetch<NoteModel>(`${ADRESS}/values/${id}`, {
    depends: [id],
    async formatter(response: Response): Promise<NoteModel> {
      if (!response.ok) throw Error(response.statusText);
      return fromResponse(await response.json());
    }
  });

  return [isLoading, data];
}

export function useFetchDeleteNote(id: string | null, onDeleteCallback: () => void): [() => void, boolean] {
  const [trigger, isLoading] = useTriggerableStatusFetch(`/api/values/${id}`, 204, onDeleteCallback, {
    method: 'DELETE'
  });

  return [trigger, isLoading];
}

export function useFetchSaveNote(
  note: NoteModel | null,
  onPostCallback?: () => void
): [() => void, boolean, string, number | undefined] {
  const [trigger, isLoading, statusCode, error] = useTriggerableStatusFetch(`/api/values`, 201, onPostCallback, {
    method: 'POST',
    body: note && JSON.stringify(toResponse(note)),
    headers: {
      'Content-Type': 'application/json'
    },
    depends: [note]
  });

  return [trigger, isLoading, error, statusCode];
}
