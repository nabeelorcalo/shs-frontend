import { Fragment, ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// component props interface
interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  const { pathname } = useLocation();

  if (!!!JSON.parse(localStorage.getItem("UserData") || "null")) {
    return <Navigate to="/login" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
