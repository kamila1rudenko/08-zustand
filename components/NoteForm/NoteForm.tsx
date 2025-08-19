'use client';

import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';


export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, createNote } = useNoteStore();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createNote(formData);
    router.back();
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
        <button type="submit" className={css.submitButton}>
          Create Note
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}