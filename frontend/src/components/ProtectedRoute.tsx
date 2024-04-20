import { Navigate } from "react-router-dom";
import { UserContext, useAuth } from "../hooks/useAuth";
import { PropsWithChildren } from "react";

const ProtectedRoute = (props: PropsWithChildren) => {
  const { user } = useAuth() as UserContext
  if (!user) {
    return <Navigate to="/login" />
  }
  return props.children;
}

export { ProtectedRoute }
