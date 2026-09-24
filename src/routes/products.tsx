import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for the products subtree. The listing lives in
// products.index.tsx (URL /products) and the detail page in
// products.$slug.tsx (URL /products/$slug), which mounts via <Outlet />.
export const Route = createFileRoute("/products")({
  component: () => <Outlet />,
});
