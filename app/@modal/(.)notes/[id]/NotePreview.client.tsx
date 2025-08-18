'use client';

import React, { useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import css from '@/components/Modal/Modal.module.css';
import { fetchNoteById } from '@/lib/api';

const formatDate = (date?: string) => {
  return date ? new Date(date).toLocaleString() : 'N/A';
};

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isFetching, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleCloseModal = useCallback(() => {
    router.back();
  }, [router]);

  if (isFetching) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleCloseModal}>
      <>
        <h2 className={css.title}>Note Details</h2>
        <p className={css.content}>ID: {note.id}</p>
        <p className={css.content}>Title: {note.title}</p>
        <p className={css.content}>Content: {note.content}</p>
        <p className={css.content}>Tag: {note.tag}</p>
        <p className={css.content}>Created At: {formatDate(note.createdAt)}</p>
        <button type="button" className={css.backLink} onClick={handleCloseModal}>
          Close
        </button>
      </>
    </Modal>
  );
}
