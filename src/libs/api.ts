const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions<T> extends Omit<RequestInit, "body" | "method"> {
  data?: T;
}

class Api {
  private async request<T>(
    endpoint: string,
    method: string,
    options: RequestOptions<T> = {}
  ) {
    const { data, ...customOptions } = options;

    const defaultOptions = {
      headers: {
        ...(method !== "GET" && { "Content-Type": "application/json" }),
        ...customOptions.headers,
      },
    };

    let url = `${BASE_URL}${endpoint}`;
    if (method === "GET" && data) {
      console.log(data, "data");
      const queryParams = new URLSearchParams(data).toString();

      url = `${url}?${queryParams}`;
    }

    const response = await fetch(url, {
      ...defaultOptions,
      ...customOptions,
      method,
      ...(method !== "GET" && data && { body: JSON.stringify(data) }),
    });

    return response.json();
  }

  async get<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "GET", options);
  }

  async post<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "POST", options);
  }

  async put<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "PUT", options);
  }

  async patch<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "PATCH", options);
  }

  async delete<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }
}

export const api = new Api();
