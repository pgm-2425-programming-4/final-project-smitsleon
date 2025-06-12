import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "../components/aside/Aside";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="search-container">
              <input type="text" placeholder="Search tasks..." className="search-input" />
            </div>
          </header>
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});