import { useState, useEffect } from "react";
import { Pagination } from "./pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchPaginatedTasks } from "../../queries/fetch-paginated-tasks";
import { BacklogList } from "./backlog/Backlog";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBackLog({ selectedProject = null }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogTasks, setBacklogTasks] = useState([]);

  // Reset pagination when project changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProject]);
  const {
    isPending,
    isError,
    data: fetchedBacklogTasks,
    error,
  } = useQuery({
    queryKey: ["backlogTasks", { currentPage, pageSize, selectedProject }],
    queryFn: () => fetchPaginatedTasks(pageSize, currentPage, selectedProject),
    enabled: !!selectedProject, // Only fetch when a project is selected
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
    setCurrentPage(1); // Reset to first page when changing page size
  }

  // Show message if no project is selected
  if (!selectedProject) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
        }}
      >
        <h3>Geen project geselecteerd</h3>
        <p>Selecteer een project uit de sidebar om de backlog te bekijken.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="backlog-content">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="backlog-content">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="backlog-content">
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
    </div>
  );
}
