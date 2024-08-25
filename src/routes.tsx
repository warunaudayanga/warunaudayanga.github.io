import type { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";

export const router: Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // errorElement: <ErrorPage />,
    },
]);
