import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, Routes, RouterProvider } from "react-router-dom";

import Vote from "./pages/Vote.jsx";
import Home from "./pages/Home.tsx";
import Done from "./pages/Done.tsx";
import NotFound from "./pages/NotFound.tsx";
import "./index.css";

// Router

const router = createBrowserRouter([
  {
    path: "/vote",
    element: <Vote />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/done",
    element: <Done />,
  },
  // Add a catch-all route for 404 errors
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />
  },
  // Default route, matches any location
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Render Route

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
