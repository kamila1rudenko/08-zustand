'use client';

import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag, CreateNotePayload, Note } from '@/types/note';
import { createNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation<Note, Error, CreateNotePayload>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newNote: CreateNotePayload = {
      title: String(formData.get('title') ?? ''),
      content: String(formData.get('content') ?? ''),
      tag: (formData.get('tag') ?? 'Todo') as NoteTag,
    };
    mutate(newNote);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
          className={css.input}
        />
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          required
          className={css.textarea}
        />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Meeting">Meeting</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Note'}
        </button>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
