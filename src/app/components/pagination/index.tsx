"use client";
import React from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import "./pagination.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

type PaginationProps = {
  page: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps & ReactPaginateProps> = (props) => {
  const handleSearch = (event) => {
    props.setCurrentPage(event.selected);
  };

  return (
    <div className="flex items-center m-auto">
      <article className="max-w-fit">
        <ReactPaginate
          nextLabel={<MdNavigateNext />}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={props.page}
          previousLabel={<MdNavigateBefore />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          onPageChange={handleSearch}
        />
      </article>
    </div>
  );
};

export default Pagination;
