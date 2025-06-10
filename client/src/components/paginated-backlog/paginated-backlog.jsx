import { useState, useEffect } from "react";
import { Pagination } from "./pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchPaginatedTasks } from "../../queries/fetch-paginated-tasks";
import { BacklogList } from "./backlog/Backlog";
import { ProjectAside } from "../aside/Aside";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBackLog({
  selectedProject: initialSelectedProject = null,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(
    initialSelectedProject,
  );

  // Update selectedProject when initialSelectedProject changes
  useEffect(() => {
    setSelectedProject(initialSelectedProject);
  }, [initialSelectedProject]);

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
    setCurrentPage(1); // Reset to first page when changing project
  }

  // Hide the sidebar when we have a pre-selected project
  const showSidebar = initialSelectedProject === null;

  if (isPending) {
    return (
      <div className={showSidebar ? "app-layout" : "main-content"}>
        {showSidebar && (
          <ProjectAside
            selectedProject={selectedProject}
            onProjectChange={handleProjectChange}
          />
        )}
        <main className={showSidebar ? "main-content" : "backlog-content"}>
          <span>Loading...</span>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={showSidebar ? "app-layout" : "main-content"}>
        {showSidebar && (
          <ProjectAside
            selectedProject={selectedProject}
            onProjectChange={handleProjectChange}
          />
        )}
        <main className={showSidebar ? "main-content" : "backlog-content"}>
          <span>Error: {error.message}</span>
        </main>
      </div>
    );
  }

  return (
    <div className={showSidebar ? "app-layout" : "main-content"}>
      {showSidebar && (
        <ProjectAside
          selectedProject={selectedProject}
          onProjectChange={handleProjectChange}
        />
      )}
      <main className={showSidebar ? "main-content" : "backlog-content"}>
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
