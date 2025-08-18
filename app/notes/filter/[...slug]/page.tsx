import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type NotesPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const rawTag = slug?.[0];
  
  const tagForQuery =
    rawTag && rawTag !== 'All'
      ? rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase()
      : undefined;

  const initialData = await fetchNotes({ search: '', page: 1, tag: tagForQuery });

  return <NotesClient initialData={initialData} initialTag={tagForQuery} />;
}