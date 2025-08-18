import css from './LayoutNotes.module.css';

type LayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: LayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>    
      <div className={css.notesWrapper}>{children}</div>
      
    </section>
  );
};

export default NotesLayout;