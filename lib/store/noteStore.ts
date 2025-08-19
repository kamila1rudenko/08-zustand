import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createNote as createNoteApi } from '@/lib/api';
import type { NoteTag } from '@/types/note';

export const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type Draft = typeof initialDraft;

type NoteStore = {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
  createNote: (formData: FormData) => Promise<void>;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
      createNote: async (formData: FormData) => {
        const newNote = {
          title: String(formData.get('title') ?? ''),
          content: String(formData.get('content') ?? ''),
          tag: (formData.get('tag') ?? 'Todo') as NoteTag,
        };
        await createNoteApi(newNote);
        set({ draft: initialDraft });
      },
    }),
    { name: 'note-draft' } 
  )
);