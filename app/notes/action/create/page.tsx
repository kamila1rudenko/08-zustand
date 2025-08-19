import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create a new note',
  openGraph: {
    title: 'Create Note',
    description: 'Create a new note',
    url: 'https://08-zustand-wheat.vercel.app/notes/action/create',
    type: 'website',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
