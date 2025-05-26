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

  // API token STRAPI
  const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

  useEffect(() => {
    const fetchBacklogTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:1337/api/tasks?populate=task_status&filters[task_status][name][$eq]=Backlog&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch backlog tasks: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.data) {
          setTasks(data.data);
          setTotalItems(data.meta?.pagination?.total || 0);
        } else {
          console.error("Unexpected API response format:", data);
          setError(new Error("Invalid API response format"));
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
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
