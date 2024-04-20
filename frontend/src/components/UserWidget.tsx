import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const UserWidget = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <>
        <p>{user.user.username}</p>
        <Link to="/logout">Log Out</Link>
      </>
    )
  } else
  {
  return (
    <>    
      <Link to="/login">Log In</Link>
      <Link to="/register">Register</Link>
    </>
    )
  }
}

export { UserWidget }
