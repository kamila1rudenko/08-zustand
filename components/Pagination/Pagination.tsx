import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousClassName={css.prev}
      nextClassName={css.next}
      disabledClassName={css.disabled}
      breakLabel="..."
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      previousLabel="‹"
      nextLabel="›"
    />
  );
}