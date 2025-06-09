import { useState, useEffect } from "react";
import { Pagination } from "./pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchPaginatedTasks } from "../../queries/fetch-paginated-tasks";
import { BacklogList } from "./backlog/Backlog";
import { ProjectAside } from "../aside/Aside";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBackLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const {
    isPending,
    isError,
    data: fetchedBacklogTasks,
    error,
  } = useQuery({
    queryKey: ["backlogTasks", { currentPage, pageSize, selectedProject }],
    queryFn: () => fetchPaginatedTasks(pageSize, currentPage, selectedProject),
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

  function handleProjectChange(projectId) {
    setSelectedProject(projectId);
  }

  if (isPending) {
    return (
      <div className="app-layout">
        <ProjectAside 
          selectedProject={selectedProject}
          onProjectChange={handleProjectChange}
        />
        <main className="main-content">
          <span>Loading...</span>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="app-layout">
        <ProjectAside 
          selectedProject={selectedProject}
          onProjectChange={handleProjectChange}
        />
        <main className="main-content">
          <span>Error: {error.message}</span>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <ProjectAside 
        selectedProject={selectedProject}
        onProjectChange={handleProjectChange}
      />
      <main className="main-content">
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
      </main>
    </div>
  );
}