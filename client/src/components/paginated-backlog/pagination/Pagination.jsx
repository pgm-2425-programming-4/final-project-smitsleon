function Pagination({ currentPage, totalPages, onPageChange }) {
  let pageNumberArray;

  if (totalPages <= 6) {
    pageNumberArray = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumberArray.push(i + 1);
    }
  } else if (currentPage > 3 && currentPage < totalPages - 2) {
    pageNumberArray = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      totalPages,
    ];
  } else if (currentPage <= 3) {
    pageNumberArray = [1, 2, 3, 4, null, totalPages];
  } else {
    pageNumberArray = [
      1,
      null,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  const pageLinks = [];
  pageNumberArray.forEach((pageNumber, index) => {
    if (pageNumber === null) {
      pageLinks.push(
        <li key={index}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
      );
    } else {
      pageLinks.push(
        <li key={index}>
          <button
            className={
              "pagination-link " +
              (pageNumber === currentPage ? "is-current" : "")
            }
            aria-label={`Go to page ${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    }
  });

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <ul className="pagination-list">{pageLinks}</ul>
      <button
        className="pagination-next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next page
      </button>
    </nav>
  );
}

export default Pagination;