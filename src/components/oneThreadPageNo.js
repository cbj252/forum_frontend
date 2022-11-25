import React from "react";
import { useSearchParams, useLocation } from "react-router-dom";

const OneThreadPageNo = function OneThreadPageNo(props) {
  let currentthreadUrl = useLocation().pathname;
  let [searchParams] = useSearchParams();

  let startPost = 0;
  if (!isNaN(parseInt(searchParams.get("start")))) {
    startPost = parseInt(searchParams.get("start"));
  }

  let totalPages = Math.floor(props.totalPostNo / 10) + 1;
  let currentPage = Math.floor(startPost / 10) + 1;

  function createOneBox(pageNo) {
    if (pageNo === currentPage) {
      return (
        <span key={pageNo} className="pageBox halfLeftMargin">
          {" "}
          {pageNo}{" "}
        </span>
      );
    } else {
      let link = currentthreadUrl + `?start=${(pageNo - 1) * 10}`;
      return (
        <span key={pageNo} className="pageBox halfLeftMargin">
          <a href={link}>{pageNo}</a>
        </span>
      );
    }
  }

  function communicator() {
    let loopList = [];
    function dots() {
      return <p className="halfLeftMargin"> ... </p>;
    }
    /* Thinking of a better solution that isn't this messy. It should show the first page, last page and the two pages next to the surrounding page. 
    / If there is a gap between the first/last and the two surrounding, there will be dots in between. */
    if (currentPage - 1 >= 1) {
      if (currentPage !== 2) {
        loopList.push(dots());
      }
      loopList.push(createOneBox(currentPage - 1));
    }
    loopList.push(createOneBox(currentPage));
    if (currentPage + 1 <= totalPages) {
      loopList.push(createOneBox(currentPage + 1));
    }
    if (currentPage + 1 < totalPages) {
      if (currentPage + 2 === totalPages) {
        loopList.push(dots());
      }
      loopList.push(createOneBox(totalPages));
    }
    return loopList;
  }

  return (
    <nav
      id="pageNoNav"
      className="topMargin smallText flexRow flexCrossCenter flexEnd"
    >
      <span>
        {props.totalPostNo} posts • Page {currentPage} of {totalPages} •
      </span>
      {communicator()}
    </nav>
  );
};

export default OneThreadPageNo;
