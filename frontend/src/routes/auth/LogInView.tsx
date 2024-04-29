import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../scripts/api";
import { TextInput } from "../../components/TextInput";
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
      navigate("/")
    }
  })

  return (
    <>
    <h2>Log In</h2>
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
      <br/>
      <TextInput
        state={[username, setUsername]}
        name={"username"}
      />
      <br/>
      <label htmlFor="password">Password:</label>
      <br />
      <TextInput
        state={[password, setPassword]}
        name={"password"}
        type={"password"}
      />
      <br />
      <button type="submit">Log In</button>
    </form>
    </>
  )
}



export { LogInView }
