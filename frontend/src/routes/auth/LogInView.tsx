import { ErrorResponse, Form, useActionData } from "react-router-dom";
import { useUser } from "../../scripts/actions";

const LogInView = () => {
  const { setUser } = useUser()


  return (
    <>
    <h2>Log In</h2>
    <Form method="post">
      <label htmlFor="username">Username:</label>
      <br/>
      <input type="text" name="username"></input>
      <br/>
      <label htmlFor="password">Password:</label>
      <br />
      <input type="password" name="password"></input>
      <br />
      <button type="submit">Log In</button>
    </Form>
    </>
  )
}



export { LogInView }
