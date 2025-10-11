// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import { TodoProvider } from "./context/TodoContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TodoProvider>
          <App />
          <Toaster position="top-right" richColors closeButton />
        </TodoProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
