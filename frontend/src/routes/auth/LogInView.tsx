import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../scripts/api";
import { useNavigate} from "react-router-dom";
import { FormFrame, ModalFrame, NavigationButton, DisplayTitle, ErrorField, TextInput } from "../../components/UI";

const LogInView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, user } = useAuth();
  const [errors, setErrors] = useState("")
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
    } else if (response.detail) {
      setErrors(response.detail)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate("/")
    }
  })

  return (
    <>
    <ModalFrame>
    <DisplayTitle $size={"md"}>Log In</DisplayTitle>
    <FormFrame onSubmit={handleLogin}>
      <TextInput
        state={[username, setUsername]}
        name={"username"}
        type={"text"}
        label={"Username:"}
      />
      <TextInput
        state={[password, setPassword]}
        name={"password"}
        type={"password"}
        label={"Password:"}
      />
      <NavigationButton text={"log in"}></NavigationButton>
    </FormFrame>
    </ModalFrame>
      {errors ? <ErrorField $active>{errors}</ErrorField> : <ErrorField></ErrorField>}
      </>
  )
}



export { LogInView }
