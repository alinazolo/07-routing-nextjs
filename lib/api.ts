import axios from 'axios';

import type { Note } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesProps {
search: string;
page: number;
perPage: number;
}
 
export const fetchNotes = async ({ search, page, perPage }: fetchNotesProps ) => {
  const params: Record<string, string | number | undefined> = {};
  if (search) params.search = search;
  if (page) params.page = page;
  if (perPage) params.perPage = perPage;
  const {data} = await axios.get<FetchNotesResponse>("/notes",
    {
      params,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return data;
};

export const fetchNoteById = async(id: string) => {
  const { data } = await axios.get<Note>(`/notes/${id}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );
  return data;
}


export const createNote = async (noteData: Pick<Note, "title" | "content" | "tag"> ) => {
  const { data } = await axios.post<Note>(`/notes`, noteData,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return data;
};

export const deleteNote = async (id: string) => {
const { data } = await axios.delete<Note>(`/notes/${id}`,
     {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
);
return data;
};