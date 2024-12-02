import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css"; // For Ant Design v5+
import { AuthProvider } from "./shared/context/auth.context.tsx";
import { environment } from "./features/account/environments/environment.dev.ts";
import { LoadingSpinner } from "./shared/ui/spinner/loading.spinner.tsx";
import AppRoutes from "./app.routes.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider environment={environment}>
        <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
