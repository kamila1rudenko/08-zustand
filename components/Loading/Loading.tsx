import css from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={css.loading} role="status" aria-live="polite">
      <span className={css.spinner} />
      <span className={css.loadingText}>Loading...</span>
    </div>
  );
}