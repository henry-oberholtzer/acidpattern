import { ActionFunction, redirect } from "react-router-dom"
import { api } from "./api"

const registerAction: ActionFunction = async ({ request }) => {
	const formData = await request.formData() as RegisterUser
	const errors = {} as RegisterErrors
	const password = formData.get("password") as string
	const confirmPassword = formData.get("confirmPassword")
	// Add query to see if user already exists
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
	await api.register(formData)
	redirect('/login')
}

export { registerAction }
