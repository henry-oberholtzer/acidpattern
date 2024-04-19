import { Form, useActionData } from "react-router-dom";

const LogInView = () => {
  const errors = useActionData() as LogIn
  return (
    <>
    <h2>Log In</h2>
    <Form method="post">
      <label htmlFor="username">Username:</label>
      <br/>
      <input type="text" name="username"></input>
      {errors?.username && <span>{errors.username}</span>}
      <br/>
      <label htmlFor="password">Password:</label>
      <br />
      {errors?.password && <span>{errors.password}</span>}
      <input type="password" name="password"></input>
      <br />
      <button type="submit">Log In</button>
    </Form>
    </>
  )
}



export { LogInView }
