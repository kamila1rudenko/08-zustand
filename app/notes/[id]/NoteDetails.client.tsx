'use client';

import css from './NoteDetails.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

const formatDate = (date?: string) => {
  return date ? new Date(date).toLocaleString() : 'N/A';
};

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
    staleTime: 60_000,
  });

  const handleBack = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button className={css.backLink} onClick={handleBack}>← Back</button>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created At: {formatDate(note.createdAt)}</p>
      </div>
    </div>
  );
}
