import { useActionData } from "react-router-dom";
import { useState } from "react";
import { FormFrame, ModalFrame, NavigationButton, DisplayTitle, ErrorField, TextInput } from "../../components/UI";


const RegisterView = () => {
  const errors = useActionData() as RegisterErrors

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = () => {
    
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
      />
      {errors?.username && <span>{errors.username}</span>}
      <TextInput
        state={[email, setEmail]}
        name={"email"}
        type={"email"}
        label={"Email:"}
      />
      {errors?.email && <span>{errors.email}</span>}
      <TextInput
        state={[password, setPassword]}
        name={"password"}
        type={"password"}
        label={"Password:"}
      />
      {errors?.password && <span>{errors.password}</span>}
      <TextInput
        state={[confirmPassword, setConfirmPassword]}
        name={"confirmPassword"}
        type={"password"}
        label={"Confirm Password:"}
      />
      {errors?.confirmPassword && <span>{errors.confirmPassword}</span>}
      <NavigationButton text={"register"}></NavigationButton>
    </FormFrame>
    </ModalFrame>
  )
}

export { RegisterView }
