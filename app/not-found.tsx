import css from './not-found.module.css'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not-found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'Not-found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://08-zustand-wheat.vercel.app/',
    images: [
      {
        url: ' https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Opss',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}