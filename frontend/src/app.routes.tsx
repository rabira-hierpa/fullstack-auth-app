import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import AccountPage from "./features/account";

import { LoadingSpinner } from "./shared/ui/spinner/loading.spinner";
import { AuthContext } from "./shared/context/auth.context";
import AppLayout from "./shared/layout/app.layout";
import { alert, logger } from "./shared/lib/services";
import { formatErrorMessage } from "./shared/lib/helpers/format.error";

const DashboardPage = React.lazy(() => import("./features/dashboard/page"));

interface AuthenticatedRouteProps {
  component: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  component,
}) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  return auth.isAuthenticated && auth.isAuthenticated() ? (
    <AppLayout>{component}</AppLayout>
  ) : (
    <Navigate to="/account/login" state={{ from: location.pathname }} />
  );
};

export function AppRoutes() {
  const auth = useContext(AuthContext);
  const [userHasPersona] = React.useState<boolean>(true);

  // const callGetMyPersona = React.useCallback(() => {
  //   if (auth?.authState?.expiresAt)
  //     getMyPersonaApi().then(
  //       (myPersonaResponse) => {
  //         setUserHasPersona(!!myPersonaResponse?.length);
  //       },
  //       (error) => {
  //         const _errorMessage = formatErrorMessage(error?.data);
  //         logger.error(error);
  //         alert.error(_errorMessage);
  //       }
  //     );
  // }, [auth?.authState?.expiresAt]);

  // React.useEffect(() => {
  //   callGetMyPersona();
  // }, [callGetMyPersona]);

  if (auth?.loading) {
    return <LoadingSpinner fullScreen={true} />;
  }
  return (
    <Routes>
      <Route path="/account/*" element={<AccountPage />} />
      <Route
        path="/dashboard"
        element={<AuthenticatedRoute component={<DashboardPage />} />}
      />
    </Routes>
  );
}

export default AppRoutes;
