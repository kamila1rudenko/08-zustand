'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import css from './Notes.module.css';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Loading from '@/components/Loading/Loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

import { fetchNotes } from '@/lib/api';
import Link from 'next/link';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 700);
  const [currentPage, setCurrentPage] = useState(1);

  const normalizedTag =
    tag && tag !== 'All'
      ? tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
      : undefined;

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['notes', { page: currentPage, tag: normalizedTag ?? '', search: debouncedSearchValue }],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearchValue,
        page: currentPage,
        tag: normalizedTag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  if (!data) return null;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchValue} onChange={handleSearch} />
        {data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      {isFetching && <Loading />}
      {isError && <ErrorMessage message="Failed to fetch notes" />}

      {isSuccess &&
        (data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <div className={css.emptyState}>
            <p>No notes found. Create your first note!</p>
          </div>
        ))}
    </div>
  );
}
