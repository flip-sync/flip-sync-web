const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchOptions extends RequestInit {
  data?: any;
}

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { data, ...customOptions } = options;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(typeof window !== "undefined" && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      ...customOptions.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...customOptions,
    ...(data && { body: JSON.stringify(data) }),
  });

  console.log(response, "response");

  if (!response.ok) {
    throw new Error("API 요청 실패");
  }

  return response.json();
}
