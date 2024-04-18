export async function getAPI(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
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
