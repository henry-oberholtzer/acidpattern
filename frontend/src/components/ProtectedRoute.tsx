import { Navigate, Outlet } from "react-router-dom";
import { UserContext, useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth() as UserContext

  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet/>

}

export { ProtectedRoute }
