import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <ul>
      <li>This is a navigation skeleton</li>
      <li><Link to="/patterns">Patterns</Link></li>
      <li><Link to="/login">Log In</Link></li>
      <li><Link to="/register">Register</Link></li>
    </ul>
  )
}

export { Navigation }
