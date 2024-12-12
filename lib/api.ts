const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = "https://reqres.in/api";
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An error occurred");
  }

  // Ensure to return the full response so that you can use `.json()` on it
  return response;
};

export default apiFetch;
