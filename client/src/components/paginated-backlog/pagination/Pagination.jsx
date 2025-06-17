import { PAGE_SIZE_OPTIONS } from "../../../constants/constants";

export function Pagination({
  currentPage,
  pageCount,
  pageSize,
  onPageChanged,
  onPageSizeChanged,
}) {
  let pageNumberArray;

  if (pageCount <= 6) {
    pageNumberArray = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumberArray.push(i + 1);
    }
  } else if (currentPage > 3 && currentPage < pageCount - 2) {
    pageNumberArray = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      pageCount,
    ];
  } else if (currentPage <= 3) {
    pageNumberArray = [1, 2, 3, 4, null, pageCount];
  } else {
    pageNumberArray = [
      1,
      null,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  const pageLinks = [];
  pageNumberArray.forEach((pageNumber, index) => {
    if (pageNumber === null) {
      pageLinks.push(
        <li key={index}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>,
      );
    } else {
      pageLinks.push(
        <li key={index}>
          <button
            className={
              "page-button " + (pageNumber === currentPage ? "active" : "")
            }
            aria-label={`Go to page ${pageNumber}`}
            onClick={() => onPageChanged(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>,
      );
    }
  });

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="page-button"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>
      <ul className="pagination-list">{pageLinks}</ul>
      <button
        className="page-button"
        disabled={currentPage === pageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next
      </button>
      <div>
        <select
          className="dropdown"
          defaultValue={pageSize}
          onChange={(event) => onPageSizeChanged(event.target.value)}
        >
          {PAGE_SIZE_OPTIONS.map((pageSizeOption) => {
            return (
              <option value={pageSizeOption} key={pageSizeOption}>
                {pageSizeOption} items per page
              </option>
            );
          })}
        </select>
      </div>
    </nav>
  );
}
