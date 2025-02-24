const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions<T> extends Omit<RequestInit, "body" | "method"> {
  data?: T;
}

class Api {
  private getAccessToken() {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );

    if (!tokenCookie) {
      console.log("Token not found in cookies:", cookies);
      return null;
    }

    const token = tokenCookie.split("=")[1]?.trim();
    return token;
  }

  private async request<T>(
    endpoint: string,
    method: string,
    options: RequestOptions<T> = {}
  ) {
    const { data, ...customOptions } = options;
    const accessToken = this.getAccessToken();

    console.log(accessToken, "accessToken");

    const defaultOptions = {
      headers: {
        ...(method !== "GET" && { "Content-Type": "application/json" }),
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
        ...customOptions.headers,
      },
      credentials: "include",
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
      credentials: "include",
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

  async delete<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }
}

export const api = new Api();
