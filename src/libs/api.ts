const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions<T> extends Omit<RequestInit, "body" | "method"> {
  data?: T;
}

class Api {
  private async request<T, R>(
    endpoint: string,
    method: string,
    options: RequestOptions<T> = {}
  ): Promise<R> {
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
      const queryParams = new URLSearchParams(
        data as Record<string, string>
      ).toString();
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
      return { status: 204 } as R;
    }

    return response.json();
  }

  // GET 요청
  async get<T, R>(
    endpoint: string,
    options: RequestOptions<T> = {}
  ): Promise<R> {
    return this.request<T, R>(endpoint, "GET", options);
  }

  // POST 요청
  async post<T, R>(
    endpoint: string,
    options: RequestOptions<T> = {}
  ): Promise<R> {
    return this.request<T, R>(endpoint, "POST", options);
  }

  // PUT 요청
  async put<T, R>(
    endpoint: string,
    options: RequestOptions<T> = {}
  ): Promise<R> {
    return this.request<T, R>(endpoint, "PUT", options);
  }

  // PATCH 요청
  async patch<T, R>(
    endpoint: string,
    options: RequestOptions<T> = {}
  ): Promise<R> {
    return this.request<T, R>(endpoint, "PATCH", options);
  }

  // DELETE 요청
  async delete<T, R>(
    endpoint: string,
    options: RequestOptions<T> = {}
  ): Promise<R> {
    return this.request<T, R>(endpoint, "DELETE", options);
  }
}

export const api = new Api();
