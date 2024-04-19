import { ActionFunctionArgs, redirect } from "react-router-dom";

const simpleHeader = { 'Content-Type': 'application/json', }

function apiFactory(host: string) {
	return (method: string) => {
		return (route: string) => {
			return async (routeParams: string | null = null, headers: HeadersInit = { 'Content-Type': 'application/json', }, body: object | null = null ) => {
				let url = host + route;
				const request: RequestInit = {
					method: method,
					headers: headers,
				}
				if (body) {
					request.body = JSON.stringify(body)
				}
				if (routeParams != null) {
					url = url + routeParams;
				}
				try {
					const response = await fetch(url, request);
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						throw new Error(`ERROR: ${response.status}: ${response.statusText}`);
					}
				} catch (error) {
					console.error(error);
					throw error;
				}
			};
		}
	}
}

const baseAPI = apiFactory(import.meta.env.VITE_BACKEND)
const getAPI = baseAPI("GET")
const postAPI = baseAPI("POST")


const registerUser = async (actionData: ActionFunctionArgs) => {
	const { request } = actionData
	const formData = await request.formData()
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
	await postAPI('register/')(null, simpleHeader, formData)
	redirect('/login')
}

const api = {
	root: () => getAPI('/'),
	patterns: () => getAPI('patterns/'),
  users: () => getAPI('users/'),
	register: registerUser
};

export { api };
