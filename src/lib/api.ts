const API_URL = import.meta.env.VITE_API_URL;

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { auth = true, headers, ...fetchOptions } = options;

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
