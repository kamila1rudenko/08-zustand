
import axios from 'axios';
import type { CreateNotePayload, Note } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseUrl = 'https://notehub-public.goit.study/api';
const notesUrl = `${baseUrl}/notes`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export async function fetchNotes(
  params: { search?: string; page?: number; tag?: string; perPage?: number } = {}
): Promise<FetchNotesResponse> {
  const { search = '', page = 1, tag, perPage = 12 } = params;

  const queryParams: Params = { page, perPage };
  if (search) queryParams.search = search;
  if (tag) queryParams.tag = tag;

  const response = await axios.get<FetchNotesResponse>(notesUrl, {
    params: queryParams,
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
}


export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${notesUrl}`, noteData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${notesUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${notesUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
}