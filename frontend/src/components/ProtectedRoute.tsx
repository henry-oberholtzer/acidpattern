import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Children } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }
  return children;
}
