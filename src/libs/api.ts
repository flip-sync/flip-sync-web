const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  data?: any;
}

class Api {
  private async request(
    endpoint: string,
    method: string,
    options: RequestOptions = {}
  ) {
    const { data, ...customOptions } = options;

    const defaultOptions = {
      headers: {
        ...(method !== "GET" && { "Content-Type": "application/json" }),
        ...(typeof window !== "undefined" && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
        ...customOptions.headers,
      },
    };

    let url = `${BASE_URL}${endpoint}`;
    if (method === "GET" && data) {
      const queryParams = new URLSearchParams(data).toString();
      url = `${url}?${queryParams}`;
    }

    const response = await fetch(url, {
      ...defaultOptions,
      ...customOptions,
      method,
      ...(method !== "GET" && data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    return response.json();
  }

  // GET 요청
  async get(endpoint: string, options: RequestOptions = {}) {
    // return this.request(endpoint, "GET", options);
  }

  // POST 요청
  async post(endpoint: string, options: RequestOptions = {}) {
    return this.request(endpoint, "POST", options);
  }

  // PUT 요청
  async put(endpoint: string, options: RequestOptions = {}) {
    return this.request(endpoint, "PUT", options);
  }

  // PATCH 요청
  async patch(endpoint: string, options: RequestOptions = {}) {
    return this.request(endpoint, "PATCH", options);
  }

  // DELETE 요청
  async delete(endpoint: string, options: RequestOptions = {}) {
    return this.request(endpoint, "DELETE", options);
  }
}

export const api = new Api();
