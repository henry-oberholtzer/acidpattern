import { Form, useActionData } from "react-router-dom";



const RegisterView = () => {
  const errors = useActionData() as RegisterErrors
  return (
    <>
    <h2>Register</h2>
    <Form method="post">
      <label htmlFor="username">Username:</label>
      <br/>
      <input type="text" name="username"></input>
      {errors?.username && <span>{errors.username}</span>}
      <br/>
      <label htmlFor="email">Email:</label>
      <br />
      <input type="email" name="email"></input>
      {errors?.email && <span>{errors.email}</span>}
      <br/>
      <label htmlFor="password">Password:</label>
      <br />
      {errors?.password && <span>{errors.password}</span>}
      <input type="password" name="password"></input>
      <br />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <br />
      <input type="password" name="confirmPassword"></input>
      {errors?.confirmPassword && <span>{errors.confirmPassword}</span>}
      <br />
      <button type="submit">Register</button>
    </Form>
    </>
  )
}

export { RegisterView }
