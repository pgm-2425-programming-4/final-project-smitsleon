import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ProjectAside } from "../components/aside/Aside";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="app">
        <ProjectAside />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
