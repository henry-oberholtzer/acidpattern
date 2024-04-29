import { Link } from "react-router-dom"

const AuthRootView = () => {
  return (
    <>
      <p>Welcome</p>
      <Link to="/register">Register</Link>
      <br />
      <p>Already have an account?</p>
      <Link to="/login">Log In</Link>
    </>
  )
}

export { AuthRootView }
