import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../scripts/api";
import { useNavigate} from "react-router-dom";

const LogInView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, user } = useAuth();
  const navigate = useNavigate()
  
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const header: HeadersInit = { 
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    }
    const response = await api.login(header)
    if (response.token && response.expiry) {
      login(response)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate(-1)
    }
  }, [user])

  return (
    <>
    <h2>Log In</h2>
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
      <br/>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username">
      </input>
      <br/>
      <label htmlFor="password">Password:</label>
      <br />
      <input 
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br />
      <button type="submit">Log In</button>
    </form>
    </>
  )
}



export { LogInView }
