async function baseAPI(
  route: string,
  routeParams?: string,
  headers: HeadersInit = {
  'Content-Type': 'application/json'
  }, 
  method: string = 'GET') {
  let url = route
  if (routeParams) {
    url = route + routeParams
  }
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error(`ERROR: ${response.status}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const host = "http://localhost:8000/"

const api = {
  root: () => baseAPI(host + '/'),
  patterns: () => baseAPI(host + 'patterns/')
}

export { api }
