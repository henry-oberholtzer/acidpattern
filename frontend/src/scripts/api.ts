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

const api = {
	root: () => getAPI('/'),
	patterns: () => getAPI('patterns/'),
  users: () => getAPI('users/'),
	register: (data: RegisterUser) => postAPI('register/')(null, simpleHeader, data)
};

export { api };
