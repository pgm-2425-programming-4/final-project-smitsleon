import { useState, useEffect } from "react";
import { Pagination } from "./pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchPaginatedTasks } from "../../queries/fetch-paginated-tasks";
import { BacklogList } from "./backlog/Backlog";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBackLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogTasks, setBacklogTasks] = useState([]);

  const {
    isPending,
    isError,
    data: fetchedBacklogTasks,
    error,
  } = useQuery({
    queryKey: ["backlogTasks", { currentPage, pageSize }],
    queryFn: () => fetchPaginatedTasks(pageSize, currentPage),
  });

  useEffect(() => {
    if (fetchedBacklogTasks) {
      if (currentPage > fetchedBacklogTasks.meta.pagination.pageCount) {
        setCurrentPage(fetchedBacklogTasks.meta.pagination.pageCount);
      }
      setBacklogTasks(fetchedBacklogTasks.data);
      setPageCount(fetchedBacklogTasks.meta.pagination.pageCount);
    }
  }, [currentPage, fetchedBacklogTasks]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
  }

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <BacklogList backlogTasks={backlogTasks} />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />
    </>
  );
}
