"use client";
import React from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import "./pagination.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

type PaginationProps = {
  page: number;
};
const Pagination: React.FC<PaginationProps & ReactPaginateProps> = (props) => {
  return (
    <div>
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
      />
    </div>
  );
};

export default Pagination;
