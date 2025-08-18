import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../lib/api";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
       <li key={note.id} className={css.listItem}>
  <Link href={`/notes/${note.id}`} className={css.titleLink}>
    <h2 className={css.title}>{note.title}</h2>
  </Link>
  <p className={css.content}>{note.content}</p>
  <div className={css.footer}>
    <span className={css.tag}>{note.tag}</span>
    <button
      className={css.button}
      onClick={() => handleDelete(note.id)}
      disabled={deleteMutation.isPending}
    >
      Delete
    </button>
  </div>
</li>
      ))}
    </ul>
  );
}
