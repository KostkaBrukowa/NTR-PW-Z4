import { NoteModel } from '../../data/models/NoteModel';
import useFetch from 'react-fetch-hook';
import { NoteDTO } from '../../data/contracts/NoteContract';
import { fromResponse } from '../../data/mappers/NoteMapper';
import { useEffect, useState } from 'react';

const ADRESS = 'http://localhost:5000/api';

function useTriggerableFetch<T>(
  query: string,
  options: useFetch.HookOptions | useFetch.HookOptionsWithFormatter<T>
): [() => void, useFetch.FetchResult<T>] {
  const [requestSent, setRequestSent] = useState(false);
  const fetchValues = useFetch<T>(query, {
    depends: [requestSent],
    ...options
  });

  const trigger = (): void => setRequestSent(true);

  return [trigger, fetchValues];
}

function useTriggerableStatusFetch(
  query: string,
  expectedStatusCode: number,
  callback?: () => void,
  options?: useFetch.HookOptions | useFetch.HookOptionsWithFormatter<number>
): [() => void, boolean, number | undefined, any] {
  const [trigger, fetchValues] = useTriggerableFetch<number>(query, {
    formatter(response: Response): Promise<number> {
      return Promise.resolve(response.status);
    },
    ...options
  });
  const { data: statusCode, isLoading, error } = fetchValues;

  const requestSucceed = statusCode === expectedStatusCode;

  useEffect(() => {
    if (requestSucceed) {
      if (callback) {
        callback();
      }
    }
  }, [requestSucceed, callback]);

  return [trigger, isLoading, statusCode, error];
}

export function useFetchAllNotes(): [boolean, NoteModel[] | undefined, () => void] {
  const [callCount, setCallCount] = useState(1);
  const { data, isLoading } = useFetch<NoteDTO[]>(`${ADRESS}/values`, {
    depends: [callCount]
  });

  const reload = (): void => setCallCount(callCount + 1);

  return [isLoading, data && data.map(fromResponse), reload];
}

export function useFetchNote(id: string | undefined): [boolean, NoteModel | undefined] {
  const { data, isLoading } = useFetch<NoteModel>(`${ADRESS}/values/${id}`, {
    depends: [id],
    async formatter(response: Response): Promise<NoteModel> {
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

export function useFetchSaveNote(id: string | null, onPostCallback?: () => void): [() => void, boolean] {
  const [trigger, isLoading] = useTriggerableStatusFetch(`/api/values`, 201, onPostCallback, {
    method: 'POST'
  });

  return [trigger, isLoading];
}
