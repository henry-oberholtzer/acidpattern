import { ActionFunction, redirect, useOutletContext } from "react-router-dom"
import { api } from "./api"

function useUser() {
  return useOutletContext<UserContext>();
}

const registerAction: ActionFunction = async ({ request }) => {
	const formData = await request.formData() as RegisterUser
	const errors = {} as RegisterErrors
	const password = formData.get("password") as string
  const username = formData.get("username") as string
  const email = formData.get("email") as string
	const confirmPassword = formData.get("confirmPassword")
	// Add query to see if user already exists
  if (email == null) {
    errors.email = "Email is required"
  }
  if (username == null) {
    errors.username = "Username is required"
  }
	if (password == null) {
		errors.password = "Password is required."
	} else if (password.length < 8 || !password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
		errors.password = "Password must be 8 at least characters long and include one number and one special character."
	}
	if (password != confirmPassword) {
		errors.confirmPassword = "Passwords must match."
	}
	if (Object.keys(errors).length) {
		return errors;
	}
	await api.register({
    username: username,
    password: password,
    email: email,
  })
	redirect('/login')
  return 200
}

const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData() as LogIn
  const username = formData.get('username')
  const password = formData.get('password')
  const header: HeadersInit = { 
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
  }
  try {
    const response = await api.login(header)
    return response
  } catch(error) {
    return error
  }
}

export { registerAction, loginAction, useUser }
