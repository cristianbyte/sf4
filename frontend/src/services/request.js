export const API_URL = "http://localhost:3000/api";

export async function apiRequest(endpoint, method, body) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { response: { data: errorData } };
  }

  return response.json();
}