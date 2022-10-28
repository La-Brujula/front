import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AppRouter } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Suspense
            fallback={
                <CircularProgress className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            }
        >
            <RouterProvider router={AppRouter} />
        </Suspense>
    </React.StrictMode>
);
