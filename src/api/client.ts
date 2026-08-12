export const apiRequest = async <T>(endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(
    `https:localhost:5000${endpoint}`,
    {
      ...options,
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    }
  )

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? `Request failed with status code ${response.status}`)
  }

  return response.json() as T;
}