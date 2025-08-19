import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from "next";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug.join(", ");

  return {
    title: `Notes - ${filterName}`,
    description: `A list of notes filtered by: ${filterName}`,
    openGraph: {
      title: `Notes - ${filterName}`,
      description: `A list of notes filtered by: ${filterName}`,
      url: 'https://08-zustand-wheat.vercel.app/notes/filter/' + slug.join('/'),
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Notes Open Graph Image',
        },
      ],
    },

  };
}

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