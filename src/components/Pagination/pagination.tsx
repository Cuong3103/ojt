import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import Image from "next/image";

interface PaginationProps {
  page: number;
}
const Pagination: React.FC<PaginationProps> = ({ page }) => {
  return (
    <div>
      {/** 
      <button onClick={handleFirstPage}>First</button>{" "}*/}
      <ReactPaginate
        nextLabel={
          <Image
            className="arrowImg"
            height={24}
            width={24}
            src={"./assets/arrow_forward_ios.svg"}
            alt=""
          />
        }
        // onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={page}
        previousLabel={
          <Image
            className="arrowImg"
            height={24}
            width={24}
            src={"./assets/arrow_back_ios.svg"}
            alt=""
          />
        }
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
      {/** 
      <button onClick={handleLastPage}>Last</button>*/}
    </div>
  );
};

export default Pagination;
