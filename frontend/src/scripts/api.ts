const simpleHeader = { 'Content-Type': 'application/json', }

function apiFactory(host: string) {
	return (method: string) => {
		return (route: string) => {
			return async (routeParams: string | null = null, headers: HeadersInit = { 'Content-Type': 'application/json', }, body: object | null = null) => {
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
						if (response.status === 204) {
							return
						}
						const data = await response.json();
						return data;
					} else if (response.status === 401 || response.status === 400) {
						const data = await response.json();
						return data;
					} else {
						throw new Error(`ERROR: ${response.status}: ${response.statusText}`)
					}
				} catch (error) {
					console.error(error)
				}
			};
		}
	}
}

const baseAPI = apiFactory(import.meta.env.VITE_BACKEND + "/")
const getAPI = baseAPI("GET")
const postAPI = baseAPI("POST")

const api = {
	root: () => getAPI('/'),
	patterns: (params: string | null) => getAPI('patterns/')(params, simpleHeader, null),
	postPattern: (header: HeadersInit, body: Pattern) => postAPI('patterns/')(null, header, body),
  users: () => getAPI('users/'),
	register: (data: RegisterData) => postAPI('register/')(null, simpleHeader, data),
	login: (header: HeadersInit) => postAPI('login/')(null, header),
	logout: (header: HeadersInit) => postAPI('logout/')(null, header)
};

export { api };
