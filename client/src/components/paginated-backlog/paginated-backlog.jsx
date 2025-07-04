import { useState, useEffect } from "react";
import { Pagination } from "./pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchPaginatedTasks } from "../../queries/fetch-paginated-tasks";
import { fetchProjects } from "../../queries/fetch-projects";
import { BacklogList } from "./backlog/Backlog";
import { useQuery } from "@tanstack/react-query";
import EditTaskForm from "../EditTaskForm";

export function PaginatedBackLog({ selectedProject = null }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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

  // Fetch projects for the edit form
  const { data: projectList } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
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

  const handleTaskClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };
  // Show message if no project is selected
  if (!selectedProject) {
    return (
      <div className="no-project-selected">
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
      <div className="backlog-list-container">
        <BacklogList
          backlogTasks={backlogTasks}
          onTaskClick={handleTaskClick}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />{" "}
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={handleCloseEdit}
          projects={projectList?.data || []}
        />
      )}
    </div>
  );
}
