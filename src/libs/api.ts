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
      const queryParams = new URLSearchParams(data).toString();
      url = `${url}?${queryParams}`;
    }

    const response = await fetch(url, {
      ...defaultOptions,
      ...customOptions,
      method,
      ...(method !== "GET" && data && { body: JSON.stringify(data) }),
    });

    // 추후 삭제
    if (response.status === 204) {
      return { status: 204 };
    }

    return response.json();
  }

  // GET 요청
  async get<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "GET", options);
  }

  // POST 요청
  async post<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "POST", options);
  }

  // PUT 요청
  async put<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "PUT", options);
  }

  // PATCH 요청
  async patch<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "PATCH", options);
  }

  // DELETE 요청
  async delete<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }
}

export const api = new Api();
