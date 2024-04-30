import { useActionData } from "react-router-dom";
import { useState } from "react";
import { FormFrame, ModalFrame, NavigationButton, DisplayTitle, TextInput, ValidationTile } from "../../components/UI";
import { api } from "../../scripts/api";


const RegisterView = () => {
  const errors = useActionData() as RegisterErrors

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [ usernameValid, setUsernameValid] = useState<boolean>(false)
  const [ emailValid, setEmailValid] = useState<boolean>(false)
  const [ passwordValid, setPasswordValid ] = useState<boolean>(false)
  const [ confirmPasswordValid, setConfirmPasswordValid ] = useState<boolean>(false)
  const [ xoxCheck, setXoxCheck ] = useState<boolean>(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await api.register({
      username: username,
      password: password,
      email: email,
    })
  }

  const validateUsername = (username: string) => {
      const regex = /^[\w.@+-]{3,20}/
      const result = regex.test(username)
      setUsernameValid(result)
  }

  const validateEmail = (email: string) => {
      const regex = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,6}$/g
      const result = regex.test(email)
      setEmailValid(result)
  }

  const validatePassword = (testPassword: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const result = regex.test(testPassword)
    setPasswordValid(result)
  }

  const validateConfirmPassword = (confirmPassword: string) => {
    const result = password === confirmPassword
    setConfirmPasswordValid(result)
  }

  return (
    <ModalFrame>
    <DisplayTitle $size={"md"}>Register</DisplayTitle>
    <FormFrame onSubmit={handleRegister}>
      <TextInput
        state={[username, setUsername]}
        name={"username"}
        type={"text"}
        label={"Username:"}
        validator={[usernameValid, validateUsername]}
      />
      {errors?.username && <span>{errors.username}</span>}
      <TextInput
        state={[email, setEmail]}
        name={"email"}
        type={"email"}
        label={"Email:"}
        validator={[emailValid, validateEmail]}
      />
      {errors?.email && <span>{errors.email}</span>}
      <TextInput
        state={[password, setPassword]}
        name={"password"}
        type={"password"}
        label={"Password:"}
        validator={[passwordValid, validatePassword]}
      />
      {errors?.password && <span>{errors.password}</span>}
      <TextInput
        state={[confirmPassword, setConfirmPassword]}
        name={"confirmPassword"}
        type={"password"}
        label={"Confirm Password:"}
        validator={[confirmPasswordValid, validateConfirmPassword]}
      />
      {errors?.confirmPassword && <span>{errors.confirmPassword}</span>}
      <ValidationTile
        state={[ xoxCheck, setXoxCheck ]}
      />
      <NavigationButton disabled={!(
        usernameValid === true 
        && passwordValid === true 
        && emailValid === true 
        && confirmPasswordValid === true 
        && xoxCheck === true)} text={"register"}></NavigationButton>
    </FormFrame>
    </ModalFrame>
  )
}

export { RegisterView }
