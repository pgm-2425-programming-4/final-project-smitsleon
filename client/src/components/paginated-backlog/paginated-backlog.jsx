import { useState, useEffect } from "react";
import Backlog from "./backlog/Backlog";
import Pagination from "./pagination/Pagination";

function PaginatedBacklog() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchBacklogTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:1337/api/tasks?populate=task_status&filters[task_status][name][$eq]=Backlog&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
          {
            headers: {

              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch backlog tasks");
        }

        const data = await response.json();
        setTasks(data.data);
        setTotalItems(data.meta.pagination.total);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBacklogTasks();
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="paginated-backlog">
      <h2>Backlog Tasks</h2>
      <p>Total items: {totalItems}</p>
      
      <Backlog tasks={tasks} isLoading={isLoading} error={error} />

      {!isLoading && !error && tasks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}


export default PaginatedBacklog;