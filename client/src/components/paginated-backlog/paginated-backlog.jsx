import { useState, useEffect } from "react";
import Backlog from "./backlog/Backlog";
import Pagination from "./pagination/Pagination";

function PaginatedBacklog() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchBacklogTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:1337/api/tasks?populate=statuss&filters[statuss][name][$eq]=Backlog&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              Authorization: "Bearer 2df269afc96fde835580f0d04d24baf9bf6a867ade971b86eff0241d2f2376b10a5d886bf6b2bea67e080975f73cec3e77dd2236138e3ab39ff8a65063691ae7505142b547e882596a23d9dc302f01c51afb1e8aafde62d476649273d366f214106b7a4a1de1f4bef17550ca4c863082d6997797b2ab4a1f3f58179f853cb862",
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
      <h2>Backlog</h2>

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
